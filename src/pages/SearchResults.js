import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Pagination,
  Divider,
  Chip,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Button,
} from '@mui/material';
import { FilterAlt } from '@mui/icons-material';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: categoryParam,
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest',
  });

  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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

  // Filter products based on search query and filters
  const filteredProducts = products.filter(product => {
    // Filter by search query
    const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase()) ||
                        (product.description && product.description.toLowerCase().includes(query.toLowerCase()));
    
    // Filter by category
    const matchesCategory = !filters.category || product.category === filters.category;
    
    // Filter by price range
    const matchesMinPrice = !filters.minPrice || product.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || product.price <= Number(filters.maxPrice);
    
    return matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const pageCount = Math.ceil(sortedProducts.length / productsPerPage);
  const displayedProducts = sortedProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page on filter change
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    if (filters.category) newParams.set('category', filters.category);
    else newParams.delete('category');
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest',
    });
    setSearchParams({ q: query });
  };

  const categories = [
    'Electronics',
    'Vehicles',
    'Property',
    'Furniture',
    'Fashion',
    'Books',
    'Sports',
    'Other',
  ];

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Alert severity="error">{error}</Alert>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {query ? `Search results for "${query}"` : 'All Products'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <FilterAlt sx={{ mr: 1 }} /> Filters
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={filters.category}
                  label="Category"
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Price Range
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  size="small"
                  label="Min"
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                  sx={{ width: '50%' }}
                />
                <TextField
                  size="small"
                  label="Max"
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                  sx={{ width: '50%' }}
                />
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  value={filters.sortBy}
                  label="Sort By"
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="price_asc">Price: Low to High</MenuItem>
                  <MenuItem value="price_desc">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button variant="contained" onClick={applyFilters} fullWidth>
                Apply Filters
              </Button>
              <Button variant="outlined" onClick={resetFilters} fullWidth>
                Reset
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Product Grid */}
        <Grid item xs={12} md={9}>
          {displayedProducts.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h6">No products found matching your criteria</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try adjusting your search or filter criteria
              </Typography>
              <Button variant="outlined" onClick={resetFilters} sx={{ mt: 3 }}>
                Clear Filters
              </Button>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {displayedProducts.map((product) => (
                  <Grid item key={product._id} xs={12} sm={6} md={4}>
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
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchResults;