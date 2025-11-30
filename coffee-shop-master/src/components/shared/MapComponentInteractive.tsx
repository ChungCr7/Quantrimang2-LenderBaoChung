import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { defaultCoordinate } from "@/constants/constants";
import { useUserAddress } from "@/hooks/useUserAddress";

interface Props {
  onCoordChange?: (coords: { lat: number; lng: number }) => void;
}

const MapComponentInteractive: React.FC<Props> = ({ onCoordChange }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const { address } = useUserAddress();
  const loc = address?.coordinates || defaultCoordinate;

  useEffect(() => {
    if (leafletMap.current) return;

    leafletMap.current = L.map(mapRef.current!).setView([loc.lat, loc.lng], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(leafletMap.current);

    markerRef.current = L.marker([loc.lat, loc.lng], { draggable: true }).addTo(
      leafletMap.current
    );

    leafletMap.current.on("moveend", () => {
      const center = leafletMap.current!.getCenter();
      markerRef.current!.setLatLng(center);
      onCoordChange?.({ lat: center.lat, lng: center.lng });
    });
  }, []);

  return <div ref={mapRef} className="w-full h-full"></div>;
};

export default MapComponentInteractive;
