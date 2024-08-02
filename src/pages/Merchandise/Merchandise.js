import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [currentMerchIndex, setCurrentMerchIndex] = useState(null);
  const [filter, setFilter] = useState("all");

  const [merchandiseCategories, setMerchandiseCategories] = useState([
    { name: "Shirt", image: "/images/t-shirt.jpg", stock: 8, paused: false },
    { name: "Mug", image: "/images/Coffee-Mug.jpg", stock: 15, paused: false },
    { name: "Laptop Sleeve", image: "/images/sleeve.jpg", stock: 9, paused: false },
  ]);

  const handleOpenPauseModal = (index) => {
    setCurrentMerchIndex(index);
    setPauseModalOpen(true);
  };

  const handleClosePauseModal = () => {
    setPauseModalOpen(false);
    setCurrentMerchIndex(null);
  };

  const handleTogglePauseMerch = () => {
    setMerchandiseCategories((prevMerchandise) => {
      const newMerchandise = [...prevMerchandise];
      newMerchandise[currentMerchIndex].paused = !newMerchandise[currentMerchIndex].paused;
      return newMerchandise;
    });
    handleClosePauseModal();
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const lowStock = merchandiseCategories.filter(
      (category) => category.stock < 10
    );
    setLowStockItems(lowStock);
  }, [merchandiseCategories]);

  const filteredMerchandise = merchandiseCategories.filter((category) => {
    if (filter === "all") return true;
    if (filter === "paused") return category.paused;
    if (filter === "active") return !category.paused;
    return true;
  });

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
        <DialogTitle>
          {merchandiseCategories[currentMerchIndex]?.paused ? "Resume Merchandise" : "Pause Merchandise"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {merchandiseCategories[currentMerchIndex]?.paused
              ? "Are you sure you want to resume this merchandise?"
              : "Are you sure you want to pause this merchandise?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePauseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTogglePauseMerch} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {lowStockItems.length > 0 && (
        <Alert severity="warning" sx={{ marginBottom: "20px" }}>
          The following items have stock lower than 10:{" "}
          {lowStockItems.map((item, index) => (
            <span key={item.name}>
              {item.name}
              {index < lowStockItems.length - 1 ? ", " : ""}
            </span>
          ))}
        </Alert>
      )}
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
      <div style={{ padding: "10px" }}>
        <InputLabel>Filter Merchandise</InputLabel>
        <FormControl fullWidth>
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="all">All Merchandise</MenuItem>
            <MenuItem value="paused">Paused Merchandise</MenuItem>
            <MenuItem value="active">Active Merchandise</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          flexWrap: "wrap",
          padding: "30px",
        }}
      >
        {filteredMerchandise.map((category, index) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              sx={{
                width: "330px",
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'flex-end', width: '100%' }}>
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
                    onClick={() => handleOpenPauseModal(index)}
                  >
                    {category.paused ? "Resume Merchandise" : "Pause Merchandise"}
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
