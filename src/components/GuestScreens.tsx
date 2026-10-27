import React, { useState } from 'react';
import { User, ContactMessage } from '../types';
import {
  Building2,
  Users,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  Globe,
  Mic
} from 'lucide-react';

interface GuestScreensProps {
  currentScreen: 'GUEST_HOME' | 'GUEST_TALENTS' | 'GUEST_CONTACT' | 'GUEST_TALENT_DETAIL';
  onNavigate: (screenId: string) => void;
  talents: User[];
  onSendContact: (msg: ContactMessage) => void;
  selectedTalentId?: string | null;
  onSelectTalent?: (id: string) => void;
}

export function GuestScreens({ currentScreen, onNavigate, talents, onSendContact, selectedTalentId, onSelectTalent }: GuestScreensProps) {
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: ''
  });
  const [isSentSuccess, setIsSentSuccess] = useState(false);

  const handleSelectTalent = (id: string) => {
    if (onSelectTalent) {
      onSelectTalent(id);
    } else {
      onNavigate('GUEST_TALENT_DETAIL');
    }
  };

// Filter 12 dummy talents for Guest
const talentList = talents.filter(u => u.peran === 'Talent').slice(0, 12);

const handleContactSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!contactForm.nama || !contactForm.email || !contactForm.subjek || !contactForm.pesan) {
    alert('Mohon lengkapi seluruh kolom formulir pesan.');
    return;
  }

  onSendContact({
    id: 'msg_' + Date.now(),
    nama: contactForm.nama,
    email: contactForm.email,
    subjek: contactForm.subjek,
    pesan: contactForm.pesan,
    tanggal: new Date().toISOString().split('T')[0]
  });

  setIsSentSuccess(true);
  setContactForm({ nama: '', email: '', subjek: '', pesan: '' });
  setTimeout(() => setIsSentSuccess(false), 5000);
};

