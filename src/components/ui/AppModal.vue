<template>
  <Transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="emit('close')"></div>

      <div
        class="relative w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-2xl transition-all duration-300"
      >
        <div class="p-8">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-2xl font-black text-gray-900">
              <slot name="title" />
            </h3>
            <button class="rounded-full p-2 hover:bg-gray-100" @click="emit('close')">
              <XMarkIcon class="h-6 w-6 text-gray-400" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'

defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
</script>
