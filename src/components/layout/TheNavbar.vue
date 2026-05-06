<template>
  <nav class="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
    <div class="mx-auto flex max-w-7xl items-center gap-8 px-4 py-4">
      <RouterLink
        to="/"
        class="text-2xl font-black tracking-tighter text-green-600 transition-transform hover:scale-105 active:scale-95"
      >
        tokopedia
      </RouterLink>

      <div class="relative hidden lg:block">
        <button
          class="flex items-center gap-1 text-sm font-semibold text-gray-600 transition-colors hover:text-green-600"
          @click="isCategoryOpen = !isCategoryOpen"
        >
          Kategori
          <ChevronDownIcon :class="['h-4 w-4 transition-transform duration-300', isCategoryOpen ? 'rotate-180' : '']" />
        </button>

        <div
          v-if="isCategoryOpen"
          class="absolute left-0 top-full z-50 mt-3 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl"
        >
          <a
            v-for="cat in ['Gadget', 'Komputer', 'Fashion']"
            :key="cat"
            href="#"
            class="block rounded-xl px-4 py-2.5 text-sm text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
          >
            {{ cat }}
          </a>
        </div>
      </div>

      <div class="group relative flex-1">
        <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-green-500" />
        <input
          type="text"
          placeholder="Cari di Tokopedia"
          :value="modelValue"
          @input="onSearchInput"
          class="w-full rounded-xl border-none bg-gray-100 py-2.5 pl-10 pr-4 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20"
        />
      </div>

      <div class="flex items-center gap-3 md:gap-5">
        <RouterLink
          to="/wishlist"
          class="relative rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <HeartIcon class="h-6 w-6 text-gray-600" />
          <span
            v-if="store.wishlist.length > 0"
            class="absolute right-1 top-1 rounded-full border-2 border-white bg-red-500 px-1 text-[8px] text-white"
          >
            {{ store.wishlist.length }}
          </span>
        </RouterLink>

        <div class="relative cursor-pointer group" @click="emit('open-cart')">
          <ShoppingCartIcon class="h-6 w-6 text-gray-600 transition-colors group-hover:text-green-600" />
          <span
            v-if="cartCount > 0"
            class="absolute -right-1.5 -top-1.5 rounded-full border-2 border-white bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white"
          >
            {{ cartCount }}
          </span>
        </div>

        <div class="hidden h-6 w-[1px] bg-gray-200 md:block"></div>

        <div v-if="isLoggedIn" class="relative hidden cursor-pointer items-center gap-3 md:flex group">
          <div class="flex items-center gap-2 rounded-full p-1 pr-3 transition-all hover:bg-gray-50">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#00AA5B] text-sm font-bold text-white">
              {{ authName[0] }}
            </div>
            <span class="text-xs font-bold text-gray-700">{{ authName }}</span>
          </div>

          <div class="absolute right-0 top-full z-50 mt-2 hidden w-48 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl group-hover:block">
            <RouterLink to="/orders" class="block rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
              Daftar Transaksi
            </RouterLink>
            <RouterLink to="/wishlist" class="block rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
              Wishlist
            </RouterLink>
            <div class="my-1 border-t border-gray-50"></div>
            <button
              class="w-full rounded-xl px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50"
              @click="store.logout()"
            >
              Keluar
            </button>
          </div>
        </div>

        <div v-else class="hidden gap-3 md:flex">
          <button
            class="rounded-xl border-2 border-green-600 px-5 py-2 text-sm font-bold text-green-600 transition-all hover:bg-green-50 active:scale-95"
            @click="emit('open-login')"
          >
            Masuk
          </button>
          <button
            class="rounded-xl bg-green-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 hover:bg-green-700 active:scale-95"
            @click="emit('open-register')"
          >
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
import { ChevronDownIcon, HeartIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { store } from '../../store'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  cartCount: {
    type: Number,
    default: 0
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  authName: {
    type: String,
    default: 'Toppers'
  }
})

const emit = defineEmits(['update:modelValue', 'open-cart', 'open-login', 'open-register'])

const isCategoryOpen = ref(false)

const onSearchInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
