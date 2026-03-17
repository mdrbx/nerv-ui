import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SystemDialog } from "../SystemDialog";

vi.mock("../../MonitorOverlay", () => ({
  MonitorOverlay: () => null,
}));

describe("SystemDialog", () => {
  it("not visible when open=false", () => {
    render(
      <SystemDialog open={false} portalContainer={document.body}>
        Dialog content
      </SystemDialog>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("visible when open=true", () => {
    render(
      <SystemDialog open={true} portalContainer={document.body}>
        Dialog content
      </SystemDialog>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog content")).toBeInTheDocument();
  });

  it("calls onAccept callback", () => {
    const handleAccept = vi.fn();
    render(
      <SystemDialog open={true} onAccept={handleAccept} portalContainer={document.body}>
        Content
      </SystemDialog>
    );
    fireEvent.click(screen.getByText("ACCEPT"));
    expect(handleAccept).toHaveBeenCalledTimes(1);
  });

  it("calls onDecline callback", () => {
    const handleDecline = vi.fn();
    render(
      <SystemDialog open={true} onDecline={handleDecline} portalContainer={document.body}>
        Content
      </SystemDialog>
    );
    fireEvent.click(screen.getByText("DECLINE"));
    expect(handleDecline).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on overlay click", () => {
    const handleClose = vi.fn();
    render(
      <SystemDialog open={true} onClose={handleClose} portalContainer={document.body}>
        Content
      </SystemDialog>
    );
    const overlay = document.querySelector(".bg-black\\/80");
    expect(overlay).toBeTruthy();
    fireEvent.click(overlay!);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
