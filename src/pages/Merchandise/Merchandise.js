// src/pages/Merchandise.js
import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
} from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
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

const Merchandise = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMerch, setSelectedMerch] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [merchData, setMerchData] = useState({
    name: "",
    description: "",
    category: "",
    size: "",
    color: "",
    price: "",
    image_url: "",
    stock: "",
  });

  const dummyMerchandise = [
    {
      name: "T-Shirt",
      description: "Comfortable cotton t-shirt",
      category: "Clothing",
      size: "M",
      color: "Blue",
      price: "20",
      image_url: "/images/t-shirt.jpg",
      stock: "50",
    },
    {
      name: "Coffee Mug",
      description: "Ceramic mug with cool design",
      category: "Accessories",
      size: "One Size",
      color: "White",
      price: "10",
      image_url: "/images/Coffee-Mug.jpg",
      stock: "100",
    },
    {
      name: "Laptop Sleeve",
      description: "Protective sleeve for laptops",
      category: "Accessories",
      size: "15 inch",
      color: "Black",
      price: "25",
      image_url: "/images/sleeve.jpg",
      stock: "30",
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMerchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(merchData);
    handleClose();
  };

  const handleViewOpen = (merch) => {
    setSelectedMerch(merch);
    setViewOpen(true);
  };

  const handleViewClose = () => setViewOpen(false);

  const handleEditOpen = (merch) => {
    setSelectedMerch(merch);
    setMerchData(merch);
    setEditOpen(true);
  };

  const handleEditClose = () => setEditOpen(false);

  const handleDelete = (merch) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this merchandise?"
    );
    if (confirmDelete) {
      console.log(`Deleting merchandise: ${merch.name}`);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(merchData);
    handleEditClose();
  };

  const handleImageChange = (event) => {
    setPostImage(event.target.files[0]);
  };

  const navigate = useNavigate();
  return (
    <div style={{ padding: "10px", fontFamily: "TimesNewRoman" }}>
      <Button
        variant="contained"
        color="error"
        sx={{ backgroundColor: "#ED1F24", color: "white" }}
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
        }}
      >
        <p style={{ fontSize: "30px", marginLeft: "10px", fontWeight: "bold" }}>
          Your Merchandise
        </p>
        <Button
          variant="contained"
          color="error"
          onClick={handleOpen}
          sx={{
            backgroundColor: "#ED1F24",
            color: "white",
          }}
        >
          Add Merchandise
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Add New Merchandise
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={merchData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={merchData.description}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                name="category"
                value={merchData.category}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Size"
                name="size"
                value={merchData.size}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Color"
                name="color"
                value={merchData.color}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={merchData.price}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Stock"
                name="stock"
                type="number"
                value={merchData.stock}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
            <Button
                variant="contained"
                component="label"
                sx={{ marginTop: 2, marginRight: 2 }}
              >
                Upload Images
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ backgroundColor: "#ED1F24", color: "white", marginTop: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          flexWrap: "wrap",
          padding: "30px",
          justifyContent: "center",
        }}
      >
        {dummyMerchandise.map((item, index) => (
          <Card key={index} sx={{ width: "450px" }}>
            <CardMedia
              component="img"
              height="240"
              image={item.image_url}
              alt={item.name}
              s
            />
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontFamily: "TimesNewRoman" }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  style={{ fontFamily: "TimesNewRoman" }}
                >
                  Price:{" "}
                  <span style={{ color: "#ED1F24", fontSize: "30px" }}>
                    {item.price}
                  </span>
                  $
                </Typography>
              </div>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ fontFamily: "TimesNewRoman" }}
              >
                {item.description}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ fontFamily: "TimesNewRoman" }}
              >
                Category: {item.category}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ fontFamily: "TimesNewRoman" }}
              >
                Size: {item.size}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ fontFamily: "TimesNewRoman" }}
              >
                Color: {item.color}
              </Typography>

              <Typography
                variant="h6"
                color="textSecondary"
                style={{ fontFamily: "TimesNewRoman" }}
              >
                Stock: {item.stock}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => handleViewOpen(item)}
                sx={{ color: "#ED1F24", fontFamily: "TimesNewRoman" }}
              >
                View Details
              </Button>
              <IconButton
                color="primary"
                onClick={() => handleEditOpen(item)}
                sx={{ color: "#ED1F24" }}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => handleDelete(item)}
                sx={{ color: "#ED1F24" }}
              >
                <Delete />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>

      <Modal open={viewOpen} onClose={handleViewClose}>
        <Box sx={modalStyle}>
          {selectedMerch && (
            <>
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                {selectedMerch.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedMerch.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Category: {selectedMerch.category}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Size: {selectedMerch.size}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Color: {selectedMerch.color}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Price: ${selectedMerch.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Stock: {selectedMerch.stock}
              </Typography>
              <img
                src={selectedMerch.image_url}
                alt={selectedMerch.name}
                style={{ width: "100%", marginTop: 10 }}
              />
            </>
          )}
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={handleEditClose}>
        <Box sx={modalStyle} component="form" onSubmit={handleEditSubmit}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Edit Merchandise
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={merchData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={merchData.description}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                name="category"
                value={merchData.category}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Size"
                name="size"
                value={merchData.size}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Color"
                name="color"
                value={merchData.color}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={merchData.price}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Stock"
                name="stock"
                type="number"
                value={merchData.stock}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
            <Button
                variant="contained"
                component="label"
                sx={{ marginTop: 2, marginRight: 2 }}
              >
                Upload Images
                <input type="file" hidden />
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ backgroundColor: "#ED1F24", color: "white", marginTop: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Merchandise;
