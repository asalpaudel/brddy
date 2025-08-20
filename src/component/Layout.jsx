// src/component/Layout.jsx

import { Outlet } from "react-router";
import Header from "./Header"; // Assuming your Header component is named this
import Footer from "./Footer";
import HeroBanner from "./HeroBanner"; // Assuming you have a Carousel component

const Layout = () => {
    return (
        // 1. Make this div a flex container that is a column
        // 2. Set its minimum height to the full screen height
        <div className="layout flex flex-col min-h-screen">
            <Header />
            <HeroBanner />
            
            {/* 3. Make the main content area grow to fill available space */}
            <main className="main-content flex-grow">

                {/* It's better to use Tailwind for centering and max-width 
                  instead of inline styles for better responsiveness.
                  'max-w-6xl' is roughly 1152px, close to your 1180px.
                */}
                <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Layout;