<template>
  <main class="mx-auto max-w-7xl px-4 pb-24 md:pb-20">
    <TheHero />

    <section class="mt-4 pb-4 md:mt-8">
      <div class="-mx-4 flex gap-4 overflow-x-auto px-4 no-scrollbar md:mx-0 md:justify-between md:px-0">
        <div
          v-for="cat in quickLinks"
          :key="cat.name"
          class="group flex min-w-[72px] cursor-pointer flex-col items-center md:min-w-[96px]"
          @click="handleQuickLink(cat)"
        >
          <div
            :class="[
              'flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300',
              isQuickLinkActive(cat)
                ? 'border-green-500 bg-green-50 shadow-md -translate-y-1'
                : 'border-gray-100 bg-white shadow-sm group-hover:-translate-y-1 group-hover:shadow-md'
            ]"
          >
            <component
              :is="cat.icon"
              :class="['h-7 w-7', isQuickLinkActive(cat) ? 'text-green-600' : 'text-gray-400']"
            />
          </div>
          <span
            :class="[
              'mt-2 text-center text-[11px] font-bold leading-tight',
              isQuickLinkActive(cat) ? 'text-green-600' : 'text-gray-600'
            ]"
          >
            {{ cat.name }}
          </span>
        </div>
      </div>
    </section>

    <section ref="productSectionRef" class="my-8 md:my-10">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 class="text-xl font-bold text-gray-800">Rekomendasi Untukmu</h2>
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium text-gray-400">Urutkan:</span>
            <select
              v-model="sortBy"
              class="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 outline-none focus:border-[#00AA5B]"
            >
              <option value="default">Paling Sesuai</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <AppButton
            v-for="cat in categories"
            :key="cat"
            :variant="selectedCategory === cat ? 'primary' : 'outline'"
            class="rounded-full px-8 py-2 text-sm whitespace-nowrap shadow-sm"
            @click="setSelectedCategory(cat)"
          >
            {{ cat }}
          </AppButton>
        </div>
      </div>
    </section>

    <div v-if="isLoading" class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-6">
      <AppSkeleton v-for="item in 12" :key="item" />
    </div>

    <div v-else-if="visibleProducts.length > 0" class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-6">
      <ProductCard
        v-for="product in visibleProducts"
        :key="product.id"
        v-bind="product"
        @open-detail="goToDetail(product.id)"
        @add-to-cart="emit('add-to-cart', product)"
      />
    </div>

    <div v-if="!isLoading && hasMore && visibleProducts.length > 0" class="mt-10 flex justify-center md:mt-12">
      <button
        class="rounded-xl border-2 border-[#00AA5B] px-8 py-3 text-sm font-bold text-[#00AA5B] transition-all hover:bg-green-50 active:scale-95 md:px-10"
        @click="loadMore"
      >
        Muat Lebih Banyak
      </button>
    </div>

    <div v-if="!isLoading && visibleProducts.length === 0" class="rounded-3xl border border-dashed border-gray-200 bg-white py-20 text-center shadow-sm">
      <p class="text-gray-400 font-medium">
        {{
          props.searchQuery
            ? `Yah, produk \"${props.searchQuery}\" tidak ditemukan di kategori ini.`
            : 'Wah, produk di kategori ini belum tersedia.'
        }}
      </p>
      <div class="mt-4 flex items-center justify-center gap-2">
        <AppButton v-if="searchQuery" variant="outline" @click="emit('clear-search')">
          Reset Pencarian
        </AppButton>
        <AppButton variant="outline" @click="setSelectedCategory('Semua')">
          Lihat Semua Produk
        </AppButton>
      </div>
    </div>

    <AppModal :show="isTopUpOpen" @close="isTopUpOpen = false">
      <template #title>Top Up & Tagihan</template>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <button class="rounded-xl border border-gray-200 p-4 text-center transition-colors hover:border-green-500">
            <p class="text-xs font-bold">Pulsa</p>
          </button>
          <button class="rounded-xl border border-gray-200 p-4 text-center transition-colors hover:border-green-500">
            <p class="text-xs font-bold">Listrik PLN</p>
          </button>
        </div>
        <input
          type="number"
          placeholder="Nomor Pelanggan"
          class="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none transition-colors focus:border-green-500"
        />
        <AppButton variant="primary" class="w-full py-4">Beli Sekarang</AppButton>
      </div>
    </AppModal>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  BoltIcon,
  DevicePhoneMobileIcon,
  FaceSmileIcon,
  ShoppingBagIcon,
  TvIcon
} from '@heroicons/vue/24/outline'
import TheHero from '../components/layout/TheHero.vue'
import ProductCard from '../components/product/ProductCard.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppModal from '../components/ui/AppModal.vue'
import AppSkeleton from '../components/ui/AppSkeleton.vue'
import productData from '../data/products.json'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  cart: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-to-cart', 'clear-search'])

