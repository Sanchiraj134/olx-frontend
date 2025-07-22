import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Card,
  CardMedia,
  Chip,
  Avatar,
  IconButton,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import {
  ArrowBack,
  Share,
  Favorite,
  FavoriteBorder,
  LocationOn,
  Phone,
  WhatsApp,
  Flag,
  AccessTime,
  Verified,
  Security,
  LocalShipping,
  Assignment,
  PhotoCamera,
  ZoomIn,
  Close,
  Send,
  Star,
  ThumbUp,
  Report,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ImageGallery = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  backgroundColor: theme.palette.grey[100],
}));

const MainImage = styled(CardMedia)(({ theme }) => ({
  height: 500,
  cursor: 'zoom-in',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const ThumbnailContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  overflowX: 'auto',
  padding: theme.spacing(1, 0),
}));

const Thumbnail = styled(CardMedia)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  border: '2px solid transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.active': {
    borderColor: theme.palette.primary.main,
  },
}));

const SellerCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: 'white',
  marginBottom: theme.spacing(3),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
}));

const SafetyCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.info.light,
  color: theme.palette.info.contrastText,
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [reviews] = useState([
    {
      id: 1,
      user: 'Alice Johnson',
      rating: 5,
      comment: 'Great seller! Item exactly as described.',
      date: '2023-05-10',
    },
    {
      id: 2,
      user: 'Bob Smith',
      rating: 4,
      comment: 'Good communication and fast delivery.',
      date: '2023-05-08',
    },
  ]);

  // Mock additional images
  const images = [
    `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/${product?.image}`,
    'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
    'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
  ];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await productAPI.getProductById(id);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this ${product.title} for ₹${product.price.toLocaleString()}`,
        url: window.location.href,
      });
    }
  };

  const handleSendMessage = () => {
    setMessageDialogOpen(false);
    setMessage('');
    // Here you would typically send the message to the seller
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const productDate = new Date(date || now);
    const diffTime = Math.abs(now - productDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress size={60} />
    </Box>
  );

  if (error) return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
    </Container>
  );

  if (!product) return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Alert severity="warning" sx={{ borderRadius: 2 }}>Product not found</Alert>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link 
            underline="hover" 
            color="inherit" 
            onClick={handleGoBack} 
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <ArrowBack fontSize="small" sx={{ mr: 0.5 }} /> Back
          </Link>
          <Typography color="primary" sx={{ fontWeight: 500 }}>
            {product.title}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={8}>
          <ImageGallery>
            <MainImage
              component="img"
              image={images[selectedImage]}
              alt={product.title}
              onClick={() => setImageDialogOpen(true)}
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': { backgroundColor: 'white' },
              }}
              onClick={() => setImageDialogOpen(true)}
            >
              <ZoomIn />
            </IconButton>
          </ImageGallery>

          <ThumbnailContainer>
            {images.map((image, index) => (
              <Thumbnail
                key={index}
                component="img"
                image={image}
                alt={`${product.title} ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </ThumbnailContainer>

          {/* Product Details Tabs */}
          <Paper sx={{ mt: 4, borderRadius: 2 }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Description" />
              <Tab label="Specifications" />
              <Tab label="Reviews" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Product Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    This is a high-quality product in excellent condition. The item has been well-maintained 
                    and is ready for immediate use. All original accessories are included where applicable.
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Assignment /></ListItemIcon>
                      <ListItemText primary="Condition: Excellent" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><LocalShipping /></ListItemIcon>
                      <ListItemText primary="Delivery available in local area" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Security /></ListItemIcon>
                      <ListItemText primary="Verified seller" />
                    </ListItem>
                  </List>
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Specifications
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Category
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {product.category || 'Electronics'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Condition
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Excellent
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Brand
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Premium Brand
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Warranty
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        6 months
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Customer Reviews
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={4.5} precision={0.5} readOnly />
                      <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
                        4.5 out of 5 ({reviews.length} reviews)
                      </Typography>
                    </Box>
                  </Box>
                  
                  {reviews.map((review) => (
                    <Box key={review.id} sx={{ mb: 3, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                          {review.user[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{review.user}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating value={review.rating} size="small" readOnly />
                            <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                              {review.date}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2">{review.comment}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Product Info Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                ₹{product.price.toLocaleString()}
              </Typography>
              <Box>
                <IconButton onClick={handleFavoriteClick} color={favorite ? 'error' : 'default'}>
                  {favorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton onClick={handleShare}>
                  <Share />
                </IconButton>
              </Box>
            </Box>
            
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              {product.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip label="Negotiable" color="success" size="small" />
              <Chip label="Excellent Condition" color="info" size="small" />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                {product.location || 'Mumbai, Maharashtra'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                Posted {getTimeAgo(product.createdAt)}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />
            
            <ActionButton 
              variant="contained" 
              color="primary" 
              fullWidth 
              size="large"
              startIcon={<Phone />}
              sx={{ mb: 2 }}
              onClick={() => setContactDialogOpen(true)}
            >
              Show Phone Number
            </ActionButton>
            
            <ActionButton 
              variant="outlined" 
              color="success" 
              fullWidth 
              size="large"
              startIcon={<WhatsApp />}
              sx={{ mb: 2 }}
            >
              Chat on WhatsApp
            </ActionButton>

            <ActionButton 
              variant="outlined" 
              color="primary" 
              fullWidth 
              size="large"
              startIcon={<Send />}
              onClick={() => setMessageDialogOpen(true)}
            >
              Send Message
            </ActionButton>
            
            <Button 
              variant="text" 
              color="inherit" 
              fullWidth
              startIcon={<Flag />}
              sx={{ mt: 2 }}
            >
              Report this ad
            </Button>
          </Paper>

          {/* Seller Info */}
          <SellerCard elevation={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ width: 64, height: 64, mr: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
                <Typography variant="h5">S</Typography>
              </Avatar>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Seller Name
                  </Typography>
                  <Verified sx={{ ml: 1, fontSize: 20 }} />
                </Box>
                <Rating value={4.8} precision={0.1} size="small" readOnly />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Member since 2020 • 150+ sales
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>98%</Typography>
                <Typography variant="caption">Positive Reviews</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>2h</Typography>
                <Typography variant="caption">Response Time</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>150+</Typography>
                <Typography variant="caption">Items Sold</Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              sx={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              View Seller Profile
            </Button>
          </SellerCard>
          
          {/* Safety Tips */}
          <SafetyCard>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
              Safety Tips
            </Typography>
            <List dense>
              <ListItem sx={{ px: 0 }}>
                <Typography variant="caption">
                  • Meet seller at a safe, public location
                </Typography>
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <Typography variant="caption">
                  • Check the item before you buy
                </Typography>
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <Typography variant="caption">
                  • Pay only after collecting the item
                </Typography>
              </ListItem>
            </List>
          </SafetyCard>
        </Grid>
      </Grid>

      {/* Image Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Product Images
          <IconButton onClick={() => setImageDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={images[selectedImage]}
              alt={product.title}
              style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
            />
            <ThumbnailContainer sx={{ justifyContent: 'center', mt: 2 }}>
              {images.map((image, index) => (
                <Thumbnail
                  key={index}
                  component="img"
                  image={image}
                  alt={`${product.title} ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ThumbnailContainer>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onClose={() => setContactDialogOpen(false)}>
        <DialogTitle>Contact Seller</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            📞 +91 98765 43210
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can now call the seller directly. Please be respectful and follow our community guidelines.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialogOpen(false)}>Close</Button>
          <Button variant="contained" href="tel:+919876543210">
            Call Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onClose={() => setMessageDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Message to Seller</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your message"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi, I'm interested in your product..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSendMessage} variant="contained" disabled={!message.trim()}>
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductDetails;