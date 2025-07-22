import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box, 
  useMediaQuery, 
  useTheme,
  Badge,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Favorite,
  Message,
  Settings,
  Info,
  Add,
  Search,
  Notifications,
  LocationOn,
  ExitToApp,
  Dashboard,
  ShoppingCart,
  TrendingUp,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import { cartAPI } from '../services/api';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    opacity: 0.9,
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 600,
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const UserMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(2),
    minWidth: 280,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications] = useState(3); // Mock notification count
  const [cartItems, setCartItems] = useState([]);
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    location: 'Mumbai, India',
  });

  // Update cart items count
  React.useEffect(() => {
    const updateCartCount = () => {
      const cart = cartAPI.getCart();
      setCartItems(cart);
    };
    
    updateCartCount();
    
    // Listen for storage changes to update cart count
    const handleStorageChange = (e) => {
      if (e.key === 'olx_cart') {
        updateCartCount();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for same-tab updates
    const interval = setInterval(updateCartCount, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const menuItems = [
    { icon: <Dashboard />, text: 'Dashboard', path: '/profile' },
    { icon: <ShoppingCart />, text: 'My Listings', path: '/profile' },
    { icon: <Favorite />, text: 'Favorites', path: '/favorites' },
    { icon: <Message />, text: 'Messages', path: '/messages' },
    { icon: <Settings />, text: 'Settings', path: '/settings' },
  ];

  const mobileMenuItems = [
    { icon: <Add />, text: 'Sell', path: '/upload', color: 'secondary' },
    { icon: <TrendingUp />, text: 'Trending', path: '/' },
    { icon: <Info />, text: 'About', path: '/about' },
    ...menuItems,
  ];

  const renderUserMenu = (
    <UserMenu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {/* User Info Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
            {user.name[0]}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="caption">{user.location}</Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <MenuItem 
          key={index}
          component={Link} 
          to={item.path} 
          onClick={handleMenuClose}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </MenuItem>
      ))}
      
      <Divider />
      
      <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, color: 'error.main' }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <ExitToApp color="error" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </UserMenu>
  );

  const renderMobileDrawer = (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          borderRadius: '0 16px 16px 0',
        },
      }}
    >
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          OLX Clone
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {mobileMenuItems.map((item, index) => (
          <ListItem 
            key={index}
            button 
            component={Link} 
            to={item.path} 
            onClick={handleDrawerToggle}
            sx={{ 
              py: 1.5,
              '&:hover': {
                backgroundColor: item.color === 'secondary' ? 'secondary.light' : 'action.hover',
                color: item.color === 'secondary' ? 'white' : 'inherit',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
            {item.text === 'Messages' && notifications > 0 && (
              <Chip 
                label={notifications} 
                size="small" 
                color="error" 
                sx={{ ml: 1 }}
              />
            )}
          </ListItem>
        ))}
      </List>

      {/* User info in drawer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 32, height: 32, mr: 1.5 }}>
            {user.name[0]}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              View Profile
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar sx={{ py: 1 }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <LogoContainer component={Link} to="/" sx={{ mr: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              OLX
            </Typography>
          </LogoContainer>

          {/* Desktop Search */}
          {!isMobile && (
            <SearchContainer>
              <form onSubmit={handleSearch}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Find cars, mobile phones and more..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      },
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        opacity: 1,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </SearchContainer>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/"
                sx={{ borderRadius: 2 }}
              >
                Home
              </Button>
              
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/upload"
                startIcon={<Add />}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
              >
                SELL
              </Button>

              <IconButton color="inherit" component={Link} to="/messages">
                <Badge badgeContent={notifications} color="error">
                  <Message />
                </Badge>
              </IconButton>

              <IconButton color="inherit">
                <Badge badgeContent={2} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              <IconButton color="inherit" component={Link} to="/favorites">
                <Favorite />
              </IconButton>

              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={cartItemsCount} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <IconButton
                edge="end"
                aria-label="account"
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.name[0]}
                </Avatar>
              </IconButton>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              component={Link}
              to="/upload"
            >
              <Add />
            </IconButton>
          )}
        </Toolbar>
      </StyledAppBar>

      {renderUserMenu}
      {renderMobileDrawer}
    </>
  );
};

export default Navbar;