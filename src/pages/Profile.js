import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  PhotoCamera,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Favorite,
  Message,
  Star,
  LocationOn,
  Phone,
  Email,
  CalendarToday,
} from '@mui/icons-material';

// Custom TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  // Mock user data - in a real app, this would come from your API/context
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    location: 'Mumbai, Maharashtra',
    bio: 'I love buying and selling items on OLX. Always looking for great deals!',
    joinDate: 'January 2022',
    avatar: null, // URL would go here
  });

  // Mock listings data
  const [myListings] = useState([
    {
      id: 1,
      title: 'iPhone 12 Pro Max',
      price: 65000,
      image: 'https://via.placeholder.com/150',
      date: '2023-05-15',
      status: 'active',
    },
    {
      id: 2,
      title: 'Sony PlayStation 5',
      price: 45000,
      image: 'https://via.placeholder.com/150',
      date: '2023-04-20',
      status: 'active',
    },
    {
      id: 3,
      title: 'MacBook Pro 2021',
      price: 120000,
      image: 'https://via.placeholder.com/150',
      date: '2023-03-10',
      status: 'sold',
    },
  ]);

  // Mock favorites data
  const [favorites] = useState([
    {
      id: 101,
      title: 'Honda Civic 2020',
      price: 1200000,
      image: 'https://via.placeholder.com/150',
      date: '2023-05-01',
    },
    {
      id: 102,
      title: 'Samsung 55" QLED TV',
      price: 78000,
      image: 'https://via.placeholder.com/150',
      date: '2023-04-28',
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveProfile = () => {
    // Here you would typically call your API to update the user profile
    setEditMode(false);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData({
          ...userData,
          avatar: event.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeleteListing = (id) => {
    // Here you would typically call your API to delete the listing
    setSnackbar({
      open: true,
      message: 'Listing deleted successfully!',
      severity: 'success',
    });
  };

  const handleRemoveFavorite = (id) => {
    // Here you would typically call your API to remove the favorite
    setSnackbar({
      open: true,
      message: 'Removed from favorites!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ position: 'relative', textAlign: 'center', mb: 3 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  editMode ? (
                    <label htmlFor="avatar-upload">
                      <input
                        accept="image/*"
                        id="avatar-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                      />
                      <IconButton
                        component="span"
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': { bgcolor: 'primary.dark' },
                        }}
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  ) : null
                }
              >
                <Avatar
                  src={userData.avatar}
                  alt={userData.name}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
              </Badge>
              
              {!editMode ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    {userData.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                      {userData.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <CalendarToday fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                      Member since {userData.joinDate}
                    </Typography>
                  </Box>
                </>
              ) : (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Full Name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              {!editMode ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {userData.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {userData.phone}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <Email color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <Phone color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Location"
                    name="location"
                    value={userData.location}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <LocationOn color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                  />
                </>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="h6" gutterBottom>
                About Me
              </Typography>
              {!editMode ? (
                <Typography variant="body2">{userData.bio}</Typography>
              ) : (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  label="Bio"
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              )}
            </Box>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              {!editMode ? (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEditToggle}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Tabs for My Listings, Favorites, etc. */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 0 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="profile tabs"
                variant="fullWidth"
              >
                <Tab label="My Listings" icon={<Star />} iconPosition="start" />
                <Tab label="Favorites" icon={<Favorite />} iconPosition="start" />
                <Tab label="Messages" icon={<Message />} iconPosition="start" />
              </Tabs>
            </Box>

            {/* My Listings Tab */}
            <TabPanel value={tabValue} index={0}>
              {myListings.length > 0 ? (
                <List>
                  {myListings.map((listing) => (
                    <React.Fragment key={listing.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={listing.image}
                            alt={listing.title}
                            sx={{ width: 80, height: 80, mr: 2 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" component="div">
                              {listing.title}
                              {listing.status === 'sold' && (
                                <Typography
                                  component="span"
                                  variant="body2"
                                  sx={{
                                    ml: 1,
                                    color: 'white',
                                    bgcolor: 'success.main',
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                  }}
                                >
                                  SOLD
                                </Typography>
                              )}
                            </Typography>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body1"
                                color="primary"
                                sx={{ display: 'block', fontWeight: 'bold', mt: 0.5 }}
                              >
                                ₹{listing.price.toLocaleString()}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                              >
                                Posted on: {new Date(listing.date).toLocaleDateString()}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              color="primary"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDeleteListing(listing.id)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    You haven't posted any listings yet.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    href="/upload"
                  >
                    Post Your First Ad
                  </Button>
                </Box>
              )}
            </TabPanel>

            {/* Favorites Tab */}
            <TabPanel value={tabValue} index={1}>
              {favorites.length > 0 ? (
                <List>
                  {favorites.map((favorite) => (
                    <React.Fragment key={favorite.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={favorite.image}
                            alt={favorite.title}
                            sx={{ width: 80, height: 80, mr: 2 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1">
                              {favorite.title}
                            </Typography>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body1"
                                color="primary"
                                sx={{ display: 'block', fontWeight: 'bold', mt: 0.5 }}
                              >
                                ₹{favorite.price.toLocaleString()}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                              >
                                Saved on: {new Date(favorite.date).toLocaleDateString()}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              color="primary"
                              href={`/product/${favorite.id}`}
                            >
                              View
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleRemoveFavorite(favorite.id)}
                            >
                              Remove
                            </Button>
                          </Box>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    You haven't saved any favorites yet.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    href="/"
                  >
                    Browse Products
                  </Button>
                </Box>
              )}
            </TabPanel>

            {/* Messages Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Your message center is coming soon!
                </Typography>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;