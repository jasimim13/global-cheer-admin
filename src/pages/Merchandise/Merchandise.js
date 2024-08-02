import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowForward, Info } from "@mui/icons-material";
import { motion } from "framer-motion";

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

const Merchandise = () => {
  const navigate = useNavigate();
  const [pauseModalOpen, setPauseModalOpen] = useState(false); // New state for pause confirmation modal
  // Existing state and functions ...

  const handleOpenPauseModal = () => {
    setPauseModalOpen(true);
  };

  const handleClosePauseModal = () => {
    setPauseModalOpen(false);
  };

  const handlePauseEvent = () => {
    // Implement the pause logic here
    console.log("Event paused!");
    handleClosePauseModal();
  };

  const merchandiseCategories = [
    { name: "Shirt", image: "/images/t-shirt.jpg" },
    { name: "Mug", image: "/images/Coffee-Mug.jpg" },
    { name: "Laptop Sleeve", image: "/images/sleeve.jpg" },
  ];

  return (
    <div style={{ padding: "10px", fontFamily: "TimesNewRoman" }}>
      <Button
        variant="contained"
        color="error"
        sx={{
          backgroundColor: "#ED1F24",
          color: "white",
          marginBottom: "20px",
        }}
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
      <Dialog open={pauseModalOpen} onClose={handleClosePauseModal}>
        <DialogTitle>{"Pause Event"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to pause this Merchandise?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePauseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePauseEvent} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginLeft: "10px", fontWeight: "bold" }}
        >
          Your Merchandise
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/add-merchandise")}
          sx={{
            backgroundColor: "#ED1F24",
            color: "white",
          }}
        >
          Add Merchandise
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          flexWrap: "wrap",
          padding: "30px",
          // justifyContent: "center",
        }}
      >
        {merchandiseCategories.map((category) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              sx={{
                width: "300px",
                cursor: "pointer",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
                },
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontFamily: "TimesNewRoman", textAlign: "center" }}
                >
                  {category.name}
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "space-between" }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'flex-end', width:'100%'}} >
                  <Button
                    size="small"
                    onClick={() =>
                      navigate(`/category/${category.name.toLowerCase()}`)
                    }
                    variant="contained"
                    style={{ backgroundColor: "#ED1F24", color: "#ffffff" }}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    style={{ backgroundColor: "#FFEB3B", color: "#000" }}
                    onClick={handleOpenPauseModal}
                  >
                    Pause Event
                  </Button>
                </div>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Merchandise;
