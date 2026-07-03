# Agent Prompt: Seshachalam Provisions — Full-Stack E-Commerce Platform

Copy everything below the line into your coding agent (Claude Code, Cursor, etc.) as the initial task prompt.

---

## ROLE

You are a senior full-stack developer with deep expertise in **React.js (Vite)**, **Spring Boot(Java 21)**, **MySQL**, **Spring Data JPA/Hibernate**, and **JWT-based authentication**. You have shipped multiple production-grade e-commerce platforms and are known for writing clean, secure, well-structured, and maintainable code. You also have a strong eye for modern UI/UX design, comparable to teams that build products like Apple, Blinkit, and Zepto.

You are being asked to build a **complete, production-ready, full-stack e-commerce web application** from scratch for a provision/grocery store called **Seshachalam Provisions**. Treat this as a real client project: plan the architecture first, then implement it incrementally, module by module, testing as you go. Do not skip steps or leave placeholder/stub code — every feature listed below must be fully functional.

---

## PROJECT OVERVIEW

**Product name:** Seshachalam Provisions
**Tagline:** "Fresh Groceries Delivered with Trust"
**Type:** Full-stack grocery/provision store e-commerce web app with a customer-facing storefront and an admin dashboard.

---

## TECH STACK (mandatory — do not substitute)

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite) |
| Backend | Spring Boot 3, Java 17 |
| Database | MySQL |
| API style | REST |
| Auth | JWT (JSON Web Tokens) |
| ORM | Spring Data JPA (Hibernate) |
| Password hashing | BCrypt |
| Build tool | Maven |
| Animation libs | Framer Motion (required), GSAP (optional, for scroll/complex effects), React Icons |

---

## DATABASE CONFIGURATION

Set up a local MySQL database named `seshachalam_provisions`. Use the following credentials in `application.properties` / `application.yml` (via environment variables where possible — do not hardcode secrets in files that will be committed to version control; use a `.env` or `application-local.properties` that is git-ignored):

```
spring.datasource.url=jdbc:mysql://localhost:3306/seshachalam_provisions?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=2300030858@Tt
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

Generate the schema via Hibernate (`ddl-auto=update`) from the JPA entities described below, and also produce a `schema.sql` reference file for documentation purposes.

> Note: since this password is a real credential, make sure the config file that contains it is added to `.gitignore` and never pushed to a public repo.

---

## DESIGN & UX DIRECTION

Build a **modern, premium-looking** grocery storefront. The visual language should feel like a blend of **Apple (clean, spacious, premium) + Blinkit + Zepto (fast, punchy, grocery-native) + Material Design (consistent elevation/motion system)**.

**Visual requirements:**
- Glassmorphism where appropriate (navbar, modals, floating cards)
- Gradient backgrounds (subtle, not garish)
- Soft shadows, rounded corners (16–24px radius) on cards and buttons
- Modern, readable typography (e.g., Inter, Poppins, or similar variable fonts)
- Fully responsive: mobile, tablet, desktop (mobile-first)
- 60 FPS smooth animations everywhere — no jank

**Color palette (use as CSS variables / Tailwind theme tokens):**
- Primary — Emerald Green `#16A34A`
- Secondary — Orange `#F97316`
- Accent — Yellow `#FACC15`
- Background — `#F8FAFC`
- Cards — White `#FFFFFF`
- Text — `#1F2937`

Avoid dark, muddy, or overly saturated colors anywhere in the UI.

**Animation requirements (Framer Motion primary, GSAP for scroll-heavy effects):**
- Smooth page/route transitions (fade + slide)
- Card hover lift with shadow growth
- Button ripple/press effect
- Image zoom on hover
- Floating grocery icon decorations on hero/landing sections
- Fade + slide-in on scroll (staggered for grids)
- Smooth collapsing/sticky navbar on scroll
- Animated number counters (e.g., dashboard stats)
- Skeleton loaders for all async content (products, orders, dashboard cards)
- Animated cart quantity updates and totals
- Animated notification bell (admin) when a new order arrives

---

## USER ROLES

Exactly two roles: **ADMIN** and **USER**. Use Spring Security role-based authorization (`ROLE_ADMIN`, `ROLE_USER`) with JWT claims carrying the role.

### 1. Admin

- Secure login (same JWT auth flow, role-gated).
- **Dashboard**: animated stat cards for Total Products, Available Products, Unavailable Products, Total Orders, and a Recent Orders list/table. Use animated counters and skeleton loaders while data loads.
- **Product management**: full CRUD — add, edit, delete, upload product image, update price, update stock, change category. Fields: name, category, price, description, quantity, image, availability (Available/Unavailable). When Unavailable, the storefront must show "Out of Stock" and disable the Add to Cart button for that product.
- **Categories**: Rice, Dal, Oil, Spices, Dry Fruits, Snacks, Dairy, Beverages, Vegetables, Fruits, Household Items (store as an enum or a `categories` table — your choice, but keep it extensible).
- **Order management**: view every order with customer name, phone, address, date, time, ordered items, quantities, and total amount. Ability to update order status through a pipeline: Accepted → Preparing → Ready → Delivered.
- **Notifications**: whenever a user places an order, the admin dashboard shows a real-time (or near-real-time polling) notification like "New Order from Rahul," with an animated bell icon indicating unread notifications.

### 2. User (customer)

