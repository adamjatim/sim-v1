import React, { useState } from 'react';
import { Client, Sponsor, PengajuanPenugasan, User } from '../types';
import { 
  Building2, 
  Handshake, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Users, 
  Calendar, 
  FileText, 
  ChevronRight,
  X,
  Newspaper,
  HeartHandshake
} from 'lucide-react';

// ============================================================================
// 1. DASHBOARD HUMAS (4 Kartu Statistik + Tabel Pengajuan Terbaru 5 Data)
// ============================================================================
interface HumasDashboardProps {
  clients: Client[];
  sponsors: Sponsor[];
  pengajuanList: PengajuanPenugasan[];
  onNavigateToScreen: (screenId: string) => void;
}

export function HumasDashboard({
  clients,
  sponsors,
  pengajuanList,
  onNavigateToScreen
}: HumasDashboardProps) {
  // 5 Data Pengajuan Terbaru
  const recentPengajuan = pengajuanList.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Dashboard Humas & Kemitraan</h2>
        <p className="text-xs text-slate-500 mt-0.5">Ringkasan kerjasama instansi, kemitraan sponsor, publikasi, dan berkas pengajuan acara.</p>
      </div>

      {/* 4 Kartu Statistik (Total Client, Total Sponsor, Total Pengajuan, Total Artikel) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigateToScreen('HUMAS_CLIENTS')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Client</span>
            <span className="text-2xl font-black text-[#1A3C5E] font-mono block">12 Mitra</span>
            <p className="text-[11px] text-slate-400">Instansi Pemkot & Korporasi</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateToScreen('HUMAS_SPONSORS')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Sponsor</span>
            <span className="text-2xl font-black text-amber-600 font-mono block">10 Brand</span>
            <p className="text-[11px] text-slate-400">Uang, Barang & Media</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Handshake className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateToScreen('HUMAS_PENGAJUAN')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Pengajuan</span>
            <span className="text-2xl font-black text-purple-700 font-mono block">10 Agenda</span>
            <p className="text-[11px] text-slate-400">Masuk Siklus Penugasan</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Artikel</span>
            <span className="text-2xl font-black text-emerald-700 font-mono block">8 Publikasi</span>
            <p className="text-[11px] text-slate-400">Rilis Berita Pers & Web</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabel Ringkasan "Pengajuan Terbaru" (5 Data) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#1A3C5E]">Ringkasan Pengajuan Terbaru</h3>
            <p className="text-[11px] text-slate-500">5 berkas permohonan penugasan duta wisata yang paling baru diterima.</p>
          </div>
          <button
            onClick={() => onNavigateToScreen('HUMAS_PENGAJUAN')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            Lihat Semua (10) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Kegiatan</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Client Pengusul</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentPengajuan.map((p, idx) => {
                let badgeClass = 'bg-blue-50 text-[#1A3C5E] border-blue-200';
                if (p.status === 'Disetujui') badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                if (p.status === 'Diajukan ke SDM') badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';
                if (p.status === 'Dibatalkan') badgeClass = 'bg-red-50 text-red-800 border-red-200';

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="p-3.5 font-bold text-[#1A3C5E]">{p.namaKegiatan}</td>
                    <td className="p-3.5 font-mono text-slate-600 whitespace-nowrap">{p.tanggal}</td>
                    <td className="p-3.5 text-slate-600">{p.client}</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block ${badgeClass}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. HALAMAN KELOLA CLIENT (12 Data Dummy + Tombol Tambah, Edit & Hapus)
// ============================================================================
interface HumasClientsProps {
  clients: Client[];
  onAddClient: (c: Client) => void;
  onUpdateClient: (c: Client) => void;
  onDeleteClient: (id: string) => void;
}

export function HumasClients({ clients, onAddClient, onUpdateClient, onDeleteClient }: HumasClientsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const [formInstansi, setFormInstansi] = useState('');
  const [formKontak, setFormKontak] = useState('');
  const [formTelepon, setFormTelepon] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formAlamat, setFormAlamat] = useState('');

  // 12 data dummy
  const clientList = clients.slice(0, 12);
  const filteredClients = clientList;

  const handleOpenAdd = () => {
    setEditingClient(null);
    setFormInstansi('');
    setFormKontak('');
    setFormTelepon('');
    setFormEmail('');
    setFormAlamat('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Client) => {
    setEditingClient(c);
    setFormInstansi(c.namaInstansi);
    setFormKontak(c.kontakPerson);
    setFormTelepon(c.telepon);
    setFormEmail(c.email);
    setFormAlamat(c.alamat);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInstansi || !formKontak || !formTelepon || !formEmail) {
      alert('Mohon lengkapi field wajib!');
      return;
    }

    if (editingClient) {
      onUpdateClient({
        ...editingClient,
        namaInstansi: formInstansi,
        kontakPerson: formKontak,
        telepon: formTelepon,
        email: formEmail,
        alamat: formAlamat
      });
    } else {
      onAddClient({
        id: 'c_' + Date.now(),
        namaInstansi: formInstansi,
        kontakPerson: formKontak,
        telepon: formTelepon,
        email: formEmail,
        alamat: formAlamat,
        status: 'Aktif',
        catatanInteraksi: []
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-[#1A3C5E]">Kelola Client Mitra</h2>
          <p className="text-xs text-slate-500 mt-0.5">Database 12 instansi mitra dinas dan korporasi pemohon penugasan duta wisata.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> + Tambah Client
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-xs">
        <span className="text-xs text-slate-500 font-medium">Daftar Instansi & Mitra Terhubung</span>
        <span className="text-xs text-slate-500 font-mono">Total: <strong>{filteredClients.length}</strong> Client</span>
      </div>

      {/* Tabel dengan kolom: No, Nama Instansi, Kontak Person, Telepon, Email, Aksi (Tombol Edit & Hapus) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Instansi</th>
                <th className="p-3.5">Kontak Person</th>
                <th className="p-3.5">Telepon</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredClients.map((client, idx) => (
                <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                  <td className="p-3.5 font-bold text-[#1A3C5E] max-w-xs">{client.namaInstansi}</td>
                  <td className="p-3.5 font-medium">{client.kontakPerson}</td>
                  <td className="p-3.5 font-mono text-slate-600">{client.telepon}</td>
                  <td className="p-3.5 text-slate-600">{client.email}</td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(client)}
                        className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                        title="Edit Client"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Yakin ingin menghapus ${client.namaInstansi}?`)) {
                            onDeleteClient(client.id);
                          }
                        }}
                        className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                        title="Hapus Client"
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

      {/* Modal Tambah / Edit Client */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#1A3C5E]">
                {editingClient ? 'Edit Client Mitra' : 'Tambah Client Mitra Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Instansi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT Grand City Surabaya"
                  value={formInstansi}
                  onChange={(e) => setFormInstansi(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Kontak Person (PIC) *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bpk. Ir. Hermawan"
                  value={formKontak}
                  onChange={(e) => setFormKontak(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nomor Telepon *</label>
                  <input
                    type="text"
                    required
                    placeholder="031-5345678"
                    value={formTelepon}
                    onChange={(e) => setFormTelepon(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Resmi *</label>
                  <input
                    type="email"
                    required
                    placeholder="kontak@instansi.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Alamat Lengkap</label>
                <textarea
                  rows={2}
                  placeholder="Jl. Walikota Mustajab No. 1, Surabaya..."
                  value={formAlamat}
                  onChange={(e) => setFormAlamat(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
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
                  Simpan Client
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
// 3. HALAMAN KELOLA SPONSOR (10 Data Dummy + Tombol Tambah, Edit & Hapus)
// ============================================================================
interface HumasSponsorsProps {
  sponsors: Sponsor[];
  onAddSponsor: (s: Sponsor) => void;
  onUpdateSponsor: (s: Sponsor) => void;
  onDeleteSponsor: (id: string) => void;
}

export function HumasSponsors({ sponsors, onAddSponsor, onUpdateSponsor, onDeleteSponsor }: HumasSponsorsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);

  const [formSponsor, setFormSponsor] = useState('');
  const [formJenis, setFormJenis] = useState<'Uang' | 'Barang' | 'Media'>('Uang');
  const [formKontak, setFormKontak] = useState('');

  // 10 data dummy
  const sponsorList = sponsors.slice(0, 10);
  const filtered = sponsorList;

  const handleOpenAdd = () => {
    setEditingSponsor(null);
    setFormSponsor('');
    setFormJenis('Uang');
    setFormKontak('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Sponsor) => {
    setEditingSponsor(s);
    setFormSponsor(s.namaSponsor);
    // map to Uang/Barang/Media
    const jenis = s.jenisSponsorship === 'Media Partner' ? 'Media' : s.jenisSponsorship === 'Pendukung' ? 'Barang' : 'Uang';
    setFormJenis(jenis);
    setFormKontak(s.kontakPerson + ' (' + s.telepon + ')');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSponsor || !formKontak) {
      alert('Mohon isi field sponsor!');
      return;
    }

    if (editingSponsor) {
      onUpdateSponsor({
        ...editingSponsor,
        namaSponsor: formSponsor,
        jenisSponsorship: formJenis === 'Media' ? 'Media Partner' : formJenis === 'Barang' ? 'Pendukung' : 'Utama',
        kontakPerson: formKontak
      });
    } else {
      onAddSponsor({
        id: 's_' + Date.now(),
        namaSponsor: formSponsor,
        jenisSponsorship: formJenis === 'Media' ? 'Media Partner' : formJenis === 'Barang' ? 'Pendukung' : 'Utama',
        kontakPerson: formKontak,
        telepon: '0812-9988-7766'
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-[#1A3C5E]">Kelola Sponsor</h2>
          <p className="text-xs text-slate-500 mt-0.5">Daftar 10 sponsor resmi pendukung kegiatan Duta Wisata Cak & Ning Surabaya.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> + Tambah Sponsor
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-xs">
        <span className="text-xs text-slate-500 font-medium">Daftar Rekanan Sponsor & Mitra Pendukung</span>
        <span className="text-xs text-slate-500 font-mono">Total: <strong>{filtered.length}</strong> Brand Sponsor</span>
      </div>

      {/* Tabel dengan kolom: No, Nama Sponsor, Jenis Sponsorship (Uang/Barang/Media), Kontak, Aksi */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Sponsor</th>
                <th className="p-3.5">Jenis Sponsorship</th>
                <th className="p-3.5">Kontak</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((sponsor, idx) => {
                const jenisDisplay = sponsor.jenisSponsorship === 'Media Partner' ? 'Media' : 
                                     sponsor.jenisSponsorship === 'Pendukung' ? 'Barang' : 'Uang (Dana Tunai)';
                let badgeStyle = 'bg-blue-50 text-[#1A3C5E] border-blue-200';
                if (jenisDisplay === 'Media') badgeStyle = 'bg-purple-50 text-purple-800 border-purple-200';
                if (jenisDisplay === 'Barang') badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200';

                return (
                  <tr key={sponsor.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="p-3.5 font-bold text-[#1A3C5E]">{sponsor.namaSponsor}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block ${badgeStyle}`}>
                        {jenisDisplay}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <span className="font-medium text-slate-800 block">{sponsor.kontakPerson}</span>
                      <span className="font-mono text-[11px] text-slate-500">{sponsor.telepon}</span>
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(sponsor)}
                          className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus sponsor ${sponsor.namaSponsor}?`)) {
                              onDeleteSponsor(sponsor.id);
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
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

      {/* Modal CRUD Sponsor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#1A3C5E]">
                {editingSponsor ? 'Edit Data Sponsor' : 'Tambah Sponsor Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Perusahaan Sponsor *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT Bank Jatim"
                  value={formSponsor}
                  onChange={(e) => setFormSponsor(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Jenis Sponsorship *</label>
                <select
                  value={formJenis}
                  onChange={(e: any) => setFormJenis(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:border-[#1A3C5E]"
                >
                  <option value="Uang">Uang (Sponsorship Tunai / Finansial)</option>
                  <option value="Barang">Barang (Produk / Refreshment / Transportasi)</option>
                  <option value="Media">Media (Publikasi Radio, Cetak & Digital)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Kontak Person & Telepon *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bpk. Agus Setiawan (0812-3344-5566)"
                  value={formKontak}
                  onChange={(e) => setFormKontak(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
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
                  Simpan Sponsor
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
// 4. HALAMAN KELOLA PENGAJUAN PENUGASAN (10 Data Dummy + Tombol Ajukan, Edit, Batalkan)
// ============================================================================
interface HumasPengajuanProps {
  pengajuanList: PengajuanPenugasan[];
  talents: User[];
  onAddPengajuan: (p: PengajuanPenugasan) => void;
  onUpdatePengajuan: (p: PengajuanPenugasan) => void;
  onCancelPengajuan: (id: string) => void;
}

export function HumasPengajuanPenugasan({ 
  pengajuanList, 
  onAddPengajuan, 
  onUpdatePengajuan, 
  onCancelPengajuan 
}: HumasPengajuanProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PengajuanPenugasan | null>(null);

  const [formNama, setFormNama] = useState('');
  const [formTanggal, setFormTanggal] = useState('');
  const [formClient, setFormClient] = useState('');

  // 10 data dummy
  const list10 = pengajuanList.slice(0, 10);
  const filtered = list10;

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormNama('');
    setFormTanggal(new Date().toISOString().split('T')[0]);
    setFormClient('Dinas Pariwisata Kota Surabaya');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: PengajuanPenugasan) => {
    setEditingItem(p);
    setFormNama(p.namaKegiatan);
    setFormTanggal(p.tanggal);
    setFormClient(p.client);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama || !formTanggal || !formClient) {
      alert('Mohon isi field pengajuan!');
      return;
    }

    if (editingItem) {
      onUpdatePengajuan({
        ...editingItem,
        namaKegiatan: formNama,
        tanggal: formTanggal,
        client: formClient
      });
    } else {
      onAddPengajuan({
        id: 'pp_' + Date.now(),
        namaKegiatan: formNama,
        tanggal: formTanggal,
        client: formClient,
        status: 'Diajukan ke SDM'
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-[#1A3C5E]">Kelola Pengajuan Penugasan</h2>
          <p className="text-xs text-slate-500 mt-0.5">Tabel 10 berkas pengajuan penugasan dari dinas dan instansi mitra.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> + Ajukan Penugasan Baru
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-xs">
        <span className="text-xs text-slate-500 font-medium">Daftar Pengajuan Penugasan Aktif</span>
        <span className="text-xs text-slate-500 font-mono">Total: <strong>{filtered.length}</strong> Pengajuan</span>
      </div>

      {/* Tabel dengan kolom: No, Nama Kegiatan, Tanggal, Client, Status, Aksi (Tombol Edit & Batalkan) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Kegiatan</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Client</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item, idx) => {
                let badgeClass = 'bg-blue-50 text-[#1A3C5E] border-blue-200';
                if (item.status === 'Disetujui') badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                if (item.status === 'Diajukan ke SDM') badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';
                if (item.status === 'Dibatalkan') badgeClass = 'bg-red-50 text-red-800 border-red-200';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="p-3.5 font-bold text-[#1A3C5E] max-w-xs">{item.namaKegiatan}</td>
                    <td className="p-3.5 font-mono text-slate-600 whitespace-nowrap">{item.tanggal}</td>
                    <td className="p-3.5 text-slate-600 max-w-xs">{item.client}</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block ${badgeClass}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        {item.status !== 'Dibatalkan' ? (
                          <button
                            onClick={() => {
                              if (confirm(`Batalkan pengajuan ${item.namaKegiatan}?`)) {
                                onCancelPengajuan(item.id);
                              }
                            }}
                            className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <XCircle className="w-3 h-3" /> Batalkan
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[10px] italic">Telah Dibatalkan</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ajukan / Edit Pengajuan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#1A3C5E]">
                {editingItem ? 'Edit Berkas Pengajuan' : 'Ajukan Penugasan Baru'}
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
                  placeholder="Contoh: Penyambutan Tamu Delegasi..."
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Tanggal Pelaksanaan *</label>
                <input
                  type="date"
                  required
                  value={formTanggal}
                  onChange={(e) => setFormTanggal(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Client Pengusul *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dinas Kebudayaan Surabaya"
                  value={formClient}
                  onChange={(e) => setFormClient(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
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
                  Simpan Pengajuan
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
// 5. HALAMAN LIHAT INFORMASI TALENT (Tabel Manajemen Khusus Humas)
// ============================================================================
interface HumasTalentInfoProps {
  talents: User[];
}

export function HumasTalentInfo({ talents }: HumasTalentInfoProps) {
  const talentList = talents.filter(u => u.peran === 'Talent').slice(0, 15);
  const filtered = talentList;

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Lihat Informasi Talent</h2>
        <p className="text-xs text-slate-500 mt-0.5">Tabel kontak dan data profil duta wisata untuk kebutuhan koordinasi penugasan Humas.</p>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-xs">
        <span className="text-xs text-slate-500 font-medium">Daftar Duta Wisata Aktif</span>
        <span className="text-xs text-slate-500 font-mono">Total: <strong>{filtered.length}</strong> Talent</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Talent</th>
                <th className="p-3.5">Angkatan</th>
                <th className="p-3.5">Kontak Telepon</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Spesialisasi</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((t, idx) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                  <td className="p-3.5 font-bold text-[#1A3C5E]">{t.nama}</td>
                  <td className="p-3.5 font-mono text-slate-600">{t.angkatan}</td>
                  <td className="p-3.5 font-mono text-slate-600">{t.telepon}</td>
                  <td className="p-3.5 text-slate-600">{t.email}</td>
                  <td className="p-3.5 text-slate-600">{t.spesialisasi || 'MC & Protokoler'}</td>
                  <td className="p-3.5 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {t.status}
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
