# Brew Heaven ☕️  

Welcome to **Brew Heaven** – a full-featured coffee shop web application and mobile application designed to deliver a delightful user experience for coffee enthusiasts. This project combines a dynamic **frontend**, a robust **backend**, and a responsive **mobile application**, integrating secure payment processing and advanced features to provide a seamless coffee shop experience.  

The project includes both a **web application** and a **mobile application** built using modern technologies:  
- The **web application** leverages **React.js**, **Next.js**, and **NestJS** for a scalable and maintainable solution.  
- The **mobile application** is built using **Ionic with React** for a cross-platform experience, combined with the same **NestJS** backend for consistent functionality.  

---

## Table of Contents  
1. [Project Overview](#project-overview)  
2. [Tech Stack](#tech-stack)  
3. [Frontend Structure](#frontend-structure)  
4. [Backend Structure](#backend-structure)  
5. [Features](#features)  
6. [Pages](#pages)  
7. [Installation](#installation)  
8. [Environment Variables](#environment-variables)  
9. [API Testing Results](#api-testing-results)  
10. [Future Enhancements](#future-enhancements)  
11. [License](#license)  
12. [Contributing](#contributing)  

---

## **Project Overview**  

**Brew Heaven** is a comprehensive project that provides both web and mobile applications for coffee enthusiasts. Its goal is to create a seamless user experience for browsing, selecting, and purchasing beverages across multiple platforms.  

### **Web Application**  
- Built using **React.js**, **Next.js**, and **Redux**, ensuring a dynamic and responsive user interface.  
- A robust **NestJS** backend provides secure authentication, role-based access, and seamless integration with **MongoDB** for data storage.  

### **Mobile Application**  
- Developed with **Ionic Framework** and **React** for a cross-platform mobile app.  
- The same **NestJS** backend powers the mobile app, ensuring consistent functionality and API compatibility.  

Both applications support secure payment processing through **Stripe**, user authentication, and role-based access (Admin/User).  

---

## **Tech Stack**  

### **Frontend (Web)**  
- **React**: Dynamic UI building.  
- **Next.js**: Server-side rendering and static site generation.  
- **Redux**: State management.  
- **Vite**: Fast development environment.  
- **Tailwind CSS**: Styling framework.  
- **Fetch API**: For handling API requests.  
- **React Router DOM**: Navigation and routing.  
- **Stripe Integration**: Secure payment processing.  
- **TypeScript**: Static type-checking for better code quality.  

### **Mobile Application (Ionic)**  
- **Ionic Framework**: For cross-platform mobile app development.  
- **React**: Used as the framework for building the Ionic app.  
- **Ionic Capacitor**: To integrate native device features.  

### **Backend**  
- **NestJS**: Scalable, modular backend framework.  
- **MongoDB**: Stores user and product data.  
- **Stripe SDK**: Payment processing.  
- **Passport & JWT**: Authentication and authorization.  
- **BCrypt**: Secure password hashing.  
- **TypeScript**: Ensures maintainable backend code.  

---

## **Frontend and Mobile Structure**  
- **components**: Reusable UI components across the application.  
- **pages**: Main application pages (e.g., Home, Menu, Cart).  
- **store**: Redux setup for state management (web app).  
- **api**: Handles API interactions with the backend.  
- **img**: Stores image assets for the application.  

---

## **Backend Structure**  
The backend is built using **NestJS**, offering modularity and scalability.  

### **Key Modules**  
1. **Auth Module**: Handles user authentication and role-based access.  
   - \`auth.controller.ts\`: Manages authentication endpoints (e.g., login, register).  
   - \`auth.service.ts\`: Implements business logic for user credentials and roles.  
2. **Products Module**: Manages product-related functionalities.  
   - \`products.controller.ts\`: Handles HTTP requests for product data.  
   - \`products.service.ts\`: Contains business logic for product operations.  
   - \`product.schema.ts\`: MongoDB schema for storing product details.  
3. **Stripe Module**: Integrates secure payment processing.  
4. **App Module**: Main entry point for the backend.  

---

## **Features**  

### **Web Application Features**  
- **Signup and Login Pages**:  
  - Users can register or log in securely.  
  - Includes role-based access for Admin and User.  

- **Home Page**:  
  - Displays a welcoming message and highlights the coffee shop's purpose.  

- **Menu Page**:  
  - Categorized menu (e.g., Hot Drinks, Cold Drinks, Pastries).  
  - Dynamic quantity adjustment for products.  

- **Cart Page**:  
  - Displays selected products, quantities, and total cost.  
  - Allows users to remove items or proceed to checkout.  

- **Stripe Checkout**:  
  - Secure payment processing with a detailed summary of the order.  

- **Profile Page**:  
  - Manage account details and view past orders.  

### **Mobile Application Features**  
1. **Navigation Tabs**:  
   - Includes **Home**, **Menu**, **Cart**, and **Profile**.  

2. **Home Page**:  
   - Features a direct button to explore the menu.  

3. **Menu Page**:  
   - Categorized menu with a search bar.  
   - Users can view item details and add products to their cart.  

4. **Cart and Checkout**:  
   - View selected items and proceed to checkout.  

5. **Profile Page**:  
   - Displays user account details and allows account management.  

---

## **Installation**  

### **Frontend Setup**  
1. Clone the repository:  
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

### **Mobile Application Setup (Ionic)**  
1. Navigate to the mobile app directory:  
   \`\`\`bash  
   cd Brew_Heaven_Ionic  
   \`\`\`  
2. Install dependencies:  
   \`\`\`bash  
   npm install  
   \`\`\`  
3. Start the Ionic development server:  
   \`\`\`bash  
   ionic serve  
   \`\`\`  

### **Backend Setup**  
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

## **Environment Variables**  
Create \`.env\` files for the frontend, mobile app, and backend to configure your application.  

### **Frontend \`.env\`:**  
\`\`\`env  
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key  
\`\`\`  

### **Mobile App \`.env\`:**  
\`\`\`env  
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key  
\`\`\`  

### **Backend \`.env\`:**  
\`\`\`env  
STRIPE_SECRET_KEY=your_stripe_secret_key  

DB_HOST=your_db_host  
DB_USER=your_db_user  
DB_PASS=your_db_password  
\`\`\`  

---

## **API Testing Results**  

### **Admin Features**  
1. **Admin Login** (\`POST /auth/login\`): Returns a token with admin privileges.  
2. **Add Product** (\`POST /products/add\`): Allows admins to add new products.  

### **User Features**  
3. **User Login** (\`POST /auth/login\`): Provides a token for regular users.  
4. **Forbidden Action** (\`POST /products/add\`): Regular users cannot add products (\`403 Forbidden\`).  
5. **Get Products** (\`GET /products\`): Retrieves the product catalog for authenticated users.  

---

## **License**  
This project is licensed under the [MIT License](LICENSE).  

---

## **Contributing**  
We welcome contributions! Feel free to fork this repository and submit pull requests.  

---

Enjoy your journey with **Brew Heaven**! ☕  