- **Registration**: name, email, password, phone number, address.
- **Login**: JWT-based.
- **Home page**: hero banner, featured products, categories grid, search bar, offers banner, new arrivals, popular products — all animated on load/scroll.
- **Product listing/detail**: each card shows image, name, price, description, availability, and an Add to Cart button (disabled + "Out of Stock" label when unavailable).
- **Search**: live/instant search with filters for category, price range, and availability.
- **Cart**: increase/decrease quantity, remove item, view subtotal, total, and total item count — all with animated updates.
- **Checkout**: no payment gateway of any kind (no Razorpay, Stripe, or UPI). User enters name, phone, and address, then clicks "Place Order." Backend persists the order; admin is notified; user sees a confirmation screen: "Your order has been placed successfully."
- **Profile page**: view/edit personal details and view past orders with status.

---

## DATABASE SCHEMA

Design JPA entities for the following tables (add sensible `createdAt`/`updatedAt` audit fields, and proper foreign keys/relationships):

**users**
`id, name, email (unique), password (BCrypt hash), phone, address, role`

**products**
`id, name, category, description, price, quantity, image (store path/URL), available (boolean)`

**orders**
`id, userId (FK), totalAmount, status (enum: PLACED, ACCEPTED, PREPARING, READY, DELIVERED), orderDate`

**order_items**
`id, orderId (FK), productId (FK), quantity, price`

Also design a `cart_items` table/entity (or handle cart client-side with a sync-to-server model) to back the `/cart` endpoints listed below — pick whichever approach is cleaner and document your choice.

---

## BACKEND API CONTRACT

Implement these REST endpoints under a versioned base path (e.g., `/api/v1`). Secure appropriately with JWT + role checks.

**Auth**
- `POST /register` — user self-registration
- `POST /login` — returns JWT + role

**Products**
- `GET /products` — list (support query params for category/price/search filters)
- `GET /products/{id}`
- `POST /products` — admin only
- `PUT /products/{id}` — admin only
- `DELETE /products/{id}` — admin only

**Orders**
- `POST /orders` — place order (user)
- `GET /orders` — all orders (admin only)
- `GET /orders/user` — logged-in user's own orders
- `PUT /orders/{id}/status` — admin updates order status (add this beyond the base spec — needed for the Accepted/Preparing/Ready/Delivered flow)

**Cart**
- `POST /cart` — add/update item
- `GET /cart` — get current user's cart
- `DELETE /cart/{id}` — remove item

Include proper DTOs (never expose entities directly), a global exception handler (`@ControllerAdvice`), consistent error response shape, and input validation (`jakarta.validation` annotations + `@Valid`).

---

## FRONTEND PAGES & ROUTING

Build these pages with React Router, using protected routes for authenticated/admin-only areas, lazy loading + code splitting per route:

Landing Page · Login · Register · Home · Categories · Product Details · Cart · Checkout · Order Success · Profile · Admin Dashboard · Admin Products · Admin Orders · 404 Page

**Navbar (sticky):** Logo, Home, Categories, Search, Cart, Profile, Login/Register (conditional), Admin Dashboard link (admin only).

**Footer:** Store details, address, phone, email, opening hours, social icons with animated hover states.

**Extra features to include:** Wishlist, product ratings (optional), Recently Viewed, Recommended Products, image lazy loading, toast notifications (e.g., react-hot-toast), dark mode toggle, back-to-top button, floating WhatsApp contact button, responsive sidebar for mobile, breadcrumb navigation.

**State/data layer:** Context API + custom hooks for auth state and cart state; Axios instance with interceptors for attaching JWT and handling 401s.

---

## SECURITY REQUIREMENTS

- JWT authentication with proper token expiry and refresh handling (or clear re-login flow if you skip refresh tokens — state your decision).
- BCrypt for all password storage.
- Role-based method/route authorization on the backend (`@PreAuthorize` or filter-based).
- Server-side input validation on every endpoint, not just frontend validation.
- Global exception handling with meaningful HTTP status codes and error payloads.
- CORS configured correctly for the Vite dev server origin.

---

## FOLDER STRUCTURE (follow exactly)

**Frontend (`src/`)**
```
components/
pages/
layouts/
services/
hooks/
context/
assets/
styles/
utils/
```

**Backend**
```
controller/
service/
repository/
entity/
dto/
config/
security/
exception/
utils/
```

---

## HOW TO PROCEED

1. Start by scaffolding both projects (Vite React app + Spring Boot Maven project) with the folder structures above.
2. Implement the database entities and confirm the schema builds cleanly against MySQL using the credentials provided.
3. Build backend auth (register/login + JWT filter + BCrypt) first, and verify it with a quick manual test before moving on.
4. Implement Products CRUD + Orders + Cart APIs, with DTOs and validation.
5. Build the frontend shell (routing, layout, navbar/footer, theme tokens/CSS variables for the color palette) before wiring up individual pages.
6. Implement pages in this order: Landing → Login/Register → Home → Product listing/details → Cart → Checkout/Order Success → Profile → Admin Dashboard → Admin Products → Admin Orders.
7. Layer in animations (Framer Motion/GSAP) once functional flows work — don't block functionality on polish.
8. Do a final pass for responsiveness, accessibility (labels, focus states, contrast), and error states (empty states, failed requests, loading skeletons).

Ask clarifying questions only if something is genuinely ambiguous; otherwise make sensible, documented decisions and keep building. Provide a short README at the end explaining how to run both the frontend and backend locally, including the MySQL setup step.
