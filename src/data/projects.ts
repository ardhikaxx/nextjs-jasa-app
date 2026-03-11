export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  year: number;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Sistem Manajemen Data Kesehatan Posyandu - Akses Tenaga Kesehatan',
    description: 'Aplikasi web untuk mengelola data kesehatan balita di posyandu. Dirancang khusus untuk kader dan bidan, platform ini menyederhanakan manajemen data pertumbuhan anak, imunisasi, dan rekam medis. Proyek akhir semester genap 2024 ini berhasil mendapatkan pendanaan melalui Program Kreativitas Mahasiswa (PKM).',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'Laravel', 'JavaScript'],
    image: '/projects/1.jpg',
    link: 'https://youtu.be/ouWihtoRrXQ?si=i9-c8RCqJMOmwfLo',
    year: 2024
  },
  {
    id: 2,
    title: 'Sistem Manajemen Data Kesehatan Posyandu - Akses Orang Tua',
    description: 'Aplikasi mobile pendamping sistem web yang memungkinkan orang tua memantau rekam medis, pertumbuhan, dan riwayat imunisasi anak. Dikembangkan sebagai proyek akhir semester genap 2024 dan juga mendapatkan pendanaan Program Kreativitas Mahasiswa (PKM).',
    technologies: ['Dart', 'Flutter'],
    image: '/projects/2.jpg',
    link: 'https://youtu.be/ouWihtoRrXQ?si=i9-c8RCqJMOmwfLo',
    year: 2024
  },
  {
    id: 3,
    title: 'Website Landing Page Demo Aplikasi PKM-PM 2024',
    description: 'Website pendukung proyek PKM 2024 yang menyediakan sumber daya terkait Sistem Informasi Manajemen Data Kesehatan Posyandu. Fitur termasuk download aplikasi mobile, eksplorasi fitur web app, dan dokumentasi kegiatan proyek.',
    technologies: ['HTML', 'Bootstrap', 'JavaScript'],
    image: '/projects/3.jpg',
    link: 'https://web-app-posyandu.vercel.app/',
    year: 2024
  },
  {
    id: 4,
    title: 'Website Travel - PutraKJ Trans',
    description: 'Website perusahaan transportasi PutraKJ Trans yang saya kembangkan untuk meningkatkan kehadiran online mereka. Menampilkan informasi layanan, pilihan armada, dan proses booking yang intuitif.',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: '/projects/4.jpg',
    link: 'https://putrakttransjember.vercel.app/',
    year: 2024
  },
  {
    id: 5,
    title: 'Website Kelompok Tani Kopi Sumber Kembang',
    description: 'Website promosi untuk Kelompok Tani Kopi Sumber Kembang yang menampilkan praktik pertanian dan produk kopi mereka. Platform ini memperkenalkan aktivitas komunitas dan upaya pertanian berkelanjutan.',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: '/projects/5.jpg',
    link: 'https://kopisumberkembangjember.vercel.app/',
    year: 2024
  },
  {
    id: 6,
    title: 'MoodCurhat - AI Teman Curhat Digital Untuk Kesehatan Mental',
    description: 'MoodCurhat adalah aplikasi chat AI yang dirancang sebagai teman curhat digital untuk mendukung kesehatan mental pengguna. Dengan antarmuka yang ramah dan responsif, pengguna dapat menceritakan perasaan dan pikirannya secara privat. Aplikasi ini menggunakan teknologi AI untuk memberikan respons yang empatik dan mendukung.',
    technologies: ['HTML', 'CSS', 'Tailwind', 'JavaScript', 'Gemini API'],
    image: '/projects/6.jpg',
    link: 'https://moodcurhat.vercel.app/',
    year: 2024
  },
  {
    id: 7,
    title: 'Website GlucoWise - Akses Tenaga Kesehatan',
    description: 'Website GlucoWise yang menyediakan layanan untuk pengguna di aplikasi mobile, seperti manajemen data kesehatan, rekam medis, manajemen screening dan banyak lagi untuk memenuhi layanan di aplikasi mobile',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'Laravel', 'JavaScript'],
    image: '/projects/7.jpg',
    link: 'https://youtu.be/ouWihtoRrXQ?si=i9-c8RCqJMOmwfLo',
    year: 2024
  },
  {
    id: 8,
    title: 'Aplikasi Mobile GlucoWise - Akses Umum',
    description: 'Aplikasi mobile untuk pengguna umum yang ingin memeriksa dengan cek gula darah dengan fitur GlucoCheck, pengguna juga bisa melakukan Screening, pengguna mendapatkan informasi edukasi berupa video edukasi, artikel edukasi, juga chat bot ai yaitu Glucozia AI.',
    technologies: ['Dart', 'Flutter'],
    image: '/projects/8.jpg',
    link: 'https://youtu.be/ouWihtoRrXQ?si=i9-c8RCqJMOmwfLo',
    year: 2024
  },
  {
    id: 9,
    title: 'Website Landing Page Demo - Sistem GlucoWise',
    description: 'Website showcase untuk aplikasi GlucoWise yang memungkinkan pengguna mendownload aplikasi mobile langsung dari situs. GlucoWise adalah solusi web dan mobile untuk edukasi dan manajemen data diabetes.',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: '/projects/9.jpg',
    link: 'https://glucowise-app.vercel.app/',
    year: 2025
  },
  {
    id: 10,
    title: 'Glucozia AI - Chatbot Edukasi Diabetes',
    description: 'Website chatbot AI yang menyediakan edukasi diabetes personalisasi. Dibangun dengan HTML, CSS, Tailwind CSS, dan JavaScript. Glucozia berfungsi sebagai asisten virtual 24/7 untuk pemantauan kesehatan dan rekomendasi nutrisi.',
    technologies: ['HTML', 'CSS', 'Tailwind', 'JavaScript'],
    image: '/projects/10.jpg',
    link: 'https://glucozia-ai.vercel.app/',
    year: 2025
  },
  {
    id: 11,
    title: 'Website AITeC VII 2025 - Politeknik Negeri Jember',
    description: 'Website resmi Agricultural Innovation Technology Competition (AITeC) 2025 bertepatan Politeknik Negeri Jember sebagai tuan rumah untuk perlombaan nasional AITeC ke 7 2025. Saya bertanggung jawab untuk pengembangan front-end.',
    technologies: ['Tailwind', 'JavaScript', 'GSAP'],
    image: '/projects/11.jpg',
    link: 'https://aitec.bakorma.org/',
    year: 2025
  },
  {
    id: 12,
    title: "Website E-Commerce UMKM Rezti's Batik Jember",
    description: 'Platform digital untuk mendukung UMKM batik melalui penjualan online dan layanan edukasi membatik. Dibuat dengan tampilan modern dan responsif untuk memberikan pengalaman pengguna yang optimal.',
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript'],
    image: '/projects/12.jpg',
    link: 'https://web-reztis-batik-jember.vercel.app/',
    year: 2025
  },
  {
    id: 13,
    title: 'Aplikasi Keuangan UMKM - Rahmad HandyCraft',
    description: 'Rahmad HandyCraft App adalah aplikasi khusus umkm Rahmad Handycraft untuk mencatat pemasukan dan pengeluaran harian, mengelola data supplier, produk, bahan baku, pelanggan, hingga karyawan dan honor, semua dalam satu aplikasi sederhana dan efisien.',
    technologies: ['Flutter', 'Dart'],
    image: '/projects/13.jpg',
    link: 'https://handycraft-web.vercel.app/',
    year: 2025
  },
  {
    id: 14,
    title: 'Aplikasi Keuangan UMKM - Batik Sesa Bojonegoro',
    description: 'Batik Sesa App adalah aplikasi khusus umkm Batik Sesa yang berasal dari daerah Bojonegoro untuk mencatat pemasukan harian, mengelola daftar ketrsediaan bahan baku, daftar kain, daftar keperluan membatik, hingga karyawan dan honor.',
    technologies: ['Flutter', 'Dart'],
    image: '/projects/14.jpg',
    link: 'https://batik-sesa-bojonegoro.vercel.app/',
    year: 2025
  },
  {
    id: 15,
    title: 'Website Operasional JasaMarga Jalan Tol',
    description: 'Website operasional untuk JasaMarga Jalan Tol yang menyediakan fitur lengkap meliputi: Dashboard untuk memantau status operasional jalan tol, Manajemen Projek untuk mengelola data proyek pekerjaan, Manajemen Lokasi untuk pengelolaan lokasi dan jalur lajur jalan tol, Manajemen Pekerjaan untuk mendata dan mengelola berbagai jenis pekerjaan pemeliharaan, Manajemen SFO (Scheduled Follow Up Operations) untuk mengelola aktivitas dan laporan pekerjaan, Cek Lokasi untuk memeriksa detail lokasi jalan tol, serta Settings untuk pengaturan sistem.',
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript'],
    image: '/projects/15.jpg',
    link: 'https://github.com/ardhikaxx/jasamarga-web',
    year: 2025
  },
  {
    id: 16,
    title: 'Website Sistem Perpustakaan MAN 2 Payakumbuh',
    description: 'Website sistem perpustakaan digital untuk MAN 2 Payakumbuh yang menyediakan fitur lengkap meliputi: Dashboard untuk memantau statistik dan aktivitas perpustakaan, Manajemen Buku untuk mengelola data buku, katalog, dan inventaris, Manajemen Admin untuk mengelola data administrator sistem, Laporan untuk menghasilkan laporan perpustakaan, serta Pengaturan untuk konfigurasi sistem.',
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript'],
    image: '/projects/16.jpg',
    link: 'https://github.com/ardhikaxx/website-perpus-man2-payakumbuh',
    year: 2025
  },
  {
    id: 17,
    title: 'Website Profil Sekolah - SMK Muhammadiyah 1 Berbek Nganjuk',
    description: 'Website profil sekolah untuk SMK Muhammadiyah 1 Berbek Nganjuk yang menyediakan fitur lengkap meliputi: Dashboard untuk memantau statistik website, Manajemen Konten yang mencakup Banner, Struktur Organisasi, Pengumuman, Fasilitas, Prestasi, Jurusan, dan Gallery, Manajemen User yang mencakup data Tenaga Pendidik dan Admin, serta Pengaturan untuk konfigurasi sistem.',
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript'],
    image: '/projects/17.jpg',
    link: 'https://github.com/ardhikaxx/web-smk-muhammadijah-1-berbek',
    year: 2025
  },
  {
    id: 18,
    title: 'Website Sistem Informasi RSPD Klaten',
    description: 'Website sistem informasi Radio Siaran Pemerintah Daerah (RSPD) Klaten yang menyediakan fitur lengkap meliputi: Dashboard untuk memantau statistik dan aktivitas radio, Manajemen Berita untuk mengelola konten berita, Manajemen Program Siaran untuk mengelola jadwal dan program siaran radio, serta Pengaturan untuk konfigurasi sistem.',
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript'],
    image: '/projects/18.jpg',
    link: 'https://github.com/ardhikaxx/rspd-klaten-web',
    year: 2026
  },
  {
    id: 19,
    title: 'Website Operasinal GYM GenZ Fitness Center',
    description: 'Website operasional GYM GenZ Fitness Center yang menyediakan fitur lengkap meliputi: Dashboard untuk memantau statistik gym, Manajemen Pengguna untuk mengelola data anggota gym, Food Plan untuk mengelola rencana makan dan nutrisi, Jadwal Workout untuk mengelola jadwal latihan, Manajemen Workout untuk mengelola berbagai jenis latihan dan gerakan, Feedback Pengguna untuk mengelola kritik dan saran dari anggota, Manajemen Admin untuk mengelola administrator sistem, serta Profile untuk pengaturan profil admin.',
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript'],
    image: '/projects/19.jpg',
    link: 'https://github.com/ardhikaxx/gym-genz-api.git',
    year: 2026
  },
  {
    id: 20,
    title: 'Aplikasi Mobile GYM GenZ Fitness Center',
    description: 'Aplikasi mobile GYM GenZ Fitness Center yang menyediakan fitur lengkap meliputi: Dashboard untuk memantau workout challenge, riwayat workout, dan statistik user seperti BMI dan status kesehatan, Workout untuk mengelola berbagai jenis latihan dan gerakan, Jadwal Workout untuk mengelola jadwal latihan berdasarkan waktu (Pagi, Siang, Sore, Malam), Food Plan untuk mengelola rencana makan dan nutrisi harian dengan informasi kalori, protein, carbs, dan lemak, Chatbot AI sebagai asisten virtual untuk membantu pertanyaan terkait fitness dan gym, Feedback untuk mengelola kritik dan saran dari anggota, Edit Profil untuk mengelola data profil user, Ubah Password untuk keamanan akun, serta Pengaturan aplikasi meliputi dark mode dan light mode. Aplikasi ini terintegrasi dengan backend API untuk sinkronisasi data.',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    image: '/projects/20.jpg',
    link: 'https://github.com/ardhikaxx/mobile-gym',
    year: 2026
  },
  {
    id: 21,
    title: 'Website Sistem Analisis Review Aplikasi OSS Dengan Metode Naive Bayes',
    description: 'Sistem analisis review aplikasi OSS (Online Single Submission) menggunakan metode Naive Bayes untuk melakukan sentimen analisis terhadap ulasan pengguna. Fitur lengkap meliputi: Dashboard untuk melihat ringkasan analisis, Import CSV untuk mengimpor data ulasan dari file CSV, Analisis Sentimen untuk menjalankan proses analisis menggunakan machine learning Naive Bayes dengan deteksi sentimen positif, negatif, dan netral beserta confidence score, Riwayat Analisis untuk melihat histori analisis yang telah dilakukan, Detail Analisis untuk melihat hasil analisis lengkap meliputi jumlah review positif, negatif, netral, rata-rata confidence, dan contoh ulasan, Export CSV dan Excel untuk mengekspor hasil analisis ke format file yang diinginkan, Manajemen Model untuk memeriksa status file model machine learning dan perbaikan model dari backup, serta Fitur Fallback untuk fallback ke analisis berbasis rating jika model ML gagal dijalankan.',
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript', 'Python', 'Naive Bayes ML'],
    image: '/projects/21.jpg',
    link: 'https://github.com/ardhikaxx/sistem-nara',
    year: 2026
  },
  {
    id: 22,
    title: 'Website SIPKES (Sistem Informasi Polije Kesehatan) - Poli Gigi',
    description: 'Website sistem informasi kesehatan untuk Poli Gigi Politeknik Negeri Jember yang menyediakan fitur lengkap meliputi: Pendaftaran pasien baru dan pencarian pasien, Dashboard untuk melihat statistik dan data pasien, Pemeriksaan awal untuk intake pasien, Antrean poli gigi untuk mengelola antrean pasien, Pemeriksaan poli gigi dengan Odontogram interaktif untuk visualisasi kondisi gigi pasien, Riwayat pemeriksaan poli gigi untuk melihat histori pengobatan, Data obat untuk manajemen inventaris obat, General Consent dan Informed Consent untuk persetujuan medis, Surat Keterangan Sehat dan Surat Keterangan Sakit untuk administrasi medis, Laporan kunjungan untuk statistik kunjungan pasien, Laporan 10 Besar Penyakit untuk analisis data penyakit, serta manajemen data meliputi tenaga kesehatan, dokter, layanan, dan poli. Sistem ini terintegrasi dengan autentikasi berbasis role untuk tenaga kesehatan.',
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript'],
    image: '/projects/22.jpg',
    link: 'https://github.com/ardhikaxx/web-sipkes.git',
    year: 2026
  },
  {
    id: 23,
    title: "Website Sistem Manajemen Keuangan Masjid Jami' Al-Muttaqiin Jember",
    description: "Website sistem manajemen keuangan untuk Masjid Jami' Al-Muttaqiin Jember yang menyediakan fitur lengkap meliputi: Halaman publik untuk Informasi umum masjid, Dashboard admin dengan visualisasi data keuangan menggunakan chart, Manajemen Keuangan untuk mencatat dan mengelola transaksi pemasukan dan pengeluaran dengan fitur statistik keuangan, Manajemen Laporan untuk menghasilkan laporan keuangan dan cetakan, serta Pengaturan Profil untuk mengelola data admin sistem. Sistem ini menggunakan autentikasi berbasis middleware untuk keamanan admin.",
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript'],
    image: '/projects/23.jpg',
    link: 'https://github.com/ardhikaxx/sistem-informasi-manajemen-keuangan-masjid',
    year: 2026
  },
  {
    id: 24,
    title: 'Website Apocare - Integrated Pharmacy Management System',
    description: 'Website sistem manajemen apotek terintegrasi yang menyediakan fitur lengkap meliputi: Autentikasi dan manajemen pengguna dengan multi-role (admin, apoteker, kasir, gudang), Dashboard dengan visualisasi data dan smart search, Master data meliputi pemasok, kategori, satuan, dan produk dengan fitur export Excel/CSV/PDF, Manajemen persediaan meliputi stok, penyesuaian stok, dan opname, Transaksi meliputi penjualan, pembelian, retur pembelian, dan retur penjualan dengan fitur sync offline, Manajemen resep dokter dengan tahapan pengambilan obat, Manajemen pelanggan dan dokter, Laporan lengkap meliputi laporan penjualan, pembelian, persediaan, keuangan, dan pelanggan dengan fitur export, Manajemen pengguna meliputi peran dan hak akses, Audit trail untuk melacak aktivitas pengguna, Backup database, dan manajemen session pengguna. Sistem ini mendukung fitur favorite produk dan update harga massal.',
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript'],
    image: '/projects/24.jpg',
    link: 'https://github.com/ardhikaxx/apocare',
    year: 2026
  },
  {
    id: 25,
    title: 'Website SI-BESTI - Sistem Bimbing & Evaluasi Siklus Tidur Ibu',
    description: 'Aplikasi web untuk membantu ibu memantau, mengevaluasi, dan memperbaiki pola tidur melalui catatan harian, evaluasi berkala, serta rekomendasi praktis. Fitur lengkap meliputi: Autentikasi pengguna (login & registrasi), Dashboard ringkas untuk melihat ringkasan data, Pencatatan sleep tracking (tambah, ubah, hapus, dan detail) dengan statistik, Quality Test (pengisian tes, konfirmasi, dan hasil histori), Murottal untuk relaksasi, Profil pengguna (update data diri), Manajemen data ibu untuk admin (lihat, detail, ubah status, hapus) dengan statistik, Monitoring sleep tracking pengguna & detail tidur, serta Profil admin & update password. Dirancang sederhana dan ramah untuk pengguna maupun tenaga kesehatan.',
    technologies: ['Laravel', 'Bootstrap', 'PHP', 'CSS', 'JavaScript'],
    image: '/projects/25.jpg',
    link: 'https://github.com/ardhikaxx/si-besti',
    year: 2026
  },
  {
    id: 26,
    title: 'EMIRA - Sistem Informasi Manajemen Rumah Sakit',
    description: 'Website sistem informasi manajemen rumah sakit lengkap yang menyediakan fitur meliputi: Booking online untuk pasien baru dan lama, Dashboard terpusat untuk memantau operasional rumah sakit, Manajemen antrian pasien dengan fitur panggil, layani, dan selesai, Rekam medis elektronik dengan integrasi ICD-10 untuk diagnosa, Vital sign untuk mencatat tanda-tanda vital pasien, Manajemen poli klinik, dokter, jadwal dokter, dan ruangan, Inventaris kode ICD-10 dan tindakan medis, Manajemen pengguna dengan multi-role (superadmin, dokter, rekam medis), Booking management untuk konfirmasi dan pembatalan appointment, serta Pengaturan sistem komprehensif. Sistem ini menggunakan autentikasi berbasis role untuk keamanan data pasien.',
    technologies: ['Laravel', 'PHP', 'Tailwind', 'Vite'],
    image: '/projects/26.jpg',
    link: 'https://github.com/ardhikaxx/emira',
    year: 2026
  },
  {
    id: 27,
    title: 'SI-KRONIS - Sistem Informasi Manajemen Penyakit Kronis',
    description: 'Website sistem informasi manajemen penyakit kronis yang menyediakan fitur lengkap dengan multi-role: Untuk Pasien tersedia dashboard, booking konsultasi online, riwayat medis dengan export PDF, manajemen resep dan refill obat, profil pengguna, upload hasil lab, dan chat dengan dokter. Untuk Admin tersedia dashboard, manajemen user, dokter, konsultasi, obat, template resep, riwayat medis pasien, dan laporan dengan export Excel/PDF. Untuk Dokter tersedia dashboard, manajemen jadwal praktik, konsultasi pasien, penulisan resep, dan chat dengan pasien. Untuk Perawat tersedia dashboard, manajemen booking, dan upload hasil lab. Sistem ini menggunakan autentikasi berbasis role (pasien, admin, dokter, perawat) dengan fitur search global dan export laporan.',
    technologies: ['Laravel', 'PHP', 'Bootstrap', 'DOMPDF', 'Maatwebsite Excel', 'Spatie Permission'],
    image: '/projects/27.jpg',
    link: 'https://github.com/ardhikaxx/si-kronis',
    year: 2026
  },
  {
    id: 28,
    title: 'SIKEMBANG - Sistem Konsultasi & Edukasi Ibu Hamil Berkelanjutan',
    description: 'Website sistem konsultasi dan edukasi ibu hamil berkelanjutan yang menyediakan fitur lengkap dengan multi-role: Untuk Ibu Hamil tersedia dashboard personal, booking konsultasi dengan bidan, chat konsultasi, akses materi edukasi kesehatan ibu danJanin, pencatatan catatan kesehatan harian, dan reminder jadwal penting (periksa kehamilan, minum obat, vitamin). Untuk Bidan tersedia dashboard monitoring, manajemen data ibu hamil, konsultasi chat dengan pasien, manajemen booking (terima, tolak, jadwal ulang, selesai), manajemen edukasi (CRUD materi), penilaian risiko kehamilan dengan kalkulasi skor risiko, dan laporan lengkap meliputi rekap konsultasi, data ibu berisiko, status booking, distribusi usia kehamilan, statistik ibu hamil, dan konsultasi per bidan dengan fitur export Excel. Sistem ini mendukung export laporan ke Excel untuk berbagai kategori.',
    technologies: ['Laravel', 'PHP', 'Bootstrap', 'Maatwebsite Excel'],
    image: '/projects/28.jpg',
    link: 'https://github.com/ardhikaxx/sikembang',
    year: 2026
  },
  {
    id: 29,
    title: 'Banyu Biru Ticketing & Booking System - Sistem Pemesanan Tiket & Booking Objek Wisata',
    description: 'Website pemandian air panas banyu biru nganjuk sistem pemesanan tiket dan booking objek wisata yang menyediakan fitur lengkap dengan multi-role: Untuk Pengguna/Tamu tersedia halaman landing page dengan daftar tempat wisata, pemesanan tiket masuk dengan upload bukti pembayaran, download e-tiket PDF dengan QR code, riwayat pemesanan, booking penginapan/fasilitas dengan manajemen pembayaran, upload bukti pembayaran, cek status booking, dan profil pengguna. Untuk Admin tersedia dashboard management, manajemen Tiket (CRUD) dan pesanan Tiket (konfirmasi/tolak), manajemen Booking (konfirmasi/tolak), manajemen Admin, cek validitas Tiket dan Booking menggunakan QR code scanner, manajemen rekening bank, dan profil admin. Sistem ini menggunakan autentikasi berbasis role dan menghasilkan QR code untuk setiap e-tiket yang dapat diverifikasi oleh admin.',
    technologies: ['Laravel', 'PHP', 'Bootstrap', 'DOMPDF', 'Simple QRCode', 'Spatie Permission'],
    image: '/projects/29.jpg',
    link: 'https://github.com/ardhikaxx/banyu-biru-nganjuk',
    year: 2026
  },
  {
    id: 30,
    title: 'MEDTRACK - Sistem Tracking & Peminjaman Rekam Medis',
    description: 'Website sistem tracking dan peminjaman rekam medis yang menyediakan fitur lengkap meliputi: Dashboard dengan visualisasi data dan kalender jadwal, Manajemen Pasien (CRUD) dengan pencarian Select2 dan integrasi API wilayah Indonesia (provinsi, kabupaten, kecamatan, desa), Manajemen Rekam Medis (CRUD) dengan histori per pasien, Manajemen Peminjaman Rekam Medis dengan workflow lengkap (pengajuan, persetujuan, proses, penolakan, pembatalan) termasuk notifikasi keterlambatan, Manajemen Pengembalian Rekam Medis dengan dokumentasi kondisi, Manajemen Pengguna dengan toggle aktif dan reset password, Manajemen Unit kerja, Laporan lengkap meliputi laporan peminjaman, pengembalian, keterlambatan, statistik dokumen, dan rekap bulanan, Export laporan ke Excel dan PDF, Sistem notifikasi untuk status peminjaman, Pencarian global, Scanner QR code untuk lookup rekam medis, serta Profil pengguna dengan update data dan password. Sistem ini mendukung integrasi wilayah Indonesia untuk data alamat pasien.',
    technologies: ['Laravel', 'PHP', 'Bootstrap', 'DOMPDF', 'Maatwebsite Excel', 'Simple QRCode'],
    image: '/projects/30.jpg',
    link: 'https://github.com/ardhikaxx/medtrack',
    year: 2026
  },
];
