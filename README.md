# EcommerceApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.27.


## Features

- Product listing with image, name, price, category and Add to Cart button
- Skeleton loaders while products are loading
- Friendly empty state when no products match the filters
- Debounced live search by product name (custom `appDebounceInput` directive)
- Dynamic category dropdown filter, generated from the loaded product list
- Search term & category filter persisted in `localStorage` across refresh/navigation
- Responsive product grid with hover effects on cards
- Cart state managed with Angular Signals: `addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`
- Cart persisted to `localStorage` and automatically restored on refresh
- Computed signals for cart item count and grand total
- Tabbed Cart / Contact Us page using Angular Material Tabs
- Reactive contact form with real-time validation messages (required, email format, 10-digit phone, 20-char minimum message)
- Submit button disabled while the form is invalid; success banner + toast + form reset on successful submit
- Toast notifications (Angular Material Snack Bar) for add/remove cart actions and form submission
- Cart item count badge in the navbar
- Lazy-loaded `/products` and `/cart-contact` feature routes, plus a 404 Not Found page
- Fully responsive layout (mobile, tablet, desktop)


## Installation Steps

**Prerequisites:** Node.js 18.19+ (or 20+) and npm.

```bash
# 1. Install dependencies
npm install
```

No environment variables or backend setup are required — product data is served from a static JSON file (`public/data/products.json`).

## Run Commands

```bash
# Start the dev server (http://localhost:4200)
npm start
# or
ng serve
```

The app redirects `/` to `/product` automatically.


