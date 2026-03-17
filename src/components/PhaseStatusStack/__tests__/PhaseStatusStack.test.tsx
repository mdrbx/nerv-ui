import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PhaseStatusStack } from "../PhaseStatusStack";

describe("PhaseStatusStack", () => {
  it("adds hover labels to phase bars", async () => {
    vi.useFakeTimers();

    render(
      <PhaseStatusStack
        phases={[
          { label: "POWER", status: "ok", value: "98%" },
          { label: "SYNC", status: "warning" },
        ]}
      />
    );

    fireEvent.mouseEnter(screen.getByLabelText("POWER — 98%"));
    act(() => {
      vi.advanceTimersByTime(121);
    });

    expect(screen.getByRole("tooltip")).toHaveTextContent("POWER — 98%");
    expect(screen.getByLabelText("SYNC").querySelector(".cursor-pointer")).toBeTruthy();

    vi.useRealTimers();
  });
});
