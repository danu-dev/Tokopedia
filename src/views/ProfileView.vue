<template>
  <div class="mx-auto max-w-4xl px-4 py-10">
    <div class="relative mb-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-green-500 to-emerald-700 p-8 text-white shadow-xl">
      <div class="relative z-10 flex flex-col items-center gap-6 md:flex-row">
        <div class="h-24 w-24 overflow-hidden rounded-full border-4 border-white/30 shadow-2xl">
          <img src="https://i.pravatar.cc/150?u=budi" class="h-full w-full object-cover" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-3xl font-black">{{ store.user.name }}</h2>
          <div class="mt-1 flex items-center justify-center gap-2 md:justify-start">
            <span class="rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
              {{ store.user.level }}
            </span>
            <span class="text-xs opacity-80">Join sejak 2024</span>
          </div>
        </div>
        <div class="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
          <p class="mb-1 text-[10px] font-bold uppercase opacity-70">Total Saldo</p>
          <p class="text-xl font-black italic">Rp1.250.000</p>
        </div>
      </div>
      <SparklesIcon class="absolute right-[-20px] top-[-20px] h-48 w-48 rotate-12 text-white/10" />
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div
        v-for="menu in profileMenus"
        :key="menu.title"
        class="group flex cursor-pointer items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:border-green-500"
      >
        <div class="flex items-center gap-4">
          <div :class="['rounded-xl p-3', menu.color]">
            <component :is="menu.icon" class="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 class="text-sm font-bold">{{ menu.title }}</h4>
            <p class="text-xs text-gray-400">{{ menu.desc }}</p>
          </div>
        </div>
        <ChevronRightIcon class="h-5 w-5 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-green-500" />
      </div>
    </div>

    <button
      class="mt-12 w-full rounded-2xl border-2 border-red-100 py-4 font-bold text-red-500 transition-all hover:bg-red-50"
      @click="logout"
    >
      Keluar dari Akun
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  BellIcon,
  ChevronRightIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import { store } from '../store'

const router = useRouter()

const profileMenus = [
  { title: 'Data Diri', desc: 'Nama, Tanggal Lahir, Email', icon: UserIcon, color: 'bg-blue-500' },
  { title: 'Daftar Alamat', desc: 'Atur alamat pengiriman belanjaan', icon: MapPinIcon, color: 'bg-orange-500' },
  { title: 'Keamanan', desc: 'Kata sandi, PIN, Verifikasi', icon: ShieldCheckIcon, color: 'bg-green-500' },
  { title: 'Notifikasi', desc: 'Atur segala jenis pesan masuk', icon: BellIcon, color: 'bg-purple-500' }
]

const logout = () => {
  store.logout()
  router.push({ name: 'home' })
}
</script>
