import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  const isActive = (paths) => {
    return paths.includes(location.pathname);
  };

  const linkStyle = (paths) => ({
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: "12px",
    background: isActive(paths) ? "#f3b3b6" : "#e26f8f",
    color: isActive(paths) ? "white" : "#333",
    fontWeight: "600",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
    transition: "all 0.2s ease"
  });

  return (
    <nav
      style={{
        background: "#d90166",
        padding: "12px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        borderBottom: "3px solid #f3b3b6"
      }}
    >
      <h3
        style={{
          margin: 0,
          fontFamily: "Great Vibes",
          fontSize: "28px",
          color: "white"
        }}
      >
        SalonEase
      </h3>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

        {/* ===== CUSTOMER NAV ===== */}
        {!isLoggedIn && (
          <>
            <Link to="/customer" style={linkStyle(["/customer"])}>
              Home
            </Link>

            <Link to="/customer/products" style={linkStyle(["/customer/products"])}>
              Products
            </Link>

            <Link to="/customer/tryon" style={linkStyle(["/customer/tryon"])}>
              Try-On
            </Link>

            <Link to="/customer/classes" style={linkStyle(["/customer/classes"])}>
              Classes
            </Link>

            {/* CART */}
            <Link
              to="/customer/cart"
              style={{
                position: "relative",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: "12px",
                background: "#e26f8f",
                color: "white",
                fontWeight: "700",
                boxShadow: "0 3px 10px rgba(0,0,0,0.25)"
              }}
            >
              🛒 Cart
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    background: "#ffeb3b",
                    color: "#333",
                    fontSize: "12px",
                    fontWeight: "700",
                    borderRadius: "50%",
                    padding: "2px 6px"
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/login" style={linkStyle(["/login"])}>
              Admin Login
            </Link>
          </>
        )}

        {/* ===== ADMIN NAV ===== */}
        {isLoggedIn && (
          <>
            <Link to="/dashboard" style={linkStyle(["/dashboard", "/"])}>
              Dashboard
            </Link>

            <Link to="/products" style={linkStyle(["/products"])}>
              Products
            </Link>

            <Link to="/customers" style={linkStyle(["/customers"])}>
              Customers
            </Link>

            <Link to="/registrations" style={linkStyle(["/registrations"])}>
              Classes
            </Link>

            <Link to="/staff" style={linkStyle(["/staff"])}>
              Staff
            </Link>

            <Link to="/admin/product-leads" style={linkStyle(["/admin/product-leads"])}>
              Product Leads
            </Link>

            <Link to="/admin/class-leads" style={linkStyle(["/admin/class-leads"])}>
              Class Leads
            </Link>

            <Link to="/admin/analytics" style={linkStyle(["/admin/analytics"])}>
              Analytics
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "#e26f8f",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "12px",
                fontWeight: "700",
                boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
                marginLeft: "10px"
              }}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}