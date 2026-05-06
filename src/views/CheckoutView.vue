<template>
  <div class="mx-auto max-w-5xl px-4 py-10">
    <h1 class="mb-8 text-2xl font-black text-gray-900">Checkout</h1>

    <div v-if="store.cart.length > 0" class="flex flex-col gap-8 lg:flex-row">
      <div class="flex-1 space-y-6">
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 class="mb-4 flex items-center gap-2 font-bold text-gray-800">
            <MapPinIcon class="h-5 w-5 text-green-600" />
            Alamat Pengiriman
          </h3>
          <div class="border-t pt-4">
            <p class="font-bold text-gray-800">Rumah Utama (Budi Utomo)</p>
            <p class="mt-1 text-sm text-gray-500">0812-3456-7890</p>
            <p class="text-sm text-gray-500">Jl. Teknologi Raya No. 404, Kota Coding, Jawa Tengah</p>
          </div>
          <button class="mt-4 rounded-lg border border-green-600 px-4 py-2 text-xs font-bold text-green-600 transition-all hover:bg-green-50">
            Pilih Alamat Lain
          </button>
        </div>

        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 class="mb-4 font-bold text-gray-800">Pesanan Kamu</h3>
          <div class="space-y-6">
            <div v-for="item in store.cart" :key="item.id" class="flex gap-4">
              <img :src="item.image" :alt="item.title" class="h-16 w-16 rounded-xl object-cover" />
              <div class="flex-1">
                <h4 class="line-clamp-1 text-sm font-bold text-gray-800">{{ item.title }}</h4>
                <p class="text-xs text-gray-500">{{ item.quantity }} barang x Rp{{ item.price.toLocaleString('id-ID') }}</p>
              </div>
              <p class="font-bold text-gray-900">Rp{{ (item.price * item.quantity).toLocaleString('id-ID') }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:w-[350px]">
        <div class="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
          <h3 class="mb-6 font-bold text-gray-800">Ringkasan Belanja</h3>

          <div class="space-y-3 border-b pb-4 text-sm">
            <div class="flex justify-between text-gray-500">
              <span>Total Harga ({{ totalItems }} barang)</span>
              <span>Rp{{ totalPrice.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Total Ongkos Kirim</span>
              <span class="line-through">Rp20.000</span>
            </div>
            <div class="flex justify-between font-medium italic text-green-600">
              <span>Promo Bebas Ongkir</span>
              <span>-Rp20.000</span>
            </div>
          </div>

          <div class="flex items-center justify-between py-6">
            <span class="font-bold text-gray-800">Total Tagihan</span>
            <span class="text-xl font-black text-gray-900">Rp{{ totalPrice.toLocaleString('id-ID') }}</span>
          </div>

          <button
            class="w-full rounded-2xl bg-[#00AA5B] py-4 text-lg font-bold text-white shadow-lg shadow-green-600/20 transition-all hover:bg-[#009650] active:scale-95"
            @click="processPayment"
          >
            Pilih Pembayaran
          </button>
        </div>
      </div>
    </div>

    <div v-else class="rounded-3xl border border-dashed border-gray-200 bg-white py-20 text-center">
      <h2 class="text-xl font-black text-gray-900">Keranjang Kosong</h2>
      <p class="mt-2 text-sm text-gray-500">Tambahkan produk dulu sebelum checkout.</p>
      <RouterLink to="/" class="mt-6 inline-block rounded-xl bg-[#00AA5B] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#009650]">
        Belanja Sekarang
      </RouterLink>
    </div>

    <div v-if="isPaid" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
      <div class="w-full max-w-sm rounded-[40px] bg-white p-10 text-center">
        <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckBadgeIcon class="h-12 w-12 text-green-600" />
        </div>
        <h2 class="mb-2 text-2xl font-black text-gray-900">Pembayaran Berhasil!</h2>
        <p class="mb-8 text-gray-500">Horee! Pesananmu sedang disiapkan dan akan segera dikirim.</p>
        <AppButton variant="primary" class="w-full" @click="finishCheckout">
          Lihat Daftar Transaksi
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { CheckBadgeIcon, MapPinIcon } from '@heroicons/vue/24/solid'
import { store } from '../store'
import AppButton from '../components/ui/AppButton.vue'

const router = useRouter()
const isPaid = ref(false)

const totalItems = computed(() => store.cart.reduce((sum, item) => sum + item.quantity, 0))
const totalPrice = computed(() => store.cart.reduce((sum, item) => sum + item.price * item.quantity, 0))

const processPayment = () => {
  if (store.cart.length === 0) return
  store.processCheckout()
  isPaid.value = true
}

const finishCheckout = () => {
  isPaid.value = false
  router.push({ name: 'orders' })
}
</script>
