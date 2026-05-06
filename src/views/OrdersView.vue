<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <h1 class="mb-8 text-2xl font-black text-gray-900">Daftar Transaksi</h1>

    <div v-if="store.orders.length === 0" class="rounded-[32px] bg-gray-50 py-20 text-center">
      <p class="text-gray-500">Belum ada transaksi. Ayo mulai belanja!</p>
      <RouterLink to="/" class="mt-4 block font-bold text-[#00AA5B]">Cari Produk</RouterLink>
    </div>

    <div v-else class="space-y-6">
      <div v-for="order in store.orders" :key="order.id" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-gray-800">Belanja • {{ order.date }}</span>
            <span class="rounded bg-green-100 px-2 py-0.5 text-[10px] font-black text-[#00AA5B]">{{ order.status }}</span>
          </div>
          <span class="text-[10px] text-gray-400">INV/{{ order.id }}</span>
        </div>

        <div v-for="item in order.items" :key="`${order.id}-${item.id}`" class="mb-4 flex gap-4">
          <img :src="item.image" :alt="item.title" class="h-14 w-14 rounded-xl object-cover" />
          <div class="flex-1">
            <h4 class="text-sm font-bold text-gray-800">{{ item.title }}</h4>
            <p class="text-xs text-gray-400">{{ item.quantity }} barang x Rp{{ item.price.toLocaleString('id-ID') }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between border-t border-gray-50 pt-4">
          <div>
            <p class="text-xs text-gray-400">Total Belanja</p>
            <p class="font-black text-gray-900">Rp{{ order.totalPrice.toLocaleString('id-ID') }}</p>
          </div>
          <button class="rounded-xl bg-[#00AA5B] px-6 py-2 text-xs font-bold text-white hover:bg-[#009650]">Beli Lagi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { store } from '../store'
</script>
