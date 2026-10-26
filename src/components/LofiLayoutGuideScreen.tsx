import React, { useState } from 'react';
import { 
  Layout, 
  Sidebar, 
  Maximize2, 
  X, 
  FileText, 
  Grid, 
  Sliders, 
  Square, 
  CheckSquare, 
  Info, 
  ArrowLeft,
  ChevronRight,
  Eye,
  Layers,
  Search,
  Bell,
  User,
  Plus
} from 'lucide-react';

interface LofiLayoutGuideScreenProps {
  onBackToApp: () => void;
  onNavigateToScreen?: (screenId: string) => void;
}

export default function LofiLayoutGuideScreen({ onBackToApp, onNavigateToScreen }: LofiLayoutGuideScreenProps) {
  const [activeTab, setActiveTab] = useState<'ALL' | 'PUBLIC' | 'DASHBOARD' | 'FORM_MODAL' | 'TABLE_DRAWER'>('ALL');
  const [showMockModal, setShowMockModal] = useState<boolean>(false);
  const [showMockDrawer, setShowMockDrawer] = useState<boolean>(false);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);

  // Wireframe Placeholder Box with Diagonal Blueprint Cross
  const WireframeBox = ({ 
    label, 
    sublabel, 
    height = 'h-32', 
    className = '' 
  }: { 
    label: string; 
    sublabel?: string; 
    height?: string; 
    className?: string; 
  }) => (
    <div className={`relative border-2 border-black bg-white flex flex-col items-center justify-center p-3 text-center overflow-hidden ${height} ${className}`}>
      {/* SVG Blueprint Cross */}
      <svg class="absolute inset-0 w-full h-full pointer-events-none text-slate-300 opacity-60" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      <div className="relative z-10 bg-white border border-black px-2.5 py-1 text-center shadow-xs">
        <span className="font-mono text-xs font-bold text-black uppercase tracking-tight block">
          {label}
        </span>
        {sublabel && (
          <span className="font-mono text-[10px] text-slate-600 block mt-0.5">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black font-sans p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* PAGE HEADER */}
      <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-black px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider bg-white">
              LO-FI STRUCTURAL BLUEPRINT
            </span>
            <span className="font-mono text-xs text-slate-500">
              Iterasi Visual Positioning
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-black uppercase">
            Panduan Tata Letak & Posisi Komponen (Lo-Fi)
          </h1>
          <p className="text-sm text-slate-700 mt-1 max-w-3xl leading-relaxed">
            Halaman ini menampilkan gambaran struktur spasial (*layout positioning*) dari seluruh area komponen utama aplikasi: Tampilan Publik (Navbar, Body, Footer), Tampilan Dashboard (Drawer Sidebar, Content), serta Halaman Form & Modal. Desain disajikan dalam mode garis luar murni (*low-fidelity monochrome*) tanpa isian warna penuh.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`font-mono text-xs font-bold px-3 py-2 border-2 border-black cursor-pointer transition-all flex items-center gap-1.5 ${
              showAnnotations ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'
            }`}
          >
            <Info className="w-4 h-4" />
            {showAnnotations ? 'Sembunyikan Catatan Posisi' : 'Tampilkan Catatan Posisi'}
          </button>

          <button
            onClick={onBackToApp}
            className="font-mono text-xs font-bold px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black transition-all cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Aplikasi Utama
          </button>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2 border-b border-black pb-3">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`font-mono text-xs font-bold px-3 py-2 border-2 border-black cursor-pointer transition-all ${
            activeTab === 'ALL' ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'
          }`}
        >
          Semua Blueprint Layout
        </button>
        <button
          onClick={() => setActiveTab('PUBLIC')}
          className={`font-mono text-xs font-bold px-3 py-2 border-2 border-black cursor-pointer transition-all ${
            activeTab === 'PUBLIC' ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'
          }`}
        >
          1. Tampilan Umum (Publik)
        </button>
        <button
          onClick={() => setActiveTab('DASHBOARD')}
          className={`font-mono text-xs font-bold px-3 py-2 border-2 border-black cursor-pointer transition-all ${
            activeTab === 'DASHBOARD' ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'
          }`}
        >
          2. Dashboard (Drawer Sidebar)
        </button>
        <button
          onClick={() => setActiveTab('FORM_MODAL')}
          className={`font-mono text-xs font-bold px-3 py-2 border-2 border-black cursor-pointer transition-all ${
            activeTab === 'FORM_MODAL' ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'
          }`}
        >
          3. Form & Modal Window
        </button>
        <button
          onClick={() => setActiveTab('TABLE_DRAWER')}
          className={`font-mono text-xs font-bold px-3 py-2 border-2 border-black cursor-pointer transition-all ${
            activeTab === 'TABLE_DRAWER' ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'
          }`}
        >
          4. Data List & Slide-over Drawer
        </button>
      </div>

      {/* SECTION 1: TAMPILAN UMUM (PUBLIC PAGE LAYOUT) */}
      {(activeTab === 'ALL' || activeTab === 'PUBLIC') && (
        <section className="space-y-4 border-2 border-black p-4 sm:p-6 bg-white">
          <div className="flex justify-between items-start border-b border-black pb-3">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                STRUKTUR 01
              </span>
              <h2 className="text-xl font-bold font-mono text-black uppercase">
                1. Tampilan Umum Publik (Navbar, Body Content / Hero & Footer)
              </h2>
            </div>
            {showAnnotations && (
              <span className="font-mono text-[11px] border border-black px-2 py-1 bg-white text-black">
                Posisi: Vertical Flow (Header → Main Body → Footer)
              </span>
            )}
          </div>

          <p className="text-xs text-slate-700 font-mono">
            Struktur umum portal publik tanpa isian konten berat. Menampilkan hierarki posisi Navbar Atas (Sticky), Area Hero/Section Kosong, serta Footer Bawah.
          </p>

          {/* WIREFRAME DISPLAY CONTAINER */}
          <div className="border-2 border-black bg-white p-3 sm:p-4 space-y-4 font-mono text-xs">
            {/* A. NAVBAR WIREFRAME */}
            <div className="border-2 border-black p-3 bg-white flex justify-between items-center relative">
              <div className="flex items-center gap-3">
                <div className="border border-black px-2 py-1 font-bold">
                  [ BRAND LOGO ]
                </div>
                <div className="hidden sm:flex gap-2 text-[11px]">
                  <span className="border border-black border-dashed px-2 py-0.5">[ NAV LINK 1 ]</span>
                  <span className="border border-black border-dashed px-2 py-0.5">[ NAV LINK 2 ]</span>
                  <span className="border border-black border-dashed px-2 py-0.5">[ NAV LINK 3 ]</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="border border-black px-2 py-1 text-[11px] font-bold">[ LOGIN / ACTION BUTTON ]</span>
              </div>
              {showAnnotations && (
                <span className="absolute -top-3 left-4 bg-black text-white text-[9px] px-1.5 font-mono">
                  COMP 1.1: NAVBAR (Height: ~60px, Sticky Top z-40)
                </span>
              )}
            </div>

            {/* B. BODY CONTENT (HERO & SECTION BLOCKS) */}
            <div className="space-y-4 relative border border-dashed border-black p-3">
              {showAnnotations && (
                <span className="absolute -top-3 left-4 bg-black text-white text-[9px] px-1.5 font-mono">
                  COMP 1.2: MAIN BODY CONTAINER (Flex-1)
                </span>
              )}

              {/* HERO SECTION PLACEHOLDER */}
              <div className="border-2 border-black p-6 bg-white space-y-4 text-center">
                <div className="border border-black max-w-xl mx-auto py-2 font-bold text-sm">
                  [ HERO HEADLINE TEXT PLACEHOLDER ]
                </div>
                <div className="border border-dashed border-slate-400 max-w-md mx-auto py-1 text-[11px] text-slate-600">
                  [ HERO SUBTITLE DESCRIPTIVE TEXT ]
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <div className="border-2 border-black px-3 py-1 font-bold text-[11px]">[ PRIMARY CTA BUTTON ]</div>
                  <div className="border border-black px-3 py-1 text-[11px]">[ SECONDARY BUTTON ]</div>
                </div>
                <WireframeBox label="[ HERO BANNER / CAROUSEL MEDIA BOX ]" sublabel="Rasio 16:9 / Dynamic Banner Holder" height="h-36" />
              </div>

              {/* SECTIONS GRID (EMPTY CONTENT) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <WireframeBox label="[ SECTION CARD 1 ]" sublabel="Empty Content Slot" height="h-28" />
                <WireframeBox label="[ SECTION CARD 2 ]" sublabel="Empty Content Slot" height="h-28" />
                <WireframeBox label="[ SECTION CARD 3 ]" sublabel="Empty Content Slot" height="h-28" />
              </div>
            </div>

            {/* C. FOOTER WIREFRAME */}
            <div className="border-2 border-black p-4 bg-white flex flex-col sm:flex-row justify-between items-center gap-3 relative">
              <div className="border border-black px-2 py-1 text-[11px]">
                [ FOOTER BRAND & COPYRIGHT INFO ]
              </div>
              <div className="flex gap-2 text-[10px]">
                <span className="border border-dashed border-black px-2 py-0.5">[ LINK FOOTER 1 ]</span>
                <span className="border border-dashed border-black px-2 py-0.5">[ LINK FOOTER 2 ]</span>
                <span className="border border-dashed border-black px-2 py-0.5">[ SOCIAL MEDIA ]</span>
              </div>
              {showAnnotations && (
                <span className="absolute -top-3 left-4 bg-black text-white text-[9px] px-1.5 font-mono">
                  COMP 1.3: FOOTER (Bottom Fixed/Flow)
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: DASHBOARD (DRAWER SIDEBAR & CONTENT) */}
      {(activeTab === 'ALL' || activeTab === 'DASHBOARD') && (
        <section className="space-y-4 border-2 border-black p-4 sm:p-6 bg-white">
          <div className="flex justify-between items-start border-b border-black pb-3">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                STRUKTUR 02
              </span>
              <h2 className="text-xl font-bold font-mono text-black uppercase">
                2. Tampilan Dashboard (Header Atas, Drawer Sidebar Navigasi, & Empty Grid Content)
              </h2>
            </div>
            {showAnnotations && (
              <span className="font-mono text-[11px] border border-black px-2 py-1 bg-white text-black">
                Posisi: Header Top + Sidebar Left + Flexible Main Area
              </span>
            )}
          </div>

          <p className="text-xs text-slate-700 font-mono">
            Layout aplikasi internal pengurus (SDM, Humas, Bendahara, Talent) yang terdiri dari Header Bar Atas, Drawer Sidebar Kiri (bisa diciutkan/diperluas), dan Area Kerja Utama.
          </p>

          {/* DASHBOARD WIREFRAME CONTAINER */}
          <div className="border-2 border-black bg-white font-mono text-xs space-y-2 p-2 sm:p-3">
            {/* HEADER BAR */}
            <div className="border-2 border-black p-2.5 bg-white flex justify-between items-center relative">
              <div className="flex items-center gap-2">
                <span className="border border-black px-2 py-0.5 font-bold">[ SYSTEM LOGO ]</span>
                <span className="border border-dashed border-slate-400 px-2 py-0.5 text-[10px] text-slate-600 font-mono">
                  [ SIM PENUGASAN DUTA WISATA ]
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="border border-black px-2 py-0.5 text-[10px] font-bold">[ NOTIF (BELL) ]</span>
                <span className="border border-black px-2 py-0.5 text-[10px] font-bold">[ PROFILE CARD ]</span>
              </div>
              {showAnnotations && (
                <span className="absolute -top-2.5 left-4 bg-black text-white text-[8px] px-1 font-mono">
                  COMP 2.1: DASHBOARD HEADER BAR (Fixed Top)
                </span>
              )}
            </div>

            {/* DASHBOARD BODY (SIDEBAR + MAIN CONTENT) */}
            <div className="flex flex-col md:flex-row gap-2 min-h-[380px]">
              {/* SIDEBAR DRAWER */}
              <div className="w-full md:w-64 border-2 border-black p-3 space-y-3 bg-white relative shrink-0">
                <div className="border border-black p-1.5 text-center font-bold text-[11px]">
                  [ DRAWER TOGGLE HEADER ]
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="border-2 border-black p-1.5 text-[11px] font-bold bg-white flex justify-between">
                    <span>[ MENU ITEM 1 ]</span>
                    <span>→</span>
                  </div>
                  <div className="border border-slate-400 p-1.5 text-[11px] flex justify-between">
                    <span>[ MENU ITEM 2 ]</span>
                    <span>→</span>
                  </div>
                  <div className="border border-slate-400 p-1.5 text-[11px] flex justify-between">
                    <span>[ MENU ITEM 3 ]</span>
                    <span>→</span>
                  </div>
                  <div className="border border-slate-400 p-1.5 text-[11px] flex justify-between">
                    <span>[ MENU ITEM 4 ]</span>
                    <span>→</span>
                  </div>
                </div>
                <div className="border-t border-black pt-3 space-y-1">
                  <div className="border border-dashed border-black p-1 text-[10px] text-center">[ USER SETTINGS ]</div>
                  <div className="border border-black p-1 text-[10px] text-center font-bold">[ LOGOUT ACTION ]</div>
                </div>

                {showAnnotations && (
                  <span className="absolute -top-2.5 left-2 bg-black text-white text-[8px] px-1 font-mono">
                    COMP 2.2: DRAWER SIDEBAR (Width: 256px / Collapsible)
                  </span>
                )}
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="flex-1 border-2 border-black p-3 space-y-3 bg-white relative">
                {/* BREADCRUMB & PAGE TITLE */}
                <div className="border border-dashed border-black p-2 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block">[ BREADCRUMBS: DASHBOARD / UTAMA ]</span>
                    <span className="font-bold text-xs uppercase">[ PAGE TITLE PLACEHOLDER ]</span>
                  </div>
                  <div className="border border-black px-2 py-1 text-[10px] font-bold">
                    [ ACTION BUTTON ]
                  </div>
                </div>

                {/* STAT CARDS ROW (EMPTY) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <WireframeBox label="[ METRIC CARD 1 ]" sublabel="Angka / Label Stat" height="h-20" />
                  <WireframeBox label="[ METRIC CARD 2 ]" sublabel="Angka / Label Stat" height="h-20" />
                  <WireframeBox label="[ METRIC CARD 3 ]" sublabel="Angka / Label Stat" height="h-20" />
                </div>

                {/* MAIN DASHBOARD CONTENT GRID (EMPTY) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <WireframeBox label="[ DASHBOARD CONTENT PANEL A ]" sublabel="Tabel / Grafik Kosong" height="h-36" />
                  <WireframeBox label="[ DASHBOARD CONTENT PANEL B ]" sublabel="Form / Aktivitas Kosong" height="h-36" />
                </div>

                {showAnnotations && (
                  <span className="absolute -top-2.5 left-2 bg-black text-white text-[8px] px-1 font-mono">
                    COMP 2.3: MAIN CONTENT WORKSPACE (Flex-1)
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: FORM & MODAL DIALOG COMPONENT */}
      {(activeTab === 'ALL' || activeTab === 'FORM_MODAL') && (
        <section className="space-y-4 border-2 border-black p-4 sm:p-6 bg-white">
          <div className="flex justify-between items-start border-b border-black pb-3">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                STRUKTUR 03
              </span>
              <h2 className="text-xl font-bold font-mono text-black uppercase">
                3. Halaman Component Form & Modal Popup Overlay
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMockModal(!showMockModal)}
                className="font-mono text-xs font-bold px-3 py-1 border-2 border-black bg-white hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                {showMockModal ? 'Tutup Simulasikan Modal' : 'Uji Buka Modal Overlay'}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-700 font-mono">
            Struktur tata letak untuk Formulir Input Data (Input Text, Select, Upload File) serta Modal Dialog yang muncul melayang di atas konten (*Modal Overlay Backdrop*).
          </p>

          {/* FORM WIREFRAME CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-mono text-xs">
            {/* INLINE FORM CONTAINER */}
            <div className="border-2 border-black p-4 space-y-3 bg-white relative">
              <div className="border-b border-black pb-2 flex justify-between items-center">
                <span className="font-bold text-xs uppercase">[ FORM CARD HEADER TITLE ]</span>
                <span className="text-[10px] border border-black px-1.5 py-0.5">[ STATUS BADGE ]</span>
              </div>

              <div className="space-y-2.5 pt-1">
                {/* FIELD 1 */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold block">[ LABEL INPUT 1: Nama Kegiatan / User ]</span>
                  <div className="border border-black p-2 bg-white text-slate-500 text-[11px]">
                    [ INPUT FIELD PLACEHOLDER OUTLINE ]
                  </div>
                </div>

                {/* FIELD 2 GRID */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold block">[ LABEL INPUT 2: Tanggal ]</span>
                    <div className="border border-black p-2 bg-white text-slate-500 text-[11px]">
                      [ DATE PICKER BOX ]
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold block">[ LABEL INPUT 3: Kategori ]</span>
                    <div className="border border-black p-2 bg-white text-slate-500 text-[11px]">
                      [ DROPDOWN SELECT ▼ ]
                    </div>
                  </div>
                </div>

                {/* FIELD 3 TEXTAREA */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold block">[ LABEL INPUT 4: Deskripsi Laporan / LPJ ]</span>
                  <div className="border border-black p-3 bg-white text-slate-500 text-[11px] h-20">
                    [ TEXTAREA FIELD PLACEHOLDER ]
                  </div>
                </div>

                {/* FIELD 4 FILE UPLOAD BOX */}
                <WireframeBox label="[ BUKTI / DOCUMENT FILE UPLOAD DROPZONE ]" sublabel="Klik atau Drag & Drop Berkas" height="h-20" />

                {/* FORM ACTIONS ROW */}
                <div className="flex justify-end gap-2 pt-2 border-t border-black">
                  <button className="border border-black px-3 py-1.5 text-[11px] font-bold">[ BATAL / CANCEL ]</button>
                  <button className="border-2 border-black bg-black text-white px-4 py-1.5 text-[11px] font-bold">[ SIMPAN / SUBMIT ]</button>
                </div>
              </div>

              {showAnnotations && (
                <span className="absolute -top-2.5 left-3 bg-black text-white text-[8px] px-1 font-mono">
                  COMP 3.1: STANDARD FORM CONTAINER
                </span>
              )}
            </div>

            {/* MODAL WINDOW WIREFRAME PREVIEW */}
            <div className="border-2 border-black p-4 bg-white relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="border border-dashed border-black p-2 bg-slate-50">
                  <span className="font-bold text-xs uppercase block">[ WIREFRAME SIMULASI MODAL POPUP ]</span>
                  <span className="text-[10px] text-slate-600 block mt-0.5">
                    Modal menggantung di tengah layar dengan latar belakang kawat berpola. Klik tombol di kanan atas untuk menguji pop-up nyata.
                  </span>
                </div>

                {/* MINIATURE MODAL WIREFRAME DRAWING */}
                <div className="border-2 border-black bg-white p-3 space-y-2 relative shadow-md">
                  <div className="border-b border-black pb-1.5 flex justify-between items-center">
                    <span className="font-bold text-[11px] uppercase">[ MODAL DIALOG HEADER ]</span>
                    <span className="border border-black px-1 text-[9px] font-bold cursor-pointer">✕</span>
                  </div>
                  <div className="py-3 border border-dashed border-slate-400 p-2 text-center text-[10px] text-slate-600 space-y-1">
                    <p className="font-bold text-black">[ MODAL BODY CONTENT / FORM CONFIRMATION ]</p>
                    <p>Tempat memunculkan dialog konfirmasi hapus data, modal plotting talent, atau input pembayaran honor.</p>
                  </div>
                  <div className="flex justify-end gap-1.5 pt-1 border-t border-black">
                    <span className="border border-black px-2 py-0.5 text-[9px]">[ TUTUP ]</span>
                    <span className="border border-black bg-black text-white px-2 py-0.5 text-[9px] font-bold">[ KONFIRMASI ]</span>
                  </div>
                </div>
              </div>

              {showAnnotations && (
                <span className="absolute -top-2.5 left-3 bg-black text-white text-[8px] px-1 font-mono">
                  COMP 3.2: MODAL DIALOG OVERLAY (Fixed Center, z-50)
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: DATA LIST & SLIDE-OVER DRAWER */}
      {(activeTab === 'ALL' || activeTab === 'TABLE_DRAWER') && (
        <section className="space-y-4 border-2 border-black p-4 sm:p-6 bg-white">
          <div className="flex justify-between items-start border-b border-black pb-3">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                STRUKTUR 04
              </span>
              <h2 className="text-xl font-bold font-mono text-black uppercase">
                4. Halaman Data List/Table & Slide-over Panel Notification
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMockDrawer(!showMockDrawer)}
                className="font-mono text-xs font-bold px-3 py-1 border-2 border-black bg-white hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                {showMockDrawer ? 'Tutup Slide Panel' : 'Uji Buka Slide-over Drawer'}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-700 font-mono">
            Struktur tata letak untuk Tabel Data (List Penugasan, User, Transaksi Keuangan) serta Panel Slide-over Kanan (Drawer Detail / Notifikasi).
          </p>

          <div className="border-2 border-black p-3 sm:p-4 bg-white font-mono text-xs space-y-3 relative">
            {/* ACTION & FILTER TOOLBAR */}
            <div className="border border-black p-2 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex gap-2 w-full sm:w-auto">
                <span className="border border-black px-2 py-1 text-[11px] w-full sm:w-48">[ SEARCH INPUT BOX 🔍 ]</span>
                <span className="border border-slate-400 px-2 py-1 text-[11px]">[ FILTER STATUS ▼ ]</span>
              </div>
              <div className="border-2 border-black px-3 py-1 text-[11px] font-bold bg-white cursor-pointer">
                [ + TAMBAH DATA BARU ]
              </div>
            </div>

            {/* DATA TABLE WIREFRAME */}
            <div className="border-2 border-black overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-black bg-white">
                    <th className="p-2 border-r border-black font-bold">[ NO ]</th>
                    <th className="p-2 border-r border-black font-bold">[ NAMA EVENT / ENTITAS ]</th>
                    <th className="p-2 border-r border-black font-bold">[ TANGGAL & LOKASI ]</th>
                    <th className="p-2 border-r border-black font-bold">[ STATUS BADGE ]</th>
                    <th className="p-2 font-bold text-right">[ AKSI ]</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-black">
                  <tr className="border-b border-slate-300">
                    <td className="p-2 border-r border-black">01</td>
                    <td className="p-2 border-r border-black font-bold">[ DATA ROW 1 ]</td>
                    <td className="p-2 border-r border-black text-slate-600">[ 2026-07-25 | Balai Pemuda ]</td>
                    <td className="p-2 border-r border-black"><span className="border border-black px-1.5 py-0.5 text-[10px]">[ DILAKSANAKAN ]</span></td>
                    <td className="p-2 text-right"><span className="border border-black px-2 py-0.5 text-[10px]">[ EDIT / DETAIL ]</span></td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="p-2 border-r border-black">02</td>
                    <td className="p-2 border-r border-black font-bold">[ DATA ROW 2 ]</td>
                    <td className="p-2 border-r border-black text-slate-600">[ 2026-08-10 | Balai Kota ]</td>
                    <td className="p-2 border-r border-black"><span className="border border-slate-400 px-1.5 py-0.5 text-[10px]">[ PROSES ]</span></td>
                    <td className="p-2 text-right"><span className="border border-black px-2 py-0.5 text-[10px]">[ EDIT / DETAIL ]</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {showAnnotations && (
              <span className="absolute -top-2.5 left-3 bg-black text-white text-[8px] px-1 font-mono">
                COMP 4.1: DATA TABLE GRID & ACTION TOOLBAR
              </span>
            )}
          </div>
        </section>
      )}

      {/* MOCK OVERLAY INTERACTIVE MODAL (IF TRIGGERED) */}
      {showMockModal && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black max-w-lg w-full p-6 space-y-4 shadow-2xl font-mono text-xs relative">
            <div className="flex justify-between items-center border-b-2 border-black pb-3">
              <h3 className="font-bold text-sm uppercase">[ MOCK LO-FI MODAL DIALOG ]</h3>
              <button 
                onClick={() => setShowMockModal(false)}
                className="border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white cursor-pointer"
              >
                ✕ TUTUP
              </button>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Ini adalah contoh tampilan dialog modal kawat murni (*Lo-Fi Popup*) saat dimunculkan. Memiliki bingkai hitam tegas, batas putih bersih, dan tombol aksi yang jelas tanpa background berwarna penuh.
            </p>
            <div className="border-2 border-black p-3 space-y-2">
              <span className="font-bold block">[ INPUT DUMMY FIELD ]</span>
              <div className="border border-black p-2 text-slate-500">[ MASUKKAN DATA DI SINI ]</div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-black">
              <button 
                onClick={() => setShowMockModal(false)}
                className="border-2 border-black px-4 py-2 font-bold cursor-pointer hover:bg-slate-100"
              >
                BATAL
              </button>
              <button 
                onClick={() => {
                  alert('Aksi simulasi modal berhasil ditrigger!');
                  setShowMockModal(false);
                }}
                className="border-2 border-black bg-black text-white px-5 py-2 font-bold cursor-pointer"
              >
                SIMPAN DATA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOCK OVERLAY SLIDE-OVER DRAWER (IF TRIGGERED) */}
      {showMockDrawer && (
        <div className="fixed inset-0 z-50 bg-white/60 flex justify-end">
          <div className="bg-white border-l-4 border-black max-w-md w-full h-full p-6 space-y-4 shadow-2xl font-mono text-xs overflow-y-auto">
            <div className="flex justify-between items-center border-b-2 border-black pb-3">
              <h3 className="font-bold text-sm uppercase">[ SLIDE-OVER DETAIL DRAWER ]</h3>
              <button 
                onClick={() => setShowMockDrawer(false)}
                className="border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white cursor-pointer"
              >
                ✕ TUTUP
              </button>
            </div>
            <p className="text-slate-700">
              Panel geser kanan (*Slide-over Panel*) untuk menampilkan detail cepat notifikasi, riwayat penugasan, atau pratinjau profil tanpa meninggalkan halaman utama.
            </p>
            <WireframeBox label="[ SLIDE-OVER CONTENT HOLDER ]" sublabel="Panel Informasi Rinci" height="h-48" />
            <div className="border border-black p-3 space-y-2">
              <span className="font-bold block">[ CATATAN SISTEM ]</span>
              <p className="text-slate-600">Menggunakan posisi fixed right-0 top-0 bottom-0 z-50.</p>
            </div>
            <button 
              onClick={() => setShowMockDrawer(false)}
              className="w-full border-2 border-black bg-black text-white py-2 font-bold uppercase cursor-pointer"
            >
              TUTUP PANEL SLIDE-OVER
            </button>
          </div>
        </div>
      )}

      {/* FOOTER ACTION SUMMARY */}
      <div className="border-t-2 border-black pt-4 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-600 gap-2">
        <span>
          © 2026 Paguyuban Cak & Ning Surabaya - Dokumentasi Visual Structural Lo-Fi Blueprint
        </span>
        <button
          onClick={onBackToApp}
          className="font-bold underline text-black cursor-pointer"
        >
          Kembali ke Simulasi Aplikasi Utama →
        </button>
      </div>
    </div>
  );
}
