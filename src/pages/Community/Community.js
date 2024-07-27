// src/pages/Community.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const dummyEvents = [
  {
    name: "Music Concert",
    cover_image: "/images/concert.jpg",
  },
  {
    name: "Art Exhibition",
    cover_image: "/images/museum.jpg",
  },
  {
    name: "Tech Conference",
    cover_image: "/images/conference.jpg",
  },
];

const Community = () => {
  const [isCommunityAllowed, setIsCommunityAllowed] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
    { text: "Welcome to the community!", timestamp: new Date() },
    { text: "First post!", timestamp: new Date() },
    { text: "Excited for the upcoming event!", timestamp: new Date() },
  ]);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSwitchChange = () => {
    setIsCommunityAllowed(!isCommunityAllowed);
  };

  const handleNewPostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = () => {
    if (newPost.trim() !== "") {
      setPosts([{ text: newPost.trim(), timestamp: new Date() }, ...posts]);
      setNewPost("");
    }
  };

  const handleDeletePost = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      setPosts(posts.filter((_, i) => i !== index));
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    const sortedPosts = [...posts].sort((a, b) => {
      if (e.target.value === "newest") {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }
    });
    setPosts(sortedPosts);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "TimesNewRoman",
      }}
    >
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
        component="h1"
        align="center"
        color="#ED1F24"
        gutterBottom
      >
        Community
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={isCommunityAllowed}
            onChange={handleSwitchChange}
            color="primary"
          />
        }
        label="Allow Community Tab for Mobile App"
        sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}
      />
      {isCommunityAllowed && (
        <>
          <Box sx={{ marginBottom: 5, textAlign: "center" }}>
            <Typography variant="h5" component="h2" color="black">
              Add New Post
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <TextField
                label="New Post"
                value={newPost}
                onChange={handleNewPostChange}
                fullWidth
              />
              <Button
                variant="contained"
                color="error"
                onClick={handleAddPost}
                sx={{ backgroundColor: "#ED1F24", color: "white" }}
              >
                Add Post
              </Button>
            </div>
          </Box>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <FormControl sx={{ marginBottom: 4 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOrder} onChange={handleSortChange}>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
              </Select>
            </FormControl>
          </div>
          <p style={{ fontSize: '30px' }} >Posts</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {posts.map((post, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ fontFamily: "TimesNewRoman" }}
                    >
                      {post.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      style={{ fontFamily: "TimesNewRoman" }}
                    >
                      {new Date(post.timestamp).toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color="primary"
                      onClick={() => handleDeletePost(index)}
                      sx={{ color: "#ED1F24" }}
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Community;
