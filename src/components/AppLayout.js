import { useState, useEffect } from "react"
import { BottomNavigation, BottomNavigationAction, Box, Typography, Paper } from "@mui/material"
import PropTypes from 'prop-types';
import Map from "./Map";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material"

const randomLocation = {
    lat: 34.9954,
    lng: 137.0060
};

const tabs = [
  { label: "Home", icon: <HomeIcon />, lat: 35.714238, lng: 139.8032865 },
  { label: "Search", icon: <SearchIcon />, lat: 35.6594819, lng: 139.6956887 },
  { label: "Favorites", icon: <FavoriteIcon />, lat: 35.674391, lng: 139.6941435  },
  { label: "Profile", icon: <PersonIcon />, lat: 35.7112081, lng: 139.7944656 },
  { label: "Settings", icon: <SettingsIcon />, lat: 35.1775308, lng: 138.6074301 },
  { label: "Notifications", icon: <NotificationsIcon />, lat: randomLocation.lat , lng: randomLocation.lng },
]

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BottomNavigationComponent() {
  const [value, setValue] = useState(0)

  return (
    <Box sx={{ pb: 7 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Immersive GeoGuesser
      </Typography>
        {/* <Typography variant="h4" gutterBottom>
          {tabs[value].label}
        </Typography>
        <Typography variant="body1">{tabs[value].content}</Typography> */}
      <CustomTabPanel value={value} index={0}>
        <Map />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Item One
      </CustomTabPanel>

      {/* Fixed bottom navigation */}
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          sx={{
            "& .MuiBottomNavigationAction-root": {
              minWidth: "auto",
              padding: "6px 0",
              "@media (max-width: 600px)": {
                padding: "6px 4px",
              },
            },
          }}
        >
          {tabs.map((tab, index) => (
            <BottomNavigationAction label={tab.label} icon={tab.icon} {...a11yProps(index)} />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

