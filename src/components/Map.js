import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Box, Typography, Paper, Container } from '@mui/material';

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

async function fetchNearbyPlaces(location) {
    const response = await fetch('https://<api-id>.execute-api.<region>.amazonaws.com/prod/places', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
    });

    const data = await response.json();
    return data.results;
}

function Map() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [places, setPlaces] = useState([]);

  const handleMapClick = async (event) => {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkerPosition(position);
    setShowCoordinates(false);

    // Fetch nearby places
    const placesData = await fetchNearbyPlaces(position);
    setPlaces(placesData);
  };

  const handleShowCoordinates = () => {
    setShowCoordinates(true);
  };

  return (
    <Box>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Immersive GeoGuesser
          </Typography>
          <Box sx={mapWrapperStyle}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onClick={handleMapClick}
              streetViewControl={false}
            >
              {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
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
      </Container>
    </Box>
  );
}

export default Map;
