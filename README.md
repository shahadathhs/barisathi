# 🏠 BariSathi (Smart Rental & Housing Solution)

BariSathi is a full-stack web application connecting landlords, tenants, and an admin in a smart rental-housing platform. Landlords post and manage rentals; tenants browse, filter, and request rentals; admins oversee users and listings. Secure JWT auth, role-based access, and Stripe payment options are built in.

---

## 📑 Table of Contents

- [🔗 Live Demo](#-live-demo)  
- [📂 Repository Links](#-repository-links)  
- [💡 Project Overview](#-project-overview)  
- [🛠️ Tech Stack](#tech-stack)  
- [📦 Packages Used](#-packages-used)  
- [🚀 Running Locally](#-running-locally)  

---

## 🔗 Live Demo

- **Frontend:** [https://barisathi.vercel.app](https://barisathi.vercel.app)  
- **Backend API:** [https://barisathi-server.vercel.app/api](https://barisathi-server.vercel.app/api)  

---

## 📂 Repository Links

- **Client:** https://github.com/shahadathhs/barisathi  
- **Server:** https://github.com/shahadathhs/barisathi-server  

---

## 💡 Project Overview

- **Admin**: Manage all users (landlords, tenants) and rental posts.  
- **Landlord**: Create/list/manage property posts; approve or reject tenant requests.  
- **Tenant**: Browse/search/filter rentals; submit requests; pay when approved.  
- **Notifications**: Email alerts for approvals, rejections, and payment confirmations.  
- **Security**: JWT-based auth, bcrypt password hashing, role-based access to private routes.

---

## Tech Stack

- **Frontend**: Next.js • React • TypeScript • Tailwind CSS • Radix UI • Framer Motion  
- **Backend**: Node.js • Express • MongoDB • Mongoose • Zod • JWT • Stripe  
- **Deployment**: Vercel (both client & server)  

---

## 📦 Packages Used

### Frontend (`/client`)

#### Dependencies

| Package                        | Version   |
| ------------------------------ | --------- |
| next                           | 15.2.0    |
| react                          | ^19.0.0   |
| react-dom                      | ^19.0.0   |
| @stripe/stripe-js              | ^7.0.0    |
| @stripe/react-stripe-js        | ^3.6.0    |
| @radix-ui/react-accordion      | ^1.2.3    |
| @radix-ui/react-dialog         | ^1.1.6    |
| @radix-ui/react-dropdown-menu  | ^2.1.6    |
| @radix-ui/react-slider         | ^1.2.3    |
| @hookform/resolvers            | ^4.1.3    |
| react-hook-form                | ^7.54.2   |
| clsx                           | ^2.1.1    |
| date-fns                       | ^4.1.0    |
| framer-motion                  | ^12.4.7   |
| jwt-decode                     | ^4.0.0    |
| lucide-react                   | ^0.477.0  |
| cloudinary                     | ^2.6.0    |
| zod                            | ^3.24.2   |
| sonner                         | ^2.0.1    |
| resend                         | ^4.1.2    |
| @tabler/icons-react            | ^3.30.0   |
| tailwind-merge                 | ^3.0.2    |
| tailwindcss-animate            | ^1.0.7    |

#### Dev Dependencies

| Package                     | Version |
| --------------------------- | ------- |
| typescript                  | ^5      |
| eslint-config-next          | 15.2.0  |
| eslint                      | ^9      |
| @eslint/eslintrc            | ^3      |
| tailwindcss                 | ^4      |
| @tailwindcss/postcss        | ^4      |
| @types/react                | ^19     |
| @types/react-dom            | ^19     |
| @types/node                 | ^20     |

---

## 🚀 Running Locally

**Note: this is only to run the frontend locally. To run the backend locally follow the guile in backend repository.**

### Prerequisites

- **Node.js:** Install Node.js (version 20 or above recommended).
- **npm or yarn:** Package manager for installing dependencies.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/shahadathhs/barisathi.git
   cd barisathi
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or if using yarn
   yarn install
   ```

3. **Environment Configuration:**

   Create a `.env.local` file in the root directory (follow `.env.example` file) and set any necessary environment variables. Typically, this may include API endpoints, keys, or other configuration details required by the frontend.

### Running the Development Server

Start the development server with:

```bash
npm run dev
# or if using yarn
yarn dev
```

This will start the Next.js development server on the default port (usually `http://localhost:3000`).

### Building for Production

To create a production build, run:

```bash
npm run build
npm start
# or with yarn
yarn build
yarn start
```

The production build is optimized for performance and will serve the built assets.