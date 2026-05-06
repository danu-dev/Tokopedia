<template>
  <div
    class="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    @click="emit('open-detail')"
  >
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <img :src="image" :alt="title" class="h-full w-full object-cover" />
      <button
        class="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-md transition-all active:scale-90"
        @click.stop="toggleWishlist"
      >
        <HeartIcon :class="['h-5 w-5 transition-colors', isWishlisted ? 'fill-current text-red-500' : 'text-gray-400']" />
      </button>
    </div>

    <div class="flex flex-1 flex-col p-4">
      <h3 class="mb-1 line-clamp-2 text-sm leading-snug text-gray-700">{{ title }}</h3>
      <p class="mb-3 text-base font-bold text-gray-900">Rp{{ price.toLocaleString('id-ID') }}</p>

      <div class="mb-4 mt-auto flex flex-col gap-1">
        <div class="flex items-center text-[11px] text-gray-400">
          <MapPinIcon class="mr-1 h-3 w-3" />
          <span>{{ location }}</span>
        </div>
        <div class="flex items-center text-[11px] text-gray-400">
          <StarIcon class="mr-1 h-3 w-3 fill-current text-yellow-400" />
          <span class="font-bold text-gray-600">{{ rating }}</span>
          <span class="mx-1">|</span>
          <span>Terjual {{ sold }}+</span>
        </div>
      </div>

      <button
        class="w-full rounded-xl bg-[#00AA5B] py-2 text-xs font-bold text-white transition-colors hover:bg-[#009650]"
        @click.stop="emit('add-to-cart')"
      >
        + Keranjang
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { HeartIcon, MapPinIcon, StarIcon } from '@heroicons/vue/24/solid'
import { store } from '../../store'

const props = defineProps(['id', 'title', 'price', 'image', 'location', 'rating', 'sold', 'category'])
const emit = defineEmits(['add-to-cart', 'open-detail'])

const isWishlisted = computed(() => store.isInWishlist(props.id))

const toggleWishlist = () => {
  store.toggleWishlist({
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image,
    location: props.location,
    rating: props.rating,
    sold: props.sold,
    category: props.category
  })
}
</script>
