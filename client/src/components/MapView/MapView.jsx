import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";

function LocationMarker({
  selectedPosition,
  setSelectedPosition
}) {

  useMapEvents({
    click(e) {
      setSelectedPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    }
  });

  return (
    <Marker
      position={[
        selectedPosition.lat,
        selectedPosition.lng
      ]}
    >
      <Popup>
        Selected Location
      </Popup>
    </Marker>
  );
}

const MapView = ({
  problems,
  selectedPosition,
  setSelectedPosition
}) => {

  return (
    <MapContainer
      center={[
        selectedPosition.lat,
        selectedPosition.lng
      ]}

      zoom={13}

      style={{
        height: "100vh",
        width: "100%"
      }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        selectedPosition={
          selectedPosition
        }

        setSelectedPosition={
          setSelectedPosition
        }
      />

      {problems.map(problem => (
        <Marker
          key={problem._id}

          position={[
            problem.location.lat,
            problem.location.lng
          ]}
        >

          <Popup>
            <div>
              <h3>
                {problem.title}
              </h3>

              <p>
                {problem.description}
              </p>

              <p>
                {problem.category}
              </p>
            </div>
          </Popup>

        </Marker>
      ))}

    </MapContainer>
  );
};

export default MapView;