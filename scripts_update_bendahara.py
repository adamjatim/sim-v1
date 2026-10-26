with open('src/components/BendaharaScreens.tsx', 'r') as f:
    content = f.read()

# 1. State in BendaharaPaymentList
old_bendahara_state = '''export function BendaharaPaymentList({
  penugasanList,
  onSavePayment
}: BendaharaPaymentListProps) {
  const [selectedItemForPayment, setSelectedItemForPayment] = useState<Penugasan | null>(null);

  // Modal form states
  const [bankTujuan, setBankTujuan] = useState('Bank Jatim');
  const [noRekening, setNoRekening] = useState('');
  const [nominal, setNominal] = useState(350000);
  const [tanggalTransfer, setTanggalTransfer] = useState(new Date().toISOString().split('T')[0]);
  const [buktiFile, setBuktiFile] = useState('bukti_transfer_bankjatim_2026.jpg');'''

new_bendahara_state = '''export function BendaharaPaymentList({
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
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isChangeBuktiOpen, setIsChangeBuktiOpen] = useState(false);
  const [tempBuktiFile, setTempBuktiFile] = useState('bukti_transfer_bankjatim_2026.jpg');'''

assert old_bendahara_state in content, "old_bendahara_state not found"
content = content.replace(old_bendahara_state, new_bendahara_state, 1)

# 2. handleProcessSubmit
old_process_submit = '''  const handleProcessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForPayment) return;

    onSavePayment(selectedItemForPayment.id, nominal, tanggalTransfer, buktiFile);
    alert(`Transfer honorarium sebesar Rp ${nominal.toLocaleString('id-ID')} kepada ${selectedItemForPayment.talentNama} berhasil diverifikasi & dicatat!`);
    setSelectedItemForPayment(null);
  };'''

new_process_submit = '''  const handleProcessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForPayment) return;

    onSavePayment(selectedItemForPayment.id, nominal, tanggalTransfer, buktiFile);
    const talentName = selectedItemForPayment.talentNama;
    setToastMsg(`Transfer honorarium sebesar Rp ${nominal.toLocaleString('id-ID')} kepada ${talentName} berhasil diverifikasi & dicatat!`);
    setTimeout(() => setToastMsg(null), 4500);
    setSelectedItemForPayment(null);
  };'''

assert old_process_submit in content, "old_process_submit not found"
content = content.replace(old_process_submit, new_process_submit, 1)

# 3. Ganti prompt bukti transfer
old_ganti_bukti = '''                  <button
                    type="button"
                    onClick={() => {
                      const newF = prompt('Ubah nama file bukti transfer:', buktiFile);
                      if (newF) setBuktiFile(newF);
                    }}
                    className="text-[10px] text-[#1A3C5E] font-bold underline cursor-pointer"
                  >
                    Ganti
                  </button>'''

new_ganti_bukti = '''                  <button
                    type="button"
                    onClick={() => {
                      setTempBuktiFile(buktiFile);
                      setIsChangeBuktiOpen(true);
                    }}
                    className="text-[10px] text-[#1A3C5E] font-bold underline cursor-pointer hover:text-slate-900"
                  >
                    Ganti
                  </button>'''

assert old_ganti_bukti in content, "old_ganti_bukti not found"
content = content.replace(old_ganti_bukti, new_ganti_bukti, 1)

# 4. Render modal ubah bukti transfer and toast at end of BendaharaPaymentList
old_end_bendahara = '''      {/* Modal Proses Pembayaran */}
      {selectedItemForPayment && ('''

new_end_bendahara = '''      {/* Toast Notifikasi Verifikasi Transfer */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A3C5E] text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-400 flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMsg}</span>
          <button 
            onClick={() => setToastMsg(null)}
            className="text-slate-300 hover:text-white p-0.5 rounded cursor-pointer ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Modal Pilihan Bukti Transfer */}
      {isChangeBuktiOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <h4 className="font-bold text-sm text-[#1A3C5E]">Pilih Berkas Bukti Transfer</h4>
              <button onClick={() => setIsChangeBuktiOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 space-y-3">
              <p className="text-slate-600">Pilih dari contoh bukti mutasi bank terverifikasi atau input nama berkas:</p>
              
              <div className="space-y-1">
                {[
                  'bukti_transfer_bankjatim_2026.jpg',
                  'struk_m-banking_bca_sukses.png',
                  'bukti_transfer_mandiri_live.pdf'
                ].map((fName, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTempBuktiFile(fName)}
                    className={`w-full text-left p-2 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      tempBuktiFile === fName
                        ? 'bg-blue-50 border-[#1A3C5E] text-[#1A3C5E] font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-mono text-[11px] truncate">{fName}</span>
                    {tempBuktiFile === fName && <Check className="w-3.5 h-3.5 text-[#1A3C5E]" />}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama File Kustom</label>
                <input
                  type="text"
                  value={tempBuktiFile}
                  onChange={(e) => setTempBuktiFile(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-xs focus:outline-none focus:border-[#1A3C5E]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2.5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsChangeBuktiOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (tempBuktiFile.trim()) {
                    setBuktiFile(tempBuktiFile.trim());
                  }
                  setIsChangeBuktiOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold cursor-pointer"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Proses Pembayaran */}
      {selectedItemForPayment && ('''

assert old_end_bendahara in content, "old_end_bendahara not found"
content = content.replace(old_end_bendahara, new_end_bendahara, 1)

with open('src/components/BendaharaScreens.tsx', 'w') as f:
    f.write(content)

print("Updated BendaharaScreens.tsx successfully!")
