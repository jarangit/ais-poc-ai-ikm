export function chunkText(input: string, chunkSize = 1200, overlap = 200) {
  const chunks: string[] = [];
  let i = 0;
  while (i < input.length) {
    const end = Math.min(i + chunkSize, input.length);
    const slice = input.slice(i, end);
    chunks.push(slice);
    if (end === input.length) break;
    i = end - overlap;
  }
  return chunks;
}