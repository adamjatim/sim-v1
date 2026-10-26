import React, { useState } from 'react';
import { User, Notification, Role } from '../types';
import { Eye, EyeOff, Lock, User as UserIcon, Bell, CheckCircle, AlertTriangle, Info, Save } from 'lucide-react';

// Flat Contrasting Wireframe Image Placeholder
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
    <div className={`relative border-2 border-[#1A3C5E] ${bgColor} flex flex-col items-center justify-center p-3 text-center overflow-hidden ${className} transition-all`}>
      {/* Dynamic Wireframe Diagonal Cross Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none text-slate-300 opacity-60" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
      
      {/* Label overlay centered */}
      <div className="relative z-10 bg-white/90 border border-[#1A3C5E] px-2.5 py-1 max-w-[90%] shadow-sm">
        <p className={`font-sans font-bold text-[10px] sm:text-xs uppercase tracking-tight ${textColor}`}>
          {label}
        </p>
      </div>
    </div>
  );
}

// 1. HALAMAN LOGIN SCREEN
interface LoginProps {
  onLoginSuccess: (user: User) => void;
  users: User[];
}

export function LoginScreen({ onLoginSuccess, users }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Username dan password harus diisi!');
      return;
    }
    const found = users.find(u => u.username === username.trim());
    if (found) {
      onLoginSuccess(found);
      setError('');
    } else {
      setError('User tidak ditemukan dalam simulasi! Coba tombol cepat di bawah.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] font-sans text-slate-800">
      <div className="w-[400px] bg-white border-2 border-[#1A3C5E] p-8">
        {/* Logo Placeholder */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-[#1A3C5E] text-white flex items-center justify-center font-bold font-mono text-center mb-2 border-2 border-slate-300">
            C&N
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[#1A3C5E]">Masuk ke Sistem</h2>
          <p className="text-xs text-slate-500 mt-1">SIM Penugasan Cak & Ning Surabaya</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 text-red-700 border border-red-300 p-2 text-xs font-mono">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full pl-9 pr-3 py-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1 text-[11px]">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" className="accent-[#1A3C5E]" />
              <span>Ingat saya</span>
            </label>
            <a 
              href="#lupa" 
              onClick={(e) => { e.preventDefault(); alert('Simulasi Lupa Password: Hubungi Administrator SDM (Diklat) untuk menyetel ulang password Anda.'); }} 
              className="text-[#1A3C5E] font-bold hover:underline"
            >
              Lupa Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-4 transition-all text-xs uppercase tracking-wider cursor-pointer border-none"
          >
            LOG IN
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E0E0E0]">
          <span className="text-[10px] text-slate-500 block text-center uppercase tracking-wider font-bold mb-2">Simulasi Pengguna Cepat:</span>
          <div className="grid grid-cols-2 gap-1.5">
            {users.map((u) => (
              <button
                key={u.id}
                onClick={() => {
                  setUsername(u.username);
                  setPassword('password123');
                  onLoginSuccess(u);
                }}
                className="text-[10px] bg-slate-50 hover:bg-slate-200 border border-[#E0E0E0] p-1.5 text-left truncate transition-colors flex flex-col cursor-pointer"
              >
                <span className="font-bold text-[#1A3C5E]">{u.nama.split(' ')[1] || u.nama}</span>
                <span className="text-slate-500 font-mono text-[9px] uppercase">{u.peran}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 15. HALAMAN PROFIL
interface ProfileProps {
  user: User;
  onSaveProfile: (updated: User) => void;
}

export function ProfileScreen({ user, onSaveProfile }: ProfileProps) {
  const [nama, setNama] = useState(user.nama);
  const [email, setEmail] = useState(user.email);
  const [telepon, setTelepon] = useState(user.telepon);
  const [password, setPassword] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...user,
      nama,
      email,
      telepon
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto font-sans p-6 bg-white border-2 border-[#1A3C5E]">
      <div className="border-b border-[#E0E0E0] pb-4 mb-6">
        <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E]">Kelola Profil Saya</h2>
        <p className="text-xs text-slate-500">Perbarui informasi pribadi dan keamanan akun Anda</p>
      </div>

      {isSaved && (
        <div className="mb-6 bg-green-50 text-green-800 border border-green-300 p-3 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
          <span>Profil berhasil disimpan! Data simulasi telah diperbarui.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-6 items-start pb-4 border-b border-[#E0E0E0]">
          <div className="w-24">
            <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Foto Profil</label>
            <WireframeImage label={user.foto || user.nama.substring(0, 3)} className="w-24 h-24" />
          </div>
          <div className="flex-1 space-y-2">
            <span className="text-xs text-slate-500">Aktor Peran:</span>
            <span className="block text-xs font-bold bg-[#1A3C5E] text-white px-2.5 py-1 w-max font-mono uppercase">
              {user.peran}
            </span>
            {user.angkatan && (
              <p className="text-xs font-mono text-slate-700">
                Angkatan: <strong>{user.angkatan}</strong>
              </p>
            )}
            <p className="text-[11px] text-slate-400">Dimensi foto direkomendasikan kotak 1:1. Wireframe menggunakan blok warna solid.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Nomor Telepon</label>
            <input
              type="text"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1A3C5E] uppercase mb-1">Ganti Password (Opsional)</label>
            <input
              type="password"
              placeholder="Masukkan password baru jika ingin diubah"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border-2 border-[#E0E0E0] focus:border-[#1A3C5E] focus:outline-none text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E0E0E0] flex justify-end">
          <button
            type="submit"
            className="bg-[#1A3C5E] hover:bg-slate-800 text-white font-bold py-2 px-5 text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}

// 22. HALAMAN NOTIFIKASI
interface NotificationProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  activeRole: Role;
}

export function NotificationScreen({ notifications, onMarkAsRead, onMarkAllAsRead, activeRole }: NotificationProps) {
  // Filter notifications based on role
  const filtered = notifications.filter(
    n => n.penerimaRole === activeRole || n.penerimaRole === 'SDM' // fallbacks for demo
  );

  const getIcon = (type: 'info' | 'success' | 'warning') => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-700 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-[#1A3C5E] shrink-0" />;
    }
  };

  const getBgClass = (type: 'info' | 'success' | 'warning') => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-300';
      case 'warning':
        return 'bg-amber-50 border-amber-300';
      default:
        return 'bg-[#F5F7FA] border-[#1A3C5E]';
    }
  };

  return (
    <div className="max-w-3xl mx-auto font-sans p-6 bg-white border-2 border-[#1A3C5E]">
      <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A3C5E] flex items-center gap-2">
            <Bell className="w-5 h-5" /> Notifikasi Sistem
          </h2>
          <p className="text-xs text-slate-500">Notifikasi khusus untuk aktor: <strong className="font-mono uppercase">{activeRole}</strong></p>
        </div>
        
        {filtered.some(n => !n.dibaca) && (
          <button
            onClick={onMarkAllAsRead}
            className="text-xs bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 font-bold px-3 py-1 text-slate-700 cursor-pointer"
          >
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-[#E0E0E0] text-slate-500 text-xs">
          Tidak ada notifikasi untuk peran Anda saat ini.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`border-2 p-4 flex items-start gap-3.5 transition-all ${getBgClass(item.tipe)} ${item.dibaca ? 'opacity-60 bg-white border-slate-200' : ''}`}
            >
              <div className="pt-0.5">
                {getIcon(item.tipe)}
              </div>
              <div className="flex-1 space-y-1">
                <p className={`text-xs ${item.dibaca ? 'text-slate-600' : 'text-slate-800 font-medium'}`}>
                  {item.pesan}
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-slate-400">{item.tanggal}</span>
                  {!item.dibaca && (
                    <span className="bg-red-100 text-red-800 text-[8px] font-extrabold px-1 py-0.2 uppercase">Belum Dibaca</span>
                  )}
                </div>
              </div>
              {!item.dibaca && (
                <button
                  onClick={() => onMarkAsRead(item.id)}
                  className="bg-white hover:bg-slate-100 border border-[#1A3C5E] text-[10px] font-bold px-2 py-0.5 cursor-pointer text-[#1A3C5E]"
                >
                  Tandai Dibaca
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
