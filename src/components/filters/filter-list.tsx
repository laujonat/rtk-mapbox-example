import "./filter-list.css";

import Image from "components/image/image";
import { useFeaturesByAnnotationType } from "hooks/annotations";
import { useAppDispatch } from "hooks/store";
import React, { useState } from "react";
import { toggleAllLayerAnnotations } from "redux/actions/filterActions";
import { staticAnnotationIcons } from "utils/annotations.utils";

interface FilterListProps {
  filterCriteria: string[];
  checkedItems: { [key: string]: boolean };
  onTypeToggleCheck: (filter: string) => void;
}

const FilterList: React.FC<FilterListProps> = ({
  filterCriteria,
  checkedItems,
  onTypeToggleCheck: onToggleCheck,
}) => {
  const dispatch = useAppDispatch();
  // Use state to track the checked checkboxes for each filter
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<
    Record<string, boolean>
  >(filterCriteria.reduce((acc, filter) => ({ ...acc, [filter]: false }), {}));

  // Function to toggle the open/closed state of a details element
  const handleLayerVisibilityChange = (filter: string) => {
    // Toggle the checkbox state for the filter
    // setCheckedCheckboxes({
    //   ...checkedCheckboxes,
    //   [filter]: !checkedCheckboxes[filter],
    // });
    console.log("FILTER", filter);
    dispatch(toggleAllLayerAnnotations(filter));
  };

  // Use state to track the open/closed state of each details element
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});

  // Function to toggle the open/closed state of a details element
  const toggleDetails = (filter: string) => {
    setOpenDetails({
      ...openDetails,
      [filter]: !openDetails[filter],
    });
  };

  const visibilityFilters = useFeaturesByAnnotationType();
  return (
    <div className="filter-list">
      {filterCriteria?.map((filter, i) => (
        <details
          key={filter + i}
          open={openDetails[filter]}
          onClick={(e) => {
            e.preventDefault(); // Prevent the default behavior of the details element
            toggleDetails(filter);
          }}
        >
          <summary className="filter-item">
            <div key={filter} className="filter-item-content">
              <i className={`arrow ${openDetails[filter] ? "up" : "down"}`}></i>

              <Image src={staticAnnotationIcons[filter]} alt={filter} />
              <span className="filter-item-text">
                {filter} &nbsp;
                <p>&#40; {visibilityFilters[filter].length} &#41;</p>
              </span>
            </div>
            <label className="toggle-button">
              <input
                type="checkbox"
                name="layerCheckboxGroup"
                checked={checkedItems[filter] || false}
                onChange={(e) => {
                  e.preventDefault();
                  handleLayerVisibilityChange(filter);
                }}
              />
              {/* <span className="custom-checkmark"></span> */}
            </label>
          </summary>
          <ul>
            {visibilityFilters[filter]?.map((feature, j) => {
              console.log("feature", feature);
              return (
                <li className="filter-item" key={j}>
                  {/* Render feature details here */}
                  <div key={filter} className="filter-item-content">
                    <Image
                      src={staticAnnotationIcons[filter]}
                      alt={filter}
                      width="20px" // Set your desired width
                      height="48px" // Set your desired height
                    />
                    <span className="filter-item-text">{filter}</span>
                  </div>
                  <label className="toggle-button">
                    <input
                      type="checkbox"
                      name="featureCheckboxGroup"
                      checked={checkedItems[filter] || false}
                      onChange={() => {
                        // Dispatch the action to set filter visibility here
                        // dispatch(
                        //   setFilterVisibility({
                        //     featureFilterType: filter,
                        //     featureId: j,
                        //     visible: !checkedItems[filter],
                        //   }),
                        // );
                        // You can also call the onToggleCheck function if needed
                        // onToggleCheck(filter);
                      }}
                    />
                  </label>
                  {/* Add more feature details as needed */}
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
