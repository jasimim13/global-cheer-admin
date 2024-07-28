import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Tabs,
  Tab,
  Modal,
  Box,
  TextField
} from "@mui/material";
import { Edit, Delete, Download, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const users = [
    {
      username: "john_doe",
      role: "User",
      email: "john@example.com",
      password: "********",
      profile_image: "https://via.placeholder.com/50",
      created_at: "2023-01-01",
      updated_at: "2023-01-10",
    },
    {
      username: "jane_smith",
      role: "User",
      email: "jane@example.com",
      password: "********",
      profile_image: "https://via.placeholder.com/50",
      created_at: "2023-02-01",
      updated_at: "2023-02-10",
    },
  ];

  const adminUsers = [
    {
      username: "alice_jones",
      role: "Admin",
      email: "alice@example.com",
      password: "********",
      profile_image: "https://via.placeholder.com/50",
      created_at: "2023-03-01",
      updated_at: "2023-03-10",
    },
    {
      username: "bob_brown",
      role: "Admin",
      email: "bob@example.com",
      password: "********",
      profile_image: "https://via.placeholder.com/50",
      created_at: "2023-04-01",
      updated_at: "2023-04-10",
    },
  ];

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #ED1F24',
    boxShadow: 24,
    p: 4,
  };

  const renderTable = (usersToDisplay, isAdminSection = false) => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, fontFamily: 'TimesNewRoman' }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#ED1F24" }}>
          <TableRow>
            <TableCell><Typography sx={{ color: "white", fontWeight: 'bold' }}>Username</Typography></TableCell>
            <TableCell><Typography sx={{ color: "white", fontWeight: 'bold' }}>Role</Typography></TableCell>
            <TableCell><Typography sx={{ color: "white", fontWeight: 'bold' }}>Email</Typography></TableCell>
            <TableCell><Typography sx={{ color: "white", fontWeight: 'bold' }}>Password</Typography></TableCell>
            <TableCell><Typography sx={{ color: "white", fontWeight: 'bold' }}>Profile Image</Typography></TableCell>
            <TableCell><Typography sx={{ color: "white", fontWeight: 'bold' }}>Created At</Typography></TableCell>
            <TableCell><Typography sx={{ color: "white", fontWeight: 'bold' }}>Updated At</Typography></TableCell>
            <TableCell><Typography sx={{ color: "white", fontWeight: 'bold' }}>Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersToDisplay.map((user, index) => (
            <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>
                <Avatar src={user.profile_image} alt={user.username} />
              </TableCell>
              <TableCell>{user.created_at}</TableCell>
              <TableCell>{user.updated_at}</TableCell>
              <TableCell>
                <Tooltip title="Edit"><IconButton><Edit sx={{ color: "#ED1F24" }} /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton><Delete sx={{ color: "#ED1F24" }} /></IconButton></Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div style={{ padding: 10, fontFamily: 'TimesNewRoman' }}>
      <Button variant="contained" color="error" sx={{ backgroundColor: "#ED1F24", color: "white" }} onClick={() => navigate('/')}>Go Back</Button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <img src="/images/Logo.jpeg" alt="Logo" style={{ height: "100px", width: "200px" }}/>
      </div>
      <div style={{ display: 'flex',  alignItems: 'center', justifyContent: 'space-between'}} >
        <Typography variant="h3" sx={{textAlign: 'left', fontWeight: 'bold' }} >Users</Typography>
        <Button variant="contained" color="error" sx={{ backgroundColor: "#ED1F24", color: "white" }}><Download/></Button>
      </div>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Users" />
        <Tab label="Admin" />
      </Tabs>
      {selectedTab === 1 && (
        <Button
          variant="contained"
          color="error"
          startIcon={<Add />}
          sx={{ my: 2, bgcolor: "#ED1F24" }}
          onClick={handleOpenModal}
        >
          Add Admin
        </Button>
      )}
      {selectedTab === 0 ? renderTable(users) : renderTable(adminUsers, true)}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Admin
          </Typography>
          <Box
            component="form"
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#ED1F24' }}
            >
              Add Admin
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Users;
