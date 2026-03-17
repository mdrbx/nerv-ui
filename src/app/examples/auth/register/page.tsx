"use client";

import { useState } from "react";
import Link from "next/link";
import { MonitorOverlay } from "@/components/MonitorOverlay";
import { InputField } from "@/components/InputField";
import { SelectMenu } from "@/components/SelectMenu";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";

const departmentOptions = [
  { value: "operations", label: "OPERATIONS" },
  { value: "technical", label: "TECHNICAL" },
  { value: "science", label: "SCIENCE" },
  { value: "command", label: "COMMAND" },
  { value: "medical", label: "MEDICAL" },
];

const clearanceOptions = [
  { value: "1", label: "LEVEL 1" },
  { value: "2", label: "LEVEL 2" },
  { value: "3", label: "LEVEL 3" },
  { value: "4", label: "LEVEL 4" },
];

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [clearance, setClearance] = useState("");
  const [acceptCode, setAcceptCode] = useState(false);
  const [acceptClassification, setAcceptClassification] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-nerv-black py-8">
      <MonitorOverlay
        color="orange"
        opacity={0.24}
        density="normal"
        className="absolute inset-0"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="border border-nerv-mid-gray/30 bg-nerv-dark-gray/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.24em] text-nerv-orange">
                REGISTRATION DIVISION
              </div>
              <h1
                className="mt-3 text-3xl font-black uppercase tracking-[0.2em] text-nerv-white"
                style={{ fontFamily: "var(--font-nerv-display)" }}
              >
                PERSONNEL INTAKE
              </h1>
              <p className="mt-3 font-mono text-xs leading-relaxed text-nerv-white/65">
                New personnel registration is handled like an intake terminal:
                identity, department, clearance and protocol acknowledgement in one
                controlled dossier.
              </p>
            </div>

            <div className="border border-nerv-mid-gray/30 bg-nerv-black/80 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-nerv-cyan">
                DOSSIER CHECKLIST
              </div>
              <div className="mt-3 space-y-2 font-mono text-xs text-nerv-white/70">
                <div className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                  <span>IDENTITY FIELDS</span>
                  <span className="text-nerv-green">REQUIRED</span>
                </div>
                <div className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                  <span>DEPARTMENT</span>
                  <span className="text-nerv-cyan">MANDATORY</span>
                </div>
                <div className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                  <span>CLEARANCE</span>
                  <span className="text-nerv-orange">DECLARED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>REVIEW MODE</span>
                  <span className="text-nerv-red">MANUAL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-nerv-orange/30 bg-nerv-black/80">
            <div className="border-b border-nerv-orange/30 px-6 py-5 sm:px-8">
              <div className="text-[10px] uppercase tracking-[0.24em] text-nerv-white/35">
                NERV HEADQUARTERS / PERSONNEL ONBOARDING
              </div>
              <h2
                className="mt-2 text-4xl font-black uppercase tracking-[0.22em] text-nerv-orange"
                style={{ fontFamily: "var(--font-nerv-display)" }}
              >
                REGISTRATION DOSSIER
              </h2>
            </div>

            <div className="space-y-5 px-6 py-6 sm:px-8">
              <Divider label="IDENTITY VERIFICATION" color="orange" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="FIRST NAME"
                  placeholder="Enter first name..."
                  color="orange"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <InputField
                  label="LAST NAME"
                  placeholder="Enter last name..."
                  color="orange"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <InputField
                label="OPERATOR ID"
                placeholder="Enter operator ID..."
                color="orange"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
              />

              <InputField
                label="EMAIL ADDRESS"
                placeholder="Enter email address..."
                color="orange"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                label="ACCESS CODE"
                placeholder="Enter access code..."
                color="orange"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <InputField
                label="CONFIRM ACCESS CODE"
                placeholder="Confirm access code..."
                color="orange"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectMenu
                  label="DEPARTMENT"
                  options={departmentOptions}
                  placeholder="SELECT DEPARTMENT..."
                  color="orange"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />

                <SelectMenu
                  label="CLEARANCE LEVEL"
                  options={clearanceOptions}
                  placeholder="SELECT CLEARANCE..."
                  color="orange"
                  value={clearance}
                  onChange={(e) => setClearance(e.target.value)}
                />
              </div>

              <div className="space-y-3 border border-nerv-mid-gray/20 bg-nerv-dark-gray/50 px-4 py-4">
                <Checkbox
                  label="I ACCEPT THE NERV PERSONNEL CODE OF CONDUCT"
                  checked={acceptCode}
                  onChange={(e) => setAcceptCode(e.target.checked)}
                  color="orange"
                />

                <Checkbox
                  label="I ACKNOWLEDGE CLASSIFICATION PROTOCOLS"
                  checked={acceptClassification}
                  onChange={(e) => setAcceptClassification(e.target.checked)}
                  color="orange"
                />
              </div>

              <Button
                variant="primary"
                onClick={handleRegister}
                loading={loading}
                className="w-full"
              >
                REGISTER DOSSIER
              </Button>

              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-nerv-white/40">
                Already registered?{" "}
                <Link href="/examples/auth/login" className="text-nerv-orange hover:underline">
                  Access terminal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-nerv-mid-gray/50">
          NERV HEADQUARTERS — REGISTRATION DIVISION
        </p>
      </div>
    </div>
  );
}
