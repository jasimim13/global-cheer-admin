import React, { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Button,
  Grid,
  Card,
  CardContent,
  Modal,
  Container,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "orange";
    case "Delivered":
      return "green";
    case "Accepted":
      return "blue";
    case "Declined":
      return "red";
    default:
      return "gray";
  }
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '80%' : isTablet ? '70%' : '30%',
    maxHeight: isMobile ? '90%' : '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  };

  return (
    <Box sx={{ width: "100%", p: isMobile ? 2 : 4, typography: "body1", overflowX: 'hidden' }}>
      <Button
        variant="contained"
        color="error"
        sx={{ backgroundColor: "#ED1F24", color: "white", mb: 2 }}
        onClick={() => navigate("/home")}
      >
        Go Back
      </Button>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <img
            src="/images/Logo.jpeg"
            alt="Logo"
            style={{ height: isMobile ? "80px" : "100px", width: isMobile ? "160px" : "200px", mb: 2 }}
          />
        </Box>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="order tabs"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'red',
            },
          }}
          textColor="inherit"
          variant={isMobile ? "fullWidth" : "standard"}
        >
          <Tab label="All Orders" value="1" />
          <Tab label="Pending" value="2" />
        </Tabs>
        <TabPanel value={selectedTab} index="1">
          <Grid container spacing={2}>
            {dummyOrders.map((order) => (
              <Grid item xs={12} md={4} key={order.id}>
                <Card sx={{ p: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {order.name}
                    </Typography>
                    <Typography>Items: {order.items}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography>Status:</Typography>
                      <Chip
                        label={order.status}
                        sx={{
                          backgroundColor: getStatusColor(order.status),
                          color: "white",
                        }}
                      />
                    </Box>
                  </CardContent>
                  <Box sx={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ED1F24",
                        color: "white",
                        mt: 2,
                      }}
                      onClick={() => handleOpenModal(order)}
                    >
                      View Details
                    </Button>
                  </Box>
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
                  <Card sx={{ p: 2, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {order.name}
                      </Typography>
                      <Typography>Items: {order.items}</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography>Status:</Typography>
                        <Chip
                          label={order.status}
                          sx={{
                            backgroundColor: getStatusColor(order.status),
                            color: "white",
                          }}
                        />
                      </Box>
                    </CardContent>
                    <Box sx={{ textAlign: "right" }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#ED1F24",
                          color: "white",
                          mt: 2,
                        }}
                        onClick={() => handleOpenModal(order)}
                      >
                        View Details
                      </Button>
                    </Box>
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                  <Typography>Status:</Typography>
                  <Chip
                    label={currentOrder.status}
                    sx={{
                      backgroundColor: getStatusColor(currentOrder.status),
                      color: "white",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleStatusChange("Accepted")}
                    sx={{ backgroundColor: "blue", color: "white" }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleStatusChange("Declined")}
                    sx={{ backgroundColor: "red", color: "white" }}
                  >
                    Decline
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleStatusChange("Delivered")}
                    sx={{ backgroundColor: "green", color: "white" }}
                  >
                    Deliver
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default Orders;
