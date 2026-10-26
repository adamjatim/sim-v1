import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, X, RefreshCw } from 'lucide-react';

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  itemType?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  variant?: 'danger' | 'warning';
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Hapus Data',
  message = 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.',
  itemName,
  itemType,
  confirmButtonText = 'Ya, Hapus Data',
  cancelButtonText = 'Batal',
  variant = 'danger',
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

  const isDanger = variant === 'danger';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className={`h-2 ${isDanger ? 'bg-rose-500' : 'bg-amber-500'}`} />

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isDanger
                  ? 'bg-rose-50 text-rose-600 ring-8 ring-rose-50/50 border border-rose-100'
                  : 'bg-amber-50 text-amber-600 ring-8 ring-amber-50/50 border border-amber-100'
              }`}
            >
              {isDanger ? (
                <Trash2 className="w-6 h-6 animate-pulse" />
              ) : (
                <AlertTriangle className="w-6 h-6" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-bold text-[#1A3C5E] leading-tight">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          {/* Item Highlight Box */}
          {(itemName || itemType) && (
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              {itemType && (
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
                  {itemType}
                </span>
              )}
              {itemName && (
                <span className="block text-xs font-bold text-slate-800 break-words">
                  "{itemName}"
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
            >
              {cancelButtonText}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-xl text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer ${
                isDanger
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
                  : 'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
              }`}
            >
              {isDanger ? (
                <Trash2 className="w-3.5 h-3.5" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
