import { useState, useEffect } from "react"
import { BottomNavigation, BottomNavigationAction, Box, Typography, Paper } from "@mui/material"
import PropTypes from 'prop-types';
import Map from "./Map";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PinchOutlinedIcon from '@mui/icons-material/PinchOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

const randomLocation = {
    lat: 34.9954,
    lng: 137.0060
};

const tabs = [
  { label: "1: Thubs Up", icon: <ThumbUpOutlinedIcon />, lat: 35.714238, lng: 139.8032865, name: "言問橋(東京スカイツリー)" },
  { label: "2: Victory", icon: <ExpandMoreOutlinedIcon />, lat: 35.6594819, lng: 139.6956887, name: "渋谷スクランブル交差点" },
  { label: "3: Point", icon: <PanToolAltOutlinedIcon />, lat: 35.674391, lng: 139.6941435, name: "明治神宮" },
  { label: "4: Pinch", icon: <PinchOutlinedIcon />, lat: 35.7112081, lng: 139.7944656, name: "雷門" },
  { label: "5: Call", icon: <CallOutlinedIcon />, lat: 35.1775308, lng: 138.6074301, name: "新東名上り 新清水-新富士間" },
  { label: "6: Special", icon: <StarOutlineOutlinedIcon />, lat: randomLocation.lat , lng: randomLocation.lng, name: "言問橋(東京スカイツリー)" },
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
    <>
      <Typography variant="h4" gutterBottom align="center">
        Immersive GeoGuesser
      </Typography>
      <CustomTabPanel value={value} index={0}>
        <Map currentTab={tabs[0]}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Map currentTab={tabs[1]}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Map currentTab={tabs[2]}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Map currentTab={tabs[3]}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Map currentTab={tabs[4]}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Comming Soon
      </CustomTabPanel>

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
              flexDirection: "row",
              gap: 1,
              "@media (max-width: 600px)": {
                padding: "6px 4px",
              },
            },
            "& .MuiBottomNavigationAction-label": {
                order: 1,
            },
            "& .MuiBottomNavigationAction-icon": {
                order: 2,
                marginTop: 0,
                marginBottom: 0,
            }
          }}
        >
          {tabs.map((tab, index) => (
            <BottomNavigationAction label={tab.label} icon={tab.icon} iconPosition="end" {...a11yProps(index)} />
          ))}
        </BottomNavigation>
      </Paper>
    </>
  )
}

