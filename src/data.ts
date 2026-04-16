import {
  BookOpen, LogIn, UserPlus, Users, ShieldCheck, ArrowRightLeft,
  GraduationCap, Briefcase, Building, CalendarClock, Cpu, ToggleRight,
  ClipboardCheck, PieChart, DoorOpen, FileText, MapPin
} from 'lucide-react';

export const slides = [
  {
    id: 0,
    title: "Panduan Pengguna Sistem Ponpes Jagat",
    subtitle: "Generus App",
    icon: BookOpen,
    content: [
      {
        text: "Selamat datang di Panduan Pengguna Generus App. Dokumen ini disusun untuk membantu pengguna, baik itu administrator, pengurus, guru, dan santri, dalam menggunakan fitur-fitur yang ada di dalam aplikasi ini."
      },
      {
        text: "Aplikasi ini dikembangkan untuk mengintegrasikan berbagai aspek pengelolaan pondok pesantren secara terpusat, memudahkan proses administrasi, presensi, perizinan, hingga manajemen asrama dan kelas."
      }
    ]
  },
  {
    id: 1,
    title: "1. Akses Aplikasi & Login",
    icon: LogIn,
    content: [
      {
        text: "Aplikasi Generus dapat diakses melalui browser dengan mengunjungi URL: generus.app"
      },
      {
        subtitle: "Cara Login:",
        list: [
          "Buka URL aplikasi pada browser Anda.",
          "Anda akan diarahkan ke halaman login.",
          "Masukkan kredensial Anda, sistem mendukung berbagai format login: Username, Email terdaftar, Nomor Telepon (WhatsApp) yang terdaftar.",
          "Masukkan Password.",
          "Klik tombol Login. Jika kredensial yang dimasukkan valid, Anda akan dialihkan ke dashboard portal ponpes sesuai dengan hak akses (role) Anda."
        ]
      }
    ]
  },
  {
    id: 2,
    title: "2. Pendaftaran (Guru, Pengurus, dan Santri)",
    icon: UserPlus,
    content: [
      {
        text: "Modul Person / Pendaftaran digunakan untuk mendata individu baru yang akan berperan sebagai Guru, Pengurus, maupun Santri di Ponpes."
      },
      {
        subtitle: "a. Syarat Pendaftaran",
        text: "Setiap pendaftar wajib melengkapi informasi dasar (biodata diri) yang mencakup Nama Lengkap, Tempat Tanggal Lahir, Jenis Kelamin, dan kontak yang bisa dihubungi. Beberapa data administratif ekstra seperti domisili atau data orang tua (untuk santri) juga diwajibkan sesuai kebijakan form pendaftaran."
      },
      {
        subtitle: "b. Penggunaan NIK dan Paspor",
        list: [
          "Warga Negara Indonesia (WNI): Pendaftaran wajib menyertakan Nomor Induk Kependudukan (NIK) yang valid.",
          "Warga Negara Asing (WNA) / Santri Luar Negeri: Jika tidak memiliki NIK, maka proses identifikasi menggunakan Nomor Paspor. NIK dan Paspor bersifat unik (unique) dalam sistem dan digunakan untuk mencegah duplikasi data ganda di seluruh jaringan ponpes."
        ]
      },
      {
        subtitle: "c. Pendaftaran Multiponpes",
        text: "Sistem mendukung konsep multitenancy (multi-ponpes). Seorang Guru atau Pengurus bisa didaftarkan di lebih dari satu ponpes yang sama (atau berbeda jaringan) dengan status aktif bersamaan. Data dasar mereka (Person) adalah satu (terpusat), namun afiliasinya dapat dikaitkan dengan banyak ponpes sesuai kebutuhan penugasan."
      }
    ]
  },
  {
    id: 3,
    title: "3. Akun dan Role (Hak Akses)",
    icon: Users,
    content: [
      {
        subtitle: "a. Pembuatan Akun",
        text: "Setiap Person (Guru, Pengurus, Santri) yang terdaftar tidak secara otomatis memiliki akun login (User). Akun (User Account) akan digenerate atau dapat dibuatkan secara spesifik oleh admin. Satu Akun User terhubung secara relasional terhadap identitas Person mereka."
      },
      {
        subtitle: "b. Pemberian Role (Multirole antar Ponpes)",
        text: "Aplikasi memisahkan antara Role Global dan Role per-Ponpes (Tenant). Jika seseorang (misal: Guru) terdaftar dan bertugas di Ponpes A dan Ponpes B, maka ia dapat diberikan Role yang berbeda di masing-masing ponpes.",
        list: [
          "Contoh: Di Ponpes A ia bertindak sebagai Pengurus (Admin), namun saat login dan beralih dashboard/sesi ke Ponpes B, ia berstatus murni sebagai Guru."
        ]
      },
      {
        subtitle: "c. Pembuatan Role",
        text: "Superadmin dapat melakukan Pembuatan Role baru disesuaikan dengan kebutuhan struktur kemengurusan ponpes, misal: Role Admin Presensi, Penjaga Keamanan, Pengurus Dapur."
      }
    ]
  },
  {
    id: 4,
    title: "4. Role dan Permission",
    subtitle: "Penjelasan Resource, Halaman, dan Widget",
    icon: ShieldCheck,
    content: [
      {
        text: "Sistem menggunakan Filament Shield / Permissions berbasis spatie untuk otoritas akses. Setelah merancang Role, administrator bisa mengonfigurasi Permission secara granular."
      },
      {
        list: [
          "Resource: Memberikan hak untuk mengakses menu data utama (seperti santri, guru, jadwal). Di dalamnya bisa diatur hak akses spesifik (bisa Create, Read, Update, Delete).",
          "Halaman (Pages): Hak akses untuk membuka halaman custom tertentu di luar operasi CRUD standar (misalnya: halaman Laporan Presensi, halaman Rekap Data).",
          "Widget: Pengaturan hak akses ini membatasi siapa saja yang berhak melihat widget statistik atau grafik tertentu di halaman Dashboard utama mereka."
        ]
      }
    ]
  },
  {
    id: 5,
    title: "5. Mutasi Santri, Guru, dan Pengurus",
    icon: ArrowRightLeft,
    content: [
      {
        text: "Proses pemindahan (Mutasi) dan pengaturan status dilakukan melalui modul pengawasan data Person."
      },
      {
        list: [
          "Nonaktifkan: Jika santri/guru/pengurus selesai masa studinya, selesai bertugas sementara waktu, mereka bisa di-nonaktifkan. Status akan berubah, namun riwayat data tetap tersimpan.",
          "Blacklist: Digunakan untuk memberhentikan individu dengan riwayat pelanggaran berat. Mereka yang masuk ke dalam Blacklist akan dicegah jika mencoba didaftarkan ulang di ponpes manapun.",
          "Mutasi Langsung ke Ponpes Lain: Sistem memungkinkan transfer Person dari Ponpes A ke Ponpes B. Setelah proses ini, data person di ponpes asal akan dinonaktifkan dan akan berpindah ternaungi ke ponpes tujuan baru, membawa rekam jejak dan ID identitas yang sama."
        ]
      }
    ]
  },
  {
    id: 6,
    title: "6. Resource Santri",
    icon: GraduationCap,
    content: [
      {
        text: "Menu khusus untuk menangani dan memantau status santri."
      },
      {
        list: [
          "Data: Menyajikan seluruh biodata, status, plotting kelas, kelompok, asrama, dan ruang makan.",
          "Mutasi: Tombol akses cepat (Action) untuk mengajukan perpindahan santri antar kelas/kelompok/asrama dan ruang makan.",
          "Cetak: Fitur untuk melakukan pencetakan berkas santri seperti, biodata, cocard dan stiker identitas."
        ]
      }
    ]
  },
  {
    id: 7,
    title: "7. Resource Guru dan Pengurus",
    icon: Briefcase,
    content: [
      {
        text: "Halaman menu direktori seluruh tenaga pendidik (Guru) dan tenaga kependidikan (Pengurus)."
      },
      {
        list: [
          "Data: Menampilkan informasi biodata guru dan pengurus, serta status aktif mereka di ponpes terkait."
        ]
      }
    ]
  },
  {
    id: 8,
    title: "8. Resource Kelas, Kelompok, Asrama, dan Ruang Makan",
    icon: Building,
    content: [
      {
        text: "Pengelolaan sumber daya fisik (Spatial) dan akademik pesantren."
      },
      {
        list: [
          "Data Struktur: Membuat master data Kelas (Pengajian), Kelompok, Asrama, dan Ruang Makan.",
          "Plotting: Proses menempatkan (assign) santri ke spesifik Kelas/Kelompok/Asrama/Ruang Makan.",
          "Mutasi Akademik & Zonasi: Pemindahan massal atau individual santri dari Kelas 1 ke Kelas 2, pemindahan kelompok santri, pemindahan kamar Asrama, atau pengalihan ruang makan."
        ]
      }
    ]
  },
  {
    id: 9,
    title: "9. Jadwal Pengajian, Makan, dan Keluar",
    icon: CalendarClock,
    content: [
      {
        text: "Fitur penjadwalan yang sangat esensial sebagai basis perhitungan validitas Presensi Mesin Tap."
      },
      {
        list: [
          "Konsep: Setiap aktivitas santri memiliki titik-titik waktu wajib. Admin mendefinisikan sesi 'Jadwal Pengajian', 'Jadwal Makan', dan limit waktu 'Keluar/Masuk' gerbang.",
          "Cara Assign: Jadwal dapat di-assign kepada spesifik entitas, apakah itu berlaku Global untuk seluruh santri, spesifik untuk Kelas/Kelompok tertentu, atau khusus Asrama tertentu. Ini memungkinkan jadwal yang sangat dinamis antar asrama."
        ]
      }
    ]
  },
  {
    id: 10,
    title: "10. Mesin Tap (Konfigurasi & Filtering)",
    icon: Cpu,
    content: [
      {
        text: "Integrasi fisik dengan Mesin Presensi (Tap RFID)."
      },
      {
        list: [
          "Konfigurasi: Pendaftaran Serial Number mesin tap yang terpasang di area ponpes. Pengaturan fungsi action dari mesin (apakah mesin ini khusus untuk Presensi Makan, Presensi Mengaji, atau Mesin Gerbang Keluar Masuk).",
          "Filtering: Mengatur rule agar tidak semua kartu/identitas direspon oleh mesin. Contoh: Mesin Tap Asrama Putri hanya boleh menerima tap dari Santri Putri, selain itu akan ditolak."
        ]
      }
    ]
  },
  {
    id: 11,
    title: "11. Mesin Tap Switch",
    icon: ToggleRight,
    content: [
      {
        text: "Fitur untuk mengganti mode operasi mesin tap secara manual menggunakan smartcard yang terdaftar khusus di aplikasi tanpa harus mengubah konfigurasi perangkat melalui dasbor aplikasi."
      }
    ]
  },
  {
    id: 12,
    title: "12. Manajemen Presensi",
    icon: ClipboardCheck,
    content: [
      {
        text: "Modul pemantauan lalu lintas presensi dari input mesin maupun input manual (petugas)."
      },
      {
        list: [
          "Presensi Pengajian Santri: Data harian santri yang hadir pengajian.",
          "Presensi Makan: Terhubung dengan jatah makan. Validasi apakah santri sudah mengambil jatah makannya atau belum.",
          "Presensi Keluar (Gate): Rekam jejak jam keluar ponpes dan jam kembali ke ponpes.",
          "Presensi Guru: Kehadiran absensi bagi tenaga pendidik/pengurus ponpes.",
          "Saldo Makan: Berbasis masa berlaku (expiry date). Santri tidak dapat melakukan tap makan jika tanggal saldo telah berakhir kecuali telah dilakukan pengisian ulang oleh petugas."
        ]
      }
    ]
  },
  {
    id: 13,
    title: "13. Rekap Santri (Rekapitulasi Presensi)",
    icon: PieChart,
    content: [
      {
        text: "Fitur kalkulasi presentase kehadiran."
      },
      {
        subtitle: "Cara Merekap:",
        text: "Petugas/Wali Kelas dapat memilih filter Rentang Tanggal lalu filtering santri yang akan direkap. Sistem akan secara otomatis mengakumulasi log presensi, hadir, terlambat, alfa, izin, sakit, dan sambang, lalu menampilkan persentase kehadiran bulanan santri dalam format tabel reportase maupun export file yang siap dicetak."
      }
    ]
  },
  {
    id: 14,
    title: "14. Perizinan Sambang",
    icon: DoorOpen,
    content: [
      {
        text: "Fitur administrasi perizinan sambang."
      },
      {
        list: [
          "Pengajuan sampai Mulai Sambang: Santri bisa mengajukan jadwal Sambang pada tanggal tertentu melalu petugas. Petugas lalu memvalidasi/Acc. Saat jadwal hari H, santri datang meminta surat sambang dan petugas mengklik \"Mulai Sambang\" maka akan terekam sistem.",
          "Lock Data (Tidak bisa Dimutasi): Saat status Santri sedang dalam proses Perizinan Sambang yang masih aktif berjalan, maka operasi administratif seperti Mutasi Santri akan Terkunci Otomatis (Blocked). Mekanisme ini mencegah anomali data (misal santri dimutasi saat sedang sambang)."
        ]
      }
    ]
  },
  {
    id: 15,
    title: "15. Perizinan Pengajian (Izin Ketidakhadiran)",
    icon: FileText,
    content: [
      {
        text: "Sistem perizinan bagi mereka yang berhalangan hadir ke kelas/pengajian."
      },
      {
        list: [
          "Lewat Aplikasi: Pengurus mencatatkan santri sakit atau izin. Sesi pengajian pada rentang izin akan otomatis berstatus (\"I / S\" - Izin / Sakit).",
          "Lewat Mesin Tap Khusus: Admin bisa mengatur satu mesin khusus di area ponpes, ketika santri nge-tap, sistem secara instan akan memvalidasi status lognya menjadi Izin tanpa harus input manual form aplikasi."
        ]
      }
    ]
  },
  {
    id: 16,
    title: "16. Pendaftaran Tes Kediri dan Kertosono",
    icon: MapPin,
    content: [
      {
        subtitle: "A. Alur Tes Kediri",
        list: [
          "Pendaftaran Kuota: Ponpes mengajukan kuota untuk jumlah peserta tes.",
          "Tambah Peserta: Pendaftaran dan melengkapi data santri yang dipilih untuk dimasukkan ke dalam kuota.",
          "Laporan Kedatangan: Melakukan laporan perkiraan kedatangan rombongan tiba di Kediri."
        ]
      },
      {
        subtitle: "B. Alur Tes Kertosono",
        list: [
          "Pendaftaran: Penetapan gelombang atau sesi tes oleh pusat/penyelenggara.",
          "Tambah Peserta: Pendaftaran dan melengkapi data santri yang dipilih untuk dimasukkan ke dalam kuota."
        ]
      }
    ]
  }
];