const router = useRouter()
const categories = ['Semua', 'Gadget', 'Komputer', 'Elektronik', 'Kecantikan', 'Fashion Pria', 'Promo Hari Ini']
const selectedCategory = ref('Semua')
const sortBy = ref('default')
const isTopUpOpen = ref(false)
const productSectionRef = ref(null)
const isLoading = ref(true)
const itemsPerLoad = 6
const itemsToShow = ref(itemsPerLoad)
let loadingTimer = null

const quickLinks = [
  { name: 'Top Up & Tagihan', icon: DevicePhoneMobileIcon, type: 'service' },
  { name: 'Elektronik', icon: TvIcon, type: 'filter' },
  { name: 'Promo Hari Ini', icon: BoltIcon, type: 'filter' },
  { name: 'Kecantikan', icon: FaceSmileIcon, type: 'filter' },
  { name: 'Fashion Pria', icon: ShoppingBagIcon, type: 'filter' }
]

const allFilteredProducts = computed(() => {
  const products = productData.filter((product) => {
    let matchCategory = selectedCategory.value === 'Semua' || product.category === selectedCategory.value

    if (selectedCategory.value === 'Elektronik') {
      matchCategory = ['Gadget', 'Komputer', 'Elektronik'].includes(product.category)
    }

    if (selectedCategory.value === 'Promo Hari Ini') {
      matchCategory = product.price < 500000
    }

    const matchSearch = product.title.toLowerCase().includes(props.searchQuery.toLowerCase().trim())

    return matchCategory && matchSearch
  })

  if (sortBy.value === 'price-low') {
    products.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    products.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'rating') {
    products.sort((a, b) => b.rating - a.rating)
  }

  return products
})

const visibleProducts = computed(() => {
  return allFilteredProducts.value.slice(0, itemsToShow.value)
})

const hasMore = computed(() => {
  return itemsToShow.value < allFilteredProducts.value.length
})

const goToDetail = (id) => {
  router.push({ name: 'product-detail', params: { id } })
}

const setSelectedCategory = (categoryName) => {
  selectedCategory.value = categoryName
}

const isQuickLinkActive = (quickLink) => {
  return quickLink.type === 'filter' && selectedCategory.value === quickLink.name
}

const scrollToProducts = () => {
  if (!productSectionRef.value) return
  productSectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const handleQuickLink = (quickLink) => {
  if (quickLink.type === 'service') {
    isTopUpOpen.value = true
    return
  }

  setSelectedCategory(quickLink.name)
  scrollToProducts()
}

const loadMore = () => {
  itemsToShow.value += itemsPerLoad
}

watch(
  [selectedCategory, () => props.searchQuery, sortBy],
  () => {
    itemsToShow.value = itemsPerLoad
  }
)

onMounted(() => {
  loadingTimer = setTimeout(() => {
    isLoading.value = false
  }, 1500)
})

onBeforeUnmount(() => {
  if (loadingTimer) {
    clearTimeout(loadingTimer)
  }
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
