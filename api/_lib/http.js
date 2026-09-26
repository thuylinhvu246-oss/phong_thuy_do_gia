// Tiện ích phản hồi HTTP cho Vercel Functions.
// Cache ở CDN của Vercel 5 phút, sau đó vẫn trả bản cũ trong khi lấy bản mới từ Notion
// → bài mới/sửa trên Notion lên web sau khoảng 5 phút, không cần deploy.
export const CACHE_HTML = 'public, s-maxage=300, stale-while-revalidate=86400';

export function send(res, status, body, type = 'text/html; charset=utf-8', cache = CACHE_HTML) {
  res.statusCode = status;
  res.setHeader('Content-Type', type);
  res.setHeader('Cache-Control', status === 200 ? cache : 'public, s-maxage=60');
  res.end(body);
}
