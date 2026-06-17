# Flamingo 🦩

A clothing e-commerce site I'm building to practice React — dark-themed, animated, and structured the way real shopping apps are.

> Work in progress. Built stage by stage: homepage → category browsing → product detail page.

## What it does

- **Homepage** — auto-advancing hero slider, scrolling offers ticker, trust badges, Men/Women/Kids category cards, trending tags, and a new arrivals grid
- **Category pages** — browse by gender, filter by sub-category (shirts, jeans, dresses, etc.), sort by price or rating
- **Product detail page** — full product images, size selector (XS–XXXL), Add to Bag, Buy Now, wishlist, share (copy link / Twitter / Facebook), material & care info, seller info, and related products
- **Cart** — slide-in drawer, quantity controls, free delivery threshold, persists in localStorage so it survives a refresh

## Built with

- **React 18** + **Vite**
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Context API + useReducer** for cart state
- **react-hot-toast** for notifications
- **lucide-react** for icons
- **[FakeStoreAPI](https://fakestoreapi.com/)** for product data

## Running it locally

```bash
git clone https://github.com/raohimanshu99/flamingo.git
cd flamingo
npm install
npm run dev
```

Open `http://localhost:5173`.

## Project structure

```
src/
├── components/    # Navbar, CartDrawer, ProductCard, Footer, SkeletonCard
├── context/       # CartContext (global cart state)
├── data/          # category config, sizes, fabric/seller mock data
├── hooks/         # useProducts (API fetching)
├── pages/         # Home, Category, ProductDetail
├── App.jsx        # routes
└── main.jsx       # entry point
```

## Notes

- Prices are converted from FakeStoreAPI's USD values to INR for display
- Fabric and seller details are mocked since the API doesn't provide them
- No backend yet — cart is local-only, checkout doesn't process real payments

## To-do

- [ ] Search results page
- [ ] Wishlist page
- [ ] User authentication
- [ ] Checkout flow
- [ ] Deploy to Vercel

---

Built by [Himanshu Yadav](https://github.com/raohimanshu99)