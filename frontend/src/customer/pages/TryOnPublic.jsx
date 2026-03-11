import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const TryOnPublic = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const modelsLoaded = useRef(false);

  const lastMouthRef = useRef(null);
  const lastEyesRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState("#d10000");
  const colorRef = useRef("#d10000");

  const [selectedLiner, setSelectedLiner] = useState(null);
  const linerRef = useRef(null);

  const lipstickShades = [
    { name: "Red", color: "#d10000" },
    { name: "Nude", color: "#d19a7c" },
    { name: "Wine", color: "#8b1e3f" },
    { name: "Coral", color: "#ff6f61" },
    { name: "Brown", color: "#8b4a2f" },
    { name: "Rose", color: "#e75480" },
    { name: "Plum", color: "#9b4f96" },
    { name: "None", color: null },
  ];

  const linerShades = [
    { name: "Black", color: "#000000" },
    { name: "Brown", color: "#2b1b16" },
    { name: "Blue", color: "#1e4bd1" },
    { name: "Green", color: "#1c8b4a" },
    { name: "None", color: null },
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;

      if (!modelsLoaded.current) {
        await loadModels();
        modelsLoaded.current = true;
      }

      startDetectionLoop();
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    lastMouthRef.current = null;
    lastEyesRef.current = null;
  };

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  };

  const startDetectionLoop = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || videoRef.current.paused) return;

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks();

      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (detection) {
        const resized = faceapi.resizeResults(detection, {
          width: videoRef.current.width,
          height: videoRef.current.height,
        });

        lastMouthRef.current = resized.landmarks.getMouth();
        lastEyesRef.current = resized.landmarks;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ===== LIPSTICK =====
      if (lastMouthRef.current && colorRef.current) {
        const mouth = lastMouthRef.current;

        ctx.beginPath();
        ctx.moveTo(mouth[0].x, mouth[0].y);
        for (let i = 1; i < mouth.length; i++) {
          ctx.lineTo(mouth[i].x, mouth[i].y);
        }
        ctx.closePath();

        ctx.fillStyle = colorRef.current;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ===== SIMPLE EYELINER (NO WING, NO FLICK) =====
      if (linerRef.current && lastEyesRef.current) {

        const leftEye = lastEyesRef.current.getLeftEye();
        const rightEye = lastEyesRef.current.getRightEye();

        ctx.strokeStyle = linerRef.current;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        // LEFT EYE: inner → mid → outer
        ctx.beginPath();
        ctx.moveTo(leftEye[0].x, leftEye[0].y);
        ctx.lineTo(leftEye[2].x, leftEye[2].y - 1);
        ctx.lineTo(leftEye[3].x, leftEye[3].y);
        ctx.stroke();

        // RIGHT EYE: inner → mid → outer
        ctx.beginPath();
        ctx.moveTo(rightEye[0].x, rightEye[0].y);
        ctx.lineTo(rightEye[2].x, rightEye[2].y - 1);
        ctx.lineTo(rightEye[3].x, rightEye[3].y);
        ctx.stroke();
      }

    }, 200);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>Virtual Try-On</h2>

      <div style={{
        position: "relative",
        display: "inline-block",
        padding: "10px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #ff6fa5, #ff9cc4, #ffc1da)",
        boxShadow: "0 0 25px rgba(255,105,180,0.6)",
      }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="500"
          height="380"
          style={{
            borderRadius: "15px",
            backgroundColor: "black",
            transform: "scaleX(-1)",
          }}
        />
        <canvas
          ref={canvasRef}
          width="500"
          height="380"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            borderRadius: "15px",
            transform: "scaleX(-1)",
          }}
        />
      </div>

      {/* Lipstick */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px" }}>
        {lipstickShades.map((shade) => (
          <div
            key={shade.name}
            onClick={() => {
              setSelectedColor(shade.color);
              colorRef.current = shade.color;
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.7)",
              border: selectedColor === shade.color ? "3px solid #ff4da6" : "2px solid transparent",
            }}
          >
            <div style={{ width: "20px", height: "20px", borderRadius: "6px", backgroundColor: shade.color }} />
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>{shade.name}</span>
          </div>
        ))}
      </div>

      {/* Eyeliner */}
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "12px" }}>
        {linerShades.map((shade) => (
          <div
            key={shade.name}
            onClick={() => {
              setSelectedLiner(shade.color);
              linerRef.current = shade.color;
            }}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              border: selectedLiner === shade.color ? "3px solid #ff4da6" : "2px solid transparent",
              fontWeight: "bold",
            }}
          >
            {shade.name}
          </div>
        ))}
      </div>

      <br />

      <button onClick={startCamera} style={{
        background: "linear-gradient(135deg, #ff4da6, #ff85c1)",
        border: "none",
        color: "white",
        padding: "10px 20px",
        borderRadius: "25px",
        fontSize: "15px",
        fontWeight: "bold",
        marginRight: "10px",
      }}>
        Start Camera
      </button>

      <button onClick={stopCamera} style={{
        background: "linear-gradient(135deg, #444, #111)",
        border: "none",
        color: "white",
        padding: "10px 20px",
        borderRadius: "25px",
        fontSize: "15px",
        fontWeight: "bold",
      }}>
        Stop Camera
      </button>
    </div>
  );
};

export default TryOnPublic;
