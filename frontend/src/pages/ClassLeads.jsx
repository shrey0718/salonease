import { useEffect, useState } from "react";

export default function ClassLeads() {
  const [leads, setLeads] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [category, setCategory] = useState("💄 Makeup");
  const [status, setStatus] = useState("Interested");

  const fetchLeads = () => {
    fetch("https://salonease-backend-qn1t.onrender.com/class-leads")
      .then(res => res.json())
      .then(data => setLeads(data));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = () => {
    fetch("https://salonease-backend-qn1t.onrender.com/class-leads/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        course,
        category,
        status
      })
    })
      .then(res => res.json())
      .then(() => {
        setName("");
        setPhone("");
        setCourse("");
        fetchLeads();
      });
  };

  const deleteLead = (id) => {
    fetch(`https://salonease-backend-qn1t.onrender.com/class-leads/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => fetchLeads());
  };

  const updateStatus = (id, newStatus) => {
    fetch(`https://salonease-backend-qn1t.onrender.com/class-leads/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(() => fetchLeads());
  };

  // SMART FILTERING (works for emojis + new categories)
  const premium = leads.filter(l =>
    l.category?.toLowerCase().includes("premium")
  );

  const makeup = leads.filter(l =>
    l.category?.toLowerCase().includes("makeup")
  );

  const hair = leads.filter(l =>
    l.category?.toLowerCase().includes("hair")
  );

  const nail = leads.filter(l =>
    l.category?.toLowerCase().includes("nail") ||
    l.category?.toLowerCase().includes("permanent")
  );

  const skin = leads.filter(l =>
    l.category?.toLowerCase().includes("skin")
  );

const renderTable = (data) => (
  <div style={{ overflowX: "auto", width: "100%" }}>

    <table
      className="table"
      style={{
        background: "#fdebed",
        minWidth: "650px"
      }}
    >

      <thead>
        <tr style={{ background: "#f3b3b6", color: "white" }}>
          <th>Name</th>
          <th>Phone</th>
          <th>Course</th>
          <th>Status</th>
          <th>Date</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>

        {data.map(lead => (

          <tr key={lead._id}>

            <td>{lead.name}</td>
            <td>{lead.phone}</td>
            <td>{lead.course}</td>

            <td>

              <select
                className="form-select"
                value={lead.status}
                onChange={(e) =>
                  updateStatus(lead._id, e.target.value)
                }
              >

                <option>Interested</option>
                <option>Registered</option>
                <option>Completed</option>

              </select>

            </td>

            <td>
              {new Date(lead.date).toLocaleDateString()}
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

  </div>
);

  return (
    <div style={{ minHeight: "100vh", background: "#f3b3b6", paddingTop: "70px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>

        <h1>
          <span style={{ fontFamily: "Great Vibes", fontSize: "64px", color: "white" }}>
            SalonEase
          </span>
        </h1>

        <p style={{ fontSize: "30px", fontWeight: "700", color: "white", marginBottom: "20px" }}>
          Class Leads
        </p>

        {/* ADD LEAD PANEL */}
        <div style={{
          background: "#fdebed",
          borderRadius: "22px",
          padding: "25px",
          marginBottom: "40px"
        }}>
          <h4>Add Lead</h4>

          <input className="form-control mb-2"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input className="form-control mb-2"
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <input className="form-control mb-2"
            placeholder="Course"
            value={course}
            onChange={e => setCourse(e.target.value)}
          />

          <select className="form-control mb-2"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>⭐ Premium</option>
            <option>💄 Makeup</option>
            <option>💇 Hair</option>
            <option>💅 Permanent & Nails</option>
            <option>🧴 Skin</option>
          </select>

          <select className="form-control mb-3"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option>Interested</option>
            <option>Registered</option>
            <option>Completed</option>
          </select>

          <button className="btn btn-primary" onClick={addLead}>
            Add Lead
          </button>
        </div>

        {/* TABLE SECTIONS */}
        <h3 style={{ color: "white" }}>⭐ Premium Programs</h3>
        {renderTable(premium)}

        <h3 style={{ color: "white" }}>💄 Makeup</h3>
        {renderTable(makeup)}

        <h3 style={{ color: "white" }}>💇 Hair</h3>
        {renderTable(hair)}

        <h3 style={{ color: "white" }}>💅 Permanent & Nails</h3>
        {renderTable(nail)}

        <h3 style={{ color: "white" }}>🧴 Skin</h3>
        {renderTable(skin)}
      </div>
    </div>
  );
}
