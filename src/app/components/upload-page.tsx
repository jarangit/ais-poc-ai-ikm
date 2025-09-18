/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useCallback, useState } from 'react';

type UploadItem = {
  name: string;
  size: number;
  status: 'idle' | 'uploading' | 'processing' | 'done' | 'error';
  message?: string;
};

export default function UploadPage() {
  const [files, setFiles] = useState<UploadItem[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(async (list: FileList | null) => {
    if (!list || list.length === 0) return;

    const accepted: File[] = [];
    const next: UploadItem[] = [];

    Array.from(list).forEach((f) => {
      const isPdf = f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf');
      const maxMB = 25;
      if (!isPdf) {
        next.push({ name: f.name, size: f.size, status: 'error', message: 'Only PDF allowed.' });
        return;
      }
      if (f.size > maxMB * 1024 * 1024) {
        next.push({ name: f.name, size: f.size, status: 'error', message: `File > ${maxMB}MB` });
        return;
      }
      accepted.push(f);
      next.push({ name: f.name, size: f.size, status: 'idle' });
    });

    setFiles((prev) => [...prev, ...next]);

    // อัปโหลดทีละไฟล์ (จะได้อัปเดตสถานะง่าย)
    for (const f of accepted) {
      setFiles((prev) =>
        prev.map((it) => (it.name === f.name ? { ...it, status: 'uploading' } : it))
      );

      try {
        const fd = new FormData();
        fd.append('file', f);

        const res = await fetch('/api/uploads', {
          method: 'POST',
          body: fd,
        });
        console.log("🚀 ~ UploadPage ~ res:", res)

        if (!res.ok) {
          const text = await res.text();
          console.log("🚀 ~ UploadPage ~ text:", text)
          throw new Error(text || 'Upload failed');
        }
        const data = await res.json(); // { jobId, savedAs }
        console.log("🚀 ~ UploadPage ~ data:", data)

        // mark as processing (vectorizing)
        setFiles((prev) =>
          prev.map((it) =>
            it.name === f.name
              ? { ...it, status: 'processing', message: `Job: ${data.jobId} • Embedding...` }
              : it
          )
        );

        // call vectorize API (MVP: sync)
        try {
          const vecRes = await fetch('/api/vectorize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ savedAs: data.savedAs, originalName: f.name }),
          });

          if (!vecRes.ok) {
            const t = await vecRes.text();
            throw new Error(t || 'Vectorize failed');
          }

          const vec = await vecRes.json(); // { ok, chunks, vectorized, message }
          setFiles((prev) =>
            prev.map((it) =>
              it.name === f.name
                ? {
                    ...it,
                    status: 'done',
                    message: `Embedded ${vec.chunks} chunk(s)${vec.vectorized ? ' • Upserted' : ''}`,
                  }
                : it
            )
          );
        } catch (ve: any) {
          setFiles((prev) =>
            prev.map((it) =>
              it.name === f.name
                ? { ...it, status: 'error', message: ve?.message || 'Vectorize error' }
                : it
            )
          );
        }
      } catch (e: any) {
        setFiles((prev) =>
          prev.map((it) =>
            it.name === f.name ? { ...it, status: 'error', message: e?.message || 'Error' } : it
          )
        );
      }
    }
  }, []);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.currentTarget.value = '';
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold">Upload PDF for Vectorization</h1>
        <p className="text-sm text-gray-500">
          รองรับเฉพาะ PDF ไม่เกิน 25MB ต่อไฟล์ — อัปโหลดเสร็จแล้วระบบจะสร้างงาน (job) เพื่อไปสกัดข้อความ/ทำ
          embeddings ต่อในขั้นถัดไป
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition
            ${dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
        >
          <p className="mb-4">ลาก–วางไฟล์ PDF ที่นี่ หรือ</p>
          <label className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700">
            เลือกไฟล์
            <input type="file" accept="application/pdf,.pdf" multiple className="hidden" onChange={onPick} />
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-medium">รายการไฟล์</h2>
            <ul className="divide-y rounded-md border">
              {files.map((f) => (
                <li key={f.name} className="p-3 flex items-center justify-between text-sm">
                  <div className="truncate">
                    <div className="font-medium truncate">{f.name}</div>
                    <div className="text-gray-500">{(f.size / (1024 * 1024)).toFixed(2)} MB</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {f.status === 'uploading' && <span className="text-indigo-600">Uploading…</span>}
                    {f.status === 'processing' && <span className="text-purple-600">Processing…</span>}
                    {f.status === 'done' && <span className="text-green-600">Done</span>}
                    {f.status === 'error' && <span className="text-red-600">Error</span>}
                    {f.message && <span className="text-gray-500 max-w-[220px] truncate">{f.message}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}