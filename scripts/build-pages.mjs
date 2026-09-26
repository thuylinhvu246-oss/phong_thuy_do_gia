// Sinh các trang tĩnh: index.html + 4 trang dịch vụ.
// Chạy: node scripts/build-pages.mjs   (không bắt buộc khi deploy — các file .html đã được sinh sẵn)
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  SITE, SERVICES, ICONS, esc, head, header, footer, referralBlock, crumbs, breadcrumbLd, ORG_LD,
} from '../api/_lib/layout.js';
import { PAGES } from './pages-data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const stripTags = (s) => s.replace(/<[^>]+>/g, '');
// giữ các cụm từ không bị ngắt dòng giữa chừng trong tiêu đề
const NB = ['Bát Tự', 'gia đình', 'công danh', 'sự nghiệp', 'lá số', 'ngày giờ', 'Đỗ Gia', 'vận mệnh', 'phù hợp'];
const nb = (s) => NB.reduce((t, w) => t.split(w).join(w.replace(/ /g, ' ')), s);

const ctaBtn = (label = 'Đăng ký tư vấn') =>
  `<div class="cta-row"><a class="btn btn-primary" href="#dang-ky">${label} ${ICONS.arrow}</a></div>`;

// ================= TRANG CHỦ =================
function homePage() {
  const cards = [
    {
      s: SERVICES[0], desc: 'Phân tích các khung giờ (trong phạm vi dự sinh) dựa trên nhiều tiêu chí để chọn ra những thời điểm tốt cho việc sinh nở.',
      label: 'Dịch vụ bao gồm', items: ['Loại bỏ ngày giờ phạm, xấu', 'Chọn ngày giờ đẹp hợp tuổi bố mẹ', 'Chọn ngày giờ đẹp theo lá số Bát Tự'],
      note: 'Lưu ý: việc lựa chọn thời điểm sinh luôn cần đặt yếu tố an toàn của mẹ và bé lên hàng đầu, và chỉ thực hiện trong phạm vi được bác sĩ chuyên môn cho phép.',
    },
    { s: SERVICES[1], desc: 'Kết hợp Bát Tự và Việt Danh Học để đưa ra những cái tên hài hòa giữa Dụng Thần và quẻ số.',
      label: 'Dịch vụ bao gồm', items: ['Xác định Dụng Thần Bát Tự', 'Các tên phù hợp với Dụng Thần và ứng quẻ đẹp trong Việt Danh Học'] },
    { s: SERVICES[2], title: 'Định hướng công danh, sự nghiệp', desc: 'Giúp khách hàng có thêm góc nhìn từ Bát Tự để nhận diện thế mạnh, môi trường phù hợp và định hướng con đường phát triển công danh, sự nghiệp.',
      label: 'Phù hợp với', items: ['Cha mẹ muốn tìm hiểu định hướng phát triển cho con', 'Học sinh, sinh viên đang lựa chọn ngành học', 'Người đang lựa chọn hoặc thay đổi công việc, sự nghiệp', 'Người muốn hiểu rõ hơn về thế mạnh của bản thân'] },
    { s: SERVICES[3], desc: 'Giúp bạn có một bức tranh tổng thể về bản mệnh và các giai đoạn vận trình, từ đó hiểu rõ hơn về đặc điểm, cơ hội và vấn đề cần lưu tâm trong từng giai đoạn cuộc sống.',
      label: 'Dịch vụ bao gồm', items: ['Tổng quan cấu trúc Bát Tự', 'Đặc điểm và thế mạnh bản thân', 'Luận giải theo từng vấn đề: công danh, sự nghiệp, tài vận…'] },
  ];
  const cardHtml = cards.map((c, i) => `
        <article class="service-card">
          <div class="top"><span class="num">0${i + 1}</span><span class="icon">${ICONS[c.s.icon]}</span></div>
          <h3><a href="/${c.s.slug}">${c.title || c.s.name}</a></h3>
          <p class="desc">${c.desc}</p>
          <span class="sub-label">${c.label}</span>
          <ul class="check">
            ${c.items.map((t) => `<li>${ICONS.check}${t}</li>`).join('\n            ')}
          </ul>${c.note ? `\n          <p class="note">${c.note}</p>` : ''}
          <div class="cta"><a class="btn btn-ghost" href="/${c.s.slug}">Xem chi tiết</a><a class="btn btn-primary" href="#dang-ky">Đăng ký ngay ${ICONS.arrow}</a></div>
        </article>`).join('\n');

  const journey = SERVICES.map((s, i) =>
    `<li><a class="dot" href="/${s.slug}" aria-label="${s.name}">${ICONS[s.icon]}</a>${i < 3 ? '<span class="line"></span>' : ''}<a class="label" href="/${s.slug}">${s.name === 'Luận giải lá số Bát Tự' ? 'Luận giải lá số Bát Tự' : s.name}</a></li>`
  ).join('\n        ');

  const ld = [
    { ...ORG_LD, description: 'Tư vấn Bát Tự: chọn ngày giờ sinh, đặt tên, định hướng công danh sự nghiệp, luận giải lá số.',
      hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Dịch vụ tư vấn Bát Tự',
        itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.long, url: `${SITE.url}/${s.slug}` } })) } },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url + '/', inLanguage: 'vi' },
  ];

  return `${head({
    title: 'Phong Thủy Đỗ Gia — Tư vấn Bát Tự cho gia đình',
    description: 'Phong Thủy Đỗ Gia tư vấn Bát Tự: chọn ngày giờ sinh, đặt tên theo Bát Tự, định hướng công danh sự nghiệp và luận giải lá số — đồng hành cùng gia đình qua từng lựa chọn quan trọng.',
    path: '/', jsonLd: ld,
  })}
<body>
${header({ active: 'home', ctaHref: '#dang-ky' })}

<main>
  <div class="wrap">
    <section class="hero" aria-label="Giới thiệu chung">
      <div class="hero-inner">
        <img class="hero-logo" src="/assets/logo-mark-white.png" alt="Logo Phong Thủy Đỗ Gia" width="68" height="33">
        <h1>Phong Thủy Đỗ Gia</h1>
        <p class="tagline">Giúp bạn làm chủ vận mệnh</p>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="#dang-ky">Đăng ký tư vấn</a>
          <a class="btn btn-ghost" href="#dich-vu">Xem dịch vụ</a>
        </div>
      </div>
    </section>
  </div>

  <section id="gioi-thieu">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Giới thiệu</span>
        <h2>${nb('Đồng hành cùng gia đình qua từng lựa chọn quan trọng')}</h2>
      </div>
      <div class="intro-grid">
        <p class="lede">Đỗ Gia ứng dụng hệ thống lý luận Bát Tự với mong muốn trở thành người bạn đồng hành cùng gia đình trong những lựa chọn quan trọng trên hành trình trưởng thành của mỗi thành viên.</p>
        <p class="lede">Phong Thủy Đỗ Gia đồng hành cùng hàng trăm gia đình qua 4 dịch vụ cốt lõi — 4 điểm chạm nối liền hành trình của cha mẹ và con cái từ khi sinh ra đến khi trưởng thành.</p>
      </div>

      <ul class="journey">
        ${journey}
      </ul>
    </div>
  </section>

  <section class="alt" id="phuong-phap">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Phương pháp</span>
        <h2>Phương pháp tư vấn của ${nb('Đỗ Gia')}</h2>
      </div>
      <div class="principles">
        <div class="principle">
          <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="M20 20l-5.2-5.2"/><path d="M7.2 10.5l1.6-2 1.7 1.7L13 7.5"/></svg></span>
          <h3>Phân tích có cơ sở và hệ thống</h3>
          <p>Dựa trên hệ thống lý luận Bát Tự, xem xét tổng thể cấu trúc mệnh cục và mối quan hệ để đưa góc nhìn toàn diện thay vì chỉ dựa vào một yếu tố riêng lẻ.</p>
        </div>
        <div class="principle">
          <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.45 1.1 1.2 1.1 2.2h5c0-1 .5-1.75 1.1-2.2A6 6 0 0 0 12 3Z"/></svg></span>
          <h3>Thông tin có tính ứng dụng</h3>
          <p>Không chỉ phân tích để biết một lá số có đặc điểm gì, mà còn đưa ra những thông tin ứng dụng được trong đời sống.</p>
        </div>
        <div class="principle">
          <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M14.7 9.3 13 13l-3.7 1.7L11 11l3.7-1.7Z"/></svg></span>
          <h3>Đề cao tính chủ động, làm chủ vận mệnh</h3>
          <p>Mục tiêu của tư vấn là giúp bạn nhận diện những lựa chọn phù hợp và chủ động đưa ra quyết định chứ không phụ thuộc vào một lời phán định.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="dich-vu">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Dịch vụ</span>
        <h2>4 điểm chạm trên hành trình của mỗi ${nb('gia đình')}</h2>
        <p>Phong Thủy Đỗ Gia đồng hành cùng bạn qua 4 dịch vụ Bát Tự cốt lõi, tạo thành một hành trình xuyên suốt từ khi một em bé chuẩn bị chào đời đến quá trình trưởng thành và định hướng tương lai.</p>
      </div>

      <div class="services">${cardHtml}
      </div>
    </div>
  </section>

  <section class="alt" id="dang-ky">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Đăng ký</span>
        <h2>Đăng ký tư vấn</h2>
        <p>3 bước đơn giản — điền form, Đỗ Gia liên hệ xác nhận, rồi nhận kết quả bằng file PDF.</p>
      </div>

      <div class="mini-steps">
        <div class="mini-step"><span class="circle">${ICONS.form}</span><p>Điền form đăng ký</p></div>
        <div class="mini-step"><span class="circle">${ICONS.phone}</span><p>Đỗ Gia liên hệ xác nhận</p></div>
        <div class="mini-step"><span class="circle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v4h4"/><path d="M9 14l2 2 4-4"/></svg></span><p>Nhận kết quả bằng file PDF</p></div>
      </div>

      <div class="form-panel">
        <div class="bar"></div>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd4EJYXmdQFrPdh8-W1aGLH2SlKjbfpoNCsCdRHbm5-ABMLbg/viewform?embedded=true" title="Form đăng ký tư vấn Bát Tự" loading="lazy">Đang tải form…</iframe>
        <div class="form-fallback">Form không hiển thị? <a href="${SITE.formHome}" target="_blank" rel="noopener">Mở form đăng ký trong tab mới</a></div>
      </div>
    </div>
  </section>

  ${referralBlock()}

  <section class="alt" id="bat-tu-la-gi">
    <div class="wrap">
      <div class="section-head center">
        <span class="eyebrow">Tìm hiểu thêm</span>
        <h2>Bát Tự là gì?</h2>
      </div>
      <div class="quote-card standalone">
        <p>Bát tự (Tứ trụ) là một bộ môn dự đoán có lịch sử hơn ngàn năm, bắt nguồn từ Trung Hoa cổ đại và được lưu truyền cho đến ngày nay. Dựa trên ngày, tháng, năm và giờ sinh, Bát tự thiết lập nên một hệ thống lý luận chặt chẽ để lý giải sự thịnh suy của đời người.</p>
        <p>Nhưng không chỉ dừng ở việc biết trước, Bát tự còn cho ta cách cải vận, tìm phương hướng, thời điểm hay môi trường phù hợp để giảm rủi ro, tăng thuận lợi.</p>
        <p>Nói đơn giản, Bát tự không phải bói toán may rủi, mà là một hệ thống minh triết cổ truyền đã được kiểm chứng qua nhiều thế hệ, giúp con người hiểu rõ mình hơn và sống hài hòa với dòng chảy tự nhiên của cuộc đời.</p>
        <p style="font-style:normal"><a href="/blog" style="color:var(--accent-teal);font-weight:700">Đọc thêm kiến thức Bát Tự trên Blog →</a></p>
      </div>
    </div>
  </section>
</main>

${footer()}`;
}

