<template>
  <section class="relative mt-4 group md:mt-6">
    <div class="relative h-[220px] overflow-hidden rounded-[20px] border border-gray-100 shadow-sm sm:h-[280px] md:h-[380px] md:rounded-[24px]">

      <div
        v-for="(banner, index) in banners"
        :key="banner.id"
        v-show="currentIndex === index"
        :class="['absolute inset-0 flex h-full w-full items-center px-6 text-white transition-all duration-500 md:px-16', banner.bgClass]"
      >
        <div class="z-10 flex h-full max-w-[70%] flex-col justify-center py-4 md:max-w-xl">
          <span class="mb-2 inline-block w-fit rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md md:text-xs">
            {{ banner.tag }}
          </span>

          <h2 class="mb-2 text-xl font-black leading-tight drop-shadow-md sm:text-3xl md:text-5xl">
            {{ banner.title }}
          </h2>

          <p class="mb-4 line-clamp-2 text-[10px] font-medium opacity-90 sm:text-sm md:mb-6 md:text-base md:line-clamp-none">
            {{ banner.description }}
          </p>

          <div v-if="currentIndex === 0" class="mt-1 mb-4 flex items-center gap-2 md:mb-6 md:gap-3">
            <span class="text-[10px] font-bold uppercase tracking-widest opacity-80 md:text-xs">Berakhir dalam:</span>
            <div class="flex gap-2">
              <div
                v-for="unit in countdownUnits"
                :key="unit"
                class="rounded-lg bg-white/20 px-2 py-0.5 font-mono text-sm font-bold backdrop-blur-md sm:px-3 sm:py-1 sm:text-base md:text-lg"
              >
                {{ unit }}
              </div>
            </div>
          </div>

          <div>
            <AppButton variant="white" class="px-4 py-1.5 text-[10px] md:px-8 md:py-3 md:text-sm">
              Cek Sekarang
            </AppButton>
          </div>
        </div>

        <div class="pointer-events-none absolute -right-10 -bottom-10 opacity-30 md:opacity-20">
          <component
            :is="iconMap[banner.iconName]"
            class="h-48 w-48 text-white sm:h-72 sm:w-72 md:h-[500px] md:w-[500px]"
          />
        </div>
      </div>

      <div class="absolute bottom-4 left-6 flex gap-1.5 md:left-16 md:gap-2">
        <div
          v-for="(_, i) in banners"
          :key="i"
          :class="['h-1 rounded-full transition-all duration-300 md:h-1.5', currentIndex === i ? 'w-6 bg-white md:w-8' : 'w-1 bg-white/40 md:w-1.5']"
        ></div>
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
