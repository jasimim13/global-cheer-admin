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
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  useMediaQuery,
  Grid,
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
      role: "SubAdmin",
      email: "alice@example.com",
      password: "********",
      profile_image: "https://via.placeholder.com/50",
      created_at: "2023-03-01",
      updated_at: "2023-03-10",
    },
    {
      username: "bob_brown",
      role: "Manager",
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
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? '90%' : isTablet ? '60%' : 400,
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: "background.paper",
    border: "2px solid #ED1F24",
    boxShadow: 24,
    p: 4,
  };

  const renderTable = (usersToDisplay) => (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, fontFamily: "TimesNewRoman" }}
        aria-label="simple table"
      >
        <TableHead sx={{ backgroundColor: "#ED1F24" }}>
          <TableRow>
            <TableCell>
              <Typography sx={{ color: "white", fontWeight: "bold" }}>
                Username
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ color: "white", fontWeight: "bold" }}>
                Role
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ color: "white", fontWeight: "bold" }}>
                Email
              </Typography>
            </TableCell>
            {!isMobile && (
              <>
                <TableCell>
                  <Typography sx={{ color: "white", fontWeight: "bold" }}>
                    Profile Image
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "white", fontWeight: "bold" }}>
                    Created At
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "white", fontWeight: "bold" }}>
                    Updated At
                  </Typography>
                </TableCell>
              </>
            )}
            <TableCell>
              <Typography sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersToDisplay.map((user, index) => (
            <TableRow
              key={index}
              sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
            >
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              {!isMobile && (
                <>
                  <TableCell>
                    <Avatar src={user.profile_image} alt={user.username} />
                  </TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell>{user.updated_at}</TableCell>
                </>
              )}
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton>
                    <Edit sx={{ color: "#ED1F24" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton>
                    <Delete sx={{ color: "#ED1F24" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div style={{ padding: 10, fontFamily: "TimesNewRoman" }}>
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
          style={{ height: isMobile ? '60px' : '100px', width: isMobile ? '120px' : '200px' }}
        />
      </div>
      {selectedTab === 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h3"}
            sx={{ textAlign: isMobile ? 'center' : 'left', fontWeight: "bold" }}
          >
            Admin
          </Typography>
          <Button
            variant="contained"
            color="error"
            startIcon={<Add />}
            sx={{ my: 2, bgcolor: "#ED1F24" }}
            onClick={handleOpenModal}
          >
            Add Admin
          </Button>
        </div>
      )}
      {selectedTab === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h3"}
            sx={{ textAlign: isMobile ? 'center' : 'left', fontWeight: "bold" }}
          >
            Users
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ backgroundColor: "#ED1F24", color: "white", my: isMobile ? 2 : 0 }}
          >
            <Download />
          </Button>
        </div>
      )}
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Users" />
        <Tab label="Admin" />
      </Tabs>
      {selectedTab === 0 ? renderTable(users) : renderTable(adminUsers)}
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
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField margin="normal" required fullWidth label="Email" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select labelId="role-label" label="Role" required>
                    <MenuItem value="admin">SubAdmin</MenuItem>
                    <MenuItem value="editor">Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#ED1F24" }}
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
