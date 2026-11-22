import React, { useState } from 'react'
import { SHIPPING_METHODS } from '../data/products'
import ProductIllustration from './ProductIllustration'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  note: '',
  shippingMethod: 'free',
}

export default function CheckoutPage({
  cart,
  discountCode,
  onBackToCart,
  onGoToShop,
  onPlaceOrder,
}) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [imgFailed, setImgFailed] = useState({})

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discountAmount = discountCode === 'SAVE10' ? subtotal * 0.1 : 0
  const selectedShipping =
    SHIPPING_METHODS.find((m) => m.id === form.shippingMethod) || SHIPPING_METHODS[0]
  const grandTotal = Math.max(0, subtotal - discountAmount + selectedShipping.cost)

  const validateField = (name, value) => {
    const trimmed = (value || '').trim()
    if (name === 'firstName' && !trimmed) return 'First name is required'
    if (name === 'lastName' && !trimmed) return 'Last name is required'
    if (name === 'email') {
      if (!trimmed) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Enter a valid email address'
    }
    if (name === 'phone') {
      if (!trimmed) return 'Phone number is required'
      if (!/^[+\d\s()-]{7,20}$/.test(trimmed)) return 'Enter a valid phone number'
    }
    if (name === 'address' && !trimmed) return 'Address is required'
    return ''
  }

  const validateAll = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address']
    const nextErrors = {}
    requiredFields.forEach((field) => {
      const msg = validateField(field, form[field])
      if (msg) nextErrors[field] = msg
    })
    return nextErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateAll()
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
    })
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0]
      const firstEl = document.getElementById(firstErrorKey)
      if (firstEl) {
        firstEl.focus()
        firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    onPlaceOrder({
      customer: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        note: form.note.trim(),
      },
      shippingMethod: selectedShipping,
      subtotal,
      discountAmount,
      grandTotal,
      items: cart,
    })
  }

  if (cart.length === 0) {
    return (
      <section className="empty-state">
        <h2 style={{ margin: '0 0 6px', fontSize: '1.1rem' }}>No items to checkout</h2>
        <p className="page-subtitle" style={{ marginBottom: 18 }}>
          Please add at least one product to your cart first.
        </p>
        <button type="button" className="btn btn-dark" onClick={onGoToShop}>
          Return to Products
        </button>
      </section>
    )
  }

  return (
    <section>
      <div className="breadcrumb">
        <button type="button" onClick={onBackToCart}>
          Cart
        </button>
        <span>›</span>
        <span className="current">Shipping</span>
        <span>›</span>
        <span>Confirmation</span>
      </div>

      <form className="split-layout" onSubmit={handleSubmit} noValidate>
        <div>
          <div className="form-block">
            <h1 className="section-heading" style={{ fontSize: '1.15rem' }}>
              Shipping Address
            </h1>

            <div className="form-grid">
              <div className={`field ${errors.firstName ? 'has-error' : ''}`}>
                <label htmlFor="firstName">
                  First Name <span>*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
              </div>

              <div className={`field ${errors.lastName ? 'has-error' : ''}`}>
                <label htmlFor="lastName">
                  Last Name <span>*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
              </div>

              <div className={`field ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">
                  Email <span>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className={`field ${errors.phone ? 'has-error' : ''}`}>
                <label htmlFor="phone">
                  Phone Number <span>*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+855 12 345 678"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              <div className={`field full ${errors.address ? 'has-error' : ''}`}>
                <label htmlFor="address">
                  Address <span>*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Street, District, City"
                  value={form.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && <span className="error-msg">{errors.address}</span>}
              </div>

              <div className="field full">
                <label htmlFor="note">Note (Optional)</label>
                <textarea
                  id="note"
                  name="note"
                  rows={2}
                  placeholder="Delivery instructions..."
                  value={form.note}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="section-heading">Shipping Method</h2>
            <div className="shipping-grid">
              {SHIPPING_METHODS.map((method) => {
                const isSelected = form.shippingMethod === method.id
                return (
                  <label
                    key={method.id}
                    className={`shipping-option ${isSelected ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      checked={isSelected}
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />
                    <div className="shipping-left">
                      <span className="radio-circle" />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{method.label}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--ink-muted)' }}>
                          {method.eta}
                        </div>
                      </div>
                    </div>
                    <strong style={{ fontSize: '0.9rem' }}>
                      {method.cost === 0 ? '$0' : `$${method.cost}`}
                    </strong>
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        <aside className="summary-panel">
          <h2 className="section-heading">Your Cart</h2>

          <div className="mini-items">
            {cart.map((item) => (
              <div key={item.id} className="mini-item">
                <div className="mini-item-left">
                  <div className="mini-thumb">
                    {imgFailed[item.id] ? (
                      <ProductIllustration name={item.name} size={36} />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={() => setImgFailed((prev) => ({ ...prev, [item.id]: true }))}
                      />
                    )}
                    <span className="mini-qty">{item.qty}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                <strong style={{ fontSize: '0.88rem' }}>
                  ${(item.price * item.qty).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <strong>
                {selectedShipping.cost === 0 ? '$0.00' : `$${selectedShipping.cost.toFixed(2)}`}
              </strong>
            </div>
            {discountAmount > 0 && (
              <div className="summary-row">
                <span>Discount (SAVE10)</span>
                <strong style={{ color: 'var(--success)' }}>-${discountAmount.toFixed(2)}</strong>
              </div>
            )}
          </div>

          <div className="divider" />

          <div className="summary-total">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button type="submit" className="btn btn-dark btn-block">
            Place Order
          </button>
        </aside>
      </form>
    </section>
  )
}
