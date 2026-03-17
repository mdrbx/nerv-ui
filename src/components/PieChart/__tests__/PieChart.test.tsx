import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PieChart } from "../PieChart";

describe("PieChart", () => {
  it("shows an in-surface tooltip when hovering a legend row", () => {
    render(
      <PieChart
        slices={[
          { label: "HUMANOID", value: 6 },
          { label: "GEOMETRIC", value: 3 },
        ]}
      />,
    );

    const legendRow = screen.getByText("HUMANOID").closest('[tabindex="0"]');

    expect(legendRow).toBeTruthy();

    fireEvent.mouseEnter(legendRow as HTMLElement);

    expect(screen.getByText("HUMANOID: 6 (67%)", { selector: "div" })).toBeInTheDocument();
  });
});
