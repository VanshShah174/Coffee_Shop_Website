# Brew Heaven - Coffee Shop App

Welcome to the **Brew Heaven Coffee Shop App**! This project is designed to showcase a functional coffee shop application with a robust frontend and backend structure.

## Project Structure

The project is organized into the following directories:

### 1. **coffee-shop-tabs (Frontend)**
This directory contains the Ionic-based frontend of the application.

Key Files and Directories:
- `ionic.config.json`: Configuration for the Ionic app.
- `index.html`: Main entry point of the application.
- `tsconfig.json`: TypeScript configuration for the frontend.
- `src/`: Source files for the Ionic application.

### 2. **coffee-shop-backend (Backend)**
This directory contains the NestJS backend for the application.

Key Files and Directories:
- `nest-cli.json`: Configuration for the NestJS application.
- `dist/`: Compiled output for the backend.
- `test/`: Unit tests for the backend.
- `node_modules/`: Dependencies for the backend.

## Features

### **Frontend Features**

1. **Navigation Tabs**:
   - The application includes **four tabs**: `Home`, `Menu`, `Cart`, and `Profile`.

2. **Home Page**:
   - Features an **Explore Menu** button, allowing users to navigate directly to the menu.

3. **Menu Page**:
   - Allows users to **search menu items** using a search bar.
   - Items can be **sorted by categories** such as `All`, `Hot Drinks`, `Cold Drinks`, etc.
   - Users can view detailed information about the available items.

4. **Cart and Authentication**:
   - Users can add menu items to the cart **only if they are logged in**.
   - If not logged in, the app displays a **prompt to log in** and redirects the user to the login/signup page.
   - After successful login/signup, users can add items to their cart.

5. **Cart and Checkout**:
   - Users can view the items added to the cart on the **Cart Page**.
   - They can proceed to **checkout** from the cart page.

6. **Profile Page**:
   - Displays user account details.
   - Allows users to manage their account information.

### **Backend Features**

- **Authentication**:
  - User login and signup functionality with secure password handling.
- **RESTful APIs**:
  - Endpoints to manage menu items, cart operations, and user authentication.
- **Database Integration**:
  - Manages user data, menu items, and order information.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory and install dependencies.

   **Frontend**:
   ```bash
   cd Brew_Heaven_Assignment_4_Ionic/coffee-shop-tabs
   npm install
   ```

   **Backend**:
   ```bash
   cd Brew_Heaven_Assignment_4_Ionic/coffee-shop-backend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm run start
   ```

2. Start the frontend server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:8100` for the frontend.

## Contribution

Feel free to fork this project and submit pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License.
