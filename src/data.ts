import { User, Client, Sponsor, BlogArticle, MediaItem, Kegiatan, Penugasan, PengajuanPenugasan, Notification, ContactMessage, Transaksi } from './types';

// ============================================================================
// 1. DATA PENGGUNA & TALENT (15 Talents + Pengurus Organisasi Inti)
// ============================================================================
export const INITIAL_USERS: User[] = [
  // Pengurus Inti Paguyuban Cak & Ning Surabaya
  { 
    id: 'u_ketum', 
    username: 'ketum_cak_sandy', 
    nama: 'Cak Sandy Wicaksana, S.I.Kom', 
    email: 'ketua.umum@cakning.org', 
    telepon: '081133221100', 
    peran: 'Ketua Umum', 
    status: 'Aktif',
    spesialisasi: 'Kepemimpinan & Diplomasi Budaya',
    bio: 'Ketua Umum Paguyuban Cak & Ning Surabaya Periode 2024-2027. Berkomitmen memajukan pariwisata Surabaya berlandaskan kearifan lokal.'
  },
  { 
    id: 'u1', 
    username: 'sdm_diklat', 
    nama: 'Cak Dimas Rahmad, S.Pd', 
    email: 'dimas.sdm@cakning.org', 
    telepon: '081234567801', 
    peran: 'SDM', 
    status: 'Aktif',
    spesialisasi: 'Pelatihan & Kurikulum Keprotokolan',
    bio: 'Koordinator Sie SDM & Diklat. Menangani pembinaan bakat, etika protokoler, dan pembagian tugas duta wisata.'
  },
  { 
    id: 'u2', 
    username: 'humas_wisata', 
    nama: 'Ning Syafira Amelia, S.Hub.Int', 
    email: 'syafira.humas@cakning.org', 
    telepon: '081234567802', 
    peran: 'Humas', 
    status: 'Aktif',
    spesialisasi: 'Media Relations & Hubungan Antar Lembaga',
    bio: 'Koordinator Sie Hubungan Masyarakat & Kemitraan. Menjembatani paguyuban dengan Pemkot, swasta, dan media.'
  },
  { 
    id: 'u3', 
    username: 'bendahara_cak', 
    nama: 'Cak Reza Fahlevi, S.E', 
    email: 'reza.fin@cakning.org', 
    telepon: '081234567803', 
    peran: 'Bendahara', 
    status: 'Aktif',
    spesialisasi: 'Manajemen Anggaran & Perpajakan',
    bio: 'Bendahara Umum Paguyuban. Mengelola pencairan honorarium tugas, laporan kas operasional, dan sponsor.'
  },
  
  // 15 DATA TALENT DUTA WISATA RESMI CAK & NING SURABAYA
  { 
    id: 'u4', 
    username: 'talent_cak_adi', 
    nama: 'Cak Aditya Pratama', 
    email: 'aditya.cak@gmail.com', 
    telepon: '085678912301', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2023', 
    foto: 'Cak Aditya',
    keaktifan30Hari: 8,
    totalHonor30Hari: 2800000,
    spesialisasi: 'MC Bilingual & Keprotokolan Internasional',
    rating: 4.95,
    bio: 'Wakil I Cak Surabaya 2023. Mahasiswa Sastra Inggris Universitas Airlangga. Berpengalaman memandu tamu kenegaraan.',
    portofolioLink: 'portofolio_cak_aditya_2026.pdf'
  },
  { 
    id: 'u5', 
    username: 'talent_ning_nia', 
    nama: 'Ning Dania Lestari', 
    email: 'dania.ning@gmail.com', 
    telepon: '085678912302', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2024', 
    foto: 'Ning Dania',
    keaktifan30Hari: 7,
    totalHonor30Hari: 2450000,
    spesialisasi: 'Tari Tradisional Remo & Pemandu Wisata Kuliner',
    rating: 4.92,
    bio: 'Ning Favorit Surabaya 2024. Mahasiswi Ilmu Komunikasi ITS. Aktif mempromosikan UMKM kuliner legendaris Surabaya.',
    portofolioLink: 'portofolio_ning_dania_2026.pdf'
  },
  { 
    id: 'u6', 
    username: 'talent_cak_budi', 
    nama: 'Cak Budi Santoso', 
    email: 'budi.cak@gmail.com', 
    telepon: '085678912303', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2022', 
    foto: 'Cak Budi',
    keaktifan30Hari: 5,
    totalHonor30Hari: 1750000,
    spesialisasi: 'Edukator Sejarah & Cagar Budaya',
    rating: 4.88,
    bio: 'Cak Persahabatan 2022. Pegiat sejarah Surabaya Heritage Track. Menguasai narasi sejarah pertempuran 10 Nopember.',
    portofolioLink: 'portofolio_cak_budi.pdf'
  },
  { 
    id: 'u7', 
    username: 'talent_ning_citra', 
    nama: 'Ning Citra Handayani', 
    email: 'citra.ning@gmail.com', 
    telepon: '085678912304', 
    peran: 'Talent', 
    status: 'Nonaktif', 
    angkatan: 'Cak Ning 2021', 
    foto: 'Ning Citra',
    keaktifan30Hari: 1,
    totalHonor30Hari: 350000,
    spesialisasi: 'Public Speaking & Duta Lingkungan Hidup',
    rating: 4.85,
    bio: 'Ning Surabaya 2021. Sedang menempuh program magang studi independen kementerian di Jakarta.',
    portofolioLink: 'portofolio_ning_citra.pdf'
  },
  { 
    id: 'u8', 
    username: 'talent_cak_rian', 
    nama: 'Cak Rian Hidayat', 
    email: 'rian.cak@gmail.com', 
    telepon: '085678912305', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2023', 
    foto: 'Cak Rian',
    keaktifan30Hari: 6,
    totalHonor30Hari: 2100000,
    spesialisasi: 'Pemandu Rombongan VIP & Akomodasi',
    rating: 4.90,
    bio: 'Finalis Cak Surabaya 2023. Memiliki sertifikasi tour leader nasional dan fasih berbahasa Mandarin.',
    portofolioLink: 'portofolio_cak_rian.pdf'
  },
  { 
    id: 'u9', 
    username: 'talent_ning_salsa', 
    nama: 'Ning Salsabila Putri', 
    email: 'salsa.ning@gmail.com', 
    telepon: '085678912306', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2024', 
    foto: 'Ning Salsa',
    keaktifan30Hari: 8,
    totalHonor30Hari: 2800000,
    spesialisasi: 'Duta Fashion Kebaya & Content Creator Budaya',
    rating: 4.96,
    bio: 'Wakil II Ning Surabaya 2024. Mahasiswi Desain Komunikasi Visual UNESA. Aktif memproduksi video promosi wisata.',
    portofolioLink: 'portofolio_ning_salsabila.pdf'
  },
  { 
    id: 'u10', 
    username: 'talent_cak_dani', 
    nama: 'Cak Dani Wijaya', 
    email: 'dani.cak@gmail.com', 
    telepon: '085678912307', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2022', 
    foto: 'Cak Dani',
    keaktifan30Hari: 4,
    totalHonor30Hari: 1400000,
    spesialisasi: 'Penyambutan Olahraga & Pemandu Wisata Maritim',
    rating: 4.82,
    bio: 'Alumni Cak Ning 2022. Atlet panahan daerah dan pemandu spesialis kawasan pesisir Kenjeran.',
    portofolioLink: 'portofolio_cak_dani.pdf'
  },
  { 
    id: 'u11', 
    username: 'talent_ning_amanda', 
    nama: 'Ning Amanda Kirana', 
    email: 'amanda.k@gmail.com', 
    telepon: '085678912308', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2023', 
    foto: 'Ning Amanda',
    keaktifan30Hari: 6,
    totalHonor30Hari: 2100000,
    spesialisasi: 'Diplomasi Kebudayaan & Musik Tradisional',
    rating: 4.91,
    bio: 'Ning Berbakat 2023. Pemain gamelan Jawa dan sindhen muda berbakat Surabaya.',
    portofolioLink: 'portofolio_ning_amanda.pdf'
  },
  { 
    id: 'u12', 
    username: 'talent_cak_fajar', 
    nama: 'Cak Fajar Ramadhan', 
    email: 'fajar.r@gmail.com', 
    telepon: '085678912309', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2024', 
    foto: 'Cak Fajar',
    keaktifan30Hari: 7,
    totalHonor30Hari: 2450000,
    spesialisasi: 'Moderator Talkshow & MC Acara Resmi',
    rating: 4.89,
    bio: 'Cak Surabaya 2024. Mahasiswa Hukum Universitas Airlangga. Kerap dipercaya menjadi protokol sidang paripurna pemuda.',
    portofolioLink: 'portofolio_cak_fajar.pdf'
  },
  { 
    id: 'u13', 
    username: 'talent_ning_putri', 
    nama: 'Ning Putri Handoyo', 
    email: 'putri.h@gmail.com', 
    telepon: '085678912310', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2022', 
    foto: 'Ning Putri',
    keaktifan30Hari: 5,
    totalHonor30Hari: 1750000,
    spesialisasi: 'Hospitality & Pemandu Wisata Religi Ampel',
    rating: 4.86,
    bio: 'Ning Persahabatan 2022. Lulusan Pariwisata Politeknik NSC Surabaya. Ahli etiket perhotelan bintang lima.',
    portofolioLink: 'portofolio_ning_putri.pdf'
  },
  { 
    id: 'u14', 
    username: 'talent_cak_indra', 
    nama: 'Cak Indra Lesmana', 
    email: 'indra.l@gmail.com', 
    telepon: '085678912311', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2023', 
    foto: 'Cak Indra',
    keaktifan30Hari: 6,
    totalHonor30Hari: 2100000,
    spesialisasi: 'Tata Kelola Acara & Logistik Upacara Adat',
    rating: 4.87,
    bio: 'Finalis Cak 2023. Memiliki kepiawaian dalam merancang alur karnaval jalanan Surabaya Vaganza.',
    portofolioLink: 'portofolio_cak_indra.pdf'
  },
  { 
    id: 'u15', 
    username: 'talent_ning_diva', 
    nama: 'Ning Diva Maharani', 
    email: 'diva.m@gmail.com', 
    telepon: '085678912312', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2024', 
    foto: 'Ning Diva',
    keaktifan30Hari: 7,
    totalHonor30Hari: 2450000,
    spesialisasi: 'Penyanyi Tradisional & Pemandu Pameran Seni',
    rating: 4.93,
    bio: 'Ning Berbakat 2024. Mahasiswi Seni Musik Universitas Negeri Surabaya. Vokalis orkestra gamelan kontemporer.',
    portofolioLink: 'portofolio_ning_diva.pdf'
  },
  { 
    id: 'u16', 
    username: 'talent_cak_kevin', 
    nama: 'Cak Kevin Surya', 
    email: 'kevin.surya@gmail.com', 
    telepon: '085678912313', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2025', 
    foto: 'Cak Kevin',
    keaktifan30Hari: 3,
    totalHonor30Hari: 1050000,
    spesialisasi: 'Duta Digitalisasi Wisata & Fotografi',
    rating: 4.80,
    bio: 'Cak Favorit 2025. Fotografer arsitektur Kota Tua Surabaya dan pengelola kanal edukasi Tik-Tok wisata.',
    portofolioLink: 'portofolio_cak_kevin.pdf'
  },
  { 
    id: 'u17', 
    username: 'talent_ning_berlian', 
    nama: 'Ning Berlian Anatasya', 
    email: 'berlian.anatasya@gmail.com', 
    telepon: '085678912314', 
    peran: 'Talent', 
    status: 'Aktif', 
    angkatan: 'Cak Ning 2025', 
    foto: 'Ning Berlian',
    keaktifan30Hari: 4,
    totalHonor30Hari: 1400000,
    spesialisasi: 'Bahasa Asing (Jepang & Inggris) & Pemandu Sister City',
    rating: 4.88,
    bio: 'Wakil I Ning 2025. Mahasiswi Sastra Jepang Universitas Airlangga. Berpengalaman menjadi interpreter delegasi.',
    portofolioLink: 'portofolio_ning_berlian.pdf'
  },
  { 
    id: 'u18', 
    username: 'talent_cak_wahyu', 
    nama: 'Cak Wahyu Prasetya', 
    email: 'wahyu.pras@gmail.com', 
    telepon: '085678912315', 
    peran: 'Talent', 
    status: 'Nonaktif', 
    angkatan: 'Cak Ning 2021', 
    foto: 'Cak Wahyu',
    keaktifan30Hari: 0,
    totalHonor30Hari: 0,
    spesialisasi: 'Penyelaras Busana Beskap & Keris Tradisional',
    rating: 4.84,
    bio: 'Cak Ning Angkatan 2021. Sedang mengambil cuti penugasan dinas karena penelitian skripsi akhir semester.',
    portofolioLink: 'portofolio_cak_wahyu.pdf'
  }
];

