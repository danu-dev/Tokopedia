<template>
  <section class="relative mt-4 px-4 md:px-0">
    <div class="relative h-[160px] sm:h-[240px] md:h-[350px] w-full rounded-[20px] md:rounded-[32px] overflow-hidden shadow-lg border border-gray-100">

      <transition name="fade" mode="out-in">
        <div
          :key="currentIndex"
          :class="['absolute inset-0 flex items-center px-6 md:px-20 text-white transition-all duration-700', banners[currentIndex].bgClass]"
        >
          <div class="z-10 flex flex-col justify-center w-full max-w-[70%] md:max-w-xl text-left">
            <span class="mb-1.5 w-fit rounded bg-black/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider backdrop-blur-md md:text-[10px]">
              {{ banners[currentIndex].tag }}
            </span>

            <h2 class="text-sm sm:text-xl md:text-4xl font-black leading-tight tracking-tight mb-1 md:mb-3">
              <span>{{ banners[currentIndex].titleShort }}</span>
              <span class="hidden md:inline">{{ banners[currentIndex].titleLong }}</span>
            </h2>

            <p class="text-[9px] md:text-base font-medium opacity-70 line-clamp-1 md:line-clamp-none mb-3 md:mb-6 max-w-md">
              {{ banners[currentIndex].description }}
            </p>

            <div v-if="banners[currentIndex].id === 1" class="flex items-center gap-1.5 mb-4 md:mb-8">
              <div class="flex gap-1">
                <div v-for="(unit, i) in countdownUnits" :key="i" class="flex items-center">
                  <span class="bg-white/20 rounded px-1.5 py-0.5 text-[9px] md:text-lg font-mono font-bold">
                    {{ unit }}
                  </span>
                  <span v-if="i < 2" class="mx-0.5 opacity-30 text-[9px]">:</span>
                </div>
              </div>
            </div>

            <button class="w-fit bg-white text-gray-900 px-4 py-1.5 md:px-10 md:py-3.5 rounded-lg md:rounded-2xl text-[9px] md:text-sm font-black shadow-sm active:scale-95 transition-all">
              Cek Sekarang
            </button>
          </div>

          <div class="absolute -right-4 -bottom-4 md:right-10 md:bottom-auto opacity-5 md:opacity-20 pointer-events-none rotate-12 transition-transform duration-1000 group-hover:scale-110">
            <component :is="iconMap[banners[currentIndex].iconName]" class="h-32 w-32 md:h-[450px] md:w-[450px] stroke-[1px]" />
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { GiftIcon, SparklesIcon, TicketIcon } from '@heroicons/vue/24/outline'

// IMPORT DATA DARI FILE JSON
import bannerData from '../../data/banners.json'

const iconMap = { GiftIcon, SparklesIcon, TicketIcon }
const banners = ref(bannerData) // Gunakan data dari file JSON
const currentIndex = ref(0)
const countdownInSeconds = ref(7200)
let slideTimer = null
let countdownTimer = null

const countdownUnits = computed(() => {
  const h = Math.floor(countdownInSeconds.value / 3600)
  const m = Math.floor((countdownInSeconds.value % 3600) / 60)
  const s = countdownInSeconds.value % 60
  return [String(h).padStart(2, '0'), String(m).padStart(2, '0'), String(s).padStart(2, '0')]
})

onMounted(() => {
  // Timer ganti slide
  slideTimer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % banners.value.length
  }, 5000)

  // Timer countdown
  countdownTimer = setInterval(() => {
    if (countdownInSeconds.value > 0) countdownInSeconds.value--
  }, 1000)
})

onUnmounted(() => {
  clearInterval(slideTimer)
  clearInterval(countdownTimer)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
