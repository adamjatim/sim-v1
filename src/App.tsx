import React, { useState } from 'react';
import { 
  INITIAL_USERS, 
  INITIAL_CLIENTS, 
  INITIAL_SPONSORS, 
  INITIAL_PENGAJUAN_PENUGASAN,
  INITIAL_KEGIATAN, 
  INITIAL_PENUGASAN, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_CONTACTS 
} from './data';
import { 
  User, 
  Client, 
  Sponsor, 
  PengajuanPenugasan,
  Kegiatan, 
  Penugasan, 
  Notification, 
  ContactMessage, 
  Role 
} from './types';

// Screen Components
import { GuestScreens } from './components/GuestScreens';
import { 
  HumasDashboard, 
  HumasClients, 
  HumasSponsors, 
  HumasPengajuanPenugasan, 
  HumasTalentInfo 
} from './components/HumasScreens';
import { 
  SdmDashboard, 
  SdmUserManagement, 
  SdmTalentList, 
  SdmPenugasanManagement, 
  SdmReportValidation 
} from './components/SdmScreens';
import { 
  TalentDashboard, 
  TalentAssignments, 
  TalentDetail, 
  TalentReportForm, 
  TalentHistory, 
  TalentRatingAndProfile 
} from './components/TalentScreens';
import { BendaharaDashboard, BendaharaPaymentList } from './components/BendaharaScreens';
import { KetuaUmumScreen } from './components/KetuaUmumScreen';
import LofiLayoutGuideScreen from './components/LofiLayoutGuideScreen';
import { LoginScreen, ProfileScreen, NotificationScreen } from './components/CommonScreens';

// Icons
import { 
  Home, 
  Users, 
  Mail, 
  Building2, 
  Handshake, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  History, 
  Star, 
  CreditCard, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  Menu, 
  X, 
  RotateCcw, 
  Bell, 
  Sparkles,
  Layers,
  Compass,
  CheckCircle2,
  Lock,
  LogOut,
  ExternalLink,
  UserCheck,
  User as UserIcon
} from 'lucide-react';

