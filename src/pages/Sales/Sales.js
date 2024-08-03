import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  useMediaQuery,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  FaFileInvoiceDollar,
  FaCartPlus,
  FaFire,
  FaTrophy,
} from "react-icons/fa";
import { motion } from "framer-motion";
import TicketTabs from "./components/TicketSales";
import MerchandiseTabs from "./components/MerchandiseSales";

const Sales = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      scale: 1.05,
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  const ticketSales = [
    { eventName: "Concert A", date: "2024-08-01", ticketsSold: 500 },
    { eventName: "Theater B", date: "2024-08-03", ticketsSold: 300 },
    { eventName: "Festival C", date: "2024-08-05", ticketsSold: 1200 },
    { eventName: "Concert D", date: "2024-08-07", ticketsSold: 800 },
    { eventName: "Theater E", date: "2024-08-09", ticketsSold: 450 },
    { eventName: "Festival F", date: "2024-08-11", ticketsSold: 1500 },
    { eventName: "Concert G", date: "2024-08-13", ticketsSold: 600 },
    { eventName: "Theater H", date: "2024-08-15", ticketsSold: 350 },
    { eventName: "Festival I", date: "2024-08-17", ticketsSold: 1100 },
    { eventName: "Concert J", date: "2024-08-19", ticketsSold: 700 },
    { eventName: "Theater K", date: "2024-08-21", ticketsSold: 400 },
    { eventName: "Festival L", date: "2024-08-23", ticketsSold: 1300 },
    { eventName: "Concert M", date: "2024-08-25", ticketsSold: 550 },
    { eventName: "Theater N", date: "2024-08-27", ticketsSold: 500 },
    { eventName: "Festival O", date: "2024-08-29", ticketsSold: 1400 },
  ];

  const merchandiseSales = [
    { merchandiseName: "T-Shirt A", stock: 100, sold: 30, date: "2024-08-01" },
    { merchandiseName: "Hat B", stock: 50, sold: 20, date: "2024-08-02" },
    { merchandiseName: "Poster C", stock: 200, sold: 100, date: "2024-08-03" },
    { merchandiseName: "Mug D", stock: 75, sold: 25, date: "2024-08-04" },
    { merchandiseName: "Keychain E", stock: 150, sold: 70, date: "2024-08-05" },
    { merchandiseName: "Sticker F", stock: 300, sold: 150, date: "2024-08-06" },
    { merchandiseName: "Hoodie G", stock: 80, sold: 40, date: "2024-08-07" },
    { merchandiseName: "Cap H", stock: 60, sold: 30, date: "2024-08-08" },
    { merchandiseName: "Poster I", stock: 190, sold: 90, date: "2024-08-09" },
    { merchandiseName: "Mug J", stock: 85, sold: 45, date: "2024-08-10" },
    { merchandiseName: "T-Shirt K", stock: 120, sold: 60, date: "2024-08-11" },
    { merchandiseName: "Keychain L", stock: 140, sold: 80, date: "2024-08-12" },
    { merchandiseName: "Sticker M", stock: 250, sold: 120, date: "2024-08-13" },
    { merchandiseName: "Hoodie N", stock: 90, sold: 50, date: "2024-08-14" },
    { merchandiseName: "Cap O", stock: 70, sold: 35, date: "2024-08-15" },
  ];

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
        fontFamily={"TimesNewRoman"}
      >
        Sales
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3, margin: "0 auto" }}
      >
        <Grid item xs={12} sm={6} md={6}>
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FaFileInvoiceDollar size={isMobile ? 30 : 50} color="#4caf50" />
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="subtitle1">Total Income</Typography>
                <Typography variant={isMobile ? "h5" : "h4"}>
                  $129,230
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FaCartPlus size={isMobile ? 30 : 50} color="#3f51b5" />
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="subtitle1">Total Sales</Typography>
                <Typography variant={isMobile ? "h5" : "h4"}>2,456</Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FaFire size={isMobile ? 30 : 50} color="#ff9800" />
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="subtitle1">Hot Products</Typography>
                <Typography variant={isMobile ? "h5" : "h4"}>
                  T-Shirt
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FaTrophy size={isMobile ? 30 : 50} color="#9c27b0" />
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="subtitle1">
                  Most Selling Product
                </Typography>
                <Typography variant={isMobile ? "h5" : "h4"}>
                  Coffee Mug
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ textAlign: 'center', fontSize: '30px' }} > Ticket Sales </p>
            <TicketTabs/>

          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ textAlign: 'center', fontSize: '30px' }} > Merchandise Sales </p>
            <MerchandiseTabs />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Sales;
