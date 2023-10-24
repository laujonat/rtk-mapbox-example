import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { RootState } from "../../redux/store";
import {
  IFiltersState,
  setFilterSettings,
} from "../../redux/reducers/filtersReducer";

import "./menu.css";
import { staticAnnotationIcons } from "../../utils/annotations.utils";
import Dropdown from "components/dropdown/dropdown";
import FilterButton from "components/menu/filter-button";

interface MenuProps {
  // Define any props if needed
}
const Menu: React.FC<MenuProps> = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const handleMarkerSelect = (marker: string) => {
    setSelectedMarker(marker);
    console.log(filters);
    // Dispatch the setFilterSettings action with the selected marker as an included feature type
    const updatedFilterSettings: IFiltersState = {
      ...filters,
      filterSettings: [
        ...filters.filterSettings,
        { featureType: marker, include: true },
      ],
    };
    dispatch(setFilterSettings(updatedFilterSettings));
  };

  const handleFilterClick = () => {
    console.log("Filter Clicked", filters.filterSettings);
  };

  return (
    <div className="menu">
      <div className="menu-select">
        {/* Dropdown to select markers */}
        <Dropdown
          options={staticAnnotationIcons}
          onSelect={handleMarkerSelect}
        />
        <FilterButton onClick={handleFilterClick} />
      </div>
    </div>
  );
};

export default Menu;
