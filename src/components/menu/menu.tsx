// Stylesheet imports are typically placed at the top to ensure that styles are applied properly.
import "./menu.css";

import Dropdown from "components/dropdown/dropdown";
import { useAppDispatch, useAppSelector } from "hooks/store";
import React from "react";
import { selectAnnotation } from "redux/actions/annotationActions";
import { staticAnnotationIcons } from "utils/annotations.utils";

import FilterPanel from "../filters/filter-panel";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const dispatch = useAppDispatch();
  const filterCriteria = useAppSelector(
    (state) => state.annotations.filterCriteria,
  );
  const handleAnnotationSelect = (annotationId: string) => {
    // Dispatch the selectAnnotation action with the selected marker
    dispatch(selectAnnotation(annotationId));
  };

  return (
    <div className="menu">
      <div className="menu-select">
        <Dropdown
          options={staticAnnotationIcons}
          onSelect={handleAnnotationSelect}
        />
        <FilterPanel filterCriteria={filterCriteria} />
      </div>
    </div>
  );
};

export default Menu;