// ============================================================================
// 2. DATA CLIENT MITRA INSTANSI (12 Data Dummy Lengkap)
// ============================================================================
export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'c1',
    namaInstansi: 'Dinas Kebudayaan, Kepemudaan dan Olahraga serta Pariwisata Surabaya',
    kontakPerson: 'Ibu Dra. Hj. Endang Sriwati, M.M',
    telepon: '031-5345678',
    email: 'disbudporapar@surabaya.go.id',
    alamat: 'Gedung Siola Lt. 2, Jl. Tunjungan No. 1-3, Genteng, Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '20 Juni 2026: Koordinasi 6 pasang Cak & Ning untuk penyambutan Walikota Surabaya di Balai Kota.',
      '25 Juni 2026: Konfirmasi penugasan gladi resik Surabaya Vaganza di Balai Pemuda.'
    ]
  },
  {
    id: 'c2',
    namaInstansi: 'PT Grand City Convention & Exhibition Surabaya',
    kontakPerson: 'Bapak Ir. Hermawan Sutanto',
    telepon: '081122334455',
    email: 'hermawan@grandcitysurabaya.com',
    alamat: 'Jl. Walikota Mustajab No. 1, Ketabang, Genteng, Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '15 Juni 2026: Pengajuan audiensi kerjasama duta penyambut tamu pameran ekspor UMKM Jawa Timur.'
    ]
  },
  {
    id: 'c3',
    namaInstansi: 'Hotel Bumi Surabaya City Resort',
    kontakPerson: 'Ibu Rina Amelia, S.ST.Par',
    telepon: '031-5678123',
    email: 'pr@bumisurabaya.com',
    alamat: 'Jl. Jenderal Basuki Rahmat No. 106-128, Embong Kaliasin, Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '12 Juni 2026: Permintaan 2 talent pemandu busana adat pada jamuan delegasi Konjen Australia.'
    ]
  },
  {
    id: 'c4',
    namaInstansi: 'Biro Humas dan Protokol Pemerintah Provinsi Jawa Timur',
    kontakPerson: 'Bapak Dr. Gatot Subroto, M.Si',
    telepon: '031-8291029',
    email: 'humasprov@jatimprov.go.id',
    alamat: 'Kantor Gubernur Jatim, Jl. Pahlawan No. 110, Alun-Alun Contong, Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '18 Juni 2026: Koordinasi 2 pasang Cak Ning untuk pembukaan Jatim Fair di Grand City.'
    ]
  },
  {
    id: 'c5',
    namaInstansi: 'Museum House of Sampoerna Surabaya',
    kontakPerson: 'Ibu Listiawati, M.A',
    telepon: '031-3539000',
    email: 'heritage@sampoerna.com',
    alamat: 'Taman Sampoerna No. 6, Krembangan Utara, Pabean Cantikan, Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '10 Juni 2026: Kerjasama reguler Surabaya Heritage Track akhir pekan.'
    ]
  },
  {
    id: 'c6',
    namaInstansi: 'Pakuwon Mall Management (PT Pakuwon Jati Tbk)',
    kontakPerson: 'Mbak Caroline Jane, B.Com',
    telepon: '081288776655',
    email: 'marketing@pakuwon.com',
    alamat: 'Pakuwon Mall Lt. 5, Jl. Mayjen Yono Suwoyo No. 2, Babatan, Surabaya Barat',
    status: 'Aktif',
    catatanInteraksi: [
      '22 Juni 2026: Pemandu busana adat pembukaan Surabaya Fashion Parade.'
    ]
  },
  {
    id: 'c7',
    namaInstansi: 'PT Ciputra Development Tbk (CitraLand Surabaya)',
    kontakPerson: 'Bapak Rudi Setyawan, S.T',
    telepon: '081299881122',
    email: 'event@citralandsurabaya.com',
    alamat: 'Marketing Gallery CitraLand, Jl. CitraLand Utama, Sambikerep, Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '26 Juni 2026: Penugasan MC pembukaan pameran seni patung Ciputra Heritage.'
    ]
  },
  {
    id: 'c8',
    namaInstansi: 'Dinas Koperasi dan UKM Pemerintah Provinsi Jawa Timur',
    kontakPerson: 'Ibu Dra. Hartati Mulyani',
    telepon: '031-8415622',
    email: 'diskopukm@jatimprov.go.id',
    alamat: 'Jl. Raya Bandara Juanda No. 22, Sedati, Sidoarjo - Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '05 Juni 2026: Pemandu stan sentra batik tulis Madura dan Kenjeran.'
    ]
  },
  {
    id: 'c9',
    namaInstansi: 'Pusat Bahasa dan Kebudayaan Universitas Airlangga',
    kontakPerson: 'Dr. Soni Wijaya, M.Hum',
    telepon: '031-5914025',
    email: 'cultural.center@unair.ac.id',
    alamat: 'Gedung Rektorat Kampus C Mulyorejo, Jl. Dr. Ir. H. Soekarno, Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '24 Juni 2026: Sambutan duta wisata bagi visiting professor dari Monash University Australia.'
    ]
  },
  {
    id: 'c10',
    namaInstansi: 'Hotel Shangri-La Surabaya',
    kontakPerson: 'Ibu Fiona Olivia, B.B.A',
    telepon: '031-5661550',
    email: 'events.surabaya@shangri-la.com',
    alamat: 'Jl. Mayjen Sungkono No. 120, Pakis, Sawahan, Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '02 Juni 2026: Penyambutan VIP Gala Dinner Asosiasi Kedutaan Besar Eropa.'
    ]
  },
  {
    id: 'c11',
    namaInstansi: 'Dinas Lingkungan Hidup Kota Surabaya',
    kontakPerson: 'Bapak Choirul Anam, S.Si',
    telepon: '031-5312345',
    email: 'dlh@surabaya.go.id',
    alamat: 'Jl. Menur No. 31A, Manyar Sabrangan, Mulyorejo, Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '27 Juni 2026: Kampanye Duta Sadar Mangrove di Ekowisata Wonorejo.'
    ]
  },
  {
    id: 'c12',
    namaInstansi: 'Tunjungan Plaza Mall Management (Pakuwon Group)',
    kontakPerson: 'Bapak Raymond Hartono',
    telepon: '081344556677',
    email: 'event.tp@pakuwon.com',
    alamat: 'Tunjungan Plaza 4 Lt. 5, Jl. Embong Malang No. 7-21, Surabaya',
    status: 'Aktif',
    catatanInteraksi: [
      '01 Juni 2026: Promosi stan wisata kuliner legendaris Surabaya Tourism Information.'
    ]
  }
];

