import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GradientStatusBar } from "../GradientStatusBar";

describe("GradientStatusBar", () => {
  it("renders a progressive gradient when requested", () => {
    const { container } = render(
      <GradientStatusBar
        value={62}
        fillMode="gradient"
        zones={[
          { start: 0, end: 33, color: "#10b981", label: "LOW" },
          { start: 33, end: 66, color: "#f59e0b", label: "MED" },
          { start: 66, end: 100, color: "#ef4444", label: "HIGH" },
        ]}
      />
    );

    const gradientTrack = container.querySelector('[role="meter"] > .absolute.inset-0');
    expect(gradientTrack).toBeTruthy();
    expect((gradientTrack as HTMLDivElement).style.backgroundImage).toContain("linear-gradient");
  });

  it("adds tactical tooltips when zone labels exist", async () => {
    vi.useFakeTimers();

    render(
      <GradientStatusBar
        value={45}
        zones={[
          { start: 0, end: 50, color: "#10b981", label: "SAFE" },
          { start: 50, end: 100, color: "#ef4444" },
        ]}
      />
    );

    fireEvent.mouseEnter(screen.getByLabelText("SAFE (0–50)"));
    act(() => {
      vi.advanceTimersByTime(121);
    });

    expect(screen.getByRole("tooltip")).toHaveTextContent("SAFE (0–50)");

    vi.useRealTimers();
  });
});
