// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Users from "./pages/Users/Users";
import Events from "./pages/Events/Events";
import Merchandise from "./pages/Merchandise/Merchandise";
import Community from "./pages/Community/Community";
import Sales from "./pages/Sales/Sales";
import QRCode from "./pages/QRCode/QRCode";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Orders from "./pages/Orders/Orders";
import UserManagement from "./pages/UserManagement/UserManagement";
import Stock from "./pages/Stock/Stock";
import Category from "./pages/Category/Category";
import AddMerchandise from './pages/Add-Merchandise/AddMerchandise'

function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/events" element={<Events />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/community" element={<Community />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/qrcode" element={<QRCode />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/add-merchandise" element={<AddMerchandise />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
