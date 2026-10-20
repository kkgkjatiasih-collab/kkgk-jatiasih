# Website KKGK Kecamatan Jatiasih

Website statis sederhana, responsif, dan berbahasa Indonesia.

## Isi
- `index.html` — struktur halaman dan konten contoh
- `style.css` — desain biru-putih dan tampilan responsif
- `script.js` — menu mobile, modal login demo, dan interaksi sederhana
- `assets/logo-kkgk.png` — logo resmi KKGK yang diberikan

## Cara mencoba di komputer
1. Ekstrak file ZIP ke sebuah folder.
2. Buka folder `kkgk_jatiasih_website`.
3. Klik dua kali `index.html` untuk membukanya di browser.
4. Coba menu Profil, Berita & Kegiatan, Galeri, dan tombol Login Admin.

Tidak perlu instalasi aplikasi atau menjalankan server untuk mencoba versi awal ini. Font dari Google Fonts memerlukan internet; jika offline, browser akan memakai font cadangan.

## Cara mengubah isi
- Nama dan isi halaman: edit `index.html` dengan Notepad atau editor teks.
- Warna, ukuran, dan desain: edit `style.css`.
- Interaksi tombol: edit `script.js`.
- Konten berita dan placeholder galeri di `index.html` masih contoh. Ganti dengan data resmi, tanggal, tautan, dan foto kegiatan KKGK yang boleh dipublikasikan.
- Tombol WhatsApp menggunakan tautan placeholder `https://wa.me/`. Ganti dengan nomor resmi dalam format internasional tanpa tanda `+`, spasi, atau tanda baca. Contoh format: `https://wa.me/62812xxxxxxxx`.

## Penting tentang Login Admin
Login yang tersedia saat ini hanya simulasi antarmuka. Tidak ada akun atau kata sandi yang valid, tidak ada autentikasi server, dan tidak ada penyimpanan konten. Jangan memasukkan kata sandi asli. Untuk login admin sungguhan, diperlukan backend atau layanan autentikasi serta tempat penyimpanan berita dan foto.

## Cara menerbitkan gratis
Pilihan mudah untuk website statis adalah GitHub Pages atau Netlify:
1. Buat akun di layanan pilihan.
2. Unggah/push file `index.html`, `style.css`, dan `script.js` ke proyek atau situs baru.
3. Ikuti instruksi layanan untuk menerbitkan situs statis.
4. Layanan akan memberi alamat publik gratis. Nama alamat mengikuti ketersediaan layanan; domain sendiri bisa ditambahkan kemudian.

Pastikan tidak mengunggah data pribadi anggota atau siswa tanpa izin.

## Persiapan Login Admin (Decap CMS)
Paket ini sekarang menyertakan `admin/index.html` dan `admin/config.yml` untuk rancangan CMS. URL admin: `/admin/`.

**Login belum aktif hanya dengan mengunggah folder.** Agar pengelolaan konten sungguhan berfungsi:
1. Simpan proyek ini dalam repositori GitHub dengan nama cabang `main`.
2. Di Netlify, hubungkan site ke repositori GitHub (Site configuration / Build & deploy).
3. Aktifkan Identity dari Project configuration > Identity.
4. Ubah pendaftaran menjadi Invite only dan undang email administrator.
5. Aktifkan Git Gateway sesuai menu Netlify yang tersedia.
6. Pastikan `admin/config.yml` memakai branch `main`, lalu deploy ulang dari repositori.

Admin CMS memakai Git Gateway/Decap CMS. Rujukan resmi: https://docs.netlify.com/manage/security/secure-access-to-sites/identity/overview/ dan https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/.
