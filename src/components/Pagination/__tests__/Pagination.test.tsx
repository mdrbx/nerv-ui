import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "../Pagination";

describe("Pagination", () => {
  it("renders bounded explicit pagination with ellipses", () => {
    render(
      <Pagination
        total={1000}
        pageSize={10}
        currentPage={37}
        onPageChange={() => {}}
        variant="explicit"
        siblingCount={1}
      />
    );

    expect(screen.getByRole("button", { name: "Page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 37" })).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByText("...").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Page 100" })).toBeInTheDocument();
  });

  it("navigates from the explicit previous and next controls", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        total={1000}
        pageSize={10}
        currentPage={37}
        onPageChange={onPageChange}
        variant="explicit"
      />
    );

    await user.click(screen.getByRole("button", { name: "Previous page" }));
    await user.click(screen.getByRole("button", { name: "Next page" }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 36);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 38);
  });
});
