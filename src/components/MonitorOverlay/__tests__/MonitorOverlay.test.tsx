import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MonitorOverlay } from "../MonitorOverlay";

describe("MonitorOverlay", () => {
  it("renders optional labels", () => {
    render(
      <div className="relative h-40 w-60">
        <MonitorOverlay
          animated={false}
          label="MELCHIOR TRACK"
          secondaryLabel="ROUTE 07"
        />
      </div>
    );

    expect(screen.getByText("MELCHIOR TRACK")).toBeInTheDocument();
    expect(screen.getByText("ROUTE 07")).toBeInTheDocument();
  });

  it("renders alert bands in alert mode", () => {
    const { container } = render(
      <div className="relative h-40 w-60">
        <MonitorOverlay animated={false} variant="alert" color="red" />
      </div>
    );

    expect(container.querySelectorAll('[data-slot="alert-band"]')).toHaveLength(2);
  });
});
