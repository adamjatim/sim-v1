import React, { useState } from 'react';
import { User, Notification, Role } from '../types';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  User as UserIcon, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Save, 
  ArrowLeft, 
  Sparkles, 
  Shield, 
  Key, 
  Phone, 
  Mail, 
  Calendar, 
  Globe, 
  Award, 
  LogOut,
  ExternalLink,
  Check,
  Filter
} from 'lucide-react';

// ============================================================================
// 0. WIREFRAME PLACEHOLDER IMAGE HELPER
// ============================================================================
interface WireframeImageProps {
  label: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
}

export function WireframeImage({ 
  label, 
  className = 'h-40 w-full', 
  bgColor = 'bg-slate-100', 
  textColor = 'text-slate-600' 
}: WireframeImageProps) {
  return (
    <div className={`relative border border-[#1A3C5E]/20 ${bgColor} flex flex-col items-center justify-center p-3 text-center overflow-hidden ${className} transition-all rounded-xl`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none text-slate-300 opacity-60" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
      <div className="relative z-10 bg-white/95 border border-slate-300 px-2.5 py-1 max-w-[90%] shadow-xs rounded-lg">
        <p className={`font-sans font-bold text-[10px] sm:text-xs uppercase tracking-tight ${textColor}`}>
          {label}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// 1. HALAMAN LOGIN SCREEN (HIGH-FIDELITY)
// ============================================================================
interface LoginProps {
  onLoginSuccess: (user: User) => void;
  users: User[];
  onBackToPublic: () => void;
  logoutMessage?: string;
}

export function LoginScreen({ onLoginSuccess, users, onBackToPublic, logoutMessage }: LoginProps) {
  const [username, setUsername] = useState('sdm_diklat');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Mohon lengkapi username dan password Anda!');
      return;
    }
    const found = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
    if (found) {
      setError('');
      onLoginSuccess(found);
    } else {
      setError('Kombinasi username atau password tidak cocok! Gunakan opsi login cepat di bawah.');
    }
  };

  const handleQuickLogin = (userRole: Role) => {
    const found = users.find(u => u.peran === userRole);
    if (found) {
      setUsername(found.username);
      setPassword('password123');
      onLoginSuccess(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-[#1A3C5E]/20 relative">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50/50 to-amber-50/30 pointer-events-none" />

      {/* Top Bar for Back to Public */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1A3C5E] hover:text-slate-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl shadow-xs border border-slate-200 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Portal Publik
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Branding Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1A3C5E] text-amber-400 font-black text-xl shadow-lg border-2 border-amber-400/50 mb-3 tracking-tighter">
            C&N
          </div>
          <h2 className="text-2xl font-black text-[#1A3C5E] tracking-tight uppercase">
            SIM Cak & Ning Surabaya
          </h2>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Sistem Informasi Manajemen Penugasan Duta Wisata Kota Surabaya
          </p>
        </div>

        {/* Card Box */}
        <div className="mt-6 bg-white py-8 px-6 shadow-xl shadow-slate-200/80 rounded-2xl border border-slate-200 sm:px-10">
          {logoutMessage && (
            <div className="mb-5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl p-3 flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{logoutMessage}</span>
            </div>
          )}

          {error && (
            <div className="mb-5 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xl p-3 flex items-center gap-2.5 animate-fadeIn">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username Akun
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: sdm_diklat atau talent_cak_adi"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white text-slate-800 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white text-slate-800 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#1A3C5E] border-slate-300 rounded focus:ring-[#1A3C5E] accent-[#1A3C5E]"
                />
                <span className="ml-2 font-medium">Ingat Sesi Saya</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Simulasi Reset: Silakan gunakan username dari peran yang tersedia atau hubungi Sie SDM & Diklat di Balai Pemuda.')}
                className="text-xs font-bold text-[#1A3C5E] hover:underline cursor-pointer"
              >
                Lupa Sandi?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A3C5E] hover:bg-slate-900 text-white font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Masuk ke Sistem</span>
            </button>
          </form>

          {/* Quick Demo Login Picker */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                ⚡ Akses Cepat Prototipe (1-Klik Masuk)
              </span>
              <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                Demo Mode
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              <button
                onClick={() => handleQuickLogin('SDM')}
                className="p-2 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/90 text-left cursor-pointer transition-colors"
              >
                <div className="text-[11px] font-bold text-emerald-900 truncate">Cak Dimas (SDM)</div>
                <div className="text-[9px] text-emerald-700 font-mono">Sie SDM & Diklat</div>
              </button>

              <button
                onClick={() => handleQuickLogin('Humas')}
                className="p-2 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/90 text-left cursor-pointer transition-colors"
              >
                <div className="text-[11px] font-bold text-amber-900 truncate">Ning Syafira (Humas)</div>
                <div className="text-[9px] text-amber-700 font-mono">Sie Kemitraan</div>
              </button>

              <button
                onClick={() => handleQuickLogin('Talent')}
                className="p-2 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/90 text-left cursor-pointer transition-colors"
              >
                <div className="text-[11px] font-bold text-purple-900 truncate">Cak Aditya (Talent)</div>
                <div className="text-[9px] text-purple-700 font-mono">Duta Wisata Aktif</div>
              </button>

              <button
                onClick={() => handleQuickLogin('Bendahara')}
                className="p-2 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/90 text-left cursor-pointer transition-colors"
              >
                <div className="text-[11px] font-bold text-indigo-900 truncate">Cak Reza (Bendahara)</div>
                <div className="text-[9px] text-indigo-700 font-mono">Sie Keuangan & Honor</div>
              </button>

              <button
                onClick={() => handleQuickLogin('Ketua Umum')}
                className="col-span-2 p-2 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100/90 text-left cursor-pointer transition-colors"
              >
                <div className="text-[11px] font-bold text-rose-900 truncate">Cak Sandy Wicaksana (Ketua Umum)</div>
                <div className="text-[9px] text-rose-700 font-mono">Pengawasan Eksekutif Paguyuban</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-4 text-center text-[10px] text-slate-400 font-mono">
          Sekretariat: Gedung Balai Pemuda Lt. 2, Jl. Gubernur Suryo No. 15, Surabaya
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// 2. HALAMAN UPDATE PROFIL (HIGH-FIDELITY)
// ============================================================================
interface ProfileProps {
  user: User;
  onSaveProfile: (updated: User) => void;
  onBackToDashboard: () => void;
}

export function ProfileScreen({ user, onSaveProfile, onBackToDashboard }: ProfileProps) {
  const [nama, setNama] = useState(user.nama);
  const [email, setEmail] = useState(user.email);
  const [telepon, setTelepon] = useState(user.telepon);
  const [spesialisasi, setSpesialisasi] = useState(user.spesialisasi || 'Protokoler & Public Speaking');
  const [bio, setBio] = useState(user.bio || 'Duta Wisata Cak & Ning Surabaya aktif mempromosikan pariwisata Kota Pahlawan.');
  const [portofolioLink, setPortofolioLink] = useState(user.portofolioLink || 'https://instagram.com/cakningsby');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword && newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi kata sandi baru tidak sesuai!');
      return;
    }

    onSaveProfile({
      ...user,
      nama,
      email,
      telepon,
      spesialisasi,
      bio,
      portofolioLink
    });

    setIsSaved(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#1A3C5E] mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Halaman Utama
          </button>
          <h2 className="text-xl font-black text-[#1A3C5E] tracking-tight uppercase flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-amber-500" /> Pengaturan & Profil Akun
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Perbarui data diri, keahlian, dan kata sandi akun sistem penugasan Anda
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 bg-[#1A3C5E] text-amber-400 font-bold rounded-xl uppercase tracking-wider">
            {user.peran}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-xl">
            {user.status}
          </span>
        </div>
      </div>

      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs font-medium flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold">Profil Berhasil Diperbarui!</p>
            <p className="text-[11px] text-emerald-700">Perubahan data diri Anda telah disimpan dan disinkronkan ke dalam sistem.</p>
          </div>
        </div>
      )}

      {passwordError && (
        <div className="bg-rose-50 border border-rose-300 text-rose-800 p-4 rounded-2xl text-xs font-medium flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{passwordError}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Avatar & Identity Overview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> Identitas Duta / Pengurus
          </h3>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#1A3C5E] to-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-amber-400/40">
                {nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Inisial Sistem</span>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Username Akun
                </label>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="w-full text-xs font-mono bg-slate-100 border border-slate-200 text-slate-500 rounded-xl p-2.5 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Alamat Email Resmi
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs font-medium pl-9 pr-3 bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp / Telepon
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    className="w-full text-xs font-medium pl-9 pr-3 bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Keahlian & Sosial Media */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" /> Profil Profesional & Sosial Media
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Keahlian / Spesialisasi Tugas
              </label>
              <input
                type="text"
                value={spesialisasi}
                onChange={(e) => setSpesialisasi(e.target.value)}
                placeholder="Misal: MC Protokoler Bilingual, Guide Heritage"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Link Portofolio / Instagram
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={portofolioLink}
                  onChange={(e) => setPortofolioLink(e.target.value)}
                  placeholder="https://instagram.com/username"
                  className="w-full text-xs font-medium pl-9 pr-3 bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Biodata Singkat (Bio)
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white"
                placeholder="Tuliskan pengalaman atau moto kepengurusan Anda..."
              />
            </div>
          </div>
        </div>

        {/* Card 3: Keamanan & Ganti Sandi */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-500" /> Keamanan Akun & Sandi
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi Lama
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi Baru
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Konfirmasi Sandi Baru
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi sandi baru"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#1A3C5E] focus:border-[#1A3C5E] focus:bg-white"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            *Biarkan kolom kata sandi kosong jika Anda hanya ingin memperbarui biodata atau kontak.
          </p>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-[#1A3C5E] hover:bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4 text-amber-400" /> Simpan Perubahan Profil
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// 3. HALAMAN PUSAT NOTIFIKASI SISTEM (HIGH-FIDELITY)
// ============================================================================
interface NotificationProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  activeRole: Role;
  onBackToDashboard: () => void;
  onActionClick?: (notif: Notification) => void;
}

export function NotificationScreen({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  activeRole, 
  onBackToDashboard,
  onActionClick
}: NotificationProps) {
  const [filterType, setFilterType] = useState<'ALL' | 'UNREAD' | 'ASSIGNMENT' | 'FINANCE'>('ALL');

  // Filter notifications based on role & selected filter
  const roleNotifications = notifications.filter(
    n => n.penerimaRole === activeRole || n.penerimaRole === 'SDM'
  );

  const filtered = roleNotifications.filter(n => {
    if (filterType === 'UNREAD') return !n.dibaca;
    if (filterType === 'ASSIGNMENT') return n.pesan.toLowerCase().includes('tugas') || n.pesan.toLowerCase().includes('penugasan') || n.pesan.toLowerCase().includes('plotting');
    if (filterType === 'FINANCE') return n.pesan.toLowerCase().includes('honor') || n.pesan.toLowerCase().includes('bayar') || n.pesan.toLowerCase().includes('transfer');
    return true;
  });

  const unreadCount = roleNotifications.filter(n => !n.dibaca).length;

  const getIcon = (type: 'info' | 'success' | 'warning') => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-600 shrink-0" />;
    }
  };

  const getBadgeClass = (type: 'info' | 'success' | 'warning') => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#1A3C5E] mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Halaman Utama
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-[#1A3C5E] tracking-tight uppercase flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" /> Pusat Notifikasi Sistem
            </h2>
            {unreadCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                {unreadCount} Baru
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pemberitahuan resmi dan alur otomatis untuk peran: <strong className="font-bold text-[#1A3C5E]">{activeRole}</strong>
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 cursor-pointer transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Check className="w-3.5 h-3.5" /> Tandai Semua Telah Dibaca
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'ALL'
              ? 'bg-[#1A3C5E] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Semua ({roleNotifications.length})
        </button>

        <button
          onClick={() => setFilterType('UNREAD')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            filterType === 'UNREAD'
              ? 'bg-[#1A3C5E] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>Belum Dibaca</span>
          {unreadCount > 0 && (
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              filterType === 'UNREAD' ? 'bg-amber-400 text-slate-900' : 'bg-rose-100 text-rose-700'
            }`}>
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setFilterType('ASSIGNMENT')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'ASSIGNMENT'
              ? 'bg-[#1A3C5E] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Penugasan & Jadwal
        </button>

        <button
          onClick={() => setFilterType('FINANCE')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'FINANCE'
              ? 'bg-[#1A3C5E] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Keuangan & Honor
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <Bell className="w-10 h-10 text-slate-300 mx-auto stroke-[1.5]" />
            <h4 className="text-sm font-bold text-slate-700">Tidak ada notifikasi dalam filter ini</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Semua instruksi atau informasi terbaru terkait penugasan Anda telah terselesaikan.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                item.dibaca
                  ? 'bg-white/80 border-slate-200 opacity-75'
                  : 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-100'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2 rounded-xl border ${getBadgeClass(item.tipe)}`}>
                  {getIcon(item.tipe)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.tanggal}
                    </span>
                    {!item.dibaca && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        Baru
                      </span>
                    )}
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                      {item.penerimaRole}
                    </span>
                  </div>

                  <p className={`text-xs ${item.dibaca ? 'text-slate-600' : 'text-slate-900 font-bold'}`}>
                    {item.pesan}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!item.dibaca && (
                  <button
                    onClick={() => onMarkAsRead(item.id)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium cursor-pointer transition-colors"
                    title="Tandai telah dibaca"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
