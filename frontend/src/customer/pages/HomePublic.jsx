import { useNavigate } from "react-router-dom";

export default function HomePublic() {
  const navigate = useNavigate();

  return (
    <div
  style={{
    minHeight: "100vh",
    padding: "50px 20px",
    textAlign: "center"
  }}
>



      {/* MAIN TITLE */}
      <h1
        style={{
          fontFamily: "Great Vibes",
          fontSize: "64px",
          color: "#d90166",
          marginBottom: "10px",
          textShadow: "0 2px 8px rgba(255,255,255,0.8)"
        }}
      >
        SalonEase ✨
      </h1>

      {/* SUBTITLE */}
      <p
        style={{
          fontSize: "22px",
          color: "#8b1c4a",
          fontFamily: "Georgia, serif",
          letterSpacing: "1px",
          fontWeight: "600",
          marginBottom: "10px"
        }}
      >
        Beauty • Products • Classes
      </p>

      {/* DESCRIPTION */}
      <p
        style={{
          fontSize: "17px",
          color: "#7a1b45",
          fontFamily: "'Poppins', 'Segoe UI', sans-serif",
          fontWeight: "700",
          maxWidth: "650px",
          margin: "0 auto 45px",
          lineHeight: "1.7"
        }}
      >
        Discover premium beauty products, try shades virtually, and join expert-led classes.
      </p>

      {/* BUTTON SECTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          marginBottom: "60px"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={tag}>💎 Premium Salon Brands</p>
          <button style={btn} onClick={() => navigate("/customer/products")}>
            Explore Products 💄
          </button>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={tag}>✨ 1000+ Happy Clients</p>
          <button style={btn} onClick={() => navigate("/customer/tryon")}>
            Try Virtual Try-On 💋
          </button>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={tag}>🎓 Certified Trainers</p>
          <button style={btn} onClick={() => navigate("/customer/classes")}>
            View Beauty Classes 🎓
          </button>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap"
        }}
      >
        <Card
          title="Bad day? Try a new shade 💋"
          text="Explore salon-approved cosmetics & premium hair care essentials."
        />

        <Card
          title="Try it. See it. Love it ❤️"
          text="Preview lipstick shades virtually before making your perfect choice."
        />

        <Card
          title="Turn passion into profession ✨"
          text="Learn makeup, nail, hair & skincare from certified beauty experts."
        />
      </div>
    </div>
  );
}

const btn = {
  padding: "14px 24px",
  borderRadius: "14px",
  border: "none",
  background: "#d90166",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
};

const tag = {
  marginBottom: "10px",
  color: "#d90166",
  fontWeight: "600",
  fontSize: "15px"
};

function Card({ title, text }) {
  return (
    <div
      style={{
        width: "220px",
        minHeight: "260px",
        padding: "26px 18px",
        borderRadius: "20px",
        background: "#ffe4ec",
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "all 0.25s ease",
        cursor: "default"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
      }}
    >
      <h3
        style={{
          color: "#d90166",
          marginBottom: "14px",
          fontSize: "18px",
          fontWeight: "700",
          lineHeight: "1.3"
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#000",
          fontSize: "15px",
          fontWeight: "500",
          lineHeight: "1.6"
        }}
      >
        {text}
      </p>
    </div>
  );
}
