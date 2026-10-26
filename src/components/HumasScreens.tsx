import React, { useState } from 'react';
import { Client, Sponsor, BlogArticle, MediaItem, Kegiatan, User, Penugasan } from '../types';
import { Plus, Edit2, Trash2, Eye, MessageSquare, Newspaper, Calendar, Image, Briefcase, Heart, CheckCircle, Users, Sparkles, FolderPlus, HelpCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { WireframeImage } from './CommonScreens';

// ==========================================
// NEW: HUMAS DASHBOARD
// ==========================================
interface HumasDashboardProps {
  clients: Client[];
  sponsors: Sponsor[];
  blogs: BlogArticle[];
  kegiatanList: Kegiatan[];
  penugasanList: Penugasan[];
  onNavigateToClients: () => void;
  onNavigateToSponsors: () => void;
  onNavigateToBlogs: () => void;
  onNavigateToGallery: () => void;
  onNavigateToKegiatan: () => void;
  onNavigateToPropose?: () => void;
  onNavigateToPenugasan?: () => void;
}

export function HumasDashboard({
  clients,
  sponsors,
  blogs,
  kegiatanList,
  penugasanList,
  onNavigateToClients,
  onNavigateToSponsors,
  onNavigateToBlogs,
  onNavigateToGallery,
  onNavigateToKegiatan,
  onNavigateToPropose,
  onNavigateToPenugasan
}: HumasDashboardProps) {
  const totalClients = clients.length;
  const totalSponsors = sponsors.length;
  const totalBlogs = blogs.length;
  const totalKegiatan = kegiatanList.length;

  const awaitingPlotting = kegiatanList.filter(k => k.status === 'Butuh Plotting').length;

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-[#E0E0E0] pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Dashboard Humas (Hubungan Masyarakat)</h2>
          <p className="text-xs text-slate-500">Kelola komunikasi publik, rilis pers digital, hubungan klien/kemitraan, dan usulan penugasan.</p>
        </div>
        <div className="flex gap-2">
          {onNavigateToPropose && (
            <button 
              onClick={onNavigateToPropose}
              className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1.5 px-3 text-xs uppercase cursor-pointer"
            >
              Usulkan Talent
            </button>
          )}
          {onNavigateToPenugasan && (
            <button 
              onClick={onNavigateToPenugasan}
              className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1.5 px-3 text-xs uppercase cursor-pointer"
            >
              Pantau Penugasan
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Client Aktif</span>
            <span className="text-xl font-bold text-slate-800 font-mono">{totalClients} Mitra</span>
          </div>
          <Briefcase className="w-5 h-5 text-[#1A3C5E]" />
        </div>

        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Sponsor Terdaftar</span>
            <span className="text-xl font-bold text-slate-800 font-mono">{totalSponsors} Brand</span>
          </div>
          <Heart className="w-5 h-5 text-red-600" />
        </div>

        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Agenda Kegiatan</span>
            <span className="text-xl font-bold text-slate-800 font-mono">{totalKegiatan} Acara</span>
          </div>
          <Calendar className="w-5 h-5 text-indigo-600" />
        </div>

        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Berita Rilis Pers</span>
            <span className="text-xl font-bold text-slate-800 font-mono">{totalBlogs} Artikel</span>
          </div>
          <Newspaper className="w-5 h-5 text-[#1A3C5E]" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left main: shortcuts grid & client feed */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white border-2 border-[#1A3C5E] p-5 space-y-3">
            <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b pb-1.5">Akses Cepat Pengelolaan</h3>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={onNavigateToClients} className="p-4 border border-slate-300 hover:border-[#1A3C5E] bg-slate-50 text-center cursor-pointer font-bold text-[11px] uppercase">
                Kelola Client ({totalClients})
              </button>
              <button onClick={onNavigateToSponsors} className="p-4 border border-slate-300 hover:border-[#1A3C5E] bg-slate-50 text-center cursor-pointer font-bold text-[11px] uppercase">
                Kelola Sponsor ({totalSponsors})
              </button>
              <button onClick={onNavigateToBlogs} className="p-4 border border-slate-300 hover:border-[#1A3C5E] bg-slate-50 text-center cursor-pointer font-bold text-[11px] uppercase">
                Tulis Blog Berita ({totalBlogs})
              </button>
              <button onClick={onNavigateToGallery} className="p-4 border border-slate-300 hover:border-[#1A3C5E] bg-slate-50 text-center cursor-pointer font-bold text-[11px] uppercase">
                Galeri Media
              </button>
              <button onClick={onNavigateToKegiatan} className="p-4 border border-slate-300 hover:border-[#1A3C5E] bg-slate-50 text-center cursor-pointer font-bold text-[11px] uppercase">
                Agenda Kegiatan ({totalKegiatan})
              </button>
              <button onClick={onNavigateToPropose} className="p-4 border border-[#1A3C5E] bg-indigo-50/50 hover:bg-white text-center cursor-pointer font-bold text-[11px] uppercase text-indigo-900">
                Usulkan Talent
              </button>
            </div>
          </div>

          <div className="bg-white border-2 border-[#1A3C5E] p-5 space-y-3">
            <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b pb-1.5">Agenda Membutuhkan Talent Plotting</h3>
            <p className="text-[11px] text-slate-500">Ada {awaitingPlotting} agenda yang baru Anda usulkan dan sedang menunggu pemrosesan plotting oleh SDM Diklat.</p>
            <div className="divide-y text-xs">
              {kegiatanList.filter(k => k.status === 'Butuh Plotting').slice(0, 3).map(k => (
                <div key={k.id} className="py-2.5 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-800">{k.namaKegiatan}</strong>
                    <p className="text-[10px] text-slate-500 font-mono">{k.tanggal} | Lokasi: {k.lokasi}</p>
                  </div>
                  <span className="bg-amber-50 text-amber-800 border border-amber-300 font-mono text-[9px] px-2 py-0.5 uppercase tracking-wide font-bold">Butuh Plotting</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Client Interaction Alert */}
        <div className="bg-slate-50 border-2 border-[#1A3C5E] p-5 space-y-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b pb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#1A3C5E]" /> Panduan Hubungan Humas
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Humas berhak mendaftarkan klien baru, menjalin kemitraan sponsor, merilis berita kegiatan publik, serta mengusulkan nama talent (Cak & Ning) berprestasi kepada bagian SDM untuk di-plotting ke event premium.
          </p>
          <div className="p-3 bg-white border border-[#E0E0E0] space-y-2">
            <span className="text-[10px] font-bold text-indigo-800 uppercase block">Log Aktif Terakhir:</span>
            <ul className="text-[11px] text-slate-600 list-disc pl-4 space-y-1">
              <li>Pembaruan rilis artikel web publik</li>
              <li>Sponsor wings food berstatus aktif</li>
              <li>Pemeriksaan riwayat plotting selesai</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. HALAMAN DAFTAR CLIENT
// ==========================================
interface HumasClientsProps {
  clients: Client[];
  onAddClient: (c: Client) => void;
  onUpdateClientLog: (clientId: string, log: string) => void;
  onDeleteClient: (id: string) => void;
}

export function HumasClients({ clients, onAddClient, onUpdateClientLog, onDeleteClient }: HumasClientsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedClientForLog, setSelectedClientForLog] = useState<Client | null>(null);
  
  // Client Form state
  const [namaInstansi, setNamaInstansi] = useState('');
  const [kontakPerson, setKontakPerson] = useState('');
  const [telepon, setTelepon] = useState('');
  
  // Interaction Log state
  const [newLog, setNewLog] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaInstansi || !kontakPerson || !telepon) {
      alert('Isi lengkap data klien!');
      return;
    }
    const newClient: Client = {
      id: 'c_' + Date.now(),
      namaInstansi,
      kontakPerson,
      telepon,
      status: 'Aktif',
      catatanInteraksi: ['Klien terdaftar baru di sistem.']
    };
    onAddClient(newClient);
    setNamaInstansi('');
    setKontakPerson('');
    setTelepon('');
    setShowAddForm(false);
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.trim() || !selectedClientForLog) return;
    onUpdateClientLog(selectedClientForLog.id, newLog.trim());
    
    // update local reference to show newly added log
    setSelectedClientForLog({
      ...selectedClientForLog,
      catatanInteraksi: [...selectedClientForLog.catatanInteraksi, newLog.trim()]
    });
    setNewLog('');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Manajemen Client</h2>
          <p className="text-xs text-slate-500">Database instansi mitra, sponsor komersial, dan dinas kota terkait.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-4 text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border-none"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? 'Tutup Form' : 'Tambah Client'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-50 border-2 border-[#1A3C5E] p-5 space-y-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b border-slate-300 pb-2">Tambah Mitra Client Baru</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nama Instansi / Perusahaan</label>
              <input
                type="text"
                placeholder="misal: Dinas Pariwisata"
                value={namaInstansi}
                onChange={(e) => setNamaInstansi(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Kontak Person (PIC)</label>
              <input
                type="text"
                placeholder="misal: Ibu Endang Sri"
                value={kontakPerson}
                onChange={(e) => setKontakPerson(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">No. Telepon / HP</label>
              <input
                type="text"
                placeholder="misal: 08123456"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs bg-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-300">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="border-2 border-slate-300 font-bold px-4 py-1.5 text-xs bg-white cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold px-4 py-1.5 text-xs cursor-pointer"
            >
              Simpan Client
            </button>
          </div>
        </form>
      )}

      {/* Main Table */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nama Instansi</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Kontak Person</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">No. Telepon</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E0E0]">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-2.5 font-bold text-slate-800">{c.namaInstansi}</td>
                <td className="p-2.5 text-slate-700">{c.kontakPerson}</td>
                <td className="p-2.5 font-mono text-slate-600">{c.telepon}</td>
                <td className="p-2.5">
                  <span className="text-green-700 font-bold font-mono text-[10px]">● {c.status}</span>
                </td>
                <td className="p-2.5">
                  <div className="flex justify-center gap-1.5">
                    <button
                      onClick={() => setSelectedClientForLog(c)}
                      className="bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 px-2 py-1 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      title="Catat Interaksi"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Catat Interaksi
                    </button>
                    <button
                      onClick={() => alert('Simulasi Edit Client')}
                      className="p-1 border border-slate-300 text-slate-700 cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Hapus client dari simulasi?')) onDeleteClient(c.id);
                      }}
                      className="p-1 border border-red-200 text-red-600 cursor-pointer"
                      title="Hapus"
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

      {/* Client Interaction Logs Manager */}
      {selectedClientForLog && (
        <div className="bg-amber-50/50 border-2 border-amber-600 p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-amber-600 pb-2">
            <div>
              <h4 className="font-bold text-xs uppercase text-amber-900 tracking-wide">
                Log Histori Catatan Interaksi Klien
              </h4>
              <p className="text-[11px] text-amber-800 font-medium">Instansi: <strong>{selectedClientForLog.namaInstansi}</strong></p>
            </div>
            <button
              onClick={() => setSelectedClientForLog(null)}
              className="text-amber-900 font-bold hover:underline text-xs cursor-pointer"
            >
              Tutup Panel Log
            </button>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedClientForLog.catatanInteraksi.length === 0 ? (
              <p className="text-slate-500 italic text-[11px]">Belum ada histori interaksi tercatat.</p>
            ) : (
              selectedClientForLog.catatanInteraksi.map((log, index) => (
                <div key={index} className="bg-white border border-amber-200 p-2 text-[11px] text-slate-700 font-sans">
                  {log}
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddLog} className="flex gap-2">
            <input
              type="text"
              placeholder="Catat hasil meeting atau panggilan telepon hari ini..."
              value={newLog}
              onChange={(e) => setNewLog(e.target.value)}
              className="flex-1 p-2 border-2 border-amber-300 focus:border-amber-600 focus:outline-none text-xs bg-white"
              required
            />
            <button
              type="submit"
              className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-4 py-2 text-xs uppercase tracking-wider cursor-pointer"
            >
              Tambah Catatan
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. HALAMAN DAFTAR SPONSOR
// ==========================================
interface HumasSponsorsProps {
  sponsors: Sponsor[];
  onAddSponsor: (s: Sponsor) => void;
  onDeleteSponsor: (id: string) => void;
}

export function HumasSponsors({ sponsors, onAddSponsor, onDeleteSponsor }: HumasSponsorsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [namaSponsor, setNamaSponsor] = useState('');
  const [kontakPerson, setKontakPerson] = useState('');
  const [jenisSponsorship, setJenisSponsorship] = useState<'Utama' | 'Pendukung' | 'Media Partner' | 'Lainnya'>('Utama');
  const [telepon, setTelepon] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaSponsor || !kontakPerson || !telepon) return;
    onAddSponsor({
      id: 'sp_' + Date.now(),
      namaSponsor,
      kontakPerson,
      jenisSponsorship,
      telepon
    });
    setNamaSponsor('');
    setKontakPerson('');
    setTelepon('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Manajemen Sponsor</h2>
          <p className="text-xs text-slate-500">Kelola kerjasama pendanaan, sponsor barter, atau media partner pariwisata.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-4 text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? 'Tutup Form' : 'Tambah Sponsor'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-50 border-2 border-[#1A3C5E] p-5 space-y-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b border-slate-300 pb-2">Form Tambah Sponsor</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nama Brand / Sponsor</label>
              <input
                type="text"
                placeholder="misal: Wings Food"
                value={namaSponsor}
                onChange={(e) => setNamaSponsor(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] text-xs bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Kontak Person</label>
              <input
                type="text"
                placeholder="misal: Bapak Yohan"
                value={kontakPerson}
                onChange={(e) => setKontakPerson(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] text-xs bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Jenis Sponsorship</label>
              <select
                value={jenisSponsorship}
                onChange={(e) => setJenisSponsorship(e.target.value as any)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white"
              >
                <option value="Utama">Sponsor Utama (Premium)</option>
                <option value="Pendukung">Sponsor Pendukung</option>
                <option value="Media Partner">Media Partner (Publikasi)</option>
                <option value="Lainnya">Barter Barang / Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">No. Telepon Sponsor</label>
              <input
                type="text"
                placeholder="misal: 08570000"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-300">
            <button type="button" onClick={() => setShowAddForm(false)} className="border-2 border-slate-300 font-bold px-4 py-1.5 text-xs bg-white cursor-pointer">Batal</button>
            <button type="submit" className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold px-4 py-1.5 text-xs cursor-pointer">Simpan Sponsor</button>
          </div>
        </form>
      )}

      {/* Main Table */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nama Sponsor</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Kontak Person</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Jenis Sponsorship</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Telepon</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E0E0]">
            {sponsors.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-2.5 font-bold text-slate-800">{s.namaSponsor}</td>
                <td className="p-2.5 text-slate-700">{s.kontakPerson}</td>
                <td className="p-2.5">
                  <span className={`px-2 py-0.5 text-[9px] font-mono border uppercase font-bold ${
                    s.jenisSponsorship === 'Utama' ? 'bg-amber-100 border-amber-300 text-amber-900' :
                    s.jenisSponsorship === 'Pendukung' ? 'bg-blue-50 border-blue-200 text-blue-900' :
                    'bg-slate-50 border-slate-300 text-slate-700'
                  }`}>
                    {s.jenisSponsorship}
                  </span>
                </td>
                <td className="p-2.5 font-mono text-slate-600">{s.telepon}</td>
                <td className="p-2.5 text-center">
                  <div className="flex justify-center gap-1.5">
                    <button onClick={() => alert('Simulasi Edit Sponsor')} className="p-1 border border-slate-300 text-slate-700 cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => { if (confirm('Hapus sponsor?')) onDeleteSponsor(s.id); }} className="p-1 border border-red-200 text-red-600 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 7. HALAMAN KELOLA BLOG
// ==========================================
interface HumasBlogsProps {
  blogs: BlogArticle[];
  onAddBlog: (b: BlogArticle) => void;
  onDeleteBlog: (id: string) => void;
}

export function HumasBlogs({ blogs, onAddBlog, onDeleteBlog }: HumasBlogsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [judul, setJudul] = useState('');
  const [ringkasan, setRingkasan] = useState('');
  const [isi, setIsi] = useState('');
  const [status, setStatus] = useState<'Draft' | 'Publish'>('Publish');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !ringkasan || !isi) return;
    onAddBlog({
      id: 'b_' + Date.now(),
      judul,
      tanggal: new Date().toISOString().split('T')[0],
      ringkasan,
      isi,
      status
    });
    setJudul('');
    setRingkasan('');
    setIsi('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Kelola Blog Organisasi</h2>
          <p className="text-xs text-slate-500">Tulis artikel berita wisata Surabaya, rilis pers kegiatan, dan update agenda internal.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-4 text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? 'Tutup Form' : 'Tambah Artikel'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-50 border-2 border-[#1A3C5E] p-5 space-y-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b border-slate-300 pb-2">Buat Artikel Baru</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Judul Artikel</label>
              <input
                type="text"
                placeholder="misal: Cak & Ning Surabaya Kampanye Peduli Destinasi Wisata Mangrove"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Ringkasan Singkat (Excerpt)</label>
              <input
                type="text"
                placeholder="Ringkasan 1 kalimat yang muncul di kartu depan daftar artikel..."
                value={ringkasan}
                onChange={(e) => setRingkasan(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Konten Lengkap Artikel</label>
              <textarea
                rows={6}
                placeholder="Tulis artikel berita secara lengkap di sini..."
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white font-sans"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Status Publikasi</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] cursor-pointer">
                  <input type="radio" checked={status === 'Publish'} onChange={() => setStatus('Publish')} className="accent-[#2E7D32]" />
                  Publish Langsung ke Publik
                </label>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 cursor-pointer">
                  <input type="radio" checked={status === 'Draft'} onChange={() => setStatus('Draft')} className="accent-slate-500" />
                  Simpan sebagai Draft Internal
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-300">
            <button type="button" onClick={() => setShowAddForm(false)} className="border-2 border-slate-300 font-bold px-4 py-1.5 text-xs bg-white cursor-pointer">Batal</button>
            <button type="submit" className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold px-4 py-1.5 text-xs cursor-pointer">Posting Artikel</button>
          </div>
        </form>
      )}

      {/* Main Table */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Judul Artikel</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Tanggal Buat</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E0E0]">
            {blogs.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="p-2.5 font-bold text-slate-800">
                  <div className="space-y-0.5">
                    <p>{b.judul}</p>
                    <p className="text-[10px] text-slate-500 font-normal italic">{b.ringkasan}</p>
                  </div>
                </td>
                <td className="p-2.5 font-mono text-slate-600">{b.tanggal}</td>
                <td className="p-2.5">
                  <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold border ${
                    b.status === 'Publish' ? 'bg-green-50 border-green-300 text-green-800' : 'bg-slate-100 border-slate-300 text-slate-600'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-2.5 text-center">
                  <div className="flex justify-center gap-1.5">
                    <button onClick={() => alert(`Review: ${b.judul}\n\n${b.isi}`)} className="p-1 border border-slate-300 text-slate-700 cursor-pointer" title="Lihat Artikel"><Eye className="w-3.5 h-3.5" /></button>
                    <button onClick={() => alert('Simulasi Edit Artikel')} className="p-1 border border-slate-300 text-slate-700 cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => { if (confirm('Hapus artikel?')) onDeleteBlog(b.id); }} className="p-1 border border-red-200 text-red-600 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 8. HALAMAN KELOLA GALERI (MEDIA)
// ==========================================
interface HumasGalleryProps {
  mediaItems: MediaItem[];
  onAddMedia: (m: MediaItem) => void;
  onDeleteMedia: (id: string) => void;
}

export function HumasGallery({ mediaItems, onAddMedia, onDeleteMedia }: HumasGalleryProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [judul, setJudul] = useState('');
  const [tipe, setTipe] = useState<'Foto' | 'Video'>('Foto');
  const [kategori, setKategori] = useState('Kegiatan Publik');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul) return;
    onAddMedia({
      id: 'm_' + Date.now(),
      judul,
      tipe,
      tanggal: new Date().toISOString().split('T')[0],
      kategori
    });
    setJudul('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Kelola Galeri Media</h2>
          <p className="text-xs text-slate-500">Kumpulan dokumentasi foto dan video paguyuban untuk konsumsi publik.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-4 text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? 'Tutup Form' : 'Tambah Media'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-50 border-2 border-[#1A3C5E] p-5 space-y-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b border-slate-300 pb-2">Tambah Dokumentasi Baru</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nama / Keterangan Dokumentasi</label>
              <input
                type="text"
                placeholder="misal: Puncak Pemilihan Cak Ning 2025"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Tipe Media</label>
              <select
                value={tipe}
                onChange={(e) => setTipe(e.target.value as any)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white"
              >
                <option value="Foto">Foto Dokumentasi (.JPG, .PNG)</option>
                <option value="Video">Video Link Youtube/Drive (.MP4)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Kategori Agenda</label>
              <input
                type="text"
                placeholder="misal: Kebudayaan, Internal, Promosi"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-300">
            <button type="button" onClick={() => setShowAddForm(false)} className="border-2 border-slate-300 font-bold px-4 py-1.5 text-xs bg-white cursor-pointer">Batal</button>
            <button type="submit" className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold px-4 py-1.5 text-xs cursor-pointer">Unggah Media</button>
          </div>
        </form>
      )}

      {/* Grid Thumbnail 4 Kolom */}
      <div className="bg-white border-2 border-[#1A3C5E] p-5">
        <div className="grid grid-cols-4 gap-4">
          {mediaItems.map((m) => (
            <div key={m.id} className="border-2 border-[#1A3C5E] overflow-hidden flex flex-col bg-slate-50 transition-all hover:border-slate-800">
              <div className="relative">
                <WireframeImage 
                  label={`${m.tipe}: ${m.judul.substring(0,18)}...`} 
                  className="h-28 w-full"
                  bgColor={m.tipe === 'Video' ? 'bg-indigo-50' : 'bg-slate-100'}
                  textColor={m.tipe === 'Video' ? 'text-indigo-900' : 'text-slate-800'}
                />
                <span className="absolute top-1.5 left-1.5 bg-[#1A3C5E] text-white text-[8px] font-extrabold uppercase px-1.5 py-0.5">
                  {m.kategori}
                </span>
              </div>
              
              <div className="p-2 flex-1 flex flex-col justify-between bg-white border-t border-[#1A3C5E]">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[11px] text-slate-800 leading-tight truncate" title={m.judul}>
                    {m.judul}
                  </h4>
                  <p className="font-mono text-[9px] text-slate-400">{m.tanggal}</p>
                </div>

                <div className="grid grid-cols-2 gap-1 pt-2 border-t border-[#E0E0E0] mt-1.5">
                  <button
                    onClick={() => alert(`Simulasi Edit Media: ${m.judul}`)}
                    className="bg-slate-50 hover:bg-slate-200 border border-slate-300 text-[9px] font-bold py-1 px-1 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Edit2 className="w-2.5 h-2.5" /> Edit
                  </button>
                  <button
                    onClick={() => { if (confirm('Apakah Anda yakin ingin menghapus media ini?')) onDeleteMedia(m.id); }}
                    className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-[9px] font-bold py-1 px-1 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-2.5 h-2.5" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. HALAMAN KELOLA KEGIATAN
// ==========================================
interface HumasKegiatanProps {
  kegiatanList: Kegiatan[];
  onAddKegiatan: (k: Kegiatan) => void;
  onDeleteKegiatan: (id: string) => void;
}

export function HumasKegiatan({ kegiatanList, onAddKegiatan, onDeleteKegiatan }: HumasKegiatanProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [namaKegiatan, setNamaKegiatan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKegiatan || !tanggal || !lokasi || !deskripsi) return;
    onAddKegiatan({
      id: 'k_' + Date.now(),
      namaKegiatan,
      tanggal,
      lokasi,
      deskripsi,
      status: 'Butuh Plotting'
    });
    setNamaKegiatan('');
    setTanggal('');
    setLokasi('');
    setDeskripsi('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Kelola Agenda Kegiatan</h2>
          <p className="text-xs text-slate-500">Ajukan kegiatan pariwisata baru untuk di-plotting oleh bagian SDM.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-4 text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? 'Tutup Form' : 'Tambah Kegiatan'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-50 border-2 border-[#1A3C5E] p-5 space-y-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] border-b border-slate-300 pb-2">Ajukan Kegiatan Pariwisata Baru</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nama Kegiatan Agenda</label>
              <input
                type="text"
                placeholder="misal: Malam Grand Final Pemilihan Duta Wisata Surabaya 2026"
                value={namaKegiatan}
                onChange={(e) => setNamaKegiatan(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Tanggal Kegiatan</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Lokasi Kegiatan</label>
              <input
                type="text"
                placeholder="misal: Balai Pemuda Surabaya"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Deskripsi Singkat, Rundown & Instruksi Seragam</label>
              <input
                type="text"
                placeholder="Tugas menyambut tamu, mengenakan pakaian Cak lengkap dengan udeng..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="w-full p-2 border-2 border-[#E0E0E0] text-xs bg-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-300">
            <button type="button" onClick={() => setShowAddForm(false)} className="border-2 border-slate-300 font-bold px-4 py-1.5 text-xs bg-white cursor-pointer">Batal</button>
            <button type="submit" className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold px-4 py-1.5 text-xs cursor-pointer">Ajukan ke SDM</button>
          </div>
        </form>
      )}

      {/* Main Table */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nama Agenda Kegiatan</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Tanggal</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Lokasi</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status</th>
              <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E0E0]">
            {kegiatanList.map((k) => (
              <tr key={k.id} className="hover:bg-slate-50">
                <td className="p-2.5 font-bold text-slate-800">
                  <div className="space-y-0.5">
                    <span>{k.namaKegiatan}</span>
                    <p className="text-[10px] text-slate-500 font-normal italic">{k.deskripsi}</p>
                  </div>
                </td>
                <td className="p-2.5 font-mono text-slate-600">{k.tanggal}</td>
                <td className="p-2.5 text-slate-600">{k.lokasi}</td>
                <td className="p-2.5">
                  <span className={`px-2 py-0.5 text-[9px] font-mono border uppercase font-bold ${
                    k.status === 'Butuh Plotting' ? 'bg-amber-50 border-amber-300 text-amber-800' :
                    k.status === 'Selesai' ? 'bg-green-50 border-green-300 text-green-800' :
                    'bg-slate-50 border-slate-300 text-slate-600'
                  }`}>
                    {k.status}
                  </span>
                </td>
                <td className="p-2.5 text-center">
                  <div className="flex justify-center gap-1.5">
                    <button onClick={() => alert(`Detail Kegiatan: ${k.namaKegiatan}`)} className="p-1 border border-slate-300 text-slate-700 cursor-pointer" title="Lihat"><Eye className="w-3.5 h-3.5" /></button>
                    <button onClick={() => alert('Simulasi Edit Kegiatan')} className="p-1 border border-slate-300 text-slate-700 cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => { if (confirm('Apakah Anda yakin ingin menghapus agenda kegiatan ini?')) onDeleteKegiatan(k.id); }} className="p-1 border border-red-200 text-red-600 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// NEW: USULKAN TALENT UNTUK EVENT (HUMAS)
// ==========================================
interface HumasProposeTalentProps {
  kegiatanList: Kegiatan[];
  talents: User[];
  onBack: () => void;
}

export function HumasProposeTalent({ kegiatanList, talents, onBack }: HumasProposeTalentProps) {
  const [selectedKegId, setSelectedKegId] = useState('');
  const [selectedTalents, setSelectedTalents] = useState<string[]>([]);
  const [catatanRekomendasi, setCatatanRekomendasi] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePropose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKegId || selectedTalents.length === 0) {
      alert('Mohon pilih kegiatan dan minimal 1 nama talent!');
      return;
    }

    const keg = kegiatanList.find(k => k.id === selectedKegId);
    if (!keg) return;

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedKegId('');
      setSelectedTalents([]);
      setCatatanRekomendasi('');
      alert('Rekomendasi usulan talent berhasil dikirim ke SDM Diklat untuk diproses!');
    }, 1500);
  };

  const handleToggleTalent = (id: string) => {
    if (selectedTalents.includes(id)) {
      setSelectedTalents(selectedTalents.filter(t => t !== id));
    } else {
      setSelectedTalents([...selectedTalents, id]);
    }
  };

  return (
    <div className="space-y-6 font-sans max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Usulkan Rekomendasi Talent</h2>
          <p className="text-xs text-slate-500">Ajukan usulan plotting talent berprestasi agar disetujui & diproses plotting oleh SDM.</p>
        </div>
        <button
          onClick={onBack}
          className="border-2 border-slate-300 bg-white text-slate-700 font-bold py-1 px-3 text-xs uppercase cursor-pointer"
        >
          Kembali ke Dashboard
        </button>
      </div>

      {isSuccess && (
        <div className="bg-green-50 border border-green-300 text-green-800 p-3.5 text-xs font-mono">
          ✓ Sukses! Mengirim usulan talent ke database SDM...
        </div>
      )}

      <form onSubmit={handlePropose} className="bg-white border-2 border-[#1A3C5E] p-6 space-y-6 text-xs">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Pilih Kegiatan Agenda</label>
              <select
                value={selectedKegId}
                onChange={(e) => setSelectedKegId(e.target.value)}
                className="w-full p-2.5 border-2 border-[#E0E0E0] text-xs bg-white font-bold text-slate-800 focus:outline-none focus:border-[#1A3C5E]"
                required
              >
                <option value="">-- Pilih Agenda Kegiatan --</option>
                {kegiatanList.map(k => (
                  <option key={k.id} value={k.id}>{k.namaKegiatan} ({k.tanggal})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Catatan Justifikasi / Kriteria Khusus</label>
              <textarea
                rows={4}
                value={catatanRekomendasi}
                onChange={(e) => setCatatanRekomendasi(e.target.value)}
                placeholder="misal: Diperlukan Cak & Ning yang mahir berbahasa asing untuk menyambut tamu delegasi luar negeri..."
                className="w-full p-2.5 border-2 border-[#E0E0E0] text-xs focus:outline-none focus:border-[#1A3C5E]"
              />
            </div>
          </div>

          <div className="bg-slate-50 border p-4 space-y-3">
            <span className="text-[10px] font-bold text-[#1A3C5E] uppercase block">Daftar Talent Rekomendasi</span>
            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
              {talents.map(t => {
                const isSelected = selectedTalents.includes(t.id);
                return (
                  <label key={t.id} className="flex items-center gap-2 p-1.5 hover:bg-white border transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleTalent(t.id)}
                      className="accent-[#1A3C5E]"
                    />
                    <div>
                      <p className="font-bold text-slate-800">{t.nama}</p>
                      <span className="text-[9px] text-slate-500 font-mono italic">{t.angkatan || 'Cak Ning'}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t flex justify-end gap-2">
          <button
            type="button"
            onClick={onBack}
            className="border border-slate-300 font-bold px-5 py-2 uppercase text-slate-600 cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-[#1A3C5E] text-white font-bold px-5 py-2 uppercase hover:bg-slate-800 cursor-pointer"
          >
            Kirim Usulan Plotting
          </button>
        </div>
      </form>
    </div>
  );
}

// ==========================================
// NEW: DAFTAR & DETAIL PENUGASAN (HUMAS)
// ==========================================
interface HumasAssignmentsViewProps {
  penugasanList: Penugasan[];
  onBack: () => void;
}

export function HumasAssignmentsView({ penugasanList, onBack }: HumasAssignmentsViewProps) {
  const [selectedPenugasan, setSelectedPenugasan] = useState<Penugasan | null>(null);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Monitoring Plotting Penugasan</h2>
          <p className="text-xs text-slate-500">Pantau status penugasan talent yang sedang berjalan atau dibatalkan.</p>
        </div>
        <button
          onClick={onBack}
          className="border-2 border-slate-300 bg-white text-slate-700 font-bold py-1 px-3 text-xs uppercase cursor-pointer"
        >
          Kembali ke Dashboard
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Side: Assignment List */}
        <div className="col-span-2 bg-white border-2 border-[#1A3C5E] p-4">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] mb-3 border-b pb-1.5">Penugasan Terplot</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                  <th className="p-2 font-bold uppercase text-[#1A3C5E]">Kegiatan</th>
                  <th className="p-2 font-bold uppercase text-[#1A3C5E]">Talent Pengisi</th>
                  <th className="p-2 font-bold uppercase text-[#1A3C5E]">Status Respon</th>
                  <th className="p-2 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {penugasanList.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-800">
                      <div>
                        <span>{p.kegiatanNama}</span>
                        <p className="text-[10px] text-slate-400 font-mono font-normal">{p.tanggal}</p>
                      </div>
                    </td>
                    <td className="p-2 font-medium text-[#1A3C5E]">{p.talentNama}</td>
                    <td className="p-2">
                      <span className={`px-2 py-0.5 text-[9px] font-mono border uppercase font-bold ${
                        p.status === 'Dikonfirmasi' ? 'bg-green-50 border-green-200 text-green-800' :
                        p.status === 'Ditolak' ? 'bg-red-50 border-red-200 text-red-800' :
                        'bg-amber-50 border-amber-200 text-amber-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => setSelectedPenugasan(p)}
                        className="bg-slate-100 hover:bg-[#1A3C5E] hover:text-white border text-[10px] font-bold py-1 px-2.5 uppercase transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Assignment Detail Panel */}
        <div className="bg-white border-2 border-[#1A3C5E] p-4 h-fit">
          <h3 className="font-bold text-xs uppercase text-[#1A3C5E] mb-3 border-b pb-1.5">Detail Mandat Humas</h3>
          
          {selectedPenugasan ? (
            <div className="space-y-4 text-xs font-sans">
              <div className="p-3 bg-slate-50 border font-mono text-[11px] space-y-1">
                <p className="text-[#1A3C5E] font-bold">EVENT: {selectedPenugasan.kegiatanNama}</p>
                <p>Tanggal: {selectedPenugasan.tanggal}</p>
                <p>Lokasi: {selectedPenugasan.lokasi}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Talent yang Di-plot</span>
                <p className="font-bold text-slate-800 text-sm">{selectedPenugasan.talentNama}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Status Honorarium</span>
                <p className="font-bold font-mono text-emerald-800">Rp {(selectedPenugasan.honor ?? 0).toLocaleString('id-ID')}</p>
                <span className="text-[10px] bg-slate-100 border text-slate-600 px-1.5 py-0.5 uppercase tracking-wide font-mono inline-block mt-1 font-bold">
                  {selectedPenugasan.statusBayar}
                </span>
              </div>

              {/* Humas can request to cancel assignment in prototype */}
              <div className="pt-3 border-t">
                <button
                  onClick={() => {
                    alert(`Permohonan pembatalan plotting untuk ${selectedPenugasan.talentNama} pada ${selectedPenugasan.kegiatanNama} berhasil diajukan ke bagian SDM Diklat.`);
                    setSelectedPenugasan(null);
                  }}
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 uppercase tracking-wide cursor-pointer text-[10px]"
                >
                  Ajukan Pembatalan Plotting
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 italic text-xs">
              Silakan pilih salah satu item penugasan untuk melihat detail lengkap mandat humas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
