# Spesifikasi Teknis Implementasi Produksi: Paguyuban Cak & Ning Surabaya (Laravel MVC)
*Dokumen Arsitektur Lengkap, Skema Migrasi, Hubungan Eloquent, Data Seeder, Logika Kontroler, dan Komponen Blade untuk Rekonstruksi Mandiri di Antigravity IDE*

Dokumen ini dirancang khusus agar **Antigravity IDE Agent** atau pengembang dapat merekonstruksi seluruh sistem aplikasi **Paguyuban Cak & Ning Surabaya** ke dalam framework **Laravel (PHP/Blade/Tailwind)** secara utuh, presisi, dan mandiri tanpa membutuhkan berkas repositori React asal.

---

## 🧭 1. Arsitektur Sistem & Hak Akses (Multi-Role)
Sistem menggunakan autentikasi berbasis peran (*role-based access control*) dengan **5 Persona Utama**:
1.  **SDM (Sumber Daya Manusia & Diklat)**: Mengelola database anggota (Talent), membuat penugasan kerja (*plotting*), dan memvalidasi laporan kegiatan (LPJ).
2.  **Humas (Hubungan Masyarakat)**: Mengelola relasi eksternal (Klien & Sponsor), mengusulkan kegiatan baru, mempublikasikan blog berita/kebudayaan, serta memverifikasi pesan dari formulir kontak.
3.  **Bendahara (Keuangan)**: Mengelola buku kas umum, mencatat pemasukan sponsorship, dan mencairkan pembayaran honorarium penugasan talent.
4.  **Talent (Cak & Ning / Anggota Aktif)**: Menerima/menolak mandat penugasan, memantau statistik poin/kehadiran pribadi, dan menyusun laporan pertanggungjawaban kegiatan.
5.  **Guest (Masyarakat Umum / Publik)**: Mengakses portal informasi, melihat jadwal kegiatan pariwisata Surabaya, menjelajahi galeri dokumentasi foto/video, membaca artikel, serta mengirimkan pesan kolaborasi.

---

## 🗄️ 2. Arsitektur Database (Laravel Migrations Blueprint)

Gunakan blueprint migrasi database berikut untuk membangun struktur tabel yang berelasi erat:

### 2.1. Tabel `users` (Extend Default Laravel)
```php
Schema::table('users', function (Blueprint $table) {
    $table->string('peran')->default('Talent'); // 'SDM', 'Humas', 'Bendahara', 'Talent'
    $table->string('foto')->nullable(); // Nama file atau link foto profil
    $table->string('no_telp')->nullable();
    $table->string('angkatan')->nullable(); // Tahun angkatan Cak & Ning (misal: 2024, 2025)
    $table->string('status_aktif')->default('Aktif'); // 'Aktif', 'Cuti', 'Alumni'
    $table->integer('total_penugasan')->default(0);
    $table->integer('total_poin')->default(0); // Poin keaktifan talent
});
```

### 2.2. Tabel `kegiatans` (Agenda & Event Mandat)
```php
Schema::create('kegiatans', function (Blueprint $table) {
    $table->id();
    $table->string('nama'); // Nama kegiatan pariwisata / internal
    $table->date('tanggal');
    $table->string('waktu'); // Format text, misal: "08:00 - selesai"
    $table->string('lokasi');
    $table->text('deskripsi');
    $table->integer('kuota_talent'); // Jumlah talent yang dibutuhkan
    $table->bigInteger('estimasi_honor'); // Honor per talent (Rp)
    $table->enum('kategori', ['Kebudayaan', 'Internal', 'Sosialisasi', 'Prestasi', 'Sosial Lingkungan', 'Kegiatan Publik', 'Pengabdian']);
    $table->enum('status', ['Butuh Plotting', 'Sedang Jalan', 'Selesai'])->default('Butuh Plotting');
    $table->string('penanggung_jawab_humas'); // Nama staf Humas pengusul
    $table->timestamps();
});
```

