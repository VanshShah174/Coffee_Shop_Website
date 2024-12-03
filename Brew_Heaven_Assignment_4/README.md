# Brew Heaven ☕️
Welcome to **Brew Heaven** – a delightful coffee-themed web application designed to bring the best of coffee experiences to your screen. This project combines a robust frontend with a scalable backend, delivering a smooth and secure user experience for coffee enthusiasts.

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Frontend Structure](#frontend-structure)
3. [Backend Structure](#backend-structure)
4. [Backend Overview](#backend-overview)
5. [Installation](#installation)
6. [Environment Variables](#environment-variables)
7. [Pages](#pages)
8. [API Testing Results](#api-testing-results)
9. [License](#license)
10. [Contributing](#contributing)

---

## Tech Stack

### Frontend:
- **React**: Dynamic UI building.
- **Vite**: Fast development environment.
- **Redux**: State management.
- **Tailwind CSS**: Styling framework.
- **Fetch**: API request handling.
- **React Router DOM**: Navigation and routing.
- **Next.js**: Server-side rendering and static site generation.
- **Stripe Integration**: Secure payment processing.
- **TypeScript**: Enhances code quality with static type-checking.

### Backend:
- **NestJS**: Scalable, modular server-side framework built with TypeScript.
- **MongoDB**: Database for storing user and product data.
- **Stripe SDK**: Payment handling.
- **Passport & JWT**: Authentication and authorization.
- **BCrypt**: Secure password hashing.
- **TypeScript**: Ensures type safety and maintainable code for backend development.

---

## Frontend Structure

- **components**: Reusable UI components.
- **pages**: Main application pages:
  - \`Cancel.jsx\`: Displays a message for canceled transactions.
  - \`Success.jsx\`: Displays a success message for completed actions like successful payments.
  - \`Login.jsx\`: Handles user authentication login functionality.
  - \`Signup.jsx\`: Allows new users to register for an account.
  - \`AdminDashboard.jsx\`: Accessible by admins to manage the product catalog, user roles, and monitor transactions.
- **store**: Redux setup for state management.
- **api**: API communication files.
- **img**: Stores image assets.

---

## Frontend Dependencies

- \`@stripe/stripe-js\`: Stripe API integration.
- \`react\`, \`react-dom\`: Core React libraries.
- \`react-router-dom\`, \`react-scroll\`: Navigation and scrolling.
- \`redux\`, \`react-redux\`: State management.
- **Dev Dependencies**:
  - Vite React plugin.
  - ESLint and plugins.
  - Tailwind CSS, PostCSS, Autoprefixer.

---

## Backend Structure

The backend is implemented using **NestJS** with **TypeScript** for scalability, maintainability, and type safety.

### Modules
- **Products Module**:
  - \`products.controller.ts\`: Handles product-related endpoints.
  - \`products.service.ts\`: Business logic for product operations.
  - \`product.schema.ts\`: MongoDB schema for products.
- **Stripe Module**:
  - Integrates Stripe for secure payment processing.
- **Auth Module**:
  - Authentication and authorization using Passport and JWT.
- **App Module**:
  - Main module for non-product-specific endpoints.

---

## Installation

### Frontend Setup
1. Clone the repository and navigate to the project directory:
   \`\`\`bash
   git clone https://github.com/your-username/Brew-Heaven.git
   cd Brew-Heaven
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Backend Setup
1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the backend server:
   \`\`\`bash
   npm run start:dev
   \`\`\`

---

## Environment Variables

Create \`.env\` files for the frontend and backend to configure your application.

### Frontend \`.env\`:
\`\`\`env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
\`\`\`

### Backend \`.env\`:
\`\`\`env
STRIPE_SECRET_KEY=your_stripe_secret_key

DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASS=your_db_password
\`\`\`

---

## Pages

The application includes the following main pages:
1. **Cancel Page**: Displays when a transaction is canceled.
2. **Success Page**: Displays upon successful transaction completion.
3. **Login Page**: Allows users to log in with valid credentials.
4. **Signup Page**: Enables new users to create an account.
5. **Admin Dashboard**: Provides admin users with tools to manage the platform.

---

## API Testing Results

### Admin Features:
1. **Admin Login** (\`POST /auth/login\`): Returns an access token with admin privileges.
2. **Add Product** (\`POST /products/add\`): Allows admins to add new products to the catalog.

### User Features:
3. **User Login** (\`POST /auth/login\`): Provides an access token for regular users.
4. **Forbidden Action** (\`POST /products/add\`): Regular users cannot add products, resulting in a \`403 Forbidden\` response.
5. **Get Products** (\`GET /products\`): Retrieves the product catalog for authenticated users.

### Error Handling:
6. **Invalid Token**: Requests with expired or invalid tokens return a \`401 Unauthorized\` error.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request with your changes.

---

Enjoy your journey with **Brew Heaven**! ☕
