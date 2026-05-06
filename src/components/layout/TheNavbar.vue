<template>
  <nav class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center gap-8">
      <RouterLink
        to="/"
        class="text-green-600 font-black text-2xl tracking-tighter hover:scale-105 transition-transform active:scale-95"
      >
        tokopedia
      </RouterLink>

      <div class="relative hidden lg:block">
        <button
          @click="isCategoryOpen = !isCategoryOpen"
          class="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors"
        >
          Kategori
          <ChevronDownIcon :class="['h-4 w-4 transition-transform duration-300', isCategoryOpen ? 'rotate-180' : '']" />
        </button>

        <div v-if="isCategoryOpen" class="absolute top-full left-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 z-50">
          <a v-for="cat in ['Gadget', 'Komputer', 'Fashion']" :key="cat" href="#" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all">
            {{ cat }}
          </a>
        </div>
      </div>

      <div class="flex-1 relative group">
        <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
        <input
          type="text"
          placeholder="Cari di Tokopedia"
          @input="onSearchInput"
          class="w-full bg-gray-100 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
        />
      </div>

      <div class="flex items-center gap-5">
        <div class="relative group cursor-pointer" @click="emit('open-cart')">
          <ShoppingCartIcon class="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors" />
          <span
            v-if="cartCount > 0"
            class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white"
          >
            {{ cartCount }}
          </span>
        </div>

        <div class="h-6 w-[1px] bg-gray-200 hidden md:block"></div>

        <div class="hidden md:flex gap-3">
          <button class="px-5 py-2 text-sm font-bold text-green-600 border-2 border-green-600 rounded-xl hover:bg-green-50 transition-all active:scale-95">
            Masuk
          </button>
          <button class="px-5 py-2 text-sm font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 active:scale-95">
            Daftar
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronDownIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'

defineProps({
  cartCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['search', 'open-cart'])

const isCategoryOpen = ref(false)

const onSearchInput = (event) => {
  emit('search', event.target.value)
}
</script>
