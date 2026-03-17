# KELOLA.IN

Companion tools for business owners who use WhatsApp as their main platform for receiving orders.

Kelola.in keeps your WhatsApp-based business **tidy and organized** — from product catalogs to order tracking and expense monitoring, all in one place.

---

## Features

| Feature | Description |
| --- | --- |
| Catalog | Create and Share your product / services catalog |
| Cart and Checkout | Buyer browse, add to cart, and checkout via Whatsapp |
| Order | Track and manage incoming orders |
| Expense | Log and monitor your business cost |

---

## Katalog

After setting up business profile, owners can build their product or service details.

- **Name** - product or service title.
- **Category** - organize with category.
- **Price** - Set your pricing.
- **Description** - details for product / service.

Owner can also **copy a static link** to share directly to buyers.

---

## Cart and Checkout

Buyers can:

1. Browse your catalog, search by name or category.
2. Add product to their cart.
3. Checkout - which **automatically automatically send a Whatsapp Message** to business owner

No extra apps needed for buyers. Just Whatsapp.

---

## Order

Once order receive, business owner can:

- **Track order status** - Ongoing, Canceled or Done.
- **Create order manually** - for buyers who order directly via Whatsapp or Social Media, so every transaction stay on record.

---

## Expense

Business owner can log and monitor operational cost to stay top of their financial.

- Record business expenses with amount, category and notes.

> **Roadmap:** Profit/loss summary report upcoming in future update.

---

## TechStack

| Layer | Techonology |

| --- | --- |
| Framework | [Next.js](https://nextjs.org/) |
| DatabaseORM | [Prisma](https://prisma.io/) |
| Authentication | [Better-auth](https://better-auth.com/) |
| Styling | [TailwindCss](https://tailwindcss.com/) |
| Image Storage | [ImageKit](https://imagekit.io/) |

---

## Design Philosophy

Kelola.in is built in **mobile first** - designed for business owner who run everything from their smartphone. Just like how they use Whatsapp.

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or your configured prisma database)
- Imagekit account
- Whatsapp number for your business.

### Installation

```bash
git clone https://github.com/agung343/kelola.in
cd kelola.in
npm install
```

### Run Developement Server

```bash
npx prisma migrate dev
npm run dev
```

Open [http://localhost:300](http://localhost:3000) on browser or user DevTools mobile view.

---

## Roadmap

- [x] Business Profile
- [x] Katalog.
- [x] Cart and Checout.
- [x] Order management.
- [x] Expenses Tracking.
- [ ] Profit / Loss Summary.
- [ ] Analytics Dashboard.

---

## License

MIT © Kelola.in
