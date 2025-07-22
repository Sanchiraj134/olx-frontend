import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { favoritesAPI, productAPI } from '../services/api';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  IconButton,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Delete,
  FavoriteBorder,
  Favorite,
  Share,
  Sort,
  FilterList,
} from '@mui/icons-material';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteIds = favoritesAPI.getFavorites();
        setFavorites(favoriteIds);
        
        if (favoriteIds.length > 0) {
          const { data: allProducts } = await productAPI.getAllProducts();
          const favoriteItems = allProducts.filter(product => favoriteIds.includes(product._id));
          setFavoriteProducts(favoriteItems);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load favorites. Please try again later.');
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFromFavorites = (id) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    favoritesAPI.removeFromFavorites(itemToDelete);
    const updatedFavorites = favorites.filter(id => id !== itemToDelete);
    setFavorites(updatedFavorites);
    setFavoriteProducts(favoriteProducts.filter(item => item._id !== itemToDelete));
    setDeleteDialogOpen(false);
    setItemToDelete(null);
    setSnackbar({
      open: true,
      message: 'Item removed from favorites',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleShare = (id) => {
    // Implement share functionality
    const product = favoriteProducts.find(item => item._id === id);
    if (product) {
      // In a real app, you would use the Web Share API or a sharing library
      if (navigator.share) {
        navigator.share({
          title: product.title,
          text: `Check out this ${product.title} on OLX for $${product.price}`,
          url: `${window.location.origin}/product/${product._id}`,
        }).catch(err => console.log('Error sharing', err));
      } else {
        // Fallback for browsers that don't support the Web Share API
        setSnackbar({
          open: true,
          message: `Share link copied to clipboard: ${window.location.origin}/product/${product._id}`,
          severity: 'info',
        });
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Favorites
          </Typography>
          <Box>
            <IconButton aria-label="sort">
              <Sort />
            </IconButton>
            <IconButton aria-label="filter">
              <FilterList />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {favoriteProducts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <FavoriteBorder sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              You don't have any favorites yet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Start browsing and add items to your favorites
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/"
              sx={{ mt: 2 }}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {favoriteProducts.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Box sx={{ position: 'relative' }}>
                  <ProductCard
                    product={item}
                    isFavorite={true}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      zIndex: 1,
                    }}
                  >
                    <IconButton
                      aria-label="remove from favorites"
                      onClick={() => handleRemoveFromFavorites(item._id)}
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        mb: 1,
                        '&:hover': { bgcolor: 'error.light', color: 'white' },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="share"
                      onClick={() => handleShare(item._id)}
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'primary.light', color: 'white' },
                      }}
                    >
                      <Share fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remove from Favorites
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this item from your favorites?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
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

export default Favorites;