// ============================================================================
// 3. DATA SPONSOR PAGUYUBAN (10 Data Dummy Lengkap)
// ============================================================================
export const INITIAL_SPONSORS: Sponsor[] = [
  { 
    id: 's1', 
    namaSponsor: 'PT Bank Pembangunan Daerah Jawa Timur Tbk (Bank Jatim)', 
    kontakPerson: 'Bapak Agus Setiawan, S.E', 
    jenisSponsorship: 'Utama', 
    telepon: '081233445566',
    email: 'sponsorship@bankjatim.co.id',
    nominalDukungan: 50000000,
    keterangan: 'Sponsor platinum penyediaan beasiswa duta wisata & operasional penugasan resmi.'
  },
  { 
    id: 's2', 
    namaSponsor: 'PT Sinar Sosro Pabrik Surabaya', 
    kontakPerson: 'Ibu Maya Lestari', 
    jenisSponsorship: 'Pendukung', 
    telepon: '085699887766',
    email: 'maya.lestari@sosro.com',
    nominalDukungan: 15000000,
    keterangan: 'Penyediaan refreshment Teh Botol Sosro pada seluruh event outdoor parade & festival.'
  },
  { 
    id: 's3', 
    namaSponsor: 'Radio Suara Surabaya (SS Media)', 
    kontakPerson: 'Bapak Yudianto, S.Sos', 
    jenisSponsorship: 'Media Partner', 
    telepon: '031-99223344',
    email: 'redaksi@suarasurabaya.net',
    nominalDukungan: 20000000,
    keterangan: 'Publikasi liputan on-air, talkshow mingguan Duta Wisata, dan live report kegiatan.'
  },
  { 
    id: 's4', 
    namaSponsor: 'PT Santos Jaya Abadi (Kopi Kapal Api)', 
    kontakPerson: 'Bapak Edwin Pratama', 
    jenisSponsorship: 'Utama', 
    telepon: '08113425672',
    email: 'csr@kapalapi.co.id',
    nominalDukungan: 35000000,
    keterangan: 'Sponsor seragam jas beskap resmi Cak dan kebaya Ning tahun berjalan.'
  },
  { 
    id: 's5', 
    namaSponsor: 'PT Semen Indonesia (Persero) Tbk (SIG)', 
    kontakPerson: 'Ibu Fitria Rahmawati', 
    jenisSponsorship: 'Pendukung', 
    telepon: '08119876543',
    email: 'fitria.csr@sig.id',
    nominalDukungan: 25000000,
    keterangan: 'Dukungan program konservasi mangrove dan revitalisasi cagar budaya bantaran Kalimas.'
  },
  { 
    id: 's6', 
    namaSponsor: 'PT Vitapharm (Viva Cosmetics Surabaya)', 
    kontakPerson: 'Bapak Henry Wijaya', 
    jenisSponsorship: 'Pendukung', 
    telepon: '031-8412345',
    email: 'info@vivacosmetic.com',
    nominalDukungan: 18000000,
    keterangan: 'Penyediaan make-up artist, tata rias busana Ning, dan produk perawatan kulit resmi.'
  },
  { 
    id: 's7', 
    namaSponsor: 'PT Indofood CBP Sukses Makmur Tbk', 
    kontakPerson: 'Ibu Ratna Kumala', 
    jenisSponsorship: 'Pendukung', 
    telepon: '08123456711',
    email: 'ratna.kumala@indofood.co.id',
    nominalDukungan: 12000000,
    keterangan: 'Konsumsi dan bingkisan kuliner instan bagi delegasi luar negeri.'
  },
  { 
    id: 's8', 
    namaSponsor: 'PT HM Sampoerna Tbk Heritage Foundation', 
    kontakPerson: 'Bapak Bambang Sujatmiko', 
    jenisSponsorship: 'Utama', 
    telepon: '031-3531617',
    email: 'heritage.sampoerna@sampoerna.com',
    nominalDukungan: 40000000,
    keterangan: 'Fasilitas transportasi bus heritage ber-AC dan honor pemandu sejarah.'
  },
  { 
    id: 's9', 
    namaSponsor: 'Jawa Pos Media Group', 
    kontakPerson: 'Mbak Linda Rosita, S.I.Kom', 
    jenisSponsorship: 'Media Partner', 
    telepon: '031-8202000',
    email: 'redaksi@jawapos.co.id',
    nominalDukungan: 25000000,
    keterangan: 'Pemuatan artikel liputan satu halaman penuh suplemen Metropolis Surabaya.'
  },
  { 
    id: 's10', 
    namaSponsor: 'Grab Indonesia (Regional Jawa Timur)', 
    kontakPerson: 'Bapak Dimas Anggara', 
    jenisSponsorship: 'Pendukung', 
    telepon: '081122446688',
    email: 'dimas.jatim@grab.com',
    nominalDukungan: 15000000,
    keterangan: 'Voucher mobilitas armada transportasi antar-jemput talent penugasan darurat.'
  }
];

