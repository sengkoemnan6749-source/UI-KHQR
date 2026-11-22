import React, { useState } from 'react'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'

export default function Navbar({
  activePage,
  onNavigate,
  cartCount,
  searchQuery,
  onSearchChange,
  hasOrder,
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (page) => {
    onNavigate(page)
    setMobileOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="brand" onClick={() => handleNav('shop')} type="button" aria-label="TechStore Home">
          <img src="/images/techstore-logo.png" alt="TechStore" className="brand-logo" />
        </button>

        <nav className="nav-links" aria-label="Primary Navigation">
          <button
            type="button"
            className={`nav-tab ${activePage === 'shop' ? 'active' : ''}`}
            onClick={() => handleNav('shop')}
          >
            Products
          </button>

          <button
            type="button"
            className={`nav-tab ${activePage === 'cart' ? 'active' : ''}`}
            onClick={() => handleNav('cart')}
          >
            Shopping Cart
          </button>

          <button
            type="button"
            className={`nav-tab ${activePage === 'checkout' ? 'active' : ''}`}
            onClick={() => handleNav('checkout')}
            disabled={cartCount === 0}
            title={cartCount === 0 ? 'Add an item to cart before checkout' : 'Go to Checkout'}
          >
            Checkout
          </button>

          {hasOrder && (
            <button
              type="button"
              className={`nav-tab ${activePage === 'confirmation' ? 'active' : ''}`}
              onClick={() => handleNav('confirmation')}
            >
              Order Confirmation
            </button>
          )}
        </nav>

        <div className="nav-actions">
          {activePage === 'shop' && (
            <div className="search-box">
              <Search size={14} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search products"
              />
            </div>
          )}

          <button
            type="button"
            className="cart-btn"
            onClick={() => handleNav('cart')}
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={15} />
            <span>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            <button
              type="button"
              className={`mobile-nav-item ${activePage === 'shop' ? 'active' : ''}`}
              onClick={() => handleNav('shop')}
            >
              Products
            </button>
            <button
              type="button"
              className={`mobile-nav-item ${activePage === 'cart' ? 'active' : ''}`}
              onClick={() => handleNav('cart')}
            >
              Shopping Cart ({cartCount})
            </button>
            <button
              type="button"
              className={`mobile-nav-item ${activePage === 'checkout' ? 'active' : ''}`}
              onClick={() => handleNav('checkout')}
              disabled={cartCount === 0}
            >
              Checkout
            </button>
            {hasOrder && (
              <button
                type="button"
                className={`mobile-nav-item ${activePage === 'confirmation' ? 'active' : ''}`}
                onClick={() => handleNav('confirmation')}
              >
                Order Confirmation
              </button>
            )}
          </div>

          {activePage === 'shop' && (
            <div className="mobile-search-wrap">
              <div className="search-box">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="Search products on mobile"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
