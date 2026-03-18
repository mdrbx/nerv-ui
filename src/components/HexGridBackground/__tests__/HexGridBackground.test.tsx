import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HexGridBackground } from "../HexGridBackground";

describe("HexGridBackground", () => {
  it("generates a unique SVG pattern id for each instance", () => {
    const { container } = render(
      <div>
        <div className="relative h-20 w-20">
          <HexGridBackground animated={false} />
        </div>
        <div className="relative h-20 w-20">
          <HexGridBackground animated={false} color="#00FF00" />
        </div>
      </div>
    );

    const patterns = Array.from(container.querySelectorAll("pattern"));
    const ids = patterns.map((pattern) => pattern.getAttribute("id"));
    const fills = Array.from(container.querySelectorAll("rect")).map((rect) => rect.getAttribute("fill"));

    expect(patterns).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
    expect(fills).toEqual([`url(#${ids[0]})`, `url(#${ids[1]})`]);
  });
});
