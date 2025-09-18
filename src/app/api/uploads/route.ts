/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs'; // ต้องใช้ Node runtime เพื่อเข้าถึง FS

const UPLOAD_DIR = path.join(process.cwd(), '.uploads'); // โฟลเดอร์ชั่วคราวในโปรเจกต์

async function ensureUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch {}
}

export async function POST(request: Request) {
  try {
    await ensureUploadDir();

    const form = await request.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return new NextResponse('No file provided', { status: 400 });
    }

    const isPdf =
      file.type === 'application/pdf' || (file.name && file.name.toLowerCase().endsWith('.pdf'));
    if (!isPdf) {
      return new NextResponse('Only PDF allowed', { status: 415 });
    }

    const maxMB = 25;
    if (file.size > maxMB * 1024 * 1024) {
      return new NextResponse(`File too large (> ${maxMB}MB)`, { status: 413 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const safeName = file.name.replace(/[^\w.-]+/g, '_');
    const savedAs = `${Date.now()}_${safeName}`;
    const fullPath = path.join(UPLOAD_DIR, savedAs);

    await fs.writeFile(fullPath, buffer);

    // สร้าง jobId ไว้ต่อกับพายป์ไลน์ “แปลง → chunk → embed → upsert”
    const jobId = randomUUID();

    // TODO: enqueue ไปคิวจริง (BullMQ/SQS/PubSub) พร้อม metadata ที่จำเป็น
    // ตัวอย่าง metadata: { jobId, path: fullPath, originalName: file.name, mime: file.type }

    return NextResponse.json({ ok: true, jobId, savedAs });
  } catch (err: any) {
    console.error('Upload error:', err);
    return new NextResponse('Upload failed', { status: 500 });
  }
}