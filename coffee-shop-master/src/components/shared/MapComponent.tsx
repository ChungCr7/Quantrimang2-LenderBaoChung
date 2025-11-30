import React from "react";
import { useUserAddress } from "@/hooks/useUserAddress";
import { defaultCoordinate } from "@/constants/constants";

interface MapComponentProps {
  onCoordChange?: (value: { lat: number; lng: number }) => void;
  interactive?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = () => {
  const { address } = useUserAddress();

  const loc = address?.coordinates || defaultCoordinate;

  // Dùng static map OpenStreetMap (bản không bị chặn CORS)
  const mapUrl = `https://staticmap.openstreetmap.fr/staticmap.php?center=${loc.lat},${loc.lng}&zoom=16&size=600x300&markers=${loc.lat},${loc.lng},red`;

  return (
    <div className="relative w-full h-full">
      <img
        src={mapUrl}
        alt="map"
        className="w-full h-full object-cover rounded-xl"
        onError={(e) => {
          console.error("Map load error");
        }}
      />
    </div>
  );
};

export default MapComponent;
