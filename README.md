# 🛒 Tokopedia Versi Minimalis - Personal Project

Selamat datang di proyek kloning Tokopedia saya! Proyek ini bukan cuma sekadar nyontek tampilan, tapi upaya saya buat "merampingkan" Tokopedia jadi versi yang lebih minimalis, enteng, dan fokus ke fungsi utama tanpa banyak gangguan visual.

Dibuat dengan rasa penasaran pakai **Vue 3 (Vite)** dan **Tailwind CSS**.

---

## 🎨 Kenapa "Minimalis"?

Tokopedia aslinya punya fitur yang super banyak dan padat banget. Di proyek ini, saya coba bawa konsep **"Less is More"**:
- **Desain Clean:** Saya hapus elemen-elemen yang bikin layar sesak (terutama di mobile).
- **Fokus ke User:** Tampilan navbar dan banner saya buat supaya otomatis menyesuaikan diri (anti-over), jadi mata nggak capek ngeliatnya.
- **Warna Segar:** Pakai gradasi hijau yang lebih modern dan nggak terlalu mencolok.

---

## 🔥 Apa Saja yang Bisa Dilakukan?

Walaupun kelihatannya simpel, "jeroannya" sudah saya buat supaya beneran bisa dipakai buat simulasi belanja:

### 1. Navbar yang "Paham" Kondisi
Gak ada lagi drama navbar penuh sesak di HP. Kalau kamu belum login, navbar cuma bakal nampilin pencarian dan tombol Masuk. Begitu login, barulah fitur-fitur "pro" kayak Keranjang dan Wishlist muncul.

### 2. Belanja Gak Takut Hilang (Persistence)
Saya pakai logika *Reactive Store* yang disambungin ke *LocalStorage*. Artinya, kalau kamu nambah barang ke keranjang terus iseng nge-refresh halaman, barangnya nggak bakal hilang. Data belanjaan kamu "nempel" di browser.

### 3. Cari & Urutkan Sesuka Hati
Sistem filternya sudah jalan. Kamu bisa filter barang berdasarkan kategori (Gadget, Elektronik, dll) atau urutin dari yang paling murah sampai paling mahal secara *real-time*.

### 4. Simulasi Bayar & Lacak Paket
Dari keranjang, kamu bisa lanjut ke halaman Checkout, pilih kurir (yang harganya beda-beda), sampai dapet nomor pesanan. Ada juga fitur **Lacak Paket** biar kamu bisa liat status kiriman barang kamu secara visual.

---

## 🛠️ Bahan-Bahan (Tech Stack)

- **Core:** Vue 3 (Composition API) - Biar kodenya rapi dan kenceng.
- **Styling:** Tailwind CSS - Biar responsifnya gampang diatur.
- **Icons:** Heroicons - Biar visualnya konsisten.
- **Logic:** Vue Reactive & LocalStorage - Buat sistem keranjang dan simpan data.

---

## 📂 Isi Folder

- `src/components`: Rumah buat potongan UI kayak Navbar, Banner (Hero), dan tombol-tombol.
- `src/data`: File JSON buat simpan data produk dan banner promonya.
- `src/store`: Otak aplikasinya (keranjang, login, transaksi).
- `src/views`: Halaman utamanya (Home, Detail, Checkout, Orders).

---

## 🚀 Cara Coba di Lokal

1. **Install dulu bahannya:**
   ```bash
   npm install
