import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoicePage() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  if (!state) return <h2>No invoice data</h2>;

  const orderDate = new Date(state.date);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 6);

  const downloadInvoice = async () => {

    const element = document.getElementById("invoice");

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    pdf.save(`SalonEase-Invoice-${state.orderId}.pdf`);

  };

  const closeInvoice = () => {
    clearCart();
    navigate("/customer/products");
  };

  return (

    <div style={page}>

      <div id="invoice" style={container}>

        <h1 style={logo}>SalonEase</h1>
        <h2 style={title}>Order Invoice</h2>

        <hr/>

        <div style={section}>
          <p><b>Order ID:</b> {state.orderId}</p>
          <p><b>Payment ID:</b> {state.paymentId}</p>
          <p><b>Order Date:</b> {orderDate.toLocaleDateString()}</p>
          <p><b>Expected Delivery:</b> {deliveryDate.toLocaleDateString()}</p>
        </div>

        <hr/>

        <div style={section}>
          <h3>Customer Details</h3>
          <p>{state.name}</p>
          <p>{state.phone}</p>
          <p>{state.address}</p>
          <p>{state.city} - {state.pincode}</p>
        </div>

        <hr/>

        <h3>Products</h3>

        {state.items.map(item => (
          <div key={item._id} style={row}>
            <span>{item.name} x {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <hr/>

        <div style={row}>
          <span>Subtotal</span>
          <span>₹{state.subtotal}</span>
        </div>

        <div style={row}>
          <span>Discount</span>
          <span style={{color:"green"}}>
            - ₹{Math.round(state.discount)}
          </span>
        </div>

        <div style={row}>
          <span>Shipping</span>
          <span style={{color:"green"}}>FREE (PAN INDIA)</span>
        </div>

        <hr/>

        <h2>Total Paid: ₹{Math.round(state.total)}</h2>

        <p style={thanks}>
          Thank you for shopping with SalonEase ✨
        </p>

      </div>

      <div style={btnRow}>

        <button style={downloadBtn} onClick={downloadInvoice}>
          Download Invoice
        </button>

        <button style={closeBtn} onClick={closeInvoice}>
          Close
        </button>

      </div>

    </div>

  );
}

const page = {
  minHeight:"100vh",
  padding:"40px",
  backgroundImage:
  "linear-gradient(rgba(255,200,220,0.65), rgba(255,200,220,0.65)), url('/bg-salonease.png')",
  backgroundSize:"cover"
};

const container = {
  maxWidth:"700px",
  margin:"auto",
  background:"white",
  padding:"35px",
  borderRadius:"14px",
  boxShadow:"0 10px 30px rgba(0,0,0,0.2)"
};

const logo = {
  textAlign:"center",
  color:"#d90166",
  fontFamily:"Great Vibes",
  fontSize:"42px"
};

const title = {
  textAlign:"center",
  marginBottom:"10px"
};

const section = {
  marginBottom:"15px"
};

const row = {
  display:"flex",
  justifyContent:"space-between",
  marginBottom:"8px"
};

const thanks = {
  textAlign:"center",
  marginTop:"20px",
  fontStyle:"italic"
};

const btnRow = {
  display:"flex",
  justifyContent:"center",
  gap:"20px",
  marginTop:"20px"
};

const downloadBtn = {
  background:"#528FF0",
  color:"white",
  border:"none",
  padding:"12px 18px",
  borderRadius:"8px",
  cursor:"pointer",
  fontWeight:"bold"
};

const closeBtn = {
  background:"#d90166",
  color:"white",
  border:"none",
  padding:"12px 18px",
  borderRadius:"8px",
  cursor:"pointer"
};