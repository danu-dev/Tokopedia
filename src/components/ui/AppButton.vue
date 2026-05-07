<template>
  <button :class="[
    // Base Classes: Padding & Font Size dibuat responsif
    'px-4 py-1.5 md:px-6 md:py-2.5 rounded-lg md:rounded-xl font-black md:font-bold transition-all cursor-pointer active:scale-95 shadow-sm text-[10px] md:text-sm tracking-tight',

    // Variant Logic
    variant === 'primary' ? 'bg-green-600 text-white hover:bg-green-700' : '',
    variant === 'outline' ? 'border-2 border-green-600 text-green-600 hover:bg-green-50' : '',
    variant === 'white' ? 'bg-white text-green-600 hover:bg-gray-50 shadow-lg' : ''
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
