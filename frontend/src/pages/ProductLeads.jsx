import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductLeads() {

  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("💄 Makeup");
  const [status, setStatus] = useState("Interested");



  useEffect(() => {

    const isLoggedIn = localStorage.getItem("adminLoggedIn");

    if (!isLoggedIn) {
      navigate("/");
    }

  }, []);




  const fetchLeads = async () => {

    try {

      const res = await fetch("http://localhost:5000/product-leads/");
      const data = await res.json();

      // sort newest first
      const sorted = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setLeads(sorted);

    } catch (error) {

      console.log("Error fetching leads:", error);

    }

  };



  useEffect(() => {

    fetchLeads();

    // auto refresh
    const interval = setInterval(() => {
      fetchLeads();
    }, 5000);

    return () => clearInterval(interval);

  }, []);




  const addLead = () => {

    fetch("http://localhost:5000/product-leads/add", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name,
        phone,
        product,
        category,
        status
      })

    })
      .then(res => res.json())
      .then(() => {

        setName("");
        setPhone("");
        setProduct("");

        fetchLeads();

      });

  };




  const deleteLead = (id) => {

    fetch(`http://localhost:5000/product-leads/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => fetchLeads());

  };




  const updateStatus = (id, newStatus) => {

    fetch(`http://localhost:5000/product-leads/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        status: newStatus
      })

    })
      .then(res => res.json())
      .then(() => fetchLeads());

  };




  /* CATEGORY FILTERS */

  const makeupLeads = leads.filter(
    l => l.category?.toLowerCase().includes("makeup")
  );

  const hairLeads = leads.filter(
    l => l.category?.toLowerCase().includes("hair")
  );

  const skinLeads = leads.filter(
    l => l.category?.toLowerCase().includes("skin")
  );




  const renderTable = (data) => (

    <table
      className="table"
      style={{
        background: "#fdebed",
        borderRadius: "12px",
        overflow: "hidden"
      }}
    >

      <thead>

        <tr style={{ background: "#f3b3b6", color: "white" }}>

          <th>Name</th>
          <th>Phone</th>
          <th>Product</th>
          <th>Status</th>
          <th>Date</th>
          <th>Delete</th>

        </tr>

      </thead>

      <tbody>

        {data.map((lead) => (

          <tr key={lead._id}>

            <td>{lead.name}</td>
            <td>{lead.phone}</td>
            <td>{lead.product}</td>

            <td>

              <select
                className="form-select"
                value={lead.status}
                onChange={(e) =>
                  updateStatus(lead._id, e.target.value)
                }
              >

                <option>Interested</option>
                <option>Ordered</option>
                <option>Delivered</option>

              </select>

            </td>

            <td>
              {lead.date
                ? new Date(lead.date).toLocaleDateString()
                : ""}
            </td>

            <td>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteLead(lead._id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );




  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f3b3b6",
        paddingTop: "70px"
      }}
    >

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center"
        }}
      >

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
          Product Leads
        </p>



        {/* ADD LEAD SECTION */}

        <div
          style={{
            background: "#fdebed",
            borderRadius: "22px",
            padding: "25px",
            marginBottom: "40px"
          }}
        >

          <h4>Add Lead</h4>

          <input
            className="form-control mb-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />



          <select
            className="form-control mb-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option>💄 Makeup</option>
            <option>💇 Hair Care</option>
            <option>🧴 Skin Care</option>

          </select>



          <select
            className="form-control mb-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >

            <option>Interested</option>
            <option>Ordered</option>
            <option>Delivered</option>

          </select>



          <button
            className="btn btn-primary"
            onClick={addLead}
          >
            Add Lead
          </button>

        </div>



        <h3 style={{ color: "white" }}>💄 Makeup Leads</h3>
        {renderTable(makeupLeads)}

        <h3 style={{ color: "white" }}>💇 Hair Care Leads</h3>
        {renderTable(hairLeads)}

        <h3 style={{ color: "white" }}>🧴 Skin Care Leads</h3>
        {renderTable(skinLeads)}

      </div>

    </div>

  );

}