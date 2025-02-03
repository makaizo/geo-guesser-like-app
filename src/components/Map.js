import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Box, Typography, Paper, Container } from '@mui/material';

const googleMapsApiKey = process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY;
// const googleMapsApiKey = "AIzaSyCpunZ4Sdv4Dw17OprnHVoUBuWg1ltukIE";

const center = {
  lat: 34.9954,
  lng: 137.0060
};

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

function Map({currentTab}) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [score, setScore] = useState(null);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; 
  }

  const calculateScore = (distance) => {
    const maxDistance = 3000;
    const minDistance = 0.005;

    if(distance <= minDistance) return 100;
    if(distance >= maxDistance) return 0;
    const score = 100 * Math.exp(-35 * (distance - minDistance) / maxDistance);

    return Number(score.toFixed(3));
  } 

  const handleMapClick = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    setShowCoordinates(false);
  };

  const handleShowCoordinates = () => {
    setShowCoordinates(true);
    if(markerPosition && currentTab){
      const distance = calculateDistance(markerPosition.lat, markerPosition.lng, currentTab.lat, currentTab.lng);
      const score = calculateScore(distance);
      setScore({points: score, distance: distance.toFixed(2)});
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 4, height: "100%" }}>
      <Box sx={mapWrapperStyle}>
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
            onClick={handleMapClick}
            streetViewControl={false}
          >
            {markerPosition && <Marker position={markerPosition} />}
            {showCoordinates && currentTab &&
              <Marker
                position={{lat: currentTab.lat, lng: currentTab.lng }}
                icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
              />
            }
          </GoogleMap>
        </LoadScript>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button 
          variant="contained" 
          disabled={!markerPosition} 
          onClick={handleShowCoordinates}
        >
          Show Coordinates
        </Button>
        {showCoordinates && markerPosition && (
          <Box sx={{ mt: 2 }}>
            <Typography>
              Your Answer: {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
            </Typography>
            {score && (
              <>
              <Typography sx={{ mt: 1 }}>
                {currentTab.name} / DISTANCE: {score.distance}km
              </Typography>
              <Typography sx={{ mt: 1 }}>SCORE</Typography>
              <Typography variant="h3" color="primary">
                 {score.points.toFixed(3)}
              </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default Map;
