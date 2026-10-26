export type Role = 'Guest' | 'SDM' | 'Humas' | 'Talent' | 'Bendahara';

export interface User {
  id: string;
  username: string;
  nama: string;
  email: string;
  telepon: string;
  peran: Role;
  status: 'Aktif' | 'Nonaktif';
  angkatan?: string; // Khusus Talent
  foto?: string;
}

export interface Client {
  id: string;
  namaInstansi: string;
  kontakPerson: string;
  telepon: string;
  status: 'Aktif' | 'Nonaktif';
  catatanInteraksi: string[];
}

export interface Sponsor {
  id: string;
  namaSponsor: string;
  kontakPerson: string;
  jenisSponsorship: 'Utama' | 'Pendukung' | 'Media Partner' | 'Lainnya';
  telepon: string;
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
  statusBayar?: 'Belum Dibayar' | 'Proses Bayar' | 'Lunas';
  tanggalBayar?: string;
  buktiBayar?: string;
  laporanDeskripsi?: string;
  laporanBuktiLink?: string;
  laporanTanggal?: string;
  laporanStatus?: 'Menunggu Validasi' | 'Disetujui';
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
