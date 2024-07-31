// src/pages/Sales.js
import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sales = () => {
  useEffect(() => {
    const onlineSalesChart = echarts.init(document.getElementById('online-sales-chart'));
    const inStoreSalesChart = echarts.init(document.getElementById('instore-sales-chart'));

    const dates = ['2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04', '2024-07-05', '2024-07-06', '2024-07-07'];

    const onlineSalesData = {
      title: {
        text: 'Online Sales Data'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: function(params) {
          const date = params[0].axisValue;
          let tooltipContent = `<div>${date}</div>`;
          params.forEach(param => {
            tooltipContent += `<div>${param.marker} ${param.seriesName}: ${param.data}</div>`;
          });
          return tooltipContent;
        }
      },
      legend: {
        data: ['T-Shirt', 'Coffee Mug', 'Laptop Sleeve']
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
          data: dates
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'T-Shirt',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [50, 60, 70, 80, 90, 100, 110]
        },
        {
          name: 'Coffee Mug',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [30, 40, 50, 60, 70, 80, 90]
        },
        {
          name: 'Laptop Sleeve',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [20, 30, 40, 50, 60, 70, 80]
        }
      ]
    };

    const inStoreSalesData = {
      title: {
        text: 'In-Store Sales Data'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: function(params) {
          const date = params[0].axisValue;
          let tooltipContent = `<div>${date}</div>`;
          params.forEach(param => {
            tooltipContent += `<div>${param.marker} ${param.seriesName}: ${param.data}</div>`;
          });
          return tooltipContent;
        }
      },
      legend: {
        data: ['T-Shirt', 'Coffee Mug', 'Laptop Sleeve']
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
          data: dates
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'T-Shirt',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [20, 30, 40, 50, 60, 70, 80]
        },
        {
          name: 'Coffee Mug',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [10, 20, 30, 40, 50, 60, 70]
        },
        {
          name: 'Laptop Sleeve',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [5, 10, 15, 20, 25, 30, 35]
        }
      ]
    };

    onlineSalesChart.setOption(onlineSalesData);
    inStoreSalesChart.setOption(inStoreSalesData);

    return () => {
      onlineSalesChart.dispose();
      inStoreSalesChart.dispose();
    };
  }, []);

  const navigate = useNavigate();

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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h5" component="h2" align="center" color="black" fontFamily={'TimesNewRoman'} >
              Online Sales
            </Typography>
            <div id="online-sales-chart" style={{ height: '400px', width: '100%' }}></div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h5" component="h2" align="center" color="black" fontFamily={'TimesNewRoman'} >
              In-Store Sales
            </Typography>
            <div id="instore-sales-chart" style={{ height: '400px', width: '100%' }}></div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Sales;