### 2.3. Tabel `penugasans` (Relasi Pivot Kegiatan ↔ Talent)
```php
Schema::create('penugasans', function (Blueprint $table) {
    $table->id();
    $table->foreignId('kegiatan_id')->constrained('kegiatans')->onDelete('cascade');
    $table->string('kegiatan_nama'); // Denormalisasi untuk kemudahan performa query
    $table->date('tanggal');
    $table->string('lokasi');
    $table->foreignId('talent_id')->constrained('users')->onDelete('cascade');
    $table->string('talent_nama');
    $table->enum('status', ['Menunggu Konfirmasi', 'Dikonfirmasi', 'Ditolak'])->default('Menunggu Konfirmasi');
    $table->bigInteger('honor');
    $table->enum('status_bayar', ['Belum Dibayar', 'Proses Transfer', 'Lunas'])->default('Belum Dibayar');
    
    // Alur LPJ / Bukti Pelaksanaan Tugas
    $table->text('laporan_deskripsi')->nullable();
    $table->string('laporan_bukti_link')->nullable(); // Bukti link Drive/Foto
    $table->date('laporan_tanggal')->nullable();
    $table->enum('laporan_status', ['Belum Lapor', 'Menunggu Validasi', 'Disetujui', 'Ditolak'])->default('Belum Lapor');
    $table->timestamps();
});
```

### 2.4. Tabel `transaksis` (Buku Kas Umum Bendahara)
```php
Schema::create('transaksis', function (Blueprint $table) {
    $table->id();
    $table->string('kode'); // Contoh: TX-2026-0001
    $table->enum('jenis', ['Pemasukan', 'Pengeluaran']);
    $table->string('kategori'); // 'Honorarium', 'Sponsorship', 'Kas Internal', 'Operasional'
    $table->bigInteger('jumlah');
    $table->date('tanggal');
    $table->string('keterangan');
    $table->string('bukti_transaksi')->nullable(); // Path/link transfer bank
    $table->foreignId('penugasan_id')->nullable()->constrained('penugasans')->onDelete('set null');
    $table->timestamps();
});
```

### 2.5. Tabel `clients` & `sponsors` (Relasi Humas)
```php
Schema::create('clients', function (Blueprint $table) {
    $table->id();
    $table->string('nama_instansi');
    $table->string('pic_nama');
    $table->string('kontak');
    $table->string('email');
    $table->enum('status_kerjasama', ['Aktif', 'Selesai', 'Negosiasi'])->default('Negosiasi');
    $table->timestamps();
});

Schema::create('sponsors', function (Blueprint $table) {
    $table->id();
    $table->string('nama_perusahaan');
    $table->string('kategori_paket'); // 'Platinum', 'Gold', 'Silver', 'Media Partner'
    $table->bigInteger('nilai_kontrak'); // Nilai uang (Rp)
    $table->date('tanggal_mulai');
    $table->enum('status_bayar', ['Belum Lunas', 'Lunas'])->default('Belum Lunas');
    $table->timestamps();
});
```

### 2.6. Tabel `blog_articles` & `media_items` (Konten Publik)
```php
Schema::create('blog_articles', function (Blueprint $table) {
    $table->id();
    $table->string('judul');
    $table->string('slug')->unique();
    $table->text('ringkasan');
    $table->text('konten');
    $table->string('kategori'); // 'Event', 'Kebudayaan', 'Pariwisata', 'Internal'
    $table->date('tanggal_rilis');
    $table->string('penulis');
    $table->timestamps();
});

Schema::create('media_items', function (Blueprint $table) {
    $table->id();
    $table->string('judul');
    $table->enum('tipe', ['Foto', 'Video']);
    $table->date('tanggal');
    $table->string('kategori'); // 'Kebudayaan', 'Internal', 'Sosialisasi'
    $table->string('url_media')->nullable();
    $table->timestamps();
});
```

---

## 🔗 3. Relasi Eloquent (Laravel Models)

Terapkan relasi berikut pada model Laravel Anda untuk mempermudah manipulasi data:

```php
// app/Models/User.php
class User extends Authenticatable {
    public function penugasans() {
        return $this->hasMany(Penugasan::class, 'talent_id');
    }
}

// app/Models/Kegiatan.php
class Kegiatan extends Model {
    public function penugasans() {
        return $this->hasMany(Penugasan::class);
    }
}

// app/Models/Penugasan.php
class Penugasan extends Model {
    public function kegiatan() {
        return $this->belongsTo(Kegiatan::class);
    }
    public function talent() {
        return $this->belongsTo(User::class, 'talent_id');
    }
    public function transaksi() {
        return $this->hasOne(Transaksi::class);
    }
}
```

---

## 🌱 4. Seeder Data Terstandarisasi (PHP Arrays)
Gunakan data realistis dari prototipe ini untuk langsung dimasukkan ke dalam `database/seeders/DatabaseSeeder.php`:

