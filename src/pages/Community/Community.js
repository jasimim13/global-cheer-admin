import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Modal,
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
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #ED1F24",
  boxShadow: 24,
  p: 4,
};

const Community = () => {
  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([
    {
      title: "Welcome to the community!",
      image: "/images/post.jpg",
      timestamp: new Date(),
      isCommunityAllowed: false,
    },
  ]);
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handlePostChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setPostDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setPostImage(event.target.files[0]);
  };

  const handleAddPost = () => {
    if (postTitle.trim() !== "") {
      const newPost = {
        title: postTitle.trim(),
        image: URL.createObjectURL(postImage),
        timestamp: new Date(),
        isCommunityAllowed: false,
      };
      setPosts([newPost, ...posts]);
      handleModalClose();
      setPostTitle("");
      setPostImage(null);
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

  const handleSwitchChange = (index) => {
    setPosts(posts.map((post, i) =>
      i === index ? { ...post, isCommunityAllowed: !post.isCommunityAllowed } : post
    ));
  };

  return (
    <div
      style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}
    >
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
          style={{ height: "100px", width: "200px" }}
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleModalOpen}
          sx={{
            backgroundColor: "#ED1F24",
            color: "white",
          }}
        >
          Add New Post
        </Button>
        <div>
        <InputLabel>Sort By</InputLabel>
        <FormControl sx={{ minWidth: 120 }}>
          <Select value={sortOrder} onChange={handleSortChange}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
        </div>
      </div>
      <Grid container spacing={2}>
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "auto", marginTop: 10 }}
                />
                <Typography variant="caption" display="block">
                  {new Date(post.timestamp).toLocaleString()}
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={post.isCommunityAllowed}
                      onChange={() => handleSwitchChange(index)}
                      color="primary"
                    />
                  }
                  label="Allow Community Tab for Mobile App"
                  sx={{ marginTop: 2 }}
                />
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => handleDeletePost(index)}
                  sx={{ color: "#ED1F24" }}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleModalClose}>
        <Box sx={modalStyle} component="form">
          <Typography variant="h6" component="h2">
            Add New Post
          </Typography>
          <TextField
            label="Post Title"
            fullWidth
            margin="normal"
            value={postTitle}
            onChange={handlePostChange}
          />
          <TextField
            label="Post Description"
            fullWidth
            margin="normal"
            value={postDescription}
            onChange={handleDescriptionChange}
            multiline
          />
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2, marginRight: 2 }}
          >
            Upload Images
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            onClick={handleAddPost}
            sx={{
              backgroundColor: "#ED1F24",
              color: "white",
              marginTop: 2,
            }}
          >
            Submit Post
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Community;
