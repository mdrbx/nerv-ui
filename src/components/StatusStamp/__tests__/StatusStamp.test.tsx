import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusStamp } from "../StatusStamp";

describe("StatusStamp", () => {
  it("does not force a minimum height in inline styles", () => {
    render(<StatusStamp data-testid="stamp" text="APPROVED" bordered />);

    const stamp = screen.getByTestId("stamp");

    expect(stamp).toHaveTextContent("APPROVED");
    expect(stamp.style.minHeight).toBe("");
  });

  it("preserves inline style overrides on the container", () => {
    render(
      <StatusStamp
        data-testid="stamp"
        text="REVIEWED"
        bordered
        style={{ minHeight: "120px" }}
      />,
    );

    expect(screen.getByTestId("stamp")).toHaveStyle("min-height: 120px");
  });

  it("marks blinking stamps so the alarm variant can be targeted", () => {
    render(<StatusStamp data-testid="stamp" text="LOST" blink />);

    expect(screen.getByTestId("stamp").querySelector('[data-blink="true"]')).toBeTruthy();
  });
});
