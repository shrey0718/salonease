import React, { useRef, useState } from "react";

const TryOnMediapipe = () => {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  const lipRef = useRef(null);
  const linerRef = useRef(null);

  const [lipColor, setLipColor] = useState(null);
  const [linerColor, setLinerColor] = useState(null);

  const lipstickShades = [
    { name: "Red", color: "#d10000" },
    { name: "Nude", color: "#d19a7c" },
    { name: "Wine", color: "#8b1e3f" },
    { name: "Coral", color: "#ff6f61" },
    { name: "Brown", color: "#8b4a2f" },
    { name: "Rose", color: "#e75480" },
    { name: "Plum", color: "#9b4f96" },
    { name: "None", color: null }
  ];

  const linerShades = [
    { name: "Black", color: "#000000" },
    { name: "Brown", color: "#3b2a1f" },
    { name: "Blue", color: "#1e4bd1" },
    { name: "Green", color: "#1c8b4a" },
    { name: "None", color: null }
  ];

  const startCamera = () => {

    const faceMesh = new window.FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults(onResults);

    const camera = new window.Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current });
      },
      width: 640,
      height: 480
    });

    camera.start();
    cameraRef.current = camera;
  };

  const stopCamera = () => {

    if (cameraRef.current) {
      cameraRef.current.stop();
    }

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  function drawPolygon(points, landmarks, ctx, canvas) {

    ctx.beginPath();

    points.forEach((index, i) => {

      const p = landmarks[index];
      const x = p.x * canvas.width;
      const y = p.y * canvas.height;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

    });

    ctx.closePath();
    ctx.fill();
  }

  function onResults(results) {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {

      const landmarks = results.multiFaceLandmarks[0];

      /* LIPSTICK */

      if (lipRef.current) {

        ctx.fillStyle = lipRef.current;
        ctx.globalAlpha = 0.85;

        drawPolygon(
          [61,185,40,39,37,0,267,269,270,409,291],
          landmarks,
          ctx,
          canvas
        );

        drawPolygon(
          [146,91,181,84,17,314,405,321,375,291],
          landmarks,
          ctx,
          canvas
        );

        ctx.globalAlpha = 1;
      }

      /* EYELINER */

      if (linerRef.current) {

        ctx.strokeStyle = linerRef.current;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        const leftEye = [33,160,158,133];
        const rightEye = [263,387,385,362];

        ctx.beginPath();

        leftEye.forEach((i, idx) => {

          const p = landmarks[i];
          const x = p.x * canvas.width;
          const y = p.y * canvas.height;

          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);

        });

        ctx.stroke();

        ctx.beginPath();

        rightEye.forEach((i, idx) => {

          const p = landmarks[i];
          const x = p.x * canvas.width;
          const y = p.y * canvas.height;

          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);

        });

        ctx.stroke();
      }
    }

    ctx.restore();
  }

  const shadeStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "20px",
    cursor: "pointer",
    background: "rgba(255,255,255,0.85)",
    border: active ? "3px solid #ff4da6" : "2px solid transparent",
    fontWeight: active ? "bold" : "normal",
    transition: "0.2s"
  });

  return (

    <div style={{ textAlign: "center", padding: "20px" }}>

      <h2>Virtual Try-On</h2>

      <div
        style={{
          position: "relative",
          display: "inline-block",
          padding: "12px",
          borderRadius: "20px",
          background: "linear-gradient(135deg,#ff6fa5,#ff9cc4,#ffc1da)",
          boxShadow: "0 0 25px rgba(255,105,180,0.6)"
        }}
      >

        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="500"
          height="380"
          style={{
            borderRadius: "15px",
            backgroundColor: "black",
            transform: "scaleX(-1)"
          }}
        />

        <canvas
          ref={canvasRef}
          width="500"
          height="380"
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            borderRadius: "15px",
            transform: "scaleX(-1)"
          }}
        />

      </div>

      <h3 style={{ marginTop: "20px" }}>Lipstick Shades</h3>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px" }}>
        {lipstickShades.map((shade) => (

          <div
            key={shade.name}
            style={shadeStyle(lipColor === shade.color)}
            onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.08)"}
            onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
            onClick={() => {
              setLipColor(shade.color);
              lipRef.current = shade.color;
            }}
          >

            {shade.color && (
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "5px",
                  background: shade.color
                }}
              />
            )}

            <span>{shade.name}</span>

          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "15px" }}>Eyeliner Shades</h3>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        {linerShades.map((shade) => (

          <div
            key={shade.name}
            style={shadeStyle(linerColor === shade.color)}
            onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.08)"}
            onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
            onClick={() => {
              setLinerColor(shade.color);
              linerRef.current = shade.color;
            }}
          >
            {shade.name}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>

        <button
          onClick={startCamera}
          style={{
            background: "linear-gradient(135deg,#ff4da6,#ff85c1)",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "25px",
            fontWeight: "bold",
            marginRight: "10px",
            cursor:"pointer"
          }}
        >
          Start Camera
        </button>

        <button
          onClick={stopCamera}
          style={{
            background: "#111",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "25px",
            fontWeight: "bold",
            cursor:"pointer"
          }}
        >
          Stop Camera
        </button>

      </div>

    </div>
  );
};

export default TryOnMediapipe;