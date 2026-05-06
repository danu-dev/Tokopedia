import { reactive, watch } from 'vue'

const defaultUser = {
  name: 'Budi Utomo',
  level: 'Silver Member'
}

const readJSON = (key, fallback) => {
  if (typeof window === 'undefined') return fallback

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const store = reactive({
  cart: readJSON('cart', []),
  wishlist: readJSON('wishlist', []),
  orders: readJSON('orders', []),
  isLoggedIn: readJSON('isLoggedIn', false),
  user: readJSON('user', defaultUser),

  isInWishlist(productId) {
    return this.wishlist.some((item) => item.id === productId)
  },

  toggleWishlist(product) {
    const targetIndex = this.wishlist.findIndex((item) => item.id === product.id)

    if (targetIndex === -1) {
      this.wishlist.push(product)
    } else {
      this.wishlist.splice(targetIndex, 1)
    }
  },

  addToCart(product) {
    const existing = this.cart.find((item) => item.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      this.cart.push({ ...product, quantity: 1 })
    }
  },

  removeCartItem(index) {
    this.cart.splice(index, 1)
  },

  increaseCartQuantity(index) {
    const targetItem = this.cart[index]
    if (!targetItem) return
    targetItem.quantity += 1
  },

  decreaseCartQuantity(index) {
    const targetItem = this.cart[index]
    if (!targetItem) return

    if (targetItem.quantity > 1) {
      targetItem.quantity -= 1
    } else {
      this.removeCartItem(index)
    }
  },

  clearCart() {
    this.cart = []
  },

  processCheckout() {
    if (this.cart.length === 0) return

    const newOrder = {
      id: Math.floor(Math.random() * 100000),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'Selesai',
      items: this.cart.map((item) => ({ ...item })),
      totalPrice: this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    this.orders.unshift(newOrder)
    this.cart = []
  },

  login(name) {
    const normalizedName = name?.trim()
    this.user = {
      ...this.user,
      name: normalizedName || this.user.name || defaultUser.name
    }
    this.isLoggedIn = true
  },

  logout() {
    this.isLoggedIn = false
    this.user = defaultUser
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('isLoggedIn')
      window.location.href = '/'
    }
  }
})

watch(
  () => store.cart,
  (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('cart', JSON.stringify(value))
  },
  { deep: true }
)

watch(
  () => store.wishlist,
  (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('wishlist', JSON.stringify(value))
  },
  { deep: true }
)

watch(
  () => store.isLoggedIn,
  (value) => {
    if (typeof window === 'undefined') return

    if (value) {
      window.localStorage.setItem('isLoggedIn', JSON.stringify(true))
      return
    }

    window.localStorage.removeItem('isLoggedIn')
  }
)

watch(
  () => store.user,
  (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('user', JSON.stringify(value))
  },
  { deep: true }
)

watch(
  () => store.orders,
  (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('orders', JSON.stringify(value))
  },
  { deep: true }
)
