/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import OpenAI from 'openai';
import { DataAPIClient } from '@datastax/astra-db-ts';
import { chunkText } from '@/lib/chunk';

export const runtime = 'nodejs';

const UPLOAD_DIR = path.join(process.cwd(), '.uploads');

// --- ENV ---
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const ASTRA_DB_APPLICATION_TOKEN = process.env.ASTRA_DB_APPLICATION_TOKEN;
const ASTRA_DB_ENDPOINT = process.env.ASTRA_DB_ENDPOINT;
const ASTRA_DB_NAMESPACE = process.env.ASTRA_DB_NAMESPACE;
const ASTRA_DB_COLLECTION = process.env.ASTRA_DB_COLLECTION || 'documents';

const useAstra =
  !!ASTRA_DB_APPLICATION_TOKEN && !!ASTRA_DB_ENDPOINT && !!ASTRA_DB_NAMESPACE;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// เตรียม Astra client (ถ้าตั้งค่าแล้ว)
const astra = useAstra
  ? new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN!).db(ASTRA_DB_ENDPOINT!, {
      keyspace: ASTRA_DB_NAMESPACE!,
    })
  : null;

export async function POST(req: Request) {
  console.log("🚀 ~ POST ~ req:", req)
  try {
    const body = await req.json();
    const savedAs: string | undefined = body?.savedAs;
    const originalName: string | undefined = body?.originalName;

    if (!savedAs) {
      return new NextResponse('Missing savedAs', { status: 400 });
    }

    const fullPath = path.join(UPLOAD_DIR, savedAs);
    const exists = await fileExists(fullPath);
    if (!exists) {
      return new NextResponse('File not found', { status: 404 });
    }

    // 1) อ่านไฟล์ PDF → ข้อความ
    const pdfBuffer = await fs.readFile(fullPath);
    const parsed = await pdfParse(pdfBuffer);
    console.log("🚀 ~ POST ~ parsed:", parsed)
    let text = (parsed.text || '').trim();

    if (!text) {
      return new NextResponse('Empty PDF text (OCR not implemented)', { status: 422 });
    }

    // Clean เล็กน้อย (เอา header/footer ง่ายๆ ออกได้ตามเหมาะ)
    text = text.replace(/\u0000/g, ' ').replace(/[ \t]+\n/g, '\n');

    // 2) แบ่ง chunk
    const chunks = chunkText(text, 1200, 200);

    // 3) สร้าง embeddings เป็น batch
    //    (OpenAI แนะนำส่ง array input ได้)
    const embedRes = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: chunks,
    });

    // 4) Upsert ไปยัง Vector DB (Astra) พร้อม metadata
    if (useAstra && astra) {
      const collection = astra.collection(ASTRA_DB_COLLECTION);

      // ใส่ doc-level id สำหรับระบุว่า chunk ไหนมาจากไฟล์ไหน
      const docId = savedAs;

      // upsert ทีละชิ้น (MVP) — ภายหลังปรับ batch/parallel ได้
      for (let i = 0; i < chunks.length; i++) {
        const $vector = embedRes.data[i].embedding;
        const textChunk = chunks[i];

        await collection.insertOne({
          $vector,
          text: textChunk,
          doc_id: docId,
          original_name: originalName || '',
          source_path: fullPath,
          page_hint: null, // ภายหลังทำ mapping หน้าได้ด้วย pdf-parse v3 + layout
          created_at: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({
      ok: true,
      chunks: chunks.length,
      vectorized: useAstra ? chunks.length : 0,
      message: useAstra
        ? 'Vectorized & upserted to Astra'
        : 'Embeddings created (no DB configured)',
    });
  } catch (err: any) {
    console.error('Vectorize error:', err);
    return new NextResponse('Vectorize failed', { status: 500 });
  }
}

async function fileExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}