import { User, Client, Sponsor, BlogArticle, MediaItem, Kegiatan, Penugasan, Notification, ContactMessage, Transaksi } from './types';

export const INITIAL_USERS: User[] = [
  { id: 'u1', username: 'sdm_diklat', nama: 'Cak Dimas Rahmad', email: 'dimas.sdm@cakning.org', telepon: '081234567801', peran: 'SDM', status: 'Aktif' },
  { id: 'u2', username: 'humas_wisata', nama: 'Ning Syafira Amelia', email: 'syafira.humas@cakning.org', telepon: '081234567802', peran: 'Humas', status: 'Aktif' },
  { id: 'u3', username: 'bendahara_cak', nama: 'Cak Reza Fahlevi', email: 'reza.fin@cakning.org', telepon: '081234567803', peran: 'Bendahara', status: 'Aktif' },
  
  // Talents
  { id: 'u4', username: 'talent_cak_adi', nama: 'Cak Aditya Pratama', email: 'aditya.cak@gmail.com', telepon: '085678912301', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2023', foto: 'Cak Aditya' },
  { id: 'u5', username: 'talent_ning_nia', nama: 'Ning Dania Lestari', email: 'dania.ning@gmail.com', telepon: '085678912302', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2024', foto: 'Ning Dania' },
  { id: 'u6', username: 'talent_cak_budi', nama: 'Cak Budi Santoso', email: 'budi.cak@gmail.com', telepon: '085678912303', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2022', foto: 'Cak Budi' },
  { id: 'u7', username: 'talent_ning_citra', nama: 'Ning Citra Handayani', email: 'citra.ning@gmail.com', telepon: '085678912304', peran: 'Talent', status: 'Nonaktif', angkatan: 'Cak Ning 2021', foto: 'Ning Citra' },
  { id: 'u8', username: 'talent_cak_rian', nama: 'Cak Rian Hidayat', email: 'rian.cak@gmail.com', telepon: '085678912305', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2023', foto: 'Cak Rian' },
  { id: 'u9', username: 'talent_ning_salsa', nama: 'Ning Salsabila Putri', email: 'salsa.ning@gmail.com', telepon: '085678912306', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2024', foto: 'Ning Salsa' },
  { id: 'u10', username: 'talent_cak_dani', nama: 'Cak Dani Wijaya', email: 'dani.cak@gmail.com', telepon: '085678912307', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2022', foto: 'Cak Dani' },
  { id: 'u11', username: 'talent_ning_amanda', nama: 'Ning Amanda Kirana', email: 'amanda.k@gmail.com', telepon: '085678912308', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2023', foto: 'Ning Amanda' },
  { id: 'u12', username: 'talent_cak_fajar', nama: 'Cak Fajar Ramadhan', email: 'fajar.r@gmail.com', telepon: '085678912309', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2024', foto: 'Cak Fajar' },
  { id: 'u13', username: 'talent_ning_putri', nama: 'Ning Putri Handoyo', email: 'putri.h@gmail.com', telepon: '085678912310', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2022', foto: 'Ning Putri' },
  { id: 'u14', username: 'talent_cak_indra', nama: 'Cak Indra Lesmana', email: 'indra.l@gmail.com', telepon: '085678912311', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2023', foto: 'Cak Indra' },
  { id: 'u15', username: 'talent_ning_diva', nama: 'Ning Diva Maharani', email: 'diva.m@gmail.com', telepon: '085678912312', peran: 'Talent', status: 'Aktif', angkatan: 'Cak Ning 2024', foto: 'Ning Diva' },
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'c1',
    namaInstansi: 'Dinas Kebudayaan dan Pariwisata Kota Surabaya',
    kontakPerson: 'Ibu Endang Sriwati',
    telepon: '031-5345678',
    status: 'Aktif',
    catatanInteraksi: [
      'Hubungi tanggal 20 Juni 2026: Pembahasan penugasan 4 talent untuk penyambutan Walikota.',
      'Hubungi tanggal 25 Juni 2026: Konfirmasi jadwal gladi resik di Balai Pemuda.'
    ]
  },
  {
    id: 'c2',
    namaInstansi: 'PT Grand City Surabaya',
    kontakPerson: 'Bapak Hermawan',
    telepon: '081122334455',
    status: 'Aktif',
    catatanInteraksi: [
      'Hubungi tanggal 15 Juni 2026: Pengajuan audiensi kerjasama pameran UMKM.'
    ]
  },
  {
    id: 'c3',
    namaInstansi: 'Hotel Bumi Surabaya',
    kontakPerson: 'Mbak Rina Amelia',
    telepon: '031-5678123',
    status: 'Aktif',
    catatanInteraksi: []
  },
  {
    id: 'c4',
    namaInstansi: 'Humas Pemerintah Provinsi Jawa Timur',
    kontakPerson: 'Bapak Dr. Gatot Subroto',
    telepon: '031-8291029',
    status: 'Aktif',
    catatanInteraksi: [
      'Hubungi tanggal 18 Juni 2026: Permintaan koordinasi 2 pasang Cak Ning untuk pembukaan Jatim Fair.'
    ]
  },
  {
    id: 'c5',
    namaInstansi: 'Museum House of Sampoerna',
    kontakPerson: 'Ibu Listiawati',
    telepon: '031-3539000',
    status: 'Aktif',
    catatanInteraksi: [
      'Hubungi tanggal 10 Juni 2026: Kerjasama program tur sejarah Surabaya Heritage Track.'
    ]
  },
  {
    id: 'c6',
    namaInstansi: 'Pakuwon Mall Group Surabaya',
    kontakPerson: 'Mbak Caroline Jane',
    telepon: '081288776655',
    status: 'Aktif',
    catatanInteraksi: [
      'Hubungi tanggal 22 Juni 2026: Pembahasan pengisian pemandu busana adat pada acara Surabaya Fashion Parade.'
    ]
  },
  {
    id: 'c7',
    namaInstansi: 'PT Ciputra Development Tbk',
    kontakPerson: 'Bapak Rudi Setyawan',
    telepon: '081299881122',
    status: 'Aktif',
    catatanInteraksi: [
      'Hubungi tanggal 26 Juni 2026: Undangan pameran seni rupa lokal di CitraLand.'
    ]
  },
  {
    id: 'c8',
    namaInstansi: 'Dinas Koperasi dan UMKM Jawa Timur',
    kontakPerson: 'Ibu Hartati Mulyani',
    telepon: '031-8415622',
    status: 'Aktif',
    catatanInteraksi: []
  },
  {
    id: 'c9',
    namaInstansi: 'Universitas Airlangga (UNAIR)',
    kontakPerson: 'Dr. Soni Wijaya',
    telepon: '031-5914025',
    status: 'Aktif',
    catatanInteraksi: [
      'Hubungi tanggal 24 Juni 2026: Koordinasi penyambutan delegasi profesor dari Australia.'
    ]
  },
  {
    id: 'c10',
    namaInstansi: 'Hotel Shangri-La Surabaya',
    kontakPerson: 'Mbak Fiona Olivia',
    telepon: '031-5661550',
    status: 'Aktif',
    catatanInteraksi: []
  },
  {
    id: 'c11',
    namaInstansi: 'Dinas Pemuda dan Olahraga (Dispora) Surabaya',
    kontakPerson: 'Bapak Choirul Anam',
    telepon: '031-5312345',
    status: 'Aktif',
    catatanInteraksi: [
      'Hubungi tanggal 27 Juni 2026: Persiapan duta penjemputan atlet berprestasi Jawa Timur.'
    ]
  },
  {
    id: 'c12',
    namaInstansi: 'Tunjungan Plaza Mall (Pakuwon Group)',
    kontakPerson: 'Bapak Raymond Hartono',
    telepon: '081344556677',
    status: 'Aktif',
    catatanInteraksi: []
  },
];

export const INITIAL_SPONSORS: Sponsor[] = [
  { id: 's1', namaSponsor: 'Bank Jatim', kontakPerson: 'Bapak Agus Setiawan', jenisSponsorship: 'Utama', telepon: '081233445566' },
  { id: 's2', namaSponsor: 'Teh Botol Sosro', kontakPerson: 'Ibu Maya Lestari', jenisSponsorship: 'Pendukung', telepon: '085699887766' },
  { id: 's3', namaSponsor: 'Radio Suara Surabaya', kontakPerson: 'Bapak Yudianto', jenisSponsorship: 'Media Partner', telepon: '031-99223344' },
  { id: 's4', namaSponsor: 'Kopi Kapal Api', kontakPerson: 'Bapak Edwin Pratama', jenisSponsorship: 'Utama', telepon: '08113425672' },
  { id: 's5', namaSponsor: 'Semen Indonesia Group (SIG)', kontakPerson: 'Ibu Fitria Rahmawati', jenisSponsorship: 'Pendukung', telepon: '08119876543' },
  { id: 's6', namaSponsor: 'Viva Cosmetics Surabaya', kontakPerson: 'Bapak Henry Wijaya', jenisSponsorship: 'Pendukung', telepon: '031-8412345' },
  { id: 's7', namaSponsor: 'Indofood Sukses Makmur', kontakPerson: 'Ibu Ratna Kumala', jenisSponsorship: 'Pendukung', telepon: '08123456711' },
  { id: 's8', namaSponsor: 'PT HM Sampoerna', kontakPerson: 'Bapak Bambang Sujatmiko', jenisSponsorship: 'Utama', telepon: '031-3531617' },
  { id: 's9', namaSponsor: 'Jawa Pos Media Group', kontakPerson: 'Mbak Linda Rosita', jenisSponsorship: 'Media Partner', telepon: '031-8202000' },
  { id: 's10', namaSponsor: 'Grab Indonesia (Jawa Timur)', kontakPerson: 'Bapak Dimas Anggara', jenisSponsorship: 'Pendukung', telepon: '081122446688' },
];

export const INITIAL_BLOGS: BlogArticle[] = [
  {
    id: 'b1',
    judul: 'Cak & Ning Surabaya Menyambut Delegasi Budaya ASEAN di Balai Pemuda',
    tanggal: '2026-06-25',
    ringkasan: 'Para Duta Wisata dengan anggun mengenakan pakaian khas Surabaya memandu para delegasi berkeliling kota.',
    isi: 'Surabaya, 25 Juni 2026 - Anggota paguyuban Cak & Ning Surabaya kembali menunjukkan dedikasinya dalam mempromosikan wisata lokal. Kali ini, sebanyak 6 pasang Cak & Ning bertugas menyambut delegasi budaya tingkat ASEAN yang sedang berkunjung ke Balai Kota Surabaya dan Balai Pemuda. Dengan busana tradisional Cak (jas tutup beskap putih) dan Ning (kebaya dengan kerudung khas selendang), mereka mengenalkan keunikan sejarah serta kuliner khas Surabaya kepada tamu internasional.',
    status: 'Publish'
  },
  {
    id: 'b2',
    judul: 'Persiapan Seleksi Pemilihan Duta Wisata Cak & Ning Surabaya 2026',
    tanggal: '2026-06-10',
    ringkasan: 'Persiapan pendaftaran dan diklat awal yang akan segera dibuka bagi pemuda pemudi Surabaya.',
    isi: 'Pemerintah Kota Surabaya bersama Paguyuban Cak & Ning Surabaya bersiap menggelar kembali ajang pemilihan duta wisata tertua di Surabaya. Pemilihan tahun ini akan menitikberatkan pada kesiapan pemuda dalam mendukung transformasi digital pariwisata Kota Surabaya. Pendaftaran akan dibuka pada pertengahan bulan depan secara online.',
    status: 'Publish'
  },
  {
    id: 'b3',
    judul: 'Draft: Evaluasi Kinerja Program Kerja Bakti Bersih Kalimas',
    tanggal: '2026-06-27',
    ringkasan: 'Dokumen internal persiapan rilis artikel gerakan sadar lingkungan bantaran Kalimas.',
    isi: 'Aspek peduli lingkungan merupakan pilar penting paguyuban. Bersama warga, Cak & Ning merancang program berkelanjutan untuk membersihkan sampah di aliran sungai Kalimas serta menata bantaran agar asri.',
    status: 'Draft'
  },
  {
    id: 'b4',
    judul: 'Pemberian Materi Kebudayaan Lokal di Sekolah Menengah Kota Surabaya',
    tanggal: '2026-06-18',
    ringkasan: 'Program Cak Ning Goes To School sukses mengenalkan kekayaan sejarah Surabaya ke generasi Z.',
    isi: 'Surabaya - Paguyuban Cak & Ning sukses menggelar roadshow sosialisasi budaya di 5 sekolah menengah atas terkemuka. Dalam kegiatan ini, para siswa diajak berdiskusi interaktif mengenai bahasa khas Suroboyoan, pakaian adat, dan pelestarian cagar budaya di sekeliling mereka.',
    status: 'Publish'
  },
  {
    id: 'b5',
    judul: 'Eksotisme Wisata Kota Tua Surabaya yang Mulai Menggeliat',
    tanggal: '2026-06-05',
    ringkasan: 'Ulasan pesona revitalisasi arsitektur kolonial sepanjang Jl. Karet dan Jl. Rajawali bersama Cak Ning.',
    isi: 'Surabaya terus bersolek. Kawasan bersejarah Jembatan Merah dan sekitarnya kini menjadi magnet wisata baru dengan gaya Eropa Klasik, Pecinan, dan Arab yang berbaur harmonis. Cak & Ning Surabaya turut aktif mengedukasi wisatawan melalui program Heritage Tour.',
    status: 'Publish'
  },
  {
    id: 'b6',
    judul: 'Kunjungan Paguyuban Cak & Ning Surabaya ke Panti Asuhan Don Bosco',
    tanggal: '2026-06-01',
    ringkasan: 'Program kepedulian sosial berupa pembagian sembako dan kelas inspirasi cita-cita bagi adik-adik panti.',
    isi: 'Paguyuban Cak & Ning Surabaya menggelar program bakti sosial bertajuk "Cak Ning Peduli". Kegiatan ini melibatkan puluhan pengurus dan anggota aktif yang berbaur bersama anak-anak panti asuhan, memberikan motivasi belajar, dan mendonasikan perlengkapan sekolah hasil gotong royong.',
    status: 'Publish'
  },
  {
    id: 'b7',
    judul: 'Draft: Panduan Mengenakan Hijab Selendang khas Ning Surabaya',
    tanggal: '2026-06-28',
    ringkasan: 'Dokumen penyusunan modul tutorial resmi bagi calon finalis pemilihan Cak & Ning Surabaya.',
    isi: 'Kebun busana Ning Surabaya memiliki karakteristik istimewa berupa penutup kepala menggunakan kerudung selendang sutra bersulam renda yang disampirkan anggun. Panduan ini menjelaskan detail langkah melipat dan menyematkannya peniti dengan aman.',
    status: 'Draft'
  },
  {
    id: 'b8',
    judul: 'Sinergi Cak & Ning Bersama Karang Taruna Kelola Wisata Kampung Semanggi',
    tanggal: '2026-05-25',
    ringkasan: 'Mengembangkan potensi wisata kuliner pecel semanggi instan di daerah Benowo Surabaya.',
    isi: 'Kuliner legendaris pecel semanggi merupakan pusaka kuliner asli Surabaya yang terus dilestarikan. Paguyuban mendampingi para perajin lokal Benowo dalam hal inovasi kemasan steril agar bisa menjadi oleh-oleh premium.',
    status: 'Publish'
  },
  {
    id: 'b9',
    judul: 'Menapak Sejarah Pertempuran Surabaya di Gedung Internatio',
    tanggal: '2026-05-12',
    ringkasan: 'Menelusuri jejak heroisme arek-arek Suroboyo di sekitar Jembatan Merah bersama pemandu Cak Ning.',
    isi: 'Gedung Internatio berdiri megah sebagai saksi bisu tewasnya AWS Mallaby yang memicu pertempuran dahsyat 10 November. Melalui tur edukasi sejarah, Cak & Ning mengajak khalayak menghargai perjuangan para pahlawan bangsa.',
    status: 'Publish'
  },
  {
    id: 'b10',
    judul: 'Paguyuban Gelar Pelatihan Public Speaking dan Diplomatic Skill',
    tanggal: '2026-04-20',
    ringkasan: 'Upaya meningkatkan kapasitas duta wisata agar kompeten dalam mempromosikan pariwisata global.',
    isi: 'Menjawab tantangan globalisasi, para anggota paguyuban dibekali materi retorika, etika keprotokolan, dan bahasa Inggris diplomatik secara intensif yang dibimbing langsung oleh akademisi berpengalaman.',
    status: 'Publish'
  },
];

export const INITIAL_MEDIA: MediaItem[] = [
  { id: 'm1', judul: 'Penyambutan Tamu ASEAN di Balai Pemuda', tipe: 'Foto', tanggal: '2026-06-25', kategori: 'Kegiatan Publik' },
  { id: 'm2', judul: 'Video Profil Cak & Ning Surabaya 2025', tipe: 'Video', tanggal: '2025-08-12', kategori: 'Profil' },
  { id: 'm3', judul: 'Gladi Resik Festival Rujak Uleg', tipe: 'Foto', tanggal: '2026-05-18', kategori: 'Kebudayaan' },
  { id: 'm4', judul: 'Foto Bersama Pengurus Paguyuban 2025/2026', tipe: 'Foto', tanggal: '2025-10-01', kategori: 'Internal' },
  { id: 'm5', judul: 'Cak & Ning Goes to School - SMAN 1 Surabaya', tipe: 'Foto', tanggal: '2026-02-14', kategori: 'Sosialisasi' },
  { id: 'm6', judul: 'Teaser Pemilihan Cak & Ning Surabaya 2026', tipe: 'Video', tanggal: '2026-06-15', kategori: 'Promosi' },
  { id: 'm7', judul: 'Dokumentasi Surabaya Vaganza Parade Bunga', tipe: 'Foto', tanggal: '2026-05-31', kategori: 'Kebudayaan' },
  { id: 'm8', judul: 'Penerimaan Penghargaan Paguyuban Duta Wisata Berprestasi', tipe: 'Foto', tanggal: '2026-04-10', kategori: 'Prestasi' },
  { id: 'm9', judul: 'Aksi Bersih Sampah Kalimas Surabaya', tipe: 'Foto', tanggal: '2026-06-12', kategori: 'Sosial Lingkungan' },
  { id: 'm10', judul: 'Video Liputan Pelatihan Protokoler Duta Wisata', tipe: 'Video', tanggal: '2026-05-05', kategori: 'Pendidikan' },
  { id: 'm11', judul: 'Cinderamata untuk Walikota Kitakyushu', tipe: 'Foto', tanggal: '2026-07-02', kategori: 'Kegiatan Publik' },
  { id: 'm12', judul: 'Gala Dinner ASITA di Balai Kota', tipe: 'Foto', tanggal: '2026-06-22', kategori: 'Kegiatan Publik' },
  { id: 'm13', judul: 'Penyuluhan Kampung Semanggi Kuliner', tipe: 'Foto', tanggal: '2026-05-25', kategori: 'Pengabdian' },
  { id: 'm14', judul: 'Penerimaan Kunjungan Duta Wisata Kaltim', tipe: 'Foto', tanggal: '2026-03-20', kategori: 'Internal' },
  { id: 'm15', judul: 'Podcast Budaya Arek Bersama Radio SS', tipe: 'Video', tanggal: '2026-06-10', kategori: 'Promosi' },
  { id: 'm16', judul: 'Bakti Sosial Panti Asuhan Don Bosco', tipe: 'Foto', tanggal: '2026-06-01', kategori: 'Pengabdian' },
];

export const INITIAL_KEGIATAN: Kegiatan[] = [
  {
    id: 'k1',
    namaKegiatan: 'Penyambutan Tamu Delegasi Sister City Kitakyushu',
    tanggal: '2026-07-02',
    lokasi: 'Balai Kota Surabaya',
    deskripsi: 'Menyambut rombongan delegasi dari kota kembar Kitakyushu, Jepang. Menjelaskan singkat sejarah balai kota dan memberikan cinderamata.',
    status: 'Butuh Plotting'
  },
  {
    id: 'k2',
    namaKegiatan: 'Panduan Tur Museum Sepuluh Nopember',
    tanggal: '2026-07-05',
    lokasi: 'Tugu Pahlawan Surabaya',
    deskripsi: 'Menjadi pemandu wisata khusus rombongan mahasiswa asing Universitas Airlangga.',
    status: 'Butuh Plotting'
  },
  {
    id: 'k3',
    namaKegiatan: 'Festival Rujak Uleg Surabaya 2026',
    tanggal: '2026-05-20',
    lokasi: 'Jalan Kembang Jepun',
    deskripsi: 'Mengikuti prosesi uleg rujak bersama Walikota dan pejabat daerah serta berinteraksi dengan wisatawan.',
    status: 'Selesai'
  },
  {
    id: 'k4',
    namaKegiatan: 'Parade Bunga dan Budaya Surabaya Vaganza',
    tanggal: '2026-05-31',
    lokasi: 'Jalan Tunjungan - Balai Pemuda',
    deskripsi: 'Berada di atas mobil hias utama Paguyuban Cak & Ning menyapa seluruh warga Surabaya.',
    status: 'Selesai'
  },
  {
    id: 'k5',
    namaKegiatan: 'Cak & Ning Goes to School - Edukasi Budaya Remaja',
    tanggal: '2026-06-15',
    lokasi: 'SMAN 2 Surabaya & SMAN 5 Surabaya',
    deskripsi: 'Memberikan pengenalan mengenai pentingnya pelestarian kebudayaan lokal Arek Suroboyo dan sosialisasi bahaya kenakalan remaja.',
    status: 'Selesai'
  },
  {
    id: 'k6',
    namaKegiatan: 'Penyambutan Kemenparekraf di Sanggar Seni Balai Pemuda',
    tanggal: '2026-07-10',
    lokasi: 'Sanggar Seni Balai Pemuda',
    deskripsi: 'Menampilkan tari penyambutan tradisional Surabaya (Tari Remo) serta mendampingi Menteri Pariwisata dan Ekonomi Kreatif.',
    status: 'Butuh Plotting'
  },
  {
    id: 'k7',
    namaKegiatan: 'Gala Dinner Walikota & Asosiasi Travel Agen Indonesia',
    tanggal: '2026-06-22',
    lokasi: 'Halaman Balai Kota Surabaya',
    deskripsi: 'Menghadiri jamuan makan malam resmi, menyambut pengurus ASITA se-Indonesia, serta mempromosikan paket wisata Surabaya Heritage.',
    status: 'Selesai'
  },
  {
    id: 'k8',
    namaKegiatan: 'Kampanye Kebersihan Kalimas & Penanaman Mangrove Wonorejo',
    tanggal: '2026-07-12',
    lokasi: 'Ekowisata Mangrove Wonorejo',
    deskripsi: 'Aksi sosial menanam 500 bibit pohon mangrove bersama kelompok pemuda dan Dinas Lingkungan Hidup Kota Surabaya.',
    status: 'Butuh Plotting'
  },
  {
    id: 'k9',
    namaKegiatan: 'Penyambutan Kunjungan Kerja Duta Besar Australia',
    tanggal: '2026-07-15',
    lokasi: 'Gedung Rektorat Universitas Airlangga',
    deskripsi: 'Pendampingan kunjungan akademik Duta Besar Australia dalam rangka pembukaan program riset kerjasama kesehatan.',
    status: 'Butuh Plotting'
  },
  {
    id: 'k10',
    namaKegiatan: 'Promosi Destinasi Surabaya Heritage di Tunjungan Plaza',
    tanggal: '2026-06-29',
    lokasi: 'Atrium Tunjungan Plaza 3',
    deskripsi: 'Menjaga stan pariwisata resmi dan memberikan konsultasi perjalanan bagi pengunjung mall lokal maupun internasional.',
    status: 'Sedang Berjalan'
  },
  {
    id: 'k11',
    namaKegiatan: 'Grand Final Pemilihan Putera Puteri Pariwisata Daerah',
    tanggal: '2026-06-28',
    lokasi: 'Grand City Convention Hall',
    deskripsi: 'Menghadiri panggung kehormatan dan memberikan selamat kepada pemenang terpilih.',
    status: 'Selesai'
  },
  {
    id: 'k12',
    namaKegiatan: 'Penyambutan Kontingen Atlet PON Jawa Timur',
    tanggal: '2026-07-20',
    lokasi: 'Bandara Juanda Surabaya (T1)',
    deskripsi: 'Penyematan kalung bunga penyambutan bagi kontingen olahraga yang baru tiba membawa pulang medali emas.',
    status: 'Butuh Plotting'
  },
];

export const INITIAL_PENUGASAN: Penugasan[] = [
  // Completed assignments (with approved reports)
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
    buktiBayar: 'bukti_transfer_p1.jpg',
    laporanDeskripsi: 'Telah mengikuti seluruh rangkaian uleg rujak di Kembang Jepun dari pukul 08:00 hingga selesai.',
    laporanBuktiLink: 'laporan_rujak_uleg_cak_adi.pdf',
    laporanTanggal: '2026-05-20',
    laporanStatus: 'Disetujui'
  },
  {
    id: 'p2',
    kegiatanId: 'k4',
    kegiatanNama: 'Parade Bunga dan Budaya Surabaya Vaganza',
    tanggal: '2026-05-31',
    lokasi: 'Jalan Tunjungan - Balai Pemuda',
    talentId: 'u5',
    talentNama: 'Ning Dania Lestari',
    status: 'Selesai',
    honor: 400000,
    statusBayar: 'Lunas',
    tanggalBayar: '2026-06-02',
    buktiBayar: 'bukti_transfer_p2.jpg',
    laporanDeskripsi: 'Mengikuti iring-iringan mobil hias sejak start di Siola hingga finish di Balai Pemuda.',
    laporanBuktiLink: 'bukti_hadir_vaganza.jpg',
    laporanTanggal: '2026-05-31',
    laporanStatus: 'Disetujui'
  },

  // TESTING REPORT UPLOAD FLOW FOR TALENT CAK ADITYA (u4)
  // Let's add multiple tasks that are "Dikonfirmasi" (confirmed/completed on field) but do NOT have reports uploaded yet!
  // This allows Cak Aditya to test uploading reports as requested.
  {
    id: 'p12',
    kegiatanId: 'k10',
    kegiatanNama: 'Promosi Destinasi Surabaya Heritage di Tunjungan Plaza',
    tanggal: '2026-06-29',
    lokasi: 'Atrium Tunjungan Plaza 3',
    talentId: 'u4',
    talentNama: 'Cak Aditya Pratama',
    status: 'Dikonfirmasi', // Ready to submit report!
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p13',
    kegiatanId: 'k11',
    kegiatanNama: 'Grand Final Pemilihan Putera Puteri Pariwisata Daerah',
    tanggal: '2026-06-28',
    lokasi: 'Grand City Convention Hall',
    talentId: 'u4',
    talentNama: 'Cak Aditya Pratama',
    status: 'Dikonfirmasi', // Ready to submit report!
    statusBayar: 'Belum Dibayar'
  },

  // TESTING REPORT UPLOAD FLOW FOR TALENT NING DANIA (u5)
  {
    id: 'p4',
    kegiatanId: 'k1',
    kegiatanNama: 'Penyambutan Tamu Delegasi Sister City Kitakyushu',
    tanggal: '2026-07-02',
    lokasi: 'Balai Kota Surabaya',
    talentId: 'u5',
    talentNama: 'Ning Dania Lestari',
    status: 'Dikonfirmasi', // Ready to submit report!
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p16',
    kegiatanId: 'k10',
    kegiatanNama: 'Promosi Destinasi Surabaya Heritage di Tunjungan Plaza',
    tanggal: '2026-06-29',
    lokasi: 'Atrium Tunjungan Plaza 3',
    talentId: 'u5',
    talentNama: 'Ning Dania Lestari',
    status: 'Dikonfirmasi', // Ready to submit report!
    statusBayar: 'Belum Dibayar'
  },

  // TESTING CONFIRM / DECLINE ASSIGNMENT FLOW FOR TALENT CAK ADITYA (u4)
  // Multiple tasks that are "Menunggu Konfirmasi" so Cak Aditya can test accept/reject flows.
  {
    id: 'p3',
    kegiatanId: 'k1',
    kegiatanNama: 'Penyambutan Tamu Delegasi Sister City Kitakyushu',
    tanggal: '2026-07-02',
    lokasi: 'Balai Kota Surabaya',
    talentId: 'u4',
    talentNama: 'Cak Aditya Pratama',
    status: 'Menunggu Konfirmasi',
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p11',
    kegiatanId: 'k2',
    kegiatanNama: 'Panduan Tur Museum Sepuluh Nopember',
    tanggal: '2026-07-05',
    lokasi: 'Tugu Pahlawan Surabaya',
    talentId: 'u4',
    talentNama: 'Cak Aditya Pratama',
    status: 'Menunggu Konfirmasi',
    statusBayar: 'Belum Dibayar'
  },

  // TESTING CONFIRM / DECLINE ASSIGNMENT FLOW FOR TALENT NING DANIA (u5)
  {
    id: 'p14',
    kegiatanId: 'k6',
    kegiatanNama: 'Penyambutan Kemenparekraf di Sanggar Seni Balai Pemuda',
    tanggal: '2026-07-10',
    lokasi: 'Sanggar Seni Balai Pemuda',
    talentId: 'u5',
    talentNama: 'Ning Dania Lestari',
    status: 'Menunggu Konfirmasi',
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p15',
    kegiatanId: 'k8',
    kegiatanNama: 'Kampanye Kebersihan Kalimas & Penanaman Mangrove Wonorejo',
    tanggal: '2026-07-12',
    lokasi: 'Ekowisata Mangrove Wonorejo',
    talentId: 'u5',
    talentNama: 'Ning Dania Lestari',
    status: 'Menunggu Konfirmasi',
    statusBayar: 'Belum Dibayar'
  },

  // Selesai status data for others
  {
    id: 'p5',
    kegiatanId: 'k5',
    kegiatanNama: 'Cak & Ning Goes to School - Edukasi Budaya Remaja',
    tanggal: '2026-06-15',
    lokasi: 'SMAN 2 Surabaya & SMAN 5 Surabaya',
    talentId: 'u4',
    talentNama: 'Cak Aditya Pratama',
    status: 'Selesai',
    honor: 300000,
    statusBayar: 'Lunas',
    tanggalBayar: '2026-06-17',
    buktiBayar: 'transfer_k5_u4.png',
    laporanDeskripsi: 'Mengisi sesi pemateri Kebudayaan Surabaya dan berinteraksi aktif dengan OSIS SMAN 2 Surabaya.',
    laporanBuktiLink: 'laporan_sekolah_adi.pdf',
    laporanTanggal: '2026-06-15',
    laporanStatus: 'Disetujui'
  },
  {
    id: 'p6',
    kegiatanId: 'k5',
    kegiatanNama: 'Cak & Ning Goes to School - Edukasi Budaya Remaja',
    tanggal: '2026-06-15',
    lokasi: 'SMAN 2 Surabaya & SMAN 5 Surabaya',
    talentId: 'u5',
    talentNama: 'Ning Dania Lestari',
    status: 'Selesai',
    honor: 300000,
    statusBayar: 'Lunas',
    tanggalBayar: '2026-06-17',
    buktiBayar: 'transfer_k5_u5.png',
    laporanDeskripsi: 'Memberikan materi tata krama khas Arek Suroboyo ke siswi SMAN 5 Surabaya.',
    laporanBuktiLink: 'bukti_laporan_dania.pdf',
    laporanTanggal: '2026-06-15',
    laporanStatus: 'Disetujui'
  },
  {
    id: 'p7',
    kegiatanId: 'k7',
    kegiatanNama: 'Gala Dinner Walikota & Asosiasi Travel Agen Indonesia',
    tanggal: '2026-06-22',
    lokasi: 'Halaman Balai Kota Surabaya',
    talentId: 'u6',
    talentNama: 'Cak Budi Santoso',
    status: 'Selesai',
    honor: 500000,
    statusBayar: 'Belum Dibayar',
    laporanDeskripsi: 'Menyambut delegasi ASITA, memandu ke meja VIP, dan berfoto bersama Walikota.',
    laporanBuktiLink: 'bukti_hadir_gala.jpg',
    laporanTanggal: '2026-06-22',
    laporanStatus: 'Disetujui'
  },
  {
    id: 'p8',
    kegiatanId: 'k7',
    kegiatanNama: 'Gala Dinner Walikota & Asosiasi Travel Agen Indonesia',
    tanggal: '2026-06-22',
    lokasi: 'Halaman Balai Kota Surabaya',
    talentId: 'u5',
    talentNama: 'Ning Dania Lestari',
    status: 'Selesai',
    honor: 500000,
    statusBayar: 'Belum Dibayar',
    laporanDeskripsi: 'Menyambut rombongan dinas luar kota, membagikan cinderamata batik Surabaya khas Sememi.',
    laporanBuktiLink: 'gala_dinner_dania.png',
    laporanTanggal: '2026-06-22',
    laporanStatus: 'Disetujui'
  },
  {
    id: 'p9',
    kegiatanId: 'k1',
    kegiatanNama: 'Penyambutan Tamu Delegasi Sister City Kitakyushu',
    tanggal: '2026-07-02',
    lokasi: 'Balai Kota Surabaya',
    talentId: 'u6',
    talentNama: 'Cak Budi Santoso',
    status: 'Menunggu Konfirmasi',
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p10',
    kegiatanId: 'k2',
    kegiatanNama: 'Panduan Tur Museum Sepuluh Nopember',
    tanggal: '2026-07-05',
    lokasi: 'Tugu Pahlawan Surabaya',
    talentId: 'u8',
    talentNama: 'Cak Rian Hidayat',
    status: 'Dikonfirmasi',
    statusBayar: 'Belum Dibayar'
  },

  // Extra assignments to reach ~25 items and enrich the layout!
  {
    id: 'p17',
    kegiatanId: 'k9',
    kegiatanNama: 'Penyambutan Kunjungan Kerja Duta Besar Australia',
    tanggal: '2026-07-15',
    lokasi: 'Gedung Rektorat Universitas Airlangga',
    talentId: 'u9',
    talentNama: 'Ning Salsabila Putri',
    status: 'Menunggu Konfirmasi',
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p18',
    kegiatanId: 'k9',
    kegiatanNama: 'Penyambutan Kunjungan Kerja Duta Besar Australia',
    tanggal: '2026-07-15',
    lokasi: 'Gedung Rektorat Universitas Airlangga',
    talentId: 'u10',
    talentNama: 'Cak Dani Wijaya',
    status: 'Menunggu Konfirmasi',
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p19',
    kegiatanId: 'k12',
    kegiatanNama: 'Penyambutan Kontingen Atlet PON Jawa Timur',
    tanggal: '2026-07-20',
    lokasi: 'Bandara Juanda Surabaya (T1)',
    talentId: 'u11',
    talentNama: 'Ning Amanda Kirana',
    status: 'Menunggu Konfirmasi',
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p20',
    kegiatanId: 'k12',
    kegiatanNama: 'Penyambutan Kontingen Atlet PON Jawa Timur',
    tanggal: '2026-07-20',
    lokasi: 'Bandara Juanda Surabaya (T1)',
    talentId: 'u12',
    talentNama: 'Cak Fajar Ramadhan',
    status: 'Menunggu Konfirmasi',
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p21',
    kegiatanId: 'k2',
    kegiatanNama: 'Panduan Tur Museum Sepuluh Nopember',
    tanggal: '2026-07-05',
    lokasi: 'Tugu Pahlawan Surabaya',
    talentId: 'u13',
    talentNama: 'Ning Putri Handoyo',
    status: 'Dikonfirmasi',
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p22',
    kegiatanId: 'k6',
    kegiatanNama: 'Penyambutan Kemenparekraf di Sanggar Seni Balai Pemuda',
    tanggal: '2026-07-10',
    lokasi: 'Sanggar Seni Balai Pemuda',
    talentId: 'u14',
    talentNama: 'Cak Indra Lesmana',
    status: 'Dikonfirmasi',
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p23',
    kegiatanId: 'k8',
    kegiatanNama: 'Kampanye Kebersihan Kalimas & Penanaman Mangrove Wonorejo',
    tanggal: '2026-07-12',
    lokasi: 'Ekowisata Mangrove Wonorejo',
    talentId: 'u15',
    talentNama: 'Ning Diva Maharani',
    status: 'Dikonfirmasi',
    statusBayar: 'Belum Dibayar'
  },
  {
    id: 'p24',
    kegiatanId: 'k3',
    kegiatanNama: 'Festival Rujak Uleg Surabaya 2026',
    tanggal: '2026-05-20',
    lokasi: 'Jalan Kembang Jepun',
    talentId: 'u6',
    talentNama: 'Cak Budi Santoso',
    status: 'Selesai',
    honor: 350000,
    statusBayar: 'Lunas',
    tanggalBayar: '2026-05-22',
    buktiBayar: 'bukti_transfer_p24.jpg',
    laporanDeskripsi: 'Ikut memeriahkan meja rujak nomor 10 dampingi tamu VIP dari dinas pariwisata luar daerah.',
    laporanBuktiLink: 'laporan_rujak_budi.pdf',
    laporanTanggal: '2026-05-20',
    laporanStatus: 'Disetujui'
  },
  {
    id: 'p25',
    kegiatanId: 'k4',
    kegiatanNama: 'Parade Bunga dan Budaya Surabaya Vaganza',
    tanggal: '2026-05-31',
    lokasi: 'Jalan Tunjungan - Balai Pemuda',
    talentId: 'u8',
    talentNama: 'Cak Rian Hidayat',
    status: 'Selesai',
    honor: 400000,
    statusBayar: 'Lunas',
    tanggalBayar: '2026-06-02',
    buktiBayar: 'bukti_transfer_p25.jpg',
    laporanDeskripsi: 'Membagikan pamflet brosur kalender wisata Surabaya sepanjang parade Jl. Tunjungan.',
    laporanBuktiLink: 'parade_rian.png',
    laporanTanggal: '2026-05-31',
    laporanStatus: 'Disetujui'
  },
  {
    id: 'p26',
    kegiatanId: 'k7',
    kegiatanNama: 'Gala Dinner Walikota & Asosiasi Travel Agen Indonesia',
    tanggal: '2026-06-22',
    lokasi: 'Halaman Balai Kota Surabaya',
    talentId: 'u4',
    talentNama: 'Cak Aditya Pratama',
    status: 'Selesai',
    honor: 500000,
    statusBayar: 'Belum Dibayar',
    laporanDeskripsi: 'Telah mendampingi tamu delegasi dari ASITA Jawa Barat selama makan malam resmi.',
    laporanBuktiLink: 'laporan_gala_aditya.pdf',
    laporanTanggal: '2026-06-22',
    laporanStatus: 'Menunggu Validasi'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    penerimaRole: 'SDM',
    tipe: 'warning',
    pesan: 'Penugasan baru diajukan oleh Humas untuk kegiatan "Penyambutan Tamu Delegasi Sister City Kitakyushu" membutuhkan plotting talent segera.',
    tanggal: '2026-06-27 10:00',
    dibaca: false,
  },
  {
    id: 'n2',
    penerimaRole: 'Talent',
    penerimaUserId: 'u4',
    tipe: 'info',
    pesan: 'Anda diusulkan oleh SDM untuk bertugas pada kegiatan "Penyambutan Tamu Delegasi Sister City Kitakyushu" tanggal 02 Juli 2026. Harap segera konfirmasi.',
    tanggal: '2026-06-27 14:30',
    dibaca: false,
  },
  {
    id: 'n3',
    penerimaRole: 'Talent',
    penerimaUserId: 'u5',
    tipe: 'success',
    pesan: 'Terima kasih, Anda telah mengonfirmasi kehadiran untuk "Penyambutan Tamu Delegasi Sister City Kitakyushu".',
    tanggal: '2026-06-27 15:10',
    dibaca: true,
  },
  {
    id: 'n4',
    penerimaRole: 'Bendahara',
    tipe: 'info',
    pesan: 'Kegiatan "Festival Rujak Uleg Surabaya 2026" telah berstatus selesai. Silakan isi nominal honor dan lakukan proses pembayaran.',
    tanggal: '2026-05-21 09:00',
    dibaca: true,
  },
  {
    id: 'n5',
    penerimaRole: 'Humas',
    tipe: 'success',
    pesan: 'Sponsor baru "Grab Indonesia" mengajukan proposal kolaborasi event Tunjungan Romansa.',
    tanggal: '2026-06-28 11:15',
    dibaca: false,
  },
  {
    id: 'n6',
    penerimaRole: 'SDM',
    tipe: 'info',
    pesan: 'Ning Dania Lestari telah mengunggah Laporan Pertanggungjawaban (LPJ) untuk kegiatan Gala Dinner Walikota.',
    tanggal: '2026-06-23 16:45',
    dibaca: true,
  },
  {
    id: 'n7',
    penerimaRole: 'Bendahara',
    tipe: 'warning',
    pesan: 'Pembayaran honorarium untuk Gala Dinner Walikota telah disetujui SDM. Menunggu pencairan kas.',
    tanggal: '2026-06-24 09:30',
    dibaca: false,
  },
  {
    id: 'n8',
    penerimaRole: 'Talent',
    penerimaUserId: 'u6',
    tipe: 'success',
    pesan: 'Honorarium sebesar Rp 500.000 untuk kegiatan Gala Dinner Walikota telah lunas ditransfer.',
    tanggal: '2026-06-25 14:00',
    dibaca: false,
  },
];

export const INITIAL_CONTACTS: ContactMessage[] = [
  { id: 'cm1', nama: 'Budi Santoso', email: 'budi@corp.com', subjek: 'Permintaan Kerjasama Pameran', pesan: 'Halo kami dari PT ABC ingin mengajukan kerjasama pameran kebudayaan, mohon dihubungi kembali.', tanggal: '2026-06-26' },
  { id: 'cm2', nama: 'Sari Indah', email: 'sari.indah@edu.id', subjek: 'Kunjungan Edukasi Kampus', pesan: 'Bagaimana prosedur untuk mengundang Cak & Ning Surabaya menjadi pembicara dalam webinar kepemudaan kami?', tanggal: '2026-06-27' },
  { id: 'cm3', nama: 'Aditya Herlambang', email: 'adit@asitajawatimur.or.id', subjek: 'Gala Dinner & Tur Pariwisata', pesan: 'Konfirmasi reservasi penyedia jasa tour guide Cak & Ning sebanyak 2 pasang untuk agenda dinas malam.', tanggal: '2026-06-28' },
  { id: 'cm4', nama: 'Ibu Ratnasari', email: 'ratna@museumsurabaya.org', subjek: 'Edukasi Cagar Budaya Remaja', pesan: 'Kami bermaksud mengundang perwakilan Cak & Ning untuk menjadi narasumber dalam program tur malam museum.', tanggal: '2026-06-25' },
  { id: 'cm5', nama: 'Bapak Gunawan', email: 'gunawan@grandcity.co.id', subjek: 'Penyewaan Stand Pameran Adat', pesan: 'Penawaran khusus untuk paguyuban dalam mengisi stan utama Festival Budaya Nusantara Grand City Mall.', tanggal: '2026-06-24' },
];

export const INITIAL_TRANSAKSI: Transaksi[] = [
  {
    id: 'tx1',
    tanggal: '2026-05-15',
    tipe: 'Masuk',
    nominal: 10000000,
    kategori: 'Kas Disbudpar',
    keterangan: 'Penerimaan dana hibah termin 1 Dinas Kebudayaan dan Pariwisata Kota Surabaya',
    sumberDanAktor: 'Dinas Kebudayaan Kota Surabaya',
  },
  {
    id: 'tx2',
    tanggal: '2026-05-18',
    tipe: 'Masuk',
    nominal: 5000000,
    kategori: 'Sponsor',
    keterangan: 'Penerimaan dana sponsorship utama dari Bank Jatim untuk even festival rujak uleg',
    sumberDanAktor: 'Bank Jatim',
  },
  {
    id: 'tx3',
    tanggal: '2026-05-22',
    tipe: 'Keluar',
    nominal: 350000,
    kategori: 'Honorarium',
    keterangan: 'Pembayaran honorarium Cak Aditya Pratama (u4) untuk Festival Rujak Uleg Surabaya 2026',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)',
    referensiKegiatanId: 'k3',
  },
  {
    id: 'tx4',
    tanggal: '2026-06-02',
    tipe: 'Keluar',
    nominal: 400000,
    kategori: 'Honorarium',
    keterangan: 'Pembayaran honorarium Ning Dania Lestari (u5) untuk Parade Bunga Surabaya Vaganza',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)',
    referensiKegiatanId: 'k4',
  },
  {
    id: 'tx5',
    tanggal: '2026-06-10',
    tipe: 'Keluar',
    nominal: 750000,
    kategori: 'Konsumsi',
    keterangan: 'Pembelian paket konsumsi nasi kotak & snack rapat bulanan paguyuban di Balai Pemuda',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)',
  },
  {
    id: 'tx6',
    tanggal: '2026-06-20',
    tipe: 'Keluar',
    nominal: 1200000,
    kategori: 'Perlengkapan',
    keterangan: 'Pencucian kering (dry clean) 10 set busana adat resmi Kebaya & Beskap paguyuban',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)',
  },
  {
    id: 'tx7',
    tanggal: '2026-05-25',
    tipe: 'Masuk',
    nominal: 12000000,
    kategori: 'Sponsor',
    keterangan: 'Kontribusi sponsorship utama Kopi Kapal Api untuk program sosialisasi pariwisata',
    sumberDanAktor: 'PT Santos Jaya Abadi (Kapal Api)',
  },
  {
    id: 'tx8',
    tanggal: '2026-06-17',
    tipe: 'Keluar',
    nominal: 300000,
    kategori: 'Honorarium',
    keterangan: 'Pembayaran honorarium Cak Aditya Pratama (u4) untuk Cak & Ning Goes To School',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)',
    referensiKegiatanId: 'k5',
  },
  {
    id: 'tx9',
    tanggal: '2026-06-17',
    tipe: 'Keluar',
    nominal: 300000,
    kategori: 'Honorarium',
    keterangan: 'Pembayaran honorarium Ning Dania Lestari (u5) untuk Cak & Ning Goes To School',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)',
    referensiKegiatanId: 'k5',
  },
  {
    id: 'tx10',
    tanggal: '2026-06-22',
    tipe: 'Keluar',
    nominal: 1000000,
    kategori: 'Perlengkapan',
    keterangan: 'Sewa mobil mini-bus penjemputan delegasi pariwisata luar kota di Bandara Juanda',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)',
  },
  {
    id: 'tx11',
    tanggal: '2026-06-25',
    tipe: 'Keluar',
    nominal: 1800000,
    kategori: 'Konsumsi',
    keterangan: 'Pemesanan prasmanan catering makan siang rapat triwulan Dinas Kebudayaan',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)',
  },
  {
    id: 'tx12',
    tanggal: '2026-06-28',
    tipe: 'Masuk',
    nominal: 4500000,
    kategori: 'Sponsor',
    keterangan: 'Penerimaan dana kerjasama branding produk lipstik remaja dari Viva Cosmetics',
    sumberDanAktor: 'Viva Cosmetics Surabaya',
  },
  {
    id: 'tx13',
    tanggal: '2026-05-10',
    tipe: 'Keluar',
    nominal: 500000,
    kategori: 'Lainnya',
    keterangan: 'Dana santunan sosial panti asuhan yatim piatu program baksos paguyuban',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)',
  },
  {
    id: 'tx14',
    tanggal: '2026-06-12',
    tipe: 'Keluar',
    nominal: 450000,
    kategori: 'Perlengkapan',
    keterangan: 'Pembelian kantong sampah, sarung tangan, dan masker pelindung bakti sosial Kalimas',
    sumberDanAktor: 'Cak Reza Fahlevi (Bendahara)',
  },
  {
    id: 'tx15',
    tanggal: '2026-06-26',
    tipe: 'Masuk',
    nominal: 3000000,
    kategori: 'Sponsor',
    keterangan: 'Penerimaan kontribusi Grab Indonesia untuk penayangan video promosi pariwisata kuliner',
    sumberDanAktor: 'Grab Indonesia (Jawa Timur)',
  }
];
