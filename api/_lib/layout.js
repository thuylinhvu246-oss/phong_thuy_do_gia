// Khung giao diện dùng chung (header, footer, <head>) cho mọi trang.
// Trang tĩnh được sinh ra từ file này bằng `node scripts/build-pages.mjs`;
// trang Blog dùng trực tiếp file này khi render từ Notion.

export const SITE = {
  name: 'Phong Thủy Đỗ Gia',
  url: 'https://www.phongthuydogia.com',
  phone: '0345843443',
  phoneDisplay: '0345 84 3443',
  zalo: 'https://zalo.me/0345843443',
  facebook: 'https://www.facebook.com/phongthuydogia.official',
  tiktok: 'https://www.tiktok.com/@phongthuydogia.com',
  youtube: 'https://www.youtube.com/@phongthuydogia',
  formHome: 'https://forms.gle/YSe39Y2BQRUVjMpZ6',
  formService: 'https://forms.gle/WXvrBbeY6ZperzDJA',
  referral: 'https://forms.gle/PuMTBmgg7yaYKgme6',
  ogImage: 'https://www.phongthuydogia.com/og-image.jpg',
  gaId: 'G-XY827X834K',
  pixelId: '1085267117705693',
};

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const ICONS = {
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v3M8 3v3M16 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"/><path d="M8 13l2 2 4-4"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 5h11l5 5-9 9-8-8V5Z"/><circle cx="9" cy="9" r="1.3" fill="currentColor" stroke="none"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Z"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 13h16"/></svg>',
  scroll: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M7 3h10a1 1 0 0 1 1 1v16l-3-2-3 2-3-2-3 2V4a1 1 0 0 1 1-1Z"/><path d="M9 8h6M9 11h6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12l4 4L19 6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10.5 19 5 13.5 5 6a2 2 0 0 1 1-3Z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 10h8M8 13h5"/></svg>',
  form: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 19h16"/><path d="M13.5 5.5l3 3L8 17H5v-3l8.5-8.5Z"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  crumb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  question: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5v.7M12 17h.01"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z"/><path d="M3 7h18v4H3zM12 7v14"/><path d="M12 7c-1.5-3-5-3.5-5-1.2C7 7 9 7 12 7Zm0 0c1.5-3 5-3.5 5-1.2C17 7 15 7 12 7Z"/></svg>',
};

export const SERVICES = [
  { slug: 'ngay-gio-sinh', name: 'Chọn ngày giờ sinh', long: 'Chọn ngày giờ sinh theo Bát Tự', icon: 'calendar',
    short: 'Phân tích các khung giờ trong phạm vi dự sinh để chọn thời điểm tốt cho việc sinh nở.' },
  { slug: 'dat-ten', name: 'Đặt tên theo Bát Tự', long: 'Đặt tên theo Bát Tự', icon: 'tag',
    short: 'Kết hợp Bát Tự và Việt Danh Học để chọn tên hài hòa giữa Dụng Thần và quẻ số.' },
  { slug: 'dinh-huong-su-nghiep', name: 'Định hướng công danh sự nghiệp', long: 'Định hướng công danh sự nghiệp', icon: 'briefcase',
    short: 'Nhận diện thế mạnh, môi trường phù hợp và định hướng phát triển công danh, sự nghiệp.' },
  { slug: 'luan-la-so', name: 'Luận giải lá số Bát Tự', long: 'Luận giải lá số Bát Tự', icon: 'scroll',
    short: 'Bức tranh tổng thể về bản mệnh và các khía cạnh cuộc sống qua lá số Bát Tự.' },
];

