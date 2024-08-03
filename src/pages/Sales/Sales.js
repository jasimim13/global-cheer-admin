import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Box, Typography, Grid, Button, ToggleButtonGroup, ToggleButton, Paper, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaFire, FaTrophy, FaFileInvoiceDollar, FaCartPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Sales = () => {
  const [view, setView] = useState('monthly');
  const [chartInstance, setChartInstance] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  const navigate = useNavigate();

  const updateChart = (chart, view) => {
    const dates = {
      monthly: ['10/10/2023', '20/10/2023', '30/10/2023', '10/11/2023', '20/11/2023', '30/11/2023', '10/12/2023'],
      quarterly: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'],
      yearly: ['2020', '2021', '2022', '2023']
    };

    const salesData = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: function (params) {
          const date = params[0].axisValue;
          let tooltipContent = `<div>${date}</div>`;
          params.forEach(param => {
            tooltipContent += `<div>${param.marker} ${param.seriesName}: $${param.data}</div>`;
          });
          return tooltipContent;
        }
      },
      legend: {
        data: ['Ticket Sales', 'Merchandise Sales']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: dates[view]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Ticket Sales',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: view === 'monthly' ? [5000, 7000, 9000, 11000, 13000, 15000, 17000] : view === 'quarterly' ? [30000, 45000, 60000, 75000] : [90000, 120000, 150000, 180000]
        },
        {
          name: 'Merchandise Sales',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: view === 'monthly' ? [3000, 4000, 5000, 6000, 7000, 8000, 9000] : view === 'quarterly' ? [20000, 30000, 40000, 50000] : [60000, 80000, 100000, 120000]
        }
      ]
    };

    chart.setOption(salesData);
  };

  useEffect(() => {
    const chart = echarts.init(document.getElementById('sales-chart'));
    setChartInstance(chart);
    updateChart(chart, view);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (chartInstance) {
      updateChart(chartInstance, view);
    }
  }, [view, chartInstance]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', transition: { duration: 0.3 } }
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'TimesNewRoman' }}>
      <Button
        variant="contained"
        color="error"
        sx={{ backgroundColor: "#ED1F24", color: "white" }}
        onClick={() => navigate('/')}
      >
        Go Back
      </Button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/images/Logo.jpeg"
          alt="Logo"
          style={{ height: "100px", objectFit: 'cover', backgroundPosition: 'start' }}
        />
      </div>
      <Typography variant="h4" component="h1" align="center" color="#ED1F24" gutterBottom fontFamily={'TimesNewRoman'} >
        Sales
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div initial="hidden" animate="visible" whileHover="hover" variants={cardVariants}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FaFileInvoiceDollar size={isMobile ? 30 : 50} color="#4caf50" />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1">Total Income</Typography>
                <Typography variant={isMobile ? "h5" : "h4"}>$129,230</Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div initial="hidden" animate="visible" whileHover="hover" variants={cardVariants}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FaCartPlus size={isMobile ? 30 : 50} color="#3f51b5" />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1">Total Sales</Typography>
                <Typography variant={isMobile ? "h5" : "h4"}>2,456</Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div initial="hidden" animate="visible" whileHover="hover" variants={cardVariants}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FaFire size={isMobile ? 30 : 50} color="#ff9800" />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1">Hot Products</Typography>
                <Typography variant={isMobile ? "h5" : "h4"}>T-Shirt</Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div initial="hidden" animate="visible" whileHover="hover" variants={cardVariants}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FaTrophy size={isMobile ? 30 : 50} color="#9c27b0" />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1">Most Selling Product</Typography>
                <Typography variant={isMobile ? "h5" : "h4"}>Coffee Mug</Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', maxWidth: isMobile ? '100%' : '100%' }}>
            <Typography variant="h5" component="h2" align="center" color="black" fontFamily={'TimesNewRoman'} >
              Sales Revenue
            </Typography>
            <div id="sales-chart" style={{ height: isMobile ? '250px' : '400px', width: '100%' }}></div>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(e, newView) => setView(newView)}
              sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
            >
              <ToggleButton value="monthly">Monthly</ToggleButton>
              <ToggleButton value="quarterly">Quarterly</ToggleButton>
              <ToggleButton value="yearly">Yearly</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Sales;
