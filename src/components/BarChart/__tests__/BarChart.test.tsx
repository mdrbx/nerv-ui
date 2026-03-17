import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BarChart } from "../BarChart";

describe("BarChart", () => {
  it("keeps vertical bars inside a full-height hover surface", () => {
    const { container } = render(
      <BarChart
        bars={[
          { label: "EVA-00", value: 68 },
          { label: "EVA-01", value: 41 },
        ]}
        unit="%"
      />,
    );

    expect(screen.getByLabelText("EVA-00: 68%")).toHaveClass("h-full");
    expect(container.querySelector(".min-h-0")).toBeTruthy();
  });

  it("shows the tactical tooltip on hover", async () => {
    vi.useFakeTimers();

    render(
      <BarChart
        bars={[{ label: "EVA-02", value: 92 }]}
        unit="%"
      />,
    );

    fireEvent.mouseEnter(screen.getByLabelText("EVA-02: 92%"));
    act(() => {
      vi.advanceTimersByTime(121);
    });

    expect(screen.getByRole("tooltip")).toHaveTextContent("EVA-02: 92%");

    vi.useRealTimers();
  });
});
