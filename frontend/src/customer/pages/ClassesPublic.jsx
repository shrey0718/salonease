import { useState } from "react";

export default function ClassesPublic() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [leadId, setLeadId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });

  // ⭐ PREMIUM PROGRAMS
  const premiumCourses = [
    {
      name: "Ultimate Makeup Program",
      category: "⭐ Premium",
      price: "₹90,000",
      duration: "6–8 Months",
      schedule: "5 Days/Week",
      image: "/ultimate-makeup.jpg"
    },
    {
      name: "Ultimate Hair Specialist Program",
      category: "⭐ Premium",
      price: "₹60,000",
      duration: "6–8 Months",
      schedule: "5 Days/Week",
      image: "/ultimate-hair.jpg"
    },
    {
      name: "Ultimate Skin Expert Program",
      category: "⭐ Premium",
      price: "₹90,000",
      duration: "6–8 Months",
      schedule: "5 Days/Week",
      image: "/ultimate-skin.jpg"
    },
    {
      name: "Complete Salon Professional Course",
      category: "⭐ Premium",
      price: "₹2,50,000",
      duration: "1 Year + Internship",
      schedule: "6 Days/Week",
      image: "/complete-salon.jpg"
    }
  ];

  const courses = [
    { name: "Makeup Masterclass", category: "💄 Makeup", price: "₹35,000", duration: "2 Months", schedule: "Weekend", image: "/makeup-masterclass.jpg" },
    { name: "Advance Makeup", category: "💄 Makeup", price: "₹28,000", duration: "1.5 Months", schedule: "Weekdays", image: "/advance-makeup.jpg" },
    { name: "Basic Makeup", category: "💄 Makeup", price: "₹15,000", duration: "1 Month", schedule: "Weekend", image: "/basic-makeup.jpg" },
    { name: "Bridal Makeup", category: "💄 Makeup", price: "₹40,000", duration: "2 Months", schedule: "Weekend", image: "/bridal-makeup.jpg" },
    { name: "HD + Airbrush Makeup", category: "💄 Makeup", price: "₹45,000", duration: "2 Months", schedule: "Weekend", image: "/hd-airbrush.jpg" },

    { name: "Hair Styling Course", category: "💇 Hair", price: "₹22,000", duration: "1.5 Months", schedule: "Weekdays", image: "/hair-styling.jpg" },
    { name: "Scalp Treatment", category: "💇 Hair", price: "₹18,000", duration: "1 Month", schedule: "Weekend", image: "/scalp.jpg" },
    { name: "All Types of Hair Colors", category: "💇 Hair", price: "₹25,000", duration: "1.5 Months", schedule: "Weekend", image: "/hair-colors.jpg" },
    { name: "Basic Hair Course", category: "💇 Hair", price: "₹14,000", duration: "1 Month", schedule: "Weekdays", image: "/basic-hair.jpg" },
    { name: "Advanced Hair Course", category: "💇 Hair", price: "₹30,000", duration: "2 Months", schedule: "Weekend", image: "/advanced-hair.jpg" },

    { name: "Permanent Base Makeup", category: "💅 Permanent & Nails", price: "₹38,000", duration: "2 Months", schedule: "Weekend", image: "/permanent-base.jpg" },
    { name: "Permanent Eye Makeup", category: "💅 Permanent & Nails", price: "₹32,000", duration: "1.5 Months", schedule: "Weekend", image: "/permanent-eye.jpg" },
    { name: "Color Correction", category: "💅 Permanent & Nails", price: "₹20,000", duration: "1 Month", schedule: "Weekdays", image: "/color-correction.jpg" },
    { name: "Basic Nail Art", category: "💅 Permanent & Nails", price: "₹12,000", duration: "1 Month", schedule: "Weekend", image: "/basic-nail.jpg" },
    { name: "Advanced Nail Art", category: "💅 Permanent & Nails", price: "₹26,000", duration: "1.5 Months", schedule: "Weekend", image: "/advanced-nail.jpg" },

    { name: "Skin Care Training", category: "🧴 Skin", price: "₹20,000", duration: "1 Month", schedule: "Weekdays", image: "/skin-training.jpg" },
    { name: "Skin Science", category: "🧴 Skin", price: "₹18,000", duration: "1 Month", schedule: "Weekend", image: "/skin-science.jpg" },
    { name: "All Types of Facials", category: "🧴 Skin", price: "₹24,000", duration: "1.5 Months", schedule: "Weekend", image: "/facials.jpg" },
    { name: "Basic SkinCare", category: "🧴 Skin", price: "₹12,000", duration: "1 Month", schedule: "Weekdays", image: "/basic-skin.jpg" },
    { name: "Advanced SkinCare", category: "🧴 Skin", price: "₹28,000", duration: "2 Months", schedule: "Weekend", image: "/advanced-skin.jpg" }
  ];

  const openForm = (course) => {
    setSelectedCourse(course);
    setFormOpen(true);
  };

  const submitLead = async () => {
    if (!formData.name || !formData.phone) return alert("Fill details");

    const res = await fetch("http://https://salonease-backend-qn1t.onrender.com/class-leads/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        course: selectedCourse.name,
        category: selectedCourse.category,
        status: "Interested",
        date: new Date()
      })
    });

    const data = await res.json();
    if (data?._id) setLeadId(data._id);

    setFormOpen(false);
    setConfirmOpen(true);
  };

  const openWhatsApp = async () => {
    await fetch(`http://https://salonease-backend-qn1t.onrender.com/class-leads/${leadId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Registered" })
    });

    const message =
      "Hi, I am " + formData.name +
      ". I am interested in " + selectedCourse.name +
      ". My contact number is " + formData.phone + ".";

    window.open(
      "https://wa.me/919892227332?text=" + encodeURIComponent(message),
      "_blank"
    );

    setFormData({ name: "", phone: "" });
    setConfirmOpen(false);
  };

  const renderSection = (titleText, category) => (
    <>
      <h2 style={title}>{titleText}</h2>
      <div style={grid}>
        {courses
          .filter(c => c.category === category)
          .map(c => (
            <CourseCard key={c.name} course={c} onInterested={openForm} />
          ))}
      </div>
    </>
  );

  return (
    <div style={bg}>
      <h2 style={premiumTitle}>⭐ Professional Certification Programs</h2>

      <div style={premiumGrid}>
        {premiumCourses.map(c => (
          <PremiumCard key={c.name} course={c} onInterested={openForm} />
        ))}
      </div>

      {renderSection("💄 Makeup Courses", "💄 Makeup")}
      {renderSection("💇 Hair Courses", "💇 Hair")}
      {renderSection("💅 Permanent Makeup & Nails", "💅 Permanent & Nails")}
      {renderSection("🧴 Skin Care Courses", "🧴 Skin")}

      {formOpen && (
        <div style={popup}>
          <h3>Enter Details</h3>
          <input
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            style={input}
          />
          <input
            placeholder="Phone"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            style={input}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={btn} onClick={submitLead}>Submit</button>
            <button style={{ ...btn, background: "#999" }} onClick={() => setFormOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {confirmOpen && (
        <div style={popup}>
          <h3>Interest Recorded!</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={btn} onClick={openWhatsApp}>Open WhatsApp</button>
            <button style={{ ...btn, background: "#999" }} onClick={() => setConfirmOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- CARDS ---------- */

function PremiumCard({ course, onInterested }) {
  return (
    <div style={premiumCard}
      onMouseEnter={e=>{
        e.currentTarget.style.transform="translateY(-8px)";
        e.currentTarget.style.boxShadow="0 12px 25px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={e=>{
        e.currentTarget.style.transform="translateY(0)";
        e.currentTarget.style.boxShadow="0 6px 16px rgba(0,0,0,0.15)";
      }}>
      <img src={course.image} style={img}/>
      <h3>⭐ {course.name}</h3>
      <p><b>Price:</b> {course.price}</p>
      <p><b>Duration:</b> {course.duration}</p>
      <p><b>Schedule:</b> {course.schedule}</p>
      <button style={btn} onClick={()=>onInterested(course)}>Register Interest</button>
    </div>
  );
}

function CourseCard({ course, onInterested }) {
  return (
    <div style={card}
      onMouseEnter={e=>{
        e.currentTarget.style.transform="translateY(-6px)";
        e.currentTarget.style.boxShadow="0 10px 22px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={e=>{
        e.currentTarget.style.transform="translateY(0)";
        e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.12)";
      }}>
      <img src={course.image} style={img}/>
      <h3>{course.name}</h3>
      <p><b>Price:</b> {course.price}</p>
      <p><b>Duration:</b> {course.duration}</p>
      <p><b>Schedule:</b> {course.schedule}</p>
      <button style={btn} onClick={()=>onInterested(course)}>Register Interest</button>
    </div>
  );
}

/* ---------- STYLES ---------- */

const bg={
  minHeight:"100vh",
  padding:"40px 20px"
};
const premiumGrid={display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"20px",marginBottom:"40px"};
const grid={display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"18px",marginBottom:"40px"};
const premiumTitle={color:"#a1005c",fontSize:"28px"};
const title={color:"#d90166"};
const premiumCard={padding:"18px",background:"#ffe4ec",borderRadius:"15px",border:"2px solid #ff2e63",boxShadow:"0 6px 16px rgba(0,0,0,0.15)",transition:"0.25s"};
const card={padding:"16px",background:"#ffe4ec",borderRadius:"15px",boxShadow:"0 4px 12px rgba(0,0,0,0.12)",transition:"0.25s"};
const img={width:"100%",height:"140px",objectFit:"contain",background:"#fff",marginBottom:"10px"};
const popup={position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"white",padding:"25px",borderRadius:"12px"};
const input={display:"block",width:"100%",marginBottom:"10px",padding:"8px"};
const btn={background:"#e26f8f",color:"white",border:"none",padding:"8px 12px",borderRadius:"10px",cursor:"pointer"};
