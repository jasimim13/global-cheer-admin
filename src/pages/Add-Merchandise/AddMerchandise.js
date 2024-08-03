import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddMerchandise = () => {
  const navigate = useNavigate();
  const [postImage, setPostImage] = useState(null);
  const [customSize, setCustomSize] = useState(false);
  const [customStock, setCustomStock] = useState(false);
  const [customColor, setCustomColor] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const [merchData, setMerchData] = useState({
    name: "",
    description: "",
    category: "",
    size: "",
    customSizeValue: "",
    color: "",
    customColorValue: "",
    price: "",
    image_url: "",
    stock: "",
    customStockValue: "",
  });

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '80%' : isTablet ? '70%' : '50%',
    maxHeight: isMobile ? '70%' : '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  };

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
    navigate("/merchandise");
  };

  const handleImageChange = (event) => {
    setPostImage(event.target.files[0]);
  };

  const handleSizeChange = (event) => {
    if (event.target.value === "custom") {
      setCustomSize(true);
      setMerchData((prevData) => ({
        ...prevData,
        size: "",
        customSizeValue: "",
      }));
    } else {
      setCustomSize(false);
      setMerchData((prevData) => ({
        ...prevData,
        size: event.target.value,
      }));
    }
  };

  const handleStockChange = (event) => {
    if (event.target.value === "custom") {
      setCustomStock(true);
      setMerchData((prevData) => ({
        ...prevData,
        stock: "",
        customStockValue: "",
      }));
    } else {
      setCustomStock(false);
      setMerchData((prevData) => ({
        ...prevData,
        stock: event.target.value,
      }));
    }
  };

  const handleColorChange = (event) => {
    if (event.target.value === "custom") {
      setCustomColor(true);
      setMerchData((prevData) => ({
        ...prevData,
        color: "",
        customColorValue: "",
      }));
    } else {
      setCustomColor(false);
      setMerchData((prevData) => ({
        ...prevData,
        color: event.target.value,
      }));
    }
  };

  return (
    <Modal open={true} onClose={() => navigate("/merchandise")}>
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
            <Typography>Size</Typography>
            <Select
              label="Size"
              name="size"
              value={customSize ? "custom" : merchData.size}
              onChange={handleSizeChange}
              fullWidth
              required
            >
              <MenuItem value="S">Small</MenuItem>
              <MenuItem value="M">Medium</MenuItem>
              <MenuItem value="L">Large</MenuItem>
              <MenuItem value="One Size">One Size</MenuItem>
              <MenuItem value="15 inch">15 inch</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
            {customSize && (
              <TextField
                label="Custom Size"
                name="customSizeValue"
                value={merchData.customSizeValue}
                onChange={handleChange}
                fullWidth
                required
                sx={{ marginTop: 2 }}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography>Color</Typography>
            <Select
              label="Color"
              name="color"
              value={merchData.color}
              onChange={handleColorChange}
              fullWidth
              required
            >
              <MenuItem value="Black">Black</MenuItem>
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="Orange">Orange</MenuItem>
              <MenuItem value="Yellow">Yellow</MenuItem>
              <MenuItem value="Green">Green</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
            {customColor && (
              <TextField
                label="Custom Color"
                name="customColorValue"
                value={merchData.customColorValue}
                onChange={handleChange}
                fullWidth
                required
                sx={{ marginTop: 2 }}
              />
            )}
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
            <Typography>Stock</Typography>
            <Select
              label="Stock"
              name="stock"
              value={customStock ? "custom" : merchData.stock}
              onChange={handleStockChange}
              fullWidth
              required
            >
              <MenuItem value="50">50</MenuItem>
              <MenuItem value="100">100</MenuItem>
              <MenuItem value="150">150</MenuItem>
              <MenuItem value="200">200</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
            {customStock && (
              <TextField
                label="Custom Stock"
                name="customStockValue"
                type="number"
                value={merchData.customStockValue}
                onChange={handleChange}
                fullWidth
                required
                sx={{ marginTop: 2 }}
              />
            )}
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
  );
};

export default AddMerchandise;
