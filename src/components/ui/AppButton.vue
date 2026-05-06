<template>
  <button :class="[
    'px-6 py-2.5 rounded-xl font-bold transition-all cursor-pointer active:scale-95 shadow-sm',
    variant === 'primary' ? 'bg-green-600 text-white hover:bg-green-700' : '',
    variant === 'outline' ? 'border-2 border-green-600 text-green-600 hover:bg-green-50' : '',
    variant === 'white' ? 'bg-white text-[#00AA5B] hover:bg-gray-50 shadow-lg' : ''
  ]">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})
</script>
