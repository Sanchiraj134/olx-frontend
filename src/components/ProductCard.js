import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { cartAPI, favoritesAPI } from '../services/api';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Avatar,
  Rating,
  Tooltip,
  Badge,
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  LocationOn, 
  AccessTime,
  Verified,
  LocalOffer,
  TrendingUp,
  Share,
  RemoveRedEye,
  ShoppingCart,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    '& .product-actions': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '& .product-image': {
      transform: 'scale(1.05)',
    },
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  height: 220,
  backgroundColor: theme.palette.grey[100],
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease',
  objectFit: 'cover',
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  opacity: 0,
  transform: 'translateY(-10px)',
  transition: 'all 0.3s ease',
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  width: 36,
  height: 36,
  '&:hover': {
    backgroundColor: 'white',
    transform: 'scale(1.1)',
  },
}));

const PriceTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 8,
  left: 8,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: '4px 12px',
  borderRadius: 20,
  fontWeight: 'bold',
  fontSize: '0.875rem',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
}));

const SellerInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(1),
  padding: theme.spacing(0.5),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(1),
  padding: theme.spacing(0.5, 0),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ProductCard = ({ product, isFavorite = false }) => {
  const [favorite, setFavorite] = React.useState(isFavorite || favoritesAPI.isFavorite(product._id));
  const [views] = React.useState(Math.floor(Math.random() * 500) + 50);
  const [rating] = React.useState((Math.random() * 2 + 3).toFixed(1));
  const [addedToCart, setAddedToCart] = React.useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      favoritesAPI.removeFromFavorites(product._id);
      setFavorite(false);
    } else {
      favoritesAPI.addToFavorites(product._id);
      setFavorite(true);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    cartAPI.addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this ${product.title} for ₹${product.price.toLocaleString()}`,
        url: `${window.location.origin}/product/${product._id}`,
      });
    }
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

  const isNew = () => {
    const productDate = new Date(product.createdAt || Date.now());
    const daysDiff = (new Date() - productDate) / (1000 * 60 * 60 * 24);
    return daysDiff <= 3;
  };

  const isTrending = () => views > 200;

  return (
    <StyledCard>
      <CardActionArea component={RouterLink} to={`/product/${product._id}`} sx={{ height: '100%' }}>
        <ImageContainer>
          <ProductImage
            className="product-image"
            component="img"
            image={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/${product.image}`}
            alt={product.title}
          />
          
          {/* Status Badges */}
          <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {isNew() && (
              <Chip
                label="NEW"
                size="small"
                sx={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                }}
              />
            )}
            {isTrending() && (
              <Chip
                icon={<TrendingUp sx={{ fontSize: '16px !important' }} />}
                label="TRENDING"
                size="small"
                sx={{
                  backgroundColor: '#FF5722',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                }}
              />
            )}
            {product.featured && (
              <Chip
                label="FEATURED"
                size="small"
                sx={{
                  backgroundColor: '#9C27B0',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                }}
              />
            )}
          </Box>

          {/* Action Buttons */}
          <ActionButtons className="product-actions">
            <Tooltip title={favorite ? 'Remove from favorites' : 'Add to favorites'}>
              <ActionButton onClick={handleFavoriteClick}>
                {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
              </ActionButton>
            </Tooltip>
            <Tooltip title="Share">
              <ActionButton onClick={handleShareClick}>
                <Share />
              </ActionButton>
            </Tooltip>
            <Tooltip title={addedToCart ? 'Added to cart!' : 'Add to cart'}>
              <ActionButton 
                onClick={handleAddToCart}
                sx={{ 
                  backgroundColor: addedToCart ? 'success.main' : 'rgba(255, 255, 255, 0.95)',
                  color: addedToCart ? 'white' : 'inherit'
                }}
              >
                <ShoppingCart />
              </ActionButton>
            </Tooltip>
          </ActionButtons>

          {/* Price Tag */}
          <PriceTag>
            ₹{product.price.toLocaleString()}
          </PriceTag>
        </ImageContainer>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1.1rem',
              lineHeight: 1.3,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.title}
          </Typography>

          {/* Location and Time */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
                {product.location || 'Location not specified'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
                {getTimeAgo(product.createdAt)}
              </Typography>
            </Box>
          </Box>

          {/* Seller Info */}
          <SellerInfo>
            <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.8rem' }}>
              {product.seller?.name?.[0] || 'S'}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="caption" sx={{ fontWeight: 500, display: 'block' }}>
                {product.seller?.name || 'Seller'}
                {product.seller?.verified && (
                  <Verified sx={{ fontSize: 14, ml: 0.5, color: 'primary.main' }} />
                )}
              </Typography>
              <Rating value={parseFloat(rating)} precision={0.1} size="small" readOnly />
            </Box>
          </SellerInfo>

          {/* Stats */}
          <StatsContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <RemoveRedEye sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption">
                {views} views
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {product.negotiable && (
                <Chip
                  icon={<LocalOffer sx={{ fontSize: '14px !important' }} />}
                  label="Negotiable"
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem', height: 20 }}
                />
              )}
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'success.main',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                }}
              >
                {product.condition || 'Good'}
              </Typography>
            </Box>
          </StatsContainer>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProductCard;