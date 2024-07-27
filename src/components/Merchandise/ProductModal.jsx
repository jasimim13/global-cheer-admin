import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const ProductModal = ({ open, handleClose, handleSave, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    size: '',
    color: '',
    price: '',
    image_url: '',
    stock: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          width: 400,
          margin: 'auto',
          mt: 10,
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" component="h2">
          {product ? 'Edit Product' : 'Add Product'}
        </Typography>
        <TextField
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Size"
          name="size"
          value={formData.size}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Image URL"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default ProductModal;
