import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Divider,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  AccountCircle,
  Lock,
  Notifications,
  Language,
  Security,
  Delete,
  PhotoCamera,
  Email,
  Phone,
  Facebook,
  Google,
  Twitter,
  LinkedIn,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    language: 'English',
    currency: 'USD',
    timeZone: 'America/New_York',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    newMessages: true,
    newOffers: true,
    productUpdates: true,
    marketingEmails: false,
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    showLastSeen: true,
    allowLocationAccess: true,
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
    
    // Clear errors when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleTogglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const handlePrivacyChange = (setting) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting],
    });
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    // Simulate API call to update profile
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success',
      });
    }, 500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    // Simulate API call to change password
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'Password changed successfully',
        severity: 'success',
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 500);
  };

  const handleSaveNotifications = () => {
    // Simulate API call to update notification settings
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'Notification settings updated',
        severity: 'success',
      });
    }, 500);
  };

  const handleSavePrivacy = () => {
    // Simulate API call to update privacy settings
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'Privacy settings updated',
        severity: 'success',
      });
    }, 500);
  };

  const handleDeleteAccount = () => {
    // Simulate API call to delete account
    setTimeout(() => {
      setDeleteAccountDialog(false);
      setSnackbar({
        open: true,
        message: 'Account scheduled for deletion. You will receive a confirmation email.',
        severity: 'info',
      });
    }, 500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderAccountTab = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Profile Information
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          alt={profileData.name}
          src="/static/images/avatar/1.jpg"
          sx={{ width: 80, height: 80, mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle1">{profileData.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Member since January 2023
          </Typography>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button
              variant="outlined"
              component="span"
              startIcon={<PhotoCamera />}
              size="small"
              sx={{ mt: 1 }}
            >
              Change Photo
            </Button>
          </label>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            margin="normal"
            InputProps={{
              startAdornment: <Email color="action" sx={{ mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={profileData.phone}
            onChange={handleProfileChange}
            margin="normal"
            InputProps={{
              startAdornment: <Phone color="action" sx={{ mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Language"
            name="language"
            select
            SelectProps={{ native: true }}
            value={profileData.language}
            onChange={handleProfileChange}
            margin="normal"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Currency"
            name="currency"
            select
            SelectProps={{ native: true }}
            value={profileData.currency}
            onChange={handleProfileChange}
            margin="normal"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD ($)</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Time Zone"
            name="timeZone"
            select
            SelectProps={{ native: true }}
            value={profileData.timeZone}
            onChange={handleProfileChange}
            margin="normal"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveProfile}
        >
          Save Changes
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Connected Accounts
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Google />
          </ListItemIcon>
          <ListItemText
            primary="Google"
            secondary="Connected as john.doe@gmail.com"
          />
          <ListItemSecondaryAction>
            <Button size="small" color="error">
              Disconnect
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Facebook />
          </ListItemIcon>
          <ListItemText
            primary="Facebook"
            secondary="Not connected"
          />
          <ListItemSecondaryAction>
            <Button size="small" color="primary">
              Connect
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" color="error" gutterBottom>
        Danger Zone
      </Typography>
      <Box sx={{ bgcolor: 'error.light', p: 2, borderRadius: 1 }}>
        <Typography variant="body1" gutterBottom>
          Delete your account and all your data
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This action is permanent and cannot be undone. All your data will be permanently removed.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={() => setDeleteAccountDialog(true)}
        >
          Delete Account
        </Button>
      </Box>
    </Box>
  );

  const renderSecurityTab = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>
      <Box component="form" onSubmit={handleChangePassword}>
        <TextField
          fullWidth
          margin="normal"
          label="Current Password"
          name="currentPassword"
          type={showPassword.current ? 'text' : 'password'}
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => handleTogglePasswordVisibility('current')}
                edge="end"
              >
                {showPassword.current ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          name="newPassword"
          type={showPassword.new ? 'text' : 'password'}
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          error={!!errors.newPassword}
          helperText={errors.newPassword || 'Password must be at least 8 characters'}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => handleTogglePasswordVisibility('new')}
                edge="end"
              >
                {showPassword.new ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm New Password"
          name="confirmPassword"
          type={showPassword.confirm ? 'text' : 'password'}
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => handleTogglePasswordVisibility('confirm')}
                edge="end"
              >
                {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Update Password
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Two-Factor Authentication
      </Typography>
      <Typography variant="body2" paragraph>
        Add an extra layer of security to your account by enabling two-factor authentication.
      </Typography>
      <Button variant="outlined" color="primary">
        Enable Two-Factor Authentication
      </Button>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Login History
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Chrome on Windows"
            secondary="Current session • New York, USA • May 15, 2023, 10:30 AM"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Safari on iPhone"
            secondary="New York, USA • May 14, 2023, 8:15 PM"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Firefox on Windows"
            secondary="New York, USA • May 12, 2023, 3:45 PM"
          />
        </ListItem>
      </List>
      <Button size="small" color="primary">
        View All Activity
      </Button>
    </Box>
  );

  const renderNotificationsTab = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Notification Channels
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Email Notifications"
            secondary="Receive notifications via email"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={notificationSettings.email}
              onChange={() => handleNotificationChange('email')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Push Notifications"
            secondary="Receive notifications on your device"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={notificationSettings.push}
              onChange={() => handleNotificationChange('push')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="SMS Notifications"
            secondary="Receive notifications via text message"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={notificationSettings.sms}
              onChange={() => handleNotificationChange('sms')}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Notification Types
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="New Messages"
            secondary="When someone sends you a message"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={notificationSettings.newMessages}
              onChange={() => handleNotificationChange('newMessages')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="New Offers"
            secondary="When someone makes an offer on your listing"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={notificationSettings.newOffers}
              onChange={() => handleNotificationChange('newOffers')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Product Updates"
            secondary="Updates about products you're interested in"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={notificationSettings.productUpdates}
              onChange={() => handleNotificationChange('productUpdates')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Marketing Emails"
            secondary="Promotions, deals, and updates from OLX"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={notificationSettings.marketingEmails}
              onChange={() => handleNotificationChange('marketingEmails')}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveNotifications}
        >
          Save Notification Settings
        </Button>
      </Box>
    </Box>
  );

  const renderPrivacyTab = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Privacy Settings
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Profile Visibility"
            secondary="Who can see your profile information"
          />
          <ListItemSecondaryAction>
            <TextField
              select
              SelectProps={{ native: true }}
              value={privacySettings.profileVisibility}
              onChange={(e) => setPrivacySettings({
                ...privacySettings,
                profileVisibility: e.target.value,
              })}
              size="small"
            >
              <option value="public">Public</option>
              <option value="contacts">Contacts Only</option>
              <option value="private">Private</option>
            </TextField>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Show Online Status"
            secondary="Let others see when you're online"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={privacySettings.showOnlineStatus}
              onChange={() => handlePrivacyChange('showOnlineStatus')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Show Last Seen"
            secondary="Let others see when you were last active"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={privacySettings.showLastSeen}
              onChange={() => handlePrivacyChange('showLastSeen')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Location Access"
            secondary="Allow the app to access your location"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={privacySettings.allowLocationAccess}
              onChange={() => handlePrivacyChange('allowLocationAccess')}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSavePrivacy}
        >
          Save Privacy Settings
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Data & Privacy
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" paragraph>
          You can request a copy of your data or delete all your data from our servers.
        </Typography>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Download My Data
        </Button>
        <Button variant="outlined" color="error">
          Delete My Data
        </Button>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="settings tabs"
          >
            <Tab icon={<AccountCircle />} label="Account" />
            <Tab icon={<Lock />} label="Security" />
            <Tab icon={<Notifications />} label="Notifications" />
            <Tab icon={<Security />} label="Privacy" />
          </Tabs>
        </Box>

        {tabValue === 0 && renderAccountTab()}
        {tabValue === 1 && renderSecurityTab()}
        {tabValue === 2 && renderNotificationsTab()}
        {tabValue === 3 && renderPrivacyTab()}
      </Paper>

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={deleteAccountDialog}
        onClose={() => setDeleteAccountDialog(false)}
        aria-labelledby="delete-account-dialog-title"
        aria-describedby="delete-account-dialog-description"
      >
        <DialogTitle id="delete-account-dialog-title" color="error">
          Delete Your Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-account-dialog-description">
            This action cannot be undone. Your account, listings, messages, and all associated data will be permanently deleted.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Type 'DELETE' to confirm"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAccountDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error">
            Delete Account
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

export default Settings;