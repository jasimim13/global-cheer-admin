// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { FaUser, FaCalendarAlt, FaTshirt, FaUsers, FaChartLine, FaQrcode } from 'react-icons/fa';
import { GoPackageDependents } from "react-icons/go";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    { title: 'Users', icon: <FaUser size={50} />, description: 'Manage users', color: '#f44336', path: '/users' },
    { title: 'Events', icon: <FaCalendarAlt size={50} />, description: 'View events', color: '#3f51b5', path: '/events' },
    { title: 'Merchandise', icon: <FaTshirt size={50} />, description: 'Browse merchandise', color: '#4caf50', path: '/merchandise' },
    { title: 'Community', icon: <FaUsers size={50} />, description: 'Join the community', color: '#ff9800', path: '/community' },
    { title: 'Sales', icon: <FaChartLine size={50} />, description: 'Track sales', color: '#9c27b0', path: '/sales' },
    { title: 'QR Code', icon: <FaQrcode size={50} />, description: 'Scan QR codes', color: '#00bcd4', path: '/qrcode' },
    { title: 'Orders', icon: <GoPackageDependents size={50} />, description: 'View Orders', color: '#00bcd4', path: '/orders' },
    // { title: 'User Managment', icon: <GoPackageDependents size={50} />, description: 'Manage Users', color: '#00bcd4', path: '/usermanagement' },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      fontFamily="TimesNewRoman"
      sx={{ mt: 4 }}
    >
      <img src="/images/Logo.jpeg" alt="Logo" style={{ height: '100px', width: '200px' }} />

      <Grid container spacing={3} sx={{ mt: 4, paddingX: 20 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                border: `1px solid ${card.color}`,
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 4,
                },
              }}
              onClick={() => navigate(card.path)}
            >
              <Box
                sx={{
                  color: card.color,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {card.icon}
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  {card.description}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
