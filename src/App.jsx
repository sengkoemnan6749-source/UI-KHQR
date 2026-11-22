import React, { useEffect, useMemo, useState } from 'react'
import { PRODUCTS } from './data/products'
import Navbar from './components/Navbar'
import ShopPage from './components/ShopPage'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import ConfirmationPage from './components/ConfirmationPage'

const STORAGE_KEYS = {
  cart: 'techstore_cart',
  discount: 'techstore_discount',
  sequence: 'techstore_order_seq',
  latestOrder: 'techstore_latest_order',
}

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [activePage, setActivePage] = useState('shop')
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.cart, []))
  const [searchQuery, setSearchQuery] = useState('')
  const [discountCode, setDiscountCode] = useState(() => readStorage(STORAGE_KEYS.discount, ''))
  const [orderSequence, setOrderSequence] = useState(() => readStorage(STORAGE_KEYS.sequence, 1))
  const [latestOrder, setLatestOrder] = useState(() => readStorage(STORAGE_KEYS.latestOrder, null))

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart))
    } catch {
      // Ignore storage quota errors
    }
  }, [cart])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.discount, JSON.stringify(discountCode))
    } catch {
      // Ignore storage quota errors
    }
  }, [discountCode])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.sequence, JSON.stringify(orderSequence))
    } catch {
      // Ignore storage quota errors
    }
  }, [orderSequence])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.latestOrder, JSON.stringify(latestOrder))
    } catch {
      // Ignore storage quota errors
    }
  }, [latestOrder])

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return PRODUCTS
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.spec.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart])

  const handleNavigate = (page) => {
    if (page === 'checkout' && cartCount === 0) {
      setActivePage('cart')
      return
    }
    setActivePage(page)
  }

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const handleUpdateQty = (productId, nextQty) => {
    if (nextQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId))
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty: nextQty } : item))
    )
  }

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const handlePlaceOrder = (orderPayload) => {
    const formattedId = `ORD-${String(orderSequence).padStart(4, '0')}`
    const now = new Date()
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })

    setLatestOrder({
      orderId: formattedId,
      orderDate: formattedDate,
      status: 'Pending',
      ...orderPayload,
    })

    setOrderSequence((prev) => prev + 1)
    setCart([])
    setDiscountCode('')
    setActivePage('confirmation')
  }

  return (
    <div>
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        hasOrder={Boolean(latestOrder)}
      />

      <main className="container">
        {activePage === 'shop' && (
          <ShopPage
            products={filteredProducts}
            cart={cart}
            onAddToCart={handleAddToCart}
            onGoToCart={() => setActivePage('cart')}
          />
        )}

        {activePage === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onProceedToCheckout={() => setActivePage('checkout')}
            onContinueShopping={() => setActivePage('shop')}
            discountCode={discountCode}
            onApplyDiscount={setDiscountCode}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            cart={cart}
            discountCode={discountCode}
            onBackToCart={() => setActivePage('cart')}
            onGoToShop={() => setActivePage('shop')}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {activePage === 'confirmation' && (
          <ConfirmationPage
            order={latestOrder}
            onContinueShopping={() => setActivePage('shop')}
          />
        )}
      </main>
    </div>
  )
}
