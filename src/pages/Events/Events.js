// src/pages/Events.js
import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
} from '@mui/material';
import { LocationOn, Event, AttachMoney, ConfirmationNumber } from '@mui/icons-material';

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

const Events = () => {
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState({
    name: '',
    location: '',
    start_date: '',
    end_date: '',
    ticket_price: '',
    total_tickets: '',
    cover_image: '',
  });

  const dummyEvents = [
    {
      name: 'Music Concert',
      location: 'New York',
      start_date: '2024-08-01',
      end_date: '2024-08-02',
      ticket_price: '50',
      total_tickets: '200',
      cover_image: '/images/concert.jpg',
    },
    {
      name: 'Art Exhibition',
      location: 'Los Angeles',
      start_date: '2024-09-15',
      end_date: '2024-09-20',
      ticket_price: '30',
      total_tickets: '100',
      cover_image: '/images/museum.jpg',
    },
    {
      name: 'Tech Conference',
      location: 'San Francisco',
      start_date: '2024-10-05',
      end_date: '2024-10-07',
      ticket_price: '100',
      total_tickets: '500',
      cover_image: '/images/conference.jpg',
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventData);
    handleClose();
  };

  return (
    <div style={{fontFamily: 'TimesNewRoman'}} >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }} >
      <img
        src="/images/Logo.jpeg"
        alt="Logo"
        style={{ height: "100px", width: "200px" }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: '100px' }} > 
      <Button variant="contained" color="error" onClick={handleOpen} sx={{ backgroundColor: '#ED1F24', color: 'white', alignSelf: 'flex-end' }}>
        Add Event
      </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Add New Event
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
              />
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
              <TextField
                label="Cover Image URL"
                name="cover_image"
                value={eventData.cover_image}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="error" sx={{ backgroundColor: '#ED1F24', color: 'white', marginTop: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>
      <p style={{ fontSize: '30px', marginLeft: '10px', fontWeight: 'bold' }} >Your Events</p>
      <Grid container spacing={3} sx={{  paddingX: 10 }}>
        
        {dummyEvents.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}  >
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={event.cover_image}
                alt={event.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{fontFamily: 'TimesNewRoman'}} >
                  {event.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{fontFamily: 'TimesNewRoman'}} >
                  <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {event.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{fontFamily: 'TimesNewRoman'}} >
                  <Event sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {`${event.start_date} - ${event.end_date}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{fontFamily: 'TimesNewRoman'}} >
                  <AttachMoney sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {event.ticket_price}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{fontFamily: 'TimesNewRoman'}} >
                  <ConfirmationNumber sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {event.total_tickets} tickets
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" sx={{ color: '#ED1F24', fontFamily: 'TimesNewRoman' }}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Events;
