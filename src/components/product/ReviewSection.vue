<template>
  <section class="mt-12 border-t border-gray-100 pt-12">
    <h3 class="mb-8 text-xl font-black text-gray-900">Ulasan Pembeli</h3>

    <div class="mb-12 flex flex-col gap-12 md:flex-row">
      <div class="flex items-center gap-6">
        <div class="text-center">
          <div class="text-6xl font-black text-gray-900">{{ rating }}</div>
          <div class="my-2 flex justify-center">
            <StarIcon v-for="item in 5" :key="item" class="h-5 w-5 fill-current text-yellow-400" />
          </div>
          <p class="text-xs font-medium text-gray-400">98% pembeli puas</p>
        </div>

        <div class="min-w-[200px] flex-1 space-y-2">
          <div v-for="item in ratingBars" :key="item.star" class="flex items-center gap-3 text-xs">
            <span class="w-3 font-bold text-gray-500">{{ item.star }}</span>
            <StarIcon class="h-3 w-3 fill-current text-gray-300" />
            <div class="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div class="h-full bg-yellow-400" :style="{ width: item.width }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <div v-for="review in dummyReviews" :key="review.id" class="border-b border-gray-50 pb-8">
        <div class="mb-3 flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
            {{ review.user[0] }}
          </div>
          <div>
            <p class="text-sm font-bold text-gray-800">{{ review.user }}</p>
            <div class="flex gap-0.5">
              <StarIcon
                v-for="item in 5"
                :key="item"
                :class="['h-3 w-3', item <= review.star ? 'fill-current text-yellow-400' : 'text-gray-200']"
              />
            </div>
          </div>
          <span class="ml-auto text-[10px] text-gray-400">{{ review.date }}</span>
        </div>
        <p class="text-sm leading-relaxed text-gray-600">{{ review.comment }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/24/solid'

defineProps({
  rating: {
    type: Number,
    default: 5
  }
})

const ratingBars = [
  { star: 5, width: '85%' },
  { star: 4, width: '10%' },
  { star: 3, width: '2%' },
  { star: 2, width: '2%' },
  { star: 1, width: '1%' }
]

const dummyReviews = [
  {
    id: 1,
    user: 'Budi Santoso',
    star: 5,
    date: '2 hari lalu',
    comment: 'Barangnya ori, packing aman banget pake bubble wrap tebal. Seller fast respon!'
  },
  {
    id: 2,
    user: 'Siti Aminah',
    star: 5,
    date: '1 minggu lalu',
    comment: 'Mantap sesuai deskripsi, langsung dipake kerja enak banget. Pengiriman kilat.'
  }
]
</script>
