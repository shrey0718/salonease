import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) navigate("/");
  }, []);

  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("Insight");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Makeup");
  const [image, setImage] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data || []));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = () => {

    if (!name || !price) {
      alert("Please fill product details");
      return;
    }

    fetch("http://localhost:5000/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        brand,
        price: Number(price),
        category,
        quantity: Number(quantity),
        image
      })
    })
      .then(res => res.json())
      .then(() => {
        setName("");
        setPrice("");
        setQuantity("");
        setImage("");
        fetchProducts();
      });
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(fetchProducts);
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditData(product);
  };

  const saveEdit = () => {

    fetch(`http://localhost:5000/products/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...editData,
        price: Number(editData.price),
        quantity: Number(editData.quantity)
      })
    })
      .then(res => res.json())
      .then(() => {
        setEditingId(null);
        fetchProducts();
      });
  };

  const filteredProducts = products.filter(p => {
    const name = p.name?.toLowerCase() || "";
    const brand = p.brand?.toLowerCase() || "";
    return (
      name.includes(search.toLowerCase()) ||
      brand.includes(search.toLowerCase())
    );
  });

  const makeupProducts = filteredProducts.filter(p => p.category === "Makeup");

  const hairProducts = filteredProducts.filter(
    p => p.category === "Hair Care" || p.category === "Hair"
  );

  const skinProducts = filteredProducts.filter(p => p.category === "Skin");

  const renderCard = (product) => {

    const isEditing = editingId === product._id;
    const isLowStock = (product.quantity || 0) <= 5;

    return (
      <div className="col-md-4 mb-3" key={product._id}>

        <div
          style={{
            background: "#fdebed",
            borderRadius: "22px",
            padding: "20px",
            transition: "all 0.25s ease",
            cursor: "pointer",
            boxShadow: isLowStock
              ? "0 0 15px rgba(255,0,0,0.35)"
              : "0 8px 20px rgba(0,0,0,0.15)",
            border: isLowStock ? "2px solid rgba(255,0,0,0.4)" : "none"
          }}

          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
            e.currentTarget.style.boxShadow = isLowStock
              ? "0 0 20px rgba(255,0,0,0.5)"
              : "0 14px 28px rgba(0,0,0,0.22)";
          }}

          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = isLowStock
              ? "0 0 15px rgba(255,0,0,0.35)"
              : "0 8px 20px rgba(0,0,0,0.15)";
          }}
        >

          {isEditing ? (
            <>

              <input
                className="form-control mb-2"
                value={editData.name}
                onChange={e =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                value={editData.image}
                placeholder="Image URL"
                onChange={e =>
                  setEditData({ ...editData, image: e.target.value })
                }
              />

              <select
                className="form-control mb-2"
                value={editData.brand}
                onChange={e =>
                  setEditData({ ...editData, brand: e.target.value })
                }
              >
                <option>Insight</option>
                <option>Matrix</option>
                <option>Herbs & Glow</option>
                <option>SSCPL</option>
              </select>

              <input
                className="form-control mb-2"
                value={editData.price}
                onChange={e =>
                  setEditData({ ...editData, price: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                value={editData.quantity}
                onChange={e =>
                  setEditData({ ...editData, quantity: e.target.value })
                }
              />

              <select
                className="form-control mb-2"
                value={editData.category}
                onChange={e =>
                  setEditData({ ...editData, category: e.target.value })
                }
              >
                <option>Makeup</option>
                <option>Hair Care</option>
                <option>Hair</option>
                <option>Skin</option>
              </select>

              <button className="btn btn-success btn-sm" onClick={saveEdit}>
                Save
              </button>

            </>
          ) : (
            <>

              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "contain",
                    background: "#fff",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    padding: "5px"
                  }}
                />
              )}

              <h5>{product.name}</h5>
              <p>{product.brand}</p>
              <p>₹{product.price}</p>

              <p>
                Stock: {product.quantity}

                {isLowStock && (
                  <span style={{ color: "red", marginLeft: 8 }}>
                    🔴 Low Stock
                  </span>
                )}
              </p>

              <p>{product.category}</p>

              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => startEdit(product)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </button>

            </>
          )}

        </div>
      </div>
    );
  };

  return (

    <div style={{ minHeight: "100vh", background: "#f3b3b6", paddingTop: "70px" }}>

      <div style={{ maxWidth: "950px", margin: "0 auto", textAlign: "center" }}>

        <h1>
          <span style={{ fontFamily: "Great Vibes", fontSize: 64, color: "white" }}>
            SalonEase
          </span>
        </h1>

        <p style={{ fontSize: 30, fontWeight: 700, color: "white" }}>
          Product Inventory
        </p>

        <input
          className="form-control mb-4"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div
          style={{
            background: "#fdebed",
            borderRadius: 22,
            padding: 25,
            marginBottom: 40
          }}
        >

          <h4>Add Product</h4>

          <input
            className="form-control mb-2"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Image URL"
            value={image}
            onChange={e => setImage(e.target.value)}
          />

          <select
            className="form-control mb-2"
            value={brand}
            onChange={e => setBrand(e.target.value)}
          >
            <option>Insight</option>
            <option>Matrix</option>
            <option>Herbs & Glow</option>
            <option>SSCPL</option>
          </select>

          <input
            className="form-control mb-2"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Quantity"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />

          <select
            className="form-control mb-3"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>Makeup</option>
            <option>Hair Care</option>
            <option>Hair</option>
            <option>Skin</option>
          </select>

          <button className="btn btn-primary" onClick={addProduct}>
            Add Product
          </button>

        </div>

        <h3 style={{ color: "white" }}>💄 Makeup</h3>
        <div className="row mb-4">{makeupProducts.map(renderCard)}</div>

        <h3 style={{ color: "white" }}>💇 Hair</h3>
        <div className="row mb-4">{hairProducts.map(renderCard)}</div>

        <h3 style={{ color: "white" }}>🧴 Skin</h3>
        <div className="row">{skinProducts.map(renderCard)}</div>

      </div>
    </div>
  );
}