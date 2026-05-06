<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 transition-colors flex flex-col">
    <TheNavbar
      v-model="searchQuery"
      :cart-count="cartCount"
      :is-logged-in="store.isLoggedIn"
      :auth-name="store.user.name"
      @open-cart="isCartOpen = true"
      @open-login="openAuthModal('login')"
      @open-register="openAuthModal('register')"
    />

    <TheCartDrawer
      :is-open="isCartOpen"
      :items="store.cart"
      @close="isCartOpen = false"
      @remove="removeFromCart"
      @increase="increaseCartQuantity"
      @decrease="decreaseCartQuantity"
    />

    <AppToast :show="store.toast.show" :message="store.toast.message" />

    <AppModal :show="isAuthModalOpen" @close="isAuthModalOpen = false">
      <template #title>{{ authMode === 'login' ? 'Masuk' : 'Daftar' }}</template>

      <div class="space-y-4">
        <div>
          <label class="ml-1 text-xs font-bold uppercase text-gray-500">
            {{ authMode === 'login' ? 'Email atau Nomor HP' : 'Nama Lengkap' }}
          </label>
          <input
            v-model="authIdentifier"
            type="text"
            class="mt-1 w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-green-500/20"
            :placeholder="authMode === 'login' ? 'Contoh: budi@email.com' : 'Contoh: Budi Utomo'"
          />
        </div>

        <div v-if="authMode === 'register'">
          <label class="ml-1 text-xs font-bold uppercase text-gray-500">Email atau Nomor HP</label>
          <input
            v-model="authContact"
            type="text"
            class="mt-1 w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-green-500/20"
            placeholder="Contoh: budi@email.com"
          />
        </div>

        <div v-if="authMode === 'login'" class="text-right">
          <a href="#" class="text-xs font-bold text-green-600 hover:underline">Lupa Kata Sandi?</a>
        </div>

        <AppButton
          variant="primary"
          class="w-full py-4 text-lg"
          @click="authMode === 'login' ? handleLogin() : handleRegister()"
        >
          {{ authMode === 'login' ? 'Masuk' : 'Daftar' }}
        </AppButton>

        <div class="relative py-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-100"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white px-2 text-gray-400">atau masuk dengan</span>
          </div>
        </div>

        <button
          class="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 font-bold text-gray-600 transition-all hover:bg-gray-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" class="h-5 w-5" alt="Google" />
          Google
        </button>

        <p class="mt-6 text-center text-sm text-gray-500">
          {{ authMode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?' }}
          <button
            class="font-bold text-green-600 hover:underline"
            @click="authMode = authMode === 'login' ? 'register' : 'login'"
          >
            {{ authMode === 'login' ? 'Daftar Sekarang' : 'Masuk Sekarang' }}
          </button>
        </p>
      </div>
    </AppModal>

    <main class="flex-1 pb-20 md:pb-0">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component
            :is="Component"
            :key="route.fullPath"
            :search-query="searchQuery"
            :cart="store.cart"
            @add-to-cart="handleAddToCart"
            @clear-search="searchQuery = ''"
            @clear-cart="clearCart"
          />
        </Transition>
      </RouterView>
    </main>

    <TheFooter class="hidden md:block" />
    <TheBottomNav />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'
import { store } from './store'
import TheNavbar from './components/layout/TheNavbar.vue'
import TheCartDrawer from './components/layout/TheCartDrawer.vue'
import TheFooter from './components/layout/TheFooter.vue'
import TheBottomNav from './components/layout/TheBottomNav.vue'
import AppModal from './components/ui/AppModal.vue'
import AppToast from './components/ui/AppToast.vue'
import AppButton from './components/ui/AppButton.vue'

const searchQuery = ref('')
const isCartOpen = ref(false)
const isAuthModalOpen = ref(false)
const authMode = ref('login')
const authIdentifier = ref('')
const authContact = ref('')

const cartCount = computed(() => {
  return store.cart.reduce((total, item) => total + item.quantity, 0)
})

const openAuthModal = (mode) => {
  authMode.value = mode
  authIdentifier.value = ''
  authContact.value = ''
  isAuthModalOpen.value = true
}

const handleLogin = () => {
  const identifier = authIdentifier.value.trim()
  const name = identifier ? identifier.split('@')[0] : store.user.name
  store.login(name)
  isAuthModalOpen.value = false
  store.showToast('Selamat datang kembali!')
}

const handleRegister = () => {
  const fullName = authIdentifier.value.trim()
  const fallbackName = authContact.value.trim()
  store.login(fullName || fallbackName.split('@')[0])
  isAuthModalOpen.value = false
  store.showToast('Akun berhasil dibuat. Selamat datang!')
}

const handleAddToCart = (product) => {
  store.addToCart(product)
  store.showToast(`${product.title} masuk keranjang.`)
}

const removeFromCart = (index) => {
  store.removeCartItem(index)
}

const increaseCartQuantity = (index) => {
  store.increaseCartQuantity(index)
}

const decreaseCartQuantity = (index) => {
  store.decreaseCartQuantity(index)
}

const clearCart = () => {
  store.clearCart()
}
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
