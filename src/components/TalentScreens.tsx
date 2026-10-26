import React, { useState } from 'react';
import { User, Penugasan } from '../types';
import { Calendar, MapPin, CheckCircle, XCircle, FileText, Upload, ArrowLeft, Award, DollarSign, Clock, Star, BookOpen, UserCheck, Eye, Download, Edit3, Save } from 'lucide-react';
import { WireframeImage } from './CommonScreens';

// ==========================================
// NEW: TALENT DASHBOARD
// ==========================================
interface TalentDashboardProps {
  talent: User;
  penugasanList: Penugasan[];
  onNavigateToAssignments: () => void;
  onNavigateToHistory: () => void;
  onNavigateToHonor: () => void;
  onNavigateToProfileEdit: () => void;
}

export function TalentDashboard({
  talent,
  penugasanList,
  onNavigateToAssignments,
  onNavigateToHistory,
  onNavigateToHonor,
  onNavigateToProfileEdit
}: TalentDashboardProps) {
  const myPenugasan = penugasanList.filter(p => p.talentId === talent.id);
  
  // Calculations
  const totalTasks = myPenugasan.length;
  const pendingTasks = myPenugasan.filter(p => p.status === 'Menunggu Konfirmasi').length;
  const activeTasks = myPenugasan.filter(p => p.status === 'Dikonfirmasi').length;
  const completedTasks = myPenugasan.filter(p => p.status === 'Selesai').length;

  const totalHonorPaid = myPenugasan
    .filter(p => p.statusBayar === 'Lunas')
    .reduce((sum, p) => sum + (p.honor ?? 0), 0);

  const upcomingTask = myPenugasan.find(p => p.status === 'Dikonfirmasi');

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-[#E0E0E0] pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#2E7D32]">Dashboard Talent</h2>
          <p className="text-xs text-slate-500">Halo, <strong>{talent.nama}</strong> ({talent.angkatan || 'Cak/Ning'}). Selamat bertugas melayani kebudayaan kota!</p>
        </div>
        <span className="text-xs bg-[#2E7D32] text-white font-mono font-bold px-3 py-1 uppercase border border-white">
          Status: {talent.status}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border-2 border-[#2E7D32] p-4 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Penugasan</span>
            <span className="text-xl font-bold text-slate-800 font-mono">{totalTasks} Tugas</span>
          </div>
          <Award className="w-5 h-5 text-[#2E7D32]" />
        </div>

        <div className="bg-white border-2 border-amber-600 p-4 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Butuh Konfirmasi</span>
            <span className="text-xl font-bold text-amber-700 font-mono">{pendingTasks} Tugas</span>
          </div>
          <Clock className="w-5 h-5 text-amber-600" />
        </div>

        <div className="bg-white border-2 border-indigo-600 p-4 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Payout Honor</span>
            <span className="text-base font-bold text-indigo-700 font-mono">Rp {(totalHonorPaid ?? 0).toLocaleString('id-ID')}</span>
          </div>
          <DollarSign className="w-5 h-5 text-indigo-600" />
        </div>

        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Skor Kinerja Talent</span>
            <span className="text-xl font-bold text-[#1A3C5E] font-mono flex items-center gap-1">
              4.92 <Star className="w-4 h-4 text-amber-500 fill-amber-500 inline" />
            </span>
          </div>
          <UserCheck className="w-5 h-5 text-[#1A3C5E]" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Upcoming agenda notification */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white border-2 border-[#2E7D32] p-5 space-y-3">
            <h3 className="font-bold text-xs uppercase text-[#2E7D32] border-b pb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Agenda Terdekat Menunggu Anda
            </h3>

            {upcomingTask ? (
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-800">{upcomingTask.kegiatanNama}</h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-600">
                  <p>Tanggal: <strong>{upcomingTask.tanggal}</strong></p>
                  <p>Tempat: <strong>{upcomingTask.lokasi}</strong></p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={onNavigateToAssignments}
                    className="bg-[#2E7D32] hover:bg-slate-800 text-white font-bold py-1.5 px-4 text-[10px] uppercase tracking-wider cursor-pointer border-none"
                  >
                    Buka Panduan & Laporkan Kegiatan
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400 italic">
                Tidak ada agenda terdekat yang terkonfirmasi aktif saat ini.
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={onNavigateToAssignments}
              className="p-4 border-2 border-[#2E7D32] bg-slate-50 hover:bg-white text-center cursor-pointer transition-all space-y-1"
            >
              <FileText className="w-6 h-6 text-[#2E7D32] mx-auto" />
              <strong className="text-[10px] uppercase block text-slate-800">Cek Penugasan</strong>
              <span className="text-[9px] text-slate-400 block font-normal">Konfirmasi & plotting baru</span>
            </button>
            <button 
              onClick={onNavigateToHistory}
              className="p-4 border-2 border-[#2E7D32] bg-slate-50 hover:bg-white text-center cursor-pointer transition-all space-y-1"
            >
              <BookOpen className="w-6 h-6 text-[#2E7D32] mx-auto" />
              <strong className="text-[10px] uppercase block text-slate-800">Riwayat Kegiatan</strong>
              <span className="text-[9px] text-slate-400 block font-normal">Semua portofolio terdaftar</span>
            </button>
            <button 
              onClick={onNavigateToHonor}
              className="p-4 border-2 border-[#2E7D32] bg-slate-50 hover:bg-white text-center cursor-pointer transition-all space-y-1"
            >
              <DollarSign className="w-6 h-6 text-[#2E7D32] mx-auto" />
              <strong className="text-[10px] uppercase block text-slate-800">Riwayat Honor</strong>
              <span className="text-[9px] text-slate-400 block font-normal">Verifikasi transfer bendahara</span>
            </button>
          </div>
        </div>

        {/* Portofolio summary / CV */}
        <div className="bg-white border-2 border-[#2E7D32] p-5 space-y-4">
          <h3 className="font-bold text-xs uppercase text-[#2E7D32] border-b pb-1.5">Identitas & Portofolio Duta</h3>
          <div className="flex justify-center">
            <WireframeImage label={`Avatar: ${talent.nama}`} className="w-20 h-20 border border-[#2E7D32]" />
          </div>
          <div className="space-y-2 text-xs">
            <p>Nama: <strong>{talent.nama}</strong></p>
            <p>Angkatan: <strong>{talent.angkatan || 'Cak Ning'}</strong></p>
            <p>Keahlian: <strong>Bahasa Inggris, MC Seni Budaya, Tari Remo</strong></p>
          </div>
          <div className="pt-2 border-t">
            <button
              onClick={onNavigateToProfileEdit}
              className="w-full border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white font-bold py-1.5 text-[10px] uppercase tracking-wider cursor-pointer"
            >
              Kelola Portofolio & Keaktifan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. HALAMAN PENUGASAN SAYA
// ==========================================
interface TalentAssignmentsProps {
  talent: User;
  penugasanList: Penugasan[];
  onSelectPenugasan: (id: string) => void;
  onBackToDashboard?: () => void;
}

export function TalentAssignments({ talent, penugasanList, onSelectPenugasan, onBackToDashboard }: TalentAssignmentsProps) {
  const myPenugasan = penugasanList.filter(p => p.talentId === talent.id);

  const getStatusBadge = (p: Penugasan) => {
    switch (p.status) {
      case 'Dikonfirmasi':
        return (
          <span className="bg-amber-50 text-amber-800 border border-amber-300 font-mono text-[10px] px-2 py-0.5 uppercase tracking-wide font-bold animate-pulse">
            Tugas Selesai (Siap Lapor)
          </span>
        );
      case 'Selesai':
        if (p.laporanStatus === 'Menunggu Validasi') {
          return (
            <span className="bg-indigo-50 text-indigo-800 border border-indigo-300 font-mono text-[10px] px-2 py-0.5 uppercase tracking-wide font-bold">
              Laporan Terkirim (Menunggu Validasi SDM)
            </span>
          );
        }
        return (
          <span className="bg-green-50 text-green-800 border border-green-300 font-mono text-[10px] px-2 py-0.5 uppercase tracking-wide font-bold">
            Selesai (Laporan Disetujui)
          </span>
        );
      case 'Ditolak':
        return <span className="bg-red-50 text-red-800 border border-red-300 font-mono text-[10px] px-2 py-0.5 uppercase tracking-wide font-bold">Ditolak</span>;
      default:
        return <span className="bg-blue-50 text-blue-800 border border-blue-300 font-mono text-[10px] px-2 py-0.5 uppercase tracking-wide font-bold">Menunggu Konfirmasi Anda</span>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-[#E0E0E0] pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Agenda Penugasan Saya</h2>
          <p className="text-xs text-slate-500">Berikut adalah daftar mandat penugasan resmi Anda.</p>
        </div>
        {onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className="border-2 border-slate-300 bg-white text-slate-700 font-bold py-1 px-3 text-xs uppercase cursor-pointer"
          >
            Dashboard
          </button>
        )}
      </div>

      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        {myPenugasan.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[#E0E0E0] text-slate-500 text-xs bg-slate-50">
            Anda belum memiliki riwayat atau rencana penugasan di sistem saat ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nama Kegiatan</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Tanggal Agenda</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Lokasi / Tempat</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status Mandat</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {myPenugasan.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-800">{p.kegiatanNama}</td>
                    <td className="p-2.5 font-mono text-slate-600">{p.tanggal}</td>
                    <td className="p-2.5 text-slate-600">{p.lokasi}</td>
                    <td className="p-2.5">{getStatusBadge(p)}</td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => onSelectPenugasan(p.id)}
                        className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold px-3 py-1 text-[11px] uppercase tracking-wide cursor-pointer"
                      >
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 border border-[#E0E0E0]">
        <h4 className="text-xs font-bold text-[#1A3C5E] uppercase mb-1">Informasi Hak Pengumuman Talent:</h4>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Setiap penugasan baru wajib dikonfirmasi secepatnya demi kelancaran koordinasi dengan Klien/Instansi terkait. Jika Anda berhalangan hadir, harap pilih tombol <strong>Tolak</strong> disertai alasan yang valid agar bagian SDM dapat segera mem-plotting ulang talent pengganti.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 11. HALAMAN DETAIL PENUGASAN
// ==========================================
interface TalentDetailProps {
  penugasanId: string;
  penugasanList: Penugasan[];
  onRespondAssignment: (id: string, accept: boolean) => void;
  onNavigateToReport: (id: string) => void;
  onBack: () => void;
}

export function TalentDetail({
  penugasanId,
  penugasanList,
  onRespondAssignment,
  onNavigateToReport,
  onBack
}: TalentDetailProps) {
  const p = penugasanList.find(x => x.id === penugasanId);

  if (!p) {
    return (
      <div className="space-y-4 text-center py-12 font-sans border-2 border-[#1A3C5E]">
        <p className="text-xs text-slate-500">Penugasan tidak ditemukan. Pilih penugasan dari daftar terlebih dahulu.</p>
        <button onClick={onBack} className="text-[#1A3C5E] font-bold text-xs underline cursor-pointer">
          Kembali ke Daftar Penugasan
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Back Button */}
      <div className="flex items-center gap-3 border-b border-[#E0E0E0] pb-4">
        <button 
          onClick={onBack}
          className="p-1 hover:bg-slate-100 border border-slate-300 text-slate-700 cursor-pointer"
          title="Kembali"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Detail Informasi Penugasan</h2>
          <p className="text-xs text-slate-500">Mandat Kegiatan: <strong>{p.kegiatanNama}</strong></p>
        </div>
      </div>

      {/* Detail Block */}
      <div className="bg-white border-2 border-[#1A3C5E] p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Nama Agenda Kegiatan</span>
              <span className="text-sm font-bold text-[#1A3C5E]">{p.kegiatanNama}</span>
            </div>
            
            <div className="flex gap-6">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Tanggal Pelaksanaan</span>
                <span className="text-xs font-mono font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5" /> {p.tanggal}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Lokasi / Tempat</span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" /> {p.lokasi}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Instruksi & Dresscode</span>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-2 border">
                Pakaian: Kebaya/Beskap Lengkap (Pakaian Resmi Duta Wisata Surabaya). Hadir di lokasi 30 menit sebelum acara untuk briefing.
              </p>
            </div>
          </div>

          <div className="border-l border-[#E0E0E0] pl-6 space-y-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Status Penerimaan Anda</span>
              <div className="mt-1.5">
                {p.status === 'Menunggu Konfirmasi' && (
                  <span className="bg-amber-50 text-amber-800 border border-amber-300 font-mono text-[10px] px-2.5 py-1 uppercase tracking-wide font-bold">
                    Menunggu Jawaban Anda
                  </span>
                )}
                {p.status === 'Dikonfirmasi' && (
                  <span className="bg-green-50 text-green-800 border border-green-300 font-mono text-[10px] px-2.5 py-1 uppercase tracking-wide font-bold flex items-center gap-1 w-max">
                    <CheckCircle className="w-4 h-4" /> Telah Anda Setujui
                  </span>
                )}
                {p.status === 'Selesai' && (
                  <span className="bg-slate-100 text-slate-800 border border-slate-300 font-mono text-[10px] px-2.5 py-1 uppercase tracking-wide font-bold flex items-center gap-1 w-max">
                    <CheckCircle className="w-4 h-4 text-slate-500" /> Selesai & Laporan Terkirim
                  </span>
                )}
                {p.status === 'Ditolak' && (
                  <span className="bg-red-50 text-red-800 border border-red-300 font-mono text-[10px] px-2.5 py-1 uppercase tracking-wide font-bold flex items-center gap-1 w-max">
                    <XCircle className="w-4 h-4" /> Penugasan Ditolak
                  </span>
                )}
              </div>
            </div>

            {p.honor !== undefined && (
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Rincian Honorarium</span>
                <p className="text-sm font-bold font-mono text-emerald-800 mt-0.5">
                  Rp {(p.honor ?? 0).toLocaleString('id-ID')}
                </p>
                <p className="text-[10px] text-slate-500">Status Pembayaran: <strong className="uppercase font-mono text-amber-700">{p.statusBayar}</strong></p>
              </div>
            )}
          </div>
        </div>

        {/* Visual Timeline Stepper to Clarify Assignment Flow */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Alur Kerja Penugasan Duta Wisata</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className={`p-3 border rounded ${p.status !== 'Menunggu Konfirmasi' ? 'border-green-200 bg-green-50/50' : 'border-amber-200 bg-amber-50/50'} text-xs space-y-1`}>
              <div className="flex items-center gap-1.5 font-bold">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono text-white ${p.status !== 'Menunggu Konfirmasi' ? 'bg-green-600' : 'bg-amber-600 animate-pulse'}`}>1</span>
                <span className={p.status !== 'Menunggu Konfirmasi' ? 'text-green-800' : 'text-amber-800'}>Plotting & Konfirmasi</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {p.status === 'Menunggu Konfirmasi' 
                  ? 'Menunggu jawaban persetujuan Anda di bawah.' 
                  : `Telah disetujui pada jadwal ${p.tanggal}.`}
              </p>
            </div>

            {/* Step 2 */}
            <div className={`p-3 border rounded ${p.status === 'Selesai' ? 'border-green-200 bg-green-50/50' : (p.status === 'Dikonfirmasi' ? 'border-blue-200 bg-blue-50/50 animate-pulse' : 'border-slate-200 bg-white')} text-xs space-y-1`}>
              <div className="flex items-center gap-1.5 font-bold">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono text-white ${p.status === 'Selesai' ? 'bg-green-600' : (p.status === 'Dikonfirmasi' ? 'bg-blue-600' : 'bg-slate-400')}`}>2</span>
                <span className={p.status === 'Selesai' ? 'text-green-800' : (p.status === 'Dikonfirmasi' ? 'text-blue-800' : 'text-slate-500')}>Pelaksanaan di Lapangan</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {p.status === 'Selesai' 
                  ? 'Tugas sukses dilaksanakan.' 
                  : (p.status === 'Dikonfirmasi' 
                    ? `Sedang bertugas lapangan pada tanggal ${p.tanggal}.` 
                    : 'Menunggu konfirmasi tugas.')}
              </p>
            </div>

            {/* Step 3 */}
            <div className={`p-3 border rounded ${p.status === 'Selesai' ? 'border-green-200 bg-green-50/50' : (p.status === 'Dikonfirmasi' ? 'border-amber-200 bg-amber-50/50 font-bold' : 'border-slate-200 bg-white')} text-xs space-y-1`}>
              <div className="flex items-center gap-1.5 font-bold">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono text-white ${p.status === 'Selesai' ? 'bg-green-600' : (p.status === 'Dikonfirmasi' ? 'bg-amber-600' : 'bg-slate-400')}`}>3</span>
                <span className={p.status === 'Selesai' ? 'text-green-800' : (p.status === 'Dikonfirmasi' ? 'text-amber-800' : 'text-slate-500')}>Unggah Laporan Kegiatan</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {p.status === 'Selesai' 
                  ? 'Laporan diarsip & menunggu validasi SDM.' 
                  : (p.status === 'Dikonfirmasi' 
                    ? 'Wajib diisi setelah kegiatan selesai dilaksanakan.' 
                    : 'Tersedia setelah menyetujui mandat.')}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons based on status */}
        <div className="pt-5 border-t border-[#E0E0E0] flex justify-end gap-3">
          {p.status === 'Menunggu Konfirmasi' && (
            <>
              <button
                onClick={() => {
                  if (confirm('Tolak penugasan ini? Bagian SDM akan mendapat notifikasi.')) {
                    onRespondAssignment(p.id, false);
                  }
                }}
                className="bg-red-700 hover:bg-slate-800 text-white font-bold py-2 px-6 text-xs uppercase tracking-wider cursor-pointer border-none"
              >
                Tolak Penugasan
              </button>
              <button
                onClick={() => {
                  onRespondAssignment(p.id, true);
                }}
                className="bg-[#2E7D32] hover:bg-slate-800 text-white font-bold py-2 px-6 text-xs uppercase tracking-wider cursor-pointer border-none"
              >
                Terima Penugasan
              </button>
            </>
          )}

          {p.status === 'Dikonfirmasi' && (
            <div className="w-full text-right space-y-2">
              <p className="text-[11px] text-amber-700 italic font-medium">
                ⓘ Anda sedang berada dalam masa menjalankan tugas lapangan. Setelah agenda selesai, silakan mengisi laporan pertanggungjawaban:
              </p>
              <button
                onClick={() => onNavigateToReport(p.id)}
                className="bg-indigo-700 hover:bg-slate-800 text-white font-bold py-2 px-6 text-xs uppercase tracking-wider cursor-pointer border-none flex items-center gap-1.5 ml-auto"
              >
                <CheckCircle className="w-4 h-4" /> Selesaikan Tugas & Unggah Laporan
              </button>
            </div>
          )}

          {p.status === 'Selesai' && p.laporanDeskripsi && (
            <div className="w-full bg-slate-50 p-4 border text-xs text-slate-700 space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase">Dokumentasi Laporan Anda:</span>
              <p className="font-medium">"{p.laporanDeskripsi}"</p>
              <p className="font-mono text-[10px] text-slate-500">Bukti Upload: {p.laporanBuktiLink || 'bukti_kehadiran.jpg'}</p>
              {p.laporanStatus && (
                <p className="text-xs mt-1.5">Status Persetujuan SDM: <strong className="uppercase">{p.laporanStatus}</strong></p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 12. FORM LAPORAN KEGIATAN
// ==========================================
interface TalentReportFormProps {
  penugasanId: string;
  penugasanList: Penugasan[];
  onSubmitReport: (id: string, deskripsi: string, fileLabel: string) => void;
  onCancel: () => void;
}

export function TalentReportForm({
  penugasanId,
  penugasanList,
  onSubmitReport,
  onCancel
}: TalentReportFormProps) {
  const p = penugasanList.find(x => x.id === penugasanId) || penugasanList[0];

  const [deskripsi, setDeskripsi] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deskripsi.trim()) {
      alert('Deskripsi laporan wajib diisi!');
      return;
    }
    const finalFile = fileName || 'bukti_laporan_kehadiran.pdf';
    onSubmitReport(p.id, deskripsi.trim(), finalFile);
    alert('Laporan berhasil terkirim! Status kegiatan kini dialihkan ke SDM untuk proses validasi.');
  };

  const triggerMockUpload = () => {
    const mockFiles = [
      'dokumentasi_rujak_uleg_final.jpg',
      'surabaya_vaganza_tunjungan.png',
      'laporan_pemateri_duta.pdf',
      'absen_presensi_kegiatan_pariwisata.jpg'
    ];
    const rand = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    setFileName(rand);
  };

  return (
    <div className="max-w-[600px] mx-auto font-sans p-6 bg-white border-2 border-[#1A3C5E]">
      <div className="mb-6 flex justify-between items-center text-[10px] font-mono border-b pb-4">
        <div className="flex items-center gap-1 text-slate-500 font-bold">
          <span className="w-4 h-4 rounded-full bg-slate-400 text-white flex items-center justify-center text-[8px]">1</span>
          <span>Selesai Tugas Lapangan</span>
        </div>
        <div className="text-slate-400">➔</div>
        <div className="flex items-center gap-1 text-indigo-700 font-bold">
          <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[8px]">2</span>
          <span>Isi Laporan (Sekarang)</span>
        </div>
        <div className="text-slate-400">➔</div>
        <div className="flex items-center gap-1 text-slate-400">
          <span className="w-4 h-4 rounded-full bg-slate-300 text-white flex items-center justify-center text-[8px]">3</span>
          <span>Validasi Pengurus</span>
        </div>
      </div>

      <div className="border-b border-[#E0E0E0] pb-3 mb-5">
        <h2 className="text-base font-bold uppercase tracking-tight text-[#1A3C5E]">Buat Laporan Kegiatan</h2>
        <p className="text-xs text-slate-500">Formulir pelaporan mandat tugas yang telah diselesaikan di lapangan.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prefilled and Disabled Info */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 border text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Nama Agenda Kegiatan</span>
            <span className="font-bold text-slate-700">{p ? p.kegiatanNama : '[Nama Kegiatan]'}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Tanggal Tugas</span>
            <span className="font-mono font-bold text-slate-700">{p ? p.tanggal : '[Tanggal]'}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Deskripsi & Catatan Kegiatan</label>
          <textarea
            rows={4}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Jelaskan kontribusi Anda pada kegiatan ini, kendala yang dihadapi, atau testimoni singkat..."
            className="w-full p-2.5 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs font-sans"
            required
          />
        </div>

        {/* Custom Mock Drag and Drop */}
        <div>
          <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Upload Bukti Kehadiran / Foto Tugas</label>
          <div
            onClick={triggerMockUpload}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragOver(false); triggerMockUpload(); }}
            className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
              isDragOver ? 'border-emerald-600 bg-emerald-50' : 'border-[#1A3C5E] hover:bg-slate-50'
            }`}
          >
            <Upload className="w-8 h-8 text-[#1A3C5E] mx-auto mb-2" />
            <span className="text-xs font-bold text-slate-800 block">
              {fileName ? '✓ File Terpilih' : 'Pilih File atau Tarik (Drag & Drop) ke Sini'}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
              {fileName ? fileName : 'Maksimal ukuran file: 10 MB (Format: .JPG, .PNG, .PDF)'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 italic">Klik area kotak di atas untuk mensimulasikan upload file.</p>
        </div>

        {/* Buttons */}
        <div className="pt-3 border-t border-[#E0E0E0] flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold py-1.5 px-5 text-xs uppercase tracking-wider cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1.5 px-5 text-xs uppercase tracking-wider cursor-pointer border-none"
          >
            Kirim Laporan
          </button>
        </div>
      </form>
    </div>
  );
}

// ==========================================
// NEW: TALENT RIWAYAT KEGIATAN
// ==========================================
interface TalentRiwayatKegiatanProps {
  talent: User;
  penugasanList: Penugasan[];
  onBack: () => void;
}

export function TalentRiwayatKegiatan({ talent, penugasanList, onBack }: TalentRiwayatKegiatanProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const riwayat = penugasanList.filter(
    p => p.talentId === talent.id && (p.status === 'Selesai' || p.status === 'Dikonfirmasi')
  );

  const filteredRiwayat = riwayat.filter(r => 
    r.kegiatanNama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.lokasi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Riwayat & Portofolio Tugas</h2>
          <p className="text-xs text-slate-500">Semua riwayat pengabdian tugas duta wisata yang telah terlaksana.</p>
        </div>
        <button
          onClick={onBack}
          className="border-2 border-slate-300 bg-white text-slate-700 font-bold py-1 px-3 text-xs uppercase cursor-pointer"
        >
          Kembali ke Dashboard
        </button>
      </div>

      <div className="bg-white border-2 border-[#1A3C5E] p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-[#1A3C5E] uppercase font-mono">Total Tercatat: {riwayat.length} Kegiatan</span>
          <input
            type="text"
            placeholder="Cari riwayat nama kegiatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1 px-3 border-2 border-[#1A3C5E] text-xs max-w-xs w-full focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nama Kegiatan</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Tanggal Agenda</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Lokasi</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status Validasi</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Unduh Sertifikat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E0E0]">
              {filteredRiwayat.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-800">{r.kegiatanNama}</td>
                  <td className="p-2.5 font-mono text-slate-500">{r.tanggal}</td>
                  <td className="p-2.5 text-slate-600">{r.lokasi}</td>
                  <td className="p-2.5">
                    <span className="bg-green-50 text-green-800 border border-green-200 text-[10px] font-mono px-2 py-0.5 uppercase font-bold">
                      {r.laporanStatus || 'Disetujui'}
                    </span>
                  </td>
                  <td className="p-2.5 text-center">
                    <button
                      onClick={() => alert(`[Simulasi Sertifikat]\n\nSertifikat Penghargaan Digital untuk kegiatan "${r.kegiatanNama}" siap diunduh oleh ${talent.nama}.`)}
                      className="bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-1 px-2.5 text-[10px] uppercase cursor-pointer"
                    >
                      Unduh PDF
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRiwayat.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 italic">Tidak ada riwayat pengabdian kegiatan yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// NEW: TALENT RIWAYAT HONOR
// ==========================================
interface TalentRiwayatHonorProps {
  talent: User;
  penugasanList: Penugasan[];
  onBack: () => void;
}

export function TalentRiwayatHonor({ talent, penugasanList, onBack }: TalentRiwayatHonorProps) {
  const honorPenugasan = penugasanList.filter(p => p.talentId === talent.id && p.honor);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Riwayat Pembayaran Honor</h2>
          <p className="text-xs text-slate-500">Pantau nominal honorarium dan unduh slip bukti transfer bank dari bendahara.</p>
        </div>
        <button
          onClick={onBack}
          className="border-2 border-slate-300 bg-white text-slate-700 font-bold py-1 px-3 text-xs uppercase cursor-pointer"
        >
          Kembali ke Dashboard
        </button>
      </div>

      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Kegiatan Resmi</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Tanggal Transfer</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nominal Kotor (Gross)</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status Pembayaran</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Keterangan Penerimaan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E0E0]">
              {honorPenugasan.map((hp) => (
                <tr key={hp.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-800">{hp.kegiatanNama}</td>
                  <td className="p-2.5 font-mono text-slate-500">{hp.tanggalBayar || 'Belum Ditransfer'}</td>
                  <td className="p-2.5 font-mono text-[#2E7D32] font-bold">Rp {(hp.honor ?? 0).toLocaleString('id-ID')}</td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold border ${
                      hp.statusBayar === 'Lunas' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}>
                      {hp.statusBayar}
                    </span>
                  </td>
                  <td className="p-2.5 text-center text-xs font-medium text-slate-600">
                    {hp.statusBayar === 'Lunas' ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 border border-emerald-200 uppercase text-[9px] font-mono inline-block">
                        Sudah Masuk Rekening (Bank Jatim)
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono text-[10px] italic">Selesaikan Laporan & Tunggu Transfer</span>
                    )}
                  </td>
                </tr>
              ))}
              {honorPenugasan.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 italic">Belum ada rincian honor yang terdaftar di sistem.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// NEW: TALENT PROFILE & PORTFOLIO EDIT
// ==========================================
interface TalentProfileEditProps {
  talent: User;
  onSaveProfile: (updated: User) => void;
  onBack: () => void;
}

export function TalentProfileEdit({ talent, onSaveProfile, onBack }: TalentProfileEditProps) {
  const [nama, setNama] = useState(talent.nama);
  const [email, setEmail] = useState(talent.email);
  const [telepon, setTelepon] = useState(talent.telepon);
  const [status, setStatus] = useState(talent.status);
  const [bio, setBio] = useState('Duta Wisata yang berfokus pada pelestarian kuliner lokal dan tarian tradisional Surabaya.');
  const [portofolioLink, setPortofolioLink] = useState('https://behance.net/cak_ning_surabaya');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...talent,
      nama,
      email,
      telepon,
      status
    };
    onSaveProfile(updated);
    alert('Portofolio & profil keanggotaan berhasil diperbarui!');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Profil Keanggotaan & Portofolio</h2>
          <p className="text-xs text-slate-500">Kelola informasi publik, biografi kepariwisataan, dan ketersediaan plotting.</p>
        </div>
        <button
          onClick={onBack}
          className="border-2 border-slate-300 bg-white text-slate-700 font-bold py-1 px-3 text-xs uppercase cursor-pointer"
        >
          Kembali ke Dashboard
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left column info */}
        <div className="col-span-2 bg-white border-2 border-[#1A3C5E] p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b pb-2">Edit Informasi Umum</h3>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full p-2 border bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1A3C5E]"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Angkatan Duta Wisata</label>
                <input
                  type="text"
                  value={talent.angkatan || 'Cak/Ning'}
                  className="w-full p-2 border bg-slate-100 text-slate-400 font-mono"
                  disabled
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border bg-slate-50 focus:bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nomor Telepon / WA</label>
                <input
                  type="text"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  className="w-full p-2 border bg-slate-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2 text-xs">
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Biografi Singkat (Publik)</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Tautan Link Portofolio Seni/Sosmed</label>
              <input
                type="url"
                value={portofolioLink}
                onChange={(e) => setPortofolioLink(e.target.value)}
                className="w-full p-2 border bg-slate-50 focus:bg-white font-mono"
              />
            </div>

            <div className="pt-2 border-t flex justify-end">
              <button
                type="submit"
                className="bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-2 px-6 text-xs uppercase tracking-wider cursor-pointer border-none flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Simpan Portofolio
              </button>
            </div>
          </form>
        </div>

        {/* Right column keaktifan toggle */}
        <div className="bg-white border-2 border-[#1A3C5E] p-6 text-xs text-slate-700 space-y-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b pb-2">Status Ketersediaan Plotting</h3>
          <p className="text-slate-500 leading-relaxed text-[11px]">
            Jika Anda sedang berhalangan bertugas karena ujian akademik, sakit, atau urusan dinas luar kota, ubah status Anda menjadi <strong>Nonaktif</strong> agar sistem SDM secara otomatis melewati profil Anda saat plotting.
          </p>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase">Status Keaktifan Saat Ini:</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStatus('Aktif')}
                className={`flex-1 py-2 border font-bold text-xs uppercase cursor-pointer ${
                  status === 'Aktif' ? 'bg-green-700 text-white border-green-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                Aktif / Bersedia
              </button>
              <button
                type="button"
                onClick={() => setStatus('Nonaktif')}
                className={`flex-1 py-2 border font-bold text-xs uppercase cursor-pointer ${
                  status === 'Nonaktif' ? 'bg-red-700 text-white border-red-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                Nonaktif / Cuti
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