// ============================================================================
// 4. DATA PENGAJUAN PENUGASAN HUMAS (10 Data Dummy Lengkap)
// ============================================================================
export const INITIAL_PENGAJUAN_PENUGASAN: PengajuanPenugasan[] = [
  {
    id: 'pp1',
    namaKegiatan: 'Penyambutan Delegasi Sister City Kitakyushu Jepang',
    tanggal: '2026-07-02',
    client: 'Dinas Kebudayaan dan Pariwisata Surabaya',
    status: 'Disetujui',
    lokasi: 'Lobby Utama Balai Kota Surabaya',
    kebutuhanTalent: 4,
    usulanTalentNama: ['Cak Aditya Pratama', 'Ning Dania Lestari', 'Cak Fajar Ramadhan', 'Ning Diva Maharani'],
    keterangan: 'Menyambut Walikota Kitakyushu beserta staf delegasi kota kembar.'
  },
  {
    id: 'pp2',
    namaKegiatan: 'Panduan Tur Sejarah Delegasi Monash University',
    tanggal: '2026-07-05',
    client: 'Pusat Bahasa dan Kebudayaan Universitas Airlangga',
    status: 'Diajukan ke SDM',
    lokasi: 'Kompleks Tugu Pahlawan & Museum 10 Nopember',
    kebutuhanTalent: 2,
    usulanTalentNama: ['Cak Budi Santoso', 'Ning Berlian Anatasya'],
    keterangan: 'Pemandu sejarah berbahasa Inggris untuk 25 dosen tamu Australia.'
  },
  {
    id: 'pp3',
    namaKegiatan: 'Penyambutan Kemenparekraf di Sanggar Seni Balai Pemuda',
    tanggal: '2026-07-10',
    client: 'Dinas Kebudayaan dan Pariwisata Surabaya',
    status: 'Diajukan ke SDM',
    lokasi: 'Alun-Alun Surabaya / Balai Pemuda',
    kebutuhanTalent: 4,
    usulanTalentNama: ['Cak Rian Hidayat', 'Ning Salsabila Putri'],
    keterangan: 'Penyematan selendang kehormatan dan tarian selamat datang.'
  },
  {
    id: 'pp4',
    namaKegiatan: 'Aksi Konservasi Penanaman 500 Bibit Mangrove',
    tanggal: '2026-07-12',
    client: 'Dinas Lingkungan Hidup Kota Surabaya',
    status: 'Diajukan ke SDM',
    lokasi: 'Dermaga Ekowisata Mangrove Wonorejo',
    kebutuhanTalent: 2,
    usulanTalentNama: ['Cak Dani Wijaya', 'Ning Citra Handayani'],
    keterangan: 'Edukasi kesadaran lingkungan pesisir bersama komunitas pemuda.'
  },
  {
    id: 'pp5',
    namaKegiatan: 'Penyambutan Kunjungan Kerja Dubes Australia',
    tanggal: '2026-07-15',
    client: 'Pemerintah Provinsi Jawa Timur',
    status: 'Draft Usulan',
    lokasi: 'Gedung Negara Grahadi Surabaya',
    kebutuhanTalent: 4,
    usulanTalentNama: ['Cak Aditya Pratama', 'Ning Dania Lestari'],
    keterangan: 'Upacara kenegaraan pembukaan kemitraan riset kesehatan anak.'
  },
  {
    id: 'pp6',
    namaKegiatan: 'Penyambutan Kontingen Atlet PON Jawa Timur Juara Umum',
    tanggal: '2026-07-20',
    client: 'Dinas Pemuda dan Olahraga Jawa Timur',
    status: 'Draft Usulan',
    lokasi: 'Pintu Kedatangan Terminal 1 Bandara Internasional Juanda',
    kebutuhanTalent: 4,
    usulanTalentNama: ['Cak Indra Lesmana', 'Ning Amanda Kirana'],
    keterangan: 'Pengalungan bunga melati selamat datang pahlawan olahraga.'
  },
  {
    id: 'pp7',
    namaKegiatan: 'Promosi Surabaya Tourism Expo di Pakuwon Mall',
    tanggal: '2026-07-25',
    client: 'Pakuwon Mall Management',
    status: 'Draft Usulan',
    lokasi: 'Grand Atrium Pakuwon Mall Surabaya',
    kebutuhanTalent: 2,
    usulanTalentNama: ['Cak Kevin Surya', 'Ning Diva Maharani'],
    keterangan: 'Menjaga stan resmi dan membagikan booklet destinasi heritage.'
  },
  {
    id: 'pp8',
    namaKegiatan: 'Gala Dinner HUT Asosiasi Agen Perjalanan Wisata (ASITA)',
    tanggal: '2026-07-28',
    client: 'Hotel Bumi Surabaya City Resort',
    status: 'Draft Usulan',
    lokasi: 'Isyana Ballroom Hotel Bumi Surabaya',
    kebutuhanTalent: 2,
    usulanTalentNama: ['Cak Rian Hidayat', 'Ning Putri Handoyo'],
    keterangan: 'Menyambut 150 pimpinan biro travel nasional.'
  },
  {
    id: 'pp9',
    namaKegiatan: 'Festival Kuliner Pasar Tunjungan Romantis',
    tanggal: '2026-08-02',
    client: 'Dinas Koperasi dan UKM Surabaya',
    status: 'Draft Usulan',
    lokasi: 'Kawasan Pedestrian Jl. Tunjungan',
    kebutuhanTalent: 4,
    usulanTalentNama: ['Cak Fajar Ramadhan', 'Ning Salsabila Putri'],
    keterangan: 'Mempromosikan jajanan lontong balap, semanggi, dan rujak uleg.'
  },
  {
    id: 'pp10',
    namaKegiatan: 'Seminar Nasional Penguatan Ekosistem Kreatif Pemuda',
    tanggal: '2026-08-08',
    client: 'PT Grand City Surabaya',
    status: 'Dibatalkan',
    lokasi: 'Convention Hall Lt. 3 Grand City Surabaya',
    kebutuhanTalent: 2,
    usulanTalentNama: [],
    keterangan: 'Kegiatan diundur ke kuartal IV atas permintaan panitia pusat.'
  }
];

