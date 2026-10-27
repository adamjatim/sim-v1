export type Role = 'Guest' | 'SDM' | 'Humas' | 'Talent' | 'Bendahara' | 'Ketua Umum';

export interface User {
  id: string;
  username: string;
  nama: string;
  email: string;
  telepon: string;
  peran: Role;
  status: 'Aktif' | 'Nonaktif';
  angkatan?: string; // Khusus Talent: 'Cak Ning 2021', 'Cak Ning 2022', etc.
  foto?: string;
  keaktifan30Hari?: number; // Keaktifan tugas dlm 30 hari (e.g. 6x)
  totalHonor30Hari?: number; // Akumulasi honor dlm 30 hari (e.g. Rp 2.100.000)
  spesialisasi?: string; // e.g. 'MC Protokoler & Bilingue', 'Pemandu Sejarah Heritage'
  rating?: number; // e.g. 4.95
  bio?: string;
  portofolioLink?: string;
  bahasa?: string[];
  tinggiBadan?: number;
  kategoriAcaraCocok?: string[];
  klienPernahDilayani?: string[];
  ketersediaanKlien?: 'Tersedia' | 'Jadwal Terisi';
}

export interface Client {
  id: string;
  namaInstansi: string;
  kontakPerson: string;
  telepon: string;
  email: string;
  alamat: string;
  status: 'Aktif' | 'Nonaktif';
  catatanInteraksi: string[];
}

export interface Sponsor {
  id: string;
  namaSponsor: string;
  kontakPerson: string;
  jenisSponsorship: 'Utama' | 'Pendukung' | 'Media Partner' | 'Lainnya';
  telepon: string;
  email?: string;
  nominalDukungan?: number;
  keterangan?: string;
}

export interface BlogArticle {
  id: string;
  judul: string;
  tanggal: string;
  ringkasan: string;
  isi: string;
  status: 'Draft' | 'Publish';
}

export interface MediaItem {
  id: string;
  judul: string;
  tipe: 'Foto' | 'Video';
  tanggal: string;
  kategori: string;
}

export interface Kegiatan {
  id: string;
  namaKegiatan: string;
  tanggal: string;
  lokasi: string;
  deskripsi: string;
  status: 'Butuh Plotting' | 'Sedang Berjalan' | 'Selesai' | 'Dibatalkan';
}

export interface PengajuanPenugasan {
  id: string;
  namaKegiatan: string;
  tanggal: string;
  client: string;
  status: 'Draft Usulan' | 'Diajukan ke SDM' | 'Disetujui' | 'Dibatalkan';
  lokasi?: string;
  kebutuhanTalent?: number;
  usulanTalentNama?: string[];
  keterangan?: string;
}

export interface Penugasan {
  id: string;
  kegiatanId: string;
  kegiatanNama: string;
  tanggal: string;
  lokasi: string;
  talentId: string;
  talentNama: string;
  status: 'Menunggu Konfirmasi' | 'Dikonfirmasi' | 'Selesai' | 'Ditolak';
  honor?: number;
  statusBayar?: 'Belum Dibayar' | 'Proses Bayar' | 'Lunas' | 'Ditolak' | 'Dibatalkan';
  tanggalBayar?: string;
  buktiBayar?: string;
  rekeningTujuan?: string;
  bankTujuan?: string;
  catatanBendahara?: string;
  laporanDeskripsi?: string;
  laporanBuktiLink?: string;
  laporanTanggal?: string;
  laporanStatus?: 'Menunggu Validasi' | 'Disetujui' | 'Revisi';
  catatanSdm?: string;
}

export interface Notification {
  id: string;
  penerimaRole: Role;
  penerimaUserId?: string; // opsional, spesifik user
  tipe: 'info' | 'success' | 'warning';
  pesan: string;
  tanggal: string;
  dibaca: boolean;
}

export interface ContactMessage {
  id: string;
  nama: string;
  email: string;
  subjek: string;
  pesan: string;
  tanggal: string;
}

export interface Transaksi {
  id: string;
  tanggal: string;
  tipe: 'Masuk' | 'Keluar';
  nominal: number;
  kategori: string; // e.g. 'Kas Disbudpar', 'Sponsor', 'Honorarium', 'Konsumsi', 'Transportasi', 'Perlengkapan'
  keterangan: string;
  sumberDanAktor: string; // e.g. 'Bendahara', 'Sponsor Bank Jatim', 'Pemerintah Kota'
  referensiKegiatanId?: string; // Optional linking to Kegiatan
}
