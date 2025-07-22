import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  Security,
  Speed,
  People,
  Devices,
  Email,
} from '@mui/icons-material';

const About = () => {
  const teamMembers = [
    {
      name: 'Jane Smith',
      role: 'CEO & Founder',
      image: 'https://source.unsplash.com/random/300x300/?woman',
      bio: 'Jane has over 15 years of experience in e-commerce and marketplace platforms.',
    },
    {
      name: 'John Doe',
      role: 'CTO',
      image: 'https://source.unsplash.com/random/300x300/?man',
      bio: 'John leads our engineering team with expertise in scalable marketplace solutions.',
    },
    {
      name: 'Emily Chen',
      role: 'Head of Design',
      image: 'https://source.unsplash.com/random/300x300/?woman,asian',
      bio: 'Emily ensures our platform provides the best user experience possible.',
    },
    {
      name: 'Michael Johnson',
      role: 'Head of Operations',
      image: 'https://source.unsplash.com/random/300x300/?man,black',
      bio: 'Michael oversees day-to-day operations and customer support.',
    },
  ];

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking on the "Register" button in the top right corner of the page. Fill in your details and follow the instructions to complete the registration process.'
    },
    {
      question: 'How do I list an item for sale?',
      answer: 'After logging in, click on the "+ Sell" button in the navigation bar. Fill in the details about your item, upload photos, set a price, and publish your listing.'
    },
    {
      question: 'Is it free to list items?',
      answer: 'Yes, listing items on our platform is completely free. We only charge a small commission when an item is successfully sold.'
    },
    {
      question: 'How do I contact a seller?',
      answer: 'On any product page, you can find contact options such as "Show Phone Number" or "Chat" to get in touch with the seller directly.'
    },
    {
      question: 'How do payments work?',
      answer: 'Our platform facilitates direct transactions between buyers and sellers. We recommend cash on delivery for local transactions or using secure payment methods for shipping items.'
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          About OLX
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Connecting buyers and sellers since 2006
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto' }}>
          OLX is India's leading online classifieds platform that provides local communities with a vibrant and accessible marketplace. 
          We connect millions of buyers and sellers every month, helping people find everything from furniture, musical instruments, 
          and electronics to jobs, services, and properties.
        </Typography>
      </Box>

      {/* Mission & Vision */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              To empower people in local communities to unlock the hidden value in their items and create economic opportunity through an easy, 
              reliable, and secure marketplace experience.
            </Typography>
            <Typography variant="body1">
              We believe every item has potential value to someone else, and our mission is to help connect the right buyer with the right seller, 
              creating a sustainable cycle of reuse that benefits both individuals and the planet.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph>
              To be the most trusted community marketplace where anyone can transform unused items into opportunity, and where buyers can find exactly what they need.
            </Typography>
            <Typography variant="body1">
              We envision a world where commerce is more sustainable, accessible, and local—where the things we buy and sell help strengthen our communities and reduce waste.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Key Features */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Why Choose OLX?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                <Security fontSize="large" />
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Secure Transactions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our platform includes verification systems and safety tips to ensure secure transactions between buyers and sellers.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                <Speed fontSize="large" />
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Fast & Easy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                List items in minutes with our streamlined process, or find what you need with our powerful search and filtering options.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                <People fontSize="large" />
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Local Community
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Connect with buyers and sellers in your local area, reducing shipping costs and environmental impact.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Our Team */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={member.image}
                  alt={member.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2">
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Stats */}
      <Box sx={{ mb: 8, py: 6, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                50M+
              </Typography>
              <Typography variant="subtitle1">
                Active Users
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                20+
              </Typography>
              <Typography variant="subtitle1">
                Countries
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                100M+
              </Typography>
              <Typography variant="subtitle1">
                Monthly Listings
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                15+
              </Typography>
              <Typography variant="subtitle1">
                Years of Trust
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>

      {/* Contact Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Get In Touch
        </Typography>
        <Typography variant="body1" paragraph>
          Have questions or feedback? We'd love to hear from you.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          startIcon={<Email />}
          href="mailto:contact@olx.com"
          sx={{ mt: 2 }}
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default About;