import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={container}>
      <h2 style={title}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div style={emptyBox}>
          <p>Your cart is empty.</p>
          <button style={btn} onClick={() => navigate("/customer/products")}>
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div style={tableWrap}>
            <table style={table}>
              <thead>
                <tr style={theadRow}>
                  <th style={th}>Product</th>
                  <th style={th}>Price</th>
                  <th style={th}>Quantity</th>
                  <th style={th}>Subtotal</th>
                  <th style={th}>Remove</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr key={item._id} style={tr}>
                    <td style={tdProduct}>
                      <img src={item.image} alt={item.name} style={img} />
                      <span>{item.name}</span>
                    </td>

                    <td style={td}>₹{item.price}</td>

                    <td style={td}>
                      <div style={qtyBox}>
                        <button
                          style={qtyBtn}
                          onClick={() => decreaseQty(item._id)}
                        >
                          -
                        </button>

                        <span>{item.qty}</span>

                        <button
                          style={qtyBtn}
                          onClick={() => increaseQty(item._id)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td style={td}>₹{item.price * item.qty}</td>

                    <td style={td}>
                      <button
                        style={removeBtn}
                        onClick={() => removeItem(item._id)}
                      >
                        ✖
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={summary}>
            <h3>Total: ₹{total}</h3>

            <button
              style={checkoutBtn}
              onClick={() => navigate("/customer/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  padding: "40px 20px"
};

const title = {
  textAlign: "center",
  color: "#d90166",
  marginBottom: "30px"
};

const tableWrap = {
  maxWidth: "1000px",
  margin: "0 auto",
  background: "#ffe4ec",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const theadRow = {
  borderBottom: "2px solid #f3b3b6"
};

const th = {
  textAlign: "left",
  padding: "12px",
  color: "#a1005c"
};

const tr = {
  borderBottom: "1px solid #f3b3b6"
};

const td = {
  padding: "12px"
};

const tdProduct = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px"
};

const img = {
  width: "60px",
  height: "60px",
  objectFit: "contain",
  background: "#fff",
  padding: "4px",
  borderRadius: "8px"
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const qtyBtn = {
  background: "#e26f8f",
  border: "none",
  color: "white",
  padding: "4px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const removeBtn = {
  background: "#ff4d6d",
  border: "none",
  color: "white",
  padding: "4px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const summary = {
  maxWidth: "1000px",
  margin: "30px auto",
  textAlign: "right"
};

const checkoutBtn = {
  background: "#ff4d6d",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "10px"
};

const emptyBox = {
  textAlign: "center",
  marginTop: "60px"
};

const btn = {
  background: "#e26f8f",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "10px"
};