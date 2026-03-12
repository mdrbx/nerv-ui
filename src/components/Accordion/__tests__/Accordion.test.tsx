import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Accordion, AccordionItem } from "../Accordion";

describe("Accordion", () => {
  it("renders items", () => {
    render(
      <Accordion>
        <AccordionItem id="1" title="Section One">
          Content one
        </AccordionItem>
        <AccordionItem id="2" title="Section Two">
          Content two
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Section One")).toBeInTheDocument();
    expect(screen.getByText("Section Two")).toBeInTheDocument();
  });

  it("toggles item open/close on click", () => {
    render(
      <Accordion>
        <AccordionItem id="1" title="Section One">
          Content one
        </AccordionItem>
      </Accordion>
    );
    expect(screen.queryByText("Content one")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Section One"));
    expect(screen.getByText("Content one")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Section One"));
    expect(screen.queryByText("Content one")).not.toBeInTheDocument();
  });

  it("multiple mode allows multiple open", () => {
    render(
      <Accordion multiple>
        <AccordionItem id="1" title="Section One">
          Content one
        </AccordionItem>
        <AccordionItem id="2" title="Section Two">
          Content two
        </AccordionItem>
      </Accordion>
    );

    fireEvent.click(screen.getByText("Section One"));
    expect(screen.getByText("Content one")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Section Two"));
    expect(screen.getByText("Content one")).toBeInTheDocument();
    expect(screen.getByText("Content two")).toBeInTheDocument();
  });

  it("single mode closes previous when opening new", () => {
    render(
      <Accordion>
        <AccordionItem id="1" title="Section One">
          Content one
        </AccordionItem>
        <AccordionItem id="2" title="Section Two">
          Content two
        </AccordionItem>
      </Accordion>
    );

    fireEvent.click(screen.getByText("Section One"));
    expect(screen.getByText("Content one")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Section Two"));
    expect(screen.queryByText("Content one")).not.toBeInTheDocument();
    expect(screen.getByText("Content two")).toBeInTheDocument();
  });
});
