import React, { useState } from 'react';
import { Layers, ChevronUp, ChevronDown, CheckCircle, Info, RefreshCw } from 'lucide-react';
import { Role } from '../types';

interface PrototypeControllerProps {
  currentScreen: string;
  onScreenChange: (screenId: string) => void;
  currentUserRole: Role;
  onResetData: () => void;
  onQuickLogin: (role: Role) => void;
}

interface ScreenGroup {
  category: string;
  screens: { id: string; name: string; number: number }[];
}

export const SCREEN_LIST: ScreenGroup[] = [
  {
    category: '1. ALL-ROLE, BLUEPRINT & LOGIN',
    screens: [
      { id: 'LOFI_LAYOUT_GUIDE', name: '📐 Lo-Fi Layout & Component Blueprint', number: 0 },
      { id: 'LOGIN', name: 'Halaman Login', number: 1 },
      { id: 'ALL_PROFILE', name: 'Halaman Profil Saya', number: 2 },
      { id: 'ALL_NOTIFICATIONS', name: 'Halaman Notifikasi', number: 3 },
    ]
  },
  {
    category: '2. PUBLIC (GUEST) FLOW',
    screens: [
      { id: 'GUEST_HOME', name: 'Public - Beranda & Profil', number: 4 },
      { id: 'GUEST_TALENTS', name: 'Public - Daftar Talent', number: 5 },
      { id: 'GUEST_KEGIATAN', name: 'Public - Daftar Kegiatan', number: 6 },
      { id: 'GUEST_BLOG', name: 'Public - Blog Wisata', number: 7 },
      { id: 'GUEST_GALLERY', name: 'Public - Galeri Wisata', number: 8 },
      { id: 'GUEST_CONTACT', name: 'Public - Hubungi Kami', number: 9 },
    ]
  },
  {
    category: '3. SDM (DIKLAT) FLOW',
    screens: [
      { id: 'SDM_USER_MANAGEMENT', name: 'SDM - Manajemen User', number: 10 },
      { id: 'SDM_TALENT_LIST', name: 'SDM - Daftar Talent', number: 11 },
      { id: 'SDM_PENUGASAN_MGMT', name: 'SDM - Daftar Penugasan', number: 12 },
      { id: 'SDM_VALIDATION_MGMT', name: 'SDM - Validasi Laporan', number: 13 },
    ]
  },
  {
    category: '4. HUMAS FLOW',
    screens: [
      { id: 'HUMAS_CLIENTS', name: 'Humas - Kelola Client Mitra', number: 14 },
      { id: 'HUMAS_SPONSORS', name: 'Humas - Kelola Sponsor', number: 15 },
      { id: 'HUMAS_PENGAJUAN', name: 'Humas - Pengajuan Penugasan', number: 16 },
      { id: 'HUMAS_TALENT_INFO', name: 'Humas - Lihat Talent', number: 17 },
    ]
  },
  {
    category: '5. TALENT FLOW',
    screens: [
      { id: 'TALENT_ASSIGNMENTS', name: 'Talent - Penugasan Saya', number: 18 },
      { id: 'TALENT_DETAIL', name: 'Talent - Detail Penugasan', number: 19 },
      { id: 'TALENT_REPORT_FORM', name: 'Talent - Form Laporan', number: 20 },
      { id: 'TALENT_HISTORY', name: 'Talent - Riwayat & Honor', number: 21 },
      { id: 'TALENT_RATING_PROFILE', name: 'Talent - Rating & Profil', number: 22 },
    ]
  },
  {
    category: '6. BENDAHARA & KETUA UMUM FLOW',
    screens: [
      { id: 'BENDAHARA_PAYMENT_LIST', name: 'Bendahara - Daftar Pembayaran Honor', number: 23 },
      { id: 'KETUM_MONITORING', name: 'Ketum - Pengawasan Agenda Kota', number: 24 },
    ]
  }
];

