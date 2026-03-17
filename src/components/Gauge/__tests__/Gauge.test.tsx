import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Gauge } from "../Gauge";

describe("Gauge", () => {
  it("exposes a hover surface with the computed value label", () => {
    render(<Gauge value={73} label="SYNC RATE" showTicks={false} />);

    expect(screen.getByLabelText("SYNC RATE: 73%").querySelector(".cursor-pointer")).toBeTruthy();
  });

  it("shows a tooltip when the gauge is hovered", async () => {
    vi.useFakeTimers();

    render(<Gauge value={88} label="CORE TEMP" unit="°C" />);

    fireEvent.mouseEnter(screen.getByLabelText("CORE TEMP: 88°C"));
    act(() => {
      vi.advanceTimersByTime(121);
    });

    expect(screen.getByRole("tooltip")).toHaveTextContent("CORE TEMP: 88°C");

    vi.useRealTimers();
  });
});
