import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://salonease-backend-qn1t.onrender.com";

export default function Staff() {

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) navigate("/");
  }, []);

  const [staff,setStaff] = useState([]);

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [role,setRole] = useState("Makeup Artist");
  const [experience,setExperience] = useState("");
  const [status,setStatus] = useState("Active");

  const [editingId,setEditingId] = useState(null);
  const [editData,setEditData] = useState({});

  const roleEmoji = {
    "All-Rounder Expert (Owner)": "👑",
    "Makeup Artist": "💄",
    "Hair Expert": "💇‍♀️",
    "Nail Technician": "💅",
    "Skin Therapist": "🧴",
    "Receptionist": "📞"
  };

  const fetchStaff = () => {

    fetch(`${API}/staff`)
      .then(res=>res.json())
      .then(data=>setStaff(data));

  };

  useEffect(()=>{
    fetchStaff();
  },[]);

  const addStaff = () => {

    if(!name || !phone) return;

    fetch(`${API}/staff/add`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        phone,
        role,
        experience:Number(experience),
        status
      })
    })
      .then(res=>res.json())
      .then(()=>{
        setName("");
        setPhone("");
        setExperience("");
        fetchStaff();
      });

  };

  const deleteStaff = (id) => {

    fetch(`${API}/staff/${id}`,{
      method:"DELETE"
    })
      .then(res=>res.json())
      .then(fetchStaff);

  };

  const startEdit = (member) => {

    setEditingId(member._id);
    setEditData(member);

  };

  const saveEdit = () => {

    fetch(`${API}/staff/${editingId}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(editData)
    })
      .then(res=>res.json())
      .then(()=>{
        setEditingId(null);
        fetchStaff();
      });

  };

  const renderCard = (member) => {

    const isEditing = editingId === member._id;

    return (

      <div className="col-md-4 mb-3" key={member._id}>

        <div
          style={{
            background:"#fdebed",
            borderRadius:"22px",
            padding:"20px",
            transition:"all 0.25s ease",
            cursor:"pointer",
            boxShadow:"0 8px 20px rgba(0,0,0,0.15)",
            border: member.role === "All-Rounder Expert (Owner)" ? "2px solid gold" : "none"
          }}

          onMouseEnter={(e)=>{
            e.currentTarget.style.transform="translateY(-6px) scale(1.02)";
            e.currentTarget.style.boxShadow="0 14px 28px rgba(0,0,0,0.22)";
          }}

          onMouseLeave={(e)=>{
            e.currentTarget.style.transform="translateY(0px)";
            e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,0.15)";
          }}
        >

        {isEditing ? (

          <>
          <input
            className="form-control mb-2"
            value={editData.name}
            onChange={e=>setEditData({...editData,name:e.target.value})}
          />

          <input
            className="form-control mb-2"
            value={editData.phone}
            onChange={e=>setEditData({...editData,phone:e.target.value})}
          />

          <select
            className="form-control mb-2"
            value={editData.role}
            onChange={e=>setEditData({...editData,role:e.target.value})}
          >
            <option>All-Rounder Expert (Owner)</option>
            <option>Makeup Artist</option>
            <option>Hair Expert</option>
            <option>Nail Technician</option>
            <option>Skin Therapist</option>
            <option>Receptionist</option>
          </select>

          <input
            className="form-control mb-2"
            value={editData.experience}
            onChange={e=>setEditData({...editData,experience:e.target.value})}
          />

          <select
            className="form-control mb-2"
            value={editData.status}
            onChange={e=>setEditData({...editData,status:e.target.value})}
          >
            <option>Active</option>
            <option>On Leave</option>
            <option>Left</option>
          </select>

          <button className="btn btn-success btn-sm" onClick={saveEdit}>
            Save
          </button>

          </>
        ) : (

          <>
          <h5>{member.name}</h5>

          <p>📞 {member.phone}</p>

          <p>
            {roleEmoji[member.role]} {member.role}
          </p>

          <p>⭐ Experience: {member.experience} yrs</p>

          <p
            style={{
              fontWeight:"bold",
              color:
                member.status === "Active"
                  ? "green"
                  : member.status === "On Leave"
                  ? "orange"
                  : "red"
            }}
          >
            {member.status}
          </p>

          <button
            className="btn btn-warning btn-sm me-2"
            onClick={()=>startEdit(member)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={()=>deleteStaff(member._id)}
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

    <div style={{minHeight:"100vh",background:"#f3b3b6",paddingTop:"70px"}}>

      <div style={{maxWidth:"950px",margin:"0 auto",textAlign:"center"}}>

        <h1>
          <span style={{fontFamily:"Great Vibes",fontSize:"64px",color:"white"}}>
            SalonEase
          </span>
        </h1>

        <p style={{fontSize:"30px",fontWeight:"700",color:"white",marginBottom:"20px"}}>
          Staff Management
        </p>

        <div
          style={{
            background:"#fdebed",
            borderRadius:"22px",
            padding:"25px",
            marginBottom:"40px",
            boxShadow:"0 8px 20px rgba(0,0,0,0.15)"
          }}
        >

        <h4>Add Staff</h4>

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Phone"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={role}
          onChange={e=>setRole(e.target.value)}
        >
          <option>All-Rounder Expert (Owner)</option>
          <option>Makeup Artist</option>
          <option>Hair Expert</option>
          <option>Nail Technician</option>
          <option>Skin Therapist</option>
          <option>Receptionist</option>
        </select>

        <input
          className="form-control mb-2"
          placeholder="Experience (years)"
          value={experience}
          onChange={e=>setExperience(e.target.value)}
        />

        <select
          className="form-control mb-3"
          value={status}
          onChange={e=>setStatus(e.target.value)}
        >
          <option>Active</option>
          <option>On Leave</option>
          <option>Left</option>
        </select>

        <button className="btn btn-primary" onClick={addStaff}>
          Add Staff
        </button>

        </div>

        <div className="row">
          {staff.map(renderCard)}
        </div>

      </div>

    </div>

  );

}