export default function App() {
  // ============================================================================
  // DATABASE STATE HUB
  // ============================================================================
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [sponsors, setSponsors] = useState<Sponsor[]>(INITIAL_SPONSORS);
  const [pengajuanList, setPengajuanList] = useState<PengajuanPenugasan[]>(INITIAL_PENGAJUAN_PENUGASAN);
  const [kegiatanList, setKegiatanList] = useState<Kegiatan[]>(INITIAL_KEGIATAN);
  const [penugasanList, setPenugasanList] = useState<Penugasan[]>(INITIAL_PENUGASAN);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [contacts, setContacts] = useState<ContactMessage[]>(INITIAL_CONTACTS);

  // ============================================================================
  // DUAL NAVIGATION & ACTIVE ACTOR STATE
  // Roles: 'Guest' | 'Humas' | 'SDM' | 'Talent' | 'Bendahara' | 'Ketua Umum'
  // ============================================================================
  const [currentRole, setCurrentRole] = useState<Role>('Guest');
  const [currentScreen, setCurrentScreen] = useState<string>('GUEST_HOME');
  const [selectedPenugasanId, setSelectedPenugasanId] = useState<string>('p1');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Floating Prototype Dropdown state & Profile Dropdown state
  const [isPrototypeDropdownOpen, setIsPrototypeDropdownOpen] = useState<boolean>(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState<boolean>(false);
  const [logoutMessage, setLogoutMessage] = useState<string>('');

  // Active Personas & Notifications
  const currentActiveUser = users.find(u => u.peran === currentRole) || users[0];
  const currentTalent = users.find(u => u.id === 'u4') || users.find(u => u.peran === 'Talent') || users[0];
  const ketumUser = users.find(u => u.peran === 'Ketua Umum') || users[0];

  const unreadNotificationsCount = notifications.filter(
    n => (n.penerimaRole === currentRole || n.penerimaRole === 'SDM') && !n.dibaca
  ).length;

  // Helper to switch role & screen together
  const jumpToScreen = (role: Role, screenId: string) => {
    setCurrentRole(role);
    setCurrentScreen(screenId);
    setIsPrototypeDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const getDefaultScreenForRole = (role: Role): string => {
    switch (role) {
      case 'Humas': return 'HUMAS_CLIENTS';
      case 'SDM': return 'SDM_USER_MANAGEMENT';
      case 'Talent': return 'TALENT_ASSIGNMENTS';
      case 'Bendahara': return 'BENDAHARA_PAYMENT_LIST';
      case 'Ketua Umum': return 'KETUM_MONITORING';
      default: return 'GUEST_HOME';
    }
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    setCurrentRole('Guest');
    setLogoutMessage('Anda telah berhasil keluar dari akun paguyuban.');
    setCurrentScreen('LOGIN');
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentRole(user.peran);
    setLogoutMessage('');
    const targetScreen = getDefaultScreenForRole(user.peran);
    setCurrentScreen(targetScreen);
  };

  // Reset Data Handler
  const handleResetData = () => {
    if (confirm('Kembalikan seluruh data simulasi ke kondisi awal? Semua penambahan instansi, sponsor, dan penugasan baru akan di-reset.')) {
      setUsers(INITIAL_USERS);
      setClients(INITIAL_CLIENTS);
      setSponsors(INITIAL_SPONSORS);
      setPengajuanList(INITIAL_PENGAJUAN_PENUGASAN);
      setKegiatanList(INITIAL_KEGIATAN);
      setPenugasanList(INITIAL_PENUGASAN);
      setNotifications(INITIAL_NOTIFICATIONS);
      setContacts(INITIAL_CONTACTS);
      alert('Data simulasi organisasi berhasil di-reset!');
    }
  };

  // ============================================================================
  // WORKFLOW ACTION HANDLERS
  // ============================================================================
  const handleRespondAssignment = (penId: string, accept: boolean) => {
    setPenugasanList(prev => prev.map(p => {
      if (p.id === penId) {
        return { ...p, status: accept ? 'Dikonfirmasi' : 'Ditolak' };
      }
      return p;
    }));
  };

  const handleSubmitReport = (penId: string, desc: string, fileLabel: string) => {
    setPenugasanList(prev => prev.map(p => {
      if (p.id === penId) {
        return {
          ...p,
          laporanDeskripsi: desc,
          laporanBuktiLink: fileLabel,
          laporanTanggal: new Date().toISOString().split('T')[0],
          laporanStatus: 'Menunggu Validasi',
          status: 'Selesai'
        };
      }
      return p;
    }));
    alert('Laporan penugasan berhasil diunggah dan diteruskan ke Sie SDM & Diklat!');
    setCurrentScreen('TALENT_ASSIGNMENTS');
  };

  const handleValidateReport = (penId: string, statusLaporan: 'Disetujui' | 'Revisi', catatan?: string) => {
    setPenugasanList(prev => prev.map(p => {
      if (p.id === penId) {
        return {
          ...p,
          laporanStatus: statusLaporan,
          catatanSdm: catatan || '',
          status: statusLaporan === 'Disetujui' ? 'Selesai' : 'Dikonfirmasi'
        };
      }
      return p;
    }));
  };

  const handleSavePayment = (penId: string, nominal: number, tanggalTransfer: string, fileLabel: string) => {
    setPenugasanList(prev => prev.map(p => {
      if (p.id === penId) {
        return {
          ...p,
          honor: nominal,
          tanggalBayar: tanggalTransfer,
          buktiBayar: fileLabel,
          statusBayar: 'Lunas'
        };
      }
      return p;
    }));
  };

  // ============================================================================
  // RENDER NAVBAR ATAS (KHUSUS GUEST AREA)
  // ============================================================================
  const renderGuestNavbar = () => {
    return (
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#1A3C5E] shadow-sm font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div 
            onClick={() => setCurrentScreen('GUEST_HOME')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1A3C5E] text-amber-400 flex items-center justify-center font-black text-sm font-mono shadow-sm border border-amber-400/40">
              C&N
            </div>
            <div>
              <h1 className="text-sm font-black text-[#1A3C5E] uppercase tracking-tight leading-none">
                Cak & Ning Surabaya
              </h1>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                Paguyuban Duta Wisata Kota Surabaya
              </p>
            </div>
          </div>

          {/* Links: Beranda | Talent | Kontak */}
          <nav className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setCurrentScreen('GUEST_HOME')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'GUEST_HOME' 
                  ? 'bg-[#1A3C5E] text-white shadow-xs' 
                  : 'text-slate-600 hover:text-[#1A3C5E] hover:bg-slate-100'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setCurrentScreen('GUEST_TALENTS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'GUEST_TALENTS' 
                  ? 'bg-[#1A3C5E] text-white shadow-xs' 
                  : 'text-slate-600 hover:text-[#1A3C5E] hover:bg-slate-100'
              }`}
            >
              Talent
            </button>
            <button
              onClick={() => setCurrentScreen('GUEST_CONTACT')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'GUEST_CONTACT' 
                  ? 'bg-[#1A3C5E] text-white shadow-xs' 
                  : 'text-slate-600 hover:text-[#1A3C5E] hover:bg-slate-100'
              }`}
            >
              Kontak
            </button>
          </nav>

          {/* Quick Internal Entry Shortcut & Login */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setLogoutMessage('');
                setCurrentRole('Guest');
                setCurrentScreen('LOGIN');
              }}
              className={`font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                currentScreen === 'LOGIN'
                  ? 'bg-[#1A3C5E] text-white ring-2 ring-amber-400'
                  : 'bg-white hover:bg-slate-100 text-[#1A3C5E] border border-slate-300'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" /> Masuk ke Sistem
            </button>

            <button
              onClick={() => jumpToScreen('SDM', 'SDM_USER_MANAGEMENT')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hidden sm:flex"
              title="Akses Cepat Pengurus SDM"
            >
              <Sparkles className="w-3.5 h-3.5" /> Portal Internal
            </button>
          </div>
        </div>
      </header>
    );
  };

  // ============================================================================
  // RENDER INTERNAL SIDEBAR (KHUSUS ROLE INTERNAL: HUMAS, SDM, TALENT, BENDAHARA, KETUA UMUM)
  // Sidebar isinya HANYA menu untuk peran tersebut (Dashboard ditiadakan di Iterasi 1)
  // ============================================================================
  const renderInternalSidebar = () => {
    const NavItem = ({ screenId, label, icon: Icon }: { screenId: string; label: string; icon: any }) => {
      const isActive = currentScreen === screenId;
      return (
        <button
          onClick={() => setCurrentScreen(screenId)}
          className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
            isActive 
              ? 'bg-[#1A3C5E] text-white shadow-sm font-bold' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-[#1A3C5E]'
          }`}
          title={label}
        >
          <div className="flex items-center gap-3 truncate">
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="truncate">{label}</span>
          </div>
          {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
        </button>
      );
    };

    return (
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
        } transition-all duration-200 ease-in-out shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between overflow-y-auto z-30`}
      >
        <div className="p-4 space-y-6">
          {/* Header Role Identifier */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
              PERAN AKTIF SAAT INI
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <strong className="text-xs text-[#1A3C5E] font-bold">
                {currentRole === 'SDM' ? 'Sie SDM & Diklat' :
                 currentRole === 'Humas' ? 'Sie Humas & Relasi' :
                 currentRole === 'Talent' ? 'Talent Duta Wisata' :
                 currentRole === 'Bendahara' ? 'Bendahara Keuangan' :
                 'Ketua Umum'}
              </strong>
            </div>
          </div>

          {/* MENUS STRICTLY FOR CURRENT ROLE (ITERASI 1: LANGSUNG KE MODUL OPERASIONAL) */}
          <nav className="space-y-1">
            {/* HUMAS: Client | Sponsor | Pengajuan Penugasan | Lihat Talent */}
            {currentRole === 'Humas' && (
              <>
                <NavItem screenId="HUMAS_CLIENTS" label="Client Mitra" icon={Building2} />
                <NavItem screenId="HUMAS_SPONSORS" label="Sponsor" icon={Handshake} />
                <NavItem screenId="HUMAS_PENGAJUAN" label="Pengajuan Penugasan" icon={Calendar} />
                <NavItem screenId="HUMAS_TALENT_INFO" label="Lihat Talent" icon={Users} />
              </>
            )}

            {/* SDM: Manajemen User | Daftar Talent | Penugasan | Validasi Laporan */}
            {currentRole === 'SDM' && (
              <>
                <NavItem screenId="SDM_USER_MANAGEMENT" label="Manajemen User" icon={UserCheck} />
                <NavItem screenId="SDM_TALENT_LIST" label="Daftar Talent" icon={Users} />
                <NavItem screenId="SDM_PENUGASAN_MGMT" label="Penugasan" icon={Calendar} />
                <NavItem screenId="SDM_VALIDATION_MGMT" label="Validasi Laporan" icon={ShieldCheck} />
              </>
            )}

            {/* TALENT: Penugasan Saya | Riwayat | Rating & Profil */}
            {currentRole === 'Talent' && (
              <>
                <NavItem screenId="TALENT_ASSIGNMENTS" label="Penugasan Saya" icon={Calendar} />
                <NavItem screenId="TALENT_HISTORY" label="Riwayat" icon={History} />
                <NavItem screenId="TALENT_RATING_PROFILE" label="Rating & Profil" icon={Star} />
              </>
            )}

            {/* BENDAHARA: Daftar Pembayaran */}
            {currentRole === 'Bendahara' && (
              <>
                <NavItem screenId="BENDAHARA_PAYMENT_LIST" label="Daftar Pembayaran" icon={CreditCard} />
              </>
            )}

            {/* KETUA UMUM: Pengawasan Agenda & Kegiatan */}
            {currentRole === 'Ketua Umum' && (
              <>
                <NavItem screenId="KETUM_MONITORING" label="Pengawasan Agenda & Kegiatan" icon={Award} />
              </>
            )}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <p className="text-[10px] text-slate-400 font-mono">&copy; 2026 Cak & Ning Surabaya</p>
          <p className="text-[9px] text-[#1A3C5E] font-bold mt-0.5">Paguyuban Duta Wisata</p>
        </div>
      </aside>
    );
  };

  // ============================================================================
  // RENDER INTERNAL TOP BAR (FOR INTERNAL WORKSPACE)
  // ============================================================================
  const renderInternalTopBar = () => {
    return (
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs font-sans">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          {/* Left: Sidebar Toggle & Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              title={isSidebarOpen ? "Tutup Sidebar" : "Buka Sidebar"}
            >
              {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1A3C5E] text-amber-400 flex items-center justify-center font-black text-xs font-mono shadow-xs">
                C&N
              </div>
              <div>
                <h1 className="text-xs font-black text-[#1A3C5E] uppercase tracking-wider">
                  SIM Penugasan Cak & Ning Surabaya
                </h1>
                <p className="text-[10px] text-slate-400 font-mono">
                  Area: <strong className="text-amber-600 font-bold">{currentRole}</strong> &bull; Iterasi 1
                </p>
              </div>
            </div>
          </div>

          {/* Right: Reset Data, Notif, Persona */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetData}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Reset data simulasi"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline text-[11px]">Reset Data</span>
            </button>

            {/* Integrated Profile & Account Dropdown (Notifikasi, Profil & Logout) */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2.5 pl-2.5 py-1.5 pr-2 rounded-xl hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer relative bg-slate-50/60"
                title="Buka Menu Profil & Akun"
              >
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-bold text-[#1A3C5E] block leading-tight truncate max-w-[150px]">
                    {currentActiveUser.nama}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    {currentRole} Paguyuban
                  </span>
                </div>

                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1A3C5E] to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                    {currentActiveUser.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileDropdownOpen(false)} 
                  />

                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 py-2 animate-fadeIn font-sans">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 bg-slate-50/80">
                      <div className="w-10 h-10 rounded-xl bg-[#1A3C5E] text-amber-400 font-black flex items-center justify-center text-sm shadow-xs border border-amber-400/40">
                        {currentActiveUser.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 truncate">{currentActiveUser.nama}</p>
                        <p className="text-[10px] text-slate-400 truncate font-mono">{currentActiveUser.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-100 text-amber-800">
                          {currentRole}
                        </span>
                      </div>
                    </div>

                    {/* Menu Actions */}
                    <div className="p-1.5 space-y-0.5 text-xs">
                      {/* Update Profil */}
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          setCurrentScreen('PROFILE');
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium cursor-pointer transition-colors ${
                          currentScreen === 'PROFILE'
                            ? 'bg-[#1A3C5E] text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <UserIcon className={`w-4 h-4 ${currentScreen === 'PROFILE' ? 'text-amber-400' : 'text-slate-500'}`} />
                        <span>Update Profil Saya</span>
                      </button>

                      {/* Notifikasi */}
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          setCurrentScreen('NOTIFICATIONS');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium cursor-pointer transition-colors ${
                          currentScreen === 'NOTIFICATIONS'
                            ? 'bg-[#1A3C5E] text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Bell className={`w-4 h-4 ${currentScreen === 'NOTIFICATIONS' ? 'text-amber-400' : 'text-slate-500'}`} />
                          <span>Pusat Notifikasi</span>
                        </div>
                        {unreadNotificationsCount > 0 && (
                          <span className="text-[10px] bg-rose-500 text-white font-black px-2 py-0.5 rounded-full">
                            {unreadNotificationsCount} Baru
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Role Quick Switcher Pills */}
                    <div className="px-3 py-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Ganti Peran Aktif:
                      </span>
                      <div className="grid grid-cols-2 gap-1 text-[10px]">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            jumpToScreen('SDM', 'SDM_USER_MANAGEMENT');
                          }}
                          className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors font-medium ${currentRole === 'SDM' ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold' : 'hover:bg-slate-50 border-slate-200'}`}
                        >
                          SDM (User & Diklat)
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            jumpToScreen('Humas', 'HUMAS_CLIENTS');
                          }}
                          className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors font-medium ${currentRole === 'Humas' ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold' : 'hover:bg-slate-50 border-slate-200'}`}
                        >
                          Humas & Client
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            jumpToScreen('Talent', 'TALENT_ASSIGNMENTS');
                          }}
                          className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors font-medium ${currentRole === 'Talent' ? 'bg-purple-50 border-purple-300 text-purple-800 font-bold' : 'hover:bg-slate-50 border-slate-200'}`}
                        >
                          Talent (Tugas Saya)
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            jumpToScreen('Bendahara', 'BENDAHARA_PAYMENT_LIST');
                          }}
                          className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors font-medium ${currentRole === 'Bendahara' ? 'bg-indigo-50 border-indigo-300 text-indigo-800 font-bold' : 'hover:bg-slate-50 border-slate-200'}`}
                        >
                          Bendahara (Honor)
                        </button>
                      </div>
                    </div>

                    {/* Logout Action */}
                    <div className="pt-1.5 p-1.5 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold cursor-pointer transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Keluar (Logout)</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  };

  // ============================================================================
  // RENDER CONTENT SCREEN
  // ============================================================================
  const renderScreenContent = () => {
    // A. GUEST AREA
    if (currentScreen === 'GUEST_HOME') {
      return (
        <GuestScreens 
          currentScreen="GUEST_HOME" 
          onNavigate={setCurrentScreen} 
          talents={users} 
          onSendContact={(msg) => setContacts(prev => [msg, ...prev])} 
        />
      );
    }
    if (currentScreen === 'GUEST_TALENTS') {
      return (
        <GuestScreens 
          currentScreen="GUEST_TALENTS" 
          onNavigate={setCurrentScreen} 
          talents={users} 
          onSendContact={(msg) => setContacts(prev => [msg, ...prev])} 
        />
      );
    }
    if (currentScreen === 'GUEST_CONTACT') {
      return (
        <GuestScreens 
          currentScreen="GUEST_CONTACT" 
          onNavigate={setCurrentScreen} 
          talents={users} 
          onSendContact={(msg) => setContacts(prev => [msg, ...prev])} 
        />
      );
    }

    // B. HUMAS AREA
    if (currentScreen === 'HUMAS_DASHBOARD') {
      return (
        <HumasDashboard
          clients={clients}
          sponsors={sponsors}
          pengajuanList={pengajuanList}
          onNavigateToScreen={setCurrentScreen}
        />
      );
    }
    if (currentScreen === 'HUMAS_CLIENTS') {
      return (
        <HumasClients
          clients={clients}
          onAddClient={(c) => setClients(prev => [...prev, c])}
          onUpdateClient={(c) => setClients(prev => prev.map(item => item.id === c.id ? c : item))}
          onDeleteClient={(id) => setClients(prev => prev.filter(c => c.id !== id))}
        />
      );
    }
    if (currentScreen === 'HUMAS_SPONSORS') {
      return (
        <HumasSponsors
          sponsors={sponsors}
          onAddSponsor={(s) => setSponsors(prev => [...prev, s])}
          onUpdateSponsor={(s) => setSponsors(prev => prev.map(item => item.id === s.id ? s : item))}
          onDeleteSponsor={(id) => setSponsors(prev => prev.filter(s => s.id !== id))}
        />
      );
    }
    if (currentScreen === 'HUMAS_PENGAJUAN') {
      return (
        <HumasPengajuanPenugasan
          pengajuanList={pengajuanList}
          talents={users.filter(u => u.peran === 'Talent')}
          onAddPengajuan={(p) => setPengajuanList(prev => [...prev, p])}
          onUpdatePengajuan={(p) => setPengajuanList(prev => prev.map(item => item.id === p.id ? p : item))}
          onCancelPengajuan={(id) => setPengajuanList(prev => prev.map(item => item.id === id ? { ...item, status: 'Dibatalkan' } : item))}
        />
      );
    }
    if (currentScreen === 'HUMAS_TALENT_INFO') {
      return (
        <HumasTalentInfo talents={users} />
      );
    }

    // C. SDM AREA
    if (currentScreen === 'SDM_DASHBOARD') {
      return (
        <SdmDashboard
          users={users}
          penugasanList={penugasanList}
          kegiatanList={kegiatanList}
          onNavigateToScreen={setCurrentScreen}
        />
      );
    }
    if (currentScreen === 'SDM_USER_MANAGEMENT') {
      return (
        <SdmUserManagement
          users={users}
          onAddUser={(u) => setUsers(prev => [...prev, u])}
          onUpdateUser={(u) => setUsers(prev => prev.map(item => item.id === u.id ? u : item))}
          onDeleteUser={(id) => setUsers(prev => prev.filter(u => u.id !== id))}
        />
      );
    }
    if (currentScreen === 'SDM_TALENT_LIST') {
      return (
        <SdmTalentList talents={users} />
      );
    }
    if (currentScreen === 'SDM_PENUGASAN_MGMT') {
      return (
        <SdmPenugasanManagement
          penugasanList={penugasanList}
          kegiatanList={kegiatanList}
          talents={users.filter(u => u.peran === 'Talent')}
          onAddPenugasan={(p) => setPenugasanList(prev => [...prev, p])}
          onUpdatePenugasan={(p) => setPenugasanList(prev => prev.map(item => item.id === p.id ? p : item))}
          onDeletePenugasan={(id) => setPenugasanList(prev => prev.filter(p => p.id !== id))}
        />
      );
    }
    if (currentScreen === 'SDM_VALIDATION_MGMT') {
      return (
        <SdmReportValidation
          penugasanList={penugasanList}
          onValidateReport={handleValidateReport}
        />
      );
    }

    // D. TALENT AREA
    if (currentScreen === 'TALENT_DASHBOARD') {
      return (
        <TalentDashboard
          talent={currentTalent}
          penugasanList={penugasanList}
          onNavigateToScreen={setCurrentScreen}
        />
      );
    }
    if (currentScreen === 'TALENT_ASSIGNMENTS') {
      return (
        <TalentAssignments
          talent={currentTalent}
          penugasanList={penugasanList}
          onSelectPenugasan={(id) => {
            setSelectedPenugasanId(id);
            setCurrentScreen('TALENT_DETAIL');
          }}
        />
      );
    }
    if (currentScreen === 'TALENT_DETAIL') {
      return (
        <TalentDetail
          penugasanId={selectedPenugasanId}
          penugasanList={penugasanList}
          onRespondAssignment={handleRespondAssignment}
          onNavigateToReport={(id) => {
            setSelectedPenugasanId(id);
            setCurrentScreen('TALENT_REPORT_FORM');
          }}
          onBack={() => setCurrentScreen('TALENT_ASSIGNMENTS')}
        />
      );
    }
    if (currentScreen === 'TALENT_REPORT_FORM') {
      return (
        <TalentReportForm
          penugasanId={selectedPenugasanId}
          penugasanList={penugasanList}
          onSubmitReport={handleSubmitReport}
          onCancel={() => setCurrentScreen('TALENT_DETAIL')}
        />
      );
    }
    if (currentScreen === 'TALENT_HISTORY') {
      return (
        <TalentHistory
          talent={currentTalent}
          penugasanList={penugasanList}
        />
      );
    }
    if (currentScreen === 'TALENT_RATING_PROFILE') {
      return (
        <TalentRatingAndProfile
          talent={currentTalent}
          onUpdateProfile={(updated) => {
            setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
          }}
        />
      );
    }

    // E. BENDAHARA AREA
    if (currentScreen === 'BENDAHARA_DASHBOARD') {
      return (
        <BendaharaDashboard
          penugasanList={penugasanList}
          onNavigateToScreen={setCurrentScreen}
        />
      );
    }
    if (currentScreen === 'BENDAHARA_PAYMENT_LIST') {
      return (
        <BendaharaPaymentList
          penugasanList={penugasanList}
          onSavePayment={handleSavePayment}
        />
      );
    }

    // F. KETUA UMUM AREA (PENGAWASAN & MONITORING AGENDA)
    if (currentScreen === 'KETUM_MONITORING' || currentScreen === 'KETUM_DASHBOARD') {
      return (
        <KetuaUmumScreen
          ketumUser={ketumUser}
          users={users}
          kegiatanList={kegiatanList}
          penugasanList={penugasanList}
          clients={clients}
          sponsors={sponsors}
          onNavigate={(screen) => {
            if (screen.startsWith('SDM_')) setCurrentRole('SDM');
            else if (screen.startsWith('HUMAS_')) setCurrentRole('Humas');
            else if (screen.startsWith('TALENT_')) setCurrentRole('Talent');
            else if (screen.startsWith('BENDAHARA_')) setCurrentRole('Bendahara');
            setCurrentScreen(screen);
          }}
        />
      );
    }

    // G. LO-FI BLUEPRINT & WIREFRAME LAYOUT GUIDE
    if (currentScreen === 'LOFI_LAYOUT_GUIDE') {
      return (
        <LofiLayoutGuideScreen
          onBackToApp={() => {
            setCurrentRole('Guest');
            setCurrentScreen('GUEST_HOME');
          }}
          onNavigateToScreen={(screen) => {
            if (screen.startsWith('SDM_')) setCurrentRole('SDM');
            else if (screen.startsWith('HUMAS_')) setCurrentRole('Humas');
            else if (screen.startsWith('TALENT_')) setCurrentRole('Talent');
            else if (screen.startsWith('BENDAHARA_')) setCurrentRole('Bendahara');
            else setCurrentRole('Guest');
            setCurrentScreen(screen);
          }}
        />
      );
    }

    // H. AUTH & COMMON SCREENS (LOGIN, PROFILE, NOTIFICATIONS)
    if (currentScreen === 'LOGIN') {
      return (
        <LoginScreen
          users={users}
          onLoginSuccess={handleLoginSuccess}
          onBackToPublic={() => {
            setCurrentRole('Guest');
            setCurrentScreen('GUEST_HOME');
          }}
          logoutMessage={logoutMessage}
        />
      );
    }
    if (currentScreen === 'PROFILE') {
      return (
        <ProfileScreen
          user={currentActiveUser}
          onSaveProfile={(updated) => {
            setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
          }}
          onBackToDashboard={() => setCurrentScreen(getDefaultScreenForRole(currentRole))}
        />
      );
    }
    if (currentScreen === 'NOTIFICATIONS') {
      return (
        <NotificationScreen
          notifications={notifications}
          onMarkAsRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, dibaca: true } : n))}
          onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, dibaca: true })))}
          activeRole={currentRole}
          onBackToDashboard={() => setCurrentScreen(getDefaultScreenForRole(currentRole))}
        />
      );
    }

    return null;
  };

  const isGuestMode = currentRole === 'Guest';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-[#1A3C5E]/20 relative">
      {/* 
        DUAL NAVIGATION (RULE 3):
        - In-App Navigation: Gunakan Sidebar di sebelah kiri untuk halaman internal (Humas, SDM, Talent, Bendahara, Ketua Umum) yang isinya HANYA menu untuk peran tersebut.
        - Untuk halaman Guest (Publik), gunakan Navbar di bagian atas.
      */}
      {isGuestMode ? (
        renderGuestNavbar()
      ) : (
        renderInternalTopBar()
      )}

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Render internal sidebar ONLY when NOT guest */}
        {!isGuestMode && renderInternalSidebar()}

        {/* Content Pane */}
        <main className={`flex-1 overflow-y-auto ${
          currentScreen === 'LOGIN'
            ? 'p-0 w-full'
            : isGuestMode
            ? 'p-6 md:p-10 max-w-7xl mx-auto w-full'
            : 'p-4 md:p-8'
        }`}>
          {renderScreenContent()}
        </main>
      </div>

      {/* ============================================================================
          PROTOTYPE DROPDOWN (FLOATING BUTTON DI POJOK KANAN BAWAH)
          "Buat tombol melayang (floating button) di pojok kanan bawah dengan ikon 'menu' atau 'figma'. 
          Jika diklik, muncul dropdown untuk melompat bebas ke halaman peran mana pun (Guest, Humas, SDM, Talent, Bendahara)."
      ============================================================================ */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {/* Dropdown Menu Modal */}
        {isPrototypeDropdownOpen && (
          <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border-2 border-[#1A3C5E] p-4 text-xs animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#1A3C5E] text-amber-400 flex items-center justify-center font-bold text-xs">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-[#1A3C5E] text-xs uppercase font-black block">Lompat Layar Prototype</strong>
                  <span className="text-[10px] text-slate-400">Pilih peran aktor atau layar tujuan</span>
                </div>
              </div>
              <button
                onClick={() => setIsPrototypeDropdownOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              {/* INFO NOTICE: DASHBOARD ITERASI 2 */}
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[10px] leading-snug">
                <strong>📌 Iterasi 1 (Halaman Operasional):</strong> Dashboard per peran ditiadakan pada iterasi ini dan dialihkan ke Iterasi 2. Masing-masing peran langsung membuka modul operasional utama.
              </div>

              {/* 0. AUTH & AKUN */}
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-700" /> Autentikasi & Akun
                </span>
                <div className="grid grid-cols-3 gap-1 text-[11px]">
                  <button onClick={() => jumpToScreen('Guest', 'LOGIN')} className="p-1.5 rounded-lg bg-white hover:bg-slate-800 hover:text-white text-slate-700 font-semibold border border-slate-200 text-center cursor-pointer transition-colors truncate">
                    🔑 Login
                  </button>
                  <button onClick={() => jumpToScreen(currentRole === 'Guest' ? 'SDM' : currentRole, 'PROFILE')} className="p-1.5 rounded-lg bg-white hover:bg-slate-800 hover:text-white text-slate-700 font-semibold border border-slate-200 text-center cursor-pointer transition-colors truncate">
                    👤 Profil
                  </button>
                  <button onClick={() => jumpToScreen(currentRole === 'Guest' ? 'SDM' : currentRole, 'NOTIFICATIONS')} className="p-1.5 rounded-lg bg-white hover:bg-slate-800 hover:text-white text-slate-700 font-semibold border border-slate-200 text-center cursor-pointer transition-colors truncate">
                    🔔 Notifikasi
                  </button>
                </div>
              </div>

              {/* 1. GUEST */}
              <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200/60 space-y-1.5">
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> A. Guest Area (Publik)
                </span>
                <div className="grid grid-cols-3 gap-1 text-[11px]">
                  <button onClick={() => jumpToScreen('Guest', 'GUEST_HOME')} className="p-1.5 rounded-lg bg-white hover:bg-[#1A3C5E] hover:text-white text-slate-700 font-semibold border border-slate-200 text-center cursor-pointer transition-colors truncate">
                    Beranda
                  </button>
                  <button onClick={() => jumpToScreen('Guest', 'GUEST_TALENTS')} className="p-1.5 rounded-lg bg-white hover:bg-[#1A3C5E] hover:text-white text-slate-700 font-semibold border border-slate-200 text-center cursor-pointer transition-colors truncate">
                    Talent
                  </button>
                  <button onClick={() => jumpToScreen('Guest', 'GUEST_CONTACT')} className="p-1.5 rounded-lg bg-white hover:bg-[#1A3C5E] hover:text-white text-slate-700 font-semibold border border-slate-200 text-center cursor-pointer transition-colors truncate">
                    Kontak
                  </button>
                </div>
              </div>

              {/* 2. HUMAS */}
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1.5">
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> B. Humas Area
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <button onClick={() => jumpToScreen('Humas', 'HUMAS_CLIENTS')} className="p-1.5 rounded-lg bg-white hover:bg-amber-600 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Kelola Client (12)
                  </button>
                  <button onClick={() => jumpToScreen('Humas', 'HUMAS_SPONSORS')} className="p-1.5 rounded-lg bg-white hover:bg-amber-600 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Kelola Sponsor (10)
                  </button>
                  <button onClick={() => jumpToScreen('Humas', 'HUMAS_PENGAJUAN')} className="p-1.5 rounded-lg bg-white hover:bg-amber-600 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Pengajuan Penugasan
                  </button>
                  <button onClick={() => jumpToScreen('Humas', 'HUMAS_TALENT_INFO')} className="p-1.5 rounded-lg bg-white hover:bg-amber-600 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Lihat Talent (Informasi)
                  </button>
                </div>
              </div>

              {/* 3. SDM */}
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> C. SDM Area (Diklat)
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <button onClick={() => jumpToScreen('SDM', 'SDM_USER_MANAGEMENT')} className="p-1.5 rounded-lg bg-white hover:bg-emerald-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Manajemen User (15)
                  </button>
                  <button onClick={() => jumpToScreen('SDM', 'SDM_TALENT_LIST')} className="p-1.5 rounded-lg bg-white hover:bg-emerald-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Daftar Talent
                  </button>
                  <button onClick={() => jumpToScreen('SDM', 'SDM_PENUGASAN_MGMT')} className="p-1.5 rounded-lg bg-white hover:bg-emerald-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Penugasan Talent (12)
                  </button>
                  <button onClick={() => jumpToScreen('SDM', 'SDM_VALIDATION_MGMT')} className="p-1.5 rounded-lg bg-white hover:bg-emerald-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Validasi Laporan (8 LPJ)
                  </button>
                </div>
              </div>

              {/* 4. TALENT */}
              <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-200/60 space-y-1.5">
                <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" /> D. Talent Area
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <button onClick={() => jumpToScreen('Talent', 'TALENT_ASSIGNMENTS')} className="p-1.5 rounded-lg bg-white hover:bg-purple-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Penugasan Saya (10)
                  </button>
                  <button onClick={() => jumpToScreen('Talent', 'TALENT_DETAIL')} className="p-1.5 rounded-lg bg-white hover:bg-purple-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Detail Tugas
                  </button>
                  <button onClick={() => jumpToScreen('Talent', 'TALENT_REPORT_FORM')} className="p-1.5 rounded-lg bg-white hover:bg-purple-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Buat Laporan
                  </button>
                  <button onClick={() => jumpToScreen('Talent', 'TALENT_HISTORY')} className="p-1.5 rounded-lg bg-white hover:bg-purple-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Riwayat Kegiatan & Honor
                  </button>
                  <button onClick={() => jumpToScreen('Talent', 'TALENT_RATING_PROFILE')} className="col-span-2 p-1.5 rounded-lg bg-white hover:bg-purple-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Rating & Profil
                  </button>
                </div>
              </div>

              {/* 5. BENDAHARA */}
              <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-200/60 space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" /> E. Bendahara Area
                </span>
                <div className="grid grid-cols-1 gap-1 text-[11px]">
                  <button onClick={() => jumpToScreen('Bendahara', 'BENDAHARA_PAYMENT_LIST')} className="p-1.5 rounded-lg bg-white hover:bg-indigo-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                    Daftar Pembayaran & Honorarium (12)
                  </button>
                </div>
              </div>

              {/* 6. KETUA UMUM */}
              <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-200/60 space-y-1.5">
                <span className="text-[10px] font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> F. Ketua Umum
                </span>
                <button onClick={() => jumpToScreen('Ketua Umum', 'KETUM_MONITORING')} className="w-full p-1.5 rounded-lg bg-white hover:bg-rose-700 hover:text-white text-slate-700 font-semibold border border-slate-200 text-left px-2 cursor-pointer transition-colors truncate">
                  Pengawasan Agenda & Kegiatan
                </button>
              </div>

              {/* 7. LO-FI WIREFRAME / BLUEPRINT */}
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-black" /> G. Blueprint / Lo-Fi Guide
                </span>
                <button 
                  onClick={() => {
                    setCurrentRole('Guest');
                    setCurrentScreen('LOFI_LAYOUT_GUIDE');
                    setIsPrototypeDropdownOpen(false);
                  }} 
                  className="w-full p-1.5 rounded-lg bg-white hover:bg-black hover:text-white text-slate-900 font-bold border border-black text-left px-2 cursor-pointer transition-colors text-xs truncate flex items-center justify-between"
                >
                  <span>📐 Posisi Komponen (Lo-Fi)</span>
                  <span className="text-[10px] px-1 bg-slate-100 text-slate-700 rounded border border-slate-300 font-mono">B/W</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Button Trigger with Figma/Menu Icon */}
        <button
          onClick={() => setIsPrototypeDropdownOpen(!isPrototypeDropdownOpen)}
          className="bg-[#1A3C5E] hover:bg-slate-900 text-white font-bold p-3.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-amber-400 cursor-pointer transition-all hover:scale-105 active:scale-95 group"
          title="Lompat Bebas Antar Peran (Figma Prototype Navigator)"
        >
          <div className="w-5 h-5 flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform">
            {isPrototypeDropdownOpen ? <X className="w-5 h-5 text-white" /> : <Layers className="w-5 h-5" />}
          </div>
          <span className="text-xs font-bold pr-1 text-amber-300 hidden sm:inline">
            Prototype Navigator
          </span>
        </button>
      </div>
    </div>
  );
}
