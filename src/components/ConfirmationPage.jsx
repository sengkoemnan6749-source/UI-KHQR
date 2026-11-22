import React, { useState } from 'react'
import { Printer } from 'lucide-react'
import ProductIllustration from './ProductIllustration'

export default function ConfirmationPage({ order, onContinueShopping }) {
  const [imgFailed, setImgFailed] = useState({})

  if (!order) {
    return (
      <section className="empty-state">
        <h2 style={{ margin: '0 0 6px', fontSize: '1.1rem' }}>No order placed yet</h2>
        <p className="page-subtitle" style={{ marginBottom: 18 }}>
          Complete checkout to view your order confirmation.
        </p>
        <button type="button" className="btn btn-dark" onClick={onContinueShopping}>
          Go to Products
        </button>
      </section>
    )
  }

  return (
    <section className="receipt-print-root">
      <div className="print-watermark" aria-hidden="true">
        <img src="/images/techstore-logo.png" alt="" />
        <span>TechStore</span>
      </div>

      <div className="print-brand-header">
        <img src="/images/techstore-logo.png" alt="TechStore" className="print-brand-logo" />
        <div className="print-brand-meta">
          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>OFFICIAL ORDER RECEIPT</div>
          <div style={{ fontSize: '0.78rem', color: '#4b5563' }}>
            {order.orderId} · {order.orderDate}
          </div>
        </div>
      </div>

      <div className="breadcrumb no-print">
        <span>Cart</span>
        <span>›</span>
        <span>Shipping</span>
        <span>›</span>
        <span className="current">Confirmation</span>
      </div>

      <div className="split-layout">
        <div>
          <div className="confirm-header">
            <div className="verify-badge-wrap" aria-hidden="true">
              <span className="verify-pulse-ring" />
              <svg className="verify-svg" viewBox="0 0 52 52">
                <circle className="verify-circle-bg" cx="26" cy="26" r="23" />
                <circle className="verify-circle-stroke" cx="26" cy="26" r="23" />
                <path className="verify-check-path" d="M16 26.5 L22.5 33 L36 19.5" />
              </svg>
            </div>

            <div>
              <div className="confirm-id-line">
                Order{' '}
                <span className="mono" style={{ fontWeight: 600, color: 'var(--ink)' }}>
                  {order.orderId}
                </span>
              </div>
              <h1 className="confirm-title">Order Placed Successfully!</h1>
              <p className="confirm-sub">
                Thank you, {order.customer.firstName}. We have received your order.
              </p>
            </div>
          </div>

          <h2 className="section-heading">Order Details</h2>
          <div className="detail-list">
            <div>
              <div className="detail-item-label">Order ID</div>
              <div className="detail-item-value mono">{order.orderId}</div>
            </div>

            <div>
              <div className="detail-item-label">Order Status</div>
              <div className="detail-item-value">
                <span className="status-dot">{order.status}</span>
              </div>
            </div>

            <div>
              <div className="detail-item-label">Customer Name</div>
              <div className="detail-item-value">
                {order.customer.firstName} {order.customer.lastName}
              </div>
            </div>

            <div>
              <div className="detail-item-label">Order Date</div>
              <div className="detail-item-value">{order.orderDate}</div>
            </div>

            <div>
              <div className="detail-item-label">Contact Information</div>
              <div className="detail-item-value">
                {order.customer.email}
                <br />
                {order.customer.phone}
              </div>
            </div>

            <div>
              <div className="detail-item-label">Shipping Address & Method</div>
              <div className="detail-item-value">
                {order.customer.address}
                <br />
                <span style={{ color: 'var(--ink-secondary)', fontSize: '0.84rem' }}>
                  {order.shippingMethod.label} ({order.shippingMethod.eta})
                </span>
              </div>
            </div>
          </div>

          <div className="confirm-actions no-print">
            <button type="button" className="btn btn-outline" onClick={() => window.print()}>
              <Printer size={15} />
              Print Receipt
            </button>

            <button type="button" className="btn btn-dark" onClick={onContinueShopping}>
              Continue Shopping
            </button>
          </div>
        </div>

        <aside className="summary-panel">
          <h2 className="section-heading">Ordered Products</h2>

          <div className="mini-items">
            {order.items.map((item) => (
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
                      ${item.price.toFixed(2)} × {item.qty}
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
              <strong>${order.subtotal.toFixed(2)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping ({order.shippingMethod.label})</span>
              <strong>${order.shippingMethod.cost.toFixed(2)}</strong>
            </div>
            {order.discountAmount > 0 && (
              <div className="summary-row">
                <span>Discount</span>
                <strong style={{ color: 'var(--success)' }}>-${order.discountAmount.toFixed(2)}</strong>
              </div>
            )}
          </div>

          <div className="divider" />

          <div className="summary-total" style={{ marginBottom: 0 }}>
            <span>Total Amount</span>
            <span>${order.grandTotal.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  )
}
