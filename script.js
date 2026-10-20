const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

document.getElementById('year').textContent = new Date().getFullYear();

const modal = document.getElementById('loginModal');
const loginMessage = document.getElementById('loginMessage');
function openLogin() {
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  loginMessage.textContent = '';
  setTimeout(() => document.getElementById('username').focus(), 50);
}
function closeLogin() {
  modal.hidden = true;
  document.body.style.overflow = '';
}
document.getElementById('openLogin').addEventListener('click', openLogin);
document.getElementById('footerLogin').addEventListener('click', openLogin);
document.getElementById('closeLogin').addEventListener('click', closeLogin);
modal.addEventListener('click', event => { if (event.target === modal) closeLogin(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeLogin(); });

document.getElementById('loginForm').addEventListener('submit', event => {
  event.preventDefault();
  loginMessage.textContent = 'Ini hanya demo antarmuka. Login belum terhubung ke sistem admin.';
});

const toast = document.getElementById('toast');
document.getElementById('showAllNews').addEventListener('click', () => {
  toast.textContent = 'Konten berita contoh. Tambahkan berita resmi pada file index.html.';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3200);
});
