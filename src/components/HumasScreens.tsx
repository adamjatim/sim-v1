import React, { useState } from 'react';
import { Client, Sponsor, PengajuanPenugasan, User, Penugasan } from '../types';
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
  HeartHandshake,
  Star,
  Award,
  Phone,
  Mail,
  ExternalLink,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Download,
  Sparkles,
  Check,
  AlertCircle,
  Globe,
  Copy,
  Send,
  Search,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { DeleteConfirmModal } from './DeleteConfirmModal';

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
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const [formInstansi, setFormInstansi] = useState('');
  const [formKontak, setFormKontak] = useState('');
  const [formTelepon, setFormTelepon] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formAlamat, setFormAlamat] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

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
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Client) => {
    setEditingClient(c);
    setFormInstansi(c.namaInstansi);
    setFormKontak(c.kontakPerson);
    setFormTelepon(c.telepon);
    setFormEmail(c.email);
    setFormAlamat(c.alamat);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInstansi.trim() || !formKontak.trim() || !formTelepon.trim() || !formEmail.trim()) {
      setFormError('Mohon lengkapi seluruh field wajib data client mitra!');
      return;
    }
    setFormError(null);

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
                        onClick={() => setClientToDelete(client)}
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
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
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

      {/* Modal Konfirmasi Hapus Klien */}
      <DeleteConfirmModal
        isOpen={clientToDelete !== null}
        onClose={() => setClientToDelete(null)}
        onConfirm={() => {
          if (clientToDelete) {
            onDeleteClient(clientToDelete.id);
            setClientToDelete(null);
          }
        }}
        title="Hapus Data Klien / Instansi"
        itemType="Data Klien"
        itemName={clientToDelete?.namaInstansi}
        message="Apakah Anda yakin ingin menghapus instansi klien ini? Data kontak dan riwayat kemitraan akan dihapus dari daftar."
        confirmButtonText="Ya, Hapus Klien"
      />
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
  const [sponsorToDelete, setSponsorToDelete] = useState<Sponsor | null>(null);

  const [formSponsor, setFormSponsor] = useState('');
  const [formJenis, setFormJenis] = useState<'Uang' | 'Barang' | 'Media'>('Uang');
  const [formKontak, setFormKontak] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // 10 data dummy
  const sponsorList = sponsors.slice(0, 10);
  const filtered = sponsorList;

  const handleOpenAdd = () => {
    setEditingSponsor(null);
    setFormSponsor('');
    setFormJenis('Uang');
    setFormKontak('');
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Sponsor) => {
    setEditingSponsor(s);
    setFormSponsor(s.namaSponsor);
    // map to Uang/Barang/Media
    const jenis = s.jenisSponsorship === 'Media Partner' ? 'Media' : s.jenisSponsorship === 'Pendukung' ? 'Barang' : 'Uang';
    setFormJenis(jenis);
    setFormKontak(s.kontakPerson + ' (' + s.telepon + ')');
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSponsor.trim() || !formKontak.trim()) {
      setFormError('Mohon isi nama perusahaan sponsor dan kontak PIC!');
      return;
    }
    setFormError(null);

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
                          onClick={() => setSponsorToDelete(sponsor)}
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
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
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

      {/* Modal Konfirmasi Hapus Sponsor */}
      <DeleteConfirmModal
        isOpen={sponsorToDelete !== null}
        onClose={() => setSponsorToDelete(null)}
        onConfirm={() => {
          if (sponsorToDelete) {
            onDeleteSponsor(sponsorToDelete.id);
            setSponsorToDelete(null);
          }
        }}
        title="Hapus Mitra Sponsor"
        itemType="Mitra Kemitraan"
        itemName={sponsorToDelete?.namaSponsor}
        message="Apakah Anda yakin ingin menghapus mitra sponsor ini? Seluruh data dukungan dan kontak person akan dihapus."
        confirmButtonText="Ya, Hapus Sponsor"
      />
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
  const [pengajuanToCancel, setPengajuanToCancel] = useState<PengajuanPenugasan | null>(null);

  const [formNama, setFormNama] = useState('');
  const [formTanggal, setFormTanggal] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // 10 data dummy
  const list10 = pengajuanList.slice(0, 10);
  const filtered = list10;

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormNama('');
    setFormTanggal(new Date().toISOString().split('T')[0]);
    setFormClient('Dinas Pariwisata Kota Surabaya');
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: PengajuanPenugasan) => {
    setEditingItem(p);
    setFormNama(p.namaKegiatan);
    setFormTanggal(p.tanggal);
    setFormClient(p.client);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama.trim() || !formTanggal.trim() || !formClient.trim()) {
      setFormError('Mohon lengkapi nama kegiatan, tanggal, dan client pemohon!');
      return;
    }
    setFormError(null);

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
                            onClick={() => setPengajuanToCancel(item)}
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
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
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

      {/* Modal Konfirmasi Pembatalan Pengajuan */}
      <DeleteConfirmModal
        isOpen={pengajuanToCancel !== null}
        onClose={() => setPengajuanToCancel(null)}
        onConfirm={() => {
          if (pengajuanToCancel) {
            onCancelPengajuan(pengajuanToCancel.id);
            setPengajuanToCancel(null);
          }
        }}
        title="Batalkan Pengajuan Penugasan"
        variant="warning"
        itemType="Pengajuan Penugasan"
        itemName={pengajuanToCancel?.namaKegiatan}
        message="Apakah Anda yakin ingin membatalkan berkas pengajuan penugasan ini? Status pengajuan akan diubah menjadi 'Dibatalkan'."
        confirmButtonText="Ya, Batalkan Pengajuan"
      />
    </div>
  );
}

