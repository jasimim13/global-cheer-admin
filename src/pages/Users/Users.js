// src/pages/Users.js
import React from "react";
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
} from "@mui/material";
import { Edit, Delete, Download } from "@mui/icons-material";

const Users = () => {
  const users = [
    {
      username: "john_doe",
      role: "Admin",
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
    // Add more user data as needed
  ];

  return (
    <div style={{ padding: 10, fontFamily: 'TimesNewRoman' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
      <img
        src="/images/Logo.jpeg"
        alt="Logo"
        style={{ height: "100px", width: "200px" }}
      />
      </div>
      <p style={{textAlign: 'left', fontSize: '30px', fontWeight: 'bold' }} > Users </p>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650,  fontFamily: 'TimesNewRoman'}} aria-label="users table">
          <TableHead sx={{ backgroundColor: "#ED1F24" }}>
            <TableRow>
              <TableCell>
                <Typography sx={{ color: "white",  fontFamily: 'TimesNewRoman', fontWeight: 'bold'  }}>Username</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: "white",  fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}>Role</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: "white",  fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}>Email</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: "white",  fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}>Password</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: "white",  fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}>Profile Image</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: "white",  fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}>Created At</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: "white",  fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}>Updated At</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: "white",  fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={index}
                sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
              >
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
                  <Tooltip title="Download Emails">
                    <IconButton>
                      <Download sx={{ color: "#ED1F24" }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
