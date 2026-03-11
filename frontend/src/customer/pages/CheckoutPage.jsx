import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {

  const { cart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const buyNowProduct = location.state?.product;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  let items = buyNowProduct
    ? [{ ...buyNowProduct, qty: 1 }]
    : cart;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const finalDiscount = subtotal * discount;
  const shipping = 0;

  // round total properly
  const total = Math.round((subtotal - finalDiscount + shipping));

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const applyCoupon = () => {

    if (coupon.toUpperCase() === "SHREYA10") {
      setDiscount(0.10);
      setCouponApplied(true);
      alert("Coupon Applied! 10% Discount");
    } else {
      alert("Invalid Coupon Code");
    }

  };

  const handlePayment = () => {

    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all details");
      return;
    }

    const orderId =
      "SE-" + Math.floor(100000 + Math.random() * 900000);

    // Razorpay requires integer paise
    const amountInPaise = total * 100;

    const options = {

      key: "rzp_test_SNrPU5SuRrpw2l",
      amount: amountInPaise,
      currency: "INR",
      name: "SalonEase",
      description: "Product Purchase",

      handler: async function (response) {

        try {

          const orderData = {
            orderId,
            name: form.name,
            phone: form.phone,
            address: form.address,
            city: form.city,
            pincode: form.pincode,
            items,
            subtotal,
            discount: finalDiscount,
            shipping,
            total,
            paymentId: response.razorpay_payment_id,
            status: "Ordered",
            date: new Date()
          };

          const res = await fetch(
            "http://localhost:5000/product-leads/order",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(orderData)
            }
          );

          if (!res.ok) {
            throw new Error("Order save failed");
          }

          alert("Payment Successful!");

          navigate("/customer/invoice", {
            state: orderData
          });

        } catch (error) {

          console.log("ORDER SAVE ERROR:", error);
          alert("Payment succeeded but order not saved!");

        }

      },

      prefill: {
        name: form.name,
        contact: form.phone
      },

      theme: {
        color: "#d90166"
      }

    };

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (

    <div style={container}>

      <h2 style={title}>Checkout</h2>

      <div style={grid}>

        <div style={box}>

          <h3>Shipping Details</h3>

          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={input}/>
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} style={input}/>
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} style={input}/>
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} style={input}/>
          <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} style={input}/>

        </div>

        <div style={box}>

          <h3>Order Summary</h3>

          {items.map(item => (
            <div key={item._id} style={itemRow}>
              <span>{item.name} x {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr />

          <div style={itemRow}>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div style={itemRow}>
            <span>Shipping</span>
            <span style={{ color: "green" }}>FREE (PAN INDIA)</span>
          </div>

          {couponApplied && (
            <div style={itemRow}>
              <span>Coupon Discount</span>
              <span style={{ color: "green" }}>
                - ₹{Math.round(finalDiscount)}
              </span>
            </div>
          )}

          <hr />

          <div style={{ marginBottom: "10px" }}>
            <input
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              style={input}
            />

            <button style={couponBtn} onClick={applyCoupon}>
              Apply Coupon
            </button>
          </div>

          <hr />

          <h3>Total: ₹{total}</h3>

          <button style={payBtn} onClick={handlePayment}>
            Pay with Razorpay
          </button>

        </div>

      </div>

    </div>
  );
}


/* STYLES */

const container = {
  minHeight: "100vh",
  padding: "40px 20px"
};

const title = {
  textAlign: "center",
  color: "#d90166",
  marginBottom: "30px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "30px",
  maxWidth: "900px",
  margin: "0 auto"
};

const box = {
  background: "#ffe4ec",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
};

const input = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "8px"
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px"
};

const couponBtn = {
  background: "#d90166",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer"
};

const payBtn = {
  marginTop: "15px",
  background: "#528FF0",
  border: "none",
  color: "white",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%"
};