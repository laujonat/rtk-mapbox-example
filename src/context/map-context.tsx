import { Map } from "mapbox-gl";
import { createContext, ReactNode } from "react";

interface MapContextType {
  map: Map | null;
}

interface MapContextProviderProps {
  children?: ReactNode;
  mapInstance: Map | null;
}

export const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapContextProvider: React.FC<MapContextProviderProps> = ({
  children,
  mapInstance,
}) => {
  return (
    <MapContext.Provider value={{ map: mapInstance }}>
      {children}
    </MapContext.Provider>
  );
};
export default MapContext;