// ============================================================================
// 5. DATA AGENDA KEGIATAN UMUM (12 Kegiatan)
// ============================================================================
export const INITIAL_KEGIATAN: Kegiatan[] = [
  {
    id: 'k1',
    namaKegiatan: 'Penyambutan Tamu Delegasi Sister City Kitakyushu',
    tanggal: '2026-07-02',
    lokasi: 'Balai Kota Surabaya, Jl. Walikota Mustajab No. 59',
    deskripsi: 'Menyambut rombongan delegasi dari kota kembar Kitakyushu, Jepang. Menjelaskan singkat sejarah balai kota dan memberikan cinderamata resmi.',
    status: 'Sedang Berjalan'
  },
  {
    id: 'k2',
    namaKegiatan: 'Panduan Tur Museum Sepuluh Nopember',
    tanggal: '2026-07-05',
    lokasi: 'Kompleks Tugu Pahlawan Surabaya',
    deskripsi: 'Menjadi pemandu wisata sejarah khusus rombongan mahasiswa asing Monash University Australia dan delegasi pemuda.',
    status: 'Butuh Plotting'
  },
  {
    id: 'k3',
    namaKegiatan: 'Festival Rujak Uleg Surabaya 2026',
    tanggal: '2026-05-20',
    lokasi: 'Kawasan Heritage Jl. Kembang Jepun',
    deskripsi: 'Mengikuti prosesi nguleg cobek raksasa bersama Walikota dan 1.000 peserta mengenakan busana kreasi Arek Suroboyo.',
    status: 'Selesai'
  },
  {
    id: 'k4',
    namaKegiatan: 'Parade Bunga dan Budaya Surabaya Vaganza 2026',
    tanggal: '2026-05-31',
    lokasi: 'Rute Siola Jl. Tunjungan hingga Balai Pemuda',
    deskripsi: 'Berada di atas mobil hias utama Paguyuban Cak & Ning menyapa ratusan ribu warga Kota Pahlawan.',
    status: 'Selesai'
  },
  {
    id: 'k5',
    namaKegiatan: 'Cak & Ning Goes to School - Edukasi Budaya Remaja',
    tanggal: '2026-06-15',
    lokasi: 'Aula SMAN 2 & SMAN 5 Surabaya',
    deskripsi: 'Pengenalan filosofi bahasa Suroboyoan, pakaian adat cak ning, dan pencegahan kenakalan remaja.',
    status: 'Selesai'
  },
  {
    id: 'k6',
    namaKegiatan: 'Penyambutan Kemenparekraf di Sanggar Seni Balai Pemuda',
    tanggal: '2026-07-10',
    lokasi: 'Sanggar Seni Balai Pemuda Surabaya',
    deskripsi: 'Menampilkan tari penyambutan Remo Gagrak Anyar dan mendampingi Menteri Pariwisata dan Ekonomi Kreatif.',
    status: 'Butuh Plotting'
  },
  {
    id: 'k7',
    namaKegiatan: 'Gala Dinner Walikota & Asosiasi Travel Agen Indonesia (ASITA)',
    tanggal: '2026-06-22',
    lokasi: 'Halaman Taman Balai Kota Surabaya',
    deskripsi: 'Menghadiri jamuan makan malam resmi, menyambut pengurus ASITA seluruh Indonesia, serta mempromosikan paket wisata Surabaya Heritage.',
    status: 'Selesai'
  },
  {
    id: 'k8',
    namaKegiatan: 'Kampanye Kebersihan Kalimas & Penanaman Mangrove Wonorejo',
    tanggal: '2026-07-12',
    lokasi: 'Ekowisata Mangrove Wonorejo, Rungkut',
    deskripsi: 'Aksi sosial penanaman 500 bibit mangrove dan bersih susur sungai bersama Dinas Lingkungan Hidup.',
    status: 'Butuh Plotting'
  },
  {
    id: 'k9',
    namaKegiatan: 'Penyambutan Kunjungan Kerja Duta Besar Australia',
    tanggal: '2026-07-15',
    lokasi: 'Gedung Rektorat Kampus C Universitas Airlangga',
    deskripsi: 'Pendampingan kunjungan akademik Duta Besar Australia dalam rangka pembukaan program riset kerjasama kesehatan anak.',
    status: 'Butuh Plotting'
  },
  {
    id: 'k10',
    namaKegiatan: 'Promosi Destinasi Surabaya Heritage di Tunjungan Plaza',
    tanggal: '2026-06-29',
    lokasi: 'Atrium Tunjungan Plaza 3 Lt. UG',
    deskripsi: 'Menjaga stan pariwisata resmi dan memberikan konsultasi rute wisata kota tua bagi wisatawan nusantara & mancanegara.',
    status: 'Selesai'
  },
  {
    id: 'k11',
    namaKegiatan: 'Grand Final Pemilihan Putera Puteri Pariwisata Daerah',
    tanggal: '2026-06-28',
    lokasi: 'Grand City Convention Hall Surabaya',
    deskripsi: 'Menghadiri panggung kehormatan dan menyerahkan piala bergilir kepada pemenang terpilih.',
    status: 'Selesai'
  },
  {
    id: 'k12',
    namaKegiatan: 'Penyambutan Kontingen Atlet PON Jawa Timur',
    tanggal: '2026-07-20',
    lokasi: 'Bandara Internasional Juanda Surabaya (T1)',
    deskripsi: 'Penyematan kalung bunga melati dan penyambutan resmi kontingen olahraga Jawa Timur peraih medali emas.',
    status: 'Butuh Plotting'
  }
];

