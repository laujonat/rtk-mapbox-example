import MapContext from "context/map-context";
import { Map } from "mapbox-gl";
import React, { useContext, useEffect } from "react";
import { getBase64FromImage, getIconImagePath } from "utils/annotations.utils";

interface MarkerLayerProps {
  id: string;
  annotationType: string;
  source: string;
}

const MapLayer: React.FC<MarkerLayerProps> = ({
  id,
  annotationType,
  source,
}) => {
  const mapContext = useContext(MapContext); // Get the map context
  const map: Map | null = mapContext?.map || null;

  useEffect(() => {
    async function addIconImageToMap() {
      // Get icon image file path
      const iconImagePath = getIconImagePath(annotationType);

      // Create a new Image element
      const img: HTMLImageElement = new Image();
      // Set the source of the image to the file path
      img.src = iconImagePath;
      // Wait for the image to load
      img.onload = async () => {
        try {
          // Convert the loaded image to a base64 URL
          const iconBase64 = await getBase64FromImage(img);
          if (map) {
            // Load icon image
            map.loadImage(iconBase64, (error, image) => {
              if (error) {
                throw error;
              }
              if (image && !map.hasImage(annotationType)) {
                map.addImage(annotationType, image); // Use markerType as the icon uuid
              }
              if (!map.getLayer(id)) {
                map.addLayer({
                  id: id,
                  type: "symbol",
                  source: source,
                  layout: {
                    "icon-image": annotationType,
                    "icon-size": 1.0,
                    "text-field": ["get", "title"],
                    "text-font": [
                      "Open Sans Semibold",
                      "Arial Unicode MS Bold",
                    ],
                    "text-offset": [0, 1.25],
                    "text-anchor": "top",
                  },
                  filter: ["==", ["get", "type"], annotationType],
                });
              }
            });
          }
        } catch (error) {
          console.error("Error converting image to base64:", error);
        }
      };
    }
    addIconImageToMap();
  }, [map, id, annotationType, source]);

  return null; // No rendering needed, as this component only adds a layer to the map
};

export default MapLayer;
