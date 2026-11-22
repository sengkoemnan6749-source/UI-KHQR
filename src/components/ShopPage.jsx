import React, { useEffect, useRef, useState } from 'react'
import { Plus, Check, ArrowRight } from 'lucide-react'
import ProductIllustration from './ProductIllustration'

const CATEGORIES = ['All', 'Computers', 'Accessories', 'Displays']

export default function ShopPage({ products, cart, onAddToCart, onGoToCart }) {
  const [recentlyAdded, setRecentlyAdded] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [imgFailed, setImgFailed] = useState({})
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleAdd = (product) => {
    onAddToCart(product)
    setRecentlyAdded(product.id)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setRecentlyAdded(null)
    }, 900)
  }

  const getCartQty = (productId) => {
    const found = cart.find((item) => item.id === productId)
    return found ? found.qty : 0
  }

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const visibleProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <section>
      <div className="page-top">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Computers, accessories, and displays ready for immediate order.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div className="filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {totalItems > 0 && (
            <button type="button" className="btn btn-dark" onClick={onGoToCart}>
              View Cart ({totalItems})
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      {visibleProducts.length === 0 ? (
        <div className="empty-state">
          <h3 style={{ margin: '0 0 6px' }}>No products found</h3>
          <p className="page-subtitle">Try selecting "All" or clearing the search box.</p>
        </div>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => {
            const qtyInCart = getCartQty(product.id)
            const isAdded = recentlyAdded === product.id

            return (
              <article key={product.id} className="product-card">
                <div className="product-image-wrap">
                  {imgFailed[product.id] ? (
                    <ProductIllustration name={product.name} size={130} />
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={() => setImgFailed((prev) => ({ ...prev, [product.id]: true }))}
                    />
                  )}
                  {qtyInCart > 0 && <span className="qty-tag">{qtyInCart} in cart</span>}
                </div>

                <div className="product-meta-top">
                  <h2 className="product-name">{product.name}</h2>
                  <span className="product-price">${product.price.toFixed(2)}</span>
                </div>

                <div className="product-cat">{product.category}</div>
                <p className="product-spec">{product.spec}</p>

                <button
                  type="button"
                  className={`btn btn-dark btn-block ${isAdded ? 'added' : ''}`}
                  onClick={() => handleAdd(product)}
                >
                  {isAdded ? (
                    <>
                      <Check size={15} />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus size={15} />
                      Add to Cart
                    </>
                  )}
                </button>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
