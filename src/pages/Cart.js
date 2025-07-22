import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { cartAPI } from '../services/api';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Divider,
  TextField,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Delete,
  Add,
  Remove,
  ShoppingCartCheckout,
  ArrowBack,
  LocalOffer,
  Security,
  LocalShipping,
  Payment,
  CheckCircle,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const CartContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(8),
}));

const CartCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  },
}));

const QuantityContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: 'white',
  position: 'sticky',
  top: theme.spacing(2),
}));

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutDialog, setCheckoutDialog] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    try {
      const cart = cartAPI.getCart();
      setCartItems(cart);
      setLoading(false);
    } catch (error) {
      console.error('Error loading cart:', error);
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    
    cartAPI.updateQuantity(productId, newQuantity);
    loadCartItems();
    setSnackbar({
      open: true,
      message: 'Quantity updated',
      severity: 'success',
    });
  };

  const handleRemoveItem = (productId) => {
    cartAPI.removeFromCart(productId);
    loadCartItems();
    setSnackbar({
      open: true,
      message: 'Item removed from cart',
      severity: 'info',
    });
  };

  const handleClearCart = () => {
    cartAPI.clearCart();
    loadCartItems();
    setSnackbar({
      open: true,
      message: 'Cart cleared',
      severity: 'info',
    });
  };

  const handleCheckout = () => {
    setCheckoutDialog(true);
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    cartAPI.clearCart();
    setCheckoutDialog(false);
    setOrderPlaced(true);
    setCartItems([]);
    
    setTimeout(() => {
      setOrderPlaced(false);
      navigate('/');
    }, 3000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    // Mock savings calculation (10% discount)
    return Math.round(calculateTotal() * 0.1);
  };

  if (loading) {
    return (
      <CartContainer maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>Loading cart...</Typography>
        </Box>
      </CartContainer>
    );
  }

  if (orderPlaced) {
    return (
      <CartContainer maxWidth="md">
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Thank you for your purchase. You will be redirected to the home page shortly.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Paper>
      </CartContainer>
    );
  }

  return (
    <CartContainer maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Shopping Cart
        </Typography>
        <Chip 
          label={`${cartItems.length} items`} 
          color="primary" 
          sx={{ ml: 2 }} 
        />
      </Box>

      {cartItems.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
          <ShoppingCartCheckout sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Start shopping to add items to your cart
          </Typography>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/" 
            size="large"
            sx={{ mt: 2 }}
          >
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Cart Items</Typography>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleClearCart}
                startIcon={<Delete />}
              >
                Clear Cart
              </Button>
            </Box>

            {cartItems.map((item) => (
              <CartCard key={item._id}>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={item.image}
                        alt={item.title}
                        sx={{ borderRadius: 2, objectFit: 'cover' }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={5}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {item.description?.substring(0, 100)}...
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip label={item.category} size="small" />
                        <Chip label={item.condition} size="small" color="success" />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Seller: {item.seller?.name}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={2}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                        ₹{item.price.toLocaleString()}
                      </Typography>
                      <QuantityContainer>
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          size="small"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 1)}
                          inputProps={{ 
                            style: { textAlign: 'center', width: '40px' },
                            min: 1
                          }}
                          variant="standard"
                          InputProps={{ disableUnderline: true }}
                        />
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        >
                          <Add />
                        </IconButton>
                      </QuantityContainer>
                    </Grid>
                    
                    <Grid item xs={12} sm={2}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </Typography>
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </CartCard>
            ))}
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <SummaryCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal ({cartItems.length} items)</Typography>
                  <Typography>₹{calculateTotal().toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Delivery Charges</Typography>
                  <Typography sx={{ color: 'success.light' }}>FREE</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Discount</Typography>
                  <Typography sx={{ color: 'success.light' }}>
                    -₹{calculateSavings().toLocaleString()}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.3)' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Total Amount
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ₹{(calculateTotal() - calculateSavings()).toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                onClick={handleCheckout}
                startIcon={<ShoppingCartCheckout />}
                sx={{ 
                  mb: 2,
                  py: 1.5,
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  }
                }}
              >
                Proceed to Checkout
              </Button>

              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', textAlign: 'center' }}>
                Safe and secure payments
              </Typography>
            </SummaryCard>

            {/* Benefits */}
            <Paper sx={{ p: 2, mt: 3, borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Why shop with us?
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Security color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Secure Payments" 
                    primaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <LocalShipping color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Free Delivery" 
                    primaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <LocalOffer color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Best Prices" 
                    primaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Checkout Dialog */}
      <Dialog open={checkoutDialog} onClose={() => setCheckoutDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Your Order</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            You are about to place an order for {cartItems.length} items totaling ₹{(calculateTotal() - calculateSavings()).toLocaleString()}.
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            This is a demo application. No actual payment will be processed.
          </Alert>
          <Typography variant="body2" color="text.secondary">
            In a real application, you would enter your delivery address and payment details here.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutDialog(false)}>Cancel</Button>
          <Button onClick={handlePlaceOrder} variant="contained">
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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
    </CartContainer>
  );
};

export default Cart;