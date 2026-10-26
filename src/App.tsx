import React, { useState } from 'react';
import { 
  INITIAL_USERS, 
  INITIAL_CLIENTS, 
  INITIAL_SPONSORS, 
  INITIAL_BLOGS, 
  INITIAL_MEDIA, 
  INITIAL_KEGIATAN, 
  INITIAL_PENUGASAN, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_CONTACTS,
  INITIAL_TRANSAKSI
} from './data';
import { User, Client, Sponsor, BlogArticle, MediaItem, Kegiatan, Penugasan, Notification, ContactMessage, Role, Transaksi } from './types';
import PrototypeController from './components/PrototypeController';
import { LoginScreen, ProfileScreen, NotificationScreen } from './components/CommonScreens';
import { SdmDashboard, SdmPlotting, SdmUserManagement, SdmPenugasanManagement, SdmReportValidation } from './components/SdmScreens';
import { HumasClients, HumasSponsors, HumasBlogs, HumasGallery, HumasKegiatan, HumasDashboard, HumasProposeTalent, HumasAssignmentsView } from './components/HumasScreens';
import { TalentAssignments, TalentDetail, TalentReportForm, TalentDashboard, TalentRiwayatKegiatan, TalentRiwayatHonor, TalentProfileEdit } from './components/TalentScreens';
import { BendaharaDashboard, BendaharaPaymentInput, BendaharaFinancialReport, BendaharaFinancialManagement } from './components/BendaharaScreens';
import GuestLayout from './components/GuestLayout';
import LofiLayoutGuideScreen from './components/LofiLayoutGuideScreen';
import { 
  Bell, 
  User as UserIcon, 
  LogOut, 
  CheckSquare, 
  Layers, 
  FolderHeart, 
  Calendar, 
  CreditCard, 
  ChevronRight,
  ChevronLeft,
  Menu,
  LayoutDashboard,
  Users,
  CalendarPlus,
  ClipboardList,
  ShieldCheck,
  Building2,
  Handshake,
  Award,
  PenTool,
  Image,
  Sparkles,
  Eye,
  Home,
  Inbox,
  Info,
  History,
  Coins,
  Settings,
  PieChart,
  Banknote,
  FileSpreadsheet
} from 'lucide-react';

