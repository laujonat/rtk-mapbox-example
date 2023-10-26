import Map from "components/map/map";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("hooks/store", () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => jest.fn(),
}));
jest.mock("hooks/annotations", () => ({
  useAnnotations: () => jest.fn(),
  useAnnotationTypeId: () => jest.fn(),
}));
jest.mock("hooks/map", () => ({
  useMap: () => ({
    map: {
      on: jest.fn(),
      off: jest.fn(),
      getZoom: jest.fn().mockReturnValue(10),
    },
    mapContainerRef: { current: document.createElement("div") },
  }),
}));

describe("Map Component", () => {
  it("should render without errors", () => {
    render(<Map />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  it("should handle annotation click", () => {
    const mockDispatch = jest.fn();
    jest.mock("hooks/store", () => ({
      useAppDispatch: () => mockDispatch,
      useAppSelector: () => jest.fn(),
    }));

    render(<Map />);

    userEvent.click(screen.getByTestId("map"));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should display zoom level", () => {
    render(<Map />);
    expect(screen.getByText(/Zoom Level/)).toBeInTheDocument();
  });
});
