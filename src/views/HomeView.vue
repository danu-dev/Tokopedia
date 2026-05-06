<template>
  <main class="max-w-7xl mx-auto px-4 pb-20">
    <TheHero />

    <section class="my-10">
      <div class="flex flex-col gap-6">
        <h2 class="text-xl font-bold text-gray-800">Rekomendasi Untukmu</h2>

        <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <AppButton
            v-for="cat in categories"
            :key="cat"
            :variant="selectedCategory === cat ? 'primary' : 'outline'"
            class="rounded-full px-8 py-2 text-sm whitespace-nowrap shadow-sm"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </AppButton>
        </div>
      </div>
    </section>

    <div v-if="isLoading" class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      <AppSkeleton v-for="item in 12" :key="item" />
    </div>

    <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        v-bind="product"
        @open-detail="goToDetail(product.id)"
        @add-to-cart="emit('add-to-cart', product)"
      />
    </div>

    <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
      <p class="text-gray-400 font-medium">
        {{
          searchQuery
            ? `Yah, produk \"${searchQuery}\" tidak ditemukan di kategori ini.`
            : 'Wah, produk di kategori ini belum tersedia.'
        }}
      </p>
      <div class="mt-4 flex items-center justify-center gap-2">
        <AppButton v-if="searchQuery" variant="outline" @click="emit('clear-search')">
          Reset Pencarian
        </AppButton>
        <AppButton variant="outline" @click="selectedCategory = 'Semua'">
          Lihat Semua Produk
        </AppButton>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import TheHero from '../components/layout/TheHero.vue'
import ProductCard from '../components/product/ProductCard.vue'
import AppButton from '../components/ui/AppButton.vue'
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
const categories = ['Semua', 'Gadget', 'Komputer']
const selectedCategory = ref('Semua')
const isLoading = ref(true)
let loadingTimer = null

const filteredProducts = computed(() => {
  return productData.filter((product) => {
    const matchCategory = selectedCategory.value === 'Semua' || product.category === selectedCategory.value
    const matchSearch = product.title.toLowerCase().includes(props.searchQuery.toLowerCase().trim())

    return matchCategory && matchSearch
  })
})

const goToDetail = (id) => {
  router.push({ name: 'product-detail', params: { id } })
}

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
