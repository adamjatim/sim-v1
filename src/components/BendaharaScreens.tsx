import React, { useState, useEffect } from 'react';
import { Penugasan, Transaksi } from '../types';
import { 
  DollarSign, 
  Send, 
  ArrowRight, 
  CheckCircle, 
  Upload, 
  Calendar, 
  Download, 
  FileText, 
  Filter, 
  Printer, 
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Edit3,
  Search,
  TrendingUp,
  TrendingDown,
  Info,
  X
} from 'lucide-react';

// ==========================================
// 13. DASHBOARD BENDAHARA (INTEGRATED MANAGEMENT)
// ==========================================
interface BendaharaDashboardProps {
  penugasanList: Penugasan[];
  transaksiList: Transaksi[];
  onUpdateHonorInline: (id: string, nominal: number) => void;
  onNavigateToPaymentInput: (penugasanId: string) => void;
  onNavigateToReport?: () => void;
  // State handlers passed from App.tsx (for simulated additions)
  onAddTransaksi?: (t: Transaksi) => void;
  onUpdateTransaksi?: (t: Transaksi) => void;
}

export function BendaharaDashboard({
  penugasanList,
  transaksiList = [],
  onUpdateHonorInline,
  onNavigateToPaymentInput,
  onNavigateToReport,
  onAddTransaksi,
  onUpdateTransaksi
}: BendaharaDashboardProps) {
  const [activeTab, setActiveTab] = useState<'pencairan' | 'kelola_kas' | 'laporan_kas'>('pencairan');
  
  // Stats
  const waitingTransferList = penugasanList.filter(p => p.status === 'Selesai' && p.statusBayar !== 'Lunas');
  const waitingTransferCount = waitingTransferList.length;

  const paidAssignments = penugasanList.filter(p => p.statusBayar === 'Lunas');
  const totalPaidHonor = paidAssignments.reduce((acc, curr) => acc + (curr.honor || 0), 0);
  
  // Total funding received and active balance calculated from transactions
  const totalMasuk = transaksiList
    .filter(t => t.tipe === 'Masuk')
    .reduce((sum, t) => sum + t.nominal, 0);
  const totalKeluar = transaksiList
    .filter(t => t.tipe === 'Keluar')
    .reduce((sum, t) => sum + t.nominal, 0);
  
  const currentBalance = totalMasuk - totalKeluar;

  // --- KELOLA TRANSAKSI STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaksi, setEditingTransaksi] = useState<Transaksi | null>(null);
  
  // Form Fields
  const [txTanggal, setTxTanggal] = useState('');
  const [txTipe, setTxTipe] = useState<'Masuk' | 'Keluar'>('Keluar');
  const [txNominal, setTxNominal] = useState(0);
  const [txKategori, setTxKategori] = useState('Konsumsi');
  const [txKeterangan, setTxKeterangan] = useState('');
  const [txSumber, setTxSumber] = useState('Cak Reza Fahlevi (Bendahara)');

  // Search & Filter state for transactions
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');

  // Open modal for adding
  const handleOpenAdd = () => {
    setEditingTransaksi(null);
    setTxTanggal(new Date().toISOString().split('T')[0]);
    setTxTipe('Keluar');
    setTxNominal(0);
    setTxKategori('Konsumsi');
    setTxKeterangan('');
    setTxSumber('Cak Reza Fahlevi (Bendahara)');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (t: Transaksi) => {
    setEditingTransaksi(t);
    setTxTanggal(t.tanggal);
    setTxTipe(t.tipe);
    setTxNominal(t.nominal);
    setTxKategori(t.kategori);
    setTxKeterangan(t.keterangan);
    setTxSumber(t.sumberDanAktor);
    setIsModalOpen(true);
  };

  // Save form handler (Simulated)
  const handleSaveTransaksiForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (txNominal <= 0) {
      alert('Nominal transaksi harus lebih dari Rp 0!');
      return;
    }
    if (!txKeterangan.trim()) {
      alert('Keterangan transaksi wajib diisi!');
      return;
    }

    if (editingTransaksi) {
      // Edit mode simulation
      const updated: Transaksi = {
        ...editingTransaksi,
        tanggal: txTanggal,
        tipe: txTipe,
        nominal: txNominal,
        kategori: txKategori,
        keterangan: txKeterangan,
        sumberDanAktor: txSumber
      };
      if (onUpdateTransaksi) {
        onUpdateTransaksi(updated);
      }
      alert('Simulasi Edit Sukses!\n\nTransaksi keuangan berhasil disunting dalam memori prototipe.');
    } else {
      // Add mode simulation
      const newTx: Transaksi = {
        id: 'tx_sim_' + Date.now(),
        tanggal: txTanggal,
        tipe: txTipe,
        nominal: txNominal,
        kategori: txKategori,
        keterangan: txKeterangan,
        sumberDanAktor: txSumber
      };
      if (onAddTransaksi) {
        onAddTransaksi(newTx);
      }
      alert('Simulasi Tambah Sukses!\n\nTransaksi pengeluaran/pemasukan baru berhasil dicatat di sistem.');
    }
    setIsModalOpen(false);
  };

  // Delete transaction simulation (Do not delete actual records so prototype is intact)
  const handleDeleteTxSimulated = (id: string, ket: string) => {
    alert(`Simulasi Hapus Berhasil (Prototype Mode)!\n\nTransaksi "${ket}" berhasil disimulasikan terhapus.\n\n(Catatan: Data asli dipertahankan agar visual prototipe tidak kosong saat demo).`);
  };

  // Filtered transactions
  const filteredTransactions = transaksiList.filter(t => {
    const matchesSearch = t.keterangan.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.sumberDanAktor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesKategori = filterKategori === 'Semua' || t.kategori === filterKategori;
    return matchesSearch && matchesKategori;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Integrated Tab Navigation */}
      <div className="border-b border-[#E0E0E0] pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Portal Keuangan & Kas Paguyuban</h2>
          <p className="text-xs text-slate-500">Kelola realisasi anggaran kas paguyuban, plotting honorarium, pencatatan buku besar, dan laporan pengeluaran.</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-2 border-[#1A3C5E] bg-white text-xs">
          <button
            onClick={() => setActiveTab('pencairan')}
            className={`px-3 py-1.5 font-bold uppercase cursor-pointer border-r border-[#1A3C5E] transition-all ${
              activeTab === 'pencairan' ? 'bg-[#1A3C5E] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Pencairan Honor Duta
          </button>
          <button
            onClick={() => setActiveTab('kelola_kas')}
            className={`px-3 py-1.5 font-bold uppercase cursor-pointer border-r border-[#1A3C5E] transition-all ${
              activeTab === 'kelola_kas' ? 'bg-[#1A3C5E] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Kelola Keuangan (Kas)
          </button>
          <button
            onClick={() => setActiveTab('laporan_kas')}
            className={`px-3 py-1.5 font-bold uppercase cursor-pointer transition-all ${
              activeTab === 'laporan_kas' ? 'bg-[#1A3C5E] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Buku Laporan Kas
          </button>
        </div>
      </div>

      {/* 3 Finance Cards dynamically calculated */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Saldo Kas Aktif Paguyuban</span>
            <span className="text-xl font-bold text-[#1A3C5E] block font-mono">Rp {currentBalance.toLocaleString('id-ID')}</span>
          </div>
          <div className="bg-slate-100 border border-[#1A3C5E] p-2 text-[#1A3C5E]">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Penerimaan Kas (In)</span>
            <span className="text-xl font-bold text-[#2E7D32] block font-mono">Rp {totalMasuk.toLocaleString('id-ID')}</span>
          </div>
          <div className="bg-slate-100 border border-[#1A3C5E] p-2 text-[#2E7D32]">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border-2 border-[#1A3C5E] p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Pengeluaran Kas (Out)</span>
            <span className="text-xl font-bold text-red-600 block font-mono">Rp {totalKeluar.toLocaleString('id-ID')}</span>
          </div>
          <div className="bg-slate-100 border border-[#1A3C5E] p-2 text-red-600">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* TAB CONTENT: 1. PENCAIRAN HONOR */}
      {activeTab === 'pencairan' && (
        <div className="bg-white border-2 border-[#1A3C5E] p-5 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="font-bold text-sm uppercase tracking-tight text-[#1A3C5E]">Daftar Penugasan Siap Bayar</h3>
            <span className="text-[11px] font-mono text-slate-500 bg-amber-50 px-2 py-0.5 border border-amber-200">
              Menunggu Payout: {waitingTransferCount} Talent
            </span>
          </div>

          {waitingTransferList.length === 0 ? (
            <div className="text-center py-10 text-xs border border-dashed border-[#E0E0E0] text-slate-500 bg-slate-50">
              Selesai! Semua honorarium penugasan yang tuntas telah ditransfer dan berstatus lunas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                    <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Kegiatan Resmi</th>
                    <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nama Talent</th>
                    <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Honor (Input Nominal)</th>
                    <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Status Bayar</th>
                    <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0E0E0]">
                  {waitingTransferList.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-800">
                        <div className="space-y-0.5">
                          <p>{p.kegiatanNama}</p>
                          <p className="text-[10px] text-slate-400 font-normal font-mono">{p.tanggal} - {p.lokasi}</p>
                        </div>
                      </td>
                      <td className="p-2.5 font-bold text-slate-700">{p.talentNama}</td>
                      <td className="p-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500 font-bold text-xs">Rp</span>
                          <input
                            type="number"
                            value={p.honor || ''}
                            onChange={(e) => onUpdateHonorInline(p.id, Number(e.target.value))}
                            placeholder="Ketik nominal manual"
                            className="p-1 border border-[#1A3C5E] focus:outline-none focus:bg-amber-50 w-36 font-mono text-xs font-bold text-slate-800"
                          />
                        </div>
                      </td>
                      <td className="p-2.5">
                        <span className="bg-amber-50 text-amber-800 border border-amber-300 font-mono text-[9px] px-2 py-0.5 uppercase tracking-wide font-bold">
                          {p.statusBayar || 'Belum Dibayar'}
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => {
                            if (!p.honor || p.honor <= 0) {
                              alert('Harap ketik nominal honor terlebih dahulu pada kotak input!');
                              return;
                            }
                            onNavigateToPaymentInput(p.id);
                          }}
                          className="bg-amber-600 hover:bg-amber-700 border-none text-white font-bold px-3 py-1 text-[11px] uppercase tracking-wide cursor-pointer transition-colors"
                        >
                          Proses Bayar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 2. KELOLA KEUANGAN (KAS & TRANSAKSI) */}
      {activeTab === 'kelola_kas' && (
        <div className="bg-white border-2 border-[#1A3C5E] p-5 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-tight text-[#1A3C5E]">Daftar Jurnal & Kas Masuk/Keluar</h3>
              <p className="text-[11px] text-slate-500">Mencatat aliran kas paguyuban di luar honorarium penugasan reguler secara berimbang.</p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1.5 px-3 text-xs uppercase cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Tambah Transaksi Kas
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3 text-xs">
            <input
              type="text"
              placeholder="Cari transaksi, aktor, atau keterangan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-2 border border-[#1A3C5E] focus:outline-none"
            />
            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="p-2 border border-[#1A3C5E] bg-white font-sans text-xs"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Kas Disbudpar">Kas Disbudpar</option>
              <option value="Sponsor">Sponsor</option>
              <option value="Honorarium">Honorarium</option>
              <option value="Konsumsi">Konsumsi</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Perlengkapan">Perlengkapan</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E] w-24">Tanggal</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E] w-20">Tipe</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Uraian & Keterangan Kas</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E] w-40">Kategori</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E] w-36 text-right">Nominal</th>
                  <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono text-slate-600">{t.tanggal}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 text-[9px] font-mono uppercase font-bold border rounded-full ${
                        t.tipe === 'Masuk' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
                      }`}>
                        {t.tipe === 'Masuk' ? 'In' : 'Out'}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-800">
                      <div className="space-y-0.5">
                        <p className="font-bold">{t.keterangan}</p>
                        <p className="text-[10px] text-slate-400 font-normal">Aktor: <span className="font-bold">{t.sumberDanAktor}</span></p>
                      </div>
                    </td>
                    <td className="p-2.5">
                      <span className="font-sans text-[11px] font-bold text-[#1A3C5E] bg-slate-100 px-2 py-0.5">
                        {t.kategori}
                      </span>
                    </td>
                    <td className={`p-2.5 font-mono font-bold text-right text-xs ${t.tipe === 'Masuk' ? 'text-green-700' : 'text-red-700'}`}>
                      {t.tipe === 'Masuk' ? '+' : '-'} Rp {t.nominal.toLocaleString('id-ID')}
                    </td>
                    <td className="p-2.5 text-center">
                      <div className="flex gap-1.5 justify-center">
                        <button
                          onClick={() => handleOpenEdit(t)}
                          className="p-1 border border-slate-300 hover:border-[#1A3C5E] bg-white hover:bg-slate-100 text-[#1A3C5E] cursor-pointer"
                          title="Sunting Transaksi"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTxSimulated(t.id, t.keterangan)}
                          className="p-1 border border-slate-300 hover:border-red-600 bg-white hover:bg-red-50 text-red-600 cursor-pointer"
                          title="Hapus Transaksi"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-400 italic">Tidak ada pencatatan transaksi yang cocok dengan kriteria filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. LAPORAN KAS */}
      {activeTab === 'laporan_kas' && (
        <BendaharaFinancialReport
          penugasanList={penugasanList}
          onBack={() => setActiveTab('pencairan')}
        />
      )}

      {/* MODAL FORM OVERLAY (ADD / EDIT) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="bg-white border-2 border-[#1A3C5E] max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E] tracking-tight">
                {editingTransaksi ? 'Sunting Catatan Kas' : 'Tambah Transaksi Kas Baru'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1 hover:bg-slate-100 border cursor-pointer text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTransaksiForm} className="space-y-4 text-xs">
              {/* Tanggal */}
              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Tanggal Transaksi</label>
                <input
                  type="date"
                  value={txTanggal}
                  onChange={(e) => setTxTanggal(e.target.value)}
                  className="w-full p-2 border-2 border-slate-200 focus:border-[#1A3C5E] text-xs font-mono bg-white"
                  required
                />
              </div>

              {/* Tipe & Kategori */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Tipe Aliran Dana</label>
                  <select
                    value={txTipe}
                    onChange={(e) => setTxTipe(e.target.value as 'Masuk' | 'Keluar')}
                    className="w-full p-2 border-2 border-slate-200 focus:border-[#1A3C5E] bg-white font-sans text-xs"
                    required
                  >
                    <option value="Keluar">Uang Keluar (Debet)</option>
                    <option value="Masuk">Uang Masuk (Kredit)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Kategori Pos</label>
                  <select
                    value={txKategori}
                    onChange={(e) => setTxKategori(e.target.value)}
                    className="w-full p-2 border-2 border-slate-200 focus:border-[#1A3C5E] bg-white font-sans text-xs"
                    required
                  >
                    <option value="Kas Disbudpar">Kas Disbudpar</option>
                    <option value="Sponsor">Sponsor</option>
                    <option value="Honorarium">Honorarium</option>
                    <option value="Konsumsi">Konsumsi</option>
                    <option value="Transportasi">Transportasi</option>
                    <option value="Perlengkapan">Perlengkapan</option>
                  </select>
                </div>
              </div>

              {/* Nominal */}
              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Nominal Transaksi (Rupiah)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-bold text-xs text-slate-400 font-mono">Rp</span>
                  <input
                    type="number"
                    value={txNominal || ''}
                    onChange={(e) => setTxNominal(Number(e.target.value))}
                    placeholder="150000"
                    className="w-full pl-9 pr-3 py-2 border-2 border-slate-200 focus:border-[#1A3C5E] text-xs font-mono font-bold"
                    required
                  />
                </div>
              </div>

              {/* Sumber Dan Aktor */}
              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Pihak Sumber / Penanggung Jawab</label>
                <input
                  type="text"
                  value={txSumber}
                  onChange={(e) => setTxSumber(e.target.value)}
                  placeholder="Nama Bendahara / Lembaga Sponsor"
                  className="w-full p-2 border-2 border-slate-200 focus:border-[#1A3C5E]"
                  required
                />
              </div>

              {/* Keterangan */}
              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Keterangan / Deskripsi Uraian</label>
                <textarea
                  rows={2}
                  value={txKeterangan}
                  onChange={(e) => setTxKeterangan(e.target.value)}
                  placeholder="Sebutkan rincian pembelian barang, tujuan honorarium, atau hibah..."
                  className="w-full p-2 border-2 border-slate-200 focus:border-[#1A3C5E] font-sans"
                  required
                />
              </div>

              {/* Form Buttons */}
              <div className="pt-3 border-t flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold py-1.5 px-4 uppercase tracking-wider cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1.5 px-5 uppercase tracking-wider cursor-pointer border-none"
                >
                  {editingTransaksi ? 'Simpan Suntingan' : 'Catat Transaksi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 14. HALAMAN INPUT PEMBAYARAN
// ==========================================
interface BendaharaPaymentInputProps {
  penugasanId: string;
  penugasanList: Penugasan[];
  onSavePayment: (id: string, nominal: number, tanggalTransfer: string, fileLabel: string) => void;
  onCancel: () => void;
}

export function BendaharaPaymentInput({
  penugasanId,
  penugasanList,
  onSavePayment,
  onCancel
}: BendaharaPaymentInputProps) {
  const [selectedId, setSelectedId] = useState(penugasanId);
  const [nominal, setNominal] = useState(0);
  const [tanggalTransfer, setTanggalTransfer] = useState('');
  const [fileName, setFileName] = useState('');

  // Completed unpaid penugasan list to populate dropdown
  const completedUnpaid = penugasanList.filter(p => p.status === 'Selesai' && p.statusBayar !== 'Lunas');

  // Sync state with selected penugasan
  useEffect(() => {
    const selected = penugasanList.find(p => p.id === selectedId);
    if (selected) {
      setNominal(selected.honor || 0);
    }
  }, [selectedId, penugasanList]);

  // Set default current date
  useEffect(() => {
    setTanggalTransfer(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) {
      alert('Pilih penugasan terlebih dahulu!');
      return;
    }
    if (nominal <= 0) {
      alert('Nominal honor harus lebih dari Rp 0!');
      return;
    }
    const finalFile = fileName || 'bukti_transfer_bank_jatim.jpg';
    onSavePayment(selectedId, nominal, tanggalTransfer, finalFile);
    alert('Selesai! Status pembayaran telah diset ke LUNAS dan bukti transfer telah diarsip.');
  };

  const selectMockReceipt = () => {
    const files = [
      'struk_bankjatim_12093.jpg',
      'bukti_trf_mandiri_99212.png',
      'm_banking_jatim_payout.jpg',
      'transfer_receipt_bca_approved.jpg'
    ];
    const rand = files[Math.floor(Math.random() * files.length)];
    setFileName(rand);
  };

  return (
    <div className="max-w-xl mx-auto font-sans p-6 bg-white border-2 border-[#1A3C5E]">
      <div className="border-b border-[#E0E0E0] pb-3 mb-5">
        <h2 className="text-base font-bold uppercase tracking-tight text-[#1A3C5E]">Proses Catat Pembayaran Honor</h2>
        <p className="text-xs text-slate-500">Pencatatan mutasi pengeluaran honorarium kas kasir paguyuban Cak Ning.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Dropdown Select Duty */}
        <div>
          <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Pilih Penugasan Mandat</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] text-xs bg-white font-sans"
            required
          >
            <option value="">-- Silakan Pilih Penugasan --</option>
            {completedUnpaid.map(p => (
              <option key={p.id} value={p.id}>
                {p.kegiatanNama} ({p.talentNama})
              </option>
            ))}
          </select>
        </div>

        {/* Honor Nominal Input */}
        <div>
          <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Nominal Honor (Rupiah)</label>
          <div className="relative">
            <span className="absolute left-3 top-2 font-bold text-xs text-slate-500">Rp</span>
            <input
              type="number"
              value={nominal || ''}
              onChange={(e) => setNominal(Number(e.target.value))}
              placeholder="500000"
              className="w-full pl-9 pr-3 py-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs font-mono font-bold"
              required
            />
          </div>
        </div>

        {/* Date Transfer Picker */}
        <div>
          <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Tanggal Transfer Bank</label>
          <div className="relative">
            <input
              type="date"
              value={tanggalTransfer}
              onChange={(e) => setTanggalTransfer(e.target.value)}
              className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] text-xs font-mono"
              required
            />
          </div>
        </div>

        {/* Attach File Proof */}
        <div>
          <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Unggah Bukti Transfer / Resi Struk</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={selectMockReceipt}
              className="bg-slate-100 hover:bg-slate-200 border-2 border-[#1A3C5E] text-slate-700 font-bold px-4 py-2 text-xs uppercase tracking-wide flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-4 h-4" /> Pilih Gambar Resi
            </button>
            <span className="text-xs font-mono text-slate-600 truncate">
              {fileName ? `✓ ${fileName}` : 'Belum ada bukti resi terpilih'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 italic">Klik tombol di atas untuk menyisipkan resi transfer statis.</p>
        </div>

        {/* Form Actions */}
        <div className="pt-4 border-t border-[#E0E0E0] flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold py-1.5 px-5 text-xs uppercase tracking-wider cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-[#2E7D32] hover:bg-slate-800 text-white font-bold py-1.5 px-5 text-xs uppercase tracking-wider cursor-pointer border-none"
          >
            Simpan Pembayaran
          </button>
        </div>
      </form>
    </div>
  );
}

// ==========================================
// GENERATE LAPORAN KEUANGAN BENDAHARA
// ==========================================
interface BendaharaReportProps {
  penugasanList: Penugasan[];
  onBack: () => void;
}

export function BendaharaFinancialReport({ penugasanList, onBack }: BendaharaReportProps) {
  const [filterMonth, setFilterMonth] = useState('Semua');
  const [isGenerating, setIsGenerating] = useState(false);

  const paidList = penugasanList.filter(p => p.statusBayar === 'Lunas');
  const totalSpent = paidList.reduce((sum, p) => sum + (p.honor ?? 0), 0);
  const baseBudget = 15000000;
  const currentBalance = baseBudget - totalSpent;

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Laporan Kas & Pengeluaran Honorarium Paguyuban Cak & Ning Surabaya berhasil diekspor (Simulasi PDF/Excel)!');
    }, 1200);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Filter and Actions Row */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500 uppercase">Periode Buku Jurnal:</span>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="p-1 border bg-white font-mono"
          >
            <option value="Semua">Semua Transaksi (Tahun Berjalan)</option>
            <option value="Juni">Juni 2026</option>
            <option value="Juli">Juli 2026</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => alert('[Simulasi Cetak]\n\nMenghubungkan ke printer lokal untuk mencetak rekap kas...')}
            className="border-2 border-slate-300 bg-white text-slate-700 font-bold py-1.5 px-4 uppercase cursor-pointer flex items-center gap-1"
          >
            <Printer className="w-4 h-4" /> Cetak Buku Kas
          </button>
          <button
            onClick={handleGenerateReport}
            className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1.5 px-5 uppercase flex items-center gap-1 cursor-pointer border-none"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Sedang Mengekspor...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Ekspor Laporan Excel/PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Table Ledger */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        <h3 className="font-bold text-xs uppercase text-[#1A3C5E] mb-3 tracking-wide border-b pb-1">Buku Jurnal Pembayaran Terverifikasi</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Tanggal Transfer</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Uraian Keterangan Transaksi</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nama Penerima (Talent)</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Akun Rekening</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Nominal Keluar (Debet)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E0E0]">
              {paidList.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono text-slate-600">{p.tanggalBayar || p.tanggal}</td>
                  <td className="p-2.5 font-bold text-slate-800">Pembayaran Honorarium Kegiatan "{p.kegiatanNama}"</td>
                  <td className="p-2.5 font-bold text-[#1A3C5E]">{p.talentNama}</td>
                  <td className="p-2.5 font-mono text-slate-500">Bank Jatim (Atas Nama Bersangkutan)</td>
                  <td className="p-2.5 font-mono text-red-700 font-bold">Rp {(p.honor ?? 0).toLocaleString('id-ID')}</td>
                </tr>
              ))}
              {paidList.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 italic">Belum ada realisasi pengeluaran kas tercatat (Semua honor berstatus belum lunas).</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// NEW: KELOLA KEUANGAN (KAS & TRANSAKSI) BENDAHARA
// ==========================================
interface BendaharaFinancialManagementProps {
  transaksiList: Transaksi[];
  onBack: () => void;
}

export function BendaharaFinancialManagement({
  transaksiList,
  onBack
}: BendaharaFinancialManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'Semua' | 'Masuk' | 'Keluar'>('Semua');
  const [localTxList, setLocalTxList] = useState<Transaksi[]>(transaksiList);

  // Modal and edit states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'Tambah' | 'Edit'>('Tambah');
  const [selectedTx, setSelectedTx] = useState<Transaksi | null>(null);

  // Form states
  const [formTanggal, setFormTanggal] = useState('');
  const [formTipe, setFormTipe] = useState<'Masuk' | 'Keluar'>('Masuk');
  const [formNominal, setFormNominal] = useState(0);
  const [formKategori, setFormKategori] = useState('Honorarium');
  const [formKeterangan, setFormKeterangan] = useState('');
  const [formSumber, setFormSumber] = useState('');

  // Synchronize state when props list updates
  useEffect(() => {
    setLocalTxList(transaksiList);
  }, [transaksiList]);

  const openAddModal = () => {
    setModalMode('Tambah');
    setFormTanggal(new Date().toISOString().split('T')[0]);
    setFormTipe('Masuk');
    setFormNominal(500000);
    setFormKategori('Kas Disbudpar');
    setFormKeterangan('');
    setFormSumber('Dinas Pariwisata');
    setIsModalOpen(true);
  };

  const openEditModal = (tx: Transaksi) => {
    setModalMode('Edit');
    setSelectedTx(tx);
    setFormTanggal(tx.tanggal);
    setFormTipe(tx.tipe);
    setFormNominal(tx.nominal);
    setFormKategori(tx.kategori);
    setFormKeterangan(tx.keterangan);
    setFormSumber(tx.sumberDanAktor);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'Tambah') {
      const newTx: Transaksi = {
        id: 'tx_' + Date.now(),
        tanggal: formTanggal,
        tipe: formTipe,
        nominal: Number(formNominal),
        kategori: formKategori,
        keterangan: formKeterangan,
        sumberDanAktor: formSumber
      };
      
      // Simulate adding locally to the visual view for interactive feel
      setLocalTxList(prev => [newTx, ...prev]);

      alert(`[Mode Purwarupa / Prototype]\n\nSukses mensimulasikan penambahan transaksi baru!\n\nDetail Catatan:\n- Tanggal: ${formTanggal}\n- Tipe: ${formTipe}\n- Nominal: Rp ${Number(formNominal).toLocaleString('id-ID')}\n- Kategori: ${formKategori}\n- Keterangan: "${formKeterangan}"\n- Sumber: ${formSumber}\n\n(Aksi ini berhasil disimulasikan secara interaktif dalam sistem purwarupa. Data default sistem dilindungi agar demo tetap stabil).`);
    } else {
      if (selectedTx) {
        // Simulate editing locally
        setLocalTxList(prev => prev.map(t => t.id === selectedTx.id ? {
          ...t,
          tanggal: formTanggal,
          tipe: formTipe,
          nominal: Number(formNominal),
          kategori: formKategori,
          keterangan: formKeterangan,
          sumberDanAktor: formSumber
        } : t));

        alert(`[Mode Purwarupa / Prototype]\n\nSukses mensimulasikan pembaruan transaksi ID "${selectedTx.id}"!\n\nDetail Pembaruan:\n- Nominal Baru: Rp ${Number(formNominal).toLocaleString('id-ID')}\n- Keterangan Baru: "${formKeterangan}"\n\n(Perubahan berhasil direkam secara interaktif dalam sesi demonstrasi ini).`);
      }
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (tx: Transaksi) => {
    if (confirm(`Apakah Anda yakin ingin menghapus catatan transaksi "${tx.keterangan}" senilai Rp ${tx.nominal.toLocaleString('id-ID')}?`)) {
      // Simulate deleting locally
      setLocalTxList(prev => prev.filter(t => t.id !== tx.id));
      alert(`[Mode Purwarupa / Prototype]\n\nSkenario penghapusan transaksi ID "${tx.id}" berhasil ditunjukkan!\n\n(Catatan transaksi berhasil disembunyikan dari layar saat ini secara interaktif. Anda dapat merestore data bawaan kapan saja melalui tombol "Reset Mockup Data" di panel kiri).`);
    }
  };

  const filteredTx = localTxList.filter(tx => {
    const matchesSearch = tx.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.sumberDanAktor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Semua' || tx.tipe === filterType;
    return matchesSearch && matchesType;
  });

  const totalIn = filteredTx.filter(t => t.tipe === 'Masuk').reduce((sum, t) => sum + t.nominal, 0);
  const totalOut = filteredTx.filter(t => t.tipe === 'Keluar').reduce((sum, t) => sum + t.nominal, 0);
  const netBalance = totalIn - totalOut;

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Kelola Keuangan & Buku Jurnal</h2>
          <p className="text-xs text-slate-500">Pencatatan mutasi kas masuk, kas keluar, operasional paguyuban, serta distribusi honorarium.</p>
        </div>
        <button
          onClick={onBack}
          className="border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-bold py-1 px-3 text-xs uppercase cursor-pointer transition-colors"
        >
          Kembali ke Dashboard
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border-2 border-emerald-600 p-4">
          <span className="text-[10px] font-bold text-emerald-800 uppercase block tracking-wide">Total Kas Masuk (Kredit)</span>
          <p className="text-xl font-extrabold font-mono text-emerald-800">Rp {totalIn.toLocaleString('id-ID')}</p>
          <span className="text-[9px] text-slate-400 block mt-1">Akumulasi pendanaan Disbudpar & Sponsor</span>
        </div>
        <div className="bg-red-50 border-2 border-red-600 p-4">
          <span className="text-[10px] font-bold text-red-800 uppercase block tracking-wide">Total Pengeluaran (Debet)</span>
          <p className="text-xl font-extrabold font-mono text-red-800">Rp {totalOut.toLocaleString('id-ID')}</p>
          <span className="text-[9px] text-slate-400 block mt-1">Operasional & Pembayaran Honorarium</span>
        </div>
        <div className="bg-blue-50 border-2 border-blue-600 p-4">
          <span className="text-[10px] font-bold text-blue-800 uppercase block tracking-wide">Sisa Saldo Kas Bersih</span>
          <p className={`text-xl font-extrabold font-mono ${netBalance >= 0 ? 'text-blue-800' : 'text-red-700'}`}>
            Rp {netBalance.toLocaleString('id-ID')}
          </p>
          <span className="text-[9px] text-slate-400 block mt-1">Realisasi sisa kas aktif paguyuban</span>
        </div>
      </div>

      {/* Filter and Action Controls */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4 flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Left: Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs w-full sm:w-56 font-sans"
            />
          </div>

          {/* Type Filter */}
          <div className="flex border border-slate-300">
            {(['Semua', 'Masuk', 'Keluar'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors border-none cursor-pointer ${
                  filterType === t ? 'bg-[#1A3C5E] text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Add New */}
        <button
          onClick={openAddModal}
          className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1.5 px-4 text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border-none w-full md:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Catat Transaksi Baru
        </button>
      </div>

      {/* Ledger Table */}
      <div className="bg-white border-2 border-[#1A3C5E] p-4">
        <h3 className="font-bold text-xs uppercase text-[#1A3C5E] mb-3 tracking-wide border-b pb-1">Jurnal Transaksi Kas Paguyuban</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-[#1A3C5E]">
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] w-24">Tanggal</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] w-24">Jenis</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] w-28">Kategori</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E]">Keterangan Transaksi</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] w-36">Sumber / Aktor</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] w-32 text-right">Nominal (Rp)</th>
                <th className="p-2.5 font-bold uppercase text-[#1A3C5E] text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E0E0]">
              {filteredTx.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-2.5 font-mono text-slate-600 whitespace-nowrap">{tx.tanggal}</td>
                  <td className="p-2.5">
                    <span className={`text-[9px] font-bold uppercase tracking-wide font-mono border px-1.5 py-0.5 inline-block ${
                      tx.tipe === 'Masuk' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                        : 'bg-red-50 text-red-800 border-red-300'
                    }`}>
                      {tx.tipe === 'Masuk' ? 'KREDIT (+)' : 'DEBET (-)'}
                    </span>
                  </td>
                  <td className="p-2.5 font-bold text-slate-600">{tx.kategori}</td>
                  <td className="p-2.5 font-bold text-slate-800 leading-tight">
                    {tx.keterangan}
                  </td>
                  <td className="p-2.5 text-slate-600 font-medium">{tx.sumberDanAktor}</td>
                  <td className={`p-2.5 font-mono font-bold text-right text-xs ${
                    tx.tipe === 'Masuk' ? 'text-emerald-700' : 'text-red-700'
                  }`}>
                    {tx.tipe === 'Masuk' ? '+' : '-'} Rp {tx.nominal.toLocaleString('id-ID')}
                  </td>
                  <td className="p-2.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEditModal(tx)}
                        className="bg-slate-100 hover:bg-slate-200 border border-[#1A3C5E] p-1 text-[#1A3C5E] cursor-pointer"
                        title="Edit Transaksi"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(tx)}
                        className="bg-red-50 hover:bg-red-100 border border-red-300 p-1 text-red-700 cursor-pointer"
                        title="Hapus Transaksi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTx.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400 italic">Tidak menemukan catatan transaksi kas yang cocok dengan pencarian / tipe ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD modal popup dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white border-2 border-[#1A3C5E] max-w-md w-full p-6 space-y-4 shadow-xl">
            {/* Modal Title */}
            <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-2">
              <h3 className="font-extrabold text-sm uppercase text-[#1A3C5E] tracking-tight">
                {modalMode === 'Tambah' ? 'Catat Transaksi Baru' : 'Edit Catatan Transaksi'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1 hover:bg-slate-100 border cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
              {/* Date Input */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tanggal Transaksi</label>
                <input
                  type="date"
                  value={formTanggal}
                  onChange={(e) => setFormTanggal(e.target.value)}
                  className="w-full p-2 border border-slate-300 focus:border-[#1A3C5E] font-mono"
                  required
                />
              </div>

              {/* Type and Category Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Jenis Mutasi</label>
                  <select
                    value={formTipe}
                    onChange={(e) => setFormTipe(e.target.value as 'Masuk' | 'Keluar')}
                    className="w-full p-2 border border-slate-300 focus:border-[#1A3C5E] bg-white font-sans"
                    required
                  >
                    <option value="Masuk">Masuk (Kredit)</option>
                    <option value="Keluar">Keluar (Debet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Kategori Anggaran</label>
                  <select
                    value={formKategori}
                    onChange={(e) => setFormKategori(e.target.value)}
                    className="w-full p-2 border border-slate-300 focus:border-[#1A3C5E] bg-white font-sans"
                    required
                  >
                    <option value="Kas Disbudpar">Kas Disbudpar</option>
                    <option value="Sponsor">Sponsor</option>
                    <option value="Honorarium">Honorarium</option>
                    <option value="Konsumsi">Konsumsi</option>
                    <option value="Transportasi">Transportasi</option>
                    <option value="Perlengkapan">Perlengkapan</option>
                    <option value="Publikasi">Publikasi / Humas</option>
                  </select>
                </div>
              </div>

              {/* Nominal Money */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nominal (Rupiah)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-bold text-slate-400">Rp</span>
                  <input
                    type="number"
                    value={formNominal || ''}
                    onChange={(e) => setFormNominal(Number(e.target.value))}
                    placeholder="Contoh: 500000"
                    className="w-full pl-8 pr-3 py-1.5 border border-slate-300 focus:border-[#1A3C5E] font-mono font-bold"
                    required
                  />
                </div>
              </div>

              {/* Sumber Dan Aktor */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Sumber Dana / Pihak Pelaksana</label>
                <input
                  type="text"
                  value={formSumber}
                  onChange={(e) => setFormSumber(e.target.value)}
                  placeholder="Contoh: Dinas Pariwisata Surabaya"
                  className="w-full p-2 border border-slate-300 focus:border-[#1A3C5E] font-medium"
                  required
                />
              </div>

              {/* Keterangan */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Uraian Keterangan Transaksi</label>
                <textarea
                  value={formKeterangan}
                  onChange={(e) => setFormKeterangan(e.target.value)}
                  placeholder="Ketik rincian tujuan pemakaian dana..."
                  className="w-full p-2 border border-slate-300 focus:border-[#1A3C5E] h-16 font-sans resize-none"
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold py-1.5 px-4 uppercase cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-1.5 px-5 uppercase border-none cursor-pointer"
                >
                  {modalMode === 'Tambah' ? 'Catat Mutasi' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

