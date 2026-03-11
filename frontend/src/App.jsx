import Analytics from "./pages/Analytics";
import ClassLeads from "./pages/ClassLeads";
import ProductLeads from "./pages/ProductLeads";
import Registrations from "./pages/Registrations";
import Customers from "./pages/Customers";
import Staff from "./pages/Staff";

import TryOnMediapipe from "./customer/pages/TryOnMediapipe";

import CartProvider from "./context/CartContext";
import CheckoutPage from "./customer/pages/CheckoutPage";
import InvoicePage from "./customer/pages/InvoicePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import TryOn from "./pages/TryOn";
import Login from "./pages/Login";

/* CUSTOMER */
import HomePublic from "./customer/pages/HomePublic";
import ProductsPublic from "./customer/pages/ProductsPublic";
import ClassesPublic from "./customer/pages/ClassesPublic";

/* CART */
import CartPage from "./customer/pages/CartPage";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>

        {/* NAVBAR */}
        <Navbar />

        <Routes>

          {/* ROOT */}
          <Route path="/" element={<HomePublic />} />
          <Route path="/login" element={<Login />} />

          {/* ADMIN */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/registrations" element={<Registrations />} />

          <Route path="/admin/product-leads" element={<ProductLeads />} />
          <Route path="/admin/class-leads" element={<ClassLeads />} />
          <Route path="/admin/analytics" element={<Analytics />} />

          <Route path="/staff" element={<Staff />} />

          <Route path="/tryon" element={<TryOn />} />

          {/* CUSTOMER */}
          <Route path="/customer" element={<HomePublic />} />
          <Route path="/customer/products" element={<ProductsPublic />} />
          <Route path="/customer/classes" element={<ClassesPublic />} />

          {/* MEDIAPIPE TRYON */}
          <Route path="/customer/tryon" element={<TryOnMediapipe />} />

          {/* CART + CHECKOUT */}
          <Route path="/customer/cart" element={<CartPage />} />
          <Route path="/customer/checkout" element={<CheckoutPage />} />
          <Route path="/customer/invoice" element={<InvoicePage />} />

        </Routes>

        {/* FOOTER */}
        <Footer />

      </BrowserRouter>
    </CartProvider>
  );
}