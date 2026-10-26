import React, { useState } from 'react';
import { User, Kegiatan, Penugasan, Role, Notification } from '../types';
import { Users, FileText, CheckSquare, Plus, Edit2, Trash2, Eye, UserPlus, ShieldAlert, CheckCircle, XCircle, Calendar, MapPin, DollarSign, Award, ThumbsUp, ThumbsDown, Clipboard, Check, RefreshCw } from 'lucide-react';
import { WireframeImage } from './CommonScreens';

// ==========================================
// 2. DASHBOARD SDM SCREEN
// ==========================================
interface SdmDashboardProps {
  users: User[];
  kegiatanList: Kegiatan[];
  penugasanList: Penugasan[];
  onNavigateToPlotting: (kegiatanId: string) => void;
  onNavigateToUserManagement: () => void;
  onNavigateToPenugasanManagement?: () => void;
  onNavigateToReportValidation?: () => void;
}

export function SdmDashboard({ 
  users, 
  kegiatanList, 
  penugasanList, 
  onNavigateToPlotting,
  onNavigateToUserManagement,
  onNavigateToPenugasanManagement,
  onNavigateToReportValidation
}: SdmDashboardProps) {
  // Stats calculations
  const totalTalents = users.filter(u => u.peran === 'Talent').length;
  const activeAssignments = penugasanList.filter(p => p.status === 'Dikonfirmasi').length;
  const waitingConfirmations = penugasanList.filter(p => p.status === 'Menunggu Konfirmasi').length;
  const reportsPendingValidation = penugasanList.filter(p => p.laporanStatus === 'Menunggu Validasi').length;

  const butuhPlottingKegiatan = kegiatanList.filter(k => k.status === 'Butuh Plotting');

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <div className="border-b border-[#E0E0E0] pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Dashboard SDM (Diklat)</h2>
          <p className="text-xs text-slate-500">Pemantauan ketersediaan talent, pengumuman, dan plotting penugasan aktif.</p>
        </div>
        <div className="flex gap-2 text-xs">
          <button 
            onClick={onNavigateToPenugasanManagement}
            className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1.5 px-3 uppercase tracking-wider cursor-pointer"
          >
            Manajemen Penugasan
          </button>
          <button 
            onClick={onNavigateToReportValidation}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 px-3 uppercase tracking-wider cursor-pointer flex items-center gap-1"
          >
            Validasi Laporan ({reportsPendingValidation})
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Database Talent</span>
            <span className="text-xl font-bold text-[#1A3C5E] block font-mono">{totalTalents} Orang</span>
          </div>
          <div className="bg-slate-100 border border-[#1A3C5E] p-1.5 text-[#1A3C5E]">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Penugasan Berjalan</span>
            <span className="text-xl font-bold text-[#2E7D32] block font-mono">{activeAssignments} Tugas</span>
          </div>
          <div className="bg-slate-100 border border-[#1A3C5E] p-1.5 text-[#2E7D32]">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Menunggu Konfirmasi</span>
            <span className="text-xl font-bold text-amber-600 block font-mono">{waitingConfirmations} Tugas</span>
          </div>
          <div className="bg-slate-100 border border-[#1A3C5E] p-1.5 text-amber-600">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border-2 border-amber-600 p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Laporan Baru</span>
            <span className="text-xl font-bold text-amber-700 block font-mono">{reportsPendingValidation} Menunggu</span>
          </div>
          <div className="bg-amber-50 border border-amber-600 p-1.5 text-amber-700">
            <Clipboard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table: Kegiatan Butuh Plotting */}
      <div className="bg-white border-2 border-[#1A3C5E] p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm uppercase tracking-tight text-[#1A3C5E]">Daftar Kegiatan Butuh Plotting</h3>
          <span className="text-[11px] font-mono text-slate-500">
            Total: {butuhPlottingKegiatan.length} Kegiatan
          </span>
        </div>

        {butuhPlottingKegiatan.length === 0 ? (
          <div className="text-center py-8 text-xs border border-dashed border-[#E0E0E0] text-slate-500 bg-slate-50">
            Tidak ada kegiatan baru yang membutuhkan plotting talent saat ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nama Kegiatan</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Tanggal Pelaksanaan</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Lokasi</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status Penugasan</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {butuhPlottingKegiatan.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-800">{k.namaKegiatan}</td>
                    <td className="p-2.5 font-mono text-slate-600">{k.tanggal}</td>
                    <td className="p-2.5 text-slate-600">{k.lokasi}</td>
                    <td className="p-2.5">
                      <span className="bg-amber-50 text-amber-800 border border-amber-300 font-mono text-[9px] px-2 py-0.5 uppercase tracking-wide font-bold">
                        Belum Diplotting
                      </span>
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => onNavigateToPlotting(k.id)}
                        className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold px-3 py-1 text-[11px] cursor-pointer uppercase transition-colors"
                      >
                        Mulai Plotting
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Shortcuts/Guide panel */}
      <div className="border border-[#E0E0E0] p-4 bg-slate-50 grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-bold text-[#1A3C5E] uppercase mb-1">Panduan Alur Kerja SDM:</h4>
          <ul className="list-decimal pl-4 text-[11px] space-y-1.5 text-slate-600">
            <li>Humas memasukkan agenda kegiatan eksternal atau permintaan klien.</li>
            <li>Kegiatan tersebut muncul pada tabel "Butuh Plotting" di atas.</li>
            <li>SDM memilih bakat (talent) yang berstatus <strong>Tersedia</strong> sesuai kuota.</li>
            <li>Talent melakukan konfirmasi (Terima/Tolak), melapor, dan SDM memvalidasi laporannya.</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-end border-l border-[#E0E0E0] pl-4">
          <p className="text-[11px] text-slate-500 mb-2.5 text-right">Perlu mendaftarkan anggota baru atau menyesuaikan otorisasi peran?</p>
          <button
            onClick={onNavigateToUserManagement}
            className="border-2 border-[#1A3C5E] hover:bg-[#1A3C5E] hover:text-white text-[#1A3C5E] font-bold py-1.5 px-4 text-xs uppercase tracking-wider cursor-pointer transition-colors"
          >
            Kelola User Akun
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. HALAMAN PLOTTING TALENT
// ==========================================
interface SdmPlottingProps {
  kegiatanId: string;
  kegiatanList: Kegiatan[];
  talents: User[];
  penugasanList: Penugasan[];
  onConfirmPlotting: (kegiatanId: string, selectedTalentIds: string[]) => void;
  onCancel: () => void;
}

export function SdmPlotting({
  kegiatanId,
  kegiatanList,
  talents,
  penugasanList,
  onConfirmPlotting,
  onCancel
}: SdmPlottingProps) {
  const selectedKegiatan = kegiatanList.find(k => k.id === kegiatanId) || kegiatanList[0];
  const [selectedTalents, setSelectedTalents] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  const checkAvailability = (talentId: string) => {
    const t = talents.find(u => u.id === talentId);
    if (!t || t.status === 'Nonaktif') return { status: 'Sibuk', reason: 'Anggota Nonaktif' };
    
    // Check if talent already has assignment on the same date
    const hasConflict = penugasanList.some(
      p => p.talentId === talentId && p.tanggal === selectedKegiatan.tanggal && p.status !== 'Ditolak'
    );
    if (hasConflict) return { status: 'Sibuk', reason: 'Ada Agenda Bentrok' };
    
    return { status: 'Tersedia', reason: 'Tersedia' };
  };

  const handleToggleSelect = (talentId: string) => {
    const availability = checkAvailability(talentId);
    if (availability.status === 'Sibuk') {
      alert(`Peringatan: Talent ini berstatus SIBUK (${availability.reason}). Anda masih bisa mengusulkannya untuk simulasi prototyping ini.`);
    }

    if (selectedTalents.includes(talentId)) {
      setSelectedTalents(selectedTalents.filter(id => id !== talentId));
    } else {
      setSelectedTalents([...selectedTalents, talentId]);
    }
  };

  const handleConfirm = () => {
    if (selectedTalents.length === 0) {
      alert('Pilih minimal 1 talent sebelum melakukan konfirmasi!');
      return;
    }
    onConfirmPlotting(selectedKegiatan.id, selectedTalents);
    setSuccessMsg('Plotting berhasil disimpan! Notifikasi penugasan dikirim ke masing-masing talent.');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <div className="border-b border-[#E0E0E0] pb-4">
        <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Plotting Talent Surabaya</h2>
        <p className="text-xs text-slate-500">Penugasan mandiri Duta Wisata Cak & Ning ke agenda kegiatan.</p>
      </div>

      {successMsg && (
        <div className="bg-green-50 text-green-800 border border-green-300 p-3 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-700" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Info Box Kegiatan */}
      <div className="bg-slate-50 border-2 border-[#1A3C5E] p-4 space-y-2">
        <span className="text-[10px] font-bold bg-[#1A3C5E] text-white px-2 py-0.5 uppercase font-mono">Informasi Kegiatan</span>
        <div className="grid grid-cols-3 gap-4 pt-1.5">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Nama Kegiatan</span>
            <span className="text-xs font-bold text-slate-800">{selectedKegiatan?.namaKegiatan}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Tanggal Pelaksanaan</span>
            <span className="text-xs font-mono font-bold text-slate-800">{selectedKegiatan?.tanggal}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Lokasi / Tempat</span>
            <span className="text-xs font-bold text-slate-800">{selectedKegiatan?.lokasi}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-[#E0E0E0]">
          <span className="text-[10px] text-slate-500 uppercase block font-bold">Deskripsi Tugas</span>
          <p className="text-xs text-slate-600 italic mt-0.5">{selectedKegiatan?.deskripsi}</p>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="bg-white border border-[#E0E0E0] p-3 flex justify-between items-center text-xs">
        <div>
          <span>Talent terpilih saat ini: </span>
          <strong className="text-[#1A3C5E] font-mono text-sm bg-slate-100 px-2 py-0.5 ml-1 border">
            {selectedTalents.length} Talent
          </strong>
        </div>
        <div className="flex gap-2">
          {selectedTalents.map(id => {
            const name = talents.find(t => t.id === id)?.nama || '';
            return (
              <span key={id} className="bg-slate-100 border border-[#1A3C5E] px-2 py-0.5 text-[10px] font-mono">
                {name.split(' ')[1] || name}
              </span>
            );
          })}
        </div>
      </div>

      {/* Table: Daftar Talent */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        <h3 className="font-bold text-xs uppercase text-[#1A3C5E] mb-3 tracking-wide">Pilih Talent dari Database Anggota</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nama Talent</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Angkatan</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Kontak</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status Ketersediaan</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E0E0]">
              {talents.map((t) => {
                const avail = checkAvailability(t.id);
                const isChecked = selectedTalents.includes(t.id);
                return (
                  <tr key={t.id} className={`hover:bg-slate-50 ${isChecked ? 'bg-blue-50/50' : ''}`}>
                    <td className="p-2.5 font-bold text-slate-800">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(t.id)}
                          className="accent-[#1A3C5E] cursor-pointer"
                        />
                        <span>{t.nama}</span>
                      </div>
                    </td>
                    <td className="p-2.5 font-mono text-slate-600">{t.angkatan || 'Cak Ning'}</td>
                    <td className="p-2.5 text-slate-500 font-mono text-[11px]">{t.telepon}</td>
                    <td className="p-2.5">
                      {avail.status === 'Tersedia' ? (
                        <span className="text-green-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Tersedia
                        </span>
                      ) : (
                        <span className="text-red-700 font-bold flex items-center gap-1" title={avail.reason}>
                          <XCircle className="w-3.5 h-3.5" /> Sibuk ({avail.reason})
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => handleToggleSelect(t.id)}
                        className={`font-bold px-3 py-1 text-[10px] uppercase cursor-pointer border ${
                          isChecked 
                            ? 'bg-red-50 hover:bg-red-100 border-red-300 text-red-700' 
                            : 'bg-white hover:bg-slate-100 border-[#1A3C5E] text-[#1A3C5E]'
                        }`}
                      >
                        {isChecked ? 'Batalkan' : 'Pilih'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold py-2 px-6 text-xs uppercase tracking-wider cursor-pointer"
        >
          Batal
        </button>
        <button
          onClick={handleConfirm}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-6 text-xs uppercase tracking-wider cursor-pointer border-none"
        >
          Konfirmasi Plotting
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. HALAMAN MANAJEMEN USER (DENGAN EDIT)
// ==========================================
interface SdmUserProps {
  users: User[];
  onAddUser: (u: User) => void;
  onUpdateUser?: (u: User) => void;
  onDeleteUser: (id: string) => void;
}

export function SdmUserManagement({ users, onAddUser, onUpdateUser, onDeleteUser }: SdmUserProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  
  // Form states
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');
  const [peran, setPeran] = useState<Role>('Talent');
  const [angkatan, setAngkatan] = useState('Cak Ning 2025');
  const [status, setStatus] = useState<'Aktif' | 'Nonaktif'>('Aktif');

  // Open edit mode
  const handleStartEdit = (user: User) => {
    setEditingUser(user);
    setNama(user.nama);
    setUsername(user.username);
    setEmail(user.email);
    setTelepon(user.telepon);
    setPeran(user.peran);
    setStatus(user.status);
    setAngkatan(user.angkatan || 'Cak Ning 2025');
    setShowAddForm(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !username || !email || !telepon) {
      alert('Mohon isi semua bidang form!');
      return;
    }

    if (editingUser) {
      const updated: User = {
        ...editingUser,
        nama,
        username: username.toLowerCase().trim().replace(/\s+/g, '_'),
        email,
        telepon,
        peran,
        status,
        angkatan: peran === 'Talent' ? angkatan : undefined
      };
      if (onUpdateUser) onUpdateUser(updated);
      alert('User berhasil diperbarui!');
      setEditingUser(null);
    } else {
      const newUser: User = {
        id: 'u_' + Date.now(),
        username: username.toLowerCase().trim().replace(/\s+/g, '_'),
        nama,
        email,
        telepon,
        peran,
        status: 'Aktif',
        angkatan: peran === 'Talent' ? angkatan : undefined,
      };
      onAddUser(newUser);
      alert('User berhasil didaftarkan!');
      setShowAddForm(false);
    }
    
    // reset
    setNama('');
    setUsername('');
    setEmail('');
    setTelepon('');
    setStatus('Aktif');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Manajemen User Akun</h2>
          <p className="text-xs text-slate-500">Kelola kredensial login, data identitas, dan otorisasi peran sistem.</p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowAddForm(!showAddForm);
            // reset form fields
            setNama('');
            setUsername('');
            setEmail('');
            setTelepon('');
            setPeran('Talent');
            setAngkatan('Cak Ning 2025');
          }}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-4 text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border-none"
        >
          <UserPlus className="w-4 h-4" /> {showAddForm ? 'Tutup Form' : 'Tambah User Baru'}
        </button>
      </div>

      {/* Wireframe Add/Edit Form */}
      {(showAddForm || editingUser) && (
        <form onSubmit={handleSave} className="bg-slate-50 border-2 border-[#1A3C5E] p-5 space-y-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] tracking-wide border-b border-slate-300 pb-2">
            {editingUser ? `Edit Akun User: ${editingUser.nama}` : 'Form Tambah User Baru'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nama Lengkap</label>
              <input
                type="text"
                placeholder="misal: Cak Ahmad Dhani"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Username Login</label>
              <input
                type="text"
                placeholder="misal: ahmad_dhani"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Alamat Email</label>
              <input
                type="email"
                placeholder="misal: ahmad@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nomor Telepon</label>
              <input
                type="text"
                placeholder="misal: 08123456789"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Peran Akses (Role)</label>
              <select
                value={peran}
                onChange={(e) => setPeran(e.target.value as Role)}
                className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs bg-white"
              >
                <option value="Talent">Talent (Cak/Ning)</option>
                <option value="SDM">SDM (Diklat)</option>
                <option value="Humas">Humas</option>
                <option value="Bendahara">Bendahara</option>
              </select>
            </div>
            {editingUser && (
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Status Keaktifan</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'Aktif' | 'Nonaktif')}
                  className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs bg-white"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>
            )}
            {peran === 'Talent' && (
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Angkatan Duta Wisata</label>
                <input
                  type="text"
                  placeholder="misal: Cak Ning 2025"
                  value={angkatan}
                  onChange={(e) => setAngkatan(e.target.value)}
                  className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs bg-white"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-300">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingUser(null);
              }}
              className="border-2 border-slate-300 hover:bg-slate-200 font-bold px-4 py-1.5 text-xs cursor-pointer text-slate-700 bg-white"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold px-4 py-1.5 text-xs cursor-pointer border-none"
            >
              {editingUser ? 'Simpan Perubahan' : 'Daftarkan Akun'}
            </button>
          </div>
        </form>
      )}

      {/* User Database Table */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        <h3 className="font-bold text-xs uppercase text-[#1A3C5E] mb-3 tracking-wide">Daftar Akun Pengguna</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nama Lengkap</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Username</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Email / Telepon</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Peran</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status Akun</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E0E0]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-800">
                    <div className="flex flex-col">
                      <span>{u.nama}</span>
                      {u.angkatan && <span className="text-[10px] text-slate-500 font-mono italic">{u.angkatan}</span>}
                    </div>
                  </td>
                  <td className="p-2.5 font-mono text-slate-600">{u.username}</td>
                  <td className="p-2.5 text-slate-600">
                    <div className="flex flex-col font-mono text-[11px]">
                      <span>{u.email}</span>
                      <span className="text-slate-400">{u.telepon}</span>
                    </div>
                  </td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase border ${
                      u.peran === 'SDM' ? 'bg-[#1A3C5E] text-white border-[#1A3C5E]' :
                      u.peran === 'Humas' ? 'bg-indigo-50 border-indigo-200 text-indigo-800' :
                      u.peran === 'Bendahara' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                      'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}>
                      {u.peran}
                    </span>
                  </td>
                  <td className="p-2.5">
                    <span className={`font-bold font-mono text-[10px] ${u.status === 'Aktif' ? 'text-green-700' : 'text-slate-400'}`}>
                      ● {u.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-center">
                    <div className="flex justify-center gap-1.5">
                      <button 
                        onClick={() => setViewingUser(u)}
                        title="Lihat Detail Profil" 
                        className="p-1 hover:bg-slate-100 border border-slate-300 text-slate-700 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleStartEdit(u)}
                        title="Edit User" 
                        className="p-1 hover:bg-slate-100 border border-slate-300 text-slate-700 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Apakah Anda yakin ingin menghapus user ${u.nama} dari simulasi?`)) {
                            onDeleteUser(u.id);
                          }
                        }}
                        title="Hapus User" 
                        className="p-1 hover:bg-red-50 border border-red-200 text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {viewingUser && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white border-2 border-[#1A3C5E] max-w-md w-full p-6 space-y-4 font-sans">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E]">Profil Akun Pengguna</h3>
              <button onClick={() => setViewingUser(null)} className="p-1 hover:bg-slate-100 border cursor-pointer"><XCircle className="w-4 h-4" /></button>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-center mb-3">
                <WireframeImage label={`Avatar: ${viewingUser.nama}`} className="w-24 h-24 border border-[#1A3C5E]" />
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b font-mono">
                <span className="text-slate-400 font-bold">NAMA</span>
                <span className="col-span-2 text-slate-800 font-sans font-bold">{viewingUser.nama}</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b font-mono">
                <span className="text-slate-400 font-bold">USERNAME</span>
                <span className="col-span-2 text-slate-800">{viewingUser.username}</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b font-mono">
                <span className="text-slate-400 font-bold">ROLE</span>
                <span className="col-span-2 text-slate-800 font-bold text-[#1A3C5E] uppercase">{viewingUser.peran}</span>
              </div>
              {viewingUser.angkatan && (
                <div className="grid grid-cols-3 py-1.5 border-b font-mono">
                  <span className="text-slate-400 font-bold">ANGKATAN</span>
                  <span className="col-span-2 text-slate-800 font-sans">{viewingUser.angkatan}</span>
                </div>
              )}
              <div className="grid grid-cols-3 py-1.5 border-b font-mono">
                <span className="text-slate-400 font-bold">EMAIL</span>
                <span className="col-span-2 text-slate-800">{viewingUser.email}</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b font-mono">
                <span className="text-slate-400 font-bold">TELEPON</span>
                <span className="col-span-2 text-slate-800">{viewingUser.telepon}</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 font-mono">
                <span className="text-slate-400 font-bold">STATUS</span>
                <span className={`col-span-2 font-bold ${viewingUser.status === 'Aktif' ? 'text-green-700' : 'text-slate-400'}`}>{viewingUser.status.toUpperCase()}</span>
              </div>
            </div>

            <div className="pt-2 border-t flex justify-end">
              <button onClick={() => setViewingUser(null)} className="bg-[#1A3C5E] text-white font-bold text-xs uppercase px-4 py-1.5 cursor-pointer">
                Tutup Profil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// NEW: DAFTAR PENUGASAN (SDM)
// ==========================================
interface SdmPenugasanManagementProps {
  penugasanList: Penugasan[];
  kegiatanList: Kegiatan[];
  talents: User[];
  onAddPenugasan: (p: Penugasan) => void;
  onDeletePenugasan: (id: string) => void;
  onBack: () => void;
}

export function SdmPenugasanManagement({ 
  penugasanList, 
  kegiatanList, 
  talents, 
  onAddPenugasan, 
  onDeletePenugasan,
  onBack 
}: SdmPenugasanManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('Semua');

  // Form states
  const [selectedKegiatanId, setSelectedKegiatanId] = useState('');
  const [selectedTalentId, setSelectedTalentId] = useState('');
  const [honorNominal, setHonorNominal] = useState(500000);

  const handleCreatePenugasan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKegiatanId || !selectedTalentId) {
      alert('Mohon pilih kegiatan dan talent!');
      return;
    }

    const keg = kegiatanList.find(k => k.id === selectedKegiatanId);
    const tal = talents.find(t => t.id === selectedTalentId);

    if (!keg || !tal) return;

    // Check conflict
    const conflict = penugasanList.some(p => p.talentId === selectedTalentId && p.tanggal === keg.tanggal && p.status !== 'Ditolak');
    if (conflict) {
      alert(`Peringatan: ${tal.nama} memiliki agenda bentrok pada tanggal ${keg.tanggal}!`);
    }

    const newPenugasan: Penugasan = {
      id: 'p_' + Date.now(),
      kegiatanId: keg.id,
      kegiatanNama: keg.namaKegiatan,
      tanggal: keg.tanggal,
      lokasi: keg.lokasi,
      talentId: tal.id,
      talentNama: tal.nama,
      status: 'Menunggu Konfirmasi',
      honor: honorNominal,
      statusBayar: 'Belum Dibayar',
    };

    onAddPenugasan(newPenugasan);
    alert('Penugasan berhasil ditambahkan!');
    setShowAddForm(false);
  };

  const filteredList = penugasanList.filter(p => {
    if (filterStatus === 'Semua') return true;
    return p.status === filterStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Manajemen Penugasan Talent</h2>
          <p className="text-xs text-slate-500">Buat penugasan baru, hapus plotting, atau pantau status respon konfirmasi anggota.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onBack}
            className="border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold py-1.5 px-4 text-xs uppercase cursor-pointer"
          >
            Kembali ke Dashboard
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1.5 px-4 text-xs uppercase flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> {showAddForm ? 'Tutup Form' : 'Tambah Penugasan'}
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreatePenugasan} className="bg-slate-50 border-2 border-[#1A3C5E] p-5 space-y-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b border-slate-300 pb-2">Manual Form Penugasan</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Pilih Kegiatan Agenda</label>
              <select
                value={selectedKegiatanId}
                onChange={(e) => setSelectedKegiatanId(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white"
                required
              >
                <option value="">-- Pilih Kegiatan --</option>
                {kegiatanList.map(k => (
                  <option key={k.id} value={k.id}>{k.namaKegiatan} ({k.tanggal})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Pilih Talent (Cak/Ning)</label>
              <select
                value={selectedTalentId}
                onChange={(e) => setSelectedTalentId(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white"
                required
              >
                <option value="">-- Pilih Anggota --</option>
                {talents.map(t => (
                  <option key={t.id} value={t.id}>{t.nama} ({t.status})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Estimasi Honorarium (Rp)</label>
              <input
                type="number"
                value={honorNominal}
                onChange={(e) => setHonorNominal(Number(e.target.value))}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white font-mono"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-300">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="border-2 border-slate-300 bg-white text-slate-700 font-bold px-4 py-1.5 text-xs cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#1A3C5E] text-white font-bold px-4 py-1.5 text-xs cursor-pointer"
            >
              Simpan Plotting
            </button>
          </div>
        </form>
      )}

      {/* Filter and Content */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] tracking-wide">Daftar Plotting Penugasan</h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Filter Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-1 border text-xs bg-white font-mono"
            >
              <option value="Semua">Semua Respon</option>
              <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
              <option value="Dikonfirmasi">Dikonfirmasi (Aktif)</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Selesai">Selesai (Laporan Masuk)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Kegiatan</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Tanggal & Lokasi</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Talent Pengisi</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Honor</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status Respon</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E0E0]">
              {filteredList.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-800">{p.kegiatanNama}</td>
                  <td className="p-2.5">
                    <div className="flex flex-col text-[11px] font-mono">
                      <span>{p.tanggal}</span>
                      <span className="text-slate-400">{p.lokasi}</span>
                    </div>
                  </td>
                  <td className="p-2.5 font-sans font-bold text-[#1A3C5E]">{p.talentNama}</td>
                  <td className="p-2.5 font-mono text-slate-700">Rp {(p.honor ?? 0).toLocaleString('id-ID')}</td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold border ${
                      p.status === 'Dikonfirmasi' ? 'bg-green-50 border-green-200 text-green-800' :
                      p.status === 'Ditolak' ? 'bg-red-50 border-red-200 text-red-800' :
                      p.status === 'Selesai' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                      'bg-amber-50 border-amber-200 text-amber-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-center">
                    <button
                      onClick={() => {
                        if (confirm(`Apakah Anda yakin ingin membatalkan/menghapus penugasan ${p.talentNama} pada ${p.kegiatanNama}?`)) {
                          onDeletePenugasan(p.id);
                        }
                      }}
                      className="p-1 hover:bg-red-50 border border-red-200 text-red-600 cursor-pointer flex items-center gap-1 mx-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Hapus Plot
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

// ==========================================
// NEW: VALIDASI LAPORAN KEGIATAN
// ==========================================
interface SdmReportValidationProps {
  penugasanList: Penugasan[];
  onValidateReport: (penugasanId: string, statusLaporan: 'Disetujui' | 'Revisi', catatanSdm?: string) => void;
  onBack: () => void;
}

export function SdmReportValidation({ 
  penugasanList, 
  onValidateReport, 
  onBack 
}: SdmReportValidationProps) {
  const [selectedPenugasan, setSelectedPenugasan] = useState<Penugasan | null>(null);
  const [catatan, setCatatan] = useState('');

  const waitingReports = penugasanList.filter(p => p.laporanStatus === 'Menunggu Validasi');

  const handleApprove = (id: string) => {
    onValidateReport(id, 'Disetujui', catatan || 'Laporan tervalidasi dengan baik oleh SDM Diklat.');
    alert('Laporan berhasil DISETUJUI dan diarsipkan.');
    setSelectedPenugasan(null);
    setCatatan('');
  };

  const handleReject = (id: string) => {
    if (!catatan) {
      alert('Mohon tulis catatan revisi atau alasan penolakan laporan!');
      return;
    }
    onValidateReport(id, 'Revisi', catatan);
    alert('Laporan dikirim kembali ke talent untuk REVISI.');
    setSelectedPenugasan(null);
    setCatatan('');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Validasi Laporan Kegiatan</h2>
          <p className="text-xs text-slate-500">Periksa dan validasi dokumen pertanggungjawaban dari para talent pasca-kegiatan.</p>
        </div>
        <button
          onClick={onBack}
          className="border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold py-1.5 px-4 text-xs uppercase cursor-pointer"
        >
          Kembali ke Dashboard
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Side: Waiting List */}
        <div className="col-span-2 bg-white border-2 border-[#1A3C5E] p-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] mb-3 border-b pb-1.5">Laporan Menunggu Validasi ({waitingReports.length})</h3>
          
          {waitingReports.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs italic">
              Saat ini tidak ada laporan kegiatan baru yang membutuhkan validasi.
            </div>
          ) : (
            <div className="space-y-3">
              {waitingReports.map(p => (
                <div 
                  key={p.id} 
                  onClick={() => { setSelectedPenugasan(p); setCatatan(''); }}
                  className={`p-4 border-2 transition-all cursor-pointer flex justify-between items-center ${
                    selectedPenugasan?.id === p.id ? 'border-[#1A3C5E] bg-blue-50/50' : 'border-[#E0E0E0] hover:border-slate-500 bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <strong className="text-xs text-slate-800 uppercase block">{p.kegiatanNama}</strong>
                    <p className="text-[11px] text-slate-500 font-mono">Talent: <strong>{p.talentNama}</strong> | Selesai pada: {p.laporanTanggal || p.tanggal}</p>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 font-bold uppercase">
                    Butuh Verifikasi
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Validation Detail Form */}
        <div className="bg-white border-2 border-[#1A3C5E] p-4 h-fit">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] mb-3 border-b pb-1.5 flex items-center gap-1">
            <Award className="w-4 h-4 text-amber-600" /> Detail & Form Evaluasi
          </h3>

          {selectedPenugasan ? (
            <div className="space-y-4 text-xs">
              <div className="p-2.5 bg-slate-100 border font-mono text-[11px] space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase">INFORMASI TUGAS</p>
                <p>Kegiatan: <strong>{selectedPenugasan.kegiatanNama}</strong></p>
                <p>Talent: <strong>{selectedPenugasan.talentNama}</strong></p>
                <p>Tanggal Lapor: {selectedPenugasan.laporanTanggal}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Isi Rangkuman Laporan</span>
                <p className="p-3 border bg-white rounded-none italic text-slate-700 leading-relaxed max-h-40 overflow-y-auto">
                  "{selectedPenugasan.laporanDeskripsi || 'Tidak ada deskripsi tertulis.'}"
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Lampiran Bukti Kegiatan</span>
                <div className="p-2 border bg-slate-50 font-mono flex items-center justify-between">
                  <span className="truncate">{selectedPenugasan.laporanBuktiLink || 'dokumen_tidak_terlampir.pdf'}</span>
                  <button 
                    onClick={() => alert('Membuka file lampiran pertanggungjawaban talent (Simulasi)')}
                    className="text-[10px] bg-[#1A3C5E] text-white px-2 py-0.5 font-bold uppercase hover:bg-slate-800 cursor-pointer"
                  >
                    Buka File
                  </button>
                </div>
              </div>

              {/* Catatan SDM Form */}
              <div className="space-y-1.5 pt-2 border-t">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Catatan / Feedback SDM</label>
                <textarea
                  rows={3}
                  placeholder="Berikan umpan balik atau instruksi revisi..."
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  className="w-full p-2 border-2 border-[#E0E0E0] text-xs focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              {/* Approve/Reject Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleReject(selectedPenugasan.id)}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 text-[11px] uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 border-none"
                >
                  <ThumbsDown className="w-3.5 h-3.5" /> Tolak / Revisi
                </button>
                <button
                  onClick={() => handleApprove(selectedPenugasan.id)}
                  className="bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-2 text-[11px] uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 border-none"
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> Setujui Laporan
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 text-xs italic">
              Silakan pilih salah satu laporan di daftar sebelah kiri untuk memulai verifikasi evaluasi.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
