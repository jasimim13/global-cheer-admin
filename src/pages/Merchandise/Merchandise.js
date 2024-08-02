import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowForward, Info } from "@mui/icons-material";
import { motion } from "framer-motion";

const Merchandise = () => {
  const navigate = useNavigate();

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
        sx={{ backgroundColor: "#ED1F24", color: "white", marginBottom: "20px" }}
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
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
        <Typography variant="h4" sx={{ marginLeft: "10px", fontWeight: "bold" }}>
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
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
                  sx={{ color: "#ED1F24" }}
                >
                  View Details
                </Button>
                <div>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
                    sx={{ color: "#ED1F24" }}
                  >
                    <Info />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
                    sx={{ color: "#ED1F24" }}
                  >
                    <ArrowForward />
                  </IconButton>
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
