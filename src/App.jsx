// src/App.jsx

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './component/Layout';
import Login from './page/Login';
import Register from './page/Register'; // 1. Import the new Register page
import AdminLayout from './component/admin/AdminLayout';
import Dashboard from './page/admin/Dashboard';
import Product from './page/admin/Product';
import Category from './page/admin/Category'; 


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Frontend Routes */}
          <Route path="/" element={<Layout />}>
            {/* Add your other public-facing routes here if needed */}
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* 2. Add the route for the register page */}

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Product />} />
            <Route path="categories" element={<Category />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;