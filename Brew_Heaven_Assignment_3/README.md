# Brew Heaven ☕️

Welcome to **Brew Heaven** – a delightful coffee-themed web application designed to bring the best of coffee experiences to your screen. This project combines a robust frontend with a scalable backend, delivering a smooth and secure user experience for coffee enthusiasts.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Frontend Structure](#frontend-structure)
- [Backend Structure](#backend-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Pages](#pages)
- [License](#license)
- [Contributing](#contributing)

## Tech Stack
- **Frontend**: React, Vite, Redux, Tailwind CSS, Axios
- **Routing**: React Router DOM
- **Payment Integration**: Stripe
- **Backend**: NestJS, Stripe SDK
- **Database**: MongoDB (schema defined in the products module)

## Frontend Structure
- **components**: Reusable components across the application.
- **pages**: Application pages, including:
  - **Cancel.jsx**: Displays a message for canceled transactions or actions.
  - **Success.jsx**: Shows a success message for completed actions, such as successful transactions.
- **store**: Manages application state using Redux for efficient state management across components.
- **api**: API interaction files to communicate with the backend.
- **img**: Contains image assets.

### Frontend Dependencies
- `@stripe/stripe-js`: Stripe API integration for payments.
- `axios`: For API requests.
- `react`, `react-dom`: Core React libraries.
- `react-router-dom`, `react-router-hash-link`, `react-scroll`: For enhanced navigation and smooth scrolling.
- `redux` & `react-redux`: For managing application-wide state in a scalable manner.
- **Dev Dependencies**: Vite plugin for React, ESLint and plugins, Tailwind CSS, PostCSS, Autoprefixer.

## Backend Structure
The backend is built using **NestJS** and is structured for scalability and modularity.

- **Products Module**
  - `products.controller.ts`: Handles HTTP requests related to products, such as fetching product details.
  - `products.service.ts`: Contains business logic for product operations.
  - `product.schema.ts`: Defines the MongoDB schema for products.
- **Stripe Module**
  - Handles payment processing through Stripe for secure transactions.
- **App Module**
  - `app.controller.ts`: Main controller for non-product-related endpoints.
  - `app.service.ts`: Provides general application services.
  
### Backend Testing
- `products.controller.spec.ts` and `products.service.spec.ts`: Unit tests for the products module.

### Backend Dependencies
- **NestJS**: Core framework.
- **Stripe SDK**: For handling payments.

## Installation
### Frontend Setup
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/your-username/Brew-Heaven.git
   cd Brew-Heaven

2. Install frontend dependencies:
    ```bash
        npm install

3. Start the frontend development server:
    ```bash
    npm run dev

Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend

2. Install backend dependencies:
    ```bash
    npm install

Environment Variables

Create .env files in both the frontend and backend directories.

Frontend .env

```bash
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

Backend .env

```bash
STRIPE_SECRET_KEY=your_stripe_secret_key
# MongoDB connection details
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASS=your_db_password
```

Pages
The app consists of the following main pages:

1.Cancel Page: Displayed when a transaction is canceled.
2.Success Page: Displayed when a transaction completes successfully.

License
This project is licensed under the MIT License.

Contributing
Feel free to fork this repository and make contributions. Pull requests are welcome