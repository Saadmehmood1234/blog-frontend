export default async function safeJson<T>(res: Response): Promise<T | null> {
  if (!res.ok) return null;

  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
