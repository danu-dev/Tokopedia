<template>
  <Transition
    enter-active-class="transform transition ease-out duration-300"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="pointer-events-auto fixed top-20 right-4 z-[100] w-full max-w-sm overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
    >
      <div class="flex items-center gap-3 p-4">
        <div class="flex-shrink-0 rounded-full bg-green-100 p-2">
          <CheckCircleIcon class="h-6 w-6 text-[#00AA5B]" />
        </div>
        <div class="flex-1">
          <p class="text-sm font-bold text-gray-900">Berhasil!</p>
          <p class="text-xs text-gray-500">{{ message }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  }
})
</script>
