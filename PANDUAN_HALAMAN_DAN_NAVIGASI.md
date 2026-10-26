# Panduan Lengkap Halaman, Fungsi Sistem, dan Alur Navigasi Tombol
## Sistem Informasi Manajemen (SIM) Penugasan Paguyuban Cak & Ning Surabaya

Dokumen ini disusun untuk memberikan dokumentasi lengkap mengenai seluruh halaman yang terdapat di dalam aplikasi, fungsi-fungsi teknis dan bisnis yang berjalan di masing-masing modul, serta pemetaan navigasi tombol (*button routing*) ke halaman tujuan.

---

## 📑 Daftar Isi
1. [Ringkasan Arsitektur & Hak Akses (Multi-Role)](#1-ringkasan-arsitektur--hak-akses-multi-role)
2. [Matriks Navigasi & Peta Seluruh Layar (Sitemap)](#2-matriks-navigasi--peta-seluruh-layar-sitemap)
3. [Komponen Navigasi Global & Kontroler Prototipe](#3-komponen-navigasi-global--kontroler-prototipe)
4. [Kategori 1: Layar Universal, Blueprint Lo-Fi & Autentikasi](#4-kategori-1-layar-universal-blueprint-lo-fi--autentikasi)
5. [Kategori 2: Alur Publik / Masyarakat Umum (Guest Flow)](#5-kategori-2-alur-publik--masyarakat-umum-guest-flow)
6. [Kategori 3: Alur Manajemen SDM & Diklat (SDM Flow)](#6-kategori-3-alur-manajemen-sdm--diklat-sdm-flow)
7. [Kategori 4: Alur Hubungan Masyarakat & Kemitraan (Humas Flow)](#7-kategori-4-alur-hubungan-masyarakat--kemitraan-humas-flow)
8. [Kategori 5: Alur Duta Wisata / Anggota (Talent Flow)](#8-kategori-5-alur-duta-wisata--anggota-talent-flow)
9. [Kategori 6: Alur Keuangan & Pembayaran (Bendahara Flow)](#9-kategori-6-alur-keuangan--pembayaran-bendahara-flow)
10. [Alur Integrasi Lintas Peran (End-to-End Workflow)](#10-alur-integrasi-lintas-peran-end-to-end-workflow)

---

## 1. Ringkasan Arsitektur & Hak Akses (Multi-Role)

Sistem dirancang menggunakan pendekatan **Role-Based Access Control (RBAC)** dengan 5 peran pengguna:
1. **Guest (Masyarakat Umum / Mitra Eksternal)**: Mengakses portal publikasi pariwisata Kota Surabaya, profil duta, agenda kegiatan, galeri, blog, serta mengirim permohonan kolaborasi.
2. **SDM (Sumber Daya Manusia & Diklat)**: Mengelola database anggota/talent, memantau ketersediaan jadwal, melakukan *plotting* penugasan, serta memvalidasi laporan pertanggungjawaban (LPJ).
3. **Humas (Hubungan Masyarakat)**: Mengelola hubungan klien/mitra, sponsor, publikasi berita/artikel, dokumentasi media, dan mengusulkan kegiatan penugasan baru.
4. **Talent (Cak & Ning / Duta Wisata)**: Menerima atau menolak mandat penugasan, menyusun laporan kegiatan (LPJ), memantau riwayat tugas, serta memeriksa pencairan honorarium.
5. **Bendahara (Keuangan)**: Mengelola buku kas umum, mencatat penerimaan sponsorship/dana operasional, memverifikasi tagihan honor, dan mencairkan transfer honorarium kepada talent.

---

## 2. Matriks Navigasi & Peta Seluruh Layar (Sitemap)

| No | ID Layar (*Screen ID*) | Nama Tampilan | Peran Utama | Halaman Tujuan Navigasi Utama |
|---|---|---|---|---|
| **0** | `LOFI_LAYOUT_GUIDE` | 📐 Lo-Fi Layout & Component Blueprint | Semua / Publik | `GUEST_HOME` |
| **1** | `LOGIN` | Halaman Masuk Sistem | Guest / Semua | Sesuai Peran: `SDM_DASHBOARD`, `HUMAS_DASHBOARD`, `TALENT_DASHBOARD`, `BENDAHARA_DASHBOARD` |
| **2** | `ALL_PROFILE` | Halaman Profil Akun Pengguna | Pengguna Internal | Menyimpan data akun / Tetap di halaman profil |
| **3** | `ALL_NOTIFICATIONS` | Pusat Notifikasi Terintegrasi | Pengguna Internal | Menandai notifikasi dibaca |
| **4** | `GUEST_HOME` | Portal Beranda & Profil Paguyuban | Publik | `GUEST_TALENTS`, `GUEST_KEGIATAN`, `GUEST_CONTACT`, `LOGIN`, `LOFI_LAYOUT_GUIDE` |
| **5** | `GUEST_TALENTS` | Direktori Publik Talent Cak & Ning | Publik | Modal Profil Detail, `GUEST_CONTACT` |
| **6** | `GUEST_KEGIATAN` | Direktori Agenda Wisata & Acara | Publik | `GUEST_CONTACT` (Ajukan Kolaborasi) |
| **7** | `GUEST_BLOG` | Portal Berita & Artikel Suroboyoan | Publik | Modal Baca Artikel Lengkap |
| **8** | `GUEST_GALLERY` | Galeri Dokumentasi Foto & Video | Publik | Filter Kategori Media |
| **9** | `GUEST_CONTACT` | Formulir Kontak & Pengajuan Kerjasama | Publik | Mengirim Pesan Kolaborasi ke Humas |
| **10** | `SDM_DASHBOARD` | Dashboard Utama Pengurus SDM | SDM | `SDM_PLOTTING`, `SDM_USER_MANAGEMENT`, `SDM_PENUGASAN_MGMT`, `SDM_VALIDATION_MGMT` |
| **11** | `SDM_PLOTTING` | Form Plotting Penugasan Talent | SDM | `SDM_DASHBOARD` (Konfirmasi Plotting atau Batal) |
| **12** | `SDM_USER_MANAGEMENT` | Manajemen Akun & Pengguna | SDM | Modal Tambah/Edit User, `SDM_DASHBOARD` |
| **13** | `SDM_PENUGASAN_MGMT` | Daftar & Manajemen Seluruh Penugasan | SDM | Modal Tambah Manual, `SDM_DASHBOARD` |
| **14** | `SDM_VALIDATION_MGMT` | Validasi Laporan LPJ Kegiatan | SDM | Setujui / Revisi LPJ, `SDM_DASHBOARD` |
| **15** | `HUMAS_DASHBOARD` | Dashboard Utama Pengurus Humas | Humas | `HUMAS_CLIENTS`, `HUMAS_SPONSORS`, `HUMAS_BLOGS`, `HUMAS_GALLERY`, `HUMAS_KEGIATAN`, `HUMAS_PROPOSE`, `HUMAS_PENUGASAN` |
| **16** | `HUMAS_CLIENTS` | Kelola Client & Mitra Instansi | Humas | Modal Tambah Client, Catat Log Interaksi |
| **17** | `HUMAS_SPONSORS` | Kelola Sponsor & Kemitraan | Humas | Modal Tambah Sponsor |
| **18** | `HUMAS_BLOGS` | Kelola Artikel Berita & Rilis Pers | Humas | Modal Tulis Artikel Baru |
| **19** | `HUMAS_GALLERY` | Kelola Galeri Foto & Video | Humas | Modal Unggah Media |
| **20** | `HUMAS_KEGIATAN` | Kelola Agenda Kegiatan Pariwisata | Humas | Modal Tambah Kegiatan (Memicu Notifikasi SDM) |
| **21** | `HUMAS_PROPOSE` | Rekomendasi Calon Talent untuk Acara | Humas | `HUMAS_DASHBOARD` |
| **22** | `HUMAS_PENUGASAN` | Monitoring Status Penugasan Real-Time | Humas | `HUMAS_DASHBOARD` |
| **23** | `TALENT_DASHBOARD` | Dashboard Utama Talent Duta Wisata | Talent | `TALENT_ASSIGNMENTS`, `TALENT_HISTORY`, `TALENT_HONOR`, `TALENT_PROFILE_EDIT` |
| **24** | `TALENT_ASSIGNMENTS` | Daftar Penugasan Saya (Inbox Mandat) | Talent | `TALENT_DETAIL` |
| **25** | `TALENT_DETAIL` | Rincian Mandat Penugasan Terpilih | Talent | `TALENT_REPORT_FORM`, `TALENT_ASSIGNMENTS` |
| **26** | `TALENT_REPORT_FORM` | Formulir Pengunggahan Laporan (LPJ) | Talent | `TALENT_ASSIGNMENTS` (Submit LPJ), `TALENT_DETAIL` (Batal) |
| **27** | `TALENT_HISTORY` | Riwayat Kegiatan & Penugasan Selesai | Talent | `TALENT_DASHBOARD` |
| **28** | `TALENT_HONOR` | Rekapitulasi Honorarium & Bukti Bayar | Talent | `TALENT_DASHBOARD` |
| **29** | `TALENT_PROFILE_EDIT` | Edit Portofolio, Biodata, & Sosial Media | Talent | `TALENT_DASHBOARD` |
| **30** | `BENDAHARA_DASHBOARD` | Dashboard Utama Keuangan & Pembayaran | Bendahara | `BENDAHARA_PAYMENT_INPUT`, `BENDAHARA_REPORT`, `BENDAHARA_KELOLA_KEUANGAN` |
| **31** | `BENDAHARA_PAYMENT_INPUT` | Input Pencairan & Transfer Honorarium | Bendahara | `BENDAHARA_DASHBOARD` (Konfirmasi Bayar / Batal) |
| **32** | `BENDAHARA_REPORT` | Rekapitulasi & Ekspor Laporan Kas | Bendahara | Cetak / Print, Ekspor Excel/CSV, `BENDAHARA_DASHBOARD` |
| **33** | `BENDAHARA_KELOLA_KEUANGAN` | Kelola Buku Kas Umum & Transaksi | Bendahara | Modal Tambah Transaksi, `BENDAHARA_DASHBOARD` |

---

## 3. Komponen Navigasi Global & Kontroler Prototipe

### 3.1. Header Atas (Top Bar Dashboard Internal) & Unified Profile Dropdown
Muncul pada seluruh tampilan peran internal (SDM, Humas, Talent, Bendahara, Ketua Umum).
- **Branding "Cak Ning"**: Logo identitas sistem, sub-judul instansi Disbudparpora Kota Surabaya, dan indikator area peran aktif.
- **Tombol Reset Data**: Mengembalikan seluruh data simulasi (tabel klien, penugasan, kas) ke kondisi awal.
- **Integrated Profile & Account Dropdown (Menyatukan Profil, Notifikasi, Switch Role, & Logout)**:
  - *Tombol Avatar & Nama*: Menampilkan nama pengguna, peran aktif, avatar inisial, lencana notifikasi baru (*unread pulse badge*), dan ikon dropdown.
  - *Header Akun*: Menampilkan foto/inisial, nama lengkap, email resmi, dan tag peran.
  - *Menu "Update Profil Saya"*: Mengarahkan ke halaman `PROFILE` untuk memperbarui biodata, spesialisasi, media sosial, dan kata sandi.
  - *Menu "Pusat Notifikasi"*: Menampilkan jumlah notifikasi belum dibaca (*badge*) dan mengarahkan ke halaman `NOTIFICATIONS`.
  - *Pill "Ganti Peran Aktif"*: Shortcut 1-klik untuk berganti peran seketika (SDM, Humas, Talent, Bendahara).
  - *Tombol "Keluar (Logout)" (Aksen Merah)*: Mengakhiri sesi aktif pengguna, menampilkan pesan konfirmasi logout, dan mengarahkan ke halaman `LOGIN`.

### 3.2. Sidebar Kiri (Drawer Sidebar Internal)
Menyediakan akses menu navigasi terstruktur yang **secara eksklusif HANYA berisi modul milik peran tersebut**:
- **Tombol Ciutkan/Perluas Menu (Toggle Sidebar)**:
  - *Fungsi*: Mengubah lebar sidebar antara tampilan penuh dan tampilan ringkas.
- **Daftar Menu Bersih Sesuai Peran Aktif**:
  - *Humas*: Dashboard, Kelola Client, Kelola Sponsor, Pengajuan Penugasan, Lihat Talent.
  - *SDM*: Dashboard, Manajemen User, Daftar Talent, Penugasan Talent, Validasi Laporan.
  - *Talent*: Dashboard, Penugasan Saya, Riwayat (Kegiatan & Honor), Rating & Profil.
  - *Bendahara*: Dashboard, Daftar Pembayaran.
  - *Ketua Umum*: Dashboard Pengawasan Eksekutif.
- **Footer Sidebar**:
  - Teks identitas paguyuban & hak cipta (tanpa tombol redundan ke publik, karena perpindahan ke portal publik sudah terakomodasi di Prototype Navigator).

### 3.3. Figma-Style Prototype Controller (Widget Melayang Kanan Bawah)
Komponen penguji purwarupa untuk berpindah peran dan meloncat langsung ke seluruh 33 layar tanpa batasan alur otentikasi.
- **Tombol Toggle Navigator**: Membuka/menutup laci navigasi purwarupa.
- **Pill Pemilih Peran Cepat (Quick Switcher)**:
  - Tombol `Guest` ➔ Beralih ke portal masyarakat umum.
  - Tombol `SDM` ➔ Otomatis masuk sebagai Pengurus SDM (Cak Dimas Prasetyo) dan mengarah ke `SDM_DASHBOARD`.
  - Tombol `Humas` ➔ Otomatis masuk sebagai Pengurus Humas (Ning Nabila Putri) dan mengarah ke `HUMAS_DASHBOARD`.
  - Tombol `Talent` ➔ Otomatis masuk sebagai Talent Duta Wisata (Cak Fajar Alamsyah) dan mengarah ke `TALENT_DASHBOARD`.
  - Tombol `Bendahara` ➔ Otomatis masuk sebagai Bendahara (Cak Reza Fahlevi) dan mengarah ke `BENDAHARA_DASHBOARD`.
- **Menu Dropdown Lompat Layar**: Melompat langsung ke nomor layar 0 s.d. 32.
- **Tombol "Reset Data Prototipe"**: Mereset ulang data simulasi (kegiatan, penugasan, transaksi, notifikasi) kembali ke status default awal.

---

## 4. Kategori 1: Layar Universal, Blueprint Lo-Fi & Autentikasi

### 4.1. 📐 Panduan Tata Letak & Posisi Komponen (`LOFI_LAYOUT_GUIDE`)
- **Tujuan**: Menampilkan gambaran kasar tata letak (*wireframe low-fidelity monochrome*) tanpa isian konten warna penuh, memperlihatkan hierarki posisi Navbar, Body, Footer, Drawer Sidebar, Form Input, Tabel Data, dan Modal Window.
- **Komponen Utama**:
  - Tab Navigasi Blueprint: `Semua Blueprint`, `1. Tampilan Umum`, `2. Dashboard`, `3. Form & Modal`, `4. Data List & Drawer`.
  - Placeholder kawat bersilang (*diagonal cross blueprint box*).
  - Anotasi dimensi dan z-index komponen.
- **Tombol dan Aksi Navigasi**:
  - `Tampilkan/Sembunyikan Catatan Posisi`: Mengaktifkan/menonaktifkan tag deskripsi posisi komponen di layar.
  - `Kembali ke Aplikasi Utama`: Mengarahkan ke `GUEST_HOME`.
  - `Uji Buka Modal Overlay`: Membuka simulasi pop-up dialog modal kawat di tengah layar.
  - `Uji Buka Slide-over Drawer`: Membuka simulasi panel samping kanan kawat murni (*slide-over drawer*).

---

### 4.2. Halaman Masuk Sistem (`LOGIN`)
- **Tujuan**: Pintu masuk resmi bagi pengurus dan talent terdaftar untuk mengakses area administrasi.
- **Komponen Utama**:
  - Form Username & Password dengan fitur intip sandi (*toggle show/hide password*).
  - Kotak peringatan validasi input jika kredensial salah.
  - Kartu Kredensial Cepat (*Quick Fill Login Pills*) untuk pengujian cepat 4 akun resmi.
- **Tombol dan Aksi Navigasi**:
  - `Masuk ke Sistem (Submit Form)`:
    - Memverifikasi kecocokan username dan password.
    - Jika berhasil:
      - Peran SDM ➔ diarahkan ke `SDM_DASHBOARD`.
      - Peran Humas ➔ diarahkan ke `HUMAS_DASHBOARD`.
      - Peran Talent ➔ diarahkan ke `TALENT_DASHBOARD`.
      - Peran Bendahara ➔ diarahkan ke `BENDAHARA_DASHBOARD`.
  - `Klik Akun SDM / Humas / Talent / Bendahara (Quick Login Pills)`: Mengisi form secara instan dan langsung mengarahkan ke dashboard masing-masing peran.
  - `Kembali ke Beranda Publik`: Mengarahkan ke `GUEST_HOME`.

---

### 4.3. Halaman Profil Saya (`ALL_PROFILE`)
- **Tujuan**: Menampilkan dan memperbarui data personal, kontak, portofolio, dan kata sandi akun pengguna yang sedang masuk.
- **Komponen Utama**:
  - Header kartu profil (Avatar inisial, nama, badge peran, angkatan, status aktif).
  - Tab Menu: `Informasi Dasar`, `Keamanan Akun & Sandi`, `Informasi Peran & Poin`.
  - Form input: Nama lengkap, email, nomor WhatsApp/telepon, username, bio singkat, ganti sandi baru.
- **Tombol dan Aksi Navigasi**:
  - `Simpan Perubahan Profil`:
    - Memperbarui state pengguna di seluruh sistem.
    - Menampilkan notifikasi sukses dan memperbarui kartu identitas pada Header Bar.

---

### 4.4. Pusat Notifikasi Terintegrasi (`ALL_NOTIFICATIONS`)
- **Tujuan**: Menerima peringatan otomatis lintas peran (misal: ajuan tugas baru, tanggapan talent, pengunggahan LPJ, validasi laporan, dan pencairan honor).
- **Komponen Utama**:
  - Tab Filter: `Semua Notifikasi` dan `Belum Dibaca`.
  - Kartu notifikasi berbasis warna status (Hijau = Sukses/Lunas, Kuning/Oranye = Mandat Tugas/Revisi, Biru = Info Kegiatan).
- **Tombol dan Aksi Navigasi**:
  - `Tandai Semua Sudah Dibaca`: Menghapus tanda belum dibaca dari seluruh pesan dan menolkan lencana angka lonceng di header.
  - `Tandai Dibaca (Ikon Centang pada Baris Notifikasi)`: Menandai notifikasi spesifik tersebut telah dibaca.

---

## 5. Kategori 2: Alur Publik / Masyarakat Umum (Guest Flow)

Seluruh halaman publik dibungkus dalam `GuestLayout` yang memiliki header navigasi konsisten dan footer informasi resmi.

### 5.1. Beranda Publik & Profil Paguyuban (`GUEST_HOME`)
- **Tujuan**: Halaman muka utama yang menyajikan profil resmi Duta Wisata Cak & Ning Surabaya kepada masyarakat, wisatawan, dan mitra instansi.
- **Komponen Utama**:
  - Banner Utama (*Hero Banner Wireframe*) dengan narasi pesona destinasi wisata Surabaya.
  - Visi & Misi Paguyuban.
  - Struktur Pengurus Inti Paguyuban (Ketua, Wakil, Dinas Pembina).
  - Bagian Unduh Dokumen Publik (AD/ART, Formulir Pendaftaran, Proposal Kerjasama Sponsorship).
- **Tombol dan Aksi Navigasi**:
  - `Navbar Beranda / Profil`: Tetap di `GUEST_HOME`.
  - `Navbar Daftar Talent`: Mengarahkan ke `GUEST_TALENTS`.
  - `Navbar Daftar Kegiatan`: Mengarahkan ke `GUEST_KEGIATAN`.
  - `Navbar Blog Wisata`: Mengarahkan ke `GUEST_BLOG`.
  - `Navbar Galeri`: Mengarahkan ke `GUEST_GALLERY`.
  - `Navbar Kontak`: Mengarahkan ke `GUEST_CONTACT`.
  - `📐 Blueprint Layout`: Mengarahkan ke halaman `LOFI_LAYOUT_GUIDE`.
  - `Masuk Sistem (Log In)`: Mengarahkan ke halaman `LOGIN`.
  - `Unduh PDF (pada Daftar Dokumen)`: Memproses simulasi pengunduhan berkas PDF resmi paguyuban.

---

### 5.2. Direktori Publik Talent Cak & Ning (`GUEST_TALENTS`)
- **Tujuan**: Menampilkan katalog anggota duta wisata yang aktif beserta keahlian khusus dan angkatannya.
- **Komponen Utama**:
  - Ringkasan total jumlah talent terdaftar (fitur pencarian real-time diagendakan untuk Iterasi ke-2).
  - Grid kartu talent (Foto/Inisial, nama, gelar Cak/Ning, tahun angkatan, badge status aktif, jumlah penugasan).
  - Modal Rincian Profil Duta saat dipilih.
- **Tombol dan Aksi Navigasi**:
  - `Lihat Profil Lengkap`: Membuka jendela pop-up dialog yang menampilkan biografi lengkap, keahlian bahasa/seni, dan riwayat tugas publik.
  - `Hubungi Paguyuban untuk Penugasan Talent`: Mengarahkan langsung ke halaman `GUEST_CONTACT` dengan membawa konteks permohonan.

---

### 5.3. Direktori Agenda Kegiatan Wisata (`GUEST_KEGIATAN`)
- **Tujuan**: Menginformasikan jadwal festival budaya, acara kedinasan, pawai pariwisata, dan penugasan publik di Surabaya.
- **Komponen Utama**:
  - Filter kategori kegiatan (Semua, Kebudayaan, Pelatihan, Sosialisasi).
  - Kartu kegiatan: Judul acara, tanggal pelaksanaan, jam, lokasi/venue, deskripsi, kuota penugasan, dan status pelaksanaan.
- **Tombol dan Aksi Navigasi**:
  - `Ajukan Kolaborasi / Undangan`: Mengarahkan pengguna ke halaman formulir `GUEST_CONTACT`.

---

### 5.4. Portal Berita & Blog Suroboyoan (`GUEST_BLOG`)
- **Tujuan**: Publikasi tulisan artikel sejarah kebudayaan, liputan kegiatan terbaru, dan artikel promosi pariwisata lokal yang ditulis oleh divisi Humas.
- **Komponen Utama**:
  - Daftar kartu artikel dengan foto *wireframe*, judul artikel, tanggal terbit, nama penulis, dan cuplikan isi.
  - Modal pembaca artikel penuh.
- **Tombol dan Aksi Navigasi**:
  - `Baca Selengkapnya`: Membuka modal pop-up yang menyajikan keseluruhan isi tulisan artikel secara lengkap.

---

### 5.5. Galeri Media Foto & Dokumentasi (`GUEST_GALLERY`)
- **Tujuan**: Dokumentasi visual arsip foto dan video kegiatan adat, protokoler balai kota, dan bakti sosial Cak & Ning Surabaya.
- **Komponen Utama**:
  - Tombol filter kategori media (Semua, Kebudayaan, Protokoler, Pengabdian Masyarakat).
  - Grid media visual dengan label keterangan acara dan tanggal dokumentasi.

---

### 5.6. Formulir Hubungi Kami & Kolaborasi (`GUEST_CONTACT`)
- **Tujuan**: Sarana interaksi bagi instansi pemerintah, swasta, media, atau komunitas untuk mengundang duta wisata atau mengajukan kerjasama.
- **Komponen Utama**:
  - Formulir isian: Nama pemohon, nama instansi/organisasi, alamat email, nomor telepon/WhatsApp, subjek keperluan, dan rincian pesan undangan/kolaborasi.
  - Informasi kontak resmi sekretariat Paguyuban di Balai Pemuda Surabaya.
- **Tombol dan Aksi Navigasi**:
  - `Kirim Pesan Kolaborasi`:
    - Memvalidasi seluruh kolom formulir.
    - Menyimpan pesan ke dalam daftar kontak masuk divisi Humas.
    - Menampilkan notifikasi konfirmasi sukses dan mereset form.

---

## 6. Kategori 3: Alur Manajemen SDM & Diklat (SDM Flow)

### 6.1. Dashboard Utama Pengurus SDM (`SDM_DASHBOARD`)
- **Tujuan**: Pusat kendali divisi SDM untuk memantau kapasitas talent aktif, penugasan berjalan, mandat menunggu konfirmasi, serta antrean laporan LPJ masuk.
- **Komponen Utama**:
  - 4 Kartu Metrik Ringkasan: Total Talent Terdaftar, Penugasan Berjalan, Tugas Menunggu Konfirmasi, dan LPJ Butuh Validasi.
  - Tabel Kegiatan yang membutuhkan plotting talent (*status: Butuh Plotting*).
  - Panel panduan alur kerja divisi SDM.
- **Tombol dan Aksi Navigasi**:
  - `Mulai Plotting (pada baris tabel kegiatan)`: Memilih kegiatan bersangkutan dan langsung mengarahkan ke `SDM_PLOTTING`.
  - `Manajemen Penugasan (Tombol Header)`: Mengarahkan ke `SDM_PENUGASAN_MGMT`.
  - `Validasi Laporan (Tombol Header Oranye)`: Mengarahkan ke `SDM_VALIDATION_MGMT`.

---

### 6.2. Formulir Plotting Penugasan Talent (`SDM_PLOTTING`)
- **Tujuan**: Menentukan dan menugaskan talent duta wisata yang sesuai untuk mengisi kuota agenda kegiatan tertentu.
- **Komponen Utama**:
  - Pemilih kegiatan yang akan di-plotting (otomatis terisi dari dashboard).
  - Rincian acara: Tanggal, lokasi, honor per talent, serta kuota kebutuhan.
  - Daftar seluruh talent aktif dengan indikator ketersediaan (*Tersedia* atau *Bentrok Jadwal*), total poin, dan tahun angkatan.
  - Kotak centang (*checkbox*) untuk memilih talent.
- **Tombol dan Aksi Navigasi**:
  - `Konfirmasi & Terbitkan Plotting`:
    - Mengubah status kegiatan menjadi *Sedang Berjalan*.
    - Menerbitkan data penugasan baru ke dalam database dengan status *Menunggu Konfirmasi*.
    - Mengirim notifikasi penugasan otomatis ke akun masing-masing talent terpilih.
    - Mengarahkan kembali ke `SDM_DASHBOARD`.
  - `Batal / Kembali`: Membatalkan plotting dan mengarahkan kembali ke `SDM_DASHBOARD`.

---

### 6.3. Manajemen Akun Pengguna (`SDM_USER_MANAGEMENT`)
- **Tujuan**: Mengelola akun pengguna sistem, mendaftarkan anggota baru, memperbarui peran, dan mengatur status keaktifan.
- **Komponen Utama**:
  - Ringkasan total akun pengguna terdaftar (fitur pencarian keyword diagendakan untuk Iterasi ke-2).
  - Tabel pengguna dengan foto inisial, email, peran, status, poin keaktifan, dan nomor telepon.
  - Modal formulir Tambah Pengguna Baru dan Edit Pengguna.
- **Tombol dan Aksi Navigasi**:
  - `+ Tambah User Baru`: Membuka modal pop-up pembuatan akun (Nama, username, password, peran, angkatan, telepon).
  - `Edit (Ikon Pensil)`: Membuka modal edit untuk mengubah profil, peran, atau status aktif pengguna.
  - `Hapus (Ikon Tong Sampah)`: Memunculkan konfirmasi dialog penghapusan akun dari sistem.

---

### 6.4. Daftar & Kontrol Penugasan (`SDM_PENUGASAN_MGMT`)
- **Tujuan**: Meninjau seluruh penugasan lintas kegiatan, memeriksa status konfirmasi kehadiran talent, dan menambah penugasan langsung.
- **Komponen Utama**:
  - Filter status tugas: Semua, Menunggu Konfirmasi, Dikonfirmasi, Selesai, Ditolak.
  - Tabel riwayat penugasan terperinci dengan rincian kegiatan, talent bertugas, status tugas, dan status pencairan honor.
- **Tombol dan Aksi Navigasi**:
  - `+ Tambah Penugasan Manual`: Membuka modal untuk memasukkan penugasan mandiri di luar agenda Humas.
  - `Hapus Penugasan`: Menghapus data penugasan yang dibatalkan.
  - `← Kembali ke Dashboard`: Mengarahkan ke `SDM_DASHBOARD`.

---

### 6.5. Validasi Laporan LPJ Kegiatan (`SDM_VALIDATION_MGMT`)
- **Tujuan**: Meninjau dan memverifikasi laporan pertanggungjawaban serta bukti dokumentasi penugasan yang dikirim oleh talent.
- **Komponen Utama**:
  - Daftar antrean laporan dengan status *Menunggu Validasi*.
  - Kotak rincian laporan: Narasi pelaksanaan tugas dari talent, tautan bukti foto/Drive, dan tanggal pengunggahan.
  - Area catatan evaluasi/revisi dari pengurus SDM.
- **Tombol dan Aksi Navigasi**:
  - `Setujui LPJ`:
    - Mengubah status penugasan menjadi *Selesai* dan status laporan menjadi *Disetujui*.
    - Mengirim notifikasi sukses ke akun Talent bersangkutan.
    - Memicu antrean pembayaran honorarium ke dashboard Bendahara.
  - `Minta Catatan Revisi`:
    - Mengubah status laporan menjadi *Revisi*.
    - Mengirim notifikasi peringatan beserta catatan perbaikan ke talent bersangkutan agar mengunggah ulang bukti.
  - `← Kembali ke Dashboard`: Mengarahkan ke `SDM_DASHBOARD`.

---

## 7. Kategori 4: Alur Hubungan Masyarakat & Kemitraan (Humas Flow)

### 7.1. Dashboard Utama Pengurus Humas (`HUMAS_DASHBOARD`)
- **Tujuan**: Memantau relasi kemitraan, jumlah sponsor terdaftar, artikel rilis pers, serta agenda kegiatan pariwisata yang telah diusulkan.
- **Komponen Utama**:
  - 4 Kartu Metrik: Klien Aktif, Sponsor Terdaftar, Agenda Kegiatan, dan Rilis Pers/Blog.
  - Pintasan cepat modul Humas.
  - Umpan pesan kontak masuk dari masyarakat/klien.
- **Tombol dan Aksi Navigasi**:
  - `Usulkan Talent`: Mengarahkan ke `HUMAS_PROPOSE`.
  - `Pantau Penugasan`: Mengarahkan ke `HUMAS_PENUGASAN`.
  - `Kelola Client & Mitra`: Mengarahkan ke `HUMAS_CLIENTS`.
  - `Kelola Sponsor & Benefit`: Mengarahkan ke `HUMAS_SPONSORS`.
  - `Kelola Rilis Pers / Blog`: Mengarahkan ke `HUMAS_BLOGS`.
  - `Kelola Galeri Media`: Mengarahkan ke `HUMAS_GALLERY`.
  - `Kelola Agenda Kegiatan`: Mengarahkan ke `HUMAS_KEGIATAN`.

---

### 7.2. Kelola Client & Mitra Instansi (`HUMAS_CLIENTS`)
- **Tujuan**: Mencatat direktori instansi pemerintah, korporasi, BUMN, perhotelan, atau universitas yang bermitra dengan paguyuban.
- **Komponen Utama**:
  - Tabel mitra: Nama instansi, nama PIC kontak, nomor telepon, email, status kerjasama (*Aktif, Negosiasi, Selesai*), dan riwayat interaksi.
- **Tombol dan Aksi Navigasi**:
  - `+ Tambah Client Baru`: Membuka modal input data instansi mitra baru.
  - `Catat Log Interaksi`: Menambahkan catatan riwayat pembicaraan/follow-up dengan mitra ke dalam linimasa klien.
  - `Hapus`: Menghapus data klien dari daftar aktif.

---

### 7.3. Kelola Sponsor & Kemitraan (`HUMAS_SPONSORS`)
- **Tujuan**: Mengelola brand pendukung operasional paguyuban, paket sponsorship, nilai kontribusi finansial/produk, dan masa berlaku kemitraan.
- **Komponen Utama**:
  - Tabel sponsor dengan tingkatan (*Platinum, Gold, Silver, Bronze, Official Partner*), nominal sponsorship, PIC sponsor, dan status perjanjian.
- **Tombol dan Aksi Navigasi**:
  - `+ Tambah Sponsor Baru`: Membuka modal pendaftaran sponsor dan nominal dukungan dana.
  - `Hapus`: Menghapus data sponsor.

---

### 7.4. Kelola Artikel Berita & Rilis Pers (`HUMAS_BLOGS`)
- **Tujuan**: Menulis, menyunting, dan menerbitkan artikel wawasan pariwisata atau rilis pers kegiatan untuk konsumsi publik.
- **Komponen Utama**:
  - Daftar artikel terbit dengan judul, tanggal rilis, kategori, dan jumlah pembaca.
  - Modal form pembuatan artikel.
- **Tombol dan Aksi Navigasi**:
  - `+ Tulis Artikel Baru`: Membuka modal penyusunan artikel (Judul, kategori, cuplikan ringkas, tautan foto sampul, dan narasi artikel).
  - `Hapus Artikel`: Menghapus artikel dari portal publik.

---

### 7.5. Kelola Galeri Media (`HUMAS_GALLERY`)
- **Tujuan**: Mengunggah foto dokumentasi acara resmi untuk ditampilkan pada portal galeri publik.
- **Komponen Utama**:
  - Grid media foto beserta deskripsi kegiatan dan kategori.
- **Tombol dan Aksi Navigasi**:
  - `+ Unggah Media Baru`: Membuka modal unggah (Judul kegiatan, kategori media, tautan berkas foto/video, tanggal acara).
  - `Hapus Media`: Menghapus media dari galeri publik.

---

### 7.6. Kelola Agenda Kegiatan Pariwisata (`HUMAS_KEGIATAN`)
- **Tujuan**: Mendaftarkan agenda acara pariwisata, tugas protokoler, atau permintaan duta dari dinas terkait.
- **Komponen Utama**:
  - Tabel agenda kegiatan: Nama acara, tanggal, waktu, lokasi, estimasi honor, kuota talent, dan status plotting penugasan.
- **Tombol dan Aksi Navigasi**:
  - `+ Usulkan Agenda Kegiatan Baru`:
    - Membuka modal pengusulan agenda acara baru.
    - Saat disimpan, kegiatan masuk ke sistem dengan status *Butuh Plotting* dan **secara otomatis mengirim notifikasi peringatan ke divisi SDM** untuk segera melakukan plotting penugasan talent.
  - `Hapus Kegiatan`: Menghapus acara dari agenda.

---

### 7.7. Rekomendasi Talent untuk Acara (`HUMAS_PROPOSE`)
- **Tujuan**: Memberikan saran atau usulan kandidat talent kepada divisi SDM berdasarkan kecocokan persona dengan permohonan klien.
- **Komponen Utama**:
  - Pemilih agenda kegiatan dan pemilih talent yang direkomendasikan.
  - Kolom catatan alasan rekomendasi (misal: penguasaan bahasa asing atau kemampuan MC).
- **Tombol dan Aksi Navigasi**:
  - `Kirim Rekomendasi ke SDM`: Mengirimkan notifikasi usulan kepada pengurus SDM.
  - `← Kembali ke Dashboard`: Mengarahkan ke `HUMAS_DASHBOARD`.

---

### 7.8. Monitoring Penugasan Real-Time (`HUMAS_PENUGASAN`)
- **Tujuan**: Memberikan visibilitas langsung kepada divisi Humas mengenai progres kehadiran talent pada acara yang diusulkan tanpa mengubah data plotting.
- **Komponen Utama**:
  - Tabel status penugasan real-time (*Menunggu Konfirmasi, Dikonfirmasi, Selesai, Ditolak*).
- **Tombol dan Aksi Navigasi**:
  - `← Kembali ke Dashboard`: Mengarahkan ke `HUMAS_DASHBOARD`.

---

## 8. Kategori 5: Alur Duta Wisata / Anggota (Talent Flow)

### 8.1. Dashboard Utama Talent (`TALENT_DASHBOARD`)
- **Tujuan**: Halaman beranda pribadi anggota Cak & Ning untuk memantau ringkasan mandat aktif, skor keaktifan, dan agenda terdekat.
- **Komponen Utama**:
  - 4 Kartu Metrik: Total Penugasan Diikuti, Mandat Butuh Konfirmasi, Total Payout Honor Diterima, dan Skor Kinerja/Rating.
  - Banner peringatan agenda penugasan terdekat yang harus dihadiri.
  - Pintasan cepat menu talent.
- **Tombol dan Aksi Navigasi**:
  - `Buka Penugasan Saya`: Mengarahkan ke `TALENT_ASSIGNMENTS`.
  - `Riwayat Kegiatan`: Mengarahkan ke `TALENT_HISTORY`.
  - `Catatan Honorarium`: Mengarahkan ke `TALENT_HONOR`.
  - `Edit Portofolio & Bio`: Mengarahkan ke `TALENT_PROFILE_EDIT`.

---

### 8.2. Penugasan Saya / Kotak Masuk Mandat (`TALENT_ASSIGNMENTS`)
- **Tujuan**: Menampilkan seluruh surat mandat penugasan yang diberikan oleh pengurus SDM kepada talent bersangkutan.
- **Komponen Utama**:
  - Filter status: Semua, Butuh Konfirmasi, Dikonfirmasi, Selesai.
  - Kartu penugasan: Nama kegiatan, tanggal, waktu, lokasi, nominal honorarium, serta lencana status konfirmasi.
- **Tombol dan Aksi Navigasi**:
  - `Lihat Detail Penugasan`: Memilih ID penugasan dan mengarahkan ke halaman rincian `TALENT_DETAIL`.

---

### 8.3. Rincian Mandat Penugasan (`TALENT_DETAIL`)
- **Tujuan**: Halaman detail penugasan tempat talent membaca surat instruksi, memberikan konfirmasi kesediaan bertugas, atau menuju pelaporan LPJ.
- **Komponen Utama**:
  - Lembar mandat tugas resmi: Informasi waktu, tempat, busana (*dresscode* adat Cak/Ning), penanggung jawab, serta nominal honor.
  - Status konfirmasi penugasan saat ini.
- **Tombol dan Aksi Navigasi**:
  - `✓ Terima Mandat Penugasan` *(Jika status: Menunggu Konfirmasi)*:
    - Mengirim notifikasi konfirmasi kehadiran ke divisi SDM.
    - Menampilkan notifikasi sukses.
  - `✕ Tolak Mandat Penugasan` *(Jika status: Menunggu Konfirmasi)*:
    - Mengirim notifikasi penolakan ke divisi SDM agar SDM dapat mencari talent pengganti.
  - `📝 Kirim / Upload Laporan Pertanggungjawaban (LPJ)` *(Jika status: Dikonfirmasi)*:
    - Mengarahkan langsung ke halaman `TALENT_REPORT_FORM`.
  - `← Kembali ke Daftar Penugasan`: Mengarahkan ke `TALENT_ASSIGNMENTS`.

---

### 8.4. Formulir Pelaporan Kegiatan / LPJ (`TALENT_REPORT_FORM`)
- **Tujuan**: Mengunggah ringkasan laporan pelaksanaan penugasan, dokumentasi tugas, dan bukti kehadiran setelah acara selesai dilaksanakan.
- **Komponen Utama**:
  - Ringkasan nama kegiatan dan tanggal tugas.
  - Area teks: Deskripsi pelaksanaan tugas dan dinamika lapangan.
  - Komponen unggah berkas / tautan Google Drive dokumentasi foto kegiatan.
- **Tombol dan Aksi Navigasi**:
  - `Kirim Laporan Kegiatan (Submit LPJ)`:
    - Mengirimkan laporan ke sistem.
    - **Mengirim notifikasi otomatis ke Pengurus SDM** (untuk divalidasi) dan **ke Bendahara** (bahwa tugas siap dicairkan honornya).
    - Mengarahkan kembali ke `TALENT_ASSIGNMENTS`.
  - `Batal`: Membatalkan pengisian dan kembali ke `TALENT_DETAIL`.

---

### 8.5. Riwayat Kegiatan Selesai (`TALENT_HISTORY`)
- **Tujuan**: Arsip rekaman seluruh kegiatan pariwisata yang telah berhasil dilaksanakan oleh talent beserta poin keaktifan yang diperoleh.
- **Komponen Utama**:
  - Linimasa atau tabel kegiatan masa lalu, peran dalam acara, dan sertifikat/poin partisipasi.
- **Tombol dan Aksi Navigasi**:
  - `← Kembali ke Dashboard`: Mengarahkan ke `TALENT_DASHBOARD`.

---

### 8.6. Catatan & Riwayat Honorarium (`TALENT_HONOR`)
- **Tujuan**: Rekapitulasi transparansi penerimaan honorarium penugasan beserta status pencairan dana oleh Bendahara.
- **Komponen Utama**:
  - Tabel penerimaan honor: Tanggal acara, nama kegiatan, nominal bruto/netto, status pembayaran (*Lunas* atau *Belum Dibayar*), tanggal transfer, dan nomor resi bank.
- **Tombol dan Aksi Navigasi**:
  - `Unduh Bukti Transfer / Slip`: Mengunduh berkas tanda terima simulasi transfer.
  - `← Kembali ke Dashboard`: Mengarahkan ke `TALENT_DASHBOARD`.

---

### 8.7. Edit Portofolio & Biodata Duta (`TALENT_PROFILE_EDIT`)
- **Tujuan**: Memperbarui profil portofolio pribadi duta wisata yang ditampilkan pada katalog publik (keahlian bahasa, prestasi, media sosial, dan kontak).
- **Komponen Utama**:
  - Form isian data talent: Angkatan, keahlian khusus, tautan portofolio eksternal, akun Instagram, dan nomor telepon.
- **Tombol dan Aksi Navigasi**:
  - `Simpan Perubahan Portofolio`: Menyimpan pembaruan data ke profil publik talent.
  - `← Kembali ke Dashboard`: Mengarahkan ke `TALENT_DASHBOARD`.

---

## 9. Kategori 6: Alur Keuangan & Pembayaran (Bendahara Flow)

### 9.1. Dashboard Utama Keuangan & Kas (`BENDAHARA_DASHBOARD`)
- **Tujuan**: Pusat pemantauan arus kas paguyuban, penerimaan dana sponsor, pengeluaran operasional, dan antrean pencairan honorarium talent.
- **Komponen Utama**:
  - 4 Kartu Metrik: Saldo Kas Aktif, Total Kas Masuk, Total Kas Keluar, dan Tagihan Honor Belum Dibayar.
  - Tab Navigasi Internal:
    - Tab 1: `Pencairan Honorarium Talent` (Daftar tugas selesai yang menunggu transfer).
    - Tab 2: `Buku Kas Umum & Transaksi` (Pencatatan kas masuk/keluar).
    - Tab 3: `Ringkasan Laporan Kas`.
- **Tombol dan Aksi Navigasi**:
  - `Proses Bayar (pada baris tagihan honor)`: Memilih penugasan dan mengarahkan langsung ke halaman `BENDAHARA_PAYMENT_INPUT`.
  - `Ubah Nominal Honor Langsung (Inline Edit)`: Menyesuaikan besaran honor tugas sebelum dicairkan.
  - `+ Catat Transaksi Baru`: Membuka modal input transaksi pemasukan atau pengeluaran kas.
  - `Ekspor Laporan Keuangan (Tombol Header)`: Mengarahkan ke `BENDAHARA_REPORT`.
  - `Kelola Kas Lengkap`: Mengarahkan ke `BENDAHARA_KELOLA_KEUANGAN`.

---

### 9.2. Formulir Pencairan Transfer Honorarium (`BENDAHARA_PAYMENT_INPUT`)
- **Tujuan**: Memproses verifikasi rekening tujuan dan mencatat bukti transfer pelunasan honorarium tugas kepada talent.
- **Komponen Utama**:
  - Kartu informasi pembayaran: Nama talent penerima, nomor rekening bank/e-wallet, nama kegiatan tugas, dan nominal yang ditransfer.
  - Form isian: Tanggal transfer bank, nomor referensi/kode mutasi, dan pengunggahan berkas bukti transfer.
- **Tombol dan Aksi Navigasi**:
  - `Konfirmasi Pembayaran Lunas`:
    - Mengubah status penugasan menjadi *Lunas*.
    - Mencatat tanggal dan nomor resi pembayaran.
    - **Mengirimkan notifikasi otomatis ke akun Talent** bahwa honorariumnya telah ditransfer.
    - Mengarahkan kembali ke `BENDAHARA_DASHBOARD`.
  - `Batal / Kembali`: Membatalkan proses dan mengarahkan kembali ke `BENDAHARA_DASHBOARD`.

---

### 9.3. Buku Kas Umum & Kelola Transaksi (`BENDAHARA_KELOLA_KEUANGAN`)
- **Tujuan**: Halaman pencatatan komprehensif seluruh transaksi penerimaan kas (sponsorship, kas internal) dan pengeluaran (honor, konsumsi, akomodasi, sewa busana).
- **Komponen Utama**:
  - Ringkasan total pembukuan kas (fitur pencarian keyword diagendakan untuk Iterasi ke-2).
  - Tabel transaksi dengan kode transaksi, tanggal, tipe (Masuk/Keluar), nominal, keterangan, dan nama pencatat.
  - Modal form catat transaksi.
- **Tombol dan Aksi Navigasi**:
  - `+ Catat Transaksi Baru`: Membuka modal pencatatan transaksi kas baru.
  - `Edit (Ikon Pensil)`: Menyunting rincian transaksi kas.
  - `Hapus (Ikon Sampah)`: Menghapus catatan transaksi.
  - `← Kembali ke Dashboard`: Mengarahkan ke `BENDAHARA_DASHBOARD`.

---

### 9.4. Rekapitulasi & Ekspor Laporan Kas (`BENDAHARA_REPORT`)
- **Tujuan**: Menyusun lembar pertanggungjawaban keuangan resmi paguyuban untuk dilaporkan kepada Dinas Pariwisata dan Ketua Paguyuban.
- **Komponen Utama**:
  - Rekapitulasi tabel laporan per bulan/kategori.
  - Total akumulasi belanja penugasan dan saldo akhir kas.
- **Tombol dan Aksi Navigasi**:
  - `Cetak Dokumen (Print)`: Membuka jendela dialog cetak printer peramban (*browser print dialog*).
  - `Ekspor Format Excel / CSV`: Mengunduh lembar kerja spreadsheet simulasi laporan keuangan.
  - `← Kembali ke Dashboard`: Mengarahkan ke `BENDAHARA_DASHBOARD`.

---

## 10. Alur Integrasi Lintas Peran (End-to-End Workflow)

Aplikasi ini menyatukan kelima aktor dalam sebuah siklus alur kerja terintegrasi:

```
[1. Klien / Publik]
       │
       ▼ (Mengajukan permohonan via GUEST_CONTACT)
[2. Humas]
       │
       ▼ (Membuat agenda di HUMAS_KEGIATAN status: 'Butuh Plotting')
       │   └─► [Otomatis: Notifikasi terkirim ke SDM]
[3. SDM]
       │
       ▼ (Melakukan seleksi & plotting di SDM_PLOTTING)
       │   └─► [Otomatis: Notifikasi terkirim ke Talent terpilih]
[4. Talent]
       │
       ├─► (Menerima mandat di TALENT_DETAIL)
       │
       ▼ (Melaksanakan tugas acara)
       │
       ▼ (Mengunggah laporan di TALENT_REPORT_FORM)
           ├─► [Otomatis: Notifikasi terkirim ke SDM untuk Validasi]
           └─► [Otomatis: Notifikasi terkirim ke Bendahara untuk Pembayaran]
[5. SDM]
       │
       ▼ (Memvalidasi berkas LPJ di SDM_VALIDATION_MGMT status: 'Disetujui')
[6. Bendahara]
       │
       ▼ (Mencairkan transfer honor di BENDAHARA_PAYMENT_INPUT status: 'Lunas')
           └─► [Otomatis: Notifikasi konfirmasi dana masuk terkirim ke Talent]
```

---
*Dokumen ini diperbarui secara berkala mengikuti iterasi antarmuka dan struktur kode aplikasi Paguyuban Cak & Ning Surabaya.*
