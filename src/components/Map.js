import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Box, Typography, Paper, Container } from '@mui/material';

const googleMapsApiKey = process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY;

// const center = {
//   lat: 34.9954,
//   lng: 137.0060
// };

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

const mapWrapperStyle = {
  width: '100%',
  height: '500px', // Fixed height
  position: 'relative'
};

function Map({ currentTab, difficultyParams, gameStarted }) {
  const [markerPosition, setMarkerPosition] = useState(null)
  const [showCoordinates, setShowCoordinates] = useState(false)
  const [score, setScore] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(45)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const timerRef = useRef(null)

  
  // Set default values if difficultyParams is not provided
  const { maxDistance = 3000, minDistance = 0.005, zoom = 6, params = -50, centerlat = 34.9954, centerlng = 137.0060 } = difficultyParams || {}

  const center ={
    lat : centerlat,
    lng : centerlng
  }
  // Start timer when game starts
  useEffect(() => {
    if (gameStarted) {
      setIsTimerRunning(true)
    }
  }, [gameStarted])

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const calculateScore = (distance) => {

    if (distance <= minDistance) return 100
    if (distance >= maxDistance) return 0
    const score = 100 * Math.exp((params * (distance - minDistance)) / maxDistance)

    return Number(score.toFixed(3))
  }

  // Reset timer when tab changes
  useEffect(() => {
    if (gameStarted){
      setTimeRemaining(45)
      setIsTimerRunning(true)
      setShowCoordinates(false)
      setMarkerPosition(null)
      setScore(null)
    }
  }, [currentTab, gameStarted])

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time's up
            clearInterval(timerRef.current)
            setIsTimerRunning(false)
            if (!showCoordinates) {
              handleTimeUp()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isTimerRunning, showCoordinates])

  const handleTimeUp = () => {
    setShowCoordinates(true)
    if (markerPosition && currentTab) {
      const distance = calculateDistance(markerPosition.lat, markerPosition.lng, currentTab.lat, currentTab.lng)
      const calculatedScore = calculateScore(distance)
      setScore({ points: calculatedScore, distance: distance.toFixed(2) })
    } else {
      setScore({ points: 0, distance: "N/A" })
    }
  }

  const handleMapClick = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    })
    setShowCoordinates(false)
  }

  const handleShowCoordinates = () => {
    setShowCoordinates(true)
    setIsTimerRunning(false)
    if (markerPosition && currentTab) {
      const distance = calculateDistance(markerPosition.lat, markerPosition.lng, currentTab.lat, currentTab.lng)
      const calculatedScore = calculateScore(distance)
      setScore({ points: calculatedScore, distance: distance.toFixed(2) })
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 4, height: "100%" }}>
      <Box sx={mapWrapperStyle}>
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onClick={handleMapClick}
            streetViewControl={false}
            streetView={false}
          >
            {/* Timer Display */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "8px 12px",
                borderRadius: "4px",
                zIndex: 10,
                fontWeight: "bold",
                color: timeRemaining <= 10 ? "#d32f2f" : "#1976d2",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ⏱️ {timeRemaining}s
            </div>

            {markerPosition && <Marker position={markerPosition} />}
            {showCoordinates && currentTab && (
              <Marker
                position={{ lat: currentTab.lat, lng: currentTab.lng }}
                icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </Box>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button variant="contained" disabled={!markerPosition || timeRemaining === 0} onClick={handleShowCoordinates}>
          答え合わせ
        </Button>
        {showCoordinates && (
          <Box sx={{ mt: 2 }}>
            {markerPosition ? (
              <Typography>
                Your Answer: {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
              </Typography>
            ) : (
              <Typography color="error">No location selected - Time's up!</Typography>
            )}
            {score && (
              <>
                <Typography sx={{ mt: 1 }}>
                  {currentTab.name} / 距離: {score.distance}km
                </Typography>
                <Typography sx={{ mt: 1 }}>得点</Typography>
                <Typography variant="h3" color={timeRemaining === 0 && !markerPosition ? "error" : "primary"}>
                  {score.points.toFixed(3)}
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default Map

