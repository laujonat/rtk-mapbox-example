// Stylesheet imports are typically placed at the top to ensure that styles are applied properly.
import "./menu.css";

import Dropdown from "components/dropdown/dropdown";
import FilterButton from "components/menu/filter-button";
import { useAppDispatch } from "hooks/store";
import React from "react";
import { selectAnnotation } from "redux/actions/annotationActions";
import { staticAnnotationIcons } from "utils/annotations.utils";

interface MenuProps {
  // Define any props if needed
}
const Menu: React.FC<MenuProps> = () => {
  const dispatch = useAppDispatch();

  // const handleFilterSelect = (marker: string) => {
  //   setSelectedAnnotation(marker);
  //   console.log(filters);

  //   // Assuming setFilterSettings expects an array of IFilterSetting[]
  //   const updatedFilterSettings: IFilterSetting[] = [
  //     ...filters.filterSettings,
  //     { featureType: marker, include: true },
  //   ];

  //   console.log(updatedFilterSettings);
  //   dispatch(setFilterSettings(updatedFilterSettings));
  // };

  const handleAnnotationSelect = (annotationId: string) => {
    console.log("marker selected", annotationId);
    // Dispatch the selectAnnotation action with the selected marker
    dispatch(selectAnnotation(annotationId));
  };

  const handleFilterClick = () => {
    // console.log("Filter Clicked", filters.filterSettings);
  };

  return (
    <div className="menu">
      <div className="menu-select">
        {/* Dropdown to select markers */}
        <Dropdown
          options={staticAnnotationIcons}
          onSelect={handleAnnotationSelect}
        />
        <FilterButton onClick={handleFilterClick} />
      </div>
    </div>
  );
};

export default Menu;
