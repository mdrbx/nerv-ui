"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { SelectMenu } from "@/components/SelectMenu";
import { Button } from "@/components/Button";
import { SystemDialog } from "@/components/SystemDialog";
import { TerminalDisplay } from "@/components/TerminalDisplay";
import { TargetingContainer } from "@/components/TargetingContainer";
import { StatusStamp } from "@/components/StatusStamp";
import { PilotCard } from "@/components/PilotCard";
import { Checkbox } from "@/components/Checkbox";
import { Toggle } from "@/components/Toggle";
import { Textarea } from "@/components/Textarea";
import { RadioGroup } from "@/components/RadioGroup";
import { Divider } from "@/components/Divider";

const unitOptions = [
  { value: "", label: "— SELECT UNIT —" },
  { value: "EVA-00", label: "EVA-00 PROTOTYPE" },
  { value: "EVA-01", label: "EVA-01 TEST TYPE" },
  { value: "EVA-02", label: "EVA-02 PRODUCTION" },
  { value: "EVA-03", label: "EVA-03 PRODUCTION" },
];

const priorityOptions = [
  { value: "", label: "— SELECT PRIORITY —" },
  { value: "LOW", label: "LOW — ROUTINE" },
  { value: "MEDIUM", label: "MEDIUM — STANDARD" },
  { value: "HIGH", label: "HIGH — URGENT" },
  { value: "CRITICAL", label: "CRITICAL — EMERGENCY" },
];

