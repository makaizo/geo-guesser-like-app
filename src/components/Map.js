import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Box, Typography, Paper, Container } from '@mui/material';

// const googleMapsApiKey = process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY;
const googleMapsApiKey = "AIzaSyCpunZ4Sdv4Dw17OprnHVoUBuWg1ltukIE";

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

function Map() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showCoordinates, setShowCoordinates] = useState(false);

  const handleMapClick = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    setShowCoordinates(false);
  };

  const handleShowCoordinates = () => {
    setShowCoordinates(true);
  };

  return (
    // <Box>
    //   <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 2, mb: 4, height: "100%" }}>
          {/* <Typography variant="h4" component="h1" gutterBottom align="center">
            Immersive GeoGuesser
          </Typography> */}
          <Box sx={mapWrapperStyle}>
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={handleMapClick}
                streetViewControl={false}
              >
                {markerPosition && <Marker position={markerPosition} />}
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
              <Typography sx={{ mt: 1 }}>
                Latitude: {markerPosition.lat.toFixed(6)}, Longitude: {markerPosition.lng.toFixed(6)}
              </Typography>
            )}
          </Box>
        </Paper>
    //   </Container>
    // </Box>
  );
}

export default Map;