// ============================================================================
// 6. DATA PENUGASAN TALENT LENGKAP (Master Penugasan, Honor, LPJ)
// ============================================================================
export const INITIAL_PENUGASAN: Penugasan[] = [
  // 1. Selesai & Lunas
  {
    id: 'p1',
    kegiatanId: 'k3',
    kegiatanNama: 'Festival Rujak Uleg Surabaya 2026',
    tanggal: '2026-05-20',
    lokasi: 'Jalan Kembang Jepun',
    talentId: 'u4',
    talentNama: 'Cak Aditya Pratama',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Lunas',
    tanggalBayar: '2026-05-22',
    buktiBayar: 'bukti_transfer_p1_bankjatim.jpg',
    bankTujuan: 'Bank Jatim',
    rekeningTujuan: '001-298374-1 (Cak Aditya Pratama)',
    laporanDeskripsi: 'Telah mengikuti seluruh rangkaian prosesi nguleg cobek raksasa di Kembang Jepun dari pukul 08:00 hingga selesai. Mendampingi Walikota dan memandu delegasi asing.',
    laporanBuktiLink: 'laporan_rujak_uleg_cak_adi.pdf',
    laporanTanggal: '2026-05-20',
    laporanStatus: 'Disetujui'
  },
  // 2. Selesai & Lunas
  {
    id: 'p2',
    kegiatanId: 'k4',
    kegiatanNama: 'Parade Bunga dan Budaya Surabaya Vaganza 2026',
    tanggal: '2026-05-31',
    lokasi: 'Jalan Tunjungan - Balai Pemuda',
    talentId: 'u5',
    talentNama: 'Ning Dania Lestari',
    status: 'Selesai',
    honor: 400000,
    statusBayar: 'Lunas',
    tanggalBayar: '2026-06-02',
    buktiBayar: 'bukti_transfer_p2_bca.jpg',
    bankTujuan: 'BCA',
    rekeningTujuan: '822-019283-4 (Ning Dania Lestari)',
    laporanDeskripsi: 'Mengenakan busana kebaya khas Ning Surabaya di atas mobil hias utama dari start Gedung Siola hingga finish di Balai Pemuda.',
    laporanBuktiLink: 'dokumentasi_vaganza_ning_dania.jpg',
    laporanTanggal: '2026-05-31',
    laporanStatus: 'Disetujui'
  },
  // 3. Selesai & Lunas
  {
    id: 'p3',
    kegiatanId: 'k5',
    kegiatanNama: 'Cak & Ning Goes to School - Edukasi Budaya Remaja',
    tanggal: '2026-06-15',
    lokasi: 'SMAN 2 & SMAN 5 Surabaya',
    talentId: 'u6',
    talentNama: 'Cak Budi Santoso',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Lunas',
    tanggalBayar: '2026-06-18',
    buktiBayar: 'bukti_transfer_p3_mandiri.jpg',
    bankTujuan: 'Mandiri',
    rekeningTujuan: '141-00-192837-2 (Cak Budi Santoso)',
    laporanDeskripsi: 'Menjadi narasumber pemateri sejarah bahasa Arek Suroboyoan di hadapan 350 siswa kelas X dan XI.',
    laporanBuktiLink: 'laporan_goes_to_school_budi.pdf',
    laporanTanggal: '2026-06-15',
    laporanStatus: 'Disetujui'
  },
  // 4. Selesai & Lunas
  {
    id: 'p4',
    kegiatanId: 'k7',
    kegiatanNama: 'Gala Dinner Walikota & Asosiasi Travel Agen Indonesia',
    tanggal: '2026-06-22',
    lokasi: 'Halaman Balai Kota Surabaya',
    talentId: 'u8',
    talentNama: 'Cak Rian Hidayat',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Lunas',
    tanggalBayar: '2026-06-24',
    buktiBayar: 'bukti_transfer_p4_bankjatim.jpg',
    bankTujuan: 'Bank Jatim',
    rekeningTujuan: '001-384729-0 (Cak Rian Hidayat)',
    laporanDeskripsi: 'Menyambut 150 ketua DPD ASITA se-Indonesia dan membagikan suvenir miniatur patung Sura dan Baya.',
    laporanBuktiLink: 'laporan_gala_dinner_rian.pdf',
    laporanTanggal: '2026-06-22',
    laporanStatus: 'Disetujui'
  },
  // 5. Selesai & Siap Bayar (Menunggu transfer Bendahara)
  {
    id: 'p5',
    kegiatanId: 'k10',
    kegiatanNama: 'Promosi Destinasi Surabaya Heritage di Tunjungan Plaza',
    tanggal: '2026-06-29',
    lokasi: 'Atrium Tunjungan Plaza 3',
    talentId: 'u4',
    talentNama: 'Cak Aditya Pratama',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'Bank Jatim',
    rekeningTujuan: '001-298374-1 (Cak Aditya Pratama)',
    laporanDeskripsi: 'Menjaga stan resmi Dinas Pariwisata selama shift 1 (pukul 10.00 - 16.00 WIB) dan melayani 40 wisatawan asing.',
    laporanBuktiLink: 'laporan_promosi_tp_aditya.pdf',
    laporanTanggal: '2026-06-29',
    laporanStatus: 'Disetujui'
  },
  // 6. Selesai & Siap Bayar
  {
    id: 'p6',
    kegiatanId: 'k11',
    kegiatanNama: 'Grand Final Pemilihan Putera Puteri Pariwisata Daerah',
    tanggal: '2026-06-28',
    lokasi: 'Grand City Convention Hall',
    talentId: 'u9',
    talentNama: 'Ning Salsabila Putri',
    status: 'Selesai',
    honor: 400000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'BCA',
    rekeningTujuan: '822-098765-1 (Ning Salsabila Putri)',
    laporanDeskripsi: 'Mendampingi dewan juri kehormatan dan menyerahkan selendang mahkota kepada Ning Terpilih.',
    laporanBuktiLink: 'laporan_grand_final_salsabila.pdf',
    laporanTanggal: '2026-06-28',
    laporanStatus: 'Disetujui'
  },
  // 7. Selesai & Siap Bayar
  {
    id: 'p7',
    kegiatanId: 'k11',
    kegiatanNama: 'Grand Final Pemilihan Putera Puteri Pariwisata Daerah',
    tanggal: '2026-06-28',
    lokasi: 'Grand City Convention Hall',
    talentId: 'u12',
    talentNama: 'Cak Fajar Ramadhan',
    status: 'Selesai',
    honor: 400000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'Mandiri',
    rekeningTujuan: '141-00-584739-1 (Cak Fajar Ramadhan)',
    laporanDeskripsi: 'Bertugas sebagai pembaca nominasi penganugerahan Duta Berbakat & Duta Persahabatan.',
    laporanBuktiLink: 'laporan_gf_cak_fajar.pdf',
    laporanTanggal: '2026-06-28',
    laporanStatus: 'Disetujui'
  },
  // 8. Selesai & Siap Bayar
  {
    id: 'p8',
    kegiatanId: 'k10',
    kegiatanNama: 'Promosi Destinasi Surabaya Heritage di Tunjungan Plaza',
    tanggal: '2026-06-29',
    lokasi: 'Atrium Tunjungan Plaza 3',
    talentId: 'u11',
    talentNama: 'Ning Amanda Kirana',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'Bank Jatim',
    rekeningTujuan: '001-447788-9 (Ning Amanda Kirana)',
    laporanDeskripsi: 'Menjaga stan resmi shift 2 (pukul 16.00 - 21.30 WIB) dan memberikan kuis interaktif kebudayaan.',
    laporanBuktiLink: 'laporan_tp_amanda.pdf',
    laporanTanggal: '2026-06-29',
    laporanStatus: 'Disetujui'
  },
  // 9. Laporan Menunggu Validasi SDM (Validation Queue 1)
  {
    id: 'p9',
    kegiatanId: 'k1',
    kegiatanNama: 'Penyambutan Tamu Delegasi Sister City Kitakyushu',
    tanggal: '2026-07-02',
    lokasi: 'Balai Kota Surabaya',
    talentId: 'u5',
    talentNama: 'Ning Dania Lestari',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'BCA',
    rekeningTujuan: '822-019283-4 (Ning Dania Lestari)',
    laporanDeskripsi: 'Telah mendampingi Walikota Surabaya menyambut rombongan Kitakyushu. Menyerahkan cinderamata batik khas Surabaya.',
    laporanBuktiLink: 'lpj_kitakyushu_dania.jpg',
    laporanTanggal: '2026-07-02',
    laporanStatus: 'Menunggu Validasi'
  },
  // 10. Laporan Menunggu Validasi SDM (Validation Queue 2)
  {
    id: 'p10',
    kegiatanId: 'k1',
    kegiatanNama: 'Penyambutan Tamu Delegasi Sister City Kitakyushu',
    tanggal: '2026-07-02',
    lokasi: 'Balai Kota Surabaya',
    talentId: 'u15',
    talentNama: 'Ning Diva Maharani',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'BNI',
    rekeningTujuan: '039-485739-2 (Ning Diva Maharani)',
    laporanDeskripsi: 'Menyanyikan lagu selamat datang "Surabaya Oh Surabaya" dan berdialog singkat dengan walikota pendamping.',
    laporanBuktiLink: 'lpj_kitakyushu_diva.jpg',
    laporanTanggal: '2026-07-02',
    laporanStatus: 'Menunggu Validasi'
  },
  // 11. Dikonfirmasi Aktif (Siap Lapor)
  {
    id: 'p11',
    kegiatanId: 'k2',
    kegiatanNama: 'Panduan Tur Museum Sepuluh Nopember',
    tanggal: '2026-07-05',
    lokasi: 'Tugu Pahlawan Surabaya',
    talentId: 'u6',
    talentNama: 'Cak Budi Santoso',
    status: 'Dikonfirmasi',
    honor: 350000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'Mandiri',
    rekeningTujuan: '141-00-192837-2 (Cak Budi Santoso)'
  },
  // 12. Menunggu Konfirmasi Talent
  {
    id: 'p12',
    kegiatanId: 'k1',
    kegiatanNama: 'Penyambutan Tamu Delegasi Sister City Kitakyushu',
    tanggal: '2026-07-02',
    lokasi: 'Balai Kota Surabaya',
    talentId: 'u4',
    talentNama: 'Cak Aditya Pratama',
    status: 'Menunggu Konfirmasi',
    honor: 350000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'Bank Jatim',
    rekeningTujuan: '001-298374-1 (Cak Aditya Pratama)'
  },
  // 13. Dikonfirmasi
  {
    id: 'p13',
    kegiatanId: 'k6',
    kegiatanNama: 'Penyambutan Kemenparekraf di Sanggar Seni Balai Pemuda',
    tanggal: '2026-07-10',
    lokasi: 'Sanggar Seni Balai Pemuda',
    talentId: 'u8',
    talentNama: 'Cak Rian Hidayat',
    status: 'Dikonfirmasi',
    honor: 400000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'Bank Jatim',
    rekeningTujuan: '001-384729-0 (Cak Rian Hidayat)'
  },
  // 14. Menunggu Konfirmasi
  {
    id: 'p14',
    kegiatanId: 'k8',
    kegiatanNama: 'Kampanye Kebersihan Kalimas & Penanaman Mangrove Wonorejo',
    tanggal: '2026-07-12',
    lokasi: 'Ekowisata Mangrove Wonorejo',
    talentId: 'u10',
    talentNama: 'Cak Dani Wijaya',
    status: 'Menunggu Konfirmasi',
    honor: 300000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'BCA',
    rekeningTujuan: '822-192837-5 (Cak Dani Wijaya)'
  },
  // 15. Menunggu Validasi SDM (Validation Queue 3)
  {
    id: 'p15',
    kegiatanId: 'k5',
    kegiatanNama: 'Cak & Ning Goes to School - Edukasi Budaya Remaja',
    tanggal: '2026-06-15',
    lokasi: 'Aula SMAN 2 & SMAN 5 Surabaya',
    talentId: 'u9',
    talentNama: 'Ning Salsabila Putri',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'BCA',
    rekeningTujuan: '822-098765-1 (Ning Salsabila Putri)',
    laporanDeskripsi: 'Memberikan motivasi kepada para siswi mengenai etika berbusana kebaya yang sopan dan anggun.',
    laporanBuktiLink: 'laporan_sekolah_salsa.pdf',
    laporanTanggal: '2026-06-15',
    laporanStatus: 'Menunggu Validasi'
  },
  // 16. Menunggu Validasi SDM (Validation Queue 4)
  {
    id: 'p16',
    kegiatanId: 'k7',
    kegiatanNama: 'Gala Dinner Walikota & Asosiasi Travel Agen Indonesia',
    tanggal: '2026-06-22',
    lokasi: 'Halaman Balai Kota Surabaya',
    talentId: 'u13',
    talentNama: 'Ning Putri Handoyo',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'Mandiri',
    rekeningTujuan: '141-00-998877-3 (Ning Putri Handoyo)',
    laporanDeskripsi: 'Menyajikan jamuan kuliner pecel semanggi dan rujak uleg kepada para pimpinan agen travel.',
    laporanBuktiLink: 'laporan_gala_putri.jpg',
    laporanTanggal: '2026-06-22',
    laporanStatus: 'Menunggu Validasi'
  },
  // 17. Menunggu Validasi SDM (Validation Queue 5)
  {
    id: 'p17',
    kegiatanId: 'k4',
    kegiatanNama: 'Parade Bunga dan Budaya Surabaya Vaganza 2026',
    tanggal: '2026-05-31',
    lokasi: 'Rute Siola Jl. Tunjungan',
    talentId: 'u14',
    talentNama: 'Cak Indra Lesmana',
    status: 'Selesai',
    honor: 400000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'Bank Jatim',
    rekeningTujuan: '001-889900-2 (Cak Indra Lesmana)',
    laporanDeskripsi: 'Memimpin barisan depan kontingen pawai dan menjaga ketertiban formasi kirab budaya.',
    laporanBuktiLink: 'lpj_kirab_indra.pdf',
    laporanTanggal: '2026-05-31',
    laporanStatus: 'Menunggu Validasi'
  },
  // 18. Menunggu Validasi SDM (Validation Queue 6)
  {
    id: 'p18',
    kegiatanId: 'k3',
    kegiatanNama: 'Festival Rujak Uleg Surabaya 2026',
    tanggal: '2026-05-20',
    lokasi: 'Jalan Kembang Jepun',
    talentId: 'u12',
    talentNama: 'Cak Fajar Ramadhan',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'Mandiri',
    rekeningTujuan: '141-00-584739-1 (Cak Fajar Ramadhan)',
    laporanDeskripsi: 'Ikut memandu yel-yel kebanggaan Arek Suroboyo di panggung festival utama.',
    laporanBuktiLink: 'lpj_rujak_fajar.jpg',
    laporanTanggal: '2026-05-20',
    laporanStatus: 'Menunggu Validasi'
  },
  // 19. Menunggu Validasi SDM (Validation Queue 7)
  {
    id: 'p19',
    kegiatanId: 'k11',
    kegiatanNama: 'Grand Final Pemilihan Putera Puteri Pariwisata Daerah',
    tanggal: '2026-06-28',
    lokasi: 'Grand City Convention Hall',
    talentId: 'u17',
    talentNama: 'Ning Berlian Anatasya',
    status: 'Selesai',
    honor: 400000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'BNI',
    rekeningTujuan: '039-112233-4 (Ning Berlian Anatasya)',
    laporanDeskripsi: 'Menerima tamu kehormatan dari Dinas Pariwisata Bali dan Yogyakarta.',
    laporanBuktiLink: 'lpj_tamu_berlian.pdf',
    laporanTanggal: '2026-06-28',
    laporanStatus: 'Menunggu Validasi'
  },
  // 20. Menunggu Validasi SDM (Validation Queue 8)
  {
    id: 'p20',
    kegiatanId: 'k10',
    kegiatanNama: 'Promosi Destinasi Surabaya Heritage di Tunjungan Plaza',
    tanggal: '2026-06-29',
    lokasi: 'Atrium Tunjungan Plaza 3',
    talentId: 'u16',
    talentNama: 'Cak Kevin Surya',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Belum Dibayar',
    bankTujuan: 'BCA',
    rekeningTujuan: '822-554433-2 (Cak Kevin Surya)',
    laporanDeskripsi: 'Mendokumentasikan video reels promosi dan membagikan kartu pos cagar budaya Surabaya.',
    laporanBuktiLink: 'lpj_dokumentasi_kevin.pdf',
    laporanTanggal: '2026-06-29',
    laporanStatus: 'Menunggu Validasi'
  }
];

