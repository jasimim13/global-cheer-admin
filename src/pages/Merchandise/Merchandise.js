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
  IconButton,
  Tooltip,
  TextField,
  Box,
  Grid,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Visibility,
  Pause,
  PlayArrow,
  Delete,
  Edit,
} from "@mui/icons-material";

const Merchandise = () => {
  const navigate = useNavigate();
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [currentMerchIndex, setCurrentMerchIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [newCategory, setNewCategory] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const [customSize, setCustomSize] = useState(false);
  const [customStock, setCustomStock] = useState(false);
  const [customColor, setCustomColor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMerch, setSelectedMerch] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '80%' : isTablet ? '70%' : '30%',
    maxHeight: isMobile ? '80%' : '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  };

  const [merchandiseCategories, setMerchandiseCategories] = useState([
    {
      name: "Shirt",
      description: "Comfortable cotton t-shirt",
      image: "/images/t-shirt.jpg",
      stock: 8,
      paused: false,
      category: "Clothing",
      size: "M",
      color: "Red",
      price: 20,
    },
    {
      name: "Mug",
      description: "Ceramic coffee mug",
      image: "/images/Coffee-Mug.jpg",
      stock: 15,
      paused: false,
      category: "Accessories",
      size: "Standard",
      color: "White",
      price: 10,
    },
    {
      name: "Laptop Sleeve",
      description: "Protective laptop sleeve",
      image: "/images/sleeve.jpg",
      stock: 9,
      paused: false,
      category: "Accessories",
      size: "15 inch",
      color: "Black",
      price: 25,
    },
  ]);

  const [categories, setCategories] = useState([
    "Clothing",
    "Accessories",
    "Electronics",
  ]);

  const [sizes, setSizes] = useState([
    "S",
    "M",
    "L",
    "XL",
    "Standard",
    "15 inch",
    "17 inch",
  ]);

  const [colors, setColors] = useState([
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
  ]);

  const [merchData, setMerchData] = useState({
    name: "",
    description: "",
    category: "",
    newCategoryValue: "",
    size: "",
    customSizeValue: "",
    color: "",
    customColorValue: "",
    price: "",
    image_url: "",
    stock: "",
    customStockValue: "",
  });

  const handleOpenPauseModal = (index) => {
    setCurrentMerchIndex(index);
    setPauseModalOpen(true);
  };

  const handleClosePauseModal = () => {
    setPauseModalOpen(false);
    setCurrentMerchIndex(null);
  };

  const handleOpenAddEditModal = (index = null) => {
    if (index !== null) {
      setMerchData(merchandiseCategories[index]);
    } else {
      setMerchData({
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
    }
    setIsEditing(index !== null);
    setCustomSize(false);
    setCustomStock(false);
    setCustomColor(false);
    setAddEditModalOpen(true);
  };

  const handleCloseAddEditModal = () => {
    setAddEditModalOpen(false);
    setNewCategory("");
    setNewSize("");
    setNewColor("");
    setMerchData({
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
  };

  const handleTogglePauseMerch = () => {
    setMerchandiseCategories((prevMerchandise) => {
      const newMerchandise = [...prevMerchandise];
      newMerchandise[currentMerchIndex].paused =
        !newMerchandise[currentMerchIndex].paused;
      return newMerchandise;
    });
    handleClosePauseModal();
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMerchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    if (event.target.value === "new") {
      setNewCategory(true);
      setMerchData((prevData) => ({
        ...prevData,
        category: "",
        newCategoryValue: "",
      }));
    } else {
      setNewCategory(false);
      setMerchData((prevData) => ({
        ...prevData,
        category: event.target.value,
      }));
    }
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

  const handleAddEditSubmit = (e) => {
    e.preventDefault();
    let finalCategory = merchData.category;
    let finalSize = merchData.size;
    let finalColor = merchData.color;

    if (newCategory) {
      if (!categories.includes(newCategory)) {
        setCategories([...categories, newCategory]);
      }
      finalCategory = newCategory;
    }

    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize]);
      finalSize = newSize;
    }

    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      finalColor = newColor;
    }

    if (isEditing) {
      setMerchandiseCategories((prevMerchandise) => {
        const updatedMerchandise = [...prevMerchandise];
        updatedMerchandise[currentMerchIndex] = {
          ...merchData,
          category: finalCategory,
          size: finalSize,
          color: finalColor,
        };
        return updatedMerchandise;
      });
    } else {
      setMerchandiseCategories((prevMerchandise) => [
        ...prevMerchandise,
        {
          ...merchData,
          category: finalCategory,
          size: finalSize,
          color: finalColor,
        },
      ]);
    }

    handleCloseAddEditModal();
  };

  useEffect(() => {
    const lowStock = merchandiseCategories.filter(
      (category) => category.stock < 10
    );
    setLowStockItems(lowStock);
  }, [merchandiseCategories]);

  const filteredMerchandise = merchandiseCategories
    .filter((category) => {
      if (filter === "all") return true;
      if (filter === "paused") return category.paused;
      if (filter === "active") return !category.paused;
      return true;
    })
    .filter((category) => {
      if (categoryFilter === "all") return true;
      return category.category === categoryFilter;
    });

  const handleEditOpen = (index) => {
    setCurrentMerchIndex(index);
    setCustomSize(merchandiseCategories[index].size === "");
    setCustomStock(merchandiseCategories[index].stock === "");
    setCustomColor(merchandiseCategories[index].color === "");
    setMerchData(merchandiseCategories[index]);
    setIsEditing(true);
    setAddEditModalOpen(true);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this merchandise?"
    );
    if (confirmDelete) {
      setMerchandiseCategories((prevMerchandise) => {
        const updatedMerchandise = [...prevMerchandise];
        updatedMerchandise.splice(index, 1);
        return updatedMerchandise;
      });
    }
  };

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
        onClick={() => navigate("/home")}
      >
        Go Back
      </Button>
      <Dialog open={pauseModalOpen} onClose={handleClosePauseModal}>
        <DialogTitle>
          {merchandiseCategories[currentMerchIndex]?.paused
            ? "Resume Merchandise"
            : "Pause Merchandise"}
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
          flexDirection: isMobile || isTablet ? "column" : "row",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginLeft: isMobile || isTablet ? "0" : "10px", fontWeight: "bold", marginBottom: isMobile || isTablet ? "20px" : "0" }}
        >
          Your Merchandise
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleOpenAddEditModal()}
          sx={{
            backgroundColor: "#ED1F24",
            color: "white",
          }}
        >
          Add Merchandise
        </Button>
      </div>
      <div style={{ padding: "10px" }}>
        <InputLabel>Filter by Category</InputLabel>
        <FormControl fullWidth margin="normal">
          <Select value={categoryFilter} onChange={handleCategoryFilterChange}>
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2} sx={{ paddingX: isMobile ? 2 : isTablet ? 5 : 10 }}>
        {filteredMerchandise.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              key={category.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                sx={{
                  width: "100%",
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
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ fontFamily: "TimesNewRoman", textAlign: "center" }}
                  >
                    {category.category}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <Tooltip title="View Details" arrow>
                      <IconButton
                        onClick={() =>
                          navigate(`/category/${category.name.toLowerCase()}`)
                        }
                        style={{ color: "#ED1F24" }}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Merchandise" arrow>
                      <IconButton
                        onClick={() => handleEditOpen(index)}
                        style={{ color: "#ED1F24" }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Merchandise" arrow>
                      <IconButton
                        onClick={() => handleDelete(index)}
                        style={{ color: "#ED1F24" }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </div>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Modal open={addEditModalOpen} onClose={handleCloseAddEditModal}>
        <Box sx={modalStyle} component="form" onSubmit={handleAddEditSubmit}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            {isEditing ? "Edit Merchandise" : "Add New Merchandise"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                placeholder="Name *"
                name="name"
                value={merchData.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Description *"
                name="description"
                value={merchData.description}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Category</Typography>
              <Select
                placeholder="Category"
                name="category"
                value={newCategory ? "new" : merchData.category}
                onChange={handleCategoryChange}
                fullWidth
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
                <MenuItem value="new">Add New Category</MenuItem>
              </Select>
              {newCategory && (
                <TextField
                  placeholder="New Category *"
                  name="newCategoryValue"
                  value={merchData.newCategoryValue}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  sx={{ marginTop: 2 }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography>Size</Typography>
              <Select
                placeholder="Size"
                name="size"
                value={customSize ? "custom" : merchData.size}
                onChange={handleSizeChange}
                fullWidth
                required
              >
                {sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
              {customSize && (
                <TextField
                  placeholder="Custom Size *"
                  name="customSizeValue"
                  value={merchData.customSizeValue}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  sx={{ marginTop: 2 }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography>Color</Typography>
              <Select
                placeholder="Color"
                name="color"
                value={customColor ? "custom" : merchData.color}
                onChange={handleColorChange}
                fullWidth
                required
              >
                {colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
              {customColor && (
                <TextField
                  placeholder="Custom Color *"
                  name="customColorValue"
                  value={merchData.customColorValue}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  sx={{ marginTop: 2 }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Price *"
                name="price"
                type="number"
                value={merchData.price}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Stock</Typography>
              <Select
                placeholder="Stock"
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
                  placeholder="Custom Stock *"
                  name="customStockValue"
                  type="number"
                  value={merchData.customStockValue}
                  onChange={handleInputChange}
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
                <input
                  type="file"
                  hidden
                  onChange={(e) => setPostImage(e.target.files[0])}
                />
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
