import "./filter-panel.css";

import { useFeaturesByAnnotationType } from "hooks/annotations";
import { useFilters } from "hooks/filters";
import { useAppDispatch } from "hooks/store";
import React, { useEffect, useState } from "react";
import { updateFilterCriteria } from "redux/actions/filterActions";

import FilterButton from "./filter-button";
import FilterList from "./filter-list";

interface FilterPanelProps {
  filterCriteria: string[] | null;
  onToggle?: (filter: string, checked: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterCriteria,
  onToggle,
}) => {
  const dispatch = useAppDispatch();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );
  const annotationTypeFilters = useFeaturesByAnnotationType();
  const filters = useFilters();

  // Initialize checkedItems with default values when filterCriteria changes
  useEffect(() => {
    if (annotationTypeFilters) {
      // Create a copy of the current filters using a spread operator
      const updatedFilters = { ...filters };

      // Loop through annotationTypeFilters and update updatedFilters directly
      Object.keys(annotationTypeFilters).forEach((annotationType) => {
        annotationTypeFilters[annotationType].forEach((feature) => {
          const id: string = feature.properties.id.toString(); // Ensure id is a string
          const visibility: boolean =
            feature.properties.visibility === "visible";

          // Use spread operators to update the visibility for the specific feature
          updatedFilters[annotationType] = {
            ...updatedFilters[annotationType], // Preserve existing filters
            [`${id}`]: { visible: visibility }, // Update the specific feature
          };
        });
      });

      console.log(updatedFilters);

      // Dispatch an action to update the filters in your Redux state
      dispatch(updateFilterCriteria(updatedFilters));
    }
  }, [annotationTypeFilters]);
  // Function to toggle the filter panel
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  const handleToggleCheck = (filter: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [filter]: !prevCheckedItems[filter],
    }));
    // dispatch(setAnnotationTypeVisibility(filter, !checkedItems[filter]));

    // Call the onToggle callback with the filter and checked status
    if (onToggle) onToggle(filter, !checkedItems[filter]);
  };
  return (
    <>
      <FilterButton onClick={toggleFilterPanel} />
      <dialog
        className={`filter-panel ${isFilterPanelOpen ? "open" : ""}`}
        open={Boolean(filterCriteria)}
      >
        <div className="filter-panel-header">
          <div className="header-left">
            <h5>Filter Annotations</h5>
          </div>
          <div className="header-right">
            <span>Show/Hide</span>
          </div>
        </div>
        {isFilterPanelOpen && (
          <FilterList
            filterCriteria={filterCriteria as []}
            checkedItems={checkedItems}
            onTypeToggleCheck={handleToggleCheck}
          />
        )}
      </dialog>
    </>
  );
};

export default FilterPanel;
