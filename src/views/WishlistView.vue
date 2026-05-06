<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <div class="mb-8 flex items-center gap-3">
      <HeartIcon class="h-8 w-8 fill-current text-red-500" />
      <h1 class="text-2xl font-black text-gray-900">Wishlist Saya</h1>
    </div>

    <div
      v-if="store.wishlist.length === 0"
      class="rounded-[32px] bg-gray-50 py-20 text-center"
    >
      <div
        class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl"
      >
        <HeartIcon class="h-10 w-10 text-gray-200" />
      </div>
      <p class="font-bold text-gray-500">Belum ada barang impian.</p>
      <AppButton variant="primary" class="mt-4" @click="router.push('/')">Cari Barang</AppButton>
    </div>

    <div v-else class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      <ProductCard
        v-for="product in store.wishlist"
        :key="product.id"
        v-bind="product"
        @open-detail="router.push(`/product/${product.id}`)"
        @add-to-cart="emit('add-to-cart', product)"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { HeartIcon } from '@heroicons/vue/24/solid'
import { store } from '../store'
import ProductCard from '../components/product/ProductCard.vue'
import AppButton from '../components/ui/AppButton.vue'

const emit = defineEmits(['add-to-cart'])
const router = useRouter()
</script>
