import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  useMediaQuery
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMerch, setSelectedMerch] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [customSize, setCustomSize] = useState(false);
  const [customStock, setCustomStock] = useState(false);
  const [customColor, setCustomColor] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const [merchData, setMerchData] = useState({
    name: "",
    description: "",
    category: categoryName,
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
    maxHeight: isMobile ? '90%' : '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  };

  const [dummyMerchandise, setDummyMerchandise] = useState({
    Shirt: [
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
        name: "T-Shirt",
        description: "Comfortable cotton t-shirt",
        category: "Clothing",
        size: "L",
        color: "Red",
        price: "20",
        image_url: "/images/t-shirt.jpg",
        stock: "30",
      },
    ],
    Mug: [
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
    ],
    LaptopSleeve: [
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
    ],
  });

  const handleOpen = () => {
    setIsEditing(false);
    setMerchData({
      name: "",
      description: "",
      category: categoryName,
      size: "",
      customSizeValue: "",
      color: "",
      price: "",
      image_url: "",
      stock: "",
      customStockValue: "",
    });
    setCustomSize(false);
    setCustomStock(false);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMerchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCustomChange = (name, value) => {
    setMerchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    if (isEditing) {
      setDummyMerchandise((prevData) => {
        const updatedCategory = prevData[formattedCategoryName].map((item) =>
          item === selectedMerch ? merchData : item
        );
        return { ...prevData, [formattedCategoryName]: updatedCategory };
      });
    } else {
      setDummyMerchandise((prevData) => ({
        ...prevData,
        [formattedCategoryName]: [...prevData[formattedCategoryName], merchData],
      }));
    }
    handleClose();
  };

  const handleEditOpen = (merch) => {
    setSelectedMerch(merch);
    setCustomSize(merch.size === "");
    setCustomStock(merch.stock === "");
    setMerchData(merch);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (merch) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this merchandise?"
    );
    if (confirmDelete) {
      const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      setDummyMerchandise((prevData) => {
        const updatedCategory = prevData[formattedCategoryName].filter(
          (item) => item !== merch
        );
        return { ...prevData, [formattedCategoryName]: updatedCategory };
      });
    }
  };

  const handleImageChange = (event) => {
    setPostImage(event.target.files[0]);
  };

  const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div style={{ padding: "10px", fontFamily: "TimesNewRoman" }}>
      <Button
        variant="contained"
        color="error"
        sx={{ backgroundColor: "#ED1F24", color: "white" }}
        onClick={() => navigate("/merchandise")}
      >
        Go Back
      </Button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/images/Logo.jpeg"
          alt="Logo"
          style={{ height: "100px", objectFit: 'cover', backgroundPosition: 'start' }}
        />
      </div>
      <Typography
        variant="h4"
        component="h1"
        sx={{ marginBottom: 2, textAlign: "center", fontWeight: "bold" }}
      >
        {formattedCategoryName}
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
        sx={{ backgroundColor: "#ED1F24", color: "white", marginBottom: 2 }}
      >
        Add Merchandise
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyMerchandise[formattedCategoryName]?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.size || item.customSizeValue}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.stock || item.customStockValue}</TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            {isEditing ? "Edit Merchandise" : "Add New Merchandise"}
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
    </div>
  );
};

export default Category;
