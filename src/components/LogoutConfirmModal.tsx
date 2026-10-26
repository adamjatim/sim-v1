import React, { useEffect } from 'react';
import { LogOut, X, ShieldAlert, ArrowRight } from 'lucide-react';

export interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
  userRole?: string;
  userEmail?: string;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName = 'Pengguna',
  userRole = 'Anggota',
  userEmail,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const initials = userName
    ? userName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'CN';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent Top Border */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-[#1A3C5E] to-rose-500" />

        <div className="p-6">
          {/* Header Row */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
              <LogOut className="w-6 h-6 text-amber-600" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3
                  id="logout-modal-title"
                  className="text-base font-black text-[#1A3C5E] leading-tight uppercase tracking-tight"
                >
                  Konfirmasi Keluar Akun
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Apakah Anda yakin ingin mengakhiri sesi akun ini? Anda harus masuk kembali untuk mengakses modul penugasan.
              </p>
            </div>
          </div>

          {/* Active Account Identity Card */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A3C5E] text-amber-400 font-black text-xs flex items-center justify-center shrink-0 shadow-xs border border-amber-400/30">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-800 truncate">
                  {userName}
                </span>
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                  {userRole}
                </span>
              </div>
              {userEmail && (
                <p className="text-[10px] text-slate-500 truncate font-mono mt-0.5">
                  {userEmail}
                </p>
              )}
            </div>
          </div>

          {/* Warning notice */}
          <div className="mt-3.5 flex items-center gap-2 text-[11px] text-amber-800 bg-amber-50/80 border border-amber-200/70 px-3 py-2 rounded-xl">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Pastikan seluruh formulir atau draf laporan telah tersimpan sebelum keluar.</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
            >
              Batal & Tetap di Sini
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Ya, Keluar Akun</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
