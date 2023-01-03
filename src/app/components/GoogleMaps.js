import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const GoogleMaps = () => {
  const user = useSelector(selectUser);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lng: Number(user.location.coordinates.longitude),
        lat: Number(user.location.coordinates.latitude),
      }}
      zoom={10}
    >
      {
        <Marker
          position={{
            lng: Number(user.location.coordinates.longitude),
            lat: Number(user.location.coordinates.latitude),
          }}
        />
      }
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMaps;
