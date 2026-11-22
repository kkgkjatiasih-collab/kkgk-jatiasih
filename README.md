# Website KKGK Kecamatan Jatiasih

Website statis responsif berbahasa Indonesia untuk KKGK Kecamatan Jatiasih.

## Struktur
- `index.html` — halaman utama: Beranda, Profil, Pengurus, Program Kerja, Berita, Galeri, dan Kontak.
- `style.css` — desain biru-putih dan tata letak responsif.
- `script.js` — navigasi mobile dan interaksi halaman.
- `assets/logo-kkgk.png` — logo KKGK yang disertakan dalam paket.
- `admin/` — antarmuka Decap CMS.
- `content/` — berkas konten Markdown untuk CMS.

## Menjalankan lokal
Ekstrak ZIP, lalu buka `index.html` di browser. Untuk menguji CMS dan fungsi autentikasi, situs harus dipublikasikan melalui Netlify dengan konfigurasi Identity dan Git Gateway yang benar.

## Pengelolaan konten
Alamat admin setelah deploy: `https://kkgkjatiasih.netlify.app/admin/`.

CMS disiapkan menggunakan Decap CMS dengan backend `git-gateway` pada branch `main`. Agar login dan penyimpanan konten aktif:
1. Pastikan seluruh isi folder proyek berada di repositori GitHub yang terhubung ke situs Netlify.
2. Pastikan branch produksi yang dipakai adalah `main`.
3. Di pengaturan Netlify, aktifkan Netlify Identity (jika tersedia pada konfigurasi akun/site).
4. Atur pendaftaran menjadi undangan saja (Invite only), lalu undang akun pengelola.
5. Aktifkan Git Gateway bila tersedia untuk site tersebut.
6. Deploy ulang, kemudian uji login di `/admin/` dan buat satu berita uji.

Catatan: menambahkan file CMS ke ZIP tidak otomatis mengaktifkan Identity/Git Gateway di akun Netlify. Fitur admin baru dapat dinyatakan aktif setelah pengaturan dashboard dan pengujian berhasil.

## Data yang masih harus dilengkapi
- Nama dan jabatan pengurus berdasarkan SK resmi.
- Program kerja final, jadwal, penanggung jawab, dan target.
- Berita serta foto kegiatan yang boleh dipublikasikan.
- Nomor WhatsApp atau alamat kontak resmi.
- Profil organisasi yang telah disahkan.

Jangan memasukkan data pribadi anggota atau siswa tanpa izin.
