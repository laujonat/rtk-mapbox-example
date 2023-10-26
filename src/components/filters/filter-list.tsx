import "./filter-list.css";

import Image from "components/image/image";
import { useFeaturesByAnnotationType } from "hooks/annotations";
import useFeatureVisibility, {
  useFilters,
  useLayerFilterVisibility,
} from "hooks/filters";
import React, { useEffect, useState } from "react";
import { staticAnnotationIcons } from "utils/annotations.utils";

interface FilterListProps {
  filterCriteria: string[];
}

const FilterList: React.FC<FilterListProps> = ({ filterCriteria }) => {
  const { toggleVisibility } = useLayerFilterVisibility();
  const { toggleFeatureVisibility } = useFeatureVisibility();

  const filters = useFilters();
  // Use state to track the checked checkboxes for each filter
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<
    Record<string, boolean>
  >(() => {
    const initialCheckboxes: Record<string, boolean> = {};
    Object.keys(filters).forEach((filter) => {
      initialCheckboxes[filter] = false;
    });
    return initialCheckboxes;
  });
  // Use state to track the open/closed state of each details element
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // When a new annotation is added, we need to synchronize the list of checkmarks we are tracking
    const initialCheckboxes: Record<string, boolean> = {};

    filterCriteria.forEach((filter) => {
      initialCheckboxes[filter] = true;
    });
    setCheckedCheckboxes((prev) => ({
      ...prev,
      ...initialCheckboxes,
    }));
  }, [filterCriteria]);

  const handleToggleCheck = (filter: string) => {
    // Toggle visibility
    toggleVisibility(filter, !checkedCheckboxes[filter]);

    // Update checked state
    setCheckedCheckboxes((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  // Function to toggle the open/closed state of a details element
  const toggleDetails = (filter: string) => {
    setOpenDetails((prevOpenDetails) => ({
      ...prevOpenDetails,
      [filter]: !prevOpenDetails[filter],
    }));
  };

  const visibilityFilters = useFeaturesByAnnotationType();
  useEffect(() => {
    console.log(visibilityFilters);
  }, [visibilityFilters]);
  return (
    <div className="filter-list">
      {Object.keys(filters)?.map((filter, i) => (
        <details key={filter + i} onToggle={(e) => toggleDetails(filter)}>
          <summary className="filter-item">
            <div key={filter} className="filter-item-content">
              <i className={`arrow ${openDetails[filter] ? "up" : "down"}`}></i>
              <Image src={staticAnnotationIcons[filter]} alt={filter} />
              <span className="filter-item-text">
                {filter} &nbsp;
                <p>&#40; {visibilityFilters[filter].length} &#41;</p>
              </span>
            </div>
            <label htmlFor={filter} className="toggle-button" />
            <input
              id={filter}
              type="checkbox"
              name="layerCheckboxGroup"
              value={filter}
              checked={checkedCheckboxes[filter]}
              onChange={(e) => {
                e.stopPropagation();
                handleToggleCheck(filter);
              }}
            />
          </summary>
          <ul>
            {Object.values(filters[filter])?.map((_, j) => {
              return (
                <li className="filter-item" key={j}>
                  <div key={filter} className="filter-item-content">
                    <Image src={staticAnnotationIcons[filter]} alt={filter} />
                    <span className="filter-item-text">{filter}</span>
                  </div>
                  <label
                    htmlFor={`features-${filter}-${j}`}
                    className="toggle-button"
                  >
                    <input
                      id={`features-${filter}-${j}`}
                      type="checkbox"
                      name={`features-${filter}-${j}`}
                      checked={filters[filter][j].visible}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleFeatureVisibility(
                          filter,
                          j,
                          !filters[filter][j].visible,
                        );
                      }}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </div>
  );
};

export default FilterList;
