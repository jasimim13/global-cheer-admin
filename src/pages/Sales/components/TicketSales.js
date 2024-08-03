import React, { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Tabs, Tab, Typography } from '@mui/material';

// Register the necessary chart elements
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TicketSalesChart = ({ data, timeFrame }) => {
  const { filteredData, labels } = filterDataByTimeFrame(data, timeFrame);

  // Create datasets for each event
  const datasets = filteredData.map(sale => ({
    label: sale.eventName,
    data: labels.map(label => {
      const saleDate = formatDate(sale.date, timeFrame);
      return saleDate === label ? sale.ticketsSold : 0;
    }),
    backgroundColor: getRandomColor(),
    borderColor: 'rgba(0, 0, 0, 1)',
    borderWidth: 1
  }));

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
          text: 'Tickets Sold'
        },
        beginAtZero: true
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const sale = filteredData.find(sale => formatDate(sale.date, timeFrame) === context.label && sale.eventName === context.dataset.label);
            return `${context.dataset.label}: ${context.raw} tickets sold`;
          }
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
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

const TicketTabs = () => {
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
        <TicketSalesChart data={ticketSales} timeFrame={timeFrame} />
      </Typography>
    </Box>
  );
};

export default TicketTabs;

const ticketSales = [
  { eventName: "Concert A", date: "2024-01-01", ticketsSold: 500 },
  { eventName: "Theater B", date: "2024-02-03", ticketsSold: 300 },
  { eventName: "Festival C", date: "2024-03-05", ticketsSold: 1200 },
  { eventName: "Concert D", date: "2024-04-07", ticketsSold: 800 },
  { eventName: "Theater E", date: "2024-05-09", ticketsSold: 450 },
  { eventName: "Festival F", date: "2024-05-11", ticketsSold: 1500 },
  { eventName: "Concert G", date: "2024-06-13", ticketsSold: 600 },
  { eventName: "Theater H", date: "2024-06-15", ticketsSold: 350 },
  { eventName: "Festival I", date: "2024-07-17", ticketsSold: 1100 },
  { eventName: "Concert J", date: "2024-08-19", ticketsSold: 700 },
  { eventName: "Theater K", date: "2024-09-21", ticketsSold: 400 },
  { eventName: "Festival L", date: "2024-10-23", ticketsSold: 1300 },
  { eventName: "Concert M", date: "2024-11-25", ticketsSold: 550 },
  { eventName: "Theater N", date: "2024-12-27", ticketsSold: 500 },
  { eventName: "Festival O", date: "2024-12-29", ticketsSold: 1400 }
];