### 4.1. Data Pengguna (Users)
```php
$users = [
    [
        'name' => 'Cak Aditya Pratama',
        'email' => 'aditya@cakning.org',
        'password' => Hash::make('password'),
        'peran' => 'Talent',
        'angkatan' => '2024',
        'total_penugasan' => 14,
        'total_poin' => 85,
    ],
    [
        'name' => 'Ning Shafira Azzahra',
        'email' => 'shafira@cakning.org',
        'password' => Hash::make('password'),
        'peran' => 'Talent',
        'angkatan' => '2025',
        'total_penugasan' => 8,
        'total_poin' => 50,
    ],
    [
        'name' => 'Cak Budi Santoso',
        'email' => 'budi.sdm@cakning.org',
        'password' => Hash::make('password'),
        'peran' => 'SDM',
        'angkatan' => '2022',
        'total_penugasan' => 0,
        'total_poin' => 0,
    ],
    [
        'name' => 'Ning Riska Amalia',
        'email' => 'riska.humas@cakning.org',
        'password' => Hash::make('password'),
        'peran' => 'Humas',
        'angkatan' => '2023',
        'total_penugasan' => 0,
        'total_poin' => 0,
    ],
    [
        'name' => 'Cak Dedi Wijaya',
        'email' => 'dedi.keu@cakning.org',
        'password' => Hash::make('password'),
        'peran' => 'Bendahara',
        'angkatan' => '2022',
        'total_penugasan' => 0,
        'total_poin' => 0,
    ]
];
```

### 4.2. Data Kegiatan (Kegiatans)
```php
$kegiatans = [
    [
        'nama' => 'Penyambutan Delegasi ASEAN - Balai Pemuda',
        'tanggal' => '2026-07-25',
        'waktu' => '09:00 - 15:00',
        'lokasi' => 'Balai Pemuda Surabaya',
        'deskripsi' => 'Penyambutan VIP Delegasi tingkat Menteri Pariwisata ASEAN menggunakan busana lengkap Cak & Ning Lambung.',
        'kuota_talent' => 4,
        'estimasi_honor' => 350000,
        'kategori' => 'Kegiatan Publik',
        'status' => 'Butuh Plotting',
        'penanggung_jawab_humas' => 'Ning Riska Amalia',
    ],
    [
        'nama' => 'Festival Rujak Uleg 2026',
        'tanggal' => '2026-05-18',
        'waktu' => '15:00 - selesai',
        'lokasi' => 'Jalan Kembang Jepun',
        'deskripsi' => 'Pendampingan Walikota Surabaya dan pemandu tari pembuka dalam perayaan tahunan Festival Rujak Uleg.',
        'kuota_talent' => 10,
        'estimasi_honor' => 500000,
        'kategori' => 'Kebudayaan',
        'status' => 'Selesai',
        'penanggung_jawab_humas' => 'Ning Riska Amalia',
    ]
];
```

---

## 🔄 5. Aliran Bisnis Inti & Kode Kontroler

Berikut adalah penjabaran alur transaksional fungsional berserta potongan logika controllers dalam PHP:

```
[Humas: Buat Event] ➔ [SDM: Plotting Talent] ➔ [Talent: Konfirmasi Tugas] ➔ [Talent: Upload Laporan/LPJ] ➔ [SDM: Validasi Laporan] ➔ [Bendahara: Verifikasi & Bayar]
```

### 5.1. Alur 1: Plotting Penugasan Baru (SDM)
SDM memilih salah satu kegiatan aktif dan mengalokasikannya kepada satu atau beberapa Talent.
```php
// app/Http/Controllers/SdmController.php
public function storePenugasan(Request $request) {
    $request->validate([
        'kegiatan_id' => 'required|exists:kegiatans,id',
        'talent_id' => 'required|exists:users,id',
    ]);

    $kegiatan = Kegiatan::findOrFail($request->kegiatan_id);
    $talent = User::findOrFail($request->talent_id);

    $penugasan = new Penugasan();
    $penugasan->kegiatan_id = $kegiatan->id;
    $penugasan->kegiatan_nama = $kegiatan->nama;
    $penugasan->tanggal = $kegiatan->tanggal;
    $penugasan->lokasi = $kegiatan->lokasi;
    $penugasan->talent_id = $talent->id;
    $penugasan->talent_nama = $talent->name;
    $penugasan->honor = $kegiatan->estimasi_honor;
    $penugasan->status = 'Menunggu Konfirmasi';
    $penugasan->status_bayar = 'Belum Dibayar';
    $penugasan->laporan_status = 'Belum Lapor';
    $penugasan->save();

    // Picu notifikasi ke Talent (database notification)
    $talent->notify(new NewAssignmentNotification($penugasan));

    return back()->with('success', 'Talent berhasil ditugaskan.');
}
```

