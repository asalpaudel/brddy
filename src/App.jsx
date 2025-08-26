import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Layout from './component/user/Layout';
import AdminLayout from './component/admin/AdminLayout';

// Auth Pages
import Login from './page/Login';
import Register from './page/Register';

// User Pages
import Home from './page/user/Home';
import Products from './page/user/Products';
import ProductDetail from './page/user/ProductDetail';
import Cart from './page/user/Cart';
import Checkout from './page/user/Checkout';
import MyOrders from './page/user/MyOrders';
import UserProfile from './page/user/UserProfile'; 
import AboutUs from './page/user/AboutUs';
import ContactUs from './page/user/ContactUs';

// Admin Pages
import Dashboard from './page/admin/Dashboard';
import Product from './page/admin/Product';
import Category from './page/admin/Category';
import OrdersAdmin from './page/admin/Orders';
import Users from './page/admin/Users';

// Utilities
import ProtectedRoute from './component/user/ProtectedRoute'; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Layout />}>

            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<ContactUs />} />

            
            <Route element={<ProtectedRoute />}>
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>
          </Route>

          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Product />} />
            <Route path="categories" element={<Category />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;