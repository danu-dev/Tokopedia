<template>
  <section class="mt-6 relative group">
    <div class="relative overflow-hidden rounded-[24px] h-[320px] md:h-[380px] shadow-sm border border-gray-100">

      <div
        v-for="(banner, index) in banners"
        :key="banner.id"
        v-show="currentIndex === index"
        :class="['absolute inset-0 w-full h-full flex items-center px-10 md:px-16 text-white transition-all duration-500', banner.bgClass]"
      >
        <!-- Konten Sisi Kiri -->
        <div class="z-10 flex flex-col justify-center h-full py-10">
          <h2 class="text-3xl md:text-5xl font-extrabold leading-tight mb-3 drop-shadow-sm">
            {{ banner.title }}
          </h2>
          <p class="text-sm md:text-base font-medium opacity-100 max-w-sm mb-6">
            {{ banner.description }}
          </p>

          <div v-if="currentIndex === 0" class="mb-6 mt-1 flex items-center gap-3">
            <span class="text-xs font-bold uppercase tracking-widest opacity-80">Berakhir dalam:</span>
            <div class="flex gap-2">
              <div
                v-for="unit in countdownUnits"
                :key="unit"
                class="rounded-lg bg-white/20 px-3 py-1 font-mono text-lg font-bold backdrop-blur-md"
              >
                {{ unit }}
              </div>
            </div>
          </div>

          <!-- Indikator Slide -->
          <div class="flex gap-2 items-center mb-6">
            <div
              v-for="(_, i) in banners"
              :key="i"
              :class="['h-1.5 transition-all duration-300 rounded-full', currentIndex === i ? 'w-8 bg-white' : 'w-1.5 bg-white/40']"
            ></div>
          </div>

          <!-- Menggunakan AppButton yang sudah diimpor -->
          <div>
            <AppButton variant="white">
              Cek Sekarang
            </AppButton>
          </div>
        </div>

        <!-- Ikon Dekoratif -->
        <div class="absolute -right-10 -bottom-10 opacity-20 pointer-events-none">
          <component
            :is="iconMap[banner.iconName]"
            class="h-[350px] w-[350px] md:h-[500px] md:w-[500px] text-white"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { GiftIcon, SparklesIcon, TicketIcon } from '@heroicons/vue/24/outline'
import bannerData from '../../data/banners.json'

// 1. Impor komponen AppButton agar bisa digunakan
import AppButton from '../ui/AppButton.vue'

const iconMap = { GiftIcon, SparklesIcon, TicketIcon }
const banners = ref(bannerData)
const currentIndex = ref(0)
const countdownInSeconds = ref(2 * 3600 + 45 * 60 + 12)
let slideTimer = null
let countdownTimer = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % banners.value.length
}

const countdownUnits = computed(() => {
  const hours = Math.floor(countdownInSeconds.value / 3600)
  const minutes = Math.floor((countdownInSeconds.value % 3600) / 60)
  const seconds = countdownInSeconds.value % 60

  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0')
  ]
})

onMounted(() => {
  slideTimer = setInterval(nextSlide, 3000)
  countdownTimer = setInterval(() => {
    if (countdownInSeconds.value > 0) {
      countdownInSeconds.value -= 1
    }
  }, 1000)
})

onUnmounted(() => {
  if (slideTimer) clearInterval(slideTimer)
  if (countdownTimer) clearInterval(countdownTimer)
})
</script>
