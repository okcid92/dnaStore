const CART_KEY = 'dna_store_cart'

export const getCart = () => {
  if (typeof window === 'undefined') return []
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export const addToCart = (product, quantity = 1, size = null, color = null) => {
  const cart = getCart()
  const existingIndex = cart.findIndex(
    item => item.id === product.id && item.size === size && item.color === color
  )

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity
  } else {
    cart.push({ ...product, quantity, size, color })
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event('cartUpdated'))
  return cart
}

export const updateQuantity = (productId, size, color, quantity) => {
  const cart = getCart()
  const index = cart.findIndex(
    item => item.id === productId && item.size === size && item.color === color
  )

  if (index > -1) {
    if (quantity <= 0) {
      cart.splice(index, 1)
    } else {
      cart[index].quantity = quantity
    }
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event('cartUpdated'))
  return cart
}

export const removeFromCart = (productId, size, color) => {
  const cart = getCart().filter(
    item => !(item.id === productId && item.size === size && item.color === color)
  )
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event('cartUpdated'))
  return cart
}

export const clearCart = () => {
  localStorage.removeItem(CART_KEY)
  window.dispatchEvent(new Event('cartUpdated'))
  return []
}

export const getCartTotal = () => {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

export const getCartCount = () => {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}