export default function App() {
  // --- STATE DATABASE HUB ---
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [sponsors, setSponsors] = useState<Sponsor[]>(INITIAL_SPONSORS);
  const [blogs, setBlogs] = useState<BlogArticle[]>(INITIAL_BLOGS);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>(INITIAL_KEGIATAN);
  const [penugasan, setPenugasan] = useState<Penugasan[]>(INITIAL_PENUGASAN);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [contacts, setContacts] = useState<ContactMessage[]>(INITIAL_CONTACTS);
  const [transaksi, setTransaksi] = useState<Transaksi[]>(INITIAL_TRANSAKSI);

  // --- ACTIVE SESSION STATES ---
  const [currentUser, setCurrentUser] = useState<User | null>(null); // starts as Guest/Logged out
  const [currentRole, setCurrentRole] = useState<Role>('Guest');
  const [currentScreen, setCurrentScreen] = useState<string>('GUEST_HOME');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);

  // --- NAVIGATION PARAMETERS ---
  const [selectedKegiatanId, setSelectedKegiatanId] = useState<string>('k1');
  const [selectedPenugasanId, setSelectedPenugasanId] = useState<string>('p3');

  // --- CORE SYSTEM HANDLERS ---
  const handleResetData = () => {
    if (confirm('Apakah Anda ingin merestore database mockup ke pengaturan semula? Semua penambahan instansi/bakat baru akan dihapus.')) {
      setUsers(INITIAL_USERS);
      setClients(INITIAL_CLIENTS);
      setSponsors(INITIAL_SPONSORS);
      setBlogs(INITIAL_BLOGS);
      setMediaItems(INITIAL_MEDIA);
      setKegiatan(INITIAL_KEGIATAN);
      setPenugasan(INITIAL_PENUGASAN);
      setNotifications(INITIAL_NOTIFICATIONS);
      setContacts(INITIAL_CONTACTS);
      setTransaksi(INITIAL_TRANSAKSI);
      alert('Mock database berhasil di-reset!');
    }
  };

  const handleQuickLogin = (role: Role) => {
    setCurrentRole(role);
    if (role === 'Guest') {
      setCurrentUser(null);
      setCurrentScreen('GUEST_HOME');
    } else {
      // Find representative user of that role
      const found = users.find(u => u.peran === role);
      if (found) {
        setCurrentUser(found);
      } else {
        // Fallback user creator
        const fallback: User = {
          id: 'u_fallback_' + role.toLowerCase(),
          username: `user_${role.toLowerCase()}`,
          nama: `Simulasi ${role}`,
          email: `${role.toLowerCase()}@cakning.org`,
          telepon: '081234567890',
          peran: role,
          status: 'Aktif'
        };
        setUsers(prev => [...prev, fallback]);
        setCurrentUser(fallback);
      }

      // Route to default role dashboard
      if (role === 'SDM') setCurrentScreen('SDM_DASHBOARD');
      else if (role === 'Humas') setCurrentScreen('HUMAS_DASHBOARD');
      else if (role === 'Talent') setCurrentScreen('TALENT_DASHBOARD');
      else if (role === 'Bendahara') setCurrentScreen('BENDAHARA_DASHBOARD');
    }
  };

  const handleFigmaScreenJump = (screenId: string) => {
    // Determine target role for chosen screen to avoid mismatched layouts
    let targetRole: Role = 'Guest';
    if (['LOGIN'].includes(screenId)) {
      targetRole = 'Guest';
    } else if (['SDM_DASHBOARD', 'SDM_PLOTTING', 'SDM_USER_MANAGEMENT', 'SDM_PENUGASAN_MGMT', 'SDM_VALIDATION_MGMT'].includes(screenId)) {
      targetRole = 'SDM';
    } else if (['HUMAS_DASHBOARD', 'HUMAS_CLIENTS', 'HUMAS_SPONSORS', 'HUMAS_BLOGS', 'HUMAS_GALLERY', 'HUMAS_KEGIATAN', 'HUMAS_PROPOSE', 'HUMAS_PENUGASAN'].includes(screenId)) {
      targetRole = 'Humas';
    } else if (['TALENT_DASHBOARD', 'TALENT_ASSIGNMENTS', 'TALENT_DETAIL', 'TALENT_REPORT_FORM', 'TALENT_HISTORY', 'TALENT_HONOR', 'TALENT_PROFILE_EDIT'].includes(screenId)) {
      targetRole = 'Talent';
    } else if (['BENDAHARA_DASHBOARD', 'BENDAHARA_PAYMENT_INPUT', 'BENDAHARA_REPORT'].includes(screenId)) {
      targetRole = 'Bendahara';
    } else if (['ALL_PROFILE', 'ALL_NOTIFICATIONS'].includes(screenId)) {
      // keep current or fallback to SDM
      targetRole = currentRole === 'Guest' ? 'SDM' : currentRole;
    }

    // Apply role config
    setCurrentRole(targetRole);
    if (targetRole === 'Guest') {
      setCurrentUser(null);
    } else {
      const found = users.find(u => u.peran === targetRole);
      if (found) setCurrentUser(found);
    }

    // Special Parameter fallbacks to prevent screen crashes
    if (screenId === 'SDM_PLOTTING' && !selectedKegiatanId) {
      const fallbackK = kegiatan.find(k => k.status === 'Butuh Plotting') || kegiatan[0];
      setSelectedKegiatanId(fallbackK.id);
    }
    if ((screenId === 'TALENT_DETAIL' || screenId === 'TALENT_REPORT_FORM' || screenId === 'BENDAHARA_PAYMENT_INPUT') && !selectedPenugasanId) {
      setSelectedPenugasanId(penugasan[0]?.id || 'p1');
    }

    setCurrentScreen(screenId);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentRole(user.peran);
    
    if (user.peran === 'SDM') {
      setCurrentScreen('SDM_DASHBOARD');
    } else if (user.peran === 'Humas') {
      setCurrentScreen('HUMAS_DASHBOARD');
    } else if (user.peran === 'Talent') {
      setCurrentScreen('TALENT_DASHBOARD');
    } else if (user.peran === 'Bendahara') {
      setCurrentScreen('BENDAHARA_DASHBOARD');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('Guest');
    setCurrentScreen('GUEST_HOME');
  };

  // --- WORKFLOW TRANSACTIONS ---
  
  // SDM - Plotting confirmed
  const handleConfirmPlotting = (kegId: string, talentIds: string[]) => {
    // 1. Update kegiatan status
    setKegiatan(prev => prev.map(k => k.id === kegId ? { ...k, status: 'Sedang Berjalan' } : k));
    
    // 2. Insert new penugasan records
    const keg = kegiatan.find(k => k.id === kegId);
    const newPenugasans: Penugasan[] = talentIds.map(tId => {
      const talentUser = users.find(u => u.id === tId);
      return {
        id: 'p_new_' + tId + '_' + Date.now(),
        kegiatanId: kegId,
        kegiatanNama: keg?.namaKegiatan || 'Pariwisata Surabaya',
        tanggal: keg?.tanggal || '',
        lokasi: keg?.lokasi || '',
        talentId: tId,
        talentNama: talentUser?.nama || 'Talent',
        status: 'Menunggu Konfirmasi',
        statusBayar: 'Belum Dibayar'
      };
    });
    setPenugasan(prev => [...prev, ...newPenugasans]);

    // 3. Send system notifications to selected talents
    const newNotifications: Notification[] = talentIds.map(tId => ({
      id: 'n_pl_' + tId + '_' + Date.now(),
      penerimaRole: 'Talent',
      penerimaUserId: tId,
      tipe: 'warning',
      pesan: `Anda diusulkan oleh SDM untuk bertugas pada kegiatan "${keg?.namaKegiatan}" tanggal ${keg?.tanggal}. Harap berikan konfirmasi kehadiran.`,
      tanggal: 'Baru saja',
      dibaca: false
    }));
    setNotifications(prev => [...newNotifications, ...prev]);

    setCurrentScreen('SDM_DASHBOARD');
  };

  // Talent - Respond to Duty (Accept/Reject)
  const handleRespondAssignment = (penID: string, accept: boolean) => {
    // Notify SDM to simulate full integration
    const pen = penugasan.find(p => p.id === penID);
    const newNotif: Notification = {
      id: 'n_resp_' + penID + '_' + Date.now(),
      penerimaRole: 'SDM',
      tipe: accept ? 'success' : 'warning',
      pesan: `Talent "${pen?.talentNama}" telah ${accept ? 'MENERIMA' : 'MENOLAK'} mandat penugasan untuk kegiatan "${pen?.kegiatanNama}".`,
      tanggal: 'Baru saja',
      dibaca: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Show a beautiful informative alert explaining the low-fidelity loop reset
    alert(
      `🎉 Sukses! Konfirmasi ${accept ? 'Menerima' : 'Menolak'} Mandat Penugasan Berhasil Dikirim ke SDM.\n\n` +
      `Sistem simulasi telah mencatat tanggapan Anda dan mengirimkan notifikasi kepada pengurus.\n\n` +
      `[Catatan Prototype Low-Fidelity]: Status penugasan ini dikembalikan ke 'Menunggu Konfirmasi' ` +
      `agar Anda dapat menguji kembali alur interaksi ini berulang-ulang dengan lancar.`
    );
    
    // We do NOT modify the state status so it remains "Menunggu Konfirmasi" (kembali ke kondisi semula)
  };

  // Talent - Submit Report
  const handleSubmitReport = (penID: string, desc: string, fileLabel: string) => {
    // Notify Bendahara & SDM to simulate full integration
    const pen = penugasan.find(p => p.id === penID);
    const newNotifs: Notification[] = [
      {
        id: 'n_rep_b_' + penID + '_' + Date.now(),
        penerimaRole: 'Bendahara',
        tipe: 'info',
        pesan: `Laporan kegiatan "${pen?.kegiatanNama}" telah diserahkan oleh ${pen?.talentNama}. Siap divalidasi dan diproses transfer honornya.`,
        tanggal: 'Baru saja',
        dibaca: false
      },
      {
        id: 'n_rep_s_' + penID + '_' + Date.now(),
        penerimaRole: 'SDM',
        tipe: 'success',
        pesan: `Talent "${pen?.talentNama}" telah mengunggah laporan penugasan kegiatan "${pen?.kegiatanNama}".`,
        tanggal: 'Baru saja',
        dibaca: false
      }
    ];
    setNotifications(prev => [...newNotifs, ...prev]);

    // Show a beautiful informative alert explaining the low-fidelity loop reset
    alert(
      `🎉 Sukses! Laporan Pertanggungjawaban Kegiatan Berhasil Diunggah.\n\n` +
      `Deskripsi: "${desc}"\n` +
      `File Bukti: ${fileLabel}\n\n` +
      `Sistem simulasi telah mengirimkan laporan ini ke Pengurus SDM & Bendahara.\n\n` +
      `[Catatan Prototype Low-Fidelity]: Status penugasan dikembalikan ke 'Dikonfirmasi' ` +
      `agar Anda dapat menguji kembali pengunggahan laporan ini berulang-ulang tanpa terkunci.`
    );

    // Go back to the assignments list where it remains "Dikonfirmasi" (kembali ke kondisi semula)
    setCurrentScreen('TALENT_ASSIGNMENTS');
  };

  // Bendahara - Update Honor inline
  const handleUpdateHonorInline = (penID: string, nominal: number) => {
    setPenugasan(prev => prev.map(p => p.id === penID ? { ...p, honor: nominal } : p));
  };

  // Bendahara - Save final payment
  const handleSavePayment = (penID: string, nominal: number, tanggalTransfer: string, fileLabel: string) => {
    setPenugasan(prev => prev.map(p => {
      if (p.id === penID) {
        return {
          ...p,
          honor: nominal,
          statusBayar: 'Lunas',
          tanggalBayar: tanggalTransfer,
          buktiBayar: fileLabel
        };
      }
      return p;
    }));

    // Notify Talent
    const pen = penugasan.find(p => p.id === penID);
    const newNotif: Notification = {
      id: 'n_pay_' + penID + '_' + Date.now(),
      penerimaRole: 'Talent',
      penerimaUserId: pen?.talentId,
      tipe: 'success',
      pesan: `Kabar Baik! Honorarium penugasan Anda untuk "${pen?.kegiatanNama}" sebesar Rp ${nominal.toLocaleString('id-ID')} telah ditransfer oleh Bendahara. Silakan cek mutasi Anda.`,
      tanggal: 'Baru saja',
      dibaca: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setCurrentScreen('BENDAHARA_DASHBOARD');
  };

  // SDM - Validate Report (Approve/Reject)
  const handleValidateReport = (penID: string, statusLaporan: 'Disetujui' | 'Revisi', catatanSdm?: string) => {
    setPenugasan(prev => prev.map(p => {
      if (p.id === penID) {
        return {
          ...p,
          laporanStatus: statusLaporan,
          catatanSdm: catatanSdm || '',
          status: statusLaporan === 'Disetujui' ? 'Selesai' : 'Dikonfirmasi'
        };
      }
      return p;
    }));

    // Notify Talent
    const penItem = penugasan.find(p => p.id === penID);
    const validationNotif: Notification = {
      id: 'n_val_' + penID + '_' + Date.now(),
      penerimaRole: 'Talent',
      penerimaUserId: penItem?.talentId,
      tipe: statusLaporan === 'Disetujui' ? 'success' : 'warning',
      pesan: `Laporan kegiatan "${penItem?.kegiatanNama}" Anda telah ${statusLaporan === 'Disetujui' ? 'DISETUJUI' : 'DIBERIKAN CATATAN REVISI'} oleh SDM. Catatan: ${catatanSdm || '-'}`,
      tanggal: 'Baru saja',
      dibaca: false
    };
    setNotifications(prev => [validationNotif, ...prev]);
  };

  // SDM - Update User
  const handleUpdateUser = (updated: User) => {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    if (currentUser?.id === updated.id) {
      setCurrentUser(updated);
    }
  };

  // --- RENDERING ROUTER ENGINE ---
  const renderRoleSidebar = () => {
    if (currentRole === 'Guest' || currentScreen === 'LOGIN') return null;

    const screenIcons: Record<string, React.ComponentType<any>> = {
      SDM_DASHBOARD: LayoutDashboard,
      SDM_USER_MANAGEMENT: Users,
      SDM_PLOTTING: CalendarPlus,
      SDM_PENUGASAN_MGMT: ClipboardList,
      SDM_VALIDATION_MGMT: ShieldCheck,

      HUMAS_DASHBOARD: Building2,
      HUMAS_CLIENTS: Handshake,
      HUMAS_SPONSORS: Award,
      HUMAS_BLOGS: PenTool,
      HUMAS_GALLERY: Image,
      HUMAS_KEGIATAN: Calendar,
      HUMAS_PROPOSE: Sparkles,
      HUMAS_PENUGASAN: Eye,

      TALENT_DASHBOARD: Home,
      TALENT_ASSIGNMENTS: Inbox,
      TALENT_DETAIL: Info,
      TALENT_HISTORY: History,
      TALENT_HONOR: Coins,
      TALENT_PROFILE_EDIT: Settings,

      BENDAHARA_DASHBOARD: PieChart,
      BENDAHARA_KELOLA_KEUANGAN: Coins,
      BENDAHARA_PAYMENT_INPUT: Banknote,
      BENDAHARA_REPORT: FileSpreadsheet,

      ALL_PROFILE: UserIcon,
      ALL_NOTIFICATIONS: Bell,
    };

    const navItemClass = (screenId: string) => {
      const isActive = currentScreen === screenId;
      return `w-full text-left font-sans text-xs font-bold py-2.5 transition-all cursor-pointer flex items-center border-b border-slate-200 ${
        isSidebarExpanded ? 'px-4 justify-between' : 'px-0 justify-center'
      } ${
        isActive 
          ? 'bg-[#1A3C5E] text-white border-[#1A3C5E]' 
          : 'bg-white hover:bg-slate-100 text-[#1A3C5E]'
      }`;
    };

    const renderNavItem = (screenId: string, label: string) => {
      const Icon = screenIcons[screenId] || CheckSquare;
      const isActive = currentScreen === screenId;
      return (
        <button 
          onClick={() => {
            if (screenId === 'SDM_PLOTTING' || screenId === 'BENDAHARA_PAYMENT_INPUT' || screenId === 'TALENT_DETAIL') {
              handleFigmaScreenJump(screenId);
            } else {
              setCurrentScreen(screenId);
            }
          }} 
          className={navItemClass(screenId)}
          title={label}
        >
          <div className={`flex items-center gap-2.5 ${!isSidebarExpanded && 'justify-center w-full'}`}>
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#1A3C5E]'}`} />
            {isSidebarExpanded && <span className="truncate">{label}</span>}
          </div>
          {isSidebarExpanded && <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />}
        </button>
      );
    };

    return (
      <aside className={`${isSidebarExpanded ? 'w-64' : 'w-16'} transition-all duration-300 shrink-0 bg-white border-r-2 border-[#1A3C5E] flex flex-col justify-between`}>
        <div>
          {/* Toggle Button Header */}
          <div className={`p-3 bg-slate-100 border-b-2 border-[#1A3C5E] flex items-center ${isSidebarExpanded ? 'justify-between' : 'justify-center'}`}>
            {isSidebarExpanded && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                MENU UTAMA
              </span>
            )}
            <button 
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="p-1 text-[#1A3C5E] hover:bg-slate-200 rounded cursor-pointer transition-colors"
              title={isSidebarExpanded ? "Sembunyikan Menu" : "Tampilkan Menu"}
            >
              {isSidebarExpanded ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Items based on Role */}
          <nav className="flex flex-col">
            {currentRole === 'SDM' && (
              <>
                {renderNavItem('SDM_DASHBOARD', 'Dashboard SDM')}
                {renderNavItem('SDM_USER_MANAGEMENT', 'Manajemen User Akun')}
                {renderNavItem('SDM_PLOTTING', 'Plotting Penugasan')}
                {renderNavItem('SDM_PENUGASAN_MGMT', 'Daftar Penugasan')}
                {renderNavItem('SDM_VALIDATION_MGMT', 'Validasi Laporan')}
              </>
            )}

            {currentRole === 'Humas' && (
              <>
                {renderNavItem('HUMAS_DASHBOARD', 'Dashboard Humas')}
                {renderNavItem('HUMAS_CLIENTS', 'Kelola Client Mitra')}
                {renderNavItem('HUMAS_SPONSORS', 'Kelola Sponsor')}
                {renderNavItem('HUMAS_BLOGS', 'Kelola Blog Artikel')}
                {renderNavItem('HUMAS_GALLERY', 'Kelola Galeri Media')}
                {renderNavItem('HUMAS_KEGIATAN', 'Kelola Agenda Kegiatan')}
                {renderNavItem('HUMAS_PROPOSE', 'Usulkan Talent')}
                {renderNavItem('HUMAS_PENUGASAN', 'Monitoring Penugasan')}
              </>
            )}

            {currentRole === 'Bendahara' && (
              <>
                {renderNavItem('BENDAHARA_DASHBOARD', 'Dashboard Bendahara')}
                {renderNavItem('BENDAHARA_KELOLA_KEUANGAN', 'Kelola Kas & Transaksi')}
                {renderNavItem('BENDAHARA_PAYMENT_INPUT', 'Input Pembayaran Honor')}
                {renderNavItem('BENDAHARA_REPORT', 'Laporan Keuangan')}
              </>
            )}

            {currentRole === 'Talent' && (
              <>
                {renderNavItem('TALENT_DASHBOARD', 'Dashboard Talent')}
                {renderNavItem('TALENT_ASSIGNMENTS', 'Penugasan Saya')}
                {renderNavItem('TALENT_DETAIL', 'Detail Tugas')}
                {renderNavItem('TALENT_HISTORY', 'Riwayat Kegiatan')}
                {renderNavItem('TALENT_HONOR', 'Riwayat Honor')}
                {renderNavItem('TALENT_PROFILE_EDIT', 'Edit Portofolio')}
              </>
            )}

            {/* Universal Internal Shortcuts */}
            <div className={`pt-2 mt-2 border-t-2 border-[#1A3C5E] ${!isSidebarExpanded && 'flex flex-col items-center'}`}>
              {renderNavItem('ALL_PROFILE', 'Profil Akun Saya')}
              {renderNavItem('ALL_NOTIFICATIONS', 'Notifikasi')}
            </div>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-200 space-y-2 bg-slate-50 flex flex-col items-center w-full">
          {isSidebarExpanded ? (
            <>
              <button
                onClick={() => setCurrentScreen('GUEST_HOME')}
                className="w-full bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1.5 px-3 text-[10px] uppercase tracking-wider cursor-pointer text-center"
              >
                Lihat Publik Site
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-700 hover:bg-slate-800 text-white font-bold py-1.5 px-3 text-[10px] uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 border-none"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentScreen('GUEST_HOME')}
                className="p-1.5 text-[#1A3C5E] hover:bg-slate-200 rounded transition-colors"
                title="Lihat Publik Site"
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="p-1.5 text-red-700 hover:bg-red-100 rounded transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </aside>
    );
  };

  const renderContent = () => {
    // 0. LO-FI STRUCTURAL BLUEPRINT PAGE
    if (currentScreen === 'LOFI_LAYOUT_GUIDE') {
      return (
        <LofiLayoutGuideScreen 
          onBackToApp={() => setCurrentScreen('GUEST_HOME')}
          onNavigateToScreen={handleFigmaScreenJump}
        />
      );
    }

    // A. PUBLIC GUEST FLOW
    if (['GUEST_HOME', 'GUEST_TALENTS', 'GUEST_KEGIATAN', 'GUEST_BLOG', 'GUEST_GALLERY', 'GUEST_CONTACT'].includes(currentScreen)) {
      return (
        <GuestLayout
          currentScreen={currentScreen}
          onScreenChange={handleFigmaScreenJump}
          talents={users}
          kegiatanList={kegiatan}
          blogs={blogs}
          mediaItems={mediaItems}
          onSendContact={(msg) => setContacts(prev => [msg, ...prev])}
        />
      );
    }

    // B. LOGIN SCREEN
    if (currentScreen === 'LOGIN') {
      return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
          <div className="p-4 border-b bg-white flex justify-between items-center border-[#1A3C5E]">
            <span className="font-extrabold text-xs text-[#1A3C5E] uppercase tracking-wider font-mono">← SIM PENUGASAN CAK & NING (WIREFRAME DESKTOP)</span>
            <button onClick={() => setCurrentScreen('GUEST_HOME')} className="text-xs text-[#1A3C5E] underline font-bold cursor-pointer">
              Kembali ke Beranda Publik
            </button>
          </div>
          <LoginScreen onLoginSuccess={handleLoginSuccess} users={users} />
          <footer className="py-3 bg-white text-center text-[10px] text-slate-400 border-t border-[#E0E0E0]">
            &copy; 2026 Paguyuban Cak Ning Surabaya.
          </footer>
        </div>
      );
    }

    // C. INTERNAL ROLES (CONTAINED WITH HEADER & SIDEBAR)
    const isTalentRole = currentRole === 'Talent';
    const isNing = currentUser?.nama.toLowerCase().includes('ning') || false;
    const avatarGradient = isNing 
      ? 'from-rose-500 to-pink-600' 
      : 'from-[#1A3C5E] to-blue-600';

    const getDescriptiveRoleBadge = (user: User | null) => {
      if (!user) return '';
      if (user.peran === 'SDM') return 'Pengurus SDM & Diklat';
      if (user.peran === 'Humas') return 'Pengurus Hubungan Masyarakat';
      if (user.peran === 'Bendahara') return 'Bendahara Keuangan';
      if (user.peran === 'Talent') return `Talent Duta Wisata (${user.angkatan || '2023'})`;
      return user.peran;
    };

    const unreadCount = notifications.filter(n => !n.dibaca).length;

    return (
      <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
        {/* Header Bar */}
        <header className="bg-white border-b-2 border-[#1A3C5E] px-6 py-3 flex justify-between items-center sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-[#1A3C5E] text-white px-2.5 py-1.5 text-xs font-mono font-bold uppercase border">
              Cak Ning
            </div>
            <div>
              <h1 className="text-xs font-extrabold uppercase tracking-widest text-[#1A3C5E]">SIM Penugasan Talent Duta Wisata</h1>
              <p className="text-[10px] text-slate-400 font-mono">PEMERINTAH KOTA SURABAYA | PAGUYUBAN CAK & NING</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Badge Shortcut */}
            <button 
              onClick={() => setCurrentScreen('ALL_NOTIFICATIONS')}
              className="relative p-2 text-[#1A3C5E] hover:bg-slate-100 rounded-full cursor-pointer transition-colors"
              title="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-600 text-white font-sans text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Navigation Card */}
            <div 
              onClick={() => setCurrentScreen('ALL_PROFILE')}
              className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-[#1A3C5E] px-3 py-1.5 rounded-lg cursor-pointer transition-all group"
              title="Lihat Profil Akun Saya"
            >
              {/* Info text */}
              <div className="text-right select-none hidden sm:block">
                <div className="text-xs font-bold text-[#1A3C5E] group-hover:underline">
                  {currentUser?.nama || 'Simulasi User'}
                </div>
                <div className="text-[9px] font-mono font-bold text-slate-400 uppercase leading-none mt-0.5">
                  {getDescriptiveRoleBadge(currentUser)}
                </div>
              </div>

              {/* Avatar circle with initials */}
              <div className="relative">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${avatarGradient} text-white flex items-center justify-center font-bold text-xs shadow-inner`}>
                  {currentUser?.nama ? currentUser.nama.substring(0, 2).toUpperCase() : 'US'}
                </div>
                {/* Active Indicator Status Dot */}
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              </div>
            </div>

            {/* Compact logout in header too for extra convenience */}
            <button 
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 p-2 rounded-full cursor-pointer transition-colors border border-red-100"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Lower body */}
        <div className="flex flex-1">
          {renderRoleSidebar()}

          {/* Actual content pane */}
          <div className="flex-1 p-8 bg-slate-50 min-h-[85vh]">
            {/* Screen selection mapping */}
            {currentScreen === 'SDM_DASHBOARD' && (
              <SdmDashboard 
                users={users} 
                kegiatanList={kegiatan} 
                penugasanList={penugasan} 
                onNavigateToPlotting={(id) => { setSelectedKegiatanId(id); setCurrentScreen('SDM_PLOTTING'); }}
                onNavigateToUserManagement={() => setCurrentScreen('SDM_USER_MANAGEMENT')}
                onNavigateToPenugasanManagement={() => setCurrentScreen('SDM_PENUGASAN_MGMT')}
                onNavigateToReportValidation={() => setCurrentScreen('SDM_VALIDATION_MGMT')}
              />
            )}
            {currentScreen === 'SDM_PLOTTING' && (
              <SdmPlotting 
                kegiatanId={selectedKegiatanId} 
                kegiatanList={kegiatan} 
                talents={users.filter(u => u.peran === 'Talent')} 
                penugasanList={penugasan} 
                onConfirmPlotting={handleConfirmPlotting} 
                onCancel={() => setCurrentScreen('SDM_DASHBOARD')}
              />
            )}
            {currentScreen === 'SDM_USER_MANAGEMENT' && (
              <SdmUserManagement 
                users={users} 
                onAddUser={(u) => setUsers(prev => [...prev, u])} 
                onUpdateUser={handleUpdateUser}
                onDeleteUser={(id) => setUsers(prev => prev.filter(u => u.id !== id))}
              />
            )}
            {currentScreen === 'SDM_PENUGASAN_MGMT' && (
              <SdmPenugasanManagement
                penugasanList={penugasan}
                kegiatanList={kegiatan}
                talents={users.filter(u => u.peran === 'Talent')}
                onAddPenugasan={(p) => setPenugasan(prev => [...prev, p])}
                onDeletePenugasan={(id) => setPenugasan(prev => prev.filter(p => p.id !== id))}
                onBack={() => setCurrentScreen('SDM_DASHBOARD')}
              />
            )}
            {currentScreen === 'SDM_VALIDATION_MGMT' && (
              <SdmReportValidation
                penugasanList={penugasan}
                onValidateReport={handleValidateReport}
                onBack={() => setCurrentScreen('SDM_DASHBOARD')}
              />
            )}

            {currentScreen === 'HUMAS_DASHBOARD' && (
              <HumasDashboard 
                clients={clients} 
                sponsors={sponsors} 
                blogs={blogs} 
                kegiatanList={kegiatan} 
                penugasanList={penugasan}
                onNavigateToClients={() => setCurrentScreen('HUMAS_CLIENTS')}
                onNavigateToSponsors={() => setCurrentScreen('HUMAS_SPONSORS')}
                onNavigateToBlogs={() => setCurrentScreen('HUMAS_BLOGS')}
                onNavigateToGallery={() => setCurrentScreen('HUMAS_GALLERY')}
                onNavigateToKegiatan={() => setCurrentScreen('HUMAS_KEGIATAN')}
                onNavigateToPropose={() => setCurrentScreen('HUMAS_PROPOSE')}
                onNavigateToPenugasan={() => setCurrentScreen('HUMAS_PENUGASAN')}
              />
            )}
            {currentScreen === 'HUMAS_CLIENTS' && (
              <HumasClients 
                clients={clients} 
                onAddClient={(c) => setClients(prev => [...prev, c])} 
                onUpdateClientLog={(clientId, log) => {
                  setClients(prev => prev.map(c => {
                    if (c.id === clientId) {
                      return { ...c, catatanInteraksi: [...c.catatanInteraksi, `${new Date().toLocaleDateString('id-ID')}: ${log}`] };
                    }
                    return c;
                  }));
                }}
                onDeleteClient={(id) => setClients(prev => prev.filter(c => c.id !== id))}
              />
            )}
            {currentScreen === 'HUMAS_SPONSORS' && (
              <HumasSponsors 
                sponsors={sponsors} 
                onAddSponsor={(s) => setSponsors(prev => [...prev, s])} 
                onDeleteSponsor={(id) => setSponsors(prev => prev.filter(s => s.id !== id))}
              />
            )}
            {currentScreen === 'HUMAS_BLOGS' && (
              <HumasBlogs 
                blogs={blogs} 
                onAddBlog={(b) => setBlogs(prev => [...prev, b])} 
                onDeleteBlog={(id) => setBlogs(prev => prev.filter(b => b.id !== id))}
              />
            )}
            {currentScreen === 'HUMAS_GALLERY' && (
              <HumasGallery 
                mediaItems={mediaItems} 
                onAddMedia={(m) => setMediaItems(prev => [...prev, m])} 
                onDeleteMedia={(id) => setMediaItems(prev => prev.filter(m => m.id !== id))}
              />
            )}
            {currentScreen === 'HUMAS_KEGIATAN' && (
              <HumasKegiatan 
                kegiatanList={kegiatan} 
                onAddKegiatan={(k) => {
                  setKegiatan(prev => [...prev, k]);
                  // Send SDM warning notification
                  const newNotif: Notification = {
                    id: 'n_keg_' + k.id + '_' + Date.now(),
                    penerimaRole: 'SDM',
                    tipe: 'warning',
                    pesan: `Humas mengajukan agenda kegiatan baru "${k.namaKegiatan}" tanggal ${k.tanggal}. Plotting penugasan segera diperlukan.`,
                    tanggal: 'Baru saja',
                    dibaca: false
                  };
                  setNotifications(prev => [newNotif, ...prev]);
                }} 
                onDeleteKegiatan={(id) => setKegiatan(prev => prev.filter(k => k.id !== id))}
              />
            )}
            {currentScreen === 'HUMAS_PROPOSE' && (
              <HumasProposeTalent
                kegiatanList={kegiatan}
                talents={users.filter(u => u.peran === 'Talent')}
                onBack={() => setCurrentScreen('HUMAS_DASHBOARD')}
              />
            )}
            {currentScreen === 'HUMAS_PENUGASAN' && (
              <HumasAssignmentsView
                penugasanList={penugasan}
                onBack={() => setCurrentScreen('HUMAS_DASHBOARD')}
              />
            )}

            {currentScreen === 'TALENT_DASHBOARD' && currentUser && (
              <TalentDashboard
                talent={currentUser}
                penugasanList={penugasan}
                onNavigateToAssignments={() => setCurrentScreen('TALENT_ASSIGNMENTS')}
                onNavigateToHistory={() => setCurrentScreen('TALENT_HISTORY')}
                onNavigateToHonor={() => setCurrentScreen('TALENT_HONOR')}
                onNavigateToProfileEdit={() => setCurrentScreen('TALENT_PROFILE_EDIT')}
              />
            )}
            {currentScreen === 'TALENT_ASSIGNMENTS' && currentUser && (
              <TalentAssignments 
                talent={currentUser} 
                penugasanList={penugasan} 
                onSelectPenugasan={(id) => { setSelectedPenugasanId(id); setCurrentScreen('TALENT_DETAIL'); }}
              />
            )}
            {currentScreen === 'TALENT_DETAIL' && (
              <TalentDetail 
                penugasanId={selectedPenugasanId} 
                penugasanList={penugasan} 
                onRespondAssignment={handleRespondAssignment} 
                onNavigateToReport={(id) => { setSelectedPenugasanId(id); setCurrentScreen('TALENT_REPORT_FORM'); }}
                onBack={() => setCurrentScreen('TALENT_ASSIGNMENTS')}
              />
            )}
            {currentScreen === 'TALENT_REPORT_FORM' && (
              <TalentReportForm 
                penugasanId={selectedPenugasanId} 
                penugasanList={penugasan} 
                onSubmitReport={handleSubmitReport} 
                onCancel={() => setCurrentScreen('TALENT_DETAIL')}
              />
            )}
            {currentScreen === 'TALENT_HISTORY' && currentUser && (
              <TalentRiwayatKegiatan
                talent={currentUser}
                penugasanList={penugasan}
                onBack={() => setCurrentScreen('TALENT_DASHBOARD')}
              />
            )}
            {currentScreen === 'TALENT_HONOR' && currentUser && (
              <TalentRiwayatHonor
                talent={currentUser}
                penugasanList={penugasan}
                onBack={() => setCurrentScreen('TALENT_DASHBOARD')}
              />
            )}
            {currentScreen === 'TALENT_PROFILE_EDIT' && currentUser && (
              <TalentProfileEdit
                talent={currentUser}
                onSaveProfile={(updated) => {
                  setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
                  setCurrentUser(updated);
                }}
                onBack={() => setCurrentScreen('TALENT_DASHBOARD')}
              />
            )}

            {currentScreen === 'BENDAHARA_DASHBOARD' && (
              <BendaharaDashboard 
                penugasanList={penugasan} 
                transaksiList={transaksi}
                onUpdateHonorInline={handleUpdateHonorInline} 
                onNavigateToPaymentInput={(id) => { setSelectedPenugasanId(id); setCurrentScreen('BENDAHARA_PAYMENT_INPUT'); }}
                onAddTransaksi={(newTx) => setTransaksi(prev => [newTx, ...prev])}
                onUpdateTransaksi={(updatedTx) => setTransaksi(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t))}
              />
            )}
            {currentScreen === 'BENDAHARA_PAYMENT_INPUT' && (
              <BendaharaPaymentInput 
                penugasanId={selectedPenugasanId} 
                penugasanList={penugasan} 
                onSavePayment={handleSavePayment} 
                onCancel={() => setCurrentScreen('BENDAHARA_DASHBOARD')}
              />
            )}
            {currentScreen === 'BENDAHARA_KELOLA_KEUANGAN' && (
              <BendaharaFinancialManagement
                transaksiList={transaksi}
                onBack={() => setCurrentScreen('BENDAHARA_DASHBOARD')}
              />
            )}
            {currentScreen === 'BENDAHARA_REPORT' && (
              <BendaharaFinancialReport
                penugasanList={penugasan}
                onBack={() => setCurrentScreen('BENDAHARA_DASHBOARD')}
              />
            )}

            {currentScreen === 'ALL_PROFILE' && currentUser && (
              <ProfileScreen 
                user={currentUser} 
                onSaveProfile={(updated) => {
                  setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
                  setCurrentUser(updated);
                }}
              />
            )}

            {currentScreen === 'ALL_NOTIFICATIONS' && (
              <NotificationScreen 
                notifications={notifications} 
                onMarkAsRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, dibaca: true } : n))} 
                onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, dibaca: true })))} 
                activeRole={currentRole}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t-2 border-[#1A3C5E] bg-white py-3 text-center text-[11px] text-slate-400 font-sans">
          &copy; 2026 Paguyuban Duta Wisata Cak & Ning Surabaya. Sistem Informasi Manajemen Penugasan Talent.
        </footer>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans selection:bg-[#1A3C5E]/20">
      {/* 22 Pages Figma-style Prototype Controller Navigator Widget */}
      <PrototypeController
        currentScreen={currentScreen}
        onScreenChange={handleFigmaScreenJump}
        currentUserRole={currentRole}
        onResetData={handleResetData}
        onQuickLogin={handleQuickLogin}
      />

      {/* Render selected screen layout */}
      {renderContent()}
    </div>
  );
}
