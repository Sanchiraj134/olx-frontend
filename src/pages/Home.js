import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  CircularProgress,
  Alert,
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Stack,
  Paper,
  Button,
  Divider,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
  Fab,
  Zoom,
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  TrendingUp,
  LocalOffer,
  DirectionsCar,
  Home as HomeIcon,
  PhoneAndroid,
  SportsEsports,
  MenuBook,
  Checkroom,
  Add,
  LocationOn,
  Category,
} from '@mui/icons-material';
import ProductCard from '../components/ProductCard';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(0, 0, 3, 3),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  },
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.95)',
  position: 'relative',
  zIndex: 1,
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  borderRadius: theme.spacing(2),
}));

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const productsPerPage = 12;

  const categories = [
    { name: 'All Categories', icon: <Category />, value: '', color: '#2196F3' },
    { name: 'Electronics', icon: <PhoneAndroid />, value: 'Electronics', color: '#FF9800' },
    { name: 'Vehicles', icon: <DirectionsCar />, value: 'Vehicles', color: '#4CAF50' },
    { name: 'Property', icon: <HomeIcon />, value: 'Property', color: '#9C27B0' },
    { name: 'Fashion', icon: <Checkroom />, value: 'Fashion', color: '#E91E63' },
    { name: 'Books', icon: <MenuBook />, value: 'Books', color: '#795548' },
    { name: 'Sports', icon: <SportsEsports />, value: 'Sports', color: '#607D8B' },
  ];

  const trendingSearches = [
    'iPhone 13', 'Honda City', 'MacBook Pro', 'PlayStation 5', 
    'Samsung TV', 'Royal Enfield', 'iPad', 'Gaming Chair'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and search products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleTrendingSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
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

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
              }}
            >
              Find Amazing Deals
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                opacity: 0.9,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                mb: 4,
              }}
            >
              Buy and sell everything from electronics to vehicles
            </Typography>
            
            <SearchContainer elevation={0}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="What are you looking for?"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  sx={{ 
                    flex: 1,
                    minWidth: 300,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    minWidth: 120,
                  }}
                >
                  Search
                </Button>
              </Box>
              
              {/* Trending Searches */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <TrendingUp sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Trending searches:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {trendingSearches.slice(0, isMobile ? 4 : 8).map((term) => (
                    <Chip
                      key={term}
                      label={term}
                      variant="outlined"
                      size="small"
                      clickable
                      onClick={() => handleTrendingSearch(term)}
                      sx={{ 
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'white',
                          borderColor: 'primary.main',
                        }
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </SearchContainer>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={6} md={3}>
            <StatsCard>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                10M+
              </Typography>
              <Typography variant="body2">Active Users</Typography>
            </StatsCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                50K+
              </Typography>
              <Typography variant="body2">Daily Listings</Typography>
            </StatsCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                1000+
              </Typography>
              <Typography variant="body2">Cities</Typography>
            </StatsCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                99%
              </Typography>
              <Typography variant="body2">Satisfaction</Typography>
            </StatsCard>
          </Grid>
        </Grid>

        {/* Categories Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Browse Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={category.value}>
                <CategoryCard 
                  onClick={() => handleCategorySelect(category.value)}
                  sx={{
                    border: selectedCategory === category.value ? 2 : 0,
                    borderColor: 'primary.main',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: category.color,
                        width: 48,
                        height: 48,
                        mx: 'auto',
                        mb: 1,
                      }}
                    >
                      {category.icon}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {category.name}
                    </Typography>
                  </CardContent>
                </CategoryCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Products Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
              {selectedCategory ? `${selectedCategory} Products` : 'Latest Products'}
              <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 2 }}>
                ({filteredProducts.length} items)
              </Typography>
            </Typography>
            <IconButton>
              <FilterList />
            </IconButton>
          </Box>

          {displayedProducts.length === 0 ? (
            <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>No products found</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search or browse different categories
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
              >
                Clear Filters
              </Button>
            </Paper>
          ) : (
            <>
              <Grid container spacing={3}>
                {displayedProducts.map((product) => (
                  <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              
              {pageCount > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Pagination 
                    count={pageCount} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary" 
                    size="large"
                    showFirstButton 
                    showLastButton
                    sx={{
                      '& .MuiPaginationItem-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>

      {/* Floating Action Button */}
      <Zoom in={true}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
          href="/upload"
        >
          <Add />
        </Fab>
      </Zoom>
    </>
  );
};

export default Home;