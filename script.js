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
if (showAllNews) {
  showAllNews.addEventListener('click', () => {
    toast.textContent = 'Berita resmi akan ditampilkan setelah konten diterbitkan melalui Admin KKGK.';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3200);
  });
}

// Mengambil berita terbaru dari CMS KKGK
(async function loadKKGKNews() {
  const newsGrid = document.getElementById('newsGrid');
  if (!newsGrid) return;

  const apiUrl =
    'https://api.github.com/repos/kkgkjatiasih-collab/kkgk-jatiasih/contents/content/berita?ref=main';

  function getField(text, field) {
    const match = text.match(
      new RegExp('^' + field + ':\\s*["\\']?([^\\r\\n]*?)["\\']?\\s*$', 'm')
    );
    return match ? match[1].trim() : '';
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
        <article class="news-card">
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
    }).join('');

  } catch (error) {
    console.error('Berita KKGK:', error);
    newsGrid.innerHTML =
      '<p class="demo-note">Berita belum dapat dimuat. Silakan coba beberapa saat lagi.</p>';
  }
})();
