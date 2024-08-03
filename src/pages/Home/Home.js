import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box, Button, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { FaUser, FaCalendarAlt, FaTshirt, FaUsers, FaChartLine, FaQrcode, FaPause, FaPlay, FaSignOutAlt } from 'react-icons/fa';
import { GoPackageDependents } from 'react-icons/go';

const Home = () => {
  const navigate = useNavigate();

  const [pausedItems, setPausedItems] = useState({
    events: false,
    merchandise: false,
  });

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  const togglePause = (item) => {
    setPausedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const cards = [
    { title: 'Users', icon: <FaUser size={isMobile ? 30 : 50} />, description: 'Manage users', color: '#f44336', path: '/users' },
    {
      title: 'Events',
      icon: pausedItems.events ? "PAUSED" : <FaCalendarAlt size={isMobile ? 30 : 50} />,
      description: 'View events',
      color: '#3f51b5',
      path: '/events',
      isPausable: true,
      paused: pausedItems.events,
    },
    {
      title: 'Merchandise',
      icon: pausedItems.merchandise ? "PAUSED" : <FaTshirt size={isMobile ? 30 : 50} />,
      description: 'Browse merchandise',
      color: '#4caf50',
      path: '/merchandise',
      isPausable: true,
      paused: pausedItems.merchandise,
    },
    { title: 'Community', icon: <FaUsers size={isMobile ? 30 : 50} />, description: 'Join the community', color: '#ff9800', path: '/community' },
    { title: 'Sales', icon: <FaChartLine size={isMobile ? 30 : 50} />, description: 'Track sales', color: '#9c27b0', path: '/sales' },
    { title: 'QR Code', icon: <FaQrcode size={isMobile ? 30 : 50} />, description: 'Scan QR codes', color: '#00bcd4', path: '/qrcode' },
    { title: 'Orders', icon: <GoPackageDependents size={isMobile ? 30 : 50} />, description: 'View Orders', color: '#00bcd4', path: '/orders' },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      fontFamily="TimesNewRoman"
      sx={{ mt: 4, px: isMobile ? 2 : 4 }}
    >
      <img src="/images/Logo.jpeg" alt="Logo" style={{ height: isMobile ? '60px' : '100px', width: isMobile ? '120px' : '200px' }} />
      <Box width="100%" display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="error"
          sx={{ backgroundColor: '#ED1F24', color: 'white', marginRight: '15px' }}
          onClick={() => navigate('/auth')}
          startIcon={<FaSignOutAlt />}
        >
          Log Out
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mt: 4 }}>
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
                cursor: card.paused ? 'not-allowed' : 'pointer',
                '&:hover': {
                  boxShadow: 4,
                },
                position: 'relative',
                backgroundColor: card.paused ? '#f5f5f5' : 'white',
                textAlign: 'center',
              }}
              onClick={() => !card.paused && navigate(card.path)}
            >
              <Box
                sx={{
                  color: card.color,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                }}
              >
                {typeof card.icon === 'string' ? (
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 1,
                      color: 'red',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      textAlign: 'center',
                    }}
                  >
                    {card.icon}
                  </Typography>
                ) : (
                  card.icon
                )}
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  {card.description}
                </Typography>
              </Box>
              {card.isPausable && (
                <Tooltip title={card.paused ? "Resume" : "Pause"} arrow>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      color: card.color,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePause(card.title.toLowerCase());
                    }}
                  >
                    {card.paused ? <FaPlay /> : <FaPause />}
                  </IconButton>
                </Tooltip>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
