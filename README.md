# 🧾 Receipto

Receipto is a web application that helps users track and manage their expenses by parsing receipts. Built with technologies like **Next.js App Router**, **Supabase**, and **LlamaCloud**.

---

## 🚀 Features

- 📤 **Receipt Upload & Parsing**  
  Users upload receipt images, which are parsed using **LlamaCloud Extraction**. 

- 📊 **Dashboard Overview**  
  Displays total expenses and key metrics. Includes an interactive area chart showing expenses over time, filterable by:
  - Last 7 days
  - Last 1 month
  - Last 1 year

- 📁 **History Page**  
  View all parsed receipts in a table format. Users can delete entries.

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
| LlamaCloud     | OCR receipt parsing                       |
| Supabase       | Auth & database service                   |
| PostgreSQL     | Relational database                       |
| Drizzle ORM    | Database schema & migrations              |
| Vercel         | Deployment platform                       |

---
    

