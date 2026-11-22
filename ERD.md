# E-Commerce Order Database — Entity Relationship Diagram (ERD)

## 1. Mermaid ERD Diagram

```mermaid
erDiagram
    CUSTOMERS ||--o{ ORDERS : places
    ORDERS ||--|{ ORDER_ITEMS : contains
    CATEGORIES ||--o{ PRODUCTS : classifies
    PRODUCTS ||--o{ ORDER_ITEMS : included_in

    CUSTOMERS {
        int customer_id PK
        varchar first_name
        varchar last_name
        varchar email UK
        varchar phone
        text address
        datetime created_at
    }

    CATEGORIES {
        int category_id PK
        varchar category_name
        text description
    }

    PRODUCTS {
        int product_id PK
        int category_id FK
        varchar product_name
        varchar sku UK
        decimal price
        int stock_qty
    }

    ORDERS {
        int order_id PK
        varchar order_code UK
        int customer_id FK
        datetime order_date
        varchar shipping_method
        decimal shipping_fee
        decimal subtotal
        decimal discount_amount
        decimal total_amount
        text delivery_note
        varchar order_status
    }

    ORDER_ITEMS {
        int order_item_id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
        decimal subtotal
    }
```

## 2. Table Relationships Summary

1. **Customers → Orders (`1 : N`)**
   - One customer can place many orders (`Customers.customer_id` → `Orders.customer_id`).
2. **Orders → Order_Items (`1 : N`)**
   - One order consists of one or more order items (`Orders.order_id` → `Order_Items.order_id`).
3. **Categories → Products (`1 : N`)**
   - One category organizes many products (`Categories.category_id` → `Products.category_id`).
4. **Products → Order_Items (`1 : N`)**
   - One product can appear in many order line items (`Products.product_id` → `Order_Items.product_id`), resolving the Many-to-Many (`M : N`) relationship between `Orders` and `Products`.