// ============================================================================
// 7. DATA DUMMY TAMBAHAN (BLOG, MEDIA, NOTIFIKASI, TRANSAKSI, PESAN)
// ============================================================================
export const INITIAL_BLOGS: BlogArticle[] = [
  {
    id: 'b1',
    judul: 'Cak & Ning Surabaya Menyambut Delegasi Budaya ASEAN di Balai Pemuda',
    tanggal: '2026-06-25',
    ringkasan: 'Para Duta Wisata dengan anggun mengenakan pakaian khas Surabaya memandu para delegasi berkeliling kota.',
    isi: 'Surabaya, 25 Juni 2026 - Anggota paguyuban Cak & Ning Surabaya kembali menunjukkan dedikasinya dalam mempromosikan wisata lokal. Sebanyak 6 pasang Cak & Ning bertugas menyambut delegasi budaya tingkat ASEAN yang sedang berkunjung ke Balai Kota dan Balai Pemuda.',
    status: 'Publish'
  },
  {
    id: 'b2',
    judul: 'Persiapan Seleksi Pemilihan Duta Wisata Cak & Ning Surabaya 2026',
    tanggal: '2026-06-10',
    ringkasan: 'Pendaftaran dan diklat awal yang akan segera dibuka bagi pemuda pemudi terbaik Surabaya.',
    isi: 'Pemerintah Kota Surabaya bersama Paguyuban Cak & Ning bersiap menggelar kembali ajang pemilihan duta wisata tertua di Surabaya dengan fokus transformasi digital pariwisata.',
    status: 'Publish'
  },
  {
    id: 'b3',
    judul: 'Revitalisasi Kawasan Kota Tua Surabaya: Magnet Baru Wisatawan Mancanegara',
    tanggal: '2026-06-05',
    ringkasan: 'Ulasan pesona arsitektur kolonial sepanjang Jl. Karet dan Jl. Rajawali bersama Cak Ning.',
    isi: 'Kawasan bersejarah Jembatan Merah kini menjadi magnet wisata baru berkonsep eropa klasik, pecinan, dan arab yang berbaur harmonis.',
    status: 'Publish'
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  { id: 'm1', judul: 'Penyambutan Tamu ASEAN di Balai Pemuda', tipe: 'Foto', tanggal: '2026-06-25', kategori: 'Kegiatan Publik' },
  { id: 'm2', judul: 'Video Profil Duta Wisata Cak & Ning Surabaya', tipe: 'Video', tanggal: '2026-05-10', kategori: 'Profil' },
  { id: 'm3', judul: 'Gladi Resik Festival Rujak Uleg Kembang Jepun', tipe: 'Foto', tanggal: '2026-05-18', kategori: 'Kebudayaan' }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    penerimaRole: 'Talent',
    penerimaUserId: 'u4',
    tipe: 'warning',
    pesan: 'Anda diusulkan oleh Sie SDM untuk bertugas pada "Penyambutan Tamu Delegasi Sister City Kitakyushu" tanggal 2 Juli 2026 di Balai Kota Surabaya. Mohon konfirmasi ketersediaan.',
    tanggal: '10 menit lalu',
    dibaca: false
  },
  {
    id: 'n2',
    penerimaRole: 'SDM',
    tipe: 'info',
    pesan: 'Terdapat 8 laporan penugasan baru dari talent yang menunggu peninjauan dan validasi persetujuan Anda.',
    tanggal: '30 menit lalu',
    dibaca: false
  },
  {
    id: 'n3',
    penerimaRole: 'Bendahara',
    tipe: 'success',
    pesan: 'Sie SDM telah menyetujui 4 laporan LPJ kegiatan. 4 penugasan telah masuk ke antrean pencairan honorarium.',
    tanggal: '1 jam lalu',
    dibaca: false
  },
  {
    id: 'n4',
    penerimaRole: 'Ketua Umum',
    tipe: 'info',
    pesan: 'Laporan bulanan penugasan pariwisata periode Juni 2026 telah rampung dan siap dievaluasi bersama pengurus harian.',
    tanggal: '2 jam lalu',
    dibaca: false
  }
];

