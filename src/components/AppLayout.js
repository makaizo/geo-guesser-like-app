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
    { label: "1: いいね", icon: <ThumbUpOutlinedIcon />, lat: 35.714238, lng: 139.8032865, name: "言問橋(東京スカイツリー)" },
    { label: "2: ピース", icon: <ExpandMoreOutlinedIcon />, lat: 35.6594819, lng: 139.6956887, name: "渋谷スクランブル交差点" },
    { label: "3: イチバン", icon: <PanToolAltOutlinedIcon />, lat: 35.674391, lng: 139.6941435, name: "明治神宮" },
    { label: "4: つまむ", icon: <PinchOutlinedIcon />, lat: 35.7112081, lng: 139.7944656, name: "雷門" },
    { label: "5: でんわ", icon: <CallOutlinedIcon />, lat: 35.1775308, lng: 138.6074301, name: "新東名上り 新清水-新富士間" },
    // { label: "6: Special", icon: <StarOutlineOutlinedIcon />, lat: randomLocation.lat , lng: randomLocation.lng, name: "言問橋(東京スカイツリー)" },
  ],
  B: [
    { label: "1: いいね", icon: <ThumbUpOutlinedIcon />, lat: 34.994729, lng: 137.007642, name: "DENSO" },
    { label: "2: ピース", icon: <ExpandMoreOutlinedIcon />, lat: 43.429605, lng: 142.63735, name: "北海道 吹上温泉" },
    { label: "3: イチバン", icon: <PanToolAltOutlinedIcon />, lat: 35.001406, lng: 135.819294, name: "京都 毘沙門堂" },
    { label: "4: つまむ", icon: <PinchOutlinedIcon />, lat: 32.881264, lng: 131.086263, name: "熊本 阿蘇中岳第一火口見学路" },
    { label: "5: でんわ", icon: <CallOutlinedIcon />, lat: 26.649671, lng: 127.818022, name: "沖縄 水納島" },
    // { label: "6: Special", icon: <StarOutlineOutlinedIcon />, lat: randomLocation.lat , lng: randomLocation.lng, name: "言問橋(東京スカイツリー)" },
  ],
  C: [
    { label: "1: いいね", icon: <ThumbUpOutlinedIcon />, lat: 38.897720, lng: -77.036397, name: "アメリカ ワシントンD.C. ホワイトハウス" },
    { label: "2: ピース", icon: <ExpandMoreOutlinedIcon />, lat: -13.164535, lng: -72.544566, name: "ペルー マチュピチュ" },
    { label: "3: イチバン", icon: <PanToolAltOutlinedIcon />, lat: 48.8583, lng: 2.2945, name: "フランス パリ エッフェル塔" },
    { label: "4: つまむ", icon: <PinchOutlinedIcon />, lat: 25.195389, lng: 55.273003, name: "アラブ首長国連邦 ドバイ" },
    { label: "5: でんわ", icon: <CallOutlinedIcon />, lat: 41.4036, lng: 2.1744, name: "スペイン サグラダ・ファミリア" },
    // { label: "6: Special", icon: <StarOutlineOutlinedIcon />, lat: randomLocation.lat , lng: randomLocation.lng, name: "言問橋(東京スカイツリー)" },
  ],
} 

const difficultyParams = {
  A: { maxDistance: 3000, minDistance: 0.1, params: -50, zoom: 8, centerlat: 35.6820, centerlng: 139.76711 },
  B: { maxDistance: 3000, minDistance: 5, params: -10, zoom: 4.5, centerlat: 34.9954, centerlng: 137.0060 },
  C: { maxDistance: 20000, minDistance: 10, params: -5, zoom: 2, centerlat: 34.9954, centerlng: 137.0060 },
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
        イマーシブ ジオゲッサー {difficulty && `～ ${difficulty === "A" ? "東京旅行" : difficulty === "日本一周" ? "Medium" : "世界一周"} ～`}
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

