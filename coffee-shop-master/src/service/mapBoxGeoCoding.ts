import axios from "axios";
import { LatLng } from "../types";

export const getAddrFromCoordinate = async (
  coordinate: LatLng
): Promise<string> => {
  try {
    const { lat, lng } = coordinate;

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat,
          lon: lng,
          "accept-language": "vi", // trả về tiếng Việt
        },
      }
    );

    return response.data?.display_name || "";
  } catch (err) {
    console.error("Reverse geocode error:", err);
    return "";
  }
};
