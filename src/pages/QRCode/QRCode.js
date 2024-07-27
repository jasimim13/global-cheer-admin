// src/pages/QRCode.js
import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import QRCodeReact from 'qrcode.react';
import { toPng } from 'html-to-image';

const QRCode = () => {
  const qrRef = useRef(null);

  const handleDownload = async () => {
    if (qrRef.current) {
      try {
        const dataUrl = await toPng(qrRef.current);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error generating QR code image:', error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'TimesNewRoman' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/images/Logo.jpeg"
          alt="Logo"
          style={{ height: "100px", objectFit: 'cover', backgroundPosition: 'start' }}
        />
      </div>
      <Typography variant="h4" component="h1" align="center" color="#ED1F24" gutterBottom>
        Generate QR Code for Coaches
      </Typography>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <div ref={qrRef}>
          <QRCodeReact value="https://example.com/coach-profile" size={256} />
        </div>
        <Button variant="contained" color="error" onClick={handleDownload} sx={{ backgroundColor: '#ED1F24', color: 'white', marginTop: 2 }}>
          Download QR Code
        </Button>
      </Box>
    </div>
  );
};

export default QRCode;
