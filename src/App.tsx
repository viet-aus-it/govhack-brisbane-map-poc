import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const geoJson = window.location.origin + '/qldGeoJson.json';

let markerIcon = L.icon({
  iconUrl: window.location.origin + '/img/marker.png',
  iconRetinaUrl: window.location.origin + '/img/marker.png',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
});

function App() {
  const [geoJsonData, setGeoJsonData] = React.useState<GeoJSON.GeoJsonObject | undefined>();

  React.useEffect(() => {
    const fetchGeoData = async () => {
      const data = await fetch(geoJson).then(res => res.json());

      setGeoJsonData(data);
    }

    fetchGeoData()
  }, []);

  if (!geoJsonData) {
    return <div></div>
  }

  return (
    <div>
      <MapContainer
        center={[-27.4705, 153.0260]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100vh', width: '100wh' }}
      >
        <GeoJSON data={geoJsonData}/>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={markerIcon} position={[-27.4705, 153.0260]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
