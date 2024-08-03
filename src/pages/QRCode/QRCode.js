// src/pages/QRCode.js
import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import QRCodeReact from "qrcode.react";
import { toPng } from "html-to-image";
import { useNavigate } from "react-router-dom";

const QRCode = () => {
  const qrRef = useRef(null);
  const navigate = useNavigate();
  const [qrValue, setQrValue] = useState("https://example.com/coach-profile");
  const [qrHistory, setQrHistory] = useState([
    "https://example.com/coach-profile",
  ]);

  const handleDownload = async () => {
    if (qrRef.current) {
      try {
        const dataUrl = await toPng(qrRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating QR code image:", error);
      }
    }
  };

  const handleGenerateNewQR = () => {
    const newUrl = prompt("Enter new URL for QR Code:");
    if (newUrl && !qrHistory.includes(newUrl)) {
      setQrHistory([...qrHistory, newUrl]);
      setQrValue(newUrl);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "TimesNewRoman",
      }}
    >
      <Button
        variant="contained"
        color="error"
        sx={{ backgroundColor: "#ED1F24", color: "white" }}
        onClick={() => navigate("/home")}
      >
        Go Back
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/Logo.jpeg"
          alt="Logo"
          style={{
            height: "100px",
            objectFit: "cover",
            backgroundPosition: "start",
          }}
        />
      </div>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        color="#ED1F24"
        gutterBottom
      >
        Generate QR Code for Coaches
      </Typography>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateNewQR}
            sx={{ backgroundColor: "#ED1F24", color: "white", marginBottom: 2 }}
          >
            Generate New QR
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateNewQR}
            sx={{ backgroundColor: "#ED1F24", color: "white", marginBottom: 2 }}
          >
            Generate Previous QR
          </Button>
        </div>
        <div ref={qrRef}>
          <QRCodeReact value={qrValue} size={256} />
        </div>
        <Button
          variant="contained"
          color="error"
          onClick={handleDownload}
          sx={{ backgroundColor: "#ED1F24", color: "white", marginTop: 2 }}
        >
          Download QR Code
        </Button>
      </Box>
    </div>
  );
};

export default QRCode;
