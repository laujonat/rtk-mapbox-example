import MapContext from "context/map-context";
import { GeoJSONSourceRaw, Map } from "mapbox-gl";
import React, { useContext, useEffect } from "react";

interface MapAnnotationSourceProps extends GeoJSONSourceRaw {
  /* GeoJson data id */
  id: string;
  /* Callback function to notify when the source is added */
  onSourceAdded?: () => void;
}

const MapAnnotationSource: React.FC<MapAnnotationSourceProps> = ({
  id,
  data,
  onSourceAdded,
}) => {
  const mapContext = useContext(MapContext); // Get the map context
  const map: Map | null = mapContext?.map || null;

  useEffect(() => {
    if (map && map.isStyleLoaded() && data) {
      if (!map.getSource(id)) {
        map.addSource(id, {
          type: "geojson",
          data: data,
        });
        if (onSourceAdded) {
          onSourceAdded();
        }
      }
    }
  }, [map, data, id, onSourceAdded]);

  return null; // No rendering needed, as this component only adds a source to the map
};

export default MapAnnotationSource;
