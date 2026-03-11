import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

export default function Analytics() {
  const navigate = useNavigate();

  // 🔐 ADMIN LOGIN PROTECTION
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  const [productLeads, setProductLeads] = useState([]);
  const [classLeads, setClassLeads] = useState([]);

  useEffect(() => {
    fetch("https://salonease-backend-qn1t.onrender.com/product-leads")
      .then(res => res.json())
      .then(data => setProductLeads(data));

    fetch("https://salonease-backend-qn1t.onrender.com/class-leads")
      .then(res => res.json())
      .then(data => setClassLeads(data));
  }, []);

  // PRODUCT DEMAND
  const productCountMap = {};
  productLeads.forEach(l => {
    productCountMap[l.product] = (productCountMap[l.product] || 0) + 1;
  });
  const productChartData = Object.keys(productCountMap).map(key => ({
    name: key,
    count: productCountMap[key]
  }));

  // CLASS POPULARITY
  const classCountMap = {};
  classLeads.forEach(l => {
    classCountMap[l.course] = (classCountMap[l.course] || 0) + 1;
  });
  const classChartData = Object.keys(classCountMap).map(key => ({
    name: key,
    count: classCountMap[key]
  }));

  // STATUS PIE
  const statusMap = { Interested: 0, Ordered: 0, Delivered: 0 };
  productLeads.forEach(l => {
    if (statusMap[l.status] !== undefined) statusMap[l.status]++;
  });

  const statusPieData = Object.keys(statusMap).map(k => ({
    name: k,
    value: statusMap[k]
  }));

  // PIE COLORS
  const STATUS_COLORS = {
    Interested: "#ffd6a5",
    Ordered: "#a0c4ff",
    Delivered: "#b9fbc0"
  };

  // CARDS DATA
  const mostPopularProduct = productChartData.sort((a,b)=>b.count-a.count)[0]?.name || "-";
  const mostPopularClass = classChartData.sort((a,b)=>b.count-a.count)[0]?.name || "-";

  const totalLeads = productLeads.length;
  const totalOrdered = productLeads.filter(l => l.status === "Ordered").length;
  const conversionRate = totalLeads ? ((totalOrdered/totalLeads)*100).toFixed(1) : 0;

  const todayStr = new Date().toDateString();
  const leadsToday = productLeads.filter(l =>
    new Date(l.date).toDateString() === todayStr
  ).length;

  const topCards = [
    { title: "🏆 Top Product", value: mostPopularProduct },
    { title: "🎓 Top Class", value: mostPopularClass },
    { title: "📈 Conversion", value: `${conversionRate}%` },
    { title: "🔥 Leads Today", value: leadsToday }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f3b3b6", paddingTop: "70px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>

        <h1>
          <span style={{ fontFamily: "Great Vibes", fontSize: "64px", color: "white" }}>
            SalonEase
          </span>
        </h1>

        <p style={{ fontSize: "30px", fontWeight: "700", color: "white", marginBottom: "30px" }}>
          Analytics • Business Intelligence
        </p>

        {/* TOP CARDS */}
        <div className="row mb-4">
          {topCards.map((card, i) => (
            <div className="col-md-3 mb-3" key={i}>
              <div
                style={{
                  background: "#fdebed",
                  borderRadius: "20px",
                  padding: "22px",
                  height: "120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                  transition: "all 0.25s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,0.22)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.15)";
                }}
              >
                <h6 style={{ fontWeight: "600" }}>{card.title}</h6>
                <h3 style={{ fontWeight: "800", margin: 0 }}>{card.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* PRODUCT DEMAND */}
        <div style={{
          background: "#fdebed",
          borderRadius: "20px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
        }}>
          <h5>📦 Product Demand</h5>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={productChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CLASS POPULARITY */}
        <div style={{
          background: "#fdebed",
          borderRadius: "20px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
        }}>
          <h5>🎓 Class Popularity</h5>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={classChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* STATUS PIE */}
        <div style={{
          background: "#fdebed",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
        }}>
          <h5>📊 Lead Status Distribution</h5>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusPieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {statusPieData.map((entry, index) => (
                  <Cell key={index} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend
                formatter={(value) => (
                  <span style={{ color: "black", fontWeight: "600" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
