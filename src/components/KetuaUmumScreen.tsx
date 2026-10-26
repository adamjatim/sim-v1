import React from 'react';
import { User, Penugasan, Kegiatan, Client, Sponsor } from '../types';
import { 
  Building2, 
  Users, 
  Calendar, 
  Award, 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Star, 
  ChevronRight, 
  AlertCircle,
  FileText,
  Sparkles
} from 'lucide-react';

interface KetuaUmumScreenProps {
  ketumUser: User;
  users: User[];
  kegiatanList: Kegiatan[];
  penugasanList: Penugasan[];
  clients: Client[];
  sponsors: Sponsor[];
  onNavigate: (screenId: string) => void;
}

export function KetuaUmumScreen({
  ketumUser,
  users,
  kegiatanList,
  penugasanList,
  clients,
  sponsors,
  onNavigate
}: KetuaUmumScreenProps) {
  const talents = users.filter(u => u.peran === 'Talent');
  const totalTalents = talents.length;
  const activeTalents = talents.filter(t => t.status === 'Aktif').length;

  const totalHonorPaid = penugasanList
    .filter(p => p.statusBayar === 'Lunas')
    .reduce((sum, p) => sum + (p.honor || 0), 0);

  const pendingReports = penugasanList.filter(p => p.laporanStatus === 'Menunggu Validasi').length;
  const pendingPayments = penugasanList.filter(p => p.status === 'Selesai' && p.statusBayar !== 'Lunas').length;

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-12">
      {/* Executive Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0F2742] via-[#1A3C5E] to-[#2E5884] text-white p-6 md:p-8 shadow-lg border border-slate-700/50">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Mandat & Koordinasi Lintas Bidang
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Pengawasan & Monitoring Agenda Kegiatan
            </h2>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              Selamat datang, <strong>{ketumUser?.nama || 'Cak Sandy Wicaksana, S.I.Kom'}</strong>. Pemantauan langsung 10 agenda strategis tingkat kota, koordinasi mandat penugasan, dan pengawasan kepatuhan paguyuban.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <span className="text-[11px] font-mono px-3 py-1 rounded bg-white/10 border border-white/20 text-center">
              Masa Bakti: 2024 &mdash; 2027
            </span>
            <span className="text-[11px] font-mono px-3 py-1 rounded bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-center font-bold">
              Organisasi Berjalan Sehat
            </span>
          </div>
        </div>
      </div>

      {/* Quick Coordination Links to Divisions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => onNavigate('SDM_TALENT_LIST')}
          className="bg-white hover:bg-blue-50/50 p-4 rounded-xl border border-slate-200 hover:border-[#1A3C5E] transition-all text-left flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#1A3C5E]">Koordinasi Sie SDM</h4>
              <p className="text-[11px] text-slate-500">Periksa daftar duta & ketersediaan talent</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1A3C5E]" />
        </button>

        <button
          onClick={() => onNavigate('HUMAS_CLIENTS')}
          className="bg-white hover:bg-amber-50/50 p-4 rounded-xl border border-slate-200 hover:border-amber-500 transition-all text-left flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-amber-700">Koordinasi Sie Humas</h4>
              <p className="text-[11px] text-slate-500">Periksa kemitraan klien & pengajuan event</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
        </button>

        <button
          onClick={() => onNavigate('BENDAHARA_PAYMENT_LIST')}
          className="bg-white hover:bg-emerald-50/50 p-4 rounded-xl border border-slate-200 hover:border-emerald-600 transition-all text-left flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">Koordinasi Bendahara</h4>
              <p className="text-[11px] text-slate-500">Periksa daftar pembayaran & bukti honor</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
        </button>
      </div>

      {/* Agenda Strategis & Pengawasan Mandat Tingkat Kota */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-[#1A3C5E]">Pengawasan 10 Agenda Strategis Tingkat Kota & Internasional</h3>
            <p className="text-xs text-slate-500">Pemantauan langsung kegiatan seremonial Walikota, pameran pariwisata, dan tamu delegasi asing.</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Tahun Anggaran 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3 w-12 text-center">No</th>
                <th className="p-3">Nama Agenda Kegiatan</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Lokasi Tempat</th>
                <th className="p-3">Status Pelaksanaan</th>
                <th className="p-3 text-center">Status SDM & Plotting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {kegiatanList.slice(0, 10).map((keg, idx) => (
                <tr key={keg.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                  <td className="p-3 font-bold text-[#1A3C5E] max-w-xs">{keg.namaKegiatan}</td>
                  <td className="p-3 font-mono text-slate-600 whitespace-nowrap">{keg.tanggal}</td>
                  <td className="p-3 text-slate-600">{keg.lokasi}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block ${
                      keg.status === 'Selesai' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                      keg.status === 'Sedang Berjalan' ? 'bg-blue-50 text-[#1A3C5E] border-blue-200' :
                      'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {keg.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-emerald-700 font-bold text-[10px] flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terkoordinasi
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
