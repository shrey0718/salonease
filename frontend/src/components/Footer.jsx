export default function Footer() {
  return (
    <footer style={footer}>

      <div style={container}>

        {/* BRAND */}
        <div>
          <h2 style={brand}> </h2>   
          <h3 style={brand}>Gitanjali Parlour ✨ </h3>
          
          <p style={text}>
            Premium beauty products, professional makeup classes and
            virtual try-on experience.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 style={heading}>Quick Links</h3>
          <p style={link}>Home</p>
          <p style={link}>Products</p>
          <p style={link}>Beauty Classes</p>
          <p style={link}>Virtual Try-On</p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 style={heading}>Contact</h3>
          <p style={text}>📍 Ghatkopar, Mumbai</p>
          <p style={text}>📞 +91 9892227332</p>
          <p style={text}>✉ gitanjalipaulor@gmail.com</p>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div style={bottom}>
        © 2026 SalonEase • Made for Gitanjali Parlour • All Rights Reserved
      </div>

    </footer>
  );
}

/* ================= STYLES ================= */

const footer = {
  width: "100%",
  background: "linear-gradient(90deg,#d90166,#ff4fa3)",
  color: "white"
};

const container = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "40px 20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: "40px"
};

const brand = {
  fontFamily: "Great Vibes",
  fontSize: "34px",
  marginBottom: "10px"
};

const heading = {
  marginBottom: "10px"
};

const text = {
  fontSize: "14px",
  lineHeight: "1.6"
};

const link = {
  fontSize: "14px",
  marginBottom: "6px",
  cursor: "pointer"
};

const bottom = {
  borderTop: "1px solid rgba(255,255,255,0.3)",
  textAlign: "center",
  padding: "12px",
  fontSize: "13px"
};