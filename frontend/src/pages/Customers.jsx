import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchCustomers = () => {
    fetch("http://https://salonease-backend-qn1t.onrender.com/customers")
      .then(res => res.json())
      .then(data => setCustomers(data));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = () => {
    if (!name || !phone) return;

    fetch("http://https://salonease-backend-qn1t.onrender.com/customers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, phone, email })
    })
      .then(res => res.json())
      .then(() => {
        setName("");
        setPhone("");
        setEmail("");
        fetchCustomers();
      });
  };

  const deleteCustomer = (id) => {
    fetch(`http://https://salonease-backend-qn1t.onrender.com/customers/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => fetchCustomers());
  };

  const startEdit = (customer) => {
    setEditingId(customer._id);
    setEditData(customer);
  };

  const saveEdit = () => {
    fetch(`http://https://salonease-backend-qn1t.onrender.com/customers/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editData)
    })
      .then(res => res.json())
      .then(() => {
        setEditingId(null);
        fetchCustomers();
      });
  };

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    (c.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const phoneCount = {};
  customers.forEach(c => {
    phoneCount[c.phone] = (phoneCount[c.phone] || 0) + 1;
  });

  const renderCard = (customer) => {
    const isEditing = editingId === customer._id;
    const isRepeated = phoneCount[customer.phone] > 1;

    const date = new Date(customer.createdAt);
    const formattedDate = date.toLocaleDateString();

    return (
      <div className="col-md-4 mb-3" key={customer._id}>
        <div
          style={{
            background: "#fdebed",
            borderRadius: "22px",
            padding: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            transition: "all 0.25s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,0.22)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
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
                value={editData.phone}
                onChange={e =>
                  setEditData({ ...editData, phone: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                value={editData.email}
                onChange={e =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />

              <button className="btn btn-success btn-sm" onClick={saveEdit}>
                Save
              </button>
            </>
          ) : (
            <>
              <h5>{customer.name}</h5>
              <p>📞 {customer.phone}</p>
              <p>✉ {customer.email || "No email"}</p>

              <p style={{ fontSize: "13px", color: "#555" }}>
                Added on: {formattedDate}
              </p>

              <p
                style={{
                  fontWeight: "bold",
                  color: isRepeated ? "#7b3fe4" : "green"
                }}
              >
                {isRepeated ? "🔁 Repeated Customer" : "🆕 New Customer"}
              </p>

              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => startEdit(customer)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteCustomer(customer._id)}
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
    <div
      style={{
        minHeight: "100vh",
        background: "#f3b3b6",
        paddingTop: "70px"
      }}
    >
      <div style={{ maxWidth: "950px", margin: "0 auto", textAlign: "center" }}>

        <h1>
          <span
            style={{
              fontFamily: "Great Vibes",
              fontSize: "64px",
              color: "white"
            }}
          >
            SalonEase
          </span>
        </h1>

        <p
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "white",
            marginBottom: "20px"
          }}
        >
          Customer Management
        </p>

        <input
          className="form-control mb-4"
          placeholder="Search by name, phone or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div
          style={{
            background: "#fdebed",
            borderRadius: "22px",
            padding: "25px",
            marginBottom: "40px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
          }}
        >
          <h4>Add Customer</h4>

          <input
            className="form-control mb-2"
            placeholder="Customer Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Email (optional)"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <button className="btn btn-primary" onClick={addCustomer}>
            Add Customer
          </button>
        </div>

        <div className="row">
          {filteredCustomers.map(renderCard)}
        </div>

      </div>
    </div>
  );
}