export const INITIAL_CONTACTS: ContactMessage[] = [
  {
    id: 'msg1',
    nama: 'Bapak Hendra Gunawan',
    email: 'hendra.gunawan@asitajatim.org',
    subjek: 'Permohonan Kerjasama Duta Wisata Acara Travel Mart 2026',
    pesan: 'Salam hangat dari ASITA Jawa Timur. Kami berencana mengajukan permohonan 3 pasang Cak & Ning untuk mendampingi buyer internasional pada acara Travel Mart di Grand City.',
    tanggal: '2026-06-28'
  }
];

export const INITIAL_TRANSAKSI: Transaksi[] = [
  {
    id: 'tx1',
    tanggal: '2026-06-01',
    tipe: 'Masuk',
    nominal: 50000000,
    kategori: 'Sponsor',
    keterangan: 'Pencairan Dana Sponsorship Tahap I dari Bank Jatim',
    sumberDanAktor: 'Bank Jatim (Sponsor Utama)'
  },
  {
    id: 'tx2',
    tanggal: '2026-06-05',
    tipe: 'Masuk',
    nominal: 75000000,
    kategori: 'Kas Disbudpar',
    keterangan: 'Dana Hibah Operasional Pembinaan Duta Wisata APBD Surabaya 2026',
    sumberDanAktor: 'Disbudporapar Kota Surabaya'
  },
  {
    id: 'tx3',
    tanggal: '2026-06-15',
    tipe: 'Keluar',
    nominal: 3500000,
    kategori: 'Honorarium',
    keterangan: 'Honorarium 10 Talent Kegiatan Cak Ning Goes To School',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)'
  },
  {
    id: 'tx4',
    tanggal: '2026-06-22',
    tipe: 'Keluar',
    nominal: 2800000,
    kategori: 'Honorarium',
    keterangan: 'Honorarium Penyambutan Gala Dinner ASITA di Balai Kota',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)'
  }
];
