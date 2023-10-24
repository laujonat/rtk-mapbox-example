import { IFilterSetting } from "reducers/filtersReducer";

// Action type definitions
export const SET_FILTER_SETTINGS = "SET_FILTER_SETTINGS";

// Define action interfaces for filters
interface SetFilterSettingsAction {
  type: typeof SET_FILTER_SETTINGS;
  payload: IFilterSetting[];
}

// Action creators for filter criteria
export const setFilterSettings = (
  settings: IFilterSetting[],
): SetFilterSettingsAction => ({
  type: SET_FILTER_SETTINGS,
  payload: settings,
});
