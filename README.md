# 🧾 Receipto

Receipto is a modern web application that helps users track and manage their expenses by parsing receipt data—without storing the original image files. Built with cutting-edge technologies like **Next.js App Router**, **Supabase**, and **LlamaCloud**, it showcases a clean UI, smart data handling, and a strong grasp of server components and modern React patterns.

---

## 🚀 Features

- 📤 **Receipt Upload & Parsing**  
  Users upload receipt images, which are parsed using **LlamaCloud OCR**. Only the extracted data is stored—images are never saved.

- 📊 **Dashboard Overview**  
  Displays total expenses and key metrics. Includes an interactive area chart showing expenses over time, filterable by:
  - Last 7 days
  - Last 1 month
  - Last 1 year

- 📁 **History Page**  
  View all parsed receipts in a table format. Users can delete entries (data only, no file deletion needed).

- 🔐 **Authentication via Supabase**  
  Secure login/logout flow using Supabase Auth. Demo credentials available for testing.

- 🌙 **Dark Mode Support**  
  UI adapts to dark mode with optimized styling.

- 🔤 **Font Optimization**  
  Uses `next/font` to load and optimize the **Geist** font family.

---

## 🛠️ Tech Stack

| Technology     | Role                                      |
|----------------|-------------------------------------------|
| Next.js        | Frontend framework with App Router        |
| TypeScript     | Type-safe development                     |
| Supabase       | Auth & database                           |
| LlamaCloud     | OCR receipt parsing                       |
| Drizzle ORM    | Schema and database management            |
| Vercel         | Deployment platform                       |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Naveenkms/receipto.git
cd receipto

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase keys and LlamaCloud API credentials

# Run the development server
pnpm dev
