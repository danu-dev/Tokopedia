<template>
  <footer class="mt-20 border-t border-gray-100 bg-white pb-8 pt-16">
    <div class="mx-auto max-w-7xl px-4">
      <div class="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
        <div class="col-span-2">
          <h2 class="mb-4 text-2xl font-black tracking-tighter text-[#00AA5B]">tokopedia</h2>
          <p class="max-w-xs text-sm leading-relaxed text-gray-500">
            Situs jual beli online terlengkap dengan berbagai pilihan produk berkualitas dan promo menarik setiap
            harinya.
          </p>
        </div>

        <div v-for="group in footerLinks" :key="group.title">
          <h4 class="mb-4 text-sm font-bold text-gray-800">{{ group.title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in group.links" :key="link">
              <a href="#" class="text-sm text-gray-500 transition-colors hover:text-[#00AA5B]">{{ link }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 md:flex-row">
        <p class="text-xs font-medium text-gray-400">&copy; 2026 PT Tokopedia Clone. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600">Pusat Edukasi</a>
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600">Syarat & Ketentuan</a>
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600">Kebijakan Privasi</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const footerLinks = [
  { title: 'Bantuan', links: ['Tokopedia Care', 'Syarat & Ketentuan', 'Kebijakan Privasi'] },
  { title: 'Jual', links: ['Pusat Edukasi Seller', 'Mitra Toppers', 'Daftar Official Store'] },
  { title: 'Beli', links: ['Tagihan & Top Up', 'Tukar Tambah HP', 'Tokopedia Card'] }
]
</script>
