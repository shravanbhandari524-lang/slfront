import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function SimpleMap({ offers = [] }) {
  const center = [12.9716, 77.5946];

  // 🧠 GROUP BY SAME LAT/LNG
  const groupedOffers = Object.values(
    offers.reduce((acc, offer) => {
      const key = `${offer.lat},${offer.lng}`;

      if (!acc[key]) {
        acc[key] = {
          lat: offer.lat,
          lng: offer.lng,
          offers: [],
        };
      }

      acc[key].offers.push(offer);
      return acc;
    }, {}),
  );

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {groupedOffers.map((group, idx) => (
        <Marker key={idx} position={[group.lat, group.lng]}>
          {/* 🧠 POPUP = SHOW ALL OFFERS */}
          <Popup>
            <div style={{ minWidth: "200px" }}>
              <h4>📍 Offers here: {group.offers.length}</h4>

              <p style={{ margin: "4px 0" }}>
                {group.lat}, {group.lng}
              </p>

              <hr />

              {group.offers.map((o) => (
                <div
                  key={o.id}
                  style={{
                    padding: "5px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <b>ID:</b> {o.id}
                  <br />
                  <b>Service:</b> {o.serv}
                </div>
              ))}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
