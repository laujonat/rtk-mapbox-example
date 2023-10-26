import useFeatureVisibility, { useLayerFilterVisibility } from "hooks/filters";

import { fireEvent, render, screen } from "@testing-library/react";

import FilterList from "./filter-list";

jest.mock("hooks/filters", () => ({
  useFilters: () => ({
    filter1: [{ visible: true }, { visible: false }],
    filter2: [{ visible: true }, { visible: true }],
  }),
  useLayerFilterVisibility: () => ({
    toggleVisibility: jest.fn(),
  }),
  useFeatureVisibility: () => ({
    toggleFeatureVisibility: jest.fn(),
  }),
}));
jest.mock("hooks/annotations", () => ({
  useFeaturesByAnnotationType: () => ({
    filter1: [1, 2],
    filter2: [3, 4],
  }),
}));

describe("FilterList Component", () => {
  it("should render without errors", () => {
    render(<FilterList filterCriteria={["filter1", "filter2"]} />);
    expect(screen.getByTestId("filter-list")).toBeInTheDocument();
  });

  it("should toggle filter visibility", () => {
    render(<FilterList filterCriteria={["filter1"]} />);

    const filterCheckbox = screen.getByLabelText("filter1");
    fireEvent.click(filterCheckbox);

    expect(useLayerFilterVisibility().toggleVisibility).toHaveBeenCalledWith(
      "filter1",
      false,
    );
  });

  it("should toggle feature visibility", () => {
    render(<FilterList filterCriteria={["filter1"]} />);

    const featureCheckbox = screen.getByLabelText("features-filter1-0");
    fireEvent.click(featureCheckbox);

    expect(useFeatureVisibility().toggleFeatureVisibility).toHaveBeenCalledWith(
      "filter1",
      0,
      false,
    );
  });

  it("should display visibility counts", () => {
    render(<FilterList filterCriteria={["filter1", "filter2"]} />);

    expect(screen.getByText("(2)")).toBeInTheDocument();
    expect(screen.getByText("(2)")).toBeInTheDocument();
  });
});
