<template>
  <div v-if="isOpen" @click="emit('close')" class="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60]"></div>

  <aside 
    :class="[
      'fixed top-0 right-0 h-full w-full md:w-[380px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col',
      isOpen ? 'translate-x-0' : 'translate-x-full'
    ]"
  >
    <div class="p-5 flex justify-between items-center border-b border-gray-100">
      <h2 class="text-lg font-bold text-gray-800">Keranjang Belanja ({{ totalItems }})</h2>
      <button @click="emit('close')" class="p-1 hover:bg-gray-100 rounded-lg">
        <XMarkIcon class="h-6 w-6 text-gray-400" />
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-5 space-y-5">
      <div v-if="items.length === 0" class="py-20 text-center">
        <p class="text-sm font-medium text-gray-400">Wah, keranjangmu masih kosong nih.</p>
      </div>

      <div v-for="(item, index) in items" :key="item.id" class="flex gap-3">
        <img :src="item.image" class="h-16 w-16 rounded-lg object-cover bg-gray-50" />
        <div class="flex-1 flex flex-col">
          <div>
            <h4 class="text-sm font-bold text-gray-800 line-clamp-1">{{ item.title }}</h4>
            <p class="text-[#00AA5B] font-bold text-sm mt-1">Rp{{ item.price.toLocaleString('id-ID') }}</p>
          </div>

          <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center overflow-hidden rounded-lg border border-gray-200">
              <button
                class="px-2 py-1 text-gray-500 hover:bg-gray-100"
                @click="emit('decrease', index)"
              >
                -
              </button>
              <span class="border-x border-gray-200 px-3 text-xs font-bold text-gray-700">{{ item.quantity }}</span>
              <button
                class="px-2 py-1 font-bold text-[#00AA5B] hover:bg-gray-100"
                @click="emit('increase', index)"
              >
                +
              </button>
            </div>
            <button @click="emit('remove', index)" class="text-[11px] text-red-500 hover:underline">Hapus</button>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4" v-if="items.length > 0">
      <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-inner">
        <div class="flex justify-between items-center mb-6 px-1">
          <span class="text-gray-400 text-sm font-medium">Total Harga:</span>
          <span class="text-xl font-black text-gray-900">Rp{{ totalPrice.toLocaleString('id-ID') }}</span>
        </div>
        <AppButton
          variant="primary"
          class="w-full py-3.5 text-base shadow-xl shadow-green-600/20"
          @click="goToCheckout"
        >
          Beli Sekarang ({{ items.length }})
        </AppButton>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import AppButton from '../ui/AppButton.vue'

const props = defineProps(['isOpen', 'items'])
const emit = defineEmits(['close', 'remove', 'increase', 'decrease'])
const router = useRouter()

const totalItems = computed(() => props.items.reduce((sum, item) => sum + item.quantity, 0))
const totalPrice = computed(() => props.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))

const goToCheckout = () => {
  if (props.items.length === 0) return
  emit('close')
  router.push({ name: 'checkout' })
}
</script>
