// src/pages/Sales.js
import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { Box, Typography, Grid } from '@mui/material';

const Sales = () => {
  useEffect(() => {
    const merchandiseChart = echarts.init(document.getElementById('merchandise-chart'));
    const eventChart = echarts.init(document.getElementById('event-chart'));

    const merchandiseSalesData = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['T-Shirt', 'Coffee Mug', 'Laptop Sleeve'],
        axisLabel: {
          color: 'black',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'black',
        },
      },
      series: [
        {
          data: [120, 200, 150],
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#ED1F24',
          },
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(237, 31, 36, 0.5)' },
              { offset: 1, color: 'rgba(237, 31, 36, 0)' },
            ]),
          },
        },
      ],
    };

    const eventSalesData = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['Music Concert', 'Art Exhibition', 'Tech Conference'],
        axisLabel: {
          color: 'black',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'black',
        },
      },
      series: [
        {
          data: [300, 180, 250],
          type: 'bar',
          itemStyle: {
            color: '#ED1F24',
          },
        },
      ],
    };

    merchandiseChart.setOption(merchandiseSalesData);
    eventChart.setOption(eventSalesData);

    return () => {
      merchandiseChart.dispose();
      eventChart.dispose();
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'TimesNewRoman' }}>
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
              Merchandise Sales
            </Typography>
            <div id="merchandise-chart" style={{ height: '400px', width: '100%' }}></div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h5" component="h2" align="center" color="black" fontFamily={'TimesNewRoman'} >
              Event Ticket Sales
            </Typography>
            <div id="event-chart" style={{ height: '400px', width: '100%' }}></div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Sales;
