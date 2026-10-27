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
  Check,
  Eye,
  Edit3,
  AlertTriangle,
  Trash2,
  Ban,
  Printer,
  ChevronRight,
  Info,
  Calendar,
  User,
  MapPin,
  Receipt,
  FileText,
  AlertCircle,
  HelpCircle,
  Download,
  RotateCcw
} from 'lucide-react';

// ============================================================================
// 1. DASHBOARD BENDAHARA (3 Kartu Statistik)
// ============================================================================
interface BendaharaDashboardProps {
  penugasanList: Penugasan[];
  onNavigateToScreen: (screenId: string) => void;
}

export function BendaharaDashboard({
  penugasanList,
  onNavigateToScreen
}: BendaharaDashboardProps) {
  const pendingCount = penugasanList.filter(p => p.statusBayar !== 'Lunas' && p.statusBayar !== 'Ditolak' && p.statusBayar !== 'Dibatalkan').length;
  const totalPaid = penugasanList
    .filter(p => p.statusBayar === 'Lunas')
    .reduce((sum, p) => sum + (p.honor || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Dashboard Bendahara</h2>
        <p className="text-xs text-slate-500 mt-0.5">Pemantauan kas operasional, saldo hibah/sponsor, dan antrean transfer honorarium penugasan.</p>
      </div>

      {/* 3 Kartu Statistik */}
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
            <span className="text-3xl font-black text-amber-600 font-mono block">{pendingCount} Penugasan</span>
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
// 2. HALAMAN DAFTAR PEMBAYARAN BENDAHARA (INTERAKTIF & FLEKSIBEL)
// ============================================================================
interface BendaharaPaymentListProps {
  penugasanList: Penugasan[];
  onSavePayment: (
    penugasanId: string, 
    nominal: number, 
    tanggal: string, 
    buktiFile: string,
    bank?: string,
    noRek?: string,
    catatan?: string
  ) => void;
  onUpdatePayment?: (penugasanId: string, updatedData: Partial<Penugasan>) => void;
  onRejectPayment?: (penugasanId: string, alasan: string) => void;
  onVoidPayment?: (penugasanId: string, alasan: string) => void;
  onDeletePayment?: (penugasanId: string) => void;
}

export function BendaharaPaymentList({
  penugasanList,
  onSavePayment,
  onUpdatePayment,
  onRejectPayment,
  onVoidPayment,
  onDeletePayment
}: BendaharaPaymentListProps) {
  // Selection states
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Modals states
  const [detailModalItem, setDetailModalItem] = useState<Penugasan | null>(null);
  const [processModalItem, setProcessModalItem] = useState<Penugasan | null>(null);
  const [editModalItem, setEditModalItem] = useState<Penugasan | null>(null);
  const [rejectModalItem, setRejectModalItem] = useState<Penugasan | null>(null);
  const [deleteModalItem, setDeleteModalItem] = useState<Penugasan | null>(null);
  const [voucherModalItem, setVoucherModalItem] = useState<Penugasan | null>(null);

  // Form states for Process Payment
  const [processBank, setProcessBank] = useState('Bank Jatim');
  const [processRekening, setProcessRekening] = useState('');
  const [processNominal, setProcessNominal] = useState(350000);
  const [processTanggal, setProcessTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [processBuktiFile, setProcessBuktiFile] = useState('bukti_transfer_bankjatim_2026.jpg');
  const [processCatatan, setProcessCatatan] = useState('');

  // Form states for Edit Payment
  const [editBank, setEditBank] = useState('Bank Jatim');
  const [editRekening, setEditRekening] = useState('');
  const [editNominal, setEditNominal] = useState(350000);
  const [editTanggal, setEditTanggal] = useState('');
  const [editBuktiFile, setEditBuktiFile] = useState('');
  const [editCatatan, setEditCatatan] = useState('');

  // Form states for Reject / Cancel Payment
  const [alasanPenolakan, setAlasanPenolakan] = useState('');
  const [quickReason, setQuickReason] = useState('');

  // Delete modal mode: 'void' (akuntansi resmi) vs 'delete' (bersihkan entri keliru)
  const [deleteActionType, setDeleteActionType] = useState<'void' | 'reset'>('void');
  const [deleteReason, setDeleteReason] = useState('Data penugasan pembayaran keliru / telah dibatalkan');

  // Filter tab
  const [filterStatus, setFilterStatus] = useState<'semua' | 'pending' | 'lunas' | 'ditolak'>('semua');

  // Toast feedback message (menggantikan alert bawaan JS)
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'warning' | 'info'; text: string } | null>(null);

  const showToast = (type: 'success' | 'warning' | 'info', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // 12 data dummy penugasan
  const list12 = penugasanList.slice(0, 12);

  // Filtered items
  const filteredList = list12.filter(item => {
    if (filterStatus === 'pending') {
      return item.statusBayar !== 'Lunas' && item.statusBayar !== 'Ditolak' && item.statusBayar !== 'Dibatalkan';
    }
    if (filterStatus === 'lunas') {
      return item.statusBayar === 'Lunas';
    }
    if (filterStatus === 'ditolak') {
      return item.statusBayar === 'Ditolak' || item.statusBayar === 'Dibatalkan';
    }
    return true;
  });

  // Handle open process modal
  const handleOpenProcess = (p: Penugasan) => {
    setProcessModalItem(p);
    setProcessNominal(p.honor || 350000);
    setProcessBank(p.bankTujuan || 'Bank Jatim');
    setProcessRekening(p.rekeningTujuan || `001-298374-1 (a.n. ${p.talentNama})`);
    setProcessTanggal(new Date().toISOString().split('T')[0]);
    setProcessBuktiFile(`bukti_tf_${p.id}_${Date.now().toString().slice(-4)}.jpg`);
    setProcessCatatan(p.catatanBendahara || '');
  };

  // Handle submit process payment
  const handleSubmitProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!processModalItem) return;

    onSavePayment(
      processModalItem.id,
      processNominal,
      processTanggal,
      processBuktiFile,
      processBank,
      processRekening,
      processCatatan
    );

    showToast('success', `Transfer honorarium Rp ${processNominal.toLocaleString('id-ID')} kepada ${processModalItem.talentNama} berhasil diverifikasi & dicatat!`);
    setProcessModalItem(null);
  };

  // Handle open edit modal
  const handleOpenEdit = (p: Penugasan) => {
    setEditModalItem(p);
    setEditNominal(p.honor || 350000);
    setEditBank(p.bankTujuan || 'Bank Jatim');
    setEditRekening(p.rekeningTujuan || `001-298374-1 (a.n. ${p.talentNama})`);
    setEditTanggal(p.tanggalBayar || new Date().toISOString().split('T')[0]);
    setEditBuktiFile(p.buktiBayar || `bukti_${p.id}.jpg`);
    setEditCatatan(p.catatanBendahara || '');
  };

  // Handle submit edit
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalItem) return;

    if (onUpdatePayment) {
      onUpdatePayment(editModalItem.id, {
        honor: editNominal,
        bankTujuan: editBank,
        rekeningTujuan: editRekening,
        tanggalBayar: editTanggal,
        buktiBayar: editBuktiFile,
        catatanBendahara: editCatatan
      });
    }

    showToast('success', `Data pembayaran ${editModalItem.talentNama} berhasil diperbarui.`);
    setEditModalItem(null);
    if (detailModalItem?.id === editModalItem.id) {
      setDetailModalItem({
        ...detailModalItem,
        honor: editNominal,
        bankTujuan: editBank,
        rekeningTujuan: editRekening,
        tanggalBayar: editTanggal,
        buktiBayar: editBuktiFile,
        catatanBendahara: editCatatan
      });
    }
  };

  // Handle open reject modal
  const handleOpenReject = (p: Penugasan) => {
    setRejectModalItem(p);
    setAlasanPenolakan('');
    setQuickReason('');
  };

  // Handle submit reject
  const handleSubmitReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalItem) return;

    const finalReason = quickReason 
      ? (alasanPenolakan ? `${quickReason}: ${alasanPenolakan}` : quickReason)
      : (alasanPenolakan || 'Pencairan ditolak oleh Bendahara.');

    if (onRejectPayment) {
      onRejectPayment(rejectModalItem.id, finalReason);
    }

    showToast('warning', `Pencairan honorarium ${rejectModalItem.talentNama} ditolak. Catatan penolakan telah disimpan.`);
    setRejectModalItem(null);
    if (detailModalItem?.id === rejectModalItem.id) {
      setDetailModalItem({
        ...detailModalItem,
        statusBayar: 'Ditolak',
        catatanBendahara: finalReason
      });
    }
  };

  // Handle open delete / void modal
  const handleOpenDelete = (p: Penugasan) => {
    setDeleteModalItem(p);
    setDeleteActionType('void');
    setDeleteReason('Transaksi dibatalkan / void koreksi administrasi');
  };

  // Handle submit delete / void
  const handleSubmitDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteModalItem) return;

    if (deleteActionType === 'void') {
      if (onVoidPayment) {
        onVoidPayment(deleteModalItem.id, deleteReason);
      }
      showToast('warning', `Transaksi honorarium #${deleteModalItem.id} resmi di-Void (Dibatalkan) sesuai kaidah akuntansi.`);
    } else {
      if (onDeletePayment) {
        onDeletePayment(deleteModalItem.id);
      }
      showToast('info', `Entri pembayaran #${deleteModalItem.id} berhasil dibersihkan dan direset ke status Belum Dibayar.`);
    }

    setDeleteModalItem(null);
    if (detailModalItem?.id === deleteModalItem.id) {
      setDetailModalItem(null);
    }
  };

  const getStatusBadge = (statusBayar?: string) => {
    switch (statusBayar) {
      case 'Lunas':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Lunas
          </span>
        );
      case 'Ditolak':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 bg-rose-50 text-rose-800 border-rose-200">
            <AlertTriangle className="w-3 h-3 text-rose-600" /> Ditolak
          </span>
        );
      case 'Dibatalkan':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 bg-slate-100 text-slate-700 border-slate-300">
            <Ban className="w-3 h-3 text-slate-500" /> Void / Batal
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 bg-amber-50 text-amber-800 border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" /> Menunggu Transfer
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans relative">
      {/* Toast Feedback Banner (No Alert JS) */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-xs font-semibold animate-in slide-in-from-top-4 duration-300 ${
          toastMessage.type === 'success' 
            ? 'bg-emerald-600 text-white border-emerald-500' 
            : toastMessage.type === 'warning'
            ? 'bg-amber-600 text-white border-amber-500'
            : 'bg-[#1A3C5E] text-white border-blue-400'
        }`}>
          {toastMessage.type === 'success' && <Check className="w-4 h-4 shrink-0" />}
          {toastMessage.type === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0" />}
          {toastMessage.type === 'info' && <Info className="w-4 h-4 shrink-0" />}
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Halaman */}
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-[#1A3C5E]">Daftar Pembayaran Honorarium</h2>
            <span className="bg-blue-100 text-[#1A3C5E] text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
              Sie Bendahara
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pencairan kas honorarium duta wisata Cak & Ning Surabaya. Klik atau hover baris untuk melihat rincian pembayaran.
          </p>
        </div>

        {/* Filter Tab */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setFilterStatus('semua')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterStatus === 'semua' ? 'bg-white text-[#1A3C5E] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({list12.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterStatus === 'pending' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Menunggu ({list12.filter(p => p.statusBayar !== 'Lunas' && p.statusBayar !== 'Ditolak' && p.statusBayar !== 'Dibatalkan').length})
          </button>
          <button
            onClick={() => setFilterStatus('lunas')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterStatus === 'lunas' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lunas ({list12.filter(p => p.statusBayar === 'Lunas').length})
          </button>
          <button
            onClick={() => setFilterStatus('ditolak')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterStatus === 'ditolak' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ditolak/Batal ({list12.filter(p => p.statusBayar === 'Ditolak' || p.statusBayar === 'Dibatalkan').length})
          </button>
        </div>
      </div>

      {/* Info Petunjuk Interaksi */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 flex items-start sm:items-center justify-between gap-3 text-xs text-blue-900">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#1A3C5E] shrink-0" />
          <span>
            <strong>Fitur Kelola Pembayaran:</strong> Arahkan kursor (hover) untuk pratinjau rekening & rincian nominal, atau klik baris mana pun untuk membuka modul detail, opsi edit data, penolakan pencairan, serta cetak voucher kas.
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#1A3C5E] whitespace-nowrap bg-white px-2 py-0.5 rounded border border-blue-200">
          {filteredList.length} Entri Ditampilkan
        </span>
      </div>

      {/* Tabel Pembayaran dengan Fitur Hover & Click */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Talent & Rekening</th>
                <th className="p-3.5">Nama Kegiatan</th>
                <th className="p-3.5 text-right">Fee Kotor</th>
                <th className="p-3.5 text-center">Status Bayar</th>
                <th className="p-3.5 text-center">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Tidak ada transaksi pembayaran pada kategori filter ini.
                  </td>
                </tr>
              ) : (
                filteredList.map((item, idx) => {
                  const isPaid = item.statusBayar === 'Lunas';
                  const isRejected = item.statusBayar === 'Ditolak';
                  const isVoid = item.statusBayar === 'Dibatalkan';
                  const isSelected = selectedItemId === item.id;
                  const isHovered = hoveredItemId === item.id;

                  const bankName = item.bankTujuan || 'Bank Jatim';
                  const rekNumber = item.rekeningTujuan || `001-298374-1 (a.n. ${item.talentNama})`;
                  const nominalHonor = item.honor || 350000;

                  return (
                    <tr 
                      key={item.id} 
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setDetailModalItem(item);
                      }}
                      onMouseEnter={() => setHoveredItemId(item.id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                      className={`relative cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-blue-50/70 ring-1 ring-inset ring-[#1A3C5E]' 
                          : isHovered 
                          ? 'bg-slate-50/90' 
                          : 'hover:bg-slate-50/60'
                      }`}
                    >
                      {/* No */}
                      <td className="p-3.5 text-center font-mono text-slate-400 font-semibold">
                        {idx + 1}
                      </td>

                      {/* Talent Name & Hover Detail Popover Trigger */}
                      <td className="p-3.5 relative">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#1A3C5E]/10 text-[#1A3C5E] font-bold flex items-center justify-center text-xs">
                            {item.talentNama.replace('Cak ', '').replace('Ning ', '').charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-[#1A3C5E] block leading-tight hover:underline">
                              {item.talentNama}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                              <CreditCard className="w-3 h-3 text-slate-400" />
                              {bankName} &bull; {rekNumber.split('(')[0].trim()}
                            </span>
                          </div>
                        </div>

                        {/* HOVER DETAIL CARD FLOATING PREVIEW (MUNCUL SAAT DI HOVER) */}
                        {isHovered && (
                          <div 
                            className="absolute left-6 top-full z-40 w-72 bg-white rounded-xl shadow-2xl border-2 border-[#1A3C5E] p-3.5 text-xs text-slate-800 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
                            style={{ filter: 'drop-shadow(0 10px 15px rgba(26, 60, 94, 0.15))' }}
                          >
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                              <span className="font-extrabold text-[#1A3C5E] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                                <Receipt className="w-3.5 h-3.5 text-amber-500" /> Rincian Pembayaran
                              </span>
                              {getStatusBadge(item.statusBayar)}
                            </div>

                            <div className="space-y-1.5 text-[11px]">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Penerima:</span>
                                <strong className="text-slate-700">{item.talentNama}</strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Rekening:</span>
                                <span className="font-mono text-slate-700 font-semibold">{rekNumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Honor Bersih:</span>
                                <strong className="font-mono text-emerald-700 font-bold">
                                  Rp {nominalHonor.toLocaleString('id-ID')}
                                </strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Validasi SDM:</span>
                                <span className="text-slate-700 font-medium">
                                  {item.laporanStatus === 'Disetujui' ? '✅ Disetujui' : '⏳ ' + (item.laporanStatus || 'Belum Ada LPJ')}
                                </span>
                              </div>

                              {item.tanggalBayar && (
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Tgl Transfer:</span>
                                  <span className="font-mono text-slate-600">{item.tanggalBayar}</span>
                                </div>
                              )}

                              {item.catatanBendahara && (
                                <div className="p-1.5 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-600 mt-1">
                                  <strong className="text-slate-700 block">Catatan Bendahara:</strong>
                                  {item.catatanBendahara}
                                </div>
                              )}
                            </div>

                            <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center font-medium flex items-center justify-center gap-1">
                              <Eye className="w-3 h-3 text-[#1A3C5E]" /> Klik baris untuk kelola (Edit / Tolak / Voucher)
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Kegiatan */}
                      <td className="p-3.5 font-medium max-w-xs">
                        <span className="text-slate-800 line-clamp-1">{item.kegiatanNama}</span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-2.5 h-2.5" /> {item.tanggal}
                        </span>
                      </td>

                      {/* Fee */}
                      <td className="p-3.5 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                        Rp {nominalHonor.toLocaleString('id-ID')}
                      </td>

                      {/* Status */}
                      <td className="p-3.5 text-center whitespace-nowrap">
                        {getStatusBadge(item.statusBayar)}
                      </td>

                      {/* Aksi Cepat */}
                      <td className="p-3.5 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          {/* Tombol Lihat Detail */}
                          <button
                            onClick={() => {
                              setSelectedItemId(item.id);
                              setDetailModalItem(item);
                            }}
                            title="Buka Detail & Opsi Lengkap"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#1A3C5E] hover:bg-slate-100 cursor-pointer transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Tombol Proses jika belum lunas */}
                          {!isPaid && !isRejected && !isVoid && (
                            <button
                              onClick={() => handleOpenProcess(item)}
                              className="px-2.5 py-1 rounded-lg bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                            >
                              <Send className="w-3 h-3" /> Bayar
                            </button>
                          )}

                          {/* Tombol Edit */}
                          <button
                            onClick={() => handleOpenEdit(item)}
                            title="Edit Data Pembayaran"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Tombol Tolak jika belum lunas */}
                          {!isPaid && (
                            <button
                              onClick={() => handleOpenReject(item)}
                              title="Tolak / Batalkan Pencairan"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          )}

                          {/* Tombol Void / Hapus Entri */}
                          <button
                            onClick={() => handleOpenDelete(item)}
                            title="Void / Hapus Entri Keliru"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-700 hover:bg-rose-50 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================================
          MODAL 1: DETAIL LENGKAP PEMBAYARAN & AUDIT KEUANGAN (SAAT BARIS DIKLIK)
      ============================================================================ */}
      {detailModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Header Modal */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-[#1A3C5E] text-[10px] font-mono font-bold">
                    REF #{detailModalItem.id.toUpperCase()}
                  </span>
                  {getStatusBadge(detailModalItem.statusBayar)}
                </div>
                <h3 className="text-lg font-black text-[#1A3C5E] mt-1">Detail Pencairan Honorarium</h3>
                <p className="text-xs text-slate-500">Kwitansi & audit kas keuangan Sie Bendahara</p>
              </div>
              <button 
                onClick={() => setDetailModalItem(null)} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Detail */}
            <div className="py-4 space-y-4 text-xs">
              {/* Kartu Profil Talent & Rekening */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Identitas Talent & Rekening</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    LPJ SDM: {detailModalItem.laporanStatus || 'Belum Validasi'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Nama Penerima</span>
                    <strong className="text-sm text-[#1A3C5E] block font-bold">{detailModalItem.talentNama}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Bank Tujuan</span>
                    <strong className="text-sm text-slate-800 block font-bold">{detailModalItem.bankTujuan || 'Bank Jatim'}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-[11px] block">Nomor Rekening & Atas Nama</span>
                    <div className="p-2 bg-white rounded-lg border border-slate-200 font-mono text-xs font-bold text-slate-800 mt-0.5 flex items-center justify-between">
                      <span>{detailModalItem.rekeningTujuan || `001-298374-1 (${detailModalItem.talentNama})`}</span>
                      <CreditCard className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rincian Kegiatan & Penugasan */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Kegiatan Pariwisata</span>
                <strong className="text-xs text-slate-800 block">{detailModalItem.kegiatanNama}</strong>
                <div className="flex flex-wrap gap-4 text-slate-500 text-[11px] pt-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {detailModalItem.tanggal}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {detailModalItem.lokasi}</span>
                </div>
              </div>

              {/* Rincian Finansial */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/70 space-y-2.5">
                <span className="text-[10px] uppercase font-bold text-[#1A3C5E] tracking-wider block">Rincian Perhitungan Honor</span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Honor Pokok Penugasan</span>
                    <span className="font-mono font-semibold">Rp {(detailModalItem.honor || 350000).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Potongan Pajak PPh 21 (0% Non-Final)</span>
                    <span className="font-mono font-semibold">Rp 0</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Biaya Administrasi Antar Bank</span>
                    <span className="font-mono font-semibold text-emerald-600">Rp 0 (Ditanggung Kas)</span>
                  </div>
                  <div className="border-t border-blue-200 pt-2 flex justify-between items-center text-sm">
                    <strong className="text-[#1A3C5E]">Total Ditransfer ke Talent</strong>
                    <strong className="font-mono text-base font-black text-emerald-700">
                      Rp {(detailModalItem.honor || 350000).toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Bukti & Catatan Transfer */}
              {detailModalItem.statusBayar === 'Lunas' ? (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bukti Transfer Terverifikasi
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">{detailModalItem.tanggalBayar}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-mono text-xs text-slate-700">{detailModalItem.buktiBayar || 'bukti_transfer.jpg'}</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Tersimpan</span>
                  </div>
                  {detailModalItem.catatanBendahara && (
                    <p className="text-[11px] text-slate-600 italic">
                      Catatan: {detailModalItem.catatanBendahara}
                    </p>
                  )}
                </div>
              ) : detailModalItem.statusBayar === 'Ditolak' ? (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 space-y-1.5 text-rose-800">
                  <span className="text-[10px] uppercase font-bold text-rose-900 tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Alasan Penolakan Pencairan
                  </span>
                  <p className="text-xs bg-white p-2.5 rounded-lg border border-rose-200 text-slate-700">
                    {detailModalItem.catatanBendahara || 'Pencairan ditolak oleh Sie Bendahara.'}
                  </p>
                </div>
              ) : detailModalItem.statusBayar === 'Dibatalkan' ? (
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300 space-y-1.5 text-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-800 tracking-wider flex items-center gap-1">
                    <Ban className="w-3.5 h-3.5 text-slate-600" /> Status: Transaksi Di-Void / Dibatalkan
                  </span>
                  <p className="text-xs bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700">
                    {detailModalItem.catatanBendahara || 'Transaksi telah dibatalkan dari buku kas.'}
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-2 text-xs">
                  <Clock className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Penugasan ini menunggu eksekusi transfer dari kas operasional Paguyuban.</span>
                </div>
              )}
            </div>

            {/* Action Bar Modal Detail (Pilihan Edit / Tolak / Hapus / Bayar / Voucher) */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {/* Tombol Cetak Kwitansi */}
                <button
                  type="button"
                  onClick={() => {
                    setVoucherModalItem(detailModalItem);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" /> Cetak Kwitansi
                </button>

                {/* Tombol Void / Hapus Entri */}
                <button
                  type="button"
                  onClick={() => handleOpenDelete(detailModalItem)}
                  className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" /> Void / Hapus
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Tombol Tolak jika belum lunas */}
                {detailModalItem.statusBayar !== 'Lunas' && (
                  <button
                    type="button"
                    onClick={() => handleOpenReject(detailModalItem)}
                    className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Ban className="w-3.5 h-3.5" /> Tolak Pencairan
                  </button>
                )}

                {/* Tombol Edit */}
                <button
                  type="button"
                  onClick={() => handleOpenEdit(detailModalItem)}
                  className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Data
                </button>

                {/* Tombol Proses jika belum lunas */}
                {detailModalItem.statusBayar !== 'Lunas' && detailModalItem.statusBayar !== 'Ditolak' && (
                  <button
                    type="button"
                    onClick={() => handleOpenProcess(detailModalItem)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Proses Transfer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================
          MODAL 2: FORM PROSES PEMBAYARAN (UPLOAD BUKTI & VERIFIKASI)
      ============================================================================ */}
      {processModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#1A3C5E]">Proses Transfer Honorarium</h3>
                <p className="text-xs text-slate-500">{processModalItem.talentNama}</p>
              </div>
              <button onClick={() => setProcessModalItem(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProcess} className="py-4 space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Kegiatan</span>
                <strong className="text-slate-800 text-xs block mt-0.5">{processModalItem.kegiatanNama}</strong>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Bank Rekening Tujuan *</label>
                <select
                  value={processBank}
                  onChange={(e) => setProcessBank(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:border-[#1A3C5E]"
                >
                  <option value="Bank Jatim">PT Bank Jatim Tbk (Kas Utama)</option>
                  <option value="BCA">Bank Central Asia (BCA)</option>
                  <option value="Mandiri">Bank Mandiri</option>
                  <option value="BNI">Bank Negara Indonesia (BNI)</option>
                  <option value="BRI">Bank Rakyat Indonesia (BRI)</option>
                  <option value="BSI">Bank Syariah Indonesia (BSI)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nomor Rekening & Penerima *</label>
                <input
                  type="text"
                  required
                  value={processRekening}
                  onChange={(e) => setProcessRekening(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Fee Ditransfer (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={processNominal}
                    onChange={(e) => setProcessNominal(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono font-bold text-emerald-700 focus:outline-none focus:border-[#1A3C5E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tanggal Transfer *</label>
                  <input
                    type="date"
                    required
                    value={processTanggal}
                    onChange={(e) => setProcessTanggal(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                  />
                </div>
              </div>

              {/* Upload Bukti Transfer */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Lampiran Bukti Transfer *</label>
                <div className="border border-slate-300 rounded-xl p-3 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <input 
                      type="text"
                      value={processBuktiFile}
                      onChange={(e) => setProcessBuktiFile(e.target.value)}
                      className="font-mono text-[11px] text-slate-700 bg-transparent border-none focus:outline-none w-full"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">JPG / PDF</span>
                </div>
              </div>

              {/* Catatan Bendahara */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Catatan Bendahara (Opsional)</label>
                <input
                  type="text"
                  placeholder="e.g. Transfer via IB Bank Jatim ref #99812"
                  value={processCatatan}
                  onChange={(e) => setProcessCatatan(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setProcessModalItem(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Verifikasi Transfer Selesai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================
          MODAL 3: EDIT / KOREKSI DATA PEMBAYARAN
      ============================================================================ */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#1A3C5E] flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4 text-amber-500" /> Koreksi Data Pembayaran
                </h3>
                <p className="text-xs text-slate-500">{editModalItem.talentNama} &bull; #{editModalItem.id}</p>
              </div>
              <button onClick={() => setEditModalItem(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="py-4 space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>Koreksi ini akan memperbarui rincian buku kas, nomor rekening penerima, atau penyesuaian nominal honorarium.</span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Bank Tujuan</label>
                <select
                  value={editBank}
                  onChange={(e) => setEditBank(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:border-[#1A3C5E]"
                >
                  <option value="Bank Jatim">PT Bank Jatim Tbk</option>
                  <option value="BCA">Bank Central Asia (BCA)</option>
                  <option value="Mandiri">Bank Mandiri</option>
                  <option value="BNI">Bank Negara Indonesia (BNI)</option>
                  <option value="BRI">Bank Rakyat Indonesia (BRI)</option>
                  <option value="BSI">Bank Syariah Indonesia (BSI)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nomor Rekening & Penerima</label>
                <input
                  type="text"
                  required
                  value={editRekening}
                  onChange={(e) => setEditRekening(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nominal Fee (Rp)</label>
                  <input
                    type="number"
                    required
                    value={editNominal}
                    onChange={(e) => setEditNominal(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono font-bold text-emerald-700 focus:outline-none focus:border-[#1A3C5E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tanggal Transfer</label>
                  <input
                    type="date"
                    value={editTanggal}
                    onChange={(e) => setEditTanggal(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama File Bukti Transfer</label>
                <input
                  type="text"
                  value={editBuktiFile}
                  onChange={(e) => setEditBuktiFile(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Catatan Koreksi Bendahara</label>
                <textarea
                  rows={2}
                  value={editCatatan}
                  onChange={(e) => setEditCatatan(e.target.value)}
                  placeholder="Alasan koreksi data (e.g. penyesuaian transport dari panitia)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================
          MODAL 4: TOLAK / BATALKAN PENCAIRAN (DENGAN ALASAN JELAS)
      ============================================================================ */}
      {rejectModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Ban className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-rose-700">Tolak Pencairan Honorarium</h3>
                  <p className="text-xs text-slate-500">{rejectModalItem.talentNama}</p>
                </div>
              </div>
              <button onClick={() => setRejectModalItem(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReject} className="py-4 space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] leading-relaxed">
                Penolakan ini akan mengubah status bayar menjadi <strong>Ditolak</strong> dan mengirimkan notifikasi catatan revisi kepada Sie SDM & Talent yang bersangkutan.
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Pilih Kategori Alasan Penolakan</label>
                <div className="space-y-1.5">
                  {[
                    'Nomor rekening tidak valid / nama buku tabungan berbeda',
                    'Laporan Pertanggungjawaban (LPJ) belum tervalidasi lengkap oleh SDM',
                    'Kegiatan dibatalkan oleh instansi klien / sponsor',
                    'Nominal honorarium tidak sesuai kesepakatan surat penugasan'
                  ].map((reason, idx) => (
                    <label 
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                        quickReason === reason ? 'bg-rose-50 border-rose-300 text-rose-900 font-semibold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="quickReason"
                        checked={quickReason === reason}
                        onChange={() => setQuickReason(reason)}
                        className="text-rose-600"
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Catatan Tambahan untuk Talent / SDM *</label>
                <textarea
                  rows={2}
                  required={!quickReason}
                  value={alasanPenolakan}
                  onChange={(e) => setAlasanPenolakan(e.target.value)}
                  placeholder="Jelaskan kendala atau perbaikan yang dibutuhkan..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-rose-500 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRejectModalItem(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer"
                >
                  Konfirmasi Tolak Pencairan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================
          MODAL 5: VOID / HAPUS ENTRI TRANSAKSI KEUANGAN (SESUAI KAIDAH AKUNTANSI)
      ============================================================================ */}
      {deleteModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1A3C5E]">Pengelolaan Entri Transaksi</h3>
                  <p className="text-xs text-slate-500">#{deleteModalItem.id} &bull; {deleteModalItem.talentNama}</p>
                </div>
              </div>
              <button onClick={() => setDeleteModalItem(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitDelete} className="py-4 space-y-3.5 text-xs">
              {/* Opsi Pilihan Aksi: Void Akuntansi vs Reset Entri Keliru */}
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold mb-1">Pilih Tindakan Akuntansi:</label>
                
                {/* Opsi 1: Void Transaksi (Rekomendasi) */}
                <div 
                  onClick={() => setDeleteActionType('void')}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    deleteActionType === 'void' 
                      ? 'border-[#1A3C5E] bg-blue-50/50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="deleteType" 
                      checked={deleteActionType === 'void'} 
                      onChange={() => setDeleteActionType('void')}
                    />
                    <strong className="text-xs text-[#1A3C5E]">Void / Batalkan Transaksi (Rekomendasi Akuntansi)</strong>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 ml-5">
                    Menandai transaksi sebagai <em>Dibatalkan</em> dengan saldo keluar Rp 0 dan tetap mempertahankan jejak audit resmi kas.
                  </p>
                </div>

                {/* Opsi 2: Reset Entri Keliru */}
                <div 
                  onClick={() => setDeleteActionType('reset')}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    deleteActionType === 'reset' 
                      ? 'border-rose-500 bg-rose-50/50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="deleteType" 
                      checked={deleteActionType === 'reset'} 
                      onChange={() => setDeleteActionType('reset')}
                    />
                    <strong className="text-xs text-rose-700">Bersihkan & Reset Entri Pembayaran Keliru</strong>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 ml-5">
                    Mengembalikan status ke <em>Belum Dibayar</em> dan menghapus data bukti bayar yang salah input.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Alasan Pembatalan / Catatan Audit *</label>
                <input
                  type="text"
                  required
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDeleteModalItem(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-white font-bold cursor-pointer ${
                    deleteActionType === 'void' ? 'bg-[#1A3C5E] hover:bg-slate-800' : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  {deleteActionType === 'void' ? 'Eksekusi Void Transaksi' : 'Konfirmasi Reset Entri'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================
          MODAL 6: CETAK BUKTI KWITANSI / VOUCHER KAS KELUAR RESMI
      ============================================================================ */}
      {voucherModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border-2 border-slate-300 my-8">
            {/* KOP KWITANSI RESMI */}
            <div className="text-center border-b-2 border-slate-800 pb-4 mb-4">
              <span className="text-[11px] font-black tracking-widest text-[#1A3C5E] uppercase block">PAGUYUBAN CAK & NING SURABAYA</span>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">BUKTI PENGELUARAN KAS (VOUCHER HONOR)</h3>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                NO. BKK-{voucherModalItem.id.toUpperCase()}/{new Date().getFullYear()}/BENDAHARA
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-800">
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-dashed border-slate-200">
                <span className="text-slate-500 font-medium">Telah Dibayarkan Kepada</span>
                <span className="col-span-2 font-bold text-slate-900">{voucherModalItem.talentNama}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-dashed border-slate-200">
                <span className="text-slate-500 font-medium">Rekening Tujuan</span>
                <span className="col-span-2 font-mono font-semibold">
                  {voucherModalItem.bankTujuan || 'Bank Jatim'} - {voucherModalItem.rekeningTujuan || '001-298374-1'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-dashed border-slate-200">
                <span className="text-slate-500 font-medium">Untuk Pembayaran</span>
                <span className="col-span-2">Honorarium Penugasan Duta Wisata: <strong>{voucherModalItem.kegiatanNama}</strong> ({voucherModalItem.tanggal})</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-dashed border-slate-200">
                <span className="text-slate-500 font-medium">Status Administrasi</span>
                <span className="col-span-2 font-bold text-emerald-700">
                  {voucherModalItem.statusBayar === 'Lunas' ? 'LUNAS DITRANSFER' : voucherModalItem.statusBayar?.toUpperCase() || 'PROSES PENCAIRAN'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg flex justify-between items-center">
                <span className="font-bold text-xs uppercase text-slate-600">Jumlah Uang:</span>
                <span className="font-mono text-lg font-black text-[#1A3C5E]">
                  Rp {(voucherModalItem.honor || 350000).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Kolom Tanda Tangan */}
            <div className="grid grid-cols-2 gap-8 text-center text-xs pt-6 mt-4 border-t border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px]">Penerima Honor,</span>
                <div className="h-14 flex items-end justify-center font-bold text-slate-800">
                  {voucherModalItem.talentNama}
                </div>
                <div className="border-t border-slate-300 pt-1 text-[10px] text-slate-400">Duta Wisata Surabaya</div>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Surabaya, {voucherModalItem.tanggalBayar || new Date().toISOString().split('T')[0]}</span>
                <div className="h-14 flex items-end justify-center font-bold text-[#1A3C5E]">
                  Sie Bendahara Paguyuban
                </div>
                <div className="border-t border-slate-300 pt-1 text-[10px] text-slate-400">Verifikator Keuangan</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setVoucherModalItem(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast('success', `Dokumen Bukti Kas Keluar #${voucherModalItem.id} berhasil disiapkan untuk dicetak.`);
                  setVoucherModalItem(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Cetak Dokumen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