// ================= TRANG DỊCH VỤ =================
function sectionHtml(sec) {
  let body = '';
  if (sec.type === 'steps') {
    body = `<ol class="steps" style="--cols:${sec.cols || 2}">
        ${sec.items.map((it, i) => `<li class="step">
          <div class="s-top"><span class="s-num">${i + 1}</span><h3>${it.h}</h3></div>
          <p>${it.p}</p>${it.list ? `\n          <ul class="dots">${it.list.map((l) => `<li>${l}</li>`).join('')}</ul>` : ''}
        </li>`).join('\n        ')}
      </ol>`;
  } else if (sec.type === 'fit') {
    body = `<ul class="fit">
        ${sec.items.map((t) => `<li><span class="ic">${ICONS.check}</span><span>${t}</span></li>`).join('\n        ')}
      </ul>`;
  } else if (sec.type === 'faq') {
    body = `<div class="faq">
        ${sec.items.map((it, i) => `<details${i === 0 ? ' open' : ''}>
          <summary><h3>${it.q}</h3><span class="pm">${ICONS.plus}</span></summary>
          <div class="ans">
            ${(it.a || []).map((p) => `<p>${p}</p>`).join('\n            ')}${it.defs ? `
            <div class="hours">
              ${it.defs.map((d) => `<div><strong style="color:var(--ink)">${d.t}</strong>${d.d.map((x) => `<p>${x}</p>`).join('')}</div>`).join('\n              ')}
            </div>` : ''}
          </div>
        </details>`).join('\n        ')}
      </div>`;
  }
  return `<section${sec.alt ? ' class="alt"' : ''} id="${sec.id}">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">${sec.eyebrow}</span>
        <h2>${nb(sec.h2)}</h2>
      </div>
      ${body}
      ${ctaBtn()}
    </div>
  </section>`;
}

