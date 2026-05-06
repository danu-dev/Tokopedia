<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-100 bg-white px-2 py-2 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden"
  >
    <RouterLink
      v-for="item in navItems"
      :key="item.name"
      :to="item.path"
      class="flex flex-col items-center gap-1 rounded-xl px-3 py-1 transition-all"
    >
      <component
        :is="isActive(item.path) ? item.activeIcon : item.icon"
        :class="['h-6 w-6', isActive(item.path) ? 'text-green-600' : 'text-gray-400']"
      />
      <span :class="['text-[10px] font-bold', isActive(item.path) ? 'text-green-600' : 'text-gray-400']">
        {{ item.name }}
      </span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  ClipboardDocumentListIcon,
  HeartIcon,
  HomeIcon,
  RectangleGroupIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import {
  ClipboardDocumentListIcon as OrderSolid,
  HeartIcon as HeartSolid,
  HomeIcon as HomeSolid,
  RectangleGroupIcon as FeedSolid,
  UserIcon as UserSolid
} from '@heroicons/vue/24/solid'

const route = useRoute()

const navItems = [
  { name: 'Beranda', path: '/', icon: HomeIcon, activeIcon: HomeSolid },
  { name: 'Feed', path: '/feed', icon: RectangleGroupIcon, activeIcon: FeedSolid },
  { name: 'Wishlist', path: '/wishlist', icon: HeartIcon, activeIcon: HeartSolid },
  { name: 'Transaksi', path: '/orders', icon: ClipboardDocumentListIcon, activeIcon: OrderSolid },
  { name: 'Akun', path: '/profile', icon: UserIcon, activeIcon: UserSolid }
]

const currentPath = computed(() => route.path)

const isActive = (path) => {
  if (path === '/') return currentPath.value === '/'
  return currentPath.value.startsWith(path)
}
</script>
