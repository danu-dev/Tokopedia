<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <TheNavbar :cart-count="cartCount" @search="searchQuery = $event" @open-cart="isCartOpen = true" />

    <TheCartDrawer
      :is-open="isCartOpen"
      :items="cart"
      @close="isCartOpen = false"
      @remove="removeFromCart"
      @increase="increaseCartQuantity"
      @decrease="decreaseCartQuantity"
    />

    <AppToast :show="isToastShow" :message="toastMsg" />

    <div class="flex-1">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component
            :is="Component"
            :key="route.fullPath"
            :search-query="searchQuery"
            :cart="cart"
            @add-to-cart="handleAddToCart"
            @clear-search="searchQuery = ''"
            @clear-cart="clearCart"
          />
        </Transition>
      </RouterView>
    </div>

    <TheFooter />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { RouterView } from 'vue-router'
import AppToast from './components/ui/AppToast.vue'
import TheCartDrawer from './components/layout/TheCartDrawer.vue'
import TheFooter from './components/layout/TheFooter.vue'
import TheNavbar from './components/layout/TheNavbar.vue'

const searchQuery = ref('')
const cart = ref([])
const isCartOpen = ref(false)
const isToastShow = ref(false)
const toastMsg = ref('')
let toastTimer = null

const cartCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

const showToast = (message) => {
  toastMsg.value = message
  isToastShow.value = true

  if (toastTimer) {
    clearTimeout(toastTimer)
  }

  toastTimer = setTimeout(() => {
    isToastShow.value = false
  }, 3000)
}

const handleAddToCart = (product) => {
  const existingItem = cart.value.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }

  showToast(`${product.title} masuk keranjang.`)
}

const removeFromCart = (index) => {
  cart.value.splice(index, 1)
}

const increaseCartQuantity = (index) => {
  const targetItem = cart.value[index]
  if (!targetItem) return
  targetItem.quantity += 1
}

const decreaseCartQuantity = (index) => {
  const targetItem = cart.value[index]
  if (!targetItem) return

  if (targetItem.quantity > 1) {
    targetItem.quantity -= 1
  } else {
    removeFromCart(index)
  }
}

const clearCart = () => {
  cart.value = []
}

onBeforeUnmount(() => {
  if (toastTimer) {
    clearTimeout(toastTimer)
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
