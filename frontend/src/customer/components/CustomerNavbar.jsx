import { Link } from "react-router-dom";

export default function CustomerNavbar() {
  const btn = {
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: "12px",
    background: "#e26f8f",
    color: "#333",
    fontWeight: "600",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)"
  };

  return (
    <div
      style={{
        background: "#d90166",
        padding: "12px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
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

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/customer" style={btn}>Home</Link>
        <Link to="/customer/products" style={btn}>Products</Link>
        <Link to="/customer/tryon" style={btn}>Try-On</Link>
        <Link to="/customer/classes" style={btn}>Classes</Link>
        <Link to="/login" style={btn}>Admin Login</Link>
      </div>
    </div>
  );
}
