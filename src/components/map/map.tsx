import { useEffect, useState, useRef } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const mapContainerRef = useRef(null);
  const [infoContent, setInfoContent] = useState({ coord: "", zoom: "" }); // Initialize with an empty string

  useEffect(() => {
    if (process.env.REACT_APP_MAPBOXGL_API_KEY === undefined) {
      throw new Error("REACT_APP_MAPBOXGL_API_KEY is undefined");
    }
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_API_KEY;

    if (mapContainerRef.current) {
      // Coordinates of the corners of the image
      const imageCorners: LngLatLike[] = [
        [-123.10006191, 44.55455659],
        [-123.09966229, 44.55455659],
        [-123.09966229, 44.55391499],
        [-123.10006191, 44.55391499],
      ];

      const bounds = imageCorners.reduce(
        (bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds([imageCorners[0], imageCorners[0]]),
      );

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        bounds: bounds,
        fitBoundsOptions: { padding: 20 }, // padding around the bounding box
      });
      const handleZoom = () => {
        setInfoContent((prevContent) => ({
          ...prevContent,
          zoom: "Zoom Level: " + map.getZoom().toFixed(2),
        }));
      };

      map.on("load", function () {
        // Add image of building and place on map
        map.addSource("building-image", {
          type: "image",
          url: "/downstairs-map.png",
          coordinates: imageCorners as number[][],
        });
        map.addLayer({
          id: "building-image",
          type: "raster",
          source: "building-image",
          paint: { "raster-opacity": 0.85 }, // adjust transparency as needed
        });

        map.on("zoom", handleZoom);

        map.on("click", (e) => {
          setInfoContent((prevContent) => ({
            ...prevContent,
            coord:
              JSON.stringify(e.point) + "\n" + JSON.stringify(e.lngLat.wrap()),
          }));

          map.loadImage(
            "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
            (error, image) => {
              if (error) throw error;
              map.addImage("custom-marker", image as ImageBitmap);
              // Add a GeoJSON source with longitude and latitude values
              if (!map.getSource("annotations-src")) {
                map.addSource("annotations-src", {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: [
                      {
                        // feature for Mapbox DC
                        type: "Feature",
                        geometry: {
                          type: "Point",
                          coordinates: [
                            e.lngLat.wrap().lng,
                            e.lngLat.wrap().lat,
                          ],
                        },
                        properties: {
                          title: "annotation",
                        },
                      },
                    ],
                  },
                });
              }
            },
          );
          // Add layer to render annotations
          map.addLayer({
            id: "annotations",
            type: "symbol",
            source: "annotations-src",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
          // if (!map.getLayer("annotations-src")) {
          //   // Add a symbol layer
          //   map.addLayer({
          //     id: "annotations",
          //     type: "symbol",
          //     source: "annotations-src",
          //     layout: {
          //       "icon-image": "custom-marker",
          //       // get the title name from the source's "title" property
          //       "text-field": ["get", "title"],
          //       "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          //       "text-offset": [0, 1.25],
          //       "text-anchor": "top",
          //     },
          //   });
          // }
        });
      });
      return () => map.remove();
    }
  }, []);

  return (
    <>
      <div id="map" ref={mapContainerRef} />
      <pre id="info">
        <p>{infoContent.coord}</p>
        <p>{infoContent.zoom}</p>
      </pre>
    </>
  );
};

export default Map;
