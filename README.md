# Rapatku - Aplikasi Pengelolaan Rapat Sederhana

**Rapatku** adalah prototipe aplikasi web berbasis antarmuka modern (HTML5, CSS3 kustom, dan Vanilla JavaScript) untuk membantu perencanaan jadwal pertemuan/rapat, pemantauan kehadiran, kalender agenda bulanan, dan pengelolaan tindak lanjut (action items).

Projek ini dikembangkan berdasarkan rancangan antarmuka Figma dan berjalan langsung pada browser (*client-side prototype*) tanpa memerlukan konfigurasi database server yang kompleks untuk demo awal.

---

## 🚀 Fitur Utama

1. **Autentikasi Pengguna (Client-side Session)**
   - Form login interaktif dengan validasi form & fitur *show/hide password*.
   - Dukungan sesi via `sessionStorage` (sesi tab) atau `localStorage` (*Ingat saya*).
   - Mekanisme proteksi rute (`requireAuth`) pada halaman dashboard.
   - Logout pengguna dan status aktif.

2. **Ringkasan & Statistik Rapat**
   - Menampilkan total rapat bulan berjalan, rapat hari ini, undangan baru, dan jumlah tindak lanjut yang belum selesai.

3. **Daftar & Manajemen Rapat Interaktif**
   - Kartu rapat dengan status *Live* (berlangsung saat ini) dan hitung mundur (*countdown*).
   - Fitur pencarian rapat (*live search filter*) berdasarkan judul, jam, atau ruangan.
   - Informasi detail: waktu, ruangan, dan avatar daftar peserta rapat.

4. **Kalender Rapat Bulanan**
   - Kalender dinamis dengan indikator tanggal diadakannya rapat (`has-event`).
   - Navigasi bulan (maju/mundur) dan penanda hari ini (*current day*).

5. **Tindak Lanjut & To-Do List (Action Items)**
   - Daftar tugas/tindak lanjut hasil rapat lengkap dengan PIC dan batas waktu (*due date*).
   - Interaksi penyelesaian tugas (*checklist* / mark as done) yang otomatis memperbarui statistik ringkasan.
   - Tombol toggle untuk melihat ringkasan 2 tugas teratas atau seluruh tugas.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Semantik dokumen web.
- **CSS3**: Tata letak fleksibel (CSS Grid & Flexbox) serta variabel warna bertema modern.
- **JavaScript (ES6+)**: Manajemen state lokal, rendering DOM dinamis, dan autentikasi berbasis browser storage.
- **Google Fonts**: Tipografi menggunakan font *Inter*.
- **Figma Assets**: Ikon dan ilustrasi pendukung.

---

## 📁 Struktur Projek

```text
Aplikasi-Pengelolaan-Rapat-Sederhana/
├── assets/                  # Aset gambar & ikon halaman login
│   └── dashboard/           # Aset ikon SVG untuk halaman dashboard
├── ASET.md                  # Panduan ekspor aset dari desain Figma
├── auth.js                  # Modul autentikasi & pengelolaan sesi browser
├── dashboard.css            # Styling khusus halaman dashboard
├── dashboard.html           # Halaman utama aplikasi (dashboard)
├── dashboard.js             # Logika interaktif dashboard (kalender, rapat, task)
├── index.html               # Halaman login
├── login.js                 # Handler form login & UI interaktif login
├── style.css                # Styling global dan halaman login
└── README.md                # Dokumentasi proyek
```

---

## 💻 Cara Menjalankan

Karena proyek ini berbasis web statis murni (*client-side*), Anda dapat menjalankannya dengan beberapa cara mudah:

### Cara 1: Menggunakan Local Web Server (Direkomendasikan)
Jika menggunakan Laragon, XAMPP, atau Live Server di VS Code:
1. Pastikan folder proyek berada di direktori web server (misal: `d:/laragon/www/Aplikasi-Pengelolaan-Rapat-Sederhana`).
2. Jalankan Apache / Web Server di Laragon atau ketik perintah CLI sederhana:
   ```bash
   # Alternatif menggunakan Python built-in server:
   python -m http.server 8000
   ```
3. Buka browser dan akses: `http://localhost/Aplikasi-Pengelolaan-Rapat-Sederhana` (atau `http://localhost:8000`).

### Cara 2: Buka Langsung di Browser
- Cukup klik dua kali berkas `index.html` pada File Explorer untuk membuka halaman login.

---

## 🔑 Akun Demo

Gunakan kredensial default berikut untuk masuk:

| Parameter | Kredensial |
|---|---|
| **Email** | `ridho@rapatku.id` |
| **Password** | `rapatku123` |

> 💡 *Catatan:* Anda dapat menambah atau mengubah akun demo di array `USERS` pada berkas [auth.js](file:///d:/laragon/www/Aplikasi-Pengelolaan-Rapat-Sederhana/auth.js).