// ============================================================================
// 1. HALAMAN BERANDA GUEST
// ============================================================================
if (currentScreen === 'GUEST_HOME') {
  return (
    <div className="space-y-12 animate-fade-in pb-16 font-sans">
      {/* Hero Section dengan Background Gedung Surabaya & Teks Sambutan */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0F2742] via-[#1A3C5E] to-[#254F7B] text-white p-8 md:p-14 shadow-xl border border-slate-700/50">
        {/* Surabaya Skyline Decorative SVG Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-end">
          <svg viewBox="0 0 1200 300" className="w-full h-48 fill-current text-white">
            {/* Gedung Balai Kota, Jembatan Suramadu, Tugu Pahlawan Silhouette */}
            <rect x="50" y="80" width="60" height="220" />
            <rect x="130" y="40" width="80" height="260" />
            <polygon points="170,10 130,40 210,40" />
            <rect x="230" y="100" width="70" height="200" />
            <rect x="330" y="140" width="100" height="160" />
            {/* Tugu Pahlawan */}
            <polygon points="500,20 480,280 520,280" />
            <rect x="470" y="280" width="60" height="20" />
            <rect x="560" y="70" width="75" height="230" />
            <rect x="660" y="110" width="90" height="190" />
            {/* Suramadu Cable Stayed */}
            <polygon points="850,50 830,290 870,290" />
            <polygon points="1050,50 1030,290 1070,290" />
            <line x1="850" y1="50" x2="1050" y2="50" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Sugeng Rawuh ing Paguyuban Cak & Ning Surabaya
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Duta Wisata Resmi & Pelestari Seni Budaya <span className="text-amber-400">Kota Pahlawan</span>
          </h1>

          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-2xl">
            Selamat datang di portal resmi Paguyuban Cak & Ning Surabaya. Wadah representasi pemuda-pemudi terbaik Surabaya dalam mengawal promosi destinasi wisata, penyambutan tamu kenegaraan, serta pelestari adat istiadat khas Arek Suroboyo.
          </p>

          <div className="flex flex-wrap gap-3 pt-3">
            <button
              onClick={() => onNavigate('GUEST_TALENTS')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-xl text-xs md:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              Lihat 12 Profil Duta Wisata <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('GUEST_CONTACT')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-xs md:text-sm border border-white/20 transition-all cursor-pointer flex items-center gap-2"
            >
              Hubungi Sekretariat Kami
            </button>
          </div>
        </div>
      </div>

      {/* 3 Kartu Statistik (Total Talent, Total Kegiatan, Total Mitra) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Capaian Organisasi Tahun 2026</h2>
          <span className="text-xs font-mono text-slate-400">Surabaya Kota Ramah Pariwisata</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Talent */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Talent Duta</span>
              <span className="text-3xl font-black text-[#1A3C5E] font-mono block">15+ Orang</span>
              <p className="text-xs text-emerald-600 font-medium">Angkatan 2021 &mdash; 2025 Aktif</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center">
              <Users className="w-7 h-7" />
            </div>
          </div>

          {/* Total Kegiatan */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Kegiatan</span>
              <span className="text-3xl font-black text-amber-600 font-mono block">45 Agenda</span>
              <p className="text-xs text-slate-500 font-medium">Terlaksana Sepanjang 2026</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-7 h-7" />
            </div>
          </div>

          {/* Total Mitra */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Mitra Kerjasama</span>
              <span className="text-3xl font-black text-emerald-700 font-mono block">12 Mitra</span>
              <p className="text-xs text-slate-500 font-medium">Dinas, Perhotelan & BUMD</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Building2 className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Section Visi & Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#1A3C5E]">Visi Paguyuban</h3>
            <p className="text-slate-600 text-sm leading-relaxed italic border-l-4 border-amber-500 pl-4 py-1.5">
              "Menjadi wadah kepemudaan yang berkarakter, berbudaya, dan berdaya saing global dalam melestarikan pusaka seni tradisi Arek Suroboyo serta memajukan pariwisata Kota Surabaya secara inklusif dan berkelanjutan."
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            Budi Luhur, Wicaksana, Berkarakter Surabaya
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-[#1A3C5E]">Misi Organisasi</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-[#1A3C5E] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span>Mengembangkan kapasitas kepemimpinan, kepribadian, diplomasi budaya, dan penguasaan bahasa asing setiap anggota.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-[#1A3C5E] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span>Menjadi mitra strategis Pemerintah Kota Surabaya dan Dinas Pariwisata dalam menyukseskan promosi destinasi unggulan.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-[#1A3C5E] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>Mendorong pelestarian busana adat khas beskap Cak dan kebaya Ning dengan selendang tradisi Kota Surabaya.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. HALAMAN DAFTAR TALENT GUEST (12 Data Dummy Grid 3-4 Kolom)
// ============================================================================
if (currentScreen === 'GUEST_TALENTS') {
  return (
    <div className="space-y-6 animate-fade-in pb-16 font-sans">
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1A3C5E] text-xs font-semibold mb-1">
          Direktori Publik
        </div>
        <h2 className="text-2xl font-black text-[#1A3C5E]">Daftar 12 Talent Cak & Ning Surabaya</h2>
        <p className="text-xs text-slate-500 mt-0.5">Pemuda-pemudi terbaik perwakilan duta pariwisata resmi Kota Pahlawan.</p>
      </div>

      {/* Grid 3-4 Kolom (Foto Placeholder, Nama, Angkatan) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {talentList.map((t) => {
          const isNing = t.nama.toLowerCase().includes('ning');
          const avatarGradient = isNing ? 'from-rose-500 to-pink-600' : 'from-[#1A3C5E] to-blue-700';

          return (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-[#1A3C5E] transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => handleSelectTalent(t.id)}
            >
              <div>
                {/* Foto Placeholder Busana Cak/Ning */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-slate-100 flex items-center justify-center border border-slate-200">
                  <div className={`w-full h-full bg-gradient-to-tr ${avatarGradient} text-white flex flex-col items-center justify-center p-4 text-center group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-4xl font-black tracking-wider">
                      {t.nama.substring(0, 2).toUpperCase()}
                    </span>
                    <span className="text-[10px] uppercase font-mono mt-2 tracking-widest opacity-80">
                      {isNing ? 'Ning Surabaya' : 'Cak Surabaya'}
                    </span>
                  </div>
                  {/* Status Pill */}
                  <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                    {t.status}
                  </span>
                </div>

                {/* Nama & Angkatan */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1A3C5E] border border-blue-200 inline-block font-mono">
                    {t.angkatan || 'Cak Ning 2024'}
                  </span>
                  <h3 className="font-bold text-base text-slate-800 group-hover:text-[#1A3C5E] transition-colors line-clamp-1">
                    {t.nama}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {t.spesialisasi || 'MC Keprotokolan & Pemandu Wisata'}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{t.rating || 4.9}</span>
                </div>
                <span className="text-slate-400 group-hover:text-[#1A3C5E] font-semibold text-[11px] flex items-center gap-1">
                  Duta Resmi <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 3. HALAMAN DETAIL TALENT GUEST (Halaman Penuh – Data Publik Saja)
// ============================================================================
if (currentScreen === 'GUEST_TALENT_DETAIL') {
  const talent = selectedTalentId
    ? talentList.find(t => t.id === selectedTalentId) || talentList[0]
    : talentList[0];
  if (!talent) return null;

  const isNing = talent.nama.toLowerCase().includes('ning');
  const avatarGradient = isNing ? 'from-rose-500 to-pink-600' : 'from-[#1A3C5E] to-blue-700';

  return (
    <div className="space-y-6 animate-fade-in pb-16 font-sans">
      {/* Tombol Kembali */}
      <button
        onClick={() => onNavigate('GUEST_TALENTS')}
        className="flex items-center gap-2 text-[#1A3C5E] hover:text-slate-700 font-bold text-xs cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Talent
      </button>

      {/* Card Utama Profil */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner Gradien Atas */}
        <div className={`h-28 bg-gradient-to-r ${avatarGradient} relative`}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }} />
          {/* Status Badge */}
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold border border-white/30 backdrop-blur-sm">
            {talent.status}
          </span>
        </div>

        <div className="px-6 md:px-10 pb-8">
          {/* Avatar */}
          <div className={`-mt-12 w-24 h-24 rounded-2xl bg-gradient-to-tr ${avatarGradient} text-white flex flex-col items-center justify-center border-4 border-white shadow-md mb-4`}>
            <span className="text-2xl font-black">{talent.nama.substring(0, 2).toUpperCase()}</span>
            <span className="text-[8px] uppercase font-mono tracking-widest opacity-80">{isNing ? 'Ning' : 'Cak'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kolom Kiri: Identitas */}
            <div className="md:col-span-1 space-y-4">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1A3C5E] border border-blue-200 inline-block font-mono">
                  {talent.angkatan || 'Cak Ning 2024'}
                </span>
                <h2 className="text-2xl font-black text-[#1A3C5E] mt-2">{talent.nama}</h2>
                <p className="text-sm text-slate-500 mt-1">{talent.spesialisasi || 'MC Keprotokolan & Pemandu Wisata'}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-2xl font-black text-amber-600 font-mono">{talent.rating || 4.9}</span>
                <span className="text-xs text-amber-700 font-semibold">/ 5.0 — Duta Teladan</span>
              </div>

              {/* Status Keanggotaan */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block">Status Keanggotaan</span>
                  <span className="text-sm font-bold text-emerald-800">{talent.status}</span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Keahlian & Info Publik */}
            <div className="md:col-span-2 space-y-5">
              {/* Keahlian & Spesialisasi */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-[#1A3C5E] flex items-center gap-2">
                  <Mic className="w-4 h-4 text-amber-500" /> Keahlian & Spesialisasi
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(talent.spesialisasi || 'MC Keprotokolan, Pemandu Wisata, Seni Budaya Surabaya')
                    .split(',').map((skill, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white border border-blue-200 text-[#1A3C5E] text-xs font-semibold shadow-xs">
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              </div>

              {/* Prestasi */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-[#1A3C5E] flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" /> Prestasi & Gelar Kehormatan
                </h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Perwakilan Resmi Paguyuban Cak &amp; Ning — Duta Wisata Kota Surabaya</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Terlatih protokoler penyambutan tamu VVIP, kedutaan, dan delegasi pemerintahan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Anggota aktif dengan rekam jejak penugasan pariwisata bertaraf nasional</span>
                  </li>
                </ul>
              </div>

              {/* Cara Menghubungi (via Sekretariat) */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 space-y-2">
                <h3 className="text-sm font-bold text-[#1A3C5E] flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#1A3C5E]" /> Pemesanan / Permohonan Penugasan
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Untuk permohonan penugasan resmi Duta Wisata, silakan hubungi Sekretariat Paguyuban Cak &amp; Ning Surabaya melalui halaman <strong>Kontak</strong> atau email humas.
                </p>
                <button
                  onClick={() => onNavigate('GUEST_CONTACT')}
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A3C5E] hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" /> Hubungi Sekretariat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. HALAMAN KONTAK GUEST (Form di Kiri, Info Sekretariat di Kanan)
// ============================================================================
return (
  <div className="space-y-8 animate-fade-in pb-16 font-sans">
    <div className="border-b border-slate-200 pb-4">
      <h2 className="text-2xl font-black text-[#1A3C5E]">Kontak & Permohonan Penugasan</h2>
      <p className="text-xs text-slate-500 mt-0.5">Sampaikan surat permohonan kerjasama duta wisata atau pertanyaan ke pengurus resmi.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form di Sebelah Kiri (7 Cols) */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-base text-[#1A3C5E]">Formulir Hubungi Kami</h3>
          <p className="text-xs text-slate-500 mt-0.5">Lengkapi formulir di bawah ini. Tim Humas kami akan membalas via email/telepon.</p>
        </div>

        {isSentSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="block font-semibold">Pesan Anda Berhasil Dikirimkan!</strong>
              <span>Tim Humas Paguyuban Cak & Ning Surabaya akan menghubungi Anda maksimal dalam 1x24 jam kerja.</span>
            </div>
          </div>
        )}

        <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nama Lengkap / Instansi *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Bpk. Aditya Pratama (PT Grand City)"
                value={contactForm.nama}
                onChange={(e) => setContactForm({ ...contactForm, nama: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#1A3C5E] text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Alamat Email Aktif *</label>
              <input
                type="email"
                required
                placeholder="Contoh: kontak@instansi.com"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#1A3C5E] text-xs bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Subjek Pesan / Acara *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Permohonan 2 Pasang Duta untuk Pembukaan Pameran Budaya"
              value={contactForm.subjek}
              onChange={(e) => setContactForm({ ...contactForm, subjek: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#1A3C5E] text-xs bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Pesan / Rincian Penugasan *</label>
            <textarea
              rows={5}
              required
              placeholder="Tuliskan tanggal pelaksanaan, tempat acara di Surabaya, dresscode yang dibutuhkan, serta narahubung yang dapat dihubungi..."
              value={contactForm.pesan}
              onChange={(e) => setContactForm({ ...contactForm, pesan: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#1A3C5E] text-xs bg-white leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Kirimkan Pesan ke Humas
          </button>
        </form>
      </div>

      {/* Info Sekretariat di Sebelah Kanan (5 Cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-5">
          <h3 className="font-bold text-base text-[#1A3C5E] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-500" /> Informasi Sekretariat
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-800 font-semibold text-xs">Alamat Sekretariat Resmi</strong>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  Gedung Pemuda Lt. 2, Kompleks Balai Pemuda (Alun-Alun Surabaya), Jl. Pemuda No. 15, Embong Kaliasin, Genteng, Kota Surabaya, Jawa Timur 60271
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-800 font-semibold text-xs">Telepon & WhatsApp Hotline</strong>
                <p className="text-slate-600 font-mono mt-0.5">(031) 5345678 (Kantor Balai Pemuda)</p>
                <p className="text-slate-600 font-mono">0812-3456-7890 (Humas Paguyuban)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-slate-800 font-semibold text-xs">Email Resmi</strong>
                <p className="text-slate-600 font-mono mt-0.5">sekretariat@cakning.org</p>
                <p className="text-slate-600 font-mono">humas.cakningsby@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
