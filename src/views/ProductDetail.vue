<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-6">
      <RouterLink to="/" class="text-sm font-semibold text-[#00AA5B] hover:underline">Kembali ke beranda</RouterLink>
    </div>

    <div class="flex flex-col gap-12 lg:flex-row">
      <div class="lg:w-1/2">
        <div class="sticky top-24">
          <img
            :src="product.image"
            :alt="product.title"
            class="aspect-square w-full rounded-[32px] border border-gray-100 object-cover shadow-lg"
          />
        </div>
      </div>

      <div class="flex flex-col lg:w-1/2">
        <h1 class="mb-2 text-2xl font-black leading-tight text-gray-900 md:text-3xl">{{ product.title }}</h1>

        <div class="mb-6 flex items-center gap-4">
          <div class="flex items-center text-sm font-bold text-gray-700">
            <StarIcon class="mr-1 h-5 w-5 fill-current text-yellow-400" />
            {{ product.rating }}
          </div>
          <span class="text-gray-300">|</span>
          <span class="text-sm text-gray-500">
            Terjual <span class="font-bold text-gray-800">{{ product.sold }}+</span>
          </span>
        </div>

        <div class="mb-8 text-4xl font-black text-gray-900">
          Rp{{ product.price.toLocaleString('id-ID') }}
        </div>

        <div class="mb-8 border-y border-gray-100 py-6">
          <h3 class="mb-2 font-bold text-gray-800">Detail Produk</h3>
          <p class="leading-relaxed text-gray-600">
            Ini adalah deskripsi produk premium yang sangat berkualitas. Barang original 100% dengan garansi resmi.
            Cocok untuk penggunaan profesional maupun sehari-hari. Pengiriman aman menggunakan bubble wrap tebal.
          </p>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <MapPinIcon class="h-5 w-5 text-gray-400" />
            <div>
              <p class="text-xs text-gray-500">Dikirim dari</p>
              <p class="text-sm font-bold text-gray-800">{{ product.location }}</p>
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <AppButton variant="outline" class="flex-1 py-4 text-lg" @click="emit('add-to-cart', product)">
              + Keranjang
            </AppButton>
            <AppButton variant="primary" class="flex-1 py-4 text-lg shadow-xl shadow-green-600/20">
              Beli Langsung
            </AppButton>
          </div>
        </div>
      </div>
    </div>

    <ReviewSection :rating="product.rating" />
  </div>

  <div v-else class="max-w-3xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-black text-gray-900">Produk Tidak Ditemukan</h1>
    <p class="mt-2 text-gray-500">Produk dengan ID {{ id }} tidak tersedia.</p>
    <RouterLink to="/" class="mt-6 inline-block rounded-xl bg-[#00AA5B] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#009650]">
      Kembali ke Beranda
    </RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { MapPinIcon, StarIcon } from '@heroicons/vue/24/solid'
import AppButton from '../components/ui/AppButton.vue'
import ReviewSection from '../components/product/ReviewSection.vue'
import productData from '../data/products.json'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  cart: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-to-cart'])

const product = computed(() => {
  return productData.find((item) => item.id === Number.parseInt(props.id, 10))
})
</script>
