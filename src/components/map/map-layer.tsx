import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";

interface MarkerLayerProps {
  id: string;
  markerType: string;
  source: string;
  map: mapboxgl.Map | null;
}

const MapLayer: React.FC<MarkerLayerProps> = ({
  id,
  markerType,
  source,
  map,
}) => {
  useEffect(() => {
    if (map) {
      map.addLayer({
        id: id,
        type: "symbol",
        source: source,
        layout: {
          "icon-image": markerType,
          "icon-size": 1.0, // Adjust the size as needed
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 1.25],
          "text-anchor": "top",
        },
      });
    }
  }, [map, id, markerType, source]);

  return null; // No rendering needed, as this component only adds a layer to the map
};

export default MapLayer;
