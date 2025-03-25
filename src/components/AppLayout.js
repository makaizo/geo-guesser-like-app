import { useState } from "react"
import { BottomNavigation, BottomNavigationAction, Box, Typography, Paper } from "@mui/material"
import PropTypes from 'prop-types';
import Map from "./Map";
import FirstDialog from "./FirstDialog";
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

const tabSets = {
  A: [
    { label: "1: Thubs Up", icon: <ThumbUpOutlinedIcon />, lat: 35.714238, lng: 139.8032865, name: "言問橋(東京スカイツリー)" },
    { label: "2: Victory", icon: <ExpandMoreOutlinedIcon />, lat: 35.6594819, lng: 139.6956887, name: "渋谷スクランブル交差点" },
    { label: "3: Point", icon: <PanToolAltOutlinedIcon />, lat: 35.674391, lng: 139.6941435, name: "明治神宮" },
    { label: "4: Pinch", icon: <PinchOutlinedIcon />, lat: 35.7112081, lng: 139.7944656, name: "雷門" },
    { label: "5: Call", icon: <CallOutlinedIcon />, lat: 35.1775308, lng: 138.6074301, name: "新東名上り 新清水-新富士間" },
    { label: "6: Special", icon: <StarOutlineOutlinedIcon />, lat: randomLocation.lat , lng: randomLocation.lng, name: "言問橋(東京スカイツリー)" },
  ],
  B: [
    { label: "1: Thubs Up", icon: <ThumbUpOutlinedIcon />, lat: 35.714238, lng: 139.8032865, name: "言問橋(東京スカイツリー)" },
    { label: "2: Victory", icon: <ExpandMoreOutlinedIcon />, lat: 35.6594819, lng: 139.6956887, name: "渋谷スクランブル交差点" },
    { label: "3: Point", icon: <PanToolAltOutlinedIcon />, lat: 35.674391, lng: 139.6941435, name: "明治神宮" },
    { label: "4: Pinch", icon: <PinchOutlinedIcon />, lat: 35.7112081, lng: 139.7944656, name: "雷門" },
    { label: "5: Call", icon: <CallOutlinedIcon />, lat: 35.1775308, lng: 138.6074301, name: "新東名上り 新清水-新富士間" },
    { label: "6: Special", icon: <StarOutlineOutlinedIcon />, lat: randomLocation.lat , lng: randomLocation.lng, name: "言問橋(東京スカイツリー)" },
  ],
  C: [
    { label: "1: Thubs Up", icon: <ThumbUpOutlinedIcon />, lat: 35.714238, lng: 139.8032865, name: "言問橋(東京スカイツリー)" },
    { label: "2: Victory", icon: <ExpandMoreOutlinedIcon />, lat: 35.6594819, lng: 139.6956887, name: "渋谷スクランブル交差点" },
    { label: "3: Point", icon: <PanToolAltOutlinedIcon />, lat: 35.674391, lng: 139.6941435, name: "明治神宮" },
    { label: "4: Pinch", icon: <PinchOutlinedIcon />, lat: 35.7112081, lng: 139.7944656, name: "雷門" },
    { label: "5: Call", icon: <CallOutlinedIcon />, lat: 35.1775308, lng: 138.6074301, name: "新東名上り 新清水-新富士間" },
    { label: "6: Special", icon: <StarOutlineOutlinedIcon />, lat: randomLocation.lat , lng: randomLocation.lng, name: "言問橋(東京スカイツリー)" },
  ],
} 

const difficultyParams = {
  A: { maxDistance: 3000, minDistance: 1.5, zoom: 6 },
  B: { maxDistance: 3000, minDistance: 0.005, zoom: 6 },
  C: { maxDistance: 1000, minDistance: 0.001, zoom: 5 },
}

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
  const [difficulty, setDifficulty] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  // Get current tabs based on difficulty
  const tabs = difficulty ? tabSets[difficulty] : []

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty)
    setDialogOpen(false)
    setGameStarted(true)
  }

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Immersive GeoGuesser {difficulty && `- ${difficulty === "A" ? "Easy" : difficulty === "B" ? "Medium" : "Hard"}`}
      </Typography>

      <FirstDialog open={dialogOpen} onSelectDifficulty={handleSelectDifficulty} />

      {gameStarted &&
        tabs.map((tab, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            <Map currentTab={tab} difficultyParams={difficultyParams[difficulty]} gameStarted={gameStarted} />
          </CustomTabPanel>
        ))}

      {gameStarted && (
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
              },
            }}
          >
            {tabs.map((tab, index) => (
              <BottomNavigationAction
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="end"
                {...a11yProps(index)}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </>
  )
}

