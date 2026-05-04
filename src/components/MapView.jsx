import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ points }) {
  const center = [12.9716, 77.5946]; // default center (Bangalore)

  return (
    <MapContainer
      center={[12.9, 80.2]}
      zoom={6}
      minZoom={3}
      maxZoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {points.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          <Popup>
            Point ID: {p.id}
            <br />
            {p.lat}, {p.lng}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
