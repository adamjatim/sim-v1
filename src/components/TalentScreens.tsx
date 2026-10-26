import React, { useState } from 'react';
import { User, Penugasan } from '../types';
import { 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Upload, 
  Eye, 
  DollarSign, 
  Star, 
  Check, 
  ArrowLeft, 
  ChevronRight, 
  FileCheck,
  TrendingUp,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

// ============================================================================
// 1. DASHBOARD TALENT (3 Kartu Statistik: Tugas Aktif, Rating, Total Honor)
// ============================================================================
interface TalentDashboardProps {
  talent: User;
  penugasanList: Penugasan[];
  onNavigateToScreen: (screenId: string) => void;
}

export function TalentDashboard({
  talent,
  penugasanList,
  onNavigateToScreen
}: TalentDashboardProps) {
  const activeCount = penugasanList.filter(p => p.status === 'Dikonfirmasi').length;
  const totalHonorPaid = penugasanList
    .filter(p => p.statusBayar === 'Lunas')
    .reduce((sum, p) => sum + (p.honor || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-[#1A3C5E]">Dashboard Talent</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Halo, <strong>{talent.nama}</strong> ({talent.angkatan || 'Cak Ning 2024'}). Selamat bertugas melayani pariwisata Surabaya.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-auto">
          Status: {talent.status}
        </span>
      </div>

      {/* 3 Kartu Statistik (Tugas Aktif, Rating Performa, Total Honor) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tugas Aktif */}
        <div 
          onClick={() => onNavigateToScreen('TALENT_ASSIGNMENTS')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Tugas Aktif</span>
            <span className="text-3xl font-black text-[#1A3C5E] font-mono block">2 Tugas</span>
            <p className="text-[11px] text-emerald-600 font-medium">Terkonfirmasi Mendatang</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="w-7 h-7" />
          </div>
        </div>

        {/* Rating Performa */}
        <div 
          onClick={() => onNavigateToScreen('TALENT_RATING_PROFILE')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Rating Performa</span>
            <span className="text-3xl font-black text-amber-500 font-mono flex items-center gap-1">
              4.95 <Star className="w-6 h-6 fill-amber-500 text-amber-500 inline" />
            </span>
            <p className="text-[11px] text-slate-500 font-medium">Predikat Duta Teladan</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Award className="w-7 h-7" />
          </div>
        </div>

        {/* Total Honor */}
        <div 
          onClick={() => onNavigateToScreen('TALENT_HISTORY')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Honor Diterima</span>
            <span className="text-2xl font-black text-emerald-700 font-mono block">
              Rp {totalHonorPaid.toLocaleString('id-ID')}
            </span>
            <p className="text-[11px] text-slate-500 font-medium">Tercatat Lunas di Kas</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <DollarSign className="w-7 h-7" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. HALAMAN PENUGASAN SAYA (10 Data Dummy + Klik Aksi Buka Detail)
// ============================================================================
interface TalentAssignmentsProps {
  talent: User;
  penugasanList: Penugasan[];
  onSelectPenugasan: (id: string) => void;
}

export function TalentAssignments({
  talent,
  penugasanList,
  onSelectPenugasan
}: TalentAssignmentsProps) {
  // 10 data dummy
  const list10 = penugasanList.slice(0, 10);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Penugasan Saya</h2>
        <p className="text-xs text-slate-500 mt-0.5">Tabel 10 agenda penugasan yang diberikan kepada Anda selaku Duta Wisata Surabaya.</p>
      </div>

      {/* Tabel dengan kolom: Nama Kegiatan, Tanggal, Lokasi, Status, Aksi */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Kegiatan</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Lokasi</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {list10.map((item, idx) => {
                let badgeClass = 'bg-blue-50 text-[#1A3C5E] border-blue-200';
                if (item.status === 'Selesai') badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                if (item.status === 'Dikonfirmasi') badgeClass = 'bg-indigo-50 text-indigo-800 border-indigo-200';
                if (item.status === 'Menunggu Konfirmasi') badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="p-3.5 font-bold text-[#1A3C5E] max-w-xs">{item.kegiatanNama}</td>
                    <td className="p-3.5 font-mono text-slate-600 whitespace-nowrap">{item.tanggal}</td>
                    <td className="p-3.5 text-slate-600">{item.lokasi}</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block ${badgeClass}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => onSelectPenugasan(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#1A3C5E] hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1 mx-auto shadow-xs cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. HALAMAN DETAIL PENUGASAN (Tombol Hijau Terima & Merah Tolak Tugas)
// ============================================================================
interface TalentDetailProps {
  penugasanId: string;
  penugasanList: Penugasan[];
  onRespondAssignment: (penugasanId: string, accept: boolean) => void;
  onNavigateToReport: (penugasanId: string) => void;
  onBack: () => void;
}

export function TalentDetail({
  penugasanId,
  penugasanList,
  onRespondAssignment,
  onNavigateToReport,
  onBack
}: TalentDetailProps) {
  const item = penugasanList.find(p => p.id === penugasanId) || penugasanList[0];
  const [responseNotice, setResponseNotice] = useState<string | null>(null);

  if (!item) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-sm text-slate-500">Penugasan tidak ditemukan.</p>
        <button onClick={onBack} className="mt-3 px-4 py-2 bg-[#1A3C5E] text-white rounded-lg text-xs font-bold">
          Kembali
        </button>
      </div>
    );
  }

  const handleAction = (accept: boolean) => {
    onRespondAssignment(item.id, accept);
    setResponseNotice(`Anda telah ${accept ? 'MENERIMA TUGAS' : 'MENOLAK TUGAS'}. Respon telah terkirim ke Sie SDM.`);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans max-w-4xl">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-[#1A3C5E]">Detail Penugasan</h2>
          <p className="text-xs text-slate-500 mt-0.5">Informasi mandat kegiatan resmi duta wisata.</p>
        </div>
      </div>

      {responseNotice && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-[#1A3C5E] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{responseNotice}</span>
        </div>
      )}

      {/* Card Info Detail Kegiatan */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">Agenda Penugasan Duta</span>
            <h3 className="text-xl font-bold text-[#1A3C5E]">{item.kegiatanNama}</h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" /> {item.tanggal} &bull; Pukul 08.00 WIB s/d Selesai
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1A3C5E] border border-blue-200">
            {item.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">Lokasi Kegiatan</span>
            <p className="font-semibold text-slate-800 flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" /> {item.lokasi}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">Dresscode Pakaian Adat</span>
            <p className="font-semibold text-slate-800 text-sm">
              Cak: Beskap Lengkap &bull; Ning: Kebaya Selendang Khas Surabaya
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">Honorarium</span>
            <p className="font-mono font-bold text-emerald-700 text-base">
              Rp {(item.honor || 350000).toLocaleString('id-ID')}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">Narahubung Lapangan (LO)</span>
            <p className="font-semibold text-slate-800 text-sm">Cak Dimas Rahmad (0812-3456-7801)</p>
          </div>
        </div>

        {/* Tombol Warna Hijau "Terima Tugas" dan Merah "Tolak Tugas" */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
            >
              <CheckCircle2 className="w-4 h-4" /> Terima Tugas
            </button>
            <button
              onClick={() => handleAction(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
            >
              <XCircle className="w-4 h-4" /> Tolak Tugas
            </button>
          </div>

          <button
            onClick={() => onNavigateToReport(item.id)}
            className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
          >
            <FileText className="w-4 h-4" /> Buat Laporan Kegiatan
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. HALAMAN BUAT LAPORAN (Form Upload Foto, Textarea Deskripsi, Tombol Kirim)
// ============================================================================
interface TalentReportFormProps {
  penugasanId: string;
  penugasanList: Penugasan[];
  onSubmitReport: (penugasanId: string, desc: string, fileLabel: string) => void;
  onCancel: () => void;
}

export function TalentReportForm({
  penugasanId,
  penugasanList,
  onSubmitReport,
  onCancel
}: TalentReportFormProps) {
  const item = penugasanList.find(p => p.id === penugasanId) || penugasanList[0];
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoFile, setFotoFile] = useState('dokumentasi_kegiatan_cakning.jpg');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deskripsi.trim()) {
      alert('Mohon isi deskripsi kegiatan!');
      return;
    }
    onSubmitReport(item.id, deskripsi, fotoFile);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans max-w-3xl">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-[#1A3C5E]">Buat Laporan Penugasan</h2>
          <p className="text-xs text-slate-500 mt-0.5">Unggah bukti foto dan deskripsi kegiatan yang telah Anda laksanakan.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6 text-xs">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Kegiatan</span>
          <strong className="text-slate-800 text-sm block mt-0.5">{item.kegiatanNama}</strong>
          <span className="text-slate-500">{item.tanggal} &bull; {item.lokasi}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form Upload Foto */}
          <div>
            <label className="block text-slate-700 font-bold mb-2">Upload Foto Kegiatan *</label>
            <div className="border-2 border-dashed border-slate-300 hover:border-[#1A3C5E] rounded-xl p-6 text-center bg-slate-50 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">Pilih berkas foto dokumentasi bertugas</p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-[#1A3C5E] font-mono text-[11px]">
                <FileCheck className="w-3.5 h-3.5" /> {fotoFile}
              </div>
            </div>
          </div>

          {/* Textarea Deskripsi Kegiatan */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Deskripsi Kegiatan *</label>
            <textarea
              rows={5}
              required
              placeholder="Ceritakan jalannya acara penugasan, siapa saja tamu yang disambut, serta evaluasi lapangan..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#1A3C5E] leading-relaxed"
            />
          </div>

          {/* Tombol Kirim Laporan */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Check className="w-4 h-4" /> Kirim Laporan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// 5. HALAMAN RIWAYAT (Tab Riwayat Kegiatan & Tab Riwayat Honor Masing-Masing 10 Data)
// ============================================================================
interface TalentHistoryProps {
  talent: User;
  penugasanList: Penugasan[];
}

export function TalentHistory({ talent, penugasanList }: TalentHistoryProps) {
  const [activeTab, setActiveTab] = useState<'kegiatan' | 'honor'>('kegiatan');
  const [confirmedList, setConfirmedList] = useState<Record<string, boolean>>({});

  // 10 Data Dummy Riwayat Kegiatan
  const riwayatKegiatan = [
    { id: 'rk1', nama: 'Festival Rujak Uleg Surabaya 2026', tanggal: '2026-05-20', lokasi: 'Jl. Kembang Jepun', status: 'Selesai' },
    { id: 'rk2', nama: 'Parade Bunga Surabaya Vaganza 2026', tanggal: '2026-05-31', lokasi: 'Jl. Tunjungan - Balai Pemuda', status: 'Selesai' },
    { id: 'rk3', nama: 'Cak & Ning Goes to School SMAN 2', tanggal: '2026-06-15', lokasi: 'Aula SMAN 2 Surabaya', status: 'Selesai' },
    { id: 'rk4', nama: 'Gala Dinner ASITA se-Indonesia', tanggal: '2026-06-22', lokasi: 'Balai Kota Surabaya', status: 'Selesai' },
    { id: 'rk5', nama: 'Promosi Surabaya Heritage TP 3', tanggal: '2026-06-29', lokasi: 'Atrium Tunjungan Plaza 3', status: 'Selesai' },
    { id: 'rk6', nama: 'Grand Final Pemilihan Putera Puteri', tanggal: '2026-06-28', lokasi: 'Grand City Convention', status: 'Selesai' },
    { id: 'rk7', nama: 'Penyambutan Delegasi Sister City Kitakyushu', tanggal: '2026-07-02', lokasi: 'Balai Kota Surabaya', status: 'Selesai' },
    { id: 'rk8', nama: 'Bakti Sosial Panti Asuhan Don Bosco', tanggal: '2026-06-01', lokasi: 'Jl. Tidar Surabaya', status: 'Selesai' },
    { id: 'rk9', nama: 'Aksi Bersih Susur Kalimas Surabaya', tanggal: '2026-06-12', lokasi: 'Taman Prestasi Surabaya', status: 'Selesai' },
    { id: 'rk10', nama: 'Penyambutan Konjen Jepang & Australia', tanggal: '2026-06-18', lokasi: 'Hotel Bumi Surabaya', status: 'Selesai' },
  ];

  // 10 Data Dummy Riwayat Honor
  const riwayatHonor = [
    { id: 'rh1', kegiatan: 'Festival Rujak Uleg Surabaya 2026', nominal: 350000, tanggal: '2026-05-22', status: 'Lunas' },
    { id: 'rh2', kegiatan: 'Parade Bunga Surabaya Vaganza 2026', nominal: 400000, tanggal: '2026-06-02', status: 'Lunas' },
    { id: 'rh3', kegiatan: 'Cak & Ning Goes to School SMAN 2', nominal: 350000, tanggal: '2026-06-18', status: 'Lunas' },
    { id: 'rh4', kegiatan: 'Gala Dinner ASITA se-Indonesia', nominal: 350000, tanggal: '2026-06-24', status: 'Lunas' },
    { id: 'rh5', kegiatan: 'Promosi Surabaya Heritage TP 3', nominal: 350000, tanggal: '2026-06-30', status: 'Lunas' },
    { id: 'rh6', kegiatan: 'Grand Final Pemilihan Putera Puteri', nominal: 400000, tanggal: '2026-06-29', status: 'Lunas' },
    { id: 'rh7', kegiatan: 'Penyambutan Konjen Jepang & Australia', nominal: 350000, tanggal: '2026-06-20', status: 'Lunas' },
    { id: 'rh8', kegiatan: 'Bakti Sosial Panti Asuhan Don Bosco', nominal: 300000, tanggal: '2026-06-03', status: 'Lunas' },
    { id: 'rh9', kegiatan: 'Aksi Bersih Susur Kalimas Surabaya', nominal: 300000, tanggal: '2026-06-14', status: 'Lunas' },
    { id: 'rh10', kegiatan: 'Penyambutan Delegasi Sister City Kitakyushu', nominal: 350000, tanggal: '2026-07-03', status: 'Lunas' },
  ];

  const handleConfirm = (id: string, nama: string) => {
    setConfirmedList(prev => ({ ...prev, [id]: true }));
    alert(`Terima kasih! Konfirmasi terima honor untuk kegiatan "${nama}" berhasil dicatat.`);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Riwayat Kegiatan & Honor</h2>
        <p className="text-xs text-slate-500 mt-0.5">Arsip seluruh penugasan pariwisata yang telah selesai serta rekapitulasi pencairan honor.</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('kegiatan')}
          className={`py-3 px-6 font-bold text-xs border-b-2 cursor-pointer transition-colors flex items-center gap-2 ${
            activeTab === 'kegiatan'
              ? 'border-[#1A3C5E] text-[#1A3C5E]'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Calendar className="w-4 h-4" /> Tab Riwayat Kegiatan (10 Data)
        </button>
        <button
          onClick={() => setActiveTab('honor')}
          className={`py-3 px-6 font-bold text-xs border-b-2 cursor-pointer transition-colors flex items-center gap-2 ${
            activeTab === 'honor'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Tab Riwayat Honor (10 Data)
        </button>
      </div>

      {/* TAB 1: RIWAYAT KEGIATAN */}
      {activeTab === 'kegiatan' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 w-12 text-center">No</th>
                  <th className="p-3.5">Nama Kegiatan</th>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5">Lokasi Tempat</th>
                  <th className="p-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {riwayatKegiatan.map((rk, idx) => (
                  <tr key={rk.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="p-3.5 font-bold text-[#1A3C5E]">{rk.nama}</td>
                    <td className="p-3.5 font-mono text-slate-600 whitespace-nowrap">{rk.tanggal}</td>
                    <td className="p-3.5 text-slate-600">{rk.lokasi}</td>
                    <td className="p-3.5 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
                        {rk.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: RIWAYAT HONOR (Ada Tombol "Konfirmasi Terima") */}
      {activeTab === 'honor' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 w-12 text-center">No</th>
                  <th className="p-3.5">Nama Kegiatan</th>
                  <th className="p-3.5">Tanggal Pencairan</th>
                  <th className="p-3.5 text-right">Nominal Honor</th>
                  <th className="p-3.5 text-center">Status</th>
                  <th className="p-3.5 text-center">Aksi Konfirmasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {riwayatHonor.map((rh, idx) => {
                  const isConfirmed = confirmedList[rh.id] || false;
                  return (
                    <tr key={rh.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                      <td className="p-3.5 font-bold text-[#1A3C5E] max-w-xs">{rh.kegiatan}</td>
                      <td className="p-3.5 font-mono text-slate-600 whitespace-nowrap">{rh.tanggal}</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-700 text-right">
                        Rp {rh.nominal.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
                          {rh.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        {isConfirmed ? (
                          <span className="text-emerald-700 font-bold text-[11px] flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Diterima
                          </span>
                        ) : (
                          <button
                            onClick={() => handleConfirm(rh.id, rh.kegiatan)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] shadow-xs cursor-pointer transition-colors"
                          >
                            Konfirmasi Terima
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 6. HALAMAN RATING & PROFIL (Skor Rating Bintang/Angka, Form Upload Portofolio, Toggle Keaktifan)
// ============================================================================
interface TalentRatingProfileProps {
  talent: User;
  onUpdateProfile?: (updated: User) => void;
}

export function TalentRatingAndProfile({ talent, onUpdateProfile }: TalentRatingProfileProps) {
  const [isActive, setIsActive] = useState(talent.status === 'Aktif');
  const [portofolioFile, setPortofolioFile] = useState(talent.portofolioLink || 'portofolio_cak_aditya_2026.pdf');
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = () => {
    const nextStatus = !isActive;
    setIsActive(nextStatus);
    if (onUpdateProfile) {
      onUpdateProfile({ ...talent, status: nextStatus ? 'Aktif' : 'Nonaktif' });
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans max-w-4xl">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Rating & Profil Talent</h2>
        <p className="text-xs text-slate-500 mt-0.5">Skor evaluasi penugasan, portofolio digital, dan pengaturan status kesediaan bertugas.</p>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Status keaktifan Anda berhasil diperbarui di sistem!</span>
        </div>
      )}

      {/* Skor Rating (Bintang / Angka) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#1A3C5E] to-[#244E7A] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">Skor Rating Performa</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono tracking-tight">{talent.rating || 4.95}</span>
              <span className="text-slate-300 text-sm">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <span className="mt-4 px-2.5 py-1 rounded bg-amber-400 text-slate-900 font-bold text-xs inline-block self-start">
            Grade: Duta Teladan Utama
          </span>
        </div>

        {/* Toggle Status Keaktifan */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#1A3C5E] mb-1">Status Keaktifan Bertugas</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Atur ketersediaan jadwal Anda. Bila nonaktif (cuti/kuliah), Sie SDM tidak akan mem-plotting jadwal tugas baru untuk Anda.
            </p>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Ketersediaan Saat Ini:</span>
              <span className={`text-sm font-bold ${isActive ? 'text-emerald-700' : 'text-slate-400'}`}>
                {isActive ? 'Aktif (Siap Menerima Mandat)' : 'Nonaktif (Cuti Penugasan)'}
              </span>
            </div>

            {/* Toggle Button */}
            <button
              type="button"
              onClick={handleToggle}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                isActive ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="bg-white w-5 h-5 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Upload Portofolio */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-base text-[#1A3C5E] border-b border-slate-100 pb-3">
          Upload Portofolio & CV Duta Wisata
        </h3>

        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50/50 space-y-2">
          <Upload className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="font-semibold text-slate-700 text-xs">Unggah berkas CV Duta, Portofolio Foto Busana Adat, atau Sertifikat (PDF)</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-[#1A3C5E] font-mono text-[11px]">
            <FileCheck className="w-3.5 h-3.5" /> Berkas Aktif: {portofolioFile}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              const newFile = prompt('Ganti nama file portofolio baru:', portofolioFile);
              if (newFile) setPortofolioFile(newFile);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
          >
            Pilih Berkas Portofolio Baru
          </button>
        </div>
      </div>
    </div>
  );
}
