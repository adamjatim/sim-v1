import React, { useState } from 'react';
import { User, Kegiatan, BlogArticle, MediaItem, ContactMessage } from '../types';
import { MapPin, Mail, Phone, Clock, ArrowRight, X, Send, Download, ArrowLeft, Calendar, FileText, Globe, Trophy, Briefcase, Award } from 'lucide-react';
import { WireframeImage } from './CommonScreens';

interface GuestLayoutProps {
  currentScreen: string;
  onScreenChange: (screenId: string) => void;
  talents: User[];
  kegiatanList: Kegiatan[];
  blogs: BlogArticle[];
  mediaItems: MediaItem[];
  onSendContact: (msg: ContactMessage) => void;
  selectedGuestTalentId?: string;
  setSelectedGuestTalentId?: (id: string) => void;
  selectedGuestKegiatanId?: string;
  setSelectedGuestKegiatanId?: (id: string) => void;
  selectedGuestBlogId?: string;
  setSelectedGuestBlogId?: (id: string) => void;
}

export default function GuestLayout({
  currentScreen,
  onScreenChange,
  talents,
  kegiatanList,
  blogs,
  mediaItems,
  onSendContact,
  selectedGuestTalentId,
  setSelectedGuestTalentId,
  selectedGuestKegiatanId,
  setSelectedGuestKegiatanId,
  selectedGuestBlogId,
  setSelectedGuestBlogId
}: GuestLayoutProps) {
  // Selected details fallback if parent states aren't active (safeguards)
  const [localTalentId, setLocalTalentId] = useState('u4');
  const [localKegiatanId, setLocalKegiatanId] = useState('k1');
  const [localBlogId, setLocalBlogId] = useState('b1');

  const activeTalentId = selectedGuestTalentId || localTalentId;
  const activeKegiatanId = selectedGuestKegiatanId || localKegiatanId;
  const activeBlogId = selectedGuestBlogId || localBlogId;

  // Selected article / media detail modals
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [downloadedDocName, setDownloadedDocName] = useState<string | null>(null);

  // Contact form state
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [subjek, setSubjek] = useState('');
  const [pesan, setPesan] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !email || !subjek || !pesan) return;
    onSendContact({
      id: 'msg_' + Date.now(),
      nama,
      email,
      subjek,
      pesan,
      tanggal: new Date().toISOString().split('T')[0]
    });
    setIsSent(true);
    setNama('');
    setEmail('');
    setSubjek('');
    setPesan('');
    setTimeout(() => setIsSent(false), 5000);
  };

  // Nav item helper
  const renderNavButton = (screenId: string, label: string) => {
    const isActive = currentScreen === screenId;
    return (
      <button
        onClick={() => onScreenChange(screenId)}
        className={`px-3 py-4 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
          isActive 
            ? 'border-[#1A3C5E] text-[#1A3C5E]' 
            : 'border-transparent text-slate-500 hover:text-slate-800'
        }`}
      >
        {label}
      </button>
    );
  };

  // Static documents list for download
  const DOKUMEN_UNDUH = [
    { id: 'doc1', nama: 'AD/ART Paguyuban Cak & Ning Surabaya', tipe: 'PDF Document', ukuran: '1.4 MB', tanggal: '2025-01-10', deskripsi: 'Anggaran Dasar dan Anggaran Rumah Tangga resmi organisasi Paguyuban Cak & Ning Surabaya.' },
    { id: 'doc2', nama: 'Formulir Pendaftaran Pemilihan Cak & Ning Surabaya 2026', tipe: 'PDF Form Fillable', ukuran: '850 KB', tanggal: '2026-06-15', deskripsi: 'Formulir aplikasi pendaftaran resmi untuk calon duta wisata baru angkatan 2026.' },
    { id: 'doc3', nama: 'Panduan Kurikulum Pembekalan & Materi Diklat Anggota', tipe: 'PDF Document', ukuran: '3.2 MB', tanggal: '2025-05-20', deskripsi: 'Modul kurikulum pembekalan pengetahuan sejarah, bahasa, kepariwisataan, dan etika.' },
    { id: 'doc4', nama: 'Kalender Agenda Pariwisata & Kebudayaan Kota Surabaya 2026', tipe: 'PDF Kalender', ukuran: '2.1 MB', tanggal: '2026-01-05', deskripsi: 'Kalender even tahunan resmi pariwisata Surabaya yang dikurasi oleh Dinas Kebudayaan.' },
    { id: 'doc5', nama: 'Proposal Penawaran Sponsorship & Sponsorship Kit', tipe: 'PDF Presentation', ukuran: '4.5 MB', tanggal: '2026-04-12', deskripsi: 'Dokumen kerja sama penawaran logo sponsorship even besar paguyuban untuk instansi komersial.' },
  ];

  return (
    <div className="font-sans min-h-screen bg-white text-slate-800 flex flex-col">
      {/* 16. NAVBAR HORIZONTAL (GUEST) */}
      <header className="border-b-2 border-[#1A3C5E] sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 py-3">
            <div className="w-10 h-10 bg-[#1A3C5E] text-white flex items-center justify-center font-bold font-mono text-sm border-2 border-slate-300">
              C&N
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-[#1A3C5E] uppercase tracking-tight">Cak & Ning Surabaya</h1>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Paguyuban Duta Wisata</p>
            </div>
          </div>

          {/* Navigation Links (Includes new Downloads Screen) */}
          <nav className="flex gap-1">
            {renderNavButton('GUEST_HOME', 'Beranda / Profil')}
            {renderNavButton('GUEST_TALENTS', 'Daftar Talent')}
            {renderNavButton('GUEST_KEGIATAN', 'Daftar Kegiatan')}
            {renderNavButton('GUEST_BLOG', 'Blog Wisata')}
            {renderNavButton('GUEST_GALLERY', 'Galeri')}
            {renderNavButton('GUEST_CONTACT', 'Kontak')}
          </nav>

          {/* Login & Lo-Fi Blueprint Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onScreenChange('LOFI_LAYOUT_GUIDE')}
              className="border border-[#1A3C5E] text-[#1A3C5E] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider py-2 px-3 cursor-pointer flex items-center gap-1.5"
              title="Lihat Panduan Posisi Komponen Lo-Fi"
            >
              <span>📐 Blueprint Layout</span>
            </button>
            <button
              onClick={() => onScreenChange('LOGIN')}
              className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-2 px-4 cursor-pointer"
            >
              Masuk Sistem (Log In)
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        
        {/* 16. SCREEN: GUEST HOME */}
        {currentScreen === 'GUEST_HOME' && (
          <div className="space-y-10">
            {/* Hero Block with solid colors */}
            <div className="relative">
              <WireframeImage 
                label="Foto Banner Utama: Paguyuban Cak & Ning Surabaya & Pesona Destinasi Wisata Kota" 
                className="h-72 w-full"
                bgColor="bg-[#1A3C5E]"
                textColor="text-white"
              />
              <div className="absolute bottom-4 left-4 bg-white border-2 border-[#1A3C5E] p-4 max-w-xl">
                <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E] tracking-tight">Kenali Cak & Ning Surabaya</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Representasi pemuda pemudi terbaik Kota Surabaya sebagai duta pariwisata, pelestari adat, dan penggerak ekonomi kreatif di gerbang timur Pulau Jawa.
                </p>
              </div>
            </div>

            {/* Visi Misi */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="border-2 border-[#1A3C5E] p-6 space-y-4">
                <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E] tracking-tight border-b-2 border-slate-200 pb-2">Visi Organisasi</h3>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "Menjadi wadah kepemudaan yang progresif dan kontributif dalam melestarikan nilai seni budaya tradisional Surabaya, sekaligus garda terdepan promosi pariwisata berskala internasional."
                </p>
              </div>

              <div className="border-2 border-[#1A3C5E] p-6 space-y-3">
                <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E] tracking-tight border-b-2 border-slate-200 pb-2">Misi Utama</h3>
                <ul className="list-disc pl-4 text-xs text-slate-700 space-y-2">
                  <li>Mengembangkan kapasitas intelektual, kepemimpinan, dan kepribadian luhur setiap anggota.</li>
                  <li>Sinergi aktif bersama Dinas Pariwisata mendiseminasikan agenda wisata unggulan Kota Surabaya.</li>
                  <li>Memprakarsai kegiatan konservasi cagar budaya dan kearifan lokal "Suroboyoan".</li>
                </ul>
              </div>
            </div>

            {/* Struktur Organisasi */}
            <div className="border-2 border-[#1A3C5E] p-6">
              <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E] tracking-tight border-b-2 border-slate-200 pb-2 mb-6 text-center">Struktur Pengurus Paguyuban</h3>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="border border-[#1A3C5E] p-4 bg-slate-50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Ketua Umum</span>
                  <strong className="text-xs text-[#1A3C5E] block">Cak Rezki Akbar (2022)</strong>
                </div>
                <div className="border border-[#1A3C5E] p-4 bg-slate-50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Wakil Ketua</span>
                  <strong className="text-xs text-[#1A3C5E] block">Ning Amira Ghaida (2023)</strong>
                </div>
                <div className="border border-[#1A3C5E] p-4 bg-slate-50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Dinas Pembina</span>
                  <strong className="text-xs text-[#1A3C5E] block">Disbudparpora Kota Surabaya</strong>
                </div>
              </div>
            </div>

            {/* NEW: UNDUH DOKUMEN PUBLIK FEATURE inside GUEST_HOME */}
            <div className="border-2 border-[#1A3C5E] p-6 space-y-4">
              <div>
                <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E] tracking-tight border-b-2 border-slate-200 pb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Unduh Dokumen Publik Paguyuban
                </h3>
                <p className="text-xs text-slate-500 mt-1">Akses berkas, panduan AD/ART, formulir keanggotaan, serta proposal sponsor resmi Paguyuban Duta Wisata Surabaya secara langsung.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {DOKUMEN_UNDUH.map((doc) => (
                  <div key={doc.id} className="border border-slate-200 p-3 bg-slate-50 hover:bg-slate-100 flex justify-between items-center transition-colors">
                    <div className="space-y-0.5 overflow-hidden pr-2">
                      <strong className="text-[#1A3C5E] block truncate" title={doc.nama}>{doc.nama}</strong>
                      <p className="text-[10px] text-slate-500 truncate">{doc.deskripsi}</p>
                      <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 uppercase inline-block mt-0.5">{doc.tipe} &bull; {doc.ukuran}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDownloadedDocName(doc.nama)}
                      className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold px-3 py-1.5 text-[9px] uppercase cursor-pointer whitespace-nowrap shrink-0 border-none"
                    >
                      Unduh PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Sukses Unduh Dokumen */}
            {downloadedDocName && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#1A3C5E]">Unduh Dokumen Berhasil</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Berkas <strong>{downloadedDocName}.pdf</strong> telah disiapkan dan siap disimpan di perangkat Anda.
                    </p>
                  </div>
                  <button
                    onClick={() => setDownloadedDocName(null)}
                    className="w-full py-2 bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 17. SCREEN: GUEST TALENTS */}
        {currentScreen === 'GUEST_TALENTS' && (
          <div className="space-y-6">
            <div className="border-b border-[#E0E0E0] pb-4 flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Daftar Talent Cak & Ning</h2>
                <p className="text-xs text-slate-500 font-sans">Daftar perwakilan duta wisata yang teregistrasi secara aktif.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#1A3C5E] bg-slate-100 px-3 py-1 border border-slate-300">
                Total: {talents.filter(t => t.peran === 'Talent').length} Talent
              </span>
            </div>

            {/* Talent Grid */}
            <div className="grid grid-cols-4 gap-4">
              {talents
                .filter(t => t.peran === 'Talent')
                .map((t) => (
                  <div key={t.id} className="border-2 border-[#1A3C5E] p-4 flex flex-col items-center bg-slate-50 text-center transition-all hover:border-slate-700">
                    <WireframeImage label={`Foto: ${t.nama}`} className="w-32 h-32 mb-3" />
                    <strong className="text-xs text-slate-800 font-bold block">{t.nama}</strong>
                    <span className="font-mono text-[10px] bg-[#1A3C5E] text-white px-2 py-0.5 mt-1.5 uppercase font-bold">
                      {t.angkatan || 'Cak Ning'}
                    </span>
                    <p className="text-[10px] text-slate-500 font-mono mt-1 mb-3">Status: <strong className={t.status === 'Aktif' ? 'text-green-700' : 'text-slate-400'}>{t.status}</strong></p>
                    <button
                      onClick={() => {
                        if (setSelectedGuestTalentId) setSelectedGuestTalentId(t.id);
                        setLocalTalentId(t.id);
                        onScreenChange('GUEST_TALENT_DETAIL');
                      }}
                      className="border border-[#1A3C5E] hover:bg-[#1A3C5E] hover:text-white text-[#1A3C5E] font-bold py-1 px-3 w-full text-[10px] uppercase tracking-wide cursor-pointer transition-colors"
                    >
                      Lihat Profil Lengkap
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* NEW DETAIL TALENT SCREEN */}
        {currentScreen === 'GUEST_TALENT_DETAIL' && (() => {
          const t = talents.find(x => x.id === activeTalentId) || talents.find(x => x.peran === 'Talent') || talents[0];
          return (
            <div className="space-y-6">
              <button
                onClick={() => onScreenChange('GUEST_TALENTS')}
                className="flex items-center gap-1 text-[#1A3C5E] hover:underline font-bold text-xs uppercase"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Talent
              </button>

              <div className="border-2 border-[#1A3C5E] bg-white p-6">
                <div className="grid grid-cols-3 gap-8">
                  {/* Photo and general status */}
                  <div className="flex flex-col items-center border-r border-[#E0E0E0] pr-6 text-center">
                    <WireframeImage label={`Foto Profil: ${t.nama}`} className="w-48 h-48 border-2 border-[#1A3C5E] mb-4" />
                    <h2 className="text-lg font-extrabold text-[#1A3C5E] uppercase">{t.nama}</h2>
                    <span className="font-mono text-xs bg-[#1A3C5E] text-white px-3 py-1 mt-2 uppercase font-bold">
                      {t.angkatan || 'Cak Ning'}
                    </span>
                    <p className="text-xs text-slate-500 font-mono mt-3">
                      Status Keanggotaan: <strong className={t.status === 'Aktif' ? 'text-green-700' : 'text-slate-400'}>{t.status}</strong>
                    </p>
                  </div>

                  {/* Portfolio and Prestasi */}
                  <div className="col-span-2 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-extrabold uppercase text-[#1A3C5E] border-b border-slate-300 pb-1 flex items-center gap-1.5">
                        <Trophy className="w-4 h-4" /> Prestasi & Gelar Kehormatan
                      </h3>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li><strong>Wakil I Cak Surabaya 2023</strong> - Dinas Kebudayaan Kota Surabaya</li>
                        <li><strong>Duta Bahasa Favorit Jawa Timur 2024</strong> - Balai Bahasa Jatim</li>
                        <li><strong>Pemenang Karya Terbaik Esai Kebudayaan Suroboyoan 2025</strong></li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-extrabold uppercase text-[#1A3C5E] border-b border-slate-300 pb-1 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" /> Portofolio & Keahlian Khusus
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Menguasai Bahasa Inggris (Fluent), Bahasa Jepang Dasar, Seni Tari Tradisional Remo Suroboyoan, Master of Ceremony (MC) Protokoler kenegaraan, serta pemanduan sejarah wisata Kota Tua Surabaya (Jembatan Merah - Tunjungan).
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-extrabold uppercase text-[#1A3C5E] border-b border-slate-300 pb-1 flex items-center gap-1.5">
                        <Mail className="w-4 h-4" /> Kontak Person & Booking Delegasi
                      </h3>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2 border bg-slate-50 font-mono">
                          <span className="text-[10px] text-slate-400 block font-bold">EMAIL MITRA</span>
                          <span>{t.email}</span>
                        </div>
                        <div className="p-2 border bg-slate-50 font-mono">
                          <span className="text-[10px] text-slate-400 block font-bold">TELEPON / WA</span>
                          <span>{t.telepon}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 italic pt-1">
                        *Catatan: Segala permohonan penugasan resmi wajib melalui formulir "Kontak" atau divalidasi oleh Bagian Humas Paguyuban.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 18. SCREEN: GUEST KEGIATAN */}
        {currentScreen === 'GUEST_KEGIATAN' && (
          <div className="space-y-6">
            <div className="border-b border-[#E0E0E0] pb-4 flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Agenda Kegiatan & Kalender</h2>
                <p className="text-xs text-slate-500">Lihat rencana festival budaya, pameran pariwisata, dan penugasan publik.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#1A3C5E] bg-slate-100 px-3 py-1 border border-slate-300">
                Total: {kegiatanList.length} Agenda
              </span>
            </div>

            {/* List Activities */}
            <div className="space-y-4">
              {kegiatanList.map((k) => (
                  <div key={k.id} className="border-2 border-[#1A3C5E] p-5 flex gap-4 bg-white hover:bg-slate-50 transition-colors">
                    <WireframeImage label="Thumbnail Event" className="w-24 h-24 shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E]">{k.namaKegiatan}</h3>
                        <span className="bg-slate-100 border border-[#1A3C5E] text-[10px] font-mono px-2 py-0.5 font-bold uppercase">
                          {k.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Tanggal: <strong>{k.tanggal}</strong> | Tempat: <strong>{k.lokasi}</strong>
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-2">{k.deskripsi}</p>
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            if (setSelectedGuestKegiatanId) setSelectedGuestKegiatanId(k.id);
                            setLocalKegiatanId(k.id);
                            onScreenChange('GUEST_KEGIATAN_DETAIL');
                          }}
                          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1 px-3 text-[10px] uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          Lihat Detail Agenda
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* NEW DETAIL KEGIATAN SCREEN */}
        {currentScreen === 'GUEST_KEGIATAN_DETAIL' && (() => {
          const k = kegiatanList.find(x => x.id === activeKegiatanId) || kegiatanList[0];
          return (
            <div className="space-y-6">
              <button
                onClick={() => onScreenChange('GUEST_KEGIATAN')}
                className="flex items-center gap-1 text-[#1A3C5E] hover:underline font-bold text-xs uppercase"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Kegiatan
              </button>

              <div className="border-2 border-[#1A3C5E] bg-white p-6 space-y-6">
                <div className="border-b pb-4 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#1A3C5E] uppercase">{k.namaKegiatan}</h2>
                    <p className="text-xs text-slate-500 font-mono mt-1">Status Plotting Internal: <strong className="uppercase">{k.status}</strong></p>
                  </div>
                  <span className="bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold px-3 py-1 uppercase">
                    Agenda Resmi Paguyuban
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* Left Column info */}
                  <div className="space-y-4 col-span-2">
                    <WireframeImage label={`Poster Dokumentasi Event: ${k.namaKegiatan}`} className="h-56 w-full" />
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-[#1A3C5E] uppercase">Deskripsi Lengkap Agenda</h3>
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{k.deskripsi}</p>
                    </div>

                    <div className="space-y-2 bg-slate-50 p-4 border border-dashed border-slate-300">
                      <h4 className="text-xs font-bold uppercase text-[#1A3C5E]">Rundown Acara (Wireframe Prototyping)</h4>
                      <ul className="text-[11px] text-slate-600 space-y-1 font-mono">
                        <li>07:30 - 08:00 : Kedatangan & Registrasi Talent Duta Wisata</li>
                        <li>08:00 - 09:00 : Gladi Resik di Balai Kota Surabaya</li>
                        <li>09:00 - 11:30 : Penyambutan Delegasi / Tur Keliling Sejarah</li>
                        <li>11:30 - selesai : Serah terima cinderamata & Pers Rilis berita</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column sidebar info */}
                  <div className="border-l border-[#E0E0E0] pl-6 space-y-5">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Hari / Tanggal</span>
                      <span className="text-xs font-mono font-bold text-slate-800 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#1A3C5E]" /> {k.tanggal}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Lokasi Agenda</span>
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#1A3C5E]" /> {k.lokasi}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Pihak Penyelenggara</span>
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-[#1A3C5E]" /> Dinas Kebudayaan & Pariwisata Surabaya
                      </span>
                    </div>

                    <div className="pt-4 border-t border-[#E0E0E0] space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase">Butuh Mengundang Duta Wisata?</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Jika instansi Anda ingin menyelenggarakan event serupa dan membutuhkan pendampingan protokoler dari Cak & Ning, silakan ajukan surat resmi di menu Kontak.
                      </p>
                      <button
                        onClick={() => onScreenChange('GUEST_CONTACT')}
                        className="w-full bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-3 text-[10px] uppercase tracking-wider cursor-pointer text-center"
                      >
                        Ajukan Kerjasama Delegasi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 19. SCREEN: GUEST BLOG */}
        {currentScreen === 'GUEST_BLOG' && (
          <div className="space-y-6">
            <div className="border-b border-[#E0E0E0] pb-4">
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Blog & Artikel Terkini</h2>
              <p className="text-xs text-slate-500 font-sans">Kumpulan berita wisata, siaran pers paguyuban, dan kisah perjalanan sejarah Surabaya.</p>
            </div>

            {/* Blog list */}
            <div className="grid grid-cols-3 gap-6">
              {blogs
                .filter(b => b.status === 'Publish')
                .map((b) => (
                  <div key={b.id} className="border-2 border-[#1A3C5E] flex flex-col bg-slate-50 hover:border-slate-800 transition-all">
                    <WireframeImage label="Header Blog" className="h-40 w-full" />
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white border-t border-[#1A3C5E]">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-slate-400 block">{b.tanggal}</span>
                        <h3 className="font-extrabold text-xs uppercase text-slate-800 leading-tight line-clamp-2 hover:text-[#1A3C5E]">
                          {b.judul}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed pt-1">
                          {b.ringkasan}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          if (setSelectedGuestBlogId) setSelectedGuestBlogId(b.id);
                          setLocalBlogId(b.id);
                          onScreenChange('GUEST_BLOG_DETAIL');
                        }}
                        className="text-[#1A3C5E] hover:text-slate-800 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer pt-2"
                      >
                        Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* NEW DETAIL BLOG SCREEN */}
        {currentScreen === 'GUEST_BLOG_DETAIL' && (() => {
          const b = blogs.find(x => x.id === activeBlogId) || blogs[0];
          return (
            <div className="space-y-6">
              <button
                onClick={() => onScreenChange('GUEST_BLOG')}
                className="flex items-center gap-1 text-[#1A3C5E] hover:underline font-bold text-xs uppercase"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Blog
              </button>

              <div className="border-2 border-[#1A3C5E] bg-white p-6 space-y-5">
                <div className="border-b pb-3 space-y-1">
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 border inline-block">Rilis Pers Kebudayaan | {b.tanggal}</span>
                  <h2 className="text-xl font-extrabold text-[#1A3C5E] uppercase leading-tight">{b.judul}</h2>
                  <p className="text-xs text-slate-500 italic">Ditulis oleh: Humas Wisata Paguyuban Cak & Ning Surabaya</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-5 text-xs text-slate-700 leading-relaxed font-sans">
                  <WireframeImage label="Poster Gambar Jurnal Berita" className="h-56 w-full border border-[#1A3C5E]" />
                  <p className="font-bold text-[#1A3C5E] text-sm bg-blue-50/50 p-3 border-l-4 border-[#1A3C5E]">"{b.ringkasan}"</p>
                  <p className="whitespace-pre-wrap">{b.isi}</p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 20. SCREEN: GUEST GALLERY */}
        {currentScreen === 'GUEST_GALLERY' && (
          <div className="space-y-6">
            <div className="border-b border-[#E0E0E0] pb-4">
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Galeri Dokumentasi</h2>
              <p className="text-xs text-slate-500 font-sans">Potret kehangatan masyarakat dan kiprah Cak Ning di berbagai even promosi daerah.</p>
            </div>

            {/* Grid 4 columns */}
            <div className="grid grid-cols-4 gap-4">
              {mediaItems.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMedia(m)}
                  className="border-2 border-[#1A3C5E] bg-slate-50 overflow-hidden cursor-pointer transition-all hover:scale-102 flex flex-col"
                >
                  <WireframeImage label={`${m.tipe}: ${m.judul.substring(0,18)}...`} className="h-36 w-full" />
                  <div className="p-2 border-t border-[#1A3C5E] bg-white text-xs">
                    <strong className="block text-slate-800 leading-tight truncate">{m.judul}</strong>
                    <span className="font-mono text-[9px] text-slate-400 block mt-0.5">{m.kategori} | {m.tanggal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 21. SCREEN: GUEST CONTACT */}
        {currentScreen === 'GUEST_CONTACT' && (
          <div className="grid grid-cols-3 gap-8 pt-4">
            {/* Contact Form */}
            <div className="col-span-2 border-2 border-[#1A3C5E] p-6 space-y-4">
              <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E] tracking-tight border-b-2 border-slate-200 pb-2">Hubungi Kami / Pengajuan Delegasi</h3>
              <p className="text-xs text-slate-500">Silakan kirim pesan Anda, baik berupa pengajuan kerjasama sponsorship, peminjaman talent duta wisata, atau masukan kritik saran.</p>

              {isSent && (
                <div className="bg-green-50 border border-green-300 text-green-800 p-3 text-xs font-mono">
                  ✓ Pesan Anda berhasil terkirim ke Humas Paguyuban! Kami akan menghubungi Anda secepatnya.
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#1A3C5E] uppercase mb-1">Nama Lengkap Anda</label>
                    <input
                      type="text"
                      placeholder="misal: Bapak Adnan"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white focus:outline-none focus:border-[#1A3C5E]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#1A3C5E] uppercase mb-1">Alamat Email</label>
                    <input
                      type="email"
                      placeholder="misal: adnan@perusahaan.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white focus:outline-none focus:border-[#1A3C5E]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1A3C5E] uppercase mb-1">Subjek / Perihal</label>
                  <input
                    type="text"
                    placeholder="misal: Permohonan Juri Pemilihan Duta"
                    value={subjek}
                    onChange={(e) => setSubjek(e.target.value)}
                    className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white focus:outline-none focus:border-[#1A3C5E]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1A3C5E] uppercase mb-1">Pesan Lengkap</label>
                  <textarea
                    rows={4}
                    placeholder="Tulis pesan detail rincian acara..."
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white focus:outline-none focus:border-[#1A3C5E] font-sans"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-6 text-xs uppercase tracking-wider cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Kirim Pesan
                </button>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="border-2 border-[#1A3C5E] p-6 space-y-6 bg-slate-50">
              <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E] tracking-tight border-b-2 border-slate-200 pb-2">Sekretariat Resmi</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex gap-2.5 items-start">
                  <MapPin className="w-5 h-5 text-[#1A3C5E] shrink-0 pt-0.5" />
                  <p className="text-slate-700 leading-relaxed">
                    <strong>Gedung Balai Pemuda Surabaya</strong><br />
                    Jl. Gubernur Suryo No. 15, Embong Kaliasin, Kec. Genteng, Kota Surabaya, Jawa Timur 60271
                  </p>
                </div>

                <div className="flex gap-2.5 items-center">
                  <Phone className="w-5 h-5 text-[#1A3C5E] shrink-0" />
                  <p className="text-slate-700">031-5345678 (Ext. 202)</p>
                </div>

                <div className="flex gap-2.5 items-center">
                  <Mail className="w-5 h-5 text-[#1A3C5E] shrink-0" />
                  <p className="text-slate-700">info@cakning.org</p>
                </div>

                <div className="flex gap-2.5 items-start">
                  <Clock className="w-5 h-5 text-[#1A3C5E] shrink-0 pt-0.5" />
                  <p className="text-slate-700 leading-tight">
                    Senin - Jumat: 08:00 - 16:00 WIB<br />
                    Sabtu - Minggu: Libur / Agenda Khusus
                  </p>
                </div>
              </div>

              {/* Wireframe Map block */}
              <div className="border border-[#1A3C5E] pt-2">
                <span className="text-[9px] uppercase font-bold text-slate-400 px-2 block">Peta Koordinat Lokasi:</span>
                <WireframeImage label="Satelit Map: Balai Pemuda Surabaya" className="h-28 w-full mt-1.5" />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#1A3C5E] bg-slate-50 py-4 text-center text-[11px] text-slate-500 font-sans font-medium">
        &copy; 2026 Paguyuban Cak & Ning Surabaya. Prototipe Wireframe Desktop (Iterasi Pertama).
      </footer>

      {/* GALERI MODAL DETAIL */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white border-2 border-[#1A3C5E] max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-2">
              <h3 className="font-extrabold text-xs uppercase text-[#1A3C5E] tracking-tight truncate">{selectedMedia.judul}</h3>
              <button onClick={() => setSelectedMedia(null)} className="p-1 hover:bg-slate-100 border cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            
            <WireframeImage label={`${selectedMedia.tipe}: ${selectedMedia.judul}`} className="h-64 w-full" />
            
            <div className="text-xs text-slate-600 space-y-1">
              <p>Kategori Event: <strong>{selectedMedia.kategori}</strong></p>
              <p>Tanggal Dokumentasi: <strong>{selectedMedia.tanggal}</strong></p>
              <p>Tipe Ekstensi Media: <strong>{selectedMedia.tipe}</strong></p>
            </div>

            <div className="pt-2 border-t border-[#E0E0E0] flex justify-end">
              <button onClick={() => setSelectedMedia(null)} className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold text-xs uppercase px-4 py-1.5 cursor-pointer">
                Tutup Galeri
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