### 5.2. Alur 2: Konfirmasi Tugas & Pelaporan LPJ (Talent)
Talent melakukan persetujuan tugas sebelum hari kegiatan, dan setelah acara selesai mengirimkan laporan bukti kehadiran.
```php
// app/Http/Controllers/TalentController.php
public function confirmAssignment(Request $request, $id) {
    $penugasan = Penugasan::where('talent_id', auth()->id())->findOrFail($id);
    $status = $request->input('action') === 'terima' ? 'Dikonfirmasi' : 'Ditolak';
    
    $penugasan->update(['status' => $status]);
    return back()->with('success', 'Status penugasan berhasil diperbarui.');
}

public function submitLaporan(Request $request, $id) {
    $request->validate([
        'deskripsi' => 'required|string|min:20',
        'bukti_link' => 'required|url',
    ]);

    $penugasan = Penugasan::where('talent_id', auth()->id())->findOrFail($id);
    
    $penugasan->update([
        'laporan_deskripsi' => $request->deskripsi,
        'laporan_bukti_link' => $request->bukti_link,
        'laporan_tanggal' => now(),
        'laporan_status' => 'Menunggu Validasi'
    ]);

    return back()->with('success', 'Laporan LPJ berhasil diajukan untuk ditinjau oleh SDM.');
}
```

### 5.3. Alur 3: Validasi Laporan (SDM) & Pembayaran Keuangan (Bendahara)
SDM memeriksa tautan dokumen bukti dan deskripsi. Jika disetujui, status berubah menjadi layak bayar agar dicairkan oleh Bendahara.
```php
// app/Http/Controllers/SdmController.php (Validasi SDM)
public function validateLaporan(Request $request, $id) {
    $penugasan = Penugasan::findOrFail($id);
    
    if ($request->input('action') === 'setuju') {
        $penugasan->update(['laporan_status' => 'Disetujui']);
        
        // Tambahkan poin keaktifan ke talent
        $penugasan->talent->increment('total_poin', 10);
        $penugasan->talent->increment('total_penugasan', 1);
        
        return back()->with('success', 'Laporan disetujui. Poin talent bertambah +10.');
    }

    $penugasan->update(['laporan_status' => 'Ditolak']);
    return back()->with('warning', 'Laporan ditolak.');
}

// app/Http/Controllers/BendaharaController.php (Pencairan Bendahara)
public function payHonorarium(Request $request, $id) {
    $penugasan = Penugasan::findOrFail($id);

    // Pastikan laporan sudah divalidasi oleh SDM terlebih dahulu
    if ($penugasan->laporan_status !== 'Disetujui') {
        return back()->with('error', 'Laporan penugasan harus disetujui oleh SDM sebelum pembayaran dilakukan.');
    }

    DB::transaction(function() use ($penugasan) {
        // Update Status Bayar
        $penugasan->update(['status_bayar' => 'Lunas']);

        // Catat sebagai Kas Keluar di Buku Kas Umum
        Transaksi::create([
            'kode' => 'TX-OUT-' . time(),
            'jenis' => 'Pengeluaran',
            'kategori' => 'Honorarium',
            'jumlah' => $penugasan->honor,
            'tanggal' => now(),
            'keterangan' => 'Pembayaran honor penugasan ' . $penugasan->kegiatan_nama . ' - ' . $penugasan->talent_nama,
            'penugasan_id' => $penugasan->id
        ]);
    });

    return back()->with('success', 'Pembayaran honorarium lunas dan tercatat dalam buku kas.');
}
```

---

## 🎨 6. Cetak Biru Visual (Blade Templates & Wireframe Components)

Dalam implementasi UI, pertahankan keselarasan visual kawat (*wireframe mode*) dengan CSS Tailwind:

