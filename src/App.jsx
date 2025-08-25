import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './component/user/Layout';
import Login from './page/Login';
import Register from './page/Register';
import AdminLayout from './component/admin/AdminLayout';
import Dashboard from './page/admin/Dashboard';
import Product from './page/admin/Product';
import Category from './page/admin/Category';
import Home from './page/user/Home';
import Products from './page/user/Products';
import ProductDetail from './page/user/ProductDetail';
import Cart from './page/user/Cart';
import OrdersAdmin from './page/admin/Orders';
import Checkout from './page/user/Checkout';
import MyOrders from './page/user/MyOrders';
import AboutUs from './page/user/AboutUs';
import ContactUs from './page/user/ContactUs';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="about" element={<AboutUs/>} />
            <Route path="contact" element={<ContactUs/>} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="my-orders" element={<MyOrders />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Product />} />
            <Route path="categories" element={<Category />} />
            <Route path="orders" element={<OrdersAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;