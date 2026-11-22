import React, { useState } from 'react'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import ProductIllustration from './ProductIllustration'

export default function CartPage({
  cart,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
  discountCode,
  onApplyDiscount,
}) {
  const [promoInput, setPromoInput] = useState(discountCode || '')
  const [promoMsg, setPromoMsg] = useState('')
  const [showPromo, setShowPromo] = useState(Boolean(discountCode))
  const [imgFailed, setImgFailed] = useState({})

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discountRate = discountCode === 'SAVE10' ? 0.1 : 0
  const discountAmount = subtotal * discountRate
  const grandTotal = Math.max(0, subtotal - discountAmount)

  const handlePromoSubmit = (e) => {
    e.preventDefault()
    const normalized = promoInput.trim().toUpperCase()
    if (!normalized) {
      onApplyDiscount('')
      setPromoMsg('')
      return
    }
    if (normalized === 'SAVE10') {
      onApplyDiscount('SAVE10')
      setPromoMsg('Promo SAVE10 applied (10% off)')
    } else {
      onApplyDiscount('')
      setPromoMsg('Invalid code. Try SAVE10.')
    }
  }

  return (
    <section>
      <div className="page-top">
        <div>
          <h1 className="page-title">Cart</h1>
          <p className="page-subtitle">
            {cart.reduce((s, i) => s + i.qty, 0)} item(s) selected
          </p>
        </div>

        <button type="button" className="btn btn-outline" onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={36} style={{ color: '#71717a', marginBottom: 10 }} />
          <h2 style={{ margin: '0 0 6px', fontSize: '1.1rem' }}>Your cart is empty</h2>
          <p className="page-subtitle" style={{ marginBottom: 18 }}>
            Add products from the store to view your cart.
          </p>
          <button type="button" className="btn btn-dark" onClick={onContinueShopping}>
            Browse Products
          </button>
        </div>
      ) : (
        <div className="split-layout">
          <div>
            {cart.map((item) => (
              <div key={item.id} className="cart-row">
                <div className="cart-thumb">
                  {imgFailed[item.id] ? (
                    <ProductIllustration name={item.name} size={64} />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={() => setImgFailed((prev) => ({ ...prev, [item.id]: true }))}
                    />
                  )}
                </div>

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <div className="cart-sub">
                    {item.category} · ${item.price.toFixed(2)}
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>

                <div className="cart-right">
                  <div className="cart-line-price">${(item.price * item.qty).toFixed(2)}</div>
                  <div className="qty-stepper" aria-label={`Quantity for ${item.name}`}>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus size={13} />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="summary-panel">
            <h2 className="section-heading">Order Summary</h2>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <strong>Calculated at checkout</strong>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <strong>{discountAmount > 0 ? `-$${discountAmount.toFixed(2)}` : '—'}</strong>
              </div>
            </div>

            <div className="divider" />

            <div className="summary-total">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="btn btn-dark btn-block"
              onClick={onProceedToCheckout}
            >
              Proceed to Checkout
            </button>

            <div style={{ marginTop: 14 }}>
              {!showPromo ? (
                <button
                  type="button"
                  onClick={() => setShowPromo(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.82rem',
                    color: 'var(--ink-secondary)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Use a promo code
                </button>
              ) : (
                <form className="promo-form" onSubmit={handlePromoSubmit}>
                  <input
                    type="text"
                    placeholder="Enter SAVE10"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    aria-label="Promo code"
                  />
                  <button type="submit" className="btn btn-outline" style={{ padding: '7px 12px' }}>
                    Apply
                  </button>
                </form>
              )}

              {promoMsg && (
                <p
                  style={{
                    margin: '6px 0 0',
                    fontSize: '0.78rem',
                    color: discountCode ? 'var(--success)' : 'var(--danger)',
                  }}
                >
                  {promoMsg}
                </p>
              )}
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}
