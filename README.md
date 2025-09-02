# Brrdy - Bakery E-commerce Platform

Brrdy is a full-featured e-commerce web application for a bakery. It provides a seamless experience for customers to browse products, place orders, and for administrators to manage the store. 

### Feel free to fork this repository, modify it, and use it for your own project.

-----

## Features

### User Features

  * **Authentication:** Users can register for a new account and log in.
  * **Product Browsing:** Browse all products with filtering by category and a search functionality.
  * **Product Details:** View detailed information about each product.
  * **Shopping Cart:** Add products to a shopping cart, update quantities, and remove items.
  * **Checkout:** Secure checkout process with an interactive map to pin the delivery location.
  * **Order History:** View past orders and their statuses.
  * **User Profile:** Users can update their profile information and change their password.
  * **Responsive Design:** The application is fully responsive and works on all devices.

### Admin Features

  * **Dashboard:** An overview of the store's performance, including total sales, orders, products, and categories.
  * **Product Management:** Add, edit, view, and delete products.
  * **Category Management:** Add, edit, and delete product categories.
  * **Order Management:** View all orders, filter them by status, and update their status.
  * **User Management:** View all registered users and delete them.
  * **Protected Routes:** The admin panel is protected and only accessible to users with the 'admin' role.

-----

## Technologies Used

  * **Frontend:** React.js, React Router, Tailwind CSS
  * **HTTP Client:** Axios
  * **Charting:** Recharts
  * **Interactive Maps:** Leaflet, OpenStreetMap
  * **Notifications:** React Toastify
  * **Backend (Mock):** `json-server` for the data API and a simple Express server for image uploads.

-----

## Installation and Setup

To run this project locally, you will need to have **Node.js** and **npm** (or yarn) installed.

### 1\. Clone the Repository

```bash
git clone <https://github.com/asalpaudel/brddy.git>
cd <repository-directory>
```

### 2\. Install Dependencies

Install the necessary frontend dependencies.

```bash
npm install
```

### 3\. Set Up the Backend Servers

This project requires two local servers to be running:

1.  A `json-server` for the main application data (products, orders, etc.).
2.  A simple server to handle image uploads.

#### **Data Server (json-server)**

1.  Install `json-server` globally if you haven't already:
    ```bash
    npm install -g json-server
    ```
2.  Run the data server on port **4000**:
    ```bash
    json-server --watch db.json --port 4000
    ```

#### **Image Upload Server**

1.  In your repository, you should have a file named `upload-server.js`.
2.  Run the image upload server on port **4001**:
    ```bash
    node upload-server.js
    ```

### 4\. Run the Frontend Application

Once both backend servers are running, you can start the React development server.

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

-----

## Usage

### User

1.  Navigate to the home page to see featured products and other sections.
2.  Go to the **Products** page to browse all available items.
3.  Click on any product to view its details.
4.  Add items to your cart.
5.  If you are not logged in, you will be prompted to do so before adding items to the cart.
6.  Proceed to **Checkout**, fill in your details, pin your location on the map, and place the order.
7.  You can view your order history in the **My Orders** page.

### Admin

1.  Navigate to the `/login` page and log in with the admin credentials.
2.  You will be redirected to the admin dashboard.
3.  Use the sidebar to navigate between **Products**, **Categories**, **Orders**, and **Users** management pages.
4.  You can perform CRUD (Create, Read, Update, Delete) operations on products and categories.
5.  You can view all orders and update their status.

-----

## Folder Structure

```
src
├── assets
├── component
│   ├── admin
│   └── user
├── context
├── page
│   ├── admin
│   └── user
├── services
└── utils
```

-----

## API Endpoints

The application interacts with the following API endpoints provided by the `json-server`.

  * `GET /products` - Fetches all products
  * `GET /products/{id}` - Fetches a single product by ID
  * `POST /products` - Creates a new product
  * `PUT /products/{id}` - Updates a product
  * `DELETE /products/{id}` - Deletes a product
  * `GET /categories` - Fetches all categories
  * `POST /categories` - Creates a new category
  * `PUT /categories/{id}` - Updates a category
  * `DELETE /categories/{id}` - Deletes a category
  * `GET /orders` - Fetches all orders
  * `POST /orders` - Creates a new order (places an order)
  * `PATCH /orders/{id}` - Updates an order's status
  * `GET /users` - Fetches all users
  * `POST /users` - Creates a new user (registration)
  * `DELETE /users/{id}` - Deletes a user

-----

## Admin Credentials

You can log in as an administrator using the following credentials:

  * **Email:** `admin@admin.com`
  * **Password:** `Admin@123`