function servicePage(slug) {
  const P = PAGES[slug];
  const svc = SERVICES.find((s) => s.slug === slug);
  const path = '/' + slug;
  const bc = [{ name: 'Trang chủ', href: '/' }, { name: 'Dịch vụ', href: '/#dich-vu' }, { name: svc.name, href: path }];

  const faqSec = P.sections.find((s) => s.type === 'faq');
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Service', name: P.title, serviceType: 'Tư vấn Bát Tự',
      description: P.description, url: SITE.url + path, areaServed: 'VN', inLanguage: 'vi',
      provider: { '@id': SITE.url + '/#org', '@type': 'ProfessionalService', name: SITE.name, telephone: '+84345843443', url: SITE.url + '/' },
    },
    breadcrumbLd(bc),
    faqSec && {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqSec.items.map((it) => ({
        '@type': 'Question', name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: stripTags([...(it.a || []), ...(it.defs || []).map((d) => `${d.t}: ${d.d.join(' ')}`)].join('\n')) },
      })),
    },
  ];

  // lặp lại lưu ý (nếu có) — đặt trong hero
  const hero = `<div class="wrap">
    ${crumbs(bc.map((b, i) => (i === bc.length - 1 ? { name: b.name } : b)))}
    <section class="page-hero" aria-labelledby="page-title">
      <div class="ph-inner">
        <div class="ph-copy">
          <span class="eyebrow">Dịch vụ tư vấn Bát Tự</span>
          <h1 id="page-title">${nb(P.title)}</h1>
          ${P.intro.map((p) => `<p>${p}</p>`).join('\n          ')}${P.questions ? `
          <ul class="q">${P.questions.map((q) => `<li>${ICONS.question}<span>${q}</span></li>`).join('')}</ul>` : ''}${P.introAfter ? `
          <p>${P.introAfter}</p>` : ''}${P.note ? `
          <p class="ph-note">${ICONS.info}<span>${P.note}</span></p>` : ''}
          <div class="ph-ctas">
            <a class="btn btn-primary" href="#dang-ky">Đăng ký tư vấn</a>
            <a class="btn btn-ghost" href="${SITE.zalo}" target="_blank" rel="noopener">Nhắn Zalo ${SITE.phoneDisplay}</a>
          </div>
        </div>
        <div class="ph-art" aria-hidden="true">${ICONS[svc.icon]}</div>
      </div>
    </section>
  </div>`;

  // xen kẽ nền: section đăng ký luôn là "alt" nếu section trước không alt
  const lastAlt = !!P.sections[P.sections.length - 1].alt;
  const others = SERVICES.filter((s) => s.slug !== slug);

  return `${head({ title: P.seoTitle, description: P.description, path, jsonLd: ld })}
<body>
${header({ active: slug, ctaHref: '#dang-ky' })}

<main>
  ${hero}

  ${P.sections.map(sectionHtml).join('\n\n  ')}

  <section${lastAlt ? '' : ' class="alt"'} id="dang-ky">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Đăng ký</span>
        <h2>${nb(P.regTitle)}</h2>
        <p>Đăng ký theo 1 trong hai cách:</p>
      </div>
      <div class="reg-grid">
        <div class="reg-card">
          <div class="rc-top"><span class="icon">${ICONS.chat}</span><span class="rc-n">Cách 1</span></div>
          <h3>Liên hệ trực tiếp qua Zalo</h3>
          <p class="big">${SITE.phoneDisplay}</p>
          <p>Nhắn tin Zalo để được Đỗ Gia tư vấn và xác nhận lịch nhanh nhất.</p>
          <a class="btn btn-primary" href="${SITE.zalo}" target="_blank" rel="noopener">Nhắn Zalo ngay ${ICONS.arrow}</a>
        </div>
        <div class="reg-card">
          <div class="rc-top"><span class="icon">${ICONS.form}</span><span class="rc-n">Cách 2</span></div>
          <h3>Điền form đăng ký</h3>
          <p>Điền form đăng ký, Đỗ Gia sẽ liên hệ qua tin nhắn Zalo để xác nhận.</p>
          <a class="btn btn-primary" href="${SITE.formService}" target="_blank" rel="noopener">Mở form đăng ký ${ICONS.arrow}</a>
        </div>
      </div>
    </div>
  </section>

  <section${lastAlt ? ' class="alt"' : ''} id="dich-vu-khac">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Khám phá thêm</span>
        <h2>Dịch vụ khác của ${nb('Đỗ Gia')}</h2>
      </div>
      <div class="others">
        ${others.map((s) => `<a class="other" href="/${s.slug}">
          <span class="icon">${ICONS[s.icon]}</span>
          <h3>${s.name}</h3>
          <p>${s.short}</p>
          <span class="more">Xem chi tiết ${ICONS.arrow}</span>
        </a>`).join('\n        ')}
      </div>
    </div>
  </section>
</main>

${footer()}`;
}

writeFileSync(join(ROOT, 'index.html'), homePage());
for (const slug of Object.keys(PAGES)) writeFileSync(join(ROOT, `${slug}.html`), servicePage(slug));
console.log('Đã sinh: index.html,', Object.keys(PAGES).map((s) => s + '.html').join(', '));
