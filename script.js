const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  menuToggle.textContent = open ? '×' : '☰';
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Buka menu');
    menuToggle.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const toast = document.getElementById('toast');
const showAllNews = document.getElementById('showAllNews');


// Mengambil berita terbaru dari CMS KKGK
(async function loadKKGKNews() {
  const newsGrid = document.getElementById('newsGrid');
  if (!newsGrid) return;

  const apiUrl =
    'https://api.github.com/repos/kkgkjatiasih-collab/kkgk-jatiasih/contents/content/berita?ref=main';

  function getField(text, field) {
  const pattern = new RegExp(
    "^" + field + ":\\s*[\"']?([^\\r\\n]*?)[\"']?\\s*$",
    "m"
  );
  const match = text.match(pattern);
  return match ? match[1].trim() : "";
}

  function cleanText(text) {
    return text
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[#>*_`~-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeHTML(text) {
    return text.replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Gagal mengambil daftar berita');

    const files = await response.json();
    const markdownFiles = files.filter(file =>
      file.name.endsWith('.md')
    );

    const articles = await Promise.all(
      markdownFiles.map(async file => {
        const result = await fetch(file.download_url);
        if (!result.ok) return null;

        const content = await result.text();
        const parts = content.split(/^---\s*$/m);
        const metadata = parts.length >= 3 ? parts[1] : '';
        const body = parts.length >= 3 ? parts.slice(2).join(' ') : content;

        return {
          title: getField(metadata, 'title') || file.name,
          date: getField(metadata, 'date'),
          description: getField(metadata, 'description'),
          body: cleanText(body)
        };
      })
    );

    const latest = articles
      .filter(article => article && article.title)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 6);

    if (!latest.length) {
      newsGrid.innerHTML =
        '<p class="demo-note">Belum ada berita yang diterbitkan.</p>';
      return;
    }

    newsGrid.innerHTML = latest.map((article, index) => {
      const colors = ['visual-blue', 'visual-cyan', 'visual-navy'];
      const symbols = ['✦', '◎', '↗'];
      const date = article.date
        ? article.date.substring(0, 10)
        : '';

      return `
        <article class="news-card" data-news-index="${index}">
          <div class="news-visual ${colors[index % 3]}">
            <span class="visual-symbol">${symbols[index % 3]}</span>
            <span class="visual-tag">BERITA KKGK</span>
            <div class="visual-title">
              ${escapeHTML(article.title)}
              <small>Informasi dan kegiatan komunitas guru</small>
            </div>
          </div>
          <div class="news-content">
            <div class="news-meta">
              <span>BERITA KKGK</span>
              <span>${escapeHTML(date)}</span>
            </div>
            <h3>${escapeHTML(article.title)}</h3>
            <p>${escapeHTML(article.description || article.body.slice(0, 160))}</p>
            <p>${escapeHTML(article.body.slice(0, 220))}</p>
          </div>
        </article>
      `;
    }).join('');// Menampilkan seluruh arsip berita CMS
if (showAllNews) {
  showAllNews.addEventListener('click', () => {
    let archive = document.getElementById('newsArchiveDialog');

    if (!archive) {
      archive = document.createElement('dialog');
      archive.id = 'newsArchiveDialog';
      archive.style.cssText =
        'width:min(800px,90%);max-height:85vh;overflow:auto;border:0;border-radius:16px;padding:28px;box-shadow:0 10px 40px #0004;';
      document.body.appendChild(archive);
    }

    function showArchiveList() {
      archive.innerHTML = `
        <button id="closeArchive" style="float:right;padding:8px 14px">
          Tutup ✕
        </button>
        <h2>Arsip Berita KKGK Jatiasih</h2>
        <p>Seluruh berita dan kegiatan yang telah diterbitkan.</p>
        <hr>
        ${articles
          .filter(article => article && article.title)
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((article, index) => `
            <div style="padding:14px 0;border-bottom:1px solid #ddd">
              <p style="color:#2875c7">${escapeHTML(article.date || '')}</p>
              <button class="archive-item" data-index="${index}"
                style="border:0;background:none;color:#174f91;font-size:17px;font-weight:bold;text-align:left;cursor:pointer">
                ${escapeHTML(article.title)}
              </button>
              <p>${escapeHTML(article.description || '')}</p>
            </div>
          `).join('')}
      `;

      archive.showModal();

      archive.querySelector('#closeArchive')
        .addEventListener('click', () => archive.close());

      archive.querySelectorAll('.archive-item').forEach(button => {
        button.addEventListener('click', () => {
          const allArticles = articles
            .filter(article => article && article.title)
            .sort((a, b) => b.date.localeCompare(a.date));

          const article = allArticles[Number(button.dataset.index)];

          archive.innerHTML = `
            <button id="backArchive" style="padding:8px 14px">
              ← Kembali ke Arsip
            </button>
            <h2>${escapeHTML(article.title)}</h2>
            <p>${escapeHTML(article.date || '')}</p>
            <p>${escapeHTML(article.description || '')}</p>
            <hr>
            <p style="white-space:pre-wrap;line-height:1.8">
              ${escapeHTML(article.body)}
            </p>
          `;

          archive.querySelector('#backArchive')
            .addEventListener('click', showArchiveList);
        });
      });
    }

    showArchiveList();
  });
}
// Membuka berita lengkap saat kartu diklik
newsGrid.querySelectorAll('.news-card').forEach(card => {
  card.style.cursor = 'pointer';

  card.addEventListener('click', () => {
    const article = latest[Number(card.dataset.newsIndex)];
    if (!article) return;

    let dialog = document.getElementById('newsDetailDialog');

    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'newsDetailDialog';
      dialog.style.cssText =
        'width:min(700px,90%);max-height:85vh;overflow:auto;border:0;border-radius:16px;padding:28px;box-shadow:0 10px 40px #0004;';
      document.body.appendChild(dialog);
    }

    dialog.innerHTML = `
      <button id="closeNewsDetail"
        style="float:right;padding:8px 14px;cursor:pointer">
        Tutup ✕
      </button>
      <p style="color:#2875c7">${escapeHTML(article.date || '')}</p>
      <h2>${escapeHTML(article.title)}</h2>
      <p>${escapeHTML(article.description || '')}</p>
      <hr>
      <p style="white-space:pre-wrap;line-height:1.8">
        ${escapeHTML(article.body)}
      </p>
    `;

    dialog.showModal();

    document.getElementById('closeNewsDetail')
      .addEventListener('click', () => dialog.close());
  });
});
  } catch (error) {
    console.error('Berita KKGK:', error);
    newsGrid.innerHTML =
      '<p class="demo-note">Berita belum dapat dimuat. Silakan coba beberapa saat lagi.</p>';
  }
})();
