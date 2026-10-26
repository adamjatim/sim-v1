import React, { useState } from 'react';
import { Penugasan } from '../types';
import { 
  DollarSign, 
  Send, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  FileCheck, 
  X,
  Building,
  Check
} from 'lucide-react';

// ============================================================================
// 1. DASHBOARD BENDAHARA (3 Kartu Statistik: Total Penerimaan, Menunggu Transfer, Honor Dibayarkan)
// ============================================================================
interface BendaharaDashboardProps {
  penugasanList: Penugasan[];
  onNavigateToScreen: (screenId: string) => void;
}

export function BendaharaDashboard({
  penugasanList,
  onNavigateToScreen
}: BendaharaDashboardProps) {
  const pendingCount = penugasanList.filter(p => p.statusBayar !== 'Lunas').length;
  const totalPaid = penugasanList
    .filter(p => p.statusBayar === 'Lunas')
    .reduce((sum, p) => sum + (p.honor || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Dashboard Bendahara</h2>
        <p className="text-xs text-slate-500 mt-0.5">Pemantauan kas operasional, saldo hibah/sponsor, dan antrean transfer honorarium penugasan.</p>
      </div>

      {/* 3 Kartu Statistik (Total Penerimaan, Menunggu Transfer, Honor Dibayarkan) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Penerimaan */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Penerimaan Kas</span>
            <span className="text-2xl font-black text-[#1A3C5E] font-mono block">Rp 125.000.000</span>
            <p className="text-[11px] text-slate-400">Hibah APBD & Sponsorship</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center">
            <Building className="w-7 h-7" />
          </div>
        </div>

        {/* Menunggu Transfer */}
        <div 
          onClick={() => onNavigateToScreen('BENDAHARA_PAYMENT_LIST')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Menunggu Transfer</span>
            <span className="text-3xl font-black text-amber-600 font-mono block">8 Penugasan</span>
            <p className="text-[11px] text-slate-400">Siap Ditransfer ke Rekening</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-7 h-7" />
          </div>
        </div>

        {/* Honor Dibayarkan */}
        <div 
          onClick={() => onNavigateToScreen('BENDAHARA_PAYMENT_LIST')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#1A3C5E] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Honor Dibayarkan</span>
            <span className="text-2xl font-black text-emerald-700 font-mono block">
              Rp {totalPaid.toLocaleString('id-ID')}
            </span>
            <p className="text-[11px] text-slate-400">Telah Ditransfer & Lunas</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <DollarSign className="w-7 h-7" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. HALAMAN DAFTAR PEMBAYARAN (12 Data Dummy + Modal Form Upload Bukti Transfer)
// ============================================================================
interface BendaharaPaymentListProps {
  penugasanList: Penugasan[];
  onSavePayment: (penugasanId: string, nominal: number, tanggal: string, buktiFile: string) => void;
}

export function BendaharaPaymentList({
  penugasanList,
  onSavePayment
}: BendaharaPaymentListProps) {
  const [selectedItemForPayment, setSelectedItemForPayment] = useState<Penugasan | null>(null);

  // Modal form states
  const [bankTujuan, setBankTujuan] = useState('Bank Jatim');
  const [noRekening, setNoRekening] = useState('');
  const [nominal, setNominal] = useState(350000);
  const [tanggalTransfer, setTanggalTransfer] = useState(new Date().toISOString().split('T')[0]);
  const [buktiFile, setBuktiFile] = useState('bukti_transfer_bankjatim_2026.jpg');

  // 12 data dummy
  const list12 = penugasanList.slice(0, 12);
  const filtered = list12;

  const handleOpenModal = (p: Penugasan) => {
    setSelectedItemForPayment(p);
    setNominal(p.honor || 350000);
    setBankTujuan(p.bankTujuan || 'Bank Jatim');
    setNoRekening(p.rekeningTujuan || '001-298374-1 (a.n. ' + p.talentNama + ')');
    setTanggalTransfer(new Date().toISOString().split('T')[0]);
  };

  const handleProcessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForPayment) return;

    onSavePayment(selectedItemForPayment.id, nominal, tanggalTransfer, buktiFile);
    alert(`Transfer honorarium sebesar Rp ${nominal.toLocaleString('id-ID')} kepada ${selectedItemForPayment.talentNama} berhasil diverifikasi & dicatat!`);
    setSelectedItemForPayment(null);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Daftar Pembayaran Honorarium</h2>
        <p className="text-xs text-slate-500 mt-0.5">Tabel 12 pencairan honorarium duta wisata Cak & Ning Surabaya.</p>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-xs">
        <span className="text-xs text-slate-500 font-medium">Daftar Rekap Pencairan Honorarium</span>
        <span className="text-xs text-slate-500 font-mono">Total: <strong>{filtered.length}</strong> Pembayaran</span>
      </div>

      {/* Tabel dengan kolom: Nama Talent, Nama Kegiatan, Fee Kotor, Status Bayar, Aksi */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Talent</th>
                <th className="p-3.5">Nama Kegiatan</th>
                <th className="p-3.5 text-right">Fee Kotor</th>
                <th className="p-3.5 text-center">Status Bayar</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item, idx) => {
                const isPaid = item.statusBayar === 'Lunas';
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="p-3.5 font-bold text-[#1A3C5E] whitespace-nowrap">{item.talentNama}</td>
                    <td className="p-3.5 font-medium max-w-xs">{item.kegiatanNama}</td>
                    <td className="p-3.5 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                      Rp {(item.honor || 350000).toLocaleString('id-ID')}
                    </td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block ${
                        isPaid ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {item.statusBayar || 'Belum Dibayar'}
                      </span>
                    </td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      {isPaid ? (
                        <span className="text-[11px] font-semibold text-emerald-700 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Selesai
                        </span>
                      ) : (
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="px-3 py-1.5 rounded-lg bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 mx-auto shadow-xs cursor-pointer transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" /> Proses Pembayaran
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Upload Bukti Transfer */}
      {selectedItemForPayment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#1A3C5E]">Form Proses Pembayaran</h3>
                <p className="text-xs text-slate-500">{selectedItemForPayment.talentNama}</p>
              </div>
              <button onClick={() => setSelectedItemForPayment(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProcessSubmit} className="py-4 space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Kegiatan</span>
                <strong className="text-slate-800 text-xs block mt-0.5">{selectedItemForPayment.kegiatanNama}</strong>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Bank Rekening Tujuan *</label>
                <select
                  value={bankTujuan}
                  onChange={(e) => setBankTujuan(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:border-[#1A3C5E]"
                >
                  <option value="Bank Jatim">PT Bank Jatim Tbk (Kas Utama)</option>
                  <option value="BCA">Bank Central Asia (BCA)</option>
                  <option value="Mandiri">Bank Mandiri</option>
                  <option value="BNI">Bank Negara Indonesia (BNI)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nomor Rekening & Penerima *</label>
                <input
                  type="text"
                  required
                  value={noRekening}
                  onChange={(e) => setNoRekening(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Fee Ditransfer (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={nominal}
                    onChange={(e) => setNominal(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono font-bold text-emerald-700 focus:outline-none focus:border-[#1A3C5E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tanggal Transfer *</label>
                  <input
                    type="date"
                    required
                    value={tanggalTransfer}
                    onChange={(e) => setTanggalTransfer(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                  />
                </div>
              </div>

              {/* Upload Bukti Transfer */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Upload Bukti Transfer *</label>
                <div className="border border-slate-300 rounded-xl p-3 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono text-[11px] text-slate-700">{buktiFile}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newF = prompt('Ubah nama file bukti transfer:', buktiFile);
                      if (newF) setBuktiFile(newF);
                    }}
                    className="text-[10px] text-[#1A3C5E] font-bold underline cursor-pointer"
                  >
                    Ganti
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedItemForPayment(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  Verifikasi Transfer Selesai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
