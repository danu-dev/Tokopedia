<template>
  <nav class="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
    <div class="mx-auto flex max-w-7xl items-center gap-2 md:gap-8 px-4 py-3 md:py-4">

      <RouterLink
        to="/"
        class="hidden sm:block text-xl md:text-2xl font-black tracking-tighter text-green-600 shrink-0"
      >
        tokopedia
      </RouterLink>

      <div class="group relative flex-1">
        <MagnifyingGlassIcon
          class="absolute left-3 top-2.5 h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-green-500"
        />
        <input
          type="text"
          placeholder="Cari di Tokopedia"
          class="w-full rounded-xl border-none bg-gray-100 py-2 md:py-2.5 pl-9 md:pl-10 pr-4 text-xs md:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
        />
      </div>

      <div class="flex items-center gap-2 md:gap-5 shrink-0">

        <template v-if="isLoggedIn">
          <RouterLink
            to="/wishlist"
            class="relative rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <HeartIcon class="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
            <span v-if="store.wishlist.length > 0" class="absolute right-0 top-0 md:right-1 md:top-1 rounded-full border-2 border-white bg-red-500 px-1 text-[8px] text-white">
              {{ store.wishlist.length }}
            </span>
          </RouterLink>

          <div
            class="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
            @click="emit('open-cart')"
          >
            <ShoppingCartIcon class="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
          </div>

          <div class="hidden md:flex items-center gap-2 border-l pl-5 ml-2 border-gray-200">
            <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">
              {{ authName[0] }}
            </div>
            <span class="text-xs font-bold text-gray-700">{{ authName }}</span>
          </div>
        </template>

        <template v-else>
          <div class="flex items-center gap-2">
            <button
              @click="emit('open-login')"
              class="rounded-lg border-2 border-green-600 px-4 py-1.5 md:px-5 md:py-2 text-[11px] md:text-sm font-bold text-green-600 transition-all hover:bg-green-50 active:scale-95 shrink-0"
            >
              Masuk
            </button>

            <button
              @click="emit('open-register')"
              class="hidden md:block rounded-lg bg-green-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all active:scale-95 shrink-0"
            >
              Daftar
            </button>
          </div>
        </template>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/24/outline";
import { store } from "../../store";

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  cartCount: {
    type: Number,
    default: 0,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  authName: {
    type: String,
    default: "Toppers",
  },
});

const emit = defineEmits([
  "update:modelValue",
  "open-cart",
  "open-login",
  "open-register",
]);

const onSearchInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
