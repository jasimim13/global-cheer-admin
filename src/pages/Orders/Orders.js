// src/pages/Orders.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Modal,
  AppBar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #ED1F24",
  boxShadow: 24,
  p: 4,
};

const dummyOrders = [
  {
    id: "001",
    name: "John Doe",
    items: 3,
    status: "Pending",
  },
  {
    id: "002",
    name: "Jane Smith",
    items: 5,
    status: "Delivered",
  },
  {
    id: "003",
    name: "Alice Johnson",
    items: 2,
    status: "Pending",
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Orders = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [openModal, setOpenModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenModal = (order) => {
    setCurrentOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleStatusChange = (status) => {
    const updatedOrders = dummyOrders.map((order) =>
      order.id === currentOrder.id ? { ...order, status: status } : order
    );
    dummyOrders.splice(0, dummyOrders.length, ...updatedOrders);
    handleCloseModal();
  };

  return (
    <Box sx={{ width: "100%", padding: '10px', typography: "body1" }}>
        <Button
        variant="contained"
        color="error"
        sx={{ backgroundColor: "#ED1F24", color: "white" }}
        onClick={() => navigate('/')}
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
          style={{ height: "100px", width: "200px", marginBottom: "10px" }}
        />
      </div>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="order tabs"
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab label="All Orders" value="1" />
          <Tab label="Pending" value="2" />
        </Tabs>
      </AppBar>
      <TabPanel value={selectedTab} index="1">
        <Grid container spacing={2}>
          {dummyOrders.map((order) => (
            <Grid item xs={12} md={4} key={order.id}>
              <Card sx={{ padding: "20px" }}>
                <CardContent>
                  <Typography variant="h5">{order.name}</Typography>
                  <Typography>Items: {order.items}</Typography>
                  <Typography>Status: {order.status}</Typography>
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    onClick={() => handleOpenModal(order)}
                    sx={{
                      backgroundColor: "#ED1F24",
                      color: "white",
                    }}
        
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={selectedTab} index="2">
        <Grid container spacing={2}>
          {dummyOrders
            .filter((order) => order.status === "Pending")
            .map((order) => (
              <Grid item xs={12} md={4} key={order.id}>
                <Card
                  onClick={() => handleOpenModal(order)}
                  sx={{ cursor: "pointer" }}
                >
                  <CardContent>
                    <Typography variant="h5">{order.name}</Typography>
                    <Typography>Items: {order.items}</Typography>
                    <Typography>Status: {order.status}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </TabPanel>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          {currentOrder && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Order ID: {currentOrder.id}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Name: {currentOrder.name}
              </Typography>
              <Typography>Items: {currentOrder.items}</Typography>
              <Typography>Status: {currentOrder.status}</Typography>
              <Button
                onClick={() => handleStatusChange("Accepted")}
                color="primary"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleStatusChange("Declined")}
                color="error"
              >
                Decline
              </Button>
              <Button
                onClick={() => handleStatusChange("Delivered")}
                color="success"
              >
                Deliver
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Orders;