### 6.1. Reusable Component: Wireframe Image (`resources/views/components/wireframe-image.blade.php`)
Visual ini secara akurat mensimulasikan placeholder gambar figma dengan diagonal cross SVG agar mempermudah evaluasi layout oleh Antigravity IDE:
```html
@props([
    'label' => 'Gambar Pendukung',
    'class' => 'h-40 w-full'
])

<div {{ $attributes->merge(['class' => "relative border-2 border-[#1A3C5E] bg-slate-50 flex items-center justify-center p-3 text-center overflow-hidden {$class} transition-all"]) }}>
    <!-- SVG Diagonal Blueprint Cross Lines -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none text-slate-300 opacity-60" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" stroke-width="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" />
    </svg>
    
    <!-- Central Label Badge Overlay -->
    <div class="relative z-10 bg-white/95 border border-[#1A3C5E] px-2.5 py-1 max-w-[90%] shadow-sm">
        <span class="font-sans font-bold text-[10px] sm:text-xs uppercase tracking-tight text-[#1A3C5E]">
            {{ $label }}
        </span>
    </div>
</div>
```

### 6.2. Master Layout & Figma Controller Toggle (`resources/views/layouts/app.blade.php`)
Menerapkan skrip navigasi instan berstatus *ON/OFF* yang persisten pada seluruh rute pengujian sistem:
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paguyuban Cak & Ning Surabaya - Wireframe Prototype</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-slate-100 min-h-screen text-slate-800 antialiased flex flex-col">

    <!-- Header & Main Content Space -->
    <main class="flex-grow">
        @yield('content')
    </main>

    <!-- FIGMA-STYLE NAVIGATOR WIDGET (ON/OFF TOGGLE) -->
    <div x-data="{ 
        visible: localStorage.getItem('figma_navigator_visible') !== 'false',
        open: true,
        toggle() {
            this.visible = !this.visible;
            localStorage.setItem('figma_navigator_visible', this.visible);
        }
    }" class="fixed bottom-4 right-4 z-50 font-sans">
        
        <!-- Button Trigger when OFF -->
        <button x-show="!visible" @click="toggle()" 
            class="bg-[#1A3C5E] hover:bg-[#2c5b8a] text-white border-2 border-white shadow-lg text-xs px-3.5 py-2 font-bold flex items-center gap-2 cursor-pointer transition-all">
            <span>🧭 Navigator: OFF (Klik untuk ON)</span>
        </button>

        <!-- Navigator Panel when ON -->
        <div x-show="visible" class="w-80 bg-white border-2 border-[#1A3C5E] shadow-xl text-xs overflow-hidden">
            <div class="bg-[#1A3C5E] text-white p-3 flex justify-between items-center cursor-pointer" @click="open = !open">
                <span class="font-bold uppercase tracking-wider">Figma-style Navigator</span>
                <span x-text="open ? '▼' : '▲'"></span>
            </div>
            
            <div x-show="open" class="p-3 border-t border-[#1A3C5E] space-y-2 bg-slate-50 max-h-96 overflow-y-auto">
                <p class="text-slate-500 text-[11px] leading-relaxed">
                    Pilih simulasi login cepat untuk berpindah dasbor & menguji alur fungsional sistem:
                </p>
                <div class="grid grid-cols-2 gap-1.5 pt-1">
                    <a href="{{ route('guest.home') }}" class="block p-1.5 bg-white border border-[#1A3C5E] hover:bg-[#1A3C5E] hover:text-white text-center font-semibold rounded">
                        🏠 Portal Publik
                    </a>
                    <a href="/login-as/sdm" class="block p-1.5 bg-white border border-[#1A3C5E] hover:bg-[#1A3C5E] hover:text-white text-center font-semibold rounded">
                        💼 Dasbor SDM
                    </a>
                    <a href="/login-as/humas" class="block p-1.5 bg-white border border-[#1A3C5E] hover:bg-[#1A3C5E] hover:text-white text-center font-semibold rounded">
                        📢 Dasbor Humas
                    </a>
                    <a href="/login-as/talent" class="block p-1.5 bg-white border border-[#1A3C5E] hover:bg-[#1A3C5E] hover:text-white text-center font-semibold rounded">
                        🎭 Dasbor Talent
                    </a>
                    <a href="/login-as/bendahara" class="block p-1.5 bg-white border border-[#1A3C5E] hover:bg-[#1A3C5E] hover:text-white text-center font-semibold rounded">
                        💰 Dasbor Bendahara
                    </a>
                </div>
                
                <!-- Action to turn OFF -->
                <button @click="toggle()" class="w-full mt-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-[10px] py-1.5 font-bold uppercase transition-all">
                    🛑 Sembunyikan Navigator (Turn OFF)
                </button>
            </div>
        </div>
    </div>

</body>
</html>
```
