import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrations() {

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) navigate("/");
  }, []);

  const [list, setList] = useState([]);

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [category,setCategory] = useState("Makeup");
  const [course,setCourse] = useState("Basic Makeup");
  const [image,setImage] = useState("");

  const [search,setSearch] = useState("");

  const [editingId,setEditingId] = useState(null);
  const [editData,setEditData] = useState({});

  const fetchRegistrations = () => {
    fetch("http://localhost:5000/registrations")
      .then(res => res.json())
      .then(data => setList(data || []));
  };

  useEffect(()=>{ fetchRegistrations(); },[]);

  const addRegistration = () => {

    if(!name || !phone){
      alert("Please fill details");
      return;
    }

    fetch("http://localhost:5000/registrations/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        phone,
        email,
        category,
        course,
        image
      })
    })
    .then(res=>res.json())
    .then(()=>{
      setName("");
      setPhone("");
      setEmail("");
      setCourse("");
      setImage("");
      fetchRegistrations();
    });

  };

  const deleteRegistration = (id)=>{
    fetch(`http://localhost:5000/registrations/${id}`,{
      method:"DELETE"
    })
    .then(res=>res.json())
    .then(fetchRegistrations);
  };

  const startEdit = (r)=>{
    setEditingId(r._id);
    setEditData(r);
  };

  const saveEdit = ()=>{
    fetch(`http://localhost:5000/registrations/${editingId}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(editData)
    })
    .then(res=>res.json())
    .then(()=>{
      setEditingId(null);
      fetchRegistrations();
    });
  };

  const filtered = list.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.phone?.includes(search) ||
    (r.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const phoneCount={};

  list.forEach(r=>{
    phoneCount[r.phone]=(phoneCount[r.phone]||0)+1;
  });

  const renderCard=(r)=>{

    const isEditing = editingId===r._id;
    const isExisting = phoneCount[r.phone]>1;

    return(

      <div className="col-md-4 mb-3" key={r._id}>

        <div
          style={{
            background:"#fdebed",
            borderRadius:"22px",
            padding:"20px",
            transition:"all 0.25s ease",
            cursor:"pointer",
            boxShadow:"0 8px 20px rgba(0,0,0,0.15)"
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

          <input
          className="form-control mb-2"
          value={editData.email}
          onChange={e=>setEditData({...editData,email:e.target.value})}
          />

          <input
          className="form-control mb-2"
          value={editData.image}
          placeholder="Image URL"
          onChange={e=>setEditData({...editData,image:e.target.value})}
          />

          <select
          className="form-control mb-2"
          value={editData.category}
          onChange={e=>setEditData({...editData,category:e.target.value})}
          >
          <option>Makeup</option>
          <option>Hair</option>
          <option>Nails</option>
          <option>Skin</option>
          </select>

          <input
          className="form-control mb-2"
          value={editData.course}
          onChange={e=>setEditData({...editData,course:e.target.value})}
          />

          <button className="btn btn-success btn-sm" onClick={saveEdit}>
          Save
          </button>

          </>

        ):(
          <>

          {r.image && (

            <img
            src={r.image}
            alt={r.course}
            style={{
              width:"100%",
              height:"120px",
              objectFit:"cover",
              borderRadius:"10px",
              marginBottom:"10px"
            }}
            />

          )}

          <h5>{r.name}</h5>
          <p>{r.phone}</p>
          <p>{r.email}</p>

          <p>{r.category} • {r.course}</p>

          <p style={{
            color:isExisting ? "#7b3fa0":"green",
            fontWeight:"bold"
          }}>
            {isExisting ? "🎓 Existing Student":"🆕 New Student"}
          </p>

          <p style={{fontSize:"12px",opacity:0.7}}>
            Joined: {new Date(r.createdAt).toLocaleDateString()}
          </p>

          <button
          className="btn btn-warning btn-sm me-2"
          onClick={()=>startEdit(r)}
          >
          Edit
          </button>

          <button
          className="btn btn-danger btn-sm"
          onClick={()=>deleteRegistration(r._id)}
          >
          Delete
          </button>

          </>
        )}

        </div>
      </div>
    );

  };

  return(

    <div style={{minHeight:"100vh",background:"#f3b3b6",paddingTop:"70px"}}>

      <div style={{maxWidth:"950px",margin:"0 auto",textAlign:"center"}}>

      <h1>
      <span style={{
        fontFamily:"Great Vibes",
        fontSize:"64px",
        color:"white"
      }}>
      SalonEase
      </span>
      </h1>

      <p style={{
        fontSize:"30px",
        fontWeight:"700",
        color:"white",
        marginBottom:"20px"
      }}>
      Class Registrations
      </p>

      <input
      className="form-control mb-4"
      placeholder="Search student..."
      value={search}
      onChange={e=>setSearch(e.target.value)}
      />

      <div style={{
        background:"#fdebed",
        borderRadius:"22px",
        padding:"25px",
        marginBottom:"40px",
        boxShadow:"0 8px 20px rgba(0,0,0,0.15)"
      }}>

      <h4>Add Student</h4>

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

      <input
      className="form-control mb-2"
      placeholder="Email"
      value={email}
      onChange={e=>setEmail(e.target.value)}
      />

      <input
      className="form-control mb-2"
      placeholder="Course Image URL"
      value={image}
      onChange={e=>setImage(e.target.value)}
      />

      <select
      className="form-control mb-2"
      value={category}
      onChange={e=>setCategory(e.target.value)}
      >
      <option>Makeup</option>
      <option>Hair</option>
      <option>Nails</option>
      <option>Skin</option>
      </select>

      <input
      className="form-control mb-3"
      placeholder="Course Name"
      value={course}
      onChange={e=>setCourse(e.target.value)}
      />

      <button className="btn btn-primary" onClick={addRegistration}>
      Add Student
      </button>

      </div>

      <div className="row">
      {filtered.map(renderCard)}
      </div>

      </div>
    </div>
  );

}