// ============================================================================
// 5. HALAMAN LIHAT INFORMASI TALENT (KATALOG KEAHLIAN & KEBUTUHAN KLIEN - HUMAS)
// ============================================================================
interface HumasTalentInfoProps {
  talents: User[];
  penugasanList?: Penugasan[];
  onNavigateToScreen?: (screenId: string) => void;
}

interface ClientEventPortfolio {
  id: string;
  namaKegiatan: string;
  tanggal: string;
  lokasi: string;
  peranKhusus: string;
  client: string;
  status: 'Selesai' | 'Dikonfirmasi' | 'Berjalan';
  laporanDeskripsi: string;
  laporanBukti: string;
  testimoniKlien: string;
  kesesuaianAcara: string;
}

export function HumasTalentInfo({ talents, penugasanList = [], onNavigateToScreen }: HumasTalentInfoProps) {
  const talentList = talents.filter(u => u.peran === 'Talent').slice(0, 15);
  const [selectedTalent, setSelectedTalent] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'MATCHING' | 'CLIENT_SHOWCASE'>('MATCHING');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [filterBahasa, setFilterBahasa] = useState('Semua');
  const [filterKetersediaan, setFilterKetersediaan] = useState('Semua');
  const [copySuccess, setCopySuccess] = useState(false);

  // Close modal with Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedTalent) {
        setSelectedTalent(null);
      }
    };
    if (selectedTalent) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedTalent]);

  // Atribut representasi klien untuk setiap talent
  const getTalentClientAttributes = (t: User) => {
    const isNing = t.nama.toLowerCase().includes('ning');
    
    let gelar = isNing ? 'Ning Surabaya' : 'Cak Surabaya';
    if (t.nama.includes('Aditya')) gelar = 'Wakil I Cak Surabaya 2023';
    else if (t.nama.includes('Dania')) gelar = 'Ning Favorit Surabaya 2024';
    else if (t.nama.includes('Budi')) gelar = 'Cak Persahabatan Surabaya 2022';
    else if (t.nama.includes('Citra')) gelar = 'Ning Berbakat Surabaya 2021';
    else if (t.nama.includes('Rian')) gelar = 'Finalis Cak Surabaya 2023';
    else if (t.nama.includes('Salsa')) gelar = 'Wakil II Ning Surabaya 2024';
    else gelar = `${isNing ? 'Ning' : 'Cak'} Berprestasi (${t.angkatan || 'Cak Ning 2024'})`;

    const bahasa = t.bahasa || (
      t.nama.includes('Aditya') ? ['Indonesia (Native)', 'English (Bilingual / TOEFL 600)', 'Jawa Kromo (Fasih)'] :
      t.nama.includes('Rian') ? ['Indonesia (Native)', 'Mandarin (HSK 5 / Fluent)', 'English (Conversational)'] :
      t.nama.includes('Dania') ? ['Indonesia (Native)', 'Jawa Arekan (Luwes)', 'English (Active)'] :
      t.nama.includes('Salsa') ? ['Indonesia (Native)', 'English (Fluent)', 'Jawa Arekan'] :
      ['Indonesia (Native)', 'English (Active Communication)', 'Jawa Kromo & Arekan (Fasih)']
    );

    const tinggi = t.tinggiBadan || (isNing ? (t.nama.includes('Salsa') ? 171 : 168) : (t.nama.includes('Aditya') ? 180 : 177));

    const kategoriCocok = t.kategoriAcaraCocok || (
      t.spesialisasi?.includes('MC') ? ['Protokoler Kenegaraan VIP', 'Corporate Gala Dinner', 'Bilingual MC Formal'] :
      t.spesialisasi?.includes('Tari') ? ['Festival Seni Budaya', 'Penyambutan Tamu Kehormatan', 'Parade Wisata'] :
      t.spesialisasi?.includes('Sejarah') ? ['Surabaya Heritage Track', 'City Tour Delegasi Asing', 'Wisata Sejarah Cagar Budaya'] :
      t.spesialisasi?.includes('Public Speaking') ? ['Moderator Talkshow', 'Brand Ambassador', 'Seminar & Workshop Remaja'] :
      ['Acara Resmi Pemerintah Kota', 'Pameran Pariwisata Internasional', 'Hospitality Tamu VIP']
    );

    const klienUtama = t.klienPernahDilayani || (
      t.nama.includes('Aditya') ? ['Pemerintah Kota Surabaya', 'Konsulat Jenderal AS & Jepang', 'PT Bank Jatim Tbk'] :
      t.nama.includes('Dania') ? ['Disbudporapar Surabaya', 'Dinas Koperasi & UMKM', 'PHRI Jawa Timur'] :
      t.nama.includes('Budi') ? ['Surabaya Heritage Track', 'Dinas Perpustakaan', 'Museum 10 Nopember'] :
      t.nama.includes('Rian') ? ['ASITA Jawa Timur', 'Konsulat Jenderal Tiongkok', 'Hotel Bumi Surabaya'] :
      ['Pemerintah Kota Surabaya', 'Dewan Kesenian Surabaya', 'Biro Perjalanan Wisata ASITA']
    );

    const ketersediaan: 'Siap Ditugaskan ke Klien' | 'Jadwal Terisi' = t.status === 'Nonaktif' ? 'Jadwal Terisi' : 'Siap Ditugaskan ke Klien';

    return { gelar, bahasa, tinggi, kategoriCocok, klienUtama, ketersediaan };
  };

  // Portofolio acara klien (FOKUS KLIEN, TANPA HONOR/FINANSIAL PRIBADI)
  const getTalentPortfolio = (talent: User): ClientEventPortfolio[] => {
    const directAssignments = penugasanList.filter(
      p => p.talentId === talent.id || p.talentNama === talent.nama
    ).map(p => ({
      id: p.id,
      namaKegiatan: p.kegiatanNama,
      tanggal: p.tanggal,
      lokasi: p.lokasi,
      peranKhusus: talent.spesialisasi?.split('&')[0]?.trim() || 'Protokoler Resmi',
      client: 'Pemerintah Kota Surabaya / Dinas Kebudayaan',
      status: p.status === 'Selesai' ? ('Selesai' as const) : ('Dikonfirmasi' as const),
      laporanDeskripsi: p.laporanDeskripsi || 'Bertugas mendampingi tamu VIP dan memandu jalannya acara seremonial resmi.',
      laporanBukti: p.laporanBuktiLink || `laporan_${talent.username}.pdf`,
      testimoniKlien: 'Penyelenggara sangat mengapresiasi keramahan dan ketepatan tata keprotokolan duta.',
      kesesuaianAcara: 'Protokoler Kenegaraan & Tamu VIP'
    }));

    const baselineEvents: ClientEventPortfolio[] = [
      {
        id: `hist-1-${talent.id}`,
        namaKegiatan: 'Surabaya Vaganza - Parade Budaya dan Bunga 2026',
        tanggal: '2026-05-31',
        lokasi: 'Jalan Tunjungan - Balai Pemuda',
        peranKhusus: talent.spesialisasi || 'Duta Busana Kebaya & Beskap Tradisional',
        client: 'Dinas Kebudayaan, Kepemudaan dan Olahraga Surabaya',
        status: 'Selesai',
        laporanDeskripsi: 'Mengenakan busana adat kebesaran Cak & Ning di atas mobil hias utama, menyapa ribuan warga Surabaya dan delegasi internasional.',
        laporanBukti: `dokumentasi_vaganza_${talent.username}.jpg`,
        testimoniKlien: 'Penampilan luar biasa memukau, menjadi objek foto utama bagi delegasi luar negeri dan awak media.',
        kesesuaianAcara: 'Festival Internasional & Karnaval Wisata'
      },
      {
        id: `hist-2-${talent.id}`,
        namaKegiatan: 'Festival Rujak Uleg Kembang Jepun 2026',
        tanggal: '2026-05-20',
        lokasi: 'Kawasan Wisata Pecinan Kya-Kya Kembang Jepun',
        peranKhusus: 'Pendamping Tamu Kehormatan & Pemandu Budaya',
        client: 'Pemerintah Kota Surabaya (Disbudporapar)',
        status: 'Selesai',
        laporanDeskripsi: 'Memandu rombongan kepala dinas dan konsulat jenderal dalam prosesi uleg cobek raksasa tradisional Jawa Timur.',
        laporanBukti: `lpj_rujak_uleg_${talent.username}.pdf`,
        testimoniKlien: 'Sangat sigap mendampingi tamu kehormatan diplomatik serta menjelaskan nilai sejarah arek secara menarik.',
        kesesuaianAcara: 'Diplomatic Hospitality & Kuliner'
      },
      {
        id: `hist-3-${talent.id}`,
        namaKegiatan: 'Gala Dinner HUT Asosiasi Agen Perjalanan Wisata (ASITA)',
        tanggal: '2026-04-18',
        lokasi: 'Isyana Ballroom Hotel Bumi Surabaya',
        peranKhusus: 'MC Bilingual & Hospitality Tamu Nasional',
        client: 'Dewan Pengurus Daerah ASITA Jawa Timur',
        status: 'Selesai',
        laporanDeskripsi: 'Menyambut 120 perwakilan agen biro perjalanan seluruh Indonesia dan mempromosikan destinasi Kota Lama Surabaya.',
        laporanBukti: `laporan_asita_${talent.username}.pdf`,
        testimoniKlien: 'Penguasaan panggung sangat hidup, transisi bahasa Indonesia dan Inggris mengalir sangat natural.',
        kesesuaianAcara: 'Corporate Gala Dinner & BUMN'
      },
      {
        id: `hist-4-${talent.id}`,
        namaKegiatan: 'Cak & Ning Goes to School - Edukasi Budaya Remaja',
        tanggal: '2026-03-12',
        lokasi: 'Auditorium SMAN 5 & SMAN 2 Surabaya',
        peranKhusus: 'Narasumber Motivasi & Pelestarian Bahasa Arek',
        client: 'Sie SDM & Diklat Paguyuban Cak & Ning',
        status: 'Selesai',
        laporanDeskripsi: 'Mengajarkan sejarah kearifan lokal, etika berbicara arekan santun, dan promosi pendaftaran pemilihan duta baru.',
        laporanBukti: `dokumentasi_sekolah_${talent.username}.jpg`,
        testimoniKlien: 'Antusiasme audiens sangat tinggi, pembawaan ceria dan sangat dekat dengan karakteristik pemuda.',
        kesesuaianAcara: 'Edukasi Sekolah & Workshop Budaya'
      }
    ];

    const seenTitles = new Set(directAssignments.map(d => d.namaKegiatan.toLowerCase()));
    const additional = baselineEvents.filter(b => !seenTitles.has(b.namaKegiatan.toLowerCase()));
    return [...directAssignments, ...additional];
  };

  // Salin ringkasan profil penawaran klien untuk dikirim ke WhatsApp / Proposal
  const handleCopyProfileProposal = (t: User) => {
    const attr = getTalentClientAttributes(t);
    const textToCopy = `REKOMENDASI DUTA WISATA CAK & NING SURABAYA
Klien / Agenda  : Penugasan Kemitraan & Event Resmi
Nama Duta       : ${t.nama} (${attr.gelar})
Spesialisasi    : ${t.spesialisasi || 'MC & Protokoler Tamu Kehormatan'}
Penguasaan Bahasa: ${attr.bahasa.join(', ')}
Standar Fisik   : Tinggi Badan ${attr.tinggi} cm | Busana Adat Lengkap Resmi Paguyuban
Kategori Acara  : ${attr.kategoriCocok.join(' • ')}
Klien Terdahulu : ${attr.klienUtama.join(', ')}
Rating Kepuasan : ★ ${t.rating ? t.rating.toFixed(2) : '4.95'} / 5.0 (Sangat Memuaskan)
Status Booking  : ${attr.ketersediaan}
Kontak Humas    : 0812-3456-7802 (humas@cakning.org - Sie Humas & Kemitraan)`;

    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 4000);
  };

  const filtered = talentList.filter(t => {
    const attr = getTalentClientAttributes(t);
    const matchSearch = searchTerm.trim() === '' ||
      t.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.spesialisasi && t.spesialisasi.toLowerCase().includes(searchTerm.toLowerCase())) ||
      attr.kategoriCocok.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
      attr.bahasa.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
      attr.klienUtama.some(kl => kl.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchKategori = filterKategori === 'Semua' || attr.kategoriCocok.some(k => k.includes(filterKategori));
    const matchBahasa = filterBahasa === 'Semua' || attr.bahasa.some(b => b.toLowerCase().includes(filterBahasa.toLowerCase()));
    const matchKetersediaan = filterKetersediaan === 'Semua' || attr.ketersediaan === filterKetersediaan;

    return matchSearch && matchKategori && matchBahasa && matchKetersediaan;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans relative">
      {/* Header Halaman Humas */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold mb-1.5">
            <Briefcase className="w-3.5 h-3.5 text-amber-600" /> Katalog Kemitraan & Event Matching
          </div>
          <h2 className="text-2xl font-black text-[#1A3C5E]">Katalog Keahlian Duta & Kebutuhan Klien</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Eksplorasi spesialisasi bakat, kemampuan bahasa, dan rekam jejak kepuasan klien untuk memenuhi permintaan acara/kemitraan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            {filtered.length} Duta Sesuai Kriteria
          </span>
        </div>
      </div>

      {/* Filter Bar Klien & Event Matching */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari keahlian (MC, Tari Remo), bahasa (Inggris/Mandarin), klien, atau nama duta..."
              className="w-full text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold">Jenis Acara:</span>
              <select
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
                className="text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="Semua">Semua Kategori Acara</option>
                <option value="Protokoler">Protokoler Kenegaraan VIP</option>
                <option value="Corporate">Corporate Gala Dinner</option>
                <option value="Festival">Festival & Parade Budaya</option>
                <option value="Heritage">Wisata Heritage / City Tour</option>
                <option value="Public Speaking">Moderator / Talkshow</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold">Bahasa:</span>
              <select
                value={filterBahasa}
                onChange={(e) => setFilterBahasa(e.target.value)}
                className="text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="Semua">Semua Bahasa</option>
                <option value="English">English Bilingual</option>
                <option value="Mandarin">Mandarin</option>
                <option value="Jawa">Jawa Kromo / Arekan</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold">Status Booking:</span>
              <select
                value={filterKetersediaan}
                onChange={(e) => setFilterKetersediaan(e.target.value)}
                className="text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="Semua">Semua Status</option>
                <option value="Siap Ditugaskan ke Klien">Siap Ditugaskan ke Klien</option>
                <option value="Jadwal Terisi">Jadwal Terisi</option>
              </select>
            </div>

            {(searchTerm || filterKategori !== 'Semua' || filterBahasa !== 'Semua' || filterKetersediaan !== 'Semua') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterKategori('Semua');
                  setFilterBahasa('Semua');
                  setFilterKetersediaan('Semua');
                }}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1.5 rounded hover:bg-rose-50 transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabel Informasi Talent Khusus Humas (Event & Client Fit Focus) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Duta Wisata</th>
                <th className="p-3.5">Spesialisasi & Bakat Seni</th>
                <th className="p-3.5">Penguasaan Bahasa</th>
                <th className="p-3.5">Kesesuaian Jenis Acara Klien</th>
                <th className="p-3.5 text-center">Rating Klien</th>
                <th className="p-3.5 text-center">Ketersediaan Klien</th>
                <th className="p-3.5 text-center">Aksi Humas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length > 0 ? (
                filtered.map((t, idx) => {
                  const isNing = t.nama.toLowerCase().includes('ning');
                  const attr = getTalentClientAttributes(t);

                  return (
                    <tr key={t.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full ${isNing ? 'bg-gradient-to-tr from-rose-500 to-pink-600' : 'bg-gradient-to-tr from-[#1A3C5E] to-blue-700'} text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0 font-mono`}>
                            {t.nama.replace(/(Cak|Ning)\s+/i, '').charAt(0)}
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedTalent(t);
                                setActiveTab('MATCHING');
                              }}
                              className="font-bold text-[#1A3C5E] hover:text-amber-700 hover:underline cursor-pointer text-left block"
                            >
                              {t.nama}
                            </button>
                            <span className="text-[10px] text-slate-400 font-medium">{attr.gelar}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold text-slate-800 block">{t.spesialisasi || 'MC & Protokoler'}</span>
                        <span className="text-[10px] text-slate-400">Atribut: Tinggi {attr.tinggi} cm</span>
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {attr.bahasa.slice(0, 2).map((lang, lIdx) => (
                            <span key={lIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {lang.split('(')[0].trim()}
                            </span>
                          ))}
                          {attr.bahasa.length > 2 && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 font-mono">
                              +{attr.bahasa.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {attr.kategoriCocok.slice(0, 2).map((cat, cIdx) => (
                            <span key={cIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-[11px]">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {t.rating ? t.rating.toFixed(2) : '4.95'}
                        </span>
                      </td>
                      <td className="p-3.5 text-center whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          attr.ketersediaan === 'Siap Ditugaskan ke Klien'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {attr.ketersediaan === 'Siap Ditugaskan ke Klien' ? '🟢 Siap Ditugaskan' : '🟡 Jadwal Terisi'}
                        </span>
                      </td>
                      <td className="p-3.5 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTalent(t);
                            setActiveTab('MATCHING');
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#1A3C5E] border border-amber-200/90 font-bold text-xs cursor-pointer transition-all shadow-2xs hover:shadow-xs active:scale-95"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-600" />
                          <span>Katalog Klien</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    <p className="font-semibold text-slate-500 mb-1">Tidak ada duta wisata yang sesuai dengan filter pencarian klien.</p>
                    <p className="text-xs">Coba ubah kata kunci atau reset filter kategori acara dan bahasa.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODAL KHUSUS HUMAS: PROFIL KEAHLIAN DUTA UNTUK PERMINTAAN KLIEN      */}
      {/* (FOKUS EVENT MATCHING & TESTIMONI KLIEN - BEBAS DARI HONOR PRIBADI)  */}
      {/* ==================================================================== */}
      {selectedTalent && (() => {
        const attr = getTalentClientAttributes(selectedTalent);
        const portfolioItems = getTalentPortfolio(selectedTalent);

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-150"
            onClick={() => setSelectedTalent(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#1A3C5E] via-slate-900 to-[#1A3C5E] text-white p-5 sm:p-6 relative shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedTalent(null)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Tutup Detail"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-amber-400 text-amber-400 flex items-center justify-center text-xl font-black shadow-inner shrink-0 font-mono">
                    {selectedTalent.nama.replace(/(Cak|Ning)\s+/i, '').charAt(0)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                        {selectedTalent.nama}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-400 text-slate-900">
                        {attr.gelar}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        attr.ketersediaan === 'Siap Ditugaskan ke Klien' ? 'bg-emerald-400 text-slate-900' : 'bg-slate-300 text-slate-800'
                      }`}>
                        {attr.ketersediaan}
                      </span>
                    </div>

                    <p className="text-xs text-amber-200 font-medium flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{selectedTalent.spesialisasi || 'MC Formal & Protokoler Internasional'}</span>
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-300 font-mono">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <strong>{selectedTalent.rating ? selectedTalent.rating.toFixed(2) : '4.95'}</strong> / 5.00 Kepuasan Klien
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-300" />
                        {selectedTalent.telepon}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tab Navigation Humas */}
                <div className="flex items-center gap-2 mt-5 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveTab('MATCHING')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'MATCHING'
                        ? 'bg-amber-400 text-slate-900 shadow-sm'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Matriks Keahlian & Kebutuhan Klien</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('CLIENT_SHOWCASE')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'CLIENT_SHOWCASE'
                        ? 'bg-amber-400 text-slate-900 shadow-sm'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Rekam Jejak Klien & Testimoni ({portfolioItems.length})</span>
                  </button>
                </div>
              </div>

              {/* Modal Body Content (Scrollable) */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50/60">
                {activeTab === 'MATCHING' ? (
                  <div className="space-y-4">
                    {/* 4 Statistik Humas (Bebas dari informasi honor/gaji) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Rating Kepuasan Klien
                        </span>
                        <span className="text-lg font-black text-amber-600 font-mono mt-0.5 flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          {selectedTalent.rating ? selectedTalent.rating.toFixed(2) : '4.95'}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                          Indeks Kepuasan 98%
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Penguasaan Bahasa
                        </span>
                        <span className="text-lg font-black text-[#1A3C5E] font-mono mt-0.5 block">
                          {attr.bahasa.length} Bahasa
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                          Bilingual Ready
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Standar Fisik Duta
                        </span>
                        <span className="text-lg font-black text-[#1A3C5E] font-mono mt-0.5 block">
                          {attr.tinggi} cm
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                          Busana Adat Lengkap
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Status Booking Klien
                        </span>
                        <span className="text-xs font-black text-emerald-700 font-sans mt-1.5 block uppercase">
                          {attr.ketersediaan === 'Siap Ditugaskan ke Klien' ? 'Tersedia' : 'Jadwal Terisi'}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Siap Diajukan Humas
                        </span>
                      </div>
                    </div>

                    {/* Matriks Kategori Acara Klien yang Cocok */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Kategori Acara Klien Paling Sesuai (Best-Fit Events)</span>
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">Rekomendasi Berdasarkan Bakat</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {attr.kategoriCocok.map((cat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-[#1A3C5E] border border-amber-200 text-xs font-bold">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>{cat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Penguasaan Bahasa & Komunikasi Klien */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Kemampuan Bahasa & Diplomasi
                        </span>
                        <div className="space-y-1.5">
                          {attr.bahasa.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                              <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Klien Utama yang Pernah Dilayani
                        </span>
                        <div className="space-y-1.5">
                          {attr.klienUtama.map((kl, kIdx) => (
                            <div key={kIdx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                              <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>{kl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Biografi & Nilai Tambah Duta untuk Klien */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Ringkasan Nilai Tambah Duta untuk Presentasi Klien
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-150">
                        {selectedTalent.bio || 'Duta Wisata berprestasi Paguyuban Cak & Ning Surabaya dengan kompetensi etika keprotokolan tinggi, kemampuan public speaking santun, dan pemahaman budaya Jawa Timur yang mendalam.'}
                      </p>
                    </div>

                    {/* Berkas Portofolio / Press Kit */}
                    <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-5 h-5 text-[#1A3C5E]" />
                        <div>
                          <strong className="text-xs text-[#1A3C5E] block">
                            {selectedTalent.portofolioLink || `press_kit_${selectedTalent.username}.pdf`}
                          </strong>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Press Kit Resmi & Lampiran Portofolio untuk Klien
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 bg-[#1A3C5E] text-white rounded-lg flex items-center gap-1 shadow-2xs">
                        <ExternalLink className="w-3.5 h-3.5 text-amber-400" /> Siap Dilampirkan
                      </span>
                    </div>
                  </div>
                ) : (
                  /* TAB 2: REKAM JEJAK KLIEN (FOKUS TESTIMONI, BEBAS DARI NOMINAL HONOR) */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-600" />
                        <span>Rekam Jejak Acara Klien & Hasil Penugasan Duta</span>
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        Urut Waktu Pelaksanaan
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      {portfolioItems.map((item, i) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-amber-300 transition-all space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="w-5 h-5 rounded-md bg-[#1A3C5E] text-amber-400 font-black text-[10px] flex items-center justify-center font-mono shrink-0">
                                  {i + 1}
                                </span>
                                <h5 className="text-sm font-bold text-[#1A3C5E]">
                                  {item.namaKegiatan}
                                </h5>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                  {item.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                Klien / Mitra: <strong className="text-slate-800">{item.client}</strong>
                              </p>
                            </div>

                            <div className="text-left sm:text-right shrink-0">
                              <span className="text-[11px] font-mono text-slate-600 font-bold block">
                                {item.tanggal}
                              </span>
                              <span className="text-[10px] text-slate-400 flex items-center sm:justify-end gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                {item.lokasi}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-150 text-xs">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                                Peran Yang Dibawakan
                              </span>
                              <strong className="text-slate-800 block">{item.peranKhusus}</strong>
                              <span className="text-[10px] text-amber-700 font-medium block mt-1">
                                {item.kesesuaianAcara}
                              </span>
                            </div>

                            <div className="sm:col-span-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                                Ulasan Hasil & Deskripsi Pelaksanaan
                              </span>
                              <p className="text-slate-600 leading-relaxed text-[11px]">
                                {item.laporanDeskripsi}
                              </p>
                            </div>
                          </div>

                          {/* Testimoni Klien */}
                          <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-[10px] uppercase font-bold text-amber-800 block">Feedback Klien:</strong>
                              <span className="text-[11px] italic">"{item.testimoniKlien}"</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Khusus Humas */}
              <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyProfileProposal(selectedTalent)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-300 hover:border-[#1A3C5E] bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  title="Salin teks rekomendasi duta untuk dikirimkan ke WhatsApp/Proposal Klien"
                >
                  <Copy className="w-3.5 h-3.5 text-[#1A3C5E]" />
                  <span>{copySuccess ? 'Tersalin ke Clipboard!' : 'Salin Format Penawaran Klien'}</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedTalent(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>

                  {onNavigateToScreen && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTalent(null);
                        onNavigateToScreen('HUMAS_PENGAJUAN');
                      }}
                      className="px-5 py-2 rounded-xl bg-[#1A3C5E] hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ajukan Duta ke Formulir Klien</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Toast Notification for Clipboard Copy */}
      {copySuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-2xl bg-[#1A3C5E] text-white border border-amber-400 text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">Format penawaran profil klien berhasil disalin! Siap dipaste ke WhatsApp atau surat penawaran.</span>
        </div>
      )}
    </div>
  );
}
