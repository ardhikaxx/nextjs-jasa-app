import Projek1 from '@/assets/projects/1.png';
import Projek2 from '@/assets/projects/2.jpg';
import Projek3 from '@/assets/projects/3.png';
import Projek4 from '@/assets/projects/4.png';
import Projek5 from '@/assets/projects/5.png';
import Projek6 from '@/assets/projects/6.png';
import Projek7 from '@/assets/projects/7.png';
import Projek8 from '@/assets/projects/8.png';
import Projek9 from '@/assets/projects/9.jpg';
import Projek10 from '@/assets/projects/10.png';
import Projek11 from '@/assets/projects/11.png';
import Projek12 from '@/assets/projects/12.jpg';
import Projek13 from '@/assets/projects/13.png';
import Projek14 from '@/assets/projects/14.png';
import Projek15 from '@/assets/projects/15.png';
import Projek16 from '@/assets/projects/16.png';
import Projek17 from '@/assets/projects/17.png';

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    year: number;
    link?: string;
    image?: string;
    category: string;
}

export const projectsData: Project[] = [
    {
        id: "1",
        name: "Sistem Manajemen Data Kesehatan Posyandu (Versi Website)",
        description: "Aplikasi web untuk mengelola data kesehatan balita di posyandu. Dirancang khusus untuk kader dan bidan, platform ini menyederhanakan manajemen data pertumbuhan anak, imunisasi, dan rekam medis. Proyek akhir semester genap 2024 ini berhasil mendapatkan pendanaan melalui Program Kreativitas Mahasiswa (PKM).",
        technologies: ["Laravel", "Php", "Html", "Css", "Javascript", "Bootstrap"],
        year: 2024,
        link: "https://youtu.be/ouWihtoRrXQ?si=hkR7Z017pcbTo3SM",
        image: Projek1.src,
        category: "Web Development"
    },
    {
        id: "2",
        name: "Sistem Manajemen Data Kesehatan Posyandu (Versi Mobile)",
        description: "Aplikasi mobile pendamping sistem web yang memungkinkan orang tua memantau rekam medis, pertumbuhan, dan riwayat imunisasi anak. Dikembangkan sebagai proyek akhir semester genap 2024 dan juga mendapatkan pendanaan Program Kreativitas Mahasiswa (PKM).",
        technologies: ["Dart", "Flutter"],
        year: 2024,
        link: "https://youtu.be/ouWihtoRrXQ?si=hkR7Z017pcbTo3SM",
        image: Projek2.src,
        category: "Mobile Development"
    },
    {
        id: "3",
        name: "Website Pendukung PKM-PM 2024",
        description: "Website pendukung proyek PKM 2024 yang menyediakan sumber daya terkait Sistem Informasi Manajemen Data Kesehatan Posyandu. Fitur termasuk download aplikasi mobile, eksplorasi fitur web app, dan dokumentasi kegiatan proyek. Dirancang untuk tenaga kesehatan dan orang tua di Kp. Gudang, Situbondo.",
        technologies: ["Html", "Css", "Javascript", "Bootstrap"],
        year: 2024,
        link: "https://web-app-posyandu.vercel.app/",
        image: Projek3.src,
        category: "Web Development"
    },
    {
        id: "4",
        name: "Website Travel - PutraKJ Trans",
        description: "Website perusahaan transportasi PutraKJ Trans yang saya kembangkan untuk meningkatkan kehadiran online mereka. Menampilkan informasi layanan, pilihan armada, dan proses booking yang intuitif.",
        technologies: ["Html", "Css", "Javascript", "Bootstrap"],
        year: 2024,
        link: "https://putrakttransjember.vercel.app/",
        image: Projek4.src,
        category: "Web Development"
    },
    {
        id: "5",
        name: "Website Kelompok Tani Kopi Sumber Kembang",
        description: "Website promosi untuk Kelompok Tani Kopi Sumber Kembang yang menampilkan praktik pertanian dan produk kopi mereka. Platform ini memperkenalkan aktivitas komunitas dan upaya pertanian berkelanjutan.",
        technologies: ["Html", "Css", "Javascript", "Bootstrap"],
        year: 2024,
        link: "https://kopisumberkembangjember.vercel.app/",
        image: Projek5.src,
        category: "Web Development"
    },
    {
        id: "6",
        name: "Website GlucoWise - Demo Aplikasi Manajemen Diabetes",
        description: "Website showcase untuk aplikasi GlucoWise yang memungkinkan pengguna mendownload aplikasi mobile langsung dari situs. GlucoWise adalah solusi web dan mobile untuk edukasi dan manajemen data diabetes.",
        technologies: ["Html", "Css", "Javascript", "Bootstrap"],
        year: 2025,
        link: "https://glucowise-app.vercel.app/",
        image: Projek6.src,
        category: "Web Development"
    },
    {
        id: "7",
        name: "Glucozia AI - Chatbot Edukasi Diabetes",
        description: "Website chatbot AI yang menyediakan edukasi diabetes personalisasi. Dibangun dengan HTML, CSS, Tailwind CSS, dan JavaScript. Glucozia berfungsi sebagai asisten virtual 24/7 untuk pemantauan kesehatan dan rekomendasi nutrisi.",
        technologies: ["Html", "Css", "Javascript", "Tailwind"],
        year: 2025,
        link: "https://glucozia-ai.vercel.app/",
        image: Projek7.src,
        category: "Web Development"
    },
    {
        id: "8",
        name: "Website GlucoWise - Akses Tenaga Kesehatan",
        description: "Website GlucoWise yang menyediakan layanan untuk pengguna di aplikasi mobile, seperti manajemen data kesehatan, rekam medis, manajemen screening dan banyak lagi untuk memenuhi layanan di aplikasi mobile",
        technologies: ["Laravel", "Php", "Html", "Css", "Javascript", "Bootstrap"],
        year: 2025,
        link: "https://youtu.be/wZauCi4wE8k?si=gkgcKuRAeHPMZaL1",
        image: Projek8.src,
        category: "Web Development"
    },
    {
        id: "9",
        name: "Aplikasi Mobile GlucoWise - Akses Umum",
        description: "Aplikasi mobile untuk pengguna umum yang ingin memeriksa dengan cek gula darah dengan fitur GlucoCheck, pengguna juga bisa melakukan Screening, pengguna mendapatkan informasi edukasi berupa video edukasi, artikel edukasi, juga chat bot ai yaitu Glucozia AI, bagi penderita diabetes juga ada fitur GlucoCare yang membantu mengingatkan jadwal minum obat.",
        technologies: ["Dart", "Flutter"],
        year: 2025,
        link: "https://youtu.be/wZauCi4wE8k?si=gkgcKuRAeHPMZaL1",
        image: Projek9.src,
        category: "Mobile Development"
    },
    {
        id: "10",
        name: "Website AITeC VII 2025 - Politeknik Negeri Jember",
        description: "Website resmi Agricultural Innovation Technology Competition (AITeC) 2025. Saya bertanggung jawab untuk pengembangan front-end dengan tailwind.",
        technologies: ["Golang", "Tailwind"],
        year: 2025,
        link: "https://aitec.bakorma.org/",
        image: Projek10.src,
        category: "Web Development"
    },
    {
        id: "11",
        name: "MoodCurhat - Website Chat AI Kesehatan Mental",
        description: "Platform konsultasi kesehatan mental berbasis AI yang menyediakan dukungan emosional dan saran profesional. Dibangun dengan teknologi terkini untuk memberikan pengalaman chatting yang empatik dan membantu.",
        technologies: ["Html", "Tailwind", "Javascript"],
        year: 2025,
        link: "https://moodcurhat.vercel.app/",
        image: Projek11.src,
        category: "Web Development"
    },
    {
        id: "12",
        name: "Website E-Commerce UMKM Rezti's Batik Jember",
        description: "Platform digital untuk mendukung UMKM batik melalui penjualan online dan layanan edukasi membatik. Dibuat dengan tampilan modern dan responsif untuk memberikan pengalaman pengguna yang optimal.",
        technologies: ["Laravel", "Php", "Html", "Css", "Javascript", "Bootstrap"],
        year: 2025,
        link: "https://youtu.be/I8dxXVDDkqs?si=phrwAxxJLq4NhSen",
        image: Projek12.src,
        category: "Web Development"
    },
    {
        id: "13",
        name: "Aplikasi Keuangan UMKM - Rahmad HandyCraft",
        description: "Rahmad HandyCraft App adalah aplikasi khusus umkm Rahmad Handycraft untuk mencatat pemasukan dan pengeluaran harian, mengelola data supplier, produk, bahan baku, pelanggan, hingga karyawan dan honor, semua dalam satu aplikasi sederhana dan efisien.",
        technologies: ["Dart", "Flutter", "Firebase"],
        year: 2025,
        link: "https://handycraft-web.vercel.app/",
        image: Projek13.src,
        category: "Mobile Development"
    },
    {
        id: "14",
        name: "Aplikasi Keuangan UMKM - Batik Sesa Bojonegoro",
        description: "Batik Sesa App adalah aplikasi khusus umkm Batik Sesa yang berasal dari daerah Bojonegoro untuk mencatat pemasukan harian, mengelola daftar ketrsediaan bahan baku, daftar kain, daftar keperluan membatik, hingga karyawan dan honor, semua dalam satu aplikasi sederhana dan efisien.",
        technologies: ["Dart", "Flutter", "Firebase"],
        year: 2025,
        link: "https://batik-sesa-bojonegoro.vercel.app/",
        image: Projek14.src,
        category: "Mobile Development"
    },
    {
        id: "15",
        name: "Website JasaMarga Operasional - Indonesia Highway Corp",
        description: "Website JasaMarga Operasional – Indonesia Highway Corp adalah one-stop portal untuk memantau status ruas, letak perbaikan jalan tol, fitur laporan berupa file excel dengan perbulan atau pertahun, semua dalam satu halaman cepat, ringan, dan mobile-friendly.",
        technologies: ["Laravel", "Php", "Html", "Css", "Javascript", "Bootstrap"],
        year: 2025,
        link: "https://github.com/ardhikaxx/jasamarga-web",
        image: Projek15.src,
        category: "Web Development"
    },
    {
        id: "16",
        name: "Design UI UX - Aplikasi SIMPATI (Sistem Informasi Pasien TBC)",
        description: "Desain ulang (redesign) dan pembuatan prototype aplikasi mobile dilakukan untuk memperbaiki struktur alur pengguna sehingga pengalaman penggunaan menjadi lebih intuitif dan terarah",
        technologies: ["Figma"],
        year: 2025,
        link: "https://github.com/ardhikaxx/jasamarga-web",
        image: Projek16.src,
        category: "Design UI UX"
    },
    {
        id: "17",
        name: "Design UI UX - Sistem Informasi STIE BIMA",
        description: "Desain UI/UX Sistem Informasi Sekolah Tinggi Ilmu Ekonomi (STIE) Bima. Sistem ini terdiri dari lima website operasional, yaitu: Sistem Informasi Akademik, Elektronik Office (E-Office), Sistem Registrasi Mahasiswa, Elektronik Sign (E-Sign), dan Elektronik Pay (E-Pay).",
        technologies: ["Figma"],
        year: 2025,
        link: "https://github.com/ardhikaxx/jasamarga-web",
        image: Projek17.src,
        category: "Design UI UX"
    },
];