export default function PrototypeController({
  currentScreen,
  onScreenChange,
  currentUserRole,
  onResetData,
  onQuickLogin
}: PrototypeControllerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isNavigatorVisible, setIsNavigatorVisible] = useState(() => {
    const saved = localStorage.getItem('figma_navigator_visible');
    return saved !== 'false'; // default is true
  });

  // Helper to find screen number
  const getCurrentScreenNumber = () => {
    for (const group of SCREEN_LIST) {
      const found = group.screens.find(s => s.id === currentScreen);
      if (found) return found.number;
    }
    return 0;
  };

  const getScreenName = (id: string) => {
    for (const group of SCREEN_LIST) {
      const found = group.screens.find(s => s.id === id);
      if (found) return `${found.number}. ${found.name}`;
    }
    return id;
  };

  if (!isNavigatorVisible) {
    return (
      <button
        onClick={() => {
          setIsNavigatorVisible(true);
          localStorage.setItem('figma_navigator_visible', 'true');
        }}
        className="fixed bottom-4 right-4 z-50 bg-[#1A3C5E] hover:bg-[#2c5b8a] text-white border-2 border-white shadow-lg font-sans text-xs px-3.5 py-2 font-bold flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
        title="Klik untuk membuka Figma-style Navigator"
      >
        <Layers className="w-4 h-4 text-emerald-400" />
        <span>🧭 Navigator: OFF (Klik untuk ON)</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-80 bg-white border-2 border-[#1A3C5E] text-slate-800 font-sans shadow-lg rounded-none overflow-hidden select-none">
      {/* Header */}
      <div 
        className="bg-[#1A3C5E] text-white p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5" />
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase">Figma-style Navigator</h4>
            <p className="text-[10px] text-slate-200">Prototype Iterasi 1 (Operasional - Tanpa Dashboard)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-white text-[#1A3C5E] text-[10px] font-extrabold px-1.5 py-0.5">
            Layar #{getCurrentScreenNumber()}
          </span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </div>

      {/* Body */}
      {isOpen && (
        <div className="max-h-[420px] overflow-y-auto p-3 bg-slate-50 border-t border-[#E0E0E0]">
          {/* Quick Info & Controls */}
          <div className="mb-3 bg-white p-2 border border-[#E0E0E0]">
            <div className="text-[11px] mb-1.5 flex justify-between items-center">
              <span>Aktor Aktif: <strong className="text-[#1A3C5E]">{currentUserRole}</strong></span>
              <button 
                onClick={onResetData}
                title="Reset prototype ke kondisi awal"
                className="text-[10px] bg-[#E0E0E0] hover:bg-slate-300 px-1.5 py-0.5 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>
            
            {/* Quick Login Buttons */}
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="text-[9px] text-slate-500 w-full mb-0.5">Simulasi Login Aktor:</span>
              <button 
                onClick={() => onQuickLogin('Guest')}
                className={`text-[10px] px-1.5 py-0.5 border cursor-pointer ${currentUserRole === 'Guest' ? 'bg-emerald-600 text-white border-emerald-600 font-bold' : 'bg-white border-[#E0E0E0]'}`}
              >
                Publik (Guest)
              </button>
              <button 
                onClick={() => onQuickLogin('SDM')}
                className={`text-[10px] px-1.5 py-0.5 border cursor-pointer ${currentUserRole === 'SDM' ? 'bg-[#1A3C5E] text-white border-[#1A3C5E] font-bold' : 'bg-white border-[#E0E0E0]'}`}
              >
                SDM
              </button>
              <button 
                onClick={() => onQuickLogin('Humas')}
                className={`text-[10px] px-1.5 py-0.5 border cursor-pointer ${currentUserRole === 'Humas' ? 'bg-[#1A3C5E] text-white border-[#1A3C5E] font-bold' : 'bg-white border-[#E0E0E0]'}`}
              >
                Humas
              </button>
              <button 
                onClick={() => onQuickLogin('Talent')}
                className={`text-[10px] px-1.5 py-0.5 border cursor-pointer ${currentUserRole === 'Talent' ? 'bg-[#2E7D32] text-white border-[#2E7D32] font-bold' : 'bg-white border-[#E0E0E0]'}`}
              >
                Talent
              </button>
              <button 
                onClick={() => onQuickLogin('Bendahara')}
                className={`text-[10px] px-1.5 py-0.5 border cursor-pointer ${currentUserRole === 'Bendahara' ? 'bg-amber-600 text-white border-amber-600 font-bold' : 'bg-white border-[#E0E0E0]'}`}
              >
                Bendahara
              </button>
            </div>
          </div>

          {/* Directory of Screens */}
          <div className="space-y-3">
            {SCREEN_LIST.map((group) => (
              <div key={group.category} className="border-b border-[#E0E0E0] pb-2 last:border-b-0 last:pb-0">
                <span className="text-[10px] font-bold text-[#1A3C5E] uppercase block mb-1">
                  {group.category}
                </span>
                <div className="space-y-1">
                  {group.screens.map((screen) => {
                    const isSelected = currentScreen === screen.id;
                    return (
                      <button
                        key={screen.id}
                        onClick={() => onScreenChange(screen.id)}
                        className={`w-full text-left text-xs px-2 py-1 flex items-center justify-between border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#1A3C5E] text-white border-[#1A3C5E] font-medium'
                            : 'bg-white hover:bg-slate-100 border-[#E0E0E0] text-slate-700'
                        }`}
                      >
                        <span className="truncate">#{screen.number} - {screen.name}</span>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 shrink-0 ml-1 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#E0E0E0] text-[9px] text-slate-500 flex items-center gap-1">
            <Info className="w-3 h-3 text-[#1A3C5E]" />
            <span>Setiap aksi penugasan/CRUD memperbarui data mockup langsung.</span>
          </div>

          {/* HIDE NAVIGATION ON/OFF ACTION */}
          <button
            onClick={() => {
              setIsNavigatorVisible(false);
              localStorage.setItem('figma_navigator_visible', 'false');
            }}
            className="w-full mt-3 bg-red-50 hover:bg-red-100 border border-red-300 text-red-700 font-mono text-[10px] py-1.5 px-3 uppercase font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>🛑 Sembunyikan Navigator (Turn OFF)</span>
          </button>
        </div>
      )}
    </div>
  );
}
