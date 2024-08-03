import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart elements
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Sample data
const merchandiseSales = [
  { merchandiseName: "T-Shirt A", stock: 100, sold: 30, date: "2024-01-01" },
  { merchandiseName: "Hat B", stock: 50, sold: 20, date: "2024-02-01" },
  { merchandiseName: "Poster C", stock: 200, sold: 100, date: "2024-03-01" },
  { merchandiseName: "Mug D", stock: 75, sold: 25, date: "2024-04-01" },
  { merchandiseName: "Keychain E", stock: 150, sold: 70, date: "2024-05-01" },
  { merchandiseName: "Sticker F", stock: 300, sold: 150, date: "2024-06-01" },
  { merchandiseName: "Hoodie G", stock: 80, sold: 40, date: "2024-07-01" },
  { merchandiseName: "Cap H", stock: 60, sold: 30, date: "2024-08-01" },
  { merchandiseName: "Poster I", stock: 190, sold: 90, date: "2024-09-01" },
  { merchandiseName: "Mug J", stock: 85, sold: 45, date: "2024-10-01" },
  { merchandiseName: "T-Shirt K", stock: 120, sold: 60, date: "2024-11-01" },
  { merchandiseName: "Keychain L", stock: 140, sold: 80, date: "2024-12-01" }
];

const MerchandiseSalesChart = ({ data, timeFrame }) => {
  const { filteredData, labels } = filterDataByTimeFrame(data, timeFrame);

  // Extract unique merchandise names
  const merchandiseNames = [...new Set(filteredData.map(sale => sale.merchandiseName))];
  
  // Create datasets for each merchandise item
  const datasets = merchandiseNames.map(name => {
    const salesByDate = labels.map(label => {
      const sale = filteredData.find(sale => sale.merchandiseName === name && formatDate(sale.date, timeFrame) === label);
      return sale ? sale.sold : 0;
    });
    
    return {
      label: name,
      data: salesByDate,
      fill: false,
      borderColor: getRandomColor(), // Function to get a random color
      tension: 0.1
    };
  });

  const chartData = {
    labels,
    datasets
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: timeFrame === 'monthly' ? 'Month, Year' : timeFrame === 'quarterly' ? 'Quarter, Year' : 'Year'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Units Sold'
        },
        beginAtZero: true
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const date = context.label;
            const merchandiseName = context.dataset.label;
            const sale = data.find(sale => sale.merchandiseName === merchandiseName && formatDate(sale.date, timeFrame) === date);
            return `${merchandiseName}: ${context.raw} sold, Stock: ${sale ? sale.stock : 0}`;
          }
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

// Function to filter data based on time frame and generate labels
const filterDataByTimeFrame = (data, timeFrame) => {
  const now = new Date();
  let filteredData;
  let labels = [];

  switch (timeFrame) {
    case 'monthly':
      filteredData = data.filter(sale => new Date(sale.date) >= new Date(now.getFullYear(), now.getMonth() - 11, 1));
      labels = generateMonthlyLabels();
      break;
    case 'quarterly':
      filteredData = data.filter(sale => new Date(sale.date) >= new Date(now.getFullYear(), now.getMonth() - 9, 1));
      labels = generateQuarterlyLabels();
      break;
    case 'yearly':
      filteredData = data.filter(sale => new Date(sale.date) >= new Date(now.getFullYear() - 4, 0, 1));
      labels = generateYearlyLabels();
      break;
    default:
      filteredData = data;
  }

  return { filteredData, labels };
};

// Function to generate monthly labels
const generateMonthlyLabels = () => {
  const now = new Date();
  let labels = [];
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
  }
  return labels;
};

// Function to generate quarterly labels
const generateQuarterlyLabels = () => {
  const now = new Date();
  let labels = [];
  for (let i = 3; i >= 0; i--) {
    const year = now.getFullYear();
    const quarter = Math.floor((now.getMonth() - (i * 3)) / 3) + 1;
    labels.push(`Q${quarter}, ${year}`);
  }
  return labels;
};

// Function to generate yearly labels
const generateYearlyLabels = () => {
  const now = new Date();
  let labels = [];
  for (let i = 4; i >= 0; i--) {
    labels.push((now.getFullYear() - i).toString());
  }
  return labels;
};

// Function to format date based on time frame
const formatDate = (date, timeFrame) => {
  const parsedDate = new Date(date);
  if (timeFrame === 'monthly') {
    return parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } else if (timeFrame === 'quarterly') {
    const quarter = Math.floor(parsedDate.getMonth() / 3) + 1;
    return `Q${quarter}, ${parsedDate.getFullYear()}`;
  } else {
    return parsedDate.getFullYear().toString();
  }
};

// Function to generate random colors
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MerchandiseTabs = () => {
  const [timeFrame, setTimeFrame] = useState('monthly');

  const handleChange = (event, newValue) => {
    setTimeFrame(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={timeFrame} onChange={handleChange} centered>
        <Tab label="Monthly" value="monthly" />
        <Tab label="Quarterly" value="quarterly" />
        <Tab label="Yearly" value="yearly" />
      </Tabs>
      <Typography component="div" role="tabpanel">
        <MerchandiseSalesChart data={merchandiseSales} timeFrame={timeFrame} />
      </Typography>
    </Box>
  );
};

export default MerchandiseTabs;
