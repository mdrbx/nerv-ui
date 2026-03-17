import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TerminalDisplay } from "../TerminalDisplay";

describe("TerminalDisplay", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("respects custom typewriter timing", () => {
    vi.useFakeTimers();

    render(
      <TerminalDisplay
        data-testid="terminal"
        lines={["AB", "CD"]}
        typewriter
        typeSpeed={20}
        lineDelay={40}
        showCursor={false}
      />,
    );

    screen.getByTestId("terminal");

    expect(screen.queryByText(/^A$/)).toBeNull();

    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(screen.getByText(/^A$/)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(screen.getByText(/^AB$/)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(59);
    });
    expect(screen.queryByText(/^CD$/)).toBeNull();

    act(() => {
      vi.advanceTimersByTime(21);
    });
    expect(screen.getByText(/^C$/)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(40);
    });
    expect(screen.getByText(/^CD$/)).toBeInTheDocument();
  });

  it("renders line numbers in a dedicated gutter without inheriting the text glow", () => {
    render(
      <TerminalDisplay
        lines={["alpha", "beta"]}
        showLineNumbers
        showCursor={false}
        color="cyan"
      />,
    );

    const firstLineNumber = screen.getByText("001");

    expect(firstLineNumber).toHaveAttribute("data-slot", "line-number");
    expect(firstLineNumber).toHaveClass("border-r");
    expect(firstLineNumber).toHaveStyle({ textShadow: "none" });
  });
});
