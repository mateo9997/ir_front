import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Card from './Card';
import { Icon } from 'leaflet';
import { DivIcon } from 'leaflet';

const IR_API_BASE_URL = 'http://localhost:8080/api/v1/irs';

const WorldMap = () => {
  const [irs, setIrs] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(IR_API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setIrs(data);
      fetchCoordinates(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCoordinates = async (irs) => {
    const newMarkers = [];

    for (const ir of irs) {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            ir.ciudadNacim
          )}&key=c132c42d685945e7b5ea52ee3c44135e`
        );

        const data = await response.json();
        const { lat, lng } = data.results[0].geometry;

        newMarkers.push({
          ir: ir,
          position: [lat, lng],
        });
      } catch (error) {
        console.log(`Error fetching coordinates for ${ir.ciudadNacim}`);
      }
    }

    setMarkers(newMarkers);
  };
  const createCustomIcon = (imageBase64) => {
    return new Icon({
      iconUrl: `data:image/jpeg;base64,${imageBase64}`,
      iconSize: [50, 75], 
      iconAnchor: [12.5, 12.5], 
    });
  };

  return (
    <MapContainer
      center={[35, -30]}
      zoom={3}
      style={{ width: '100%', height: '600px' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={createCustomIcon(marker.ir.foto)}>
          <Popup className="min-w-[400px]">
            <Card ir={marker.ir} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WorldMap;
