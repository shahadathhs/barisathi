# BariSathi (Smart Rental & Housing Solution)

BariSathi is a full-stack web application that offers a smart rental housing solution, connecting landlords, tenants, and an admin. Landlords can post and manage rental listings, while tenants can search for and request rentals. When a landlord approves a request, payment options become available to the tenant, and further contact can be made via the landlord’s phone number.

## Live Demo

- **Live URL:** [https://barisathi.vercel.app](https://barisathi.vercel.app)

## Project Overview

BariSathi provides a seamless platform for managing rental properties. It consists of three user roles:

- **Admin:** Manages all user accounts (Landlords, Tenants) and rental house posts.
- **Landlord:** Posts and manages rental listings and handles rental requests.
- **Tenant:** Searches rental properties and submits rental requests.

The project utilizes custom JWT-based authentication with password hashing via bcrypt and implements role-based access control to secure private pages.

## Key Components

### Core Functionalities

- **Rental House Listings:**

  - Landlords can create detailed listings including location, descriptions, rent amount, number of bedrooms, and images.
  - Tenants can browse, search, and filter listings by location, price range, and number of bedrooms.

- **Rental Requests:**

  - Tenants submit rental requests for desired properties.
  - Landlords can review, approve, or reject requests.
  - Upon approval, payment options (e.g., Stripe, ShurjoPay) become available to tenants.

- **Role-Based Dashboards:**

  - **Admin Dashboard:** Full control over user accounts and rental listings.
  - **Landlord Dashboard:** Manage personal listings and respond to rental requests.
  - **Tenant Dashboard:** Track the status of rental requests and complete payment when approved.

- **Email Notifications:** Automated updates for rental requests and other key actions.

### Security

- **Authentication:** Custom JWT authentication.
- **Password Hashing:** Uses bcrypt to securely store passwords.
- **Access Control:** Ensures that only authorized users can access specific routes based on their roles.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) for server-side rendering (SSR) and static site generation (SSG)
  - TypeScript for type safety
  - React for building user interfaces
- **Backend:** (Based on the linked server)
  - Node.js with Express
  - MongoDB for data storage
  - JWT for authentication
  - bcrypt for password hashing
- **Deployment:**
  - Frontend is deployed on Vercel

## Features and UI

### Home / Landing Page

- **Header:** Contains the BariSathi logo and a navigation bar with links to Home, About Us, All Listed Rental Housing, Dashboard (role-based), Login/Register, and My Profile.
- **Hero Section:** Features a catchy headline (e.g., “Find Your Perfect Rental House Today!”) and a call-to-action button for Landlords to post rental house info.
- **Search Functionality:** Allows users to filter rental listings by location, price range, and number of bedrooms.
- **Rental House Cards:** Each card shows key details such as location, images, brief description, rent amount, and number of bedrooms with a "View Details" link.

### Authentication and User Management

- **Login & Registration:**
  - Login form with fields for username/email and password.
  - Registration form with fields for username, email, password (with confirmation), and user role selection (Landlord or Tenant).
- **Profile Management:**
  - Options to edit user profile details and change password.

### Rental House Management

- **For Landlords (Private Routes):**
  - Form for submitting new rental listings with details such as location, description, rent amount, images, number of bedrooms, and amenities.
- **Rental House Details Page:**
  - Displays full details of a rental listing with images, descriptions, and a “Request Rental” button for tenants.
- **Rental Request Page (Tenant Only):**
  - Form for tenants to submit rental requests including move-in dates, rental duration, and special requirements.

### Dashboards

- **Admin Dashboard:**
  - Full control over user accounts and rental listings.
  - User management features (activate/deactivate accounts, update roles).
- **Landlord Dashboard:**
  - Manage rental posts and review rental requests.
  - Option to initiate payment requests upon approval.
- **Tenant Dashboard:**
  - Track the status of rental requests.
  - Payment options become available when a request is approved.

## Running Locally

### Prerequisites

- **Node.js:** Install Node.js (version 14 or above recommended).
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