import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
  IconButton,
  Grid,
  Badge,
  Tab,
  Tabs,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Send,
  Search,
  MoreVert,
  AttachFile,
  InsertEmoticon,
  ArrowBack,
} from '@mui/icons-material';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    user: {
      id: 101,
      name: 'John Doe',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      online: true,
    },
    lastMessage: {
      text: 'Is this item still available?',
      time: '10:30 AM',
      unread: true,
    },
    product: {
      id: 201,
      title: 'iPhone 12 Pro Max',
      image: 'https://via.placeholder.com/50',
    },
  },
  {
    id: 2,
    user: {
      id: 102,
      name: 'Jane Smith',
      avatar: 'https://mui.com/static/images/avatar/2.jpg',
      online: false,
    },
    lastMessage: {
      text: 'Can you do $450?',
      time: 'Yesterday',
      unread: false,
    },
    product: {
      id: 202,
      title: 'MacBook Pro 2021',
      image: 'https://via.placeholder.com/50',
    },
  },
  {
    id: 3,
    user: {
      id: 103,
      name: 'Mike Johnson',
      avatar: 'https://mui.com/static/images/avatar/3.jpg',
      online: true,
    },
    lastMessage: {
      text: 'Thanks for the quick response!',
      time: 'Yesterday',
      unread: false,
    },
    product: {
      id: 203,
      title: 'Sony PlayStation 5',
      image: 'https://via.placeholder.com/50',
    },
  },
  {
    id: 4,
    user: {
      id: 104,
      name: 'Sarah Williams',
      avatar: 'https://mui.com/static/images/avatar/4.jpg',
      online: false,
    },
    lastMessage: {
      text: 'Where can we meet?',
      time: 'Monday',
      unread: true,
    },
    product: {
      id: 204,
      title: 'Mountain Bike',
      image: 'https://via.placeholder.com/50',
    },
  },
];

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: 1,
    sender: 101, // John Doe
    text: 'Hi there! Is this item still available?',
    time: '10:30 AM',
  },
  {
    id: 2,
    sender: 'me',
    text: 'Yes, it is still available.',
    time: '10:32 AM',
  },
  {
    id: 3,
    sender: 101,
    text: 'Great! What\'s the lowest you can go on the price?',
    time: '10:33 AM',
  },
  {
    id: 4,
    sender: 'me',
    text: 'I can do $480, but that\'s the lowest I can go.',
    time: '10:35 AM',
  },
  {
    id: 5,
    sender: 101,
    text: 'Would you take $450?',
    time: '10:36 AM',
  },
  {
    id: 6,
    sender: 'me',
    text: 'Let\'s meet in the middle at $465?',
    time: '10:38 AM',
  },
  {
    id: 7,
    sender: 101,
    text: 'Deal! When and where can we meet?',
    time: '10:40 AM',
  },
];

const Messages = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch conversations
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setConversations(mockConversations);
      setLoading(false);
    }, 1000);
  }, []);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      // Simulate API call
      setMessages(mockMessages);
      
      // Mark conversation as read
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: { ...conv.lastMessage, unread: false } }
            : conv
        )
      );
    }
  }, [selectedConversation]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Update last message in conversation list
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: {
                text: newMessage,
                time: 'Just now',
                unread: false,
              },
            }
          : conv
      )
    );
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render message list view
  const renderMessageList = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold">
          Messages
        </Typography>
        <TextField
          fullWidth
          placeholder="Search messages"
          variant="outlined"
          size="small"
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mt: 1 }}
        >
          <Tab label="All" />
          <Tab label="Unread" />
        </Tabs>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      ) : filteredConversations.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            {searchQuery ? 'No conversations match your search' : 'No messages yet'}
          </Typography>
        </Box>
      ) : (
        <List sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
          {filteredConversations
            .filter(conv => tabValue === 0 || conv.lastMessage.unread)
            .map((conversation) => (
              <React.Fragment key={conversation.id}>
                <ListItem
                  alignItems="flex-start"
                  button
                  onClick={() => handleSelectConversation(conversation)}
                  sx={{
                    backgroundColor: conversation.lastMessage.unread
                      ? 'rgba(25, 118, 210, 0.08)'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      color="success"
                      invisible={!conversation.user.online}
                    >
                      <Avatar alt={conversation.user.name} src={conversation.user.avatar} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1" fontWeight={conversation.lastMessage.unread ? 'bold' : 'normal'}>
                          {conversation.user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {conversation.lastMessage.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          variant="body2"
                          color="text.primary"
                         component="span"
                          sx={{
                            display: 'inline',
                            fontWeight: conversation.lastMessage.unread ? 'medium' : 'normal',
                          }}
                        >
                          {conversation.lastMessage.text}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Avatar
                            src={conversation.product.image}
                            alt={conversation.product.title}
                            sx={{ width: 24, height: 24, mr: 1 }}
                            variant="rounded"
                          />
                          <Typography variant="caption" color="text.secondary" component="span" noWrap>
                            {conversation.product.title}
                          </Typography>
                        </Box>
                      </React.Fragment>
                    }
                  />
                  {conversation.lastMessage.unread && (
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        alignSelf: 'center',
                        mr: 1,
                      }}
                    />
                  )}
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
        </List>
      )}
    </Box>
  );

  // Render conversation view
  const renderConversation = () => {
    if (!selectedConversation) return null;

    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Conversation header */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isMobile && (
            <IconButton edge="start" onClick={handleBackToList} sx={{ mr: 1 }}>
              <ArrowBack />
            </IconButton>
          )}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            color="success"
            invisible={!selectedConversation.user.online}
          >
            <Avatar
              alt={selectedConversation.user.name}
              src={selectedConversation.user.avatar}
              sx={{ width: 40, height: 40 }}
            />
          </Badge>
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {selectedConversation.user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {selectedConversation.user.online ? 'Online' : 'Offline'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={selectedConversation.product.image}
              alt={selectedConversation.product.title}
              sx={{ width: 30, height: 30, mr: 1 }}
              variant="rounded"
            />
            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 150 }}>
              {selectedConversation.product.title}
            </Typography>
          </Box>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'grey.50',
          }}
        >
          {messages.map((message) => {
            const isMe = message.sender === 'me';
            return (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                {!isMe && (
                  <Avatar
                    alt={selectedConversation.user.name}
                    src={selectedConversation.user.avatar}
                    sx={{ width: 32, height: 32, mr: 1, mt: 0.5 }}
                  />
                )}
                <Box
                  sx={{
                    maxWidth: '70%',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: isMe ? 'primary.main' : 'background.paper',
                    color: isMe ? 'white' : 'text.primary',
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'right',
                      mt: 0.5,
                      color: isMe ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                    }}
                  >
                    {message.time}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Message input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <IconButton color="primary">
                <AttachFile />
              </IconButton>
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Type a message"
                variant="outlined"
                size="small"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </Grid>
            <Grid item>
              <IconButton color="primary">
                <InsertEmoticon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          height: 'calc(100vh - 180px)',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {isMobile ? (
          selectedConversation ? renderConversation() : renderMessageList()
        ) : (
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={12} md={4} sx={{ borderRight: 1, borderColor: 'divider', height: '100%' }}>
              {renderMessageList()}
            </Grid>
            <Grid item xs={12} md={8} sx={{ height: '100%' }}>
              {selectedConversation ? (
                renderConversation()
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'grey.50',
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Select a conversation to start messaging
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default Messages;