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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import {
  LocationOn,
  Event,
  AttachMoney,
  ConfirmationNumber,
  Edit,
  Delete,
  Pause,
  PlayArrow,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Events.css"; // Import the CSS file

const Events = () => {
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    location: "",
    start_date: "",
    end_date: "",
    ticket_price: "",
    total_tickets: "",
    cover_image: "",
  });
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [editMode, setEditMode] = useState(false);
  const [events, setEvents] = useState([
    {
      name: "Music Concert",
      location: "New York",
      start_date: "2024-08-01",
      end_date: "2024-08-02",
      ticket_price: "50",
      total_tickets: "200",
      cover_image: "/images/concert.jpg",
      paused: false,
    },
    {
      name: "Art Exhibition",
      location: "Los Angeles",
      start_date: "2024-09-15",
      end_date: "2024-09-20",
      ticket_price: "30",
      total_tickets: "100",
      cover_image: "/images/museum.jpg",
      paused: false,
    },
    {
      name: "Tech Conference",
      location: "San Francisco",
      start_date: "2024-10-05",
      end_date: "2024-10-07",
      ticket_price: "100",
      total_tickets: "500",
      cover_image: "/images/conference.jpg",
      paused: true,
    },
  ]);
  
  const isMobile = useMediaQuery('(max-width:590px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '80%' : isTablet ? '70%' : '30%',
    maxHeight: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
  };  
  
  const navigate = useNavigate();
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEventData({
      name: "",
      location: "",
      start_date: "",
      end_date: "",
      ticket_price: "",
      total_tickets: "",
      cover_image: "",
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData((prevData) => ({
        ...prevData,
        cover_image: URL.createObjectURL(file),
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...eventData,
      location: `Latitude: ${markerPosition[0]}, Longitude: ${markerPosition[1]}`,
    };
    if (editMode) {
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents];
        updatedEvents[currentEventIndex] = newEvent;
        return updatedEvents;
      });
    } else {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    handleClose();
  };
  
  const handleOpenPauseModal = (index) => {
    setCurrentEventIndex(index);
    setPauseModalOpen(true);
  };
  
  const handleClosePauseModal = () => {
    setPauseModalOpen(false);
    setCurrentEventIndex(null);
  };
  
  const handleTogglePauseEvent = () => {
    setEvents((prevEvents) => {
      const newEvents = [...prevEvents];
      newEvents[currentEventIndex].paused = !newEvents[currentEventIndex].paused;
      return newEvents;
    });
    handleClosePauseModal();
  };
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  
  const handleEditEvent = (index) => {
    setCurrentEventIndex(index);
    setEventData(events[index]);
    setEditMode(true);
    handleOpen();
  };
  
  const handleDeleteEvent = (index) => {
    setEvents((prevEvents) => prevEvents.filter((_, i) => i !== index));
  };
  
  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    if (filter === "paused") return event.paused;
    if (filter === "active") return !event.paused;
    return true;
  });
  
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    
    return markerPosition === null ? null : (
      <Marker
      position={markerPosition}
      icon={
        new L.Icon({
          iconUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        })
      }
      ></Marker>
    );
  };
  
  return (
    <div style={{ fontFamily: "TimesNewRoman", padding: "10px" }}>
    <Button
    variant="contained"
    color="error"
    sx={{ backgroundColor: "#ED1F24", color: "white" }}
    onClick={() => navigate("/home")}
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
    style={{ height: "100px", width: "200px" }}
    />
    </div>
    <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
    }}
    >
    <p style={{ fontSize: "30px", fontWeight: "bold" }}>Your Events</p>
    <Button
    variant="contained"
    color="error"
    onClick={handleOpen}
    sx={{
      backgroundColor: "#ED1F24",
      color: "white",
    }}
    >
    Add Event
    </Button>
    </div>
    <Modal open={open} onClose={handleClose}>
    <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
    <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
    {editMode ? "Edit Event" : "Add New Event"}
    </Typography>
    <Grid container spacing={2}>
    <Grid item xs={12}>
    <TextField
    label="Name"
    name="name"
    value={eventData.name}
    onChange={handleChange}
    fullWidth
    required
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
    label="Location"
    name="location"
    value={eventData.location}
    onChange={handleChange}
    fullWidth
    required
    InputProps={{ readOnly: true }}
    />
    </Grid>
    <Grid item xs={12}>
    <MapContainer
    center={markerPosition}
    zoom={13}
    style={{ height: "200px", width: "100%" }}
    >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <LocationMarker />
    </MapContainer>
    </Grid>
    <Grid item xs={12}>
    <TextField
    label="Start Date"
    name="start_date"
    type="date"
    value={eventData.start_date}
    onChange={handleChange}
    fullWidth
    required
    InputLabelProps={{ shrink: true }}
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
    label="End Date"
    name="end_date"
    type="date"
    value={eventData.end_date}
    onChange={handleChange}
    fullWidth
    required
    InputLabelProps={{ shrink: true }}
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
    label="Ticket Price"
    name="ticket_price"
    type="number"
    value={eventData.ticket_price}
    onChange={handleChange}
    fullWidth
    required
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
    label="Total Tickets"
    name="total_tickets"
    type="number"
    value={eventData.total_tickets}
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
    
    <Dialog open={pauseModalOpen} onClose={handleClosePauseModal}>
    <DialogTitle>
    {events[currentEventIndex]?.paused ? "Resume Event" : "Pause Event"}
    </DialogTitle>
    <DialogContent>
    <DialogContentText>
    {events[currentEventIndex]?.paused
      ? "Are you sure you want to resume this event?"
      : "Are you sure you want to pause this event?"}
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClosePauseModal} color="primary">
      Cancel
      </Button>
      <Button onClick={handleTogglePauseEvent} color="primary" autoFocus>
      Confirm
      </Button>
      </DialogActions>
      </Dialog>
      
      <Grid container spacing={3} sx={{ paddingX: isMobile ? 2 : isTablet ? 5 : 10 }}>
      {filteredEvents.map((event, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
        <Card className="event-card">
        <CardMedia
        component="img"
        height="140"
        image={event.cover_image}
        alt={event.name}
        />
        <CardContent>
        <Typography
        gutterBottom
        variant="h5"
        component="div"
        style={{ fontFamily: "TimesNewRoman" }}
        >
        {event.name}
        </Typography>
        <Typography
        variant="h6"
        color="textSecondary"
        style={{ fontFamily: "TimesNewRoman" }}
        >
        <LocationOn sx={{ verticalAlign: "middle", mr: 1 }} />
        {event.location}
        </Typography>
        <Typography
        variant="h6"
        color="textSecondary"
        style={{ fontFamily: "TimesNewRoman" }}
        >
        <Event sx={{ verticalAlign: "middle", mr: 1 }} />
        {`${event.start_date} - ${event.end_date}`}
        </Typography>
        <Typography
        variant="h6"
        color="textSecondary"
        style={{ fontFamily: "TimesNewRoman" }}
        >
        <AttachMoney sx={{ verticalAlign: "middle", mr: 1 }} />
        {event.ticket_price} dollars
        </Typography>
        <Typography
        variant="h6"
        color="textSecondary"
        style={{ fontFamily: "TimesNewRoman" }}
        >
        <ConfirmationNumber sx={{ verticalAlign: "middle", mr: 1 }} />
        {event.total_tickets} tickets
        </Typography>
        </CardContent>
        <CardActions>
        <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          justifyContent: "flex-end",
          width: "100%",
        }}
        >
        <Tooltip title="Edit Event" arrow>
        <IconButton
        color="primary"
        onClick={() => handleEditEvent(index)}
        >
        <Edit />
        </IconButton>
        </Tooltip>
        <Tooltip title="Delete Event" arrow>
        <IconButton
        color="secondary"
        onClick={() => handleDeleteEvent(index)}
        >
        <Delete />
        </IconButton>
        </Tooltip>
        {/* <Tooltip title={event.paused ? "Resume Event" : "Pause Event"} arrow>
          <IconButton
          color={event.paused ? "primary" : "default"}
          onClick={() => handleOpenPauseModal(index)}
          >
          {event.paused ? <PlayArrow /> : <Pause />}
          </IconButton>
          </Tooltip> */}
          </div>
          </CardActions>
          </Card>
          </Grid>
        ))}
        </Grid>
        </div>
      );
    };
    
    export default Events;
    