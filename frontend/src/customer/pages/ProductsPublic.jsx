import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductsPublic() {

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  const uniqueProducts = products.filter(
    (v, i, a) => a.findIndex(t => t.name === v.name) === i
  );

  const makeupProducts = uniqueProducts.filter(p => p.category === "Makeup");
  const hairProducts = uniqueProducts.filter(
    p => p.category === "Hair" || p.category === "Hair Care"
  );
  const skinProducts = uniqueProducts.filter(p => p.category === "Skin");

  const openForm = (product) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const submitLead = async () => {

    if (!formData.name || !formData.phone) {
      alert("Please fill all details");
      return;
    }

    await fetch("http://localhost:5000/product-leads/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        product: selectedProduct.name,
        category: selectedProduct.category,
        status: "Interested",
        date: new Date()
      })
    });

    setFormOpen(false);
    setConfirmOpen(true);
  };

  const openWhatsApp = () => {

    const message =
      "Hi, I am " + formData.name +
      ". I am interested in ordering " + selectedProduct.name +
      ". My contact number is " + formData.phone + ".";

    window.open(
      "https://wa.me/919892227332?text=" + encodeURIComponent(message),
      "_blank"
    );
  };

  return (

    <div style={page}>

      <h2 style={title}>💄 Makeup Products</h2>
      <div style={grid}>
        {makeupProducts.map(p => (
          <ProductCard key={p._id} product={p} onInterested={openForm} />
        ))}
      </div>

      <h2 style={title}>💇 Hair Care Products</h2>
      <div style={grid}>
        {hairProducts.map(p => (
          <ProductCard key={p._id} product={p} onInterested={openForm} />
        ))}
      </div>

      <h2 style={title}>🧴 Skin Care Products</h2>
      <div style={grid}>
        {skinProducts.map(p => (
          <ProductCard key={p._id} product={p} onInterested={openForm} />
        ))}
      </div>

      {formOpen && (
        <div style={popup}>

          <h3>Enter Details</h3>

          <input
            placeholder="Your Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            style={input}
          />

          <input
            placeholder="Phone Number"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            style={input}
          />

          <p><b>Product:</b> {selectedProduct.name}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button style={btn} onClick={submitLead}>Submit</button>
            <button style={{ ...btn, background: "#999" }} onClick={() => setFormOpen(false)}>Close</button>
          </div>

        </div>
      )}

      {confirmOpen && (
        <div style={popup}>

          <h3>Interest Recorded!</h3>
          <p>Continue on WhatsApp to complete order.</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button style={btn} onClick={openWhatsApp}>Open WhatsApp</button>
            <button style={{ ...btn, background: "#999" }} onClick={() => setConfirmOpen(false)}>Close</button>
          </div>

        </div>
      )}

    </div>
  );
}


function ProductCard({ product, onInterested }) {

  const { cart, addToCart, increaseQty, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();

  const item = cart.find(p => p._id === product._id);

  return (

    <div
      style={card}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 22px rgba(0,0,0,0.18)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.12)";
      }}
    >

      <img
        src={product.image}
        alt={product.name}
        style={img}
      />

      <h3>{product.name}</h3>
      <p><b>Brand:</b> {product.brand}</p>
      <p><b>Price:</b> ₹{product.price}</p>


      {/* ACTION BUTTONS FIRST */}

      <div style={btnContainer}>

        <button style={btn} onClick={() => onInterested(product)}>
          Interested
        </button>

        {!item ? (
          <button style={btn} onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        ) : (
          <div style={qtyBox}>
            <button style={qtyBtn} onClick={() => decreaseQty(product._id)}>-</button>
            <span>{item.qty}</span>
            <button style={qtyBtn} onClick={() => increaseQty(product._id)}>+</button>
          </div>
        )}

        <button
          style={{ ...btn, background: "#ff4d6d" }}
          onClick={() => navigate("/customer/checkout", { state: { product } })}
        >
          Buy Now
        </button>

      </div>


      {/* REVIEWS LAST */}

      <ReviewSection product={product} />

    </div>

  );
}


