import React, { useState } from 'react';
import { User, Penugasan, Kegiatan, Role } from '../types';
import { 
  Users, 
  UserCheck, 
  Plus, 
  Edit2, 
  Trash2, 
  Filter, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  X,
  ChevronRight,
  ClipboardList
} from 'lucide-react';

// ============================================================================
// 1. DASHBOARD SDM (4 Kartu Statistik + Tabel Kegiatan Butuh Plotting 5 Data)
// ============================================================================
interface SdmDashboardProps {
  users: User[];
  penugasanList: Penugasan[];
  kegiatanList: Kegiatan[];
  onNavigateToScreen: (screenId: string) => void;
}

export function SdmDashboard({
  users,
  penugasanList,
  kegiatanList,
  onNavigateToScreen
}: SdmDashboardProps) {
  const talents = users.filter(u => u.peran === 'Talent');
  const activeAssignments = penugasanList.filter(p => p.status === 'Dikonfirmasi').length;
  const waitingConfirmations = penugasanList.filter(p => p.status === 'Menunggu Konfirmasi').length;
  const reportsPendingValidation = penugasanList.filter(p => p.laporanStatus === 'Menunggu Validasi').length;

  // 5 Data Kegiatan Butuh Plotting
  const butuhPlotting = kegiatanList.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Dashboard SDM (Diklat)</h2>
        <p className="text-xs text-slate-500 mt-0.5">Pemantauan ketersediaan duta wisata, penugasan aktif, dan antrean validasi laporan.</p>
      </div>

      {/* 4 Kartu Statistik (Total Talent, Penugasan Aktif, Menunggu Konfirmasi, Laporan Masuk) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigateToScreen('SDM_TALENT_LIST')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Talent</span>
            <span className="text-2xl font-black text-[#1A3C5E] font-mono block">15 Orang</span>
            <p className="text-[11px] text-slate-400">Angkatan 2021 &mdash; 2025</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateToScreen('SDM_PENUGASAN_MGMT')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Penugasan Aktif</span>
            <span className="text-2xl font-black text-emerald-700 font-mono block">8 Tugas</span>
            <p className="text-[11px] text-slate-400">Terkonfirmasi di Lapangan</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateToScreen('SDM_PENUGASAN_MGMT')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Menunggu Konfirmasi</span>
            <span className="text-2xl font-black text-amber-600 font-mono block">3 Tugas</span>
            <p className="text-[11px] text-slate-400">Belum Direspons Talent</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateToScreen('SDM_VALIDATION_MGMT')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Laporan Masuk</span>
            <span className="text-2xl font-black text-purple-700 font-mono block">8 LPJ</span>
            <p className="text-[11px] text-slate-400">Siap Ditinjau & Divalidasi</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabel "Kegiatan Butuh Plotting" (5 Data) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#1A3C5E]">Kegiatan Butuh Plotting Talent</h3>
            <p className="text-[11px] text-slate-500">5 agenda penting mendatang yang memerlukan penugasan Cak & Ning segera.</p>
          </div>
          <button
            onClick={() => onNavigateToScreen('SDM_PENUGASAN_MGMT')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            Buka Penugasan <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Kegiatan</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Lokasi Tempat</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Aksi Plotting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {butuhPlotting.map((k, idx) => (
                <tr key={k.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                  <td className="p-3.5 font-bold text-[#1A3C5E] max-w-xs">{k.namaKegiatan}</td>
                  <td className="p-3.5 font-mono text-slate-600 whitespace-nowrap">{k.tanggal}</td>
                  <td className="p-3.5 text-slate-600">{k.lokasi}</td>
                  <td className="p-3.5 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 inline-block">
                      {k.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => onNavigateToScreen('SDM_PENUGASAN_MGMT')}
                      className="px-3 py-1 rounded-lg bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold text-[11px] shadow-xs cursor-pointer transition-colors"
                    >
                      Plotting Talent
                    </button>
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

// ============================================================================
// 2. HALAMAN MANAJEMEN USER (15 Data Dummy + CRUD)
// ============================================================================
interface SdmUserManagementProps {
  users: User[];
  onAddUser: (u: User) => void;
  onUpdateUser: (u: User) => void;
  onDeleteUser: (id: string) => void;
}

export function SdmUserManagement({ users, onAddUser, onUpdateUser, onDeleteUser }: SdmUserManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formNama, setFormNama] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState<Role>('Talent');
  const [formStatus, setFormStatus] = useState<'Aktif' | 'Nonaktif'>('Aktif');

  // 15 data dummy users
  const userList = users.slice(0, 15);
  const filtered = userList;

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormNama('');
    setFormUsername('');
    setFormEmail('');
    setFormRole('Talent');
    setFormStatus('Aktif');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (u: User) => {
    setEditingUser(u);
    setFormNama(u.nama);
    setFormUsername(u.username);
    setFormEmail(u.email);
    setFormRole(u.peran);
    setFormStatus(u.status);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama || !formEmail) {
      alert('Mohon isi field nama dan email!');
      return;
    }

    if (editingUser) {
      onUpdateUser({
        ...editingUser,
        nama: formNama,
        username: formUsername || formEmail.split('@')[0],
        email: formEmail,
        peran: formRole,
        status: formStatus
      });
    } else {
      onAddUser({
        id: 'u_' + Date.now(),
        nama: formNama,
        username: formUsername || formEmail.split('@')[0],
        email: formEmail,
        telepon: '0812-3456-7890',
        peran: formRole,
        status: formStatus
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-[#1A3C5E]">Manajemen User</h2>
          <p className="text-xs text-slate-500 mt-0.5">Tabel 15 akun pengguna sistem informasi Cak & Ning Surabaya.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> + Tambah User
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-xs">
        <span className="text-xs text-slate-500 font-medium">Daftar Akun Pengguna Terdaftar</span>
        <span className="text-xs text-slate-500 font-mono">Total: <strong>{filtered.length}</strong> Akun</span>
      </div>

      {/* Tabel dengan kolom: No, Nama Lengkap, Username, Email, Peran (Role), Status, Aksi */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Lengkap</th>
                <th className="p-3.5">Username</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Peran (Role)</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((user, idx) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                  <td className="p-3.5 font-bold text-[#1A3C5E]">{user.nama}</td>
                  <td className="p-3.5 font-mono text-slate-600">{user.username}</td>
                  <td className="p-3.5 text-slate-600">{user.email}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#1A3C5E] border border-blue-200 inline-block">
                      {user.peran}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      user.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus akun ${user.nama}?`)) {
                            onDeleteUser(user.id);
                          }
                        }}
                        className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal CRUD User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#1A3C5E]">
                {editingUser ? 'Edit Akun Pengguna' : 'Tambah User Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Cak Kevin Surya"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Username *</label>
                <input
                  type="text"
                  placeholder="kevin_surya"
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="kevin@cakning.org"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Peran (Role) *</label>
                  <select
                    value={formRole}
                    onChange={(e: any) => setFormRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:border-[#1A3C5E]"
                  >
                    <option value="Talent">Talent</option>
                    <option value="SDM">SDM</option>
                    <option value="Humas">Humas</option>
                    <option value="Bendahara">Bendahara</option>
                    <option value="Ketua Umum">Ketua Umum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status Akun</label>
                  <select
                    value={formStatus}
                    onChange={(e: any) => setFormStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:border-[#1A3C5E]"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#1A3C5E] hover:bg-slate-800 text-white font-semibold cursor-pointer"
                >
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3. HALAMAN DAFTAR TALENT KHUSUS SDM (15 Data + Filter Angkatan & Keaktifan)
// ============================================================================
interface SdmTalentListProps {
  talents: User[];
}

export function SdmTalentList({ talents }: SdmTalentListProps) {
  const [filterAngkatan, setFilterAngkatan] = useState('Semua');
  const [filterKeaktifan, setFilterKeaktifan] = useState('Semua');

  // 15 data dummy talent
  const talentList = talents.filter(u => u.peran === 'Talent').slice(0, 15);
  const filtered = talentList.filter(t => {
    const matchAngkatan = filterAngkatan === 'Semua' || t.angkatan === filterAngkatan;
    let matchKeaktifan = true;
    if (filterKeaktifan === 'Aktif Tinggi') {
      matchKeaktifan = (t.keaktifan30Hari || 0) >= 6;
    } else if (filterKeaktifan === 'Aktif Sedang') {
      matchKeaktifan = (t.keaktifan30Hari || 0) >= 3 && (t.keaktifan30Hari || 0) < 6;
    } else if (filterKeaktifan === 'Rendah') {
      matchKeaktifan = (t.keaktifan30Hari || 0) < 3;
    }
    return matchAngkatan && matchKeaktifan;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Daftar Talent (Khusus SDM)</h2>
        <p className="text-xs text-slate-500 mt-0.5">Tabel 15 talent mengenai keaktifan bertugas 30 hari terakhir dan honorarium yang diterima.</p>
      </div>

      {/* Dropdown Filter di Atas Tabel */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Filter Angkatan:</span>
            <select
              value={filterAngkatan}
              onChange={(e) => setFilterAngkatan(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#1A3C5E] font-medium"
            >
              <option value="Semua">Semua Angkatan</option>
              <option value="Cak Ning 2025">Cak Ning 2025</option>
              <option value="Cak Ning 2024">Cak Ning 2024</option>
              <option value="Cak Ning 2023">Cak Ning 2023</option>
              <option value="Cak Ning 2022">Cak Ning 2022</option>
              <option value="Cak Ning 2021">Cak Ning 2021</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Tingkat Keaktifan:</span>
            <select
              value={filterKeaktifan}
              onChange={(e) => setFilterKeaktifan(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#1A3C5E] font-medium"
            >
              <option value="Semua">Semua Keaktifan</option>
              <option value="Aktif Tinggi">Tinggi (&ge; 6x Tugas)</option>
              <option value="Aktif Sedang">Sedang (3-5x Tugas)</option>
              <option value="Rendah">Rendah (&lt; 3x Tugas)</option>
            </select>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-mono">Total: <strong>{filtered.length}</strong> Talent</span>
      </div>

      {/* Tabel dengan kolom: Nama, Angkatan, Keaktifan 30 Hari (Angka), Honor 30 Hari (Rp), Aksi */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Talent</th>
                <th className="p-3.5">Angkatan</th>
                <th className="p-3.5 text-center">Keaktifan 30 Hari</th>
                <th className="p-3.5 text-right">Honor 30 Hari</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((t, idx) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                  <td className="p-3.5 font-bold text-[#1A3C5E]">{t.nama}</td>
                  <td className="p-3.5 font-mono text-slate-600">{t.angkatan}</td>
                  <td className="p-3.5 text-center">
                    <span className="font-mono font-bold text-[#1A3C5E] px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 inline-block">
                      {t.keaktifan30Hari || 5} Tugas
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                    Rp {(t.totalHonor30Hari || 1750000).toLocaleString('id-ID')}
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => alert(`Detail profil ${t.nama} (${t.angkatan})\nSpesialisasi: ${t.spesialisasi || 'MC & Protokoler'}`)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] cursor-pointer"
                    >
                      Lihat Rincian
                    </button>
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

// ============================================================================
// 4. HALAMAN PENUGASAN TALENT (12 Data Dummy + CRUD)
// ============================================================================
interface SdmPenugasanManagementProps {
  penugasanList: Penugasan[];
  kegiatanList: Kegiatan[];
  talents: User[];
  onAddPenugasan: (p: Penugasan) => void;
  onUpdatePenugasan: (p: Penugasan) => void;
  onDeletePenugasan: (id: string) => void;
}

export function SdmPenugasanManagement({
  penugasanList,
  kegiatanList,
  talents,
  onAddPenugasan,
  onUpdatePenugasan,
  onDeletePenugasan
}: SdmPenugasanManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Penugasan | null>(null);

  const [formKegiatanNama, setFormKegiatanNama] = useState('');
  const [formTanggal, setFormTanggal] = useState('');
  const [formTalentNama, setFormTalentNama] = useState('');
  const [formStatus, setFormStatus] = useState<'Menunggu Konfirmasi' | 'Dikonfirmasi' | 'Selesai' | 'Ditolak'>('Menunggu Konfirmasi');

  // 12 data dummy
  const list12 = penugasanList.slice(0, 12);
  const filtered = list12;

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormKegiatanNama(kegiatanList[0]?.namaKegiatan || 'Penyambutan Tamu di Balai Kota');
    setFormTanggal(new Date().toISOString().split('T')[0]);
    setFormTalentNama(talents[0]?.nama || 'Cak Aditya Pratama');
    setFormStatus('Menunggu Konfirmasi');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Penugasan) => {
    setEditingItem(p);
    setFormKegiatanNama(p.kegiatanNama);
    setFormTanggal(p.tanggal);
    setFormTalentNama(p.talentNama);
    setFormStatus(p.status);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formKegiatanNama || !formTalentNama) {
      alert('Mohon lengkapi field nama kegiatan dan talent!');
      return;
    }

    if (editingItem) {
      onUpdatePenugasan({
        ...editingItem,
        kegiatanNama: formKegiatanNama,
        tanggal: formTanggal,
        talentNama: formTalentNama,
        status: formStatus
      });
    } else {
      onAddPenugasan({
        id: 'p_' + Date.now(),
        kegiatanId: 'k1',
        kegiatanNama: formKegiatanNama,
        tanggal: formTanggal,
        lokasi: 'Balai Kota Surabaya',
        talentId: 'u4',
        talentNama: formTalentNama,
        status: formStatus,
        honor: 350000,
        statusBayar: 'Belum Dibayar'
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-[#1A3C5E]">Penugasan Talent</h2>
          <p className="text-xs text-slate-500 mt-0.5">Tabel 12 jadwal penugasan dan status respon duta wisata.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> + Buat Penugasan Baru
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-xs">
        <span className="text-xs text-slate-500 font-medium">Jadwal Penugasan Duta Wisata</span>
        <span className="text-xs text-slate-500 font-mono">Total: <strong>{filtered.length}</strong> Penugasan</span>
      </div>

      {/* Tabel dengan kolom: Nama Kegiatan, Tanggal, Talent Terpilih, Status Penugasan, Aksi */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Kegiatan</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Talent Terpilih</th>
                <th className="p-3.5 text-center">Status Penugasan</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item, idx) => {
                let badgeClass = 'bg-blue-50 text-[#1A3C5E] border-blue-200';
                if (item.status === 'Selesai') badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                if (item.status === 'Dikonfirmasi') badgeClass = 'bg-indigo-50 text-indigo-800 border-indigo-200';
                if (item.status === 'Menunggu Konfirmasi') badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';
                if (item.status === 'Ditolak') badgeClass = 'bg-red-50 text-red-800 border-red-200';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="p-3.5 font-bold text-[#1A3C5E] max-w-xs">{item.kegiatanNama}</td>
                    <td className="p-3.5 font-mono text-slate-600 whitespace-nowrap">{item.tanggal}</td>
                    <td className="p-3.5 font-bold text-slate-800">{item.talentNama}</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block ${badgeClass}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus penugasan ${item.talentNama}?`)) {
                              onDeletePenugasan(item.id);
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Penugasan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#1A3C5E]">
                {editingItem ? 'Edit Penugasan Talent' : 'Buat Penugasan Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Kegiatan *</label>
                <input
                  type="text"
                  required
                  value={formKegiatanNama}
                  onChange={(e) => setFormKegiatanNama(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Tanggal *</label>
                <input
                  type="date"
                  required
                  value={formTanggal}
                  onChange={(e) => setFormTanggal(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Talent Terpilih *</label>
                <select
                  value={formTalentNama}
                  onChange={(e) => setFormTalentNama(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:border-[#1A3C5E]"
                >
                  {talents.map(t => (
                    <option key={t.id} value={t.nama}>{t.nama} ({t.angkatan})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Status Penugasan</label>
                <select
                  value={formStatus}
                  onChange={(e: any) => setFormStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:border-[#1A3C5E]"
                >
                  <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                  <option value="Dikonfirmasi">Dikonfirmasi</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#1A3C5E] hover:bg-slate-800 text-white font-semibold cursor-pointer"
                >
                  Simpan Penugasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 5. HALAMAN VALIDASI LAPORAN (List Card 8 Data Dummy + Tombol Lihat Detail & Validasi)
// ============================================================================
interface SdmReportValidationProps {
  penugasanList: Penugasan[];
  onValidateReport: (penugasanId: string, status: 'Disetujui' | 'Revisi', catatan?: string) => void;
}

export function SdmReportValidation({ penugasanList, onValidateReport }: SdmReportValidationProps) {
  const [selectedReport, setSelectedReport] = useState<Penugasan | null>(null);

  // 8 Data dummy laporan
  const reports = penugasanList.filter(p => p.laporanDeskripsi || p.laporanStatus).slice(0, 8);

  const handleApprove = (id: string) => {
    onValidateReport(id, 'Disetujui');
    alert('Laporan berhasil disetujui! Status otomatis diteruskan ke Bendahara.');
    setSelectedReport(null);
  };

  const handleReject = (id: string) => {
    const catatan = prompt('Tuliskan alasan penolakan / catatan revisi untuk talent:');
    if (catatan) {
      onValidateReport(id, 'Revisi', catatan);
      alert('Laporan dikembalikan ke talent untuk revisi.');
      setSelectedReport(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Validasi Laporan Penugasan</h2>
        <p className="text-xs text-slate-500 mt-0.5">Daftar 8 laporan pertanggungjawaban (LPJ) kegiatan dari duta wisata yang membutuhkan verifikasi.</p>
      </div>

      {/* List Card Laporan (Nama Talent, Nama Kegiatan, Tanggal Upload) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r) => {
          const isPending = r.laporanStatus === 'Menunggu Validasi';
          const isApproved = r.laporanStatus === 'Disetujui';

          return (
            <div 
              key={r.id} 
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#1A3C5E] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-base text-[#1A3C5E]">{r.talentNama}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    isApproved ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {r.laporanStatus || 'Menunggu Validasi'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Nama Kegiatan</span>
                  <p className="font-semibold text-xs text-slate-800">{r.kegiatanNama}</p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Upload: {r.laporanTanggal || r.tanggal}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> {r.laporanBuktiLink || 'lpj_kegiatan.pdf'}
                  </span>
                </div>
              </div>

              {/* Tombol "Lihat Detail & Validasi" di setiap card */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => setSelectedReport(r)}
                  className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Lihat Detail & Validasi
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail & Validasi */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#1A3C5E]">Verifikasi Laporan Kegiatan</h3>
                <p className="text-xs text-slate-500">{selectedReport.kegiatanNama}</p>
              </div>
              <button onClick={() => setSelectedReport(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Nama Talent</span>
                  <strong className="text-slate-800 text-sm">{selectedReport.talentNama}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Tanggal Kegiatan</span>
                  <span className="font-mono text-slate-700 text-sm">{selectedReport.tanggal}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Deskripsi Kegiatan</span>
                <p className="text-slate-700 p-3 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed">
                  {selectedReport.laporanDeskripsi || 'Telah melaksanakan tugas penyambutan tamu dengan lancar dan berbusana adat lengkap.'}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Dokumentasi / Bukti Foto</span>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[#1A3C5E] font-mono flex items-center justify-between">
                  <span>{selectedReport.laporanBuktiLink || 'bukti_dokumentasi_foto.jpg'}</span>
                  <span className="text-[10px] font-bold bg-[#1A3C5E] text-white px-2 py-0.5 rounded">Lampiran Sah</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
              >
                Tutup
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleReject(selectedReport.id)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
                >
                  Tolak / Revisi
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(selectedReport.id)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  Setujui Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
