import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Layout from './component/Layout';
import Login from './page/Login';
import AdminLayout from './component/admin/AdminLayout';
import Dashboard from './page/admin/Dashboard';
import Product from './page/admin/Product';
import Category from './page/admin/Category'; // Import the Category component


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Frontend Routes */}
          <Route path="/" element={<Layout />}>


          </Route>

          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          {/* {/*<Route path="/register" element={<Register />} /> */}




          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Product />} />
            <Route path="categories" element={<Category />} /> {/* Added category route */}
            {/* <Route path="/admin/student" element={<Student />} />
            <Route path="/admin/add-blog" element={<AddBlog />} />
            <Route path="/admin/view-blog" element={<ViewBlog />} />
            <Route path="/admin/edit-blog/:id" element={<AddBlog />} />
            <Route path="/admin/user" element={<User />} />
            <Route path="/admin/add-user" element={<AddUser />} />
            <Route path="/admin/edit-user/:id" element={<AddUser />} />
            <Route path="/admin/view-user/:id"={<ViewUser />} /> */}
          </Route>
        </Routes>


      </BrowserRouter>
      <ToastContainer />


    </div>
  );
}

export default App;