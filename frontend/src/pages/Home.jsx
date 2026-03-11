import { useState, useEffect } from "react";

export default function Home() {

  const [customerCount,setCustomerCount] = useState(null);
  const [productCount,setProductCount] = useState(null);
  const [registrationCount,setRegistrationCount] = useState(null);
  const [staffCount,setStaffCount] = useState(null);

  const fetchCounts = () => {

    fetch("http://localhost:5000/customers/count?time=" + Date.now())
      .then(res=>res.json())
      .then(data=>setCustomerCount(data.count))
      .catch(()=>setCustomerCount(0));

    fetch("http://localhost:5000/products/count?time=" + Date.now())
      .then(res=>res.json())
      .then(data=>setProductCount(data.count))
      .catch(()=>setProductCount(0));

    fetch("http://localhost:5000/registrations/count?time=" + Date.now())
      .then(res=>res.json())
      .then(data=>setRegistrationCount(data.count))
      .catch(()=>setRegistrationCount(0));

    fetch("http://localhost:5000/staff/count?time=" + Date.now())
      .then(res=>res.json())
      .then(data=>setStaffCount(data.count))
      .catch(()=>setStaffCount(0));
  };

  useEffect(()=>{

    fetchCounts();

    const interval = setInterval(fetchCounts,3000);

    return ()=>clearInterval(interval);

  },[]);

  return (
    <div
      style={{
        minHeight:"100vh",
        background:"#f3b3b6",
        paddingTop:"70px",
        paddingBottom:"40px",
        color:"white"
      }}
    >
      <div style={{maxWidth:"820px",margin:"0 auto",textAlign:"center"}}>

        <h1 style={{marginBottom:"6px"}}>
          <span style={{fontFamily:"Great Vibes",fontSize:"68px"}}>
            SalonEase
          </span>
        </h1>

        <p style={{fontSize:"32px",fontWeight:"700",marginBottom:"50px"}}>
          Dashboard • Business Overview
        </p>

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:"26px"
          }}
        >

          {[
            {emoji:"👤",title:"CUSTOMERS",value:customerCount},
            {emoji:"📦",title:"PRODUCTS",value:productCount},
            {emoji:"🎓",title:"STUDENTS",value:registrationCount},
            {emoji:"🧑‍💼",title:"STAFF",value:staffCount}
          ].map((card,index)=>(
            <div
              key={index}
              style={{
                background:"#fdebed",
                borderRadius:"26px",
                padding:"34px",
                boxShadow:"0 10px 26px rgba(0,0,0,0.15)",
                transition:"0.3s",
                cursor:"pointer"
              }}
              onMouseEnter={(e)=>{
                e.currentTarget.style.transform="translateY(-7px)";
                e.currentTarget.style.boxShadow="0 18px 40px rgba(0,0,0,0.22)";
              }}
              onMouseLeave={(e)=>{
                e.currentTarget.style.transform="translateY(0px)";
                e.currentTarget.style.boxShadow="0 10px 26px rgba(0,0,0,0.15)";
              }}
            >

              <div
                style={{
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  gap:"10px",
                  color:"#7d5a5f",
                  fontWeight:"700",
                  fontSize:"20px",
                  marginBottom:"14px"
                }}
              >
                <span style={{fontSize:"22px"}}>{card.emoji}</span>
                <span>{card.title}</span>
              </div>

              <div
                style={{
                  fontSize:"48px",
                  fontWeight:"bold",
                  color:"#b85c6b"
                }}
              >
                {card.value === null ? "..." : card.value}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}