// ---------- <head> ----------
export function head({ title, description, path = '/', ogType = 'website', ogImage = SITE.ogImage, jsonLd = [], noindex = false, extraHead = '' }) {
  const url = SITE.url + (path === '/' ? '/' : path);
  const ld = (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    .filter(Boolean)
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#1F7A6E">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="Blog Phong Thủy Đỗ Gia" href="/blog/rss.xml">
<meta property="og:locale" content="vi_VN">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:image" content="${esc(ogImage)}">
${ogImage === SITE.ogImage ? '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">' : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(ogImage)}">
${extraHead}
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${SITE.gaId}');
</script>
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${SITE.pixelId}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none" alt=""
src="https://www.facebook.com/tr?id=${SITE.pixelId}&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500;1,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css?v=4">
${ld}
</head>`;
}

// ---------- header ----------
// active: 'home' | 'blog' | <service slug>
export function header({ active = 'home', ctaHref = '/#dang-ky' } = {}) {
  const svcActive = SERVICES.some((s) => s.slug === active);
  const items = SERVICES.map(
    (s) => `<a href="/${s.slug}"${s.slug === active ? ' class="active" aria-current="page"' : ''}><span class="mi">${ICONS[s.icon]}</span>${s.name}</a>`
  ).join('\n            ');
  return `<header class="site">
  <div class="wrap nav-row">
    <a class="brand" href="/" aria-label="Phong Thủy Đỗ Gia — Trang chủ">
      <span class="badge"><img src="/assets/logo-mark-white.png" alt="" width="19" height="9"></span>
      <span class="brand-text">PHONG THỦY ĐỖ GIA</span>
    </a>
    <input type="checkbox" id="navToggle" class="nav-toggle" aria-hidden="true" tabindex="-1">
    <div class="nav-right">
      <nav class="links" id="navLinks" aria-label="Menu chính">
        <a href="/#gioi-thieu">Giới thiệu</a>
        <div class="dd${svcActive ? ' active' : ''}">
          <button class="dd-toggle" type="button" aria-haspopup="true" aria-expanded="false">Dịch vụ ${ICONS.chevron}</button>
          <div class="dd-menu">
            ${items}
          </div>
        </div>
        <a href="/blog"${active === 'blog' ? ' class="active" aria-current="page"' : ''}>Blog</a>
        <a href="${ctaHref}">Đăng ký</a>
        <a href="#lien-he">Liên hệ</a>
      </nav>
      <a class="btn btn-primary cta-header" href="${ctaHref}"><span class="full">Đăng ký tư vấn</span><span class="short">Đăng ký</span></a>
      <label for="navToggle" class="hamburger" aria-label="Mở menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg></label>
    </div>
  </div>
</header>`;
}

// ---------- khối "Đăng ký nhận hoa hồng" ----------
export function referralBlock() {
  return `<section id="hoa-hong" aria-labelledby="hoa-hong-title">
    <div class="wrap">
      <div class="referral">
        <div class="r-copy">
          <span class="r-icon">${ICONS.gift}</span>
          <div>
            <h2 id="hoa-hong-title">Đăng ký nhận hoa hồng</h2>
            <p>Tham gia chương trình mời bạn bè và nhận hoa hồng lên tới <strong>200.000đ/khách hàng</strong>.</p>
          </div>
        </div>
        <a class="btn" href="${SITE.referral}" target="_blank" rel="noopener">Đăng ký nhận hoa hồng ${ICONS.arrow}</a>
      </div>
    </div>
  </section>`;
}

// ---------- footer ----------
export function footer() {
  const svc = SERVICES.map((s) => `<li><a href="/${s.slug}">${s.name}</a></li>`).join('\n            ');
  return `<footer class="site" id="lien-he">
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="mark"><img src="/assets/logo-mark-white.png" alt="" width="24" height="12"><span>PHONG THỦY ĐỖ GIA</span></div>
        <p>Giúp bạn làm chủ vận mệnh</p>
      </div>
      <div class="footer-cols">
        <div class="footer-col">
          <h4>Liên hệ</h4>
          <ul>
            <li><a href="tel:+84345843443">${ICONS.phone}${SITE.phoneDisplay} (Hotline / Zalo)</a></li>
            <li><a href="${SITE.facebook}" target="_blank" rel="noopener">${ICONS.ext}Facebook</a></li>
            <li><a href="${SITE.tiktok}" target="_blank" rel="noopener">${ICONS.ext}TikTok</a></li>
            <li><a href="${SITE.youtube}" target="_blank" rel="noopener">${ICONS.ext}YouTube</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Dịch vụ</h4>
          <ul>
            ${svc}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Điều hướng</h4>
          <ul>
            <li><a href="/#gioi-thieu">Giới thiệu</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/#dang-ky">Đăng ký tư vấn</a></li>
            <li><a href="${SITE.referral}" target="_blank" rel="noopener">Đăng ký nhận hoa hồng</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Phong Thủy Đỗ Gia. Mọi quyền được bảo lưu.</span>
      <span>Thái Nguyên, Việt Nam</span>
    </div>
  </div>
</footer>

<script>
  (function () {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { toggle.checked = false; });
      });
    }
    document.querySelectorAll('.dd').forEach(function (dd) {
      var btn = dd.querySelector('.dd-toggle');
      btn.addEventListener('click', function () {
        var open = dd.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('click', function (e) {
        if (!dd.contains(e.target)) { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
      });
    });
  })();
</script>
</body>
</html>`;
}

export function crumbs(items) {
  // items: [{name, href?}]
  const html = items
    .map((it, i) =>
      i === items.length - 1
        ? `<span aria-current="page">${esc(it.name)}</span>`
        : `<a href="${it.href}">${esc(it.name)}</a>${ICONS.crumb}`
    )
    .join('');
  return `<nav class="crumbs" aria-label="Breadcrumb">${html}</nav>`;
}

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.href ? { item: SITE.url + (it.href === '/' ? '/' : it.href) } : {}),
    })),
  };
}

export const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': SITE.url + '/#org',
  name: SITE.name,
  url: SITE.url + '/',
  logo: SITE.url + '/assets/logo-square.png',
  image: SITE.ogImage,
  telephone: '+84345843443',
  slogan: 'Giúp bạn làm chủ vận mệnh',
  address: { '@type': 'PostalAddress', addressLocality: 'Thái Nguyên', addressCountry: 'VN' },
  areaServed: 'VN',
  sameAs: [SITE.facebook, SITE.tiktok, SITE.youtube],
};
