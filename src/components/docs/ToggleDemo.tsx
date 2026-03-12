"use client";

import { useState } from "react";
import { Toggle } from "@/components";

export function ToggleBasicDemo() {
  const [checked, setChecked] = useState(false);
  return <Toggle checked={checked} onChange={setChecked} label="SYSTEM ACTIVE" />;
}

export function ToggleOnDemo() {
  const [checked, setChecked] = useState(true);
  return <Toggle checked={checked} onChange={setChecked} label="NEURAL LINK" />;
}

export function ToggleColorsDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(true);
  const [c, setC] = useState(true);
  return (
    <div className="flex flex-col gap-3">
      <Toggle checked={a} onChange={setA} color="orange" label="ORANGE" />
      <Toggle checked={b} onChange={setB} color="green" label="GREEN" />
      <Toggle checked={c} onChange={setC} color="cyan" label="CYAN" />
    </div>
  );
}

export function ToggleSizesDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(true);
  const [c, setC] = useState(true);
  return (
    <div className="flex flex-col gap-3">
      <Toggle checked={a} onChange={setA} size="sm" label="SMALL" />
      <Toggle checked={b} onChange={setB} size="md" label="MEDIUM" />
      <Toggle checked={c} onChange={setC} size="lg" label="LARGE" />
    </div>
  );
}

export function ToggleDisabledDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Toggle checked={false} disabled label="DISABLED OFF" />
      <Toggle checked={true} disabled label="DISABLED ON" />
    </div>
  );
}
