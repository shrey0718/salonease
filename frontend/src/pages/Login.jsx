import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔐 If already logged in, go directly to dashboard
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    setLoading(true);
    setMessage("");

    fetch("https://salonease-backend-qn1t.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);

        if (data.message === "Login successful") {
          // 🧠 Save admin session
          localStorage.setItem("adminLoggedIn", "true");

          // 🚀 Go to dashboard
          navigate("/dashboard");
        } else {
          setMessage("Invalid email or password");
        }
      })
      .catch(() => {
        setLoading(false);
        setMessage("Server error. Try again.");
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3b3b6",
        paddingTop: "80px"
      }}
    >
      <div style={{ maxWidth: "950px", margin: "0 auto", textAlign: "center" }}>
        
        {/* TITLE */}
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

        {/* SUBTITLE */}
        <p
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "white",
            marginBottom: "30px"
          }}
        >
          Admin Login
        </p>

        {/* LOGIN CARD */}
        <div
          style={{
            background: "#fdebed",
            borderRadius: "22px",
            padding: "30px",
            maxWidth: "380px",
            margin: "0 auto",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
          }}
        >
          <div className="mb-3 text-start">
            <label className="fw-semibold">Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="fw-semibold">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <p
              style={{
                color: "red",
                marginTop: "15px",
                fontWeight: "500"
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
