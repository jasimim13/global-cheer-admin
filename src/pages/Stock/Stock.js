import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  useMediaQuery
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Stock = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMerch, setSelectedMerch] = useState(null);
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
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  const dummyStockData = [
    { name: "T-Shirt", stock: "50" },
    { name: "Coffee Mug", stock: "100" },
    { name: "Laptop Sleeve", stock: "30" },
    { name: "Hoodie", stock: "20" },
    { name: "Notebook", stock: "75" },
    { name: "Water Bottle", stock: "45" },
    { name: "Hat", stock: "60" },
    { name: "Backpack", stock: "25" },
    { name: "Poster", stock: "150" },
    { name: "Keychain", stock: "200" },
  ];

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
      <Typography
        variant="h4"
        style={{ fontSize: "30px", marginLeft: "10px", fontWeight: "bold" }}
      >
        Stock Management
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="stock table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyStockData.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.stock}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleViewOpen(item)}
                    sx={{ color: "#ED1F24" }}
                  >
                    <Visibility />
                  </IconButton>
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

      <Modal open={viewOpen} onClose={handleViewClose}>
        <Box sx={modalStyle}>
          {selectedMerch && (
            <>
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                {selectedMerch.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Stock: {selectedMerch.stock}
              </Typography>
            </>
          )}
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={handleEditClose}>
        <Box sx={modalStyle} component="form">
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Edit Stock
          </Typography>
          <TextField
            label="Stock"
            name="stock"
            value={merchData.stock}
            onChange={(e) => setMerchData({ ...merchData, stock: e.target.value })}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ backgroundColor: "#ED1F24", color: "white", marginTop: 2 }}
            onClick={() => {
              console.log(merchData);
              handleEditClose();
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Stock;
