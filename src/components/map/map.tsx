import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";

import { MapContextProvider } from "context/map-context";
import {
  useAnnotations as useAnnotationSymbols,
  useAnnotationTypeId,
} from "hooks/annotations";
import { useMap } from "hooks/map";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { useCallback, useEffect, useState } from "react";
import { addAnnotation } from "redux/actions/annotationActions";
import { createNewAnnotationFeature } from "utils/annotations.utils";

import MapAnnotationSource from "./map-annotation-source";
import MapLayer from "./map-layer";

const Map = () => {
  const { map, mapContainerRef } = useMap();
  const dispatch = useAppDispatch();
  const [infoContent, setInfoContent] = useState({ coord: "", zoom: "" });
  const selectedAnnotationId = useAnnotationTypeId();
  const placedAnnotationSymbols = useAnnotationSymbols();
  const filterCriteria = useAppSelector(
    (state) => state.annotations.filterCriteria,
  );

  const onAnnotationClick = useCallback(
    (e: { point: any; lngLat: { wrap: () => { lat: any; lng: any } } }) => {
      setInfoContent((prevContent) => ({
        ...prevContent,
        coord: JSON.stringify(e.point) + "\n" + JSON.stringify(e.lngLat.wrap()),
      }));
      const { lat, lng } = e.lngLat.wrap();
      console.log(lat, lng);
      if (selectedAnnotationId) {
        const { lng, lat } = e.lngLat.wrap();
        const feature = createNewAnnotationFeature(
          selectedAnnotationId,
          [lng, lat],
          placedAnnotationSymbols,
        );
        // Dispatch the addAnnotation action to update annotations state
        dispatch(addAnnotation(feature));
      }
    },
    [dispatch, placedAnnotationSymbols, selectedAnnotationId],
  );

  useEffect(() => {
    if (map) {
      map.on("click", onAnnotationClick);
    }
  }, [map, onAnnotationClick]);

  useEffect(() => {
    if (!map) return;
    const onZoom = () => {
      setInfoContent((prevContent) => ({
        ...prevContent,
        zoom: "Zoom Level: " + map.getZoom().toFixed(2),
      }));
    };

    if (map) {
      map.on("click", onAnnotationClick);
      map.on("zoom", onZoom);
    }

    return () => {
      map.off("click", onAnnotationClick);
      map.off("zoom", onZoom);
    };
  }, [map, onAnnotationClick, selectedAnnotationId]);

  return (
    <MapContextProvider mapInstance={map}>
      <div id="map" ref={mapContainerRef} />
      <MapAnnotationSource
        id="annotations-src"
        data={placedAnnotationSymbols}
        type="geojson"
      />
      {Array.isArray(filterCriteria) &&
        filterCriteria.map((type) => (
          <MapLayer
            key={type}
            annotationType={type}
            id={type}
            source="annotations-src"
          />
        ))}
      <pre id="info">
        <p>{selectedAnnotationId}</p>
        <p>{infoContent.coord}</p>
        <p>{infoContent.zoom}</p>
      </pre>
    </MapContextProvider>
  );
};

export default Map;
