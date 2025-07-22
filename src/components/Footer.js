import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              POPULAR CATEGORIES
            </Typography>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Cars
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Flats for rent
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Mobile Phones
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Jobs
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              TRENDING SEARCHES
            </Typography>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Bikes
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Watches
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Books
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Dogs
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              ABOUT US
            </Typography>
            <Link href="/about" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Careers
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Contact Us
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              OLX People
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              OLX
            </Typography>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Help
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Sitemap
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Legal & Privacy information
            </Link>
            <Link href="#" color="text.secondary" display="block" variant="body2" sx={{ mb: 1 }}>
              Blog
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, sm: 0 } }}>
            © 2023 OLX. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" color="inherit">
              <Facebook />
            </Link>
            <Link href="#" color="inherit">
              <Twitter />
            </Link>
            <Link href="#" color="inherit">
              <Instagram />
            </Link>
            <Link href="#" color="inherit">
              <LinkedIn />
            </Link>
            <Link href="#" color="inherit">
              <YouTube />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;