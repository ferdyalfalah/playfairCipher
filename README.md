# 🔐 Playfair Cipher — Cryptographic Console

> **Aplikasi web interaktif** untuk enkripsi dan dekripsi teks menggunakan algoritma **Playfair Cipher** klasik, dilengkapi visualisasi matriks 5×5 dan animasi langkah-langkah kriptografi secara real-time.

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|-------|------------|
| 🔒 **Enkripsi & Dekripsi** | Proses teks menggunakan algoritma Playfair Cipher standar |
| 🔑 **Kustomisasi Key** | Masukkan kata kunci sendiri untuk membangkitkan matriks 5×5 unik |
| 🗂️ **Custom Matrix** | Edit sel matriks secara langsung sesuai kebutuhan |
| 📊 **Visualisasi Matriks** | Tampilan matriks 5×5 dengan highlight sel input, output, dan keduanya |
| 🎞️ **Animasi Langkah** | Navigasi setiap pasangan digraf (pair) beserta penjelasan aturan transformasi |
| 🏹 **Panah Kurva SVG** | Animasi panah melengkung yang menunjukkan pergerakan karakter di matriks |
| 📁 **Upload File .txt** | Dukung enkripsi/dekripsi dari file teks eksternal |
| 🌐 **Dua Bahasa** | Antarmuka tersedia dalam Bahasa Indonesia dan English |
| 📖 **Modal Teori** | Penjelasan lengkap sejarah, struktur matriks, pra-pemrosesan, dan aturan transformasi |

---

## 📚 Tentang Playfair Cipher

**Playfair Cipher** adalah teknik enkripsi simetris manual yang menggunakan metode **substitusi digrafik** (memproses sepasang dua huruf sekaligus). Diciptakan oleh **Sir Charles Wheatstone** pada tahun 1854 dan dipromosikan oleh **Lord Playfair** untuk kepentingan militer Kerajaan Inggris.

### Tiga Aturan Transformasi

```
1. SAME ROW RULE    → Kedua huruf pada baris yang sama  : geser 1 kolom ke kanan (enkripsi)
2. SAME COLUMN RULE → Kedua huruf pada kolom yang sama  : geser 1 baris ke bawah (enkripsi)
3. RECTANGLE RULE   → Huruf pada baris & kolom berbeda  : tukar kolom antar huruf
```

### Pra-pemrosesan Teks
- Semua huruf diubah ke **huruf kapital**
- Huruf **J digabungkan dengan I** (matriks hanya 25 huruf)
- Huruf kembar dalam satu pasangan dipisah dengan **X** (atau **Q** jika hurufnya X)
- Panjang teks disesuaikan menjadi **genap** (tambahkan X atau Q di akhir bila perlu)

---

## 🚀 Cara Menjalankan

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 ke atas
- npm (sudah termasuk dalam instalasi Node.js)

### Instalasi

```bash
# Clone repositori
git clone https://github.com/ferdyalfalah/playfairCipher.git

# Masuk ke folder proyek
cd playfairCipher

# Instal dependencies
npm install
```

### Menjalankan Development Server

```bash
npm run dev
```

Buka browser dan akses: **http://localhost:5173**

### Build untuk Produksi

```bash
npm run build
```

Hasil build tersedia di folder `dist/`.

---

## 🗂️ Struktur Proyek

```
playfairCipher/
├── index.html          # Halaman utama & markup UI
├── src/
│   ├── main.js         # Logika UI, animasi, visualisasi langkah
│   ├── playfair.js     # Implementasi algoritma Playfair Cipher
│   └── style.css       # Design system & styling lengkap
├── vite.config.js      # Konfigurasi Vite bundler
└── package.json        # Metadata & dependencies proyek
```

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| **HTML5** | — | Struktur halaman & markup semantik |
| **CSS3 (Vanilla)** | — | Design system, animasi, glassmorphism |
| **JavaScript (ES Module)** | — | Logika aplikasi tanpa framework |
| **Vite** | ^6.2.0 | Bundler & dev server modern |
| **Google Fonts** | — | DM Sans + JetBrains Mono |
| **SVG** | — | Animasi panah kurva dinamis |

---

## 📖 Cara Penggunaan

1. **Masukkan Key** — Ketik kata kunci (contoh: `MONARCHY`) pada kolom *Cipher Key*
2. **Klik "Apply Key"** — Matriks 5×5 akan dibangkitkan otomatis dari key tersebut
3. **Masukkan Teks** — Ketik pesan pada kolom *Plaintext / Ciphertext*
4. **Pilih Mode** — Klik tombol **Encrypt** atau **Decrypt**
5. **Lihat Hasil** — Hasil enkripsi/dekripsi ditampilkan di bagian bawah
6. **Pelajari Langkahnya** — Gunakan section **Learn by Doing** untuk melihat visualisasi tiap pasangan digraf

### Contoh

| Plaintext | Key | Ciphertext |
|-----------|-----|------------|
| `HELLOWORLD` | `MONARCHY` | (hasil enkripsi) |
| `ATTACK AT DAWN` | `PLAYFAIR` | (hasil enkripsi) |

---

## 📝 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran mata kuliah **Keamanan Informasi**.  
Bebas digunakan sebagai referensi akademis.

---

## 👤 Author

**Ferdy Alfalah**  
GitHub: [@ferdyalfalah](https://github.com/ferdyalfalah)

---

<div align="center">
  <sub>Built with ❤️ using Vanilla JS + Vite</sub>
</div>