export default function FormExample() {
  const [formData, setFormData] = useState({
    operatorName: "",
    operatorId: "",
    unit: "",
    priority: "",
    notes: "",
    clearanceLevel: "standard",
    confirmAuth: false,
    liveMonitoring: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [outputLines, setOutputLines] = useState<string[]>([]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.operatorName.trim())
      newErrors.operatorName = "OPERATOR NAME REQUIRED";
    if (!formData.operatorId.trim())
      newErrors.operatorId = "OPERATOR ID REQUIRED";
    if (!formData.unit) newErrors.unit = "UNIT SELECTION REQUIRED";
    if (!formData.priority) newErrors.priority = "PRIORITY LEVEL REQUIRED";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setOutputLines([
        "NERV COMMAND — DISPATCH ORDER CONFIRMED",
        "═══════════════════════════════════════",
        `OPERATOR: ${formData.operatorName} [${formData.operatorId}]`,
        `UNIT:     ${formData.unit}`,
        `PRIORITY: ${formData.priority}`,
        `NOTES:    ${formData.notes || "NONE"}`,
        `CLEARANCE: ${formData.clearanceLevel.toUpperCase()}`,
        `LIVE MON: ${formData.liveMonitoring ? "ENABLED" : "DISABLED"}`,
        "═══════════════════════════════════════",
        "STATUS: TRANSMITTED TO CENTRAL DOGMA",
        "MAGI VERIFICATION: PENDING",
        "AWAITING AUTHORIZATION...",
      ]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-eva-black">
      {/* Header */}
      <div className="border-b border-eva-orange px-6 py-3">
        <h1
          className="text-2xl uppercase tracking-[0.2em] text-eva-orange font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          DISPATCH ORDER FORM
        </h1>
        <p className="text-[10px] font-mono text-eva-mid-gray mt-1">
          NERV OPERATIONS DIVISION — UNIT DEPLOYMENT REQUEST
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Form */}
        <div className="col-span-full md:col-span-7 p-6 pt-6 md:pt-10 md:border-r border-eva-orange border-b md:border-b-0">
          <TargetingContainer label="OPERATOR DETAILS" color="orange">
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="OPERATOR NAME"
                  placeholder="Enter full name..."
                  color="orange"
                  value={formData.operatorName}
                  onChange={(e) =>
                    setFormData((d) => ({
                      ...d,
                      operatorName: e.target.value,
                    }))
                  }
                  error={errors.operatorName}
                />
                <InputField
                  label="OPERATOR ID"
                  placeholder="XX-XXXX"
                  color="orange"
                  value={formData.operatorId}
                  onChange={(e) =>
                    setFormData((d) => ({
                      ...d,
                      operatorId: e.target.value,
                    }))
                  }
                  error={errors.operatorId}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectMenu
                  label="EVANGELION UNIT"
                  options={unitOptions}
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, unit: e.target.value }))
                  }
                  color="cyan"
                />
                <SelectMenu
                  label="PRIORITY LEVEL"
                  options={priorityOptions}
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData((d) => ({
                      ...d,
                      priority: e.target.value,
                    }))
                  }
                  color="green"
                />
              </div>

              <Textarea
                label="MISSION NOTES"
                placeholder="Additional instructions..."
                color="cyan"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, notes: e.target.value }))
                }
                hint="OPTIONAL — 256 CHARACTER LIMIT"
                rows={3}
              />

              <Divider label="AUTHORIZATION" color="orange" />

              <RadioGroup
                label="CLEARANCE LEVEL"
                options={[
                  { value: "standard", label: "STANDARD" },
                  { value: "elevated", label: "ELEVATED" },
                  { value: "commander", label: "COMMANDER ONLY" },
                ]}
                value={formData.clearanceLevel}
                onChange={(v) =>
                  setFormData((d) => ({ ...d, clearanceLevel: v }))
                }
                color="cyan"
                direction="horizontal"
              />

              <div className="flex items-center gap-6">
                <Checkbox
                  label="CONFIRM AUTHORIZATION"
                  checked={formData.confirmAuth}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, confirmAuth: e.target.checked }))
                  }
                  color="orange"
                />
                <Toggle
                  label="LIVE MONITORING"
                  checked={formData.liveMonitoring}
                  onChange={(v) =>
                    setFormData((d) => ({ ...d, liveMonitoring: v }))
                  }
                  color="green"
                />
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="text-eva-red text-[10px] font-mono uppercase tracking-wider">
                  ⚠ {Object.values(errors).length} VALIDATION ERROR
                  {Object.values(errors).length > 1 ? "S" : ""} — RESOLVE
                  BEFORE SUBMISSION
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={loading}
                >
                  SUBMIT DISPATCH ORDER
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFormData({
                      operatorName: "",
                      operatorId: "",
                      unit: "",
                      priority: "",
                      notes: "",
                      clearanceLevel: "standard",
                      confirmAuth: false,
                      liveMonitoring: false,
                    });
                    setErrors({});
                    setSubmitted(false);
                    setOutputLines([]);
                  }}
                >
                  CLEAR FORM
                </Button>
              </div>
            </div>
          </TargetingContainer>
        </div>

        {/* Output terminal */}
        <div className="col-span-full md:col-span-5 p-6 space-y-4">
          <TargetingContainer
            label="TRANSMISSION OUTPUT"
            color={submitted ? "green" : "cyan"}
          >
            {submitted ? (
              <div className="relative">
                <TerminalDisplay
                  lines={outputLines}
                  color="green"
                  title="DISPATCH CONFIRMATION"
                  typewriter
                  maxHeight="300px"
                  showLineNumbers
                />
                <div className="relative h-40 overflow-hidden">
                  <StatusStamp text="APPROVED" color="green" bordered rotation={-8} />
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="text-eva-mid-gray font-mono text-sm uppercase tracking-wider">
                  AWAITING FORM SUBMISSION...
                </div>
                <div className="text-eva-mid-gray/50 font-mono text-[10px] mt-2">
                  DISPATCH OUTPUT WILL APPEAR HERE
                </div>
              </div>
            )}
          </TargetingContainer>

          {/* Operator profile card */}
          {formData.operatorName && (
            <PilotCard
              designation="OPERATOR"
              name={formData.operatorName.toUpperCase() || "—"}
              unit={formData.unit || undefined}
              color="orange"
              checkStatus={submitted ? "O.K." : "SYNC"}
              fields={[
                { label: "ID", value: formData.operatorId || "—", status: formData.operatorId ? "ok" : "unknown" },
                { label: "PRIORITY", value: formData.priority || "—", status: formData.priority === "CRITICAL" ? "critical" : formData.priority === "HIGH" ? "warning" : "ok" },
              ]}
            />
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <SystemDialog
        open={showConfirm}
        title="CONFIRM DISPATCH ORDER"
        severity="warning"
        acceptText="TRANSMIT"
        declineText="ABORT"
        onAccept={handleConfirm}
        onDecline={() => setShowConfirm(false)}
        onClose={() => setShowConfirm(false)}
      >
        <div className="text-eva-white font-mono text-sm space-y-2">
          <p>
            Deploying{" "}
            <span className="text-eva-cyan">{formData.unit || "N/A"}</span>{" "}
            at priority{" "}
            <span className="text-eva-orange">
              {formData.priority || "N/A"}
            </span>
            .
          </p>
          <p className="text-eva-mid-gray text-xs">
            This action will be logged and transmitted to Central Dogma.
          </p>
        </div>
      </SystemDialog>
    </div>
  );
}