function ReviewSection({ product }) {

  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: ""
  });

  useEffect(() => {

    fetch(`http://localhost:5000/reviews/${product._id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.log(err));

  }, [product._id]);


  const submitReview = async () => {

    if (!form.name || !form.comment) {
      alert("Fill review details");
      return;
    }

    const res = await fetch("http://localhost:5000/reviews/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: product._id,
        productName: product.name,
        name: form.name,
        rating: Number(form.rating),
        comment: form.comment
      })
    });

    const savedReview = await res.json();

    setReviews([savedReview, ...reviews]);

    setForm({
      name: "",
      rating: 5,
      comment: ""
    });

  };


  const visibleReviews = showAll ? reviews : reviews.slice(0,3);


  return (

    <div style={{marginTop:"10px"}}>

      <b style={{color:"#d90166"}}>Reviews</b>

      {visibleReviews.map(r => (

        <div key={r._id} style={{
          fontSize:"12px",
          marginTop:"6px",
          background:"#fff",
          padding:"6px",
          borderRadius:"6px"
        }}>

          <div>{"⭐".repeat(r.rating)} <b>{r.name}</b></div>
          <div>{r.comment}</div>

        </div>

      ))}

      {reviews.length > 3 && !showAll && (
        <div
          onClick={()=>setShowAll(true)}
          style={{
            fontSize:"12px",
            color:"#d90166",
            cursor:"pointer",
            marginTop:"5px"
          }}
        >
          Show all reviews
        </div>
      )}

      <input
        placeholder="Your name"
        value={form.name}
        onChange={e => setForm({...form,name:e.target.value})}
        style={{
          width:"100%",
          marginTop:"8px",
          padding:"6px",
          borderRadius:"6px",
          border:"1px solid #ccc"
        }}
      />

      <select
        value={form.rating}
        onChange={e => setForm({...form,rating:e.target.value})}
        style={{
          marginTop:"5px",
          width:"100%",
          padding:"5px",
          borderRadius:"6px"
        }}
      >
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
      </select>

      <input
        placeholder="Write review"
        value={form.comment}
        onChange={e => setForm({...form,comment:e.target.value})}
        style={{
          width:"100%",
          marginTop:"5px",
          padding:"6px",
          borderRadius:"6px",
          border:"1px solid #ccc"
        }}
      />

      <button
        onClick={submitReview}
        style={{
          marginTop:"6px",
          width:"100%",
          background:"#d90166",
          color:"white",
          border:"none",
          padding:"7px",
          borderRadius:"8px",
          cursor:"pointer",
          fontWeight:"600"
        }}
      >
        Submit Review
      </button>

    </div>

  );

}

/* STYLES */

const page = {
  minHeight: "100vh",
  padding: "40px 20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "30px",
  maxWidth: "1100px",
  margin: "0 auto 40px auto"
};

const title = {
  color: "#d90166",
  marginBottom: "15px",
  textAlign: "center"
};

const card = {
  padding: "18px",
  background: "#ffe4ec",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
  transition: "0.25s",
  textAlign: "center"
};

const img = {
  width: "100%",
  height: "170px",
  objectFit: "contain",
  marginBottom: "10px",
  background: "#fff",
  padding: "8px"
};

const reviewInput = {
  width:"100%",
  marginTop:"6px",
  padding:"6px",
  borderRadius:"6px",
  border:"1px solid #ddd"
};

const reviewBtn = {
  marginTop:"6px",
  background:"#d90166",
  color:"white",
  border:"none",
  padding:"6px",
  borderRadius:"8px",
  cursor:"pointer",
  width:"100%"
};

const btnContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  marginTop: "10px"
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const btn = {
  background: "#e26f8f",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "10px",
  cursor: "pointer"
};

const qtyBtn = {
  background: "#e26f8f",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "4px 10px",
  cursor: "pointer"
};

const popup = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  zIndex: 1000
};

const input = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "8px"
};