// src/component/user/Layout.jsx

import { Outlet } from "react-router";
// Updated import paths
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="layout flex flex-col min-h-screen">
            <Header />
            <main className="main-content flex-grow">
                <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Layout;