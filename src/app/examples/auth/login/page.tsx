"use client";

import { useState } from "react";
import { HexGridBackground } from "@/components/HexGridBackground";
import { InputField } from "@/components/InputField";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { StatusStamp } from "@/components/StatusStamp";
import { ClassifiedOverlay } from "@/components/ClassifiedOverlay";

export default function LoginExample() {
  const [operatorId, setOperatorId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showClassified, setShowClassified] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowClassified(true);
      setTimeout(() => {
        setShowClassified(false);
        setAuthenticated(true);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-eva-black">
      <HexGridBackground className="absolute inset-0 opacity-20" />

      {showClassified && (
        <ClassifiedOverlay
          text="ACCESS GRANTED"
          isUnlocked={false}
          className="fixed inset-0 z-50"
        />
      )}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-8">
        <div className="grid w-full gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="border border-eva-mid-gray/30 bg-eva-dark-gray/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.24em] text-eva-orange">
                ACCESS CHECKPOINT
              </div>
              <h1
                className="mt-3 text-3xl font-black uppercase tracking-[0.2em] text-eva-white"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                PERSONNEL GATE
              </h1>
              <p className="mt-3 font-mono text-xs leading-relaxed text-eva-white/65">
                Authentication is handled as a control-room checkpoint: operator ID,
                access code, session persistence and MAGI confirmation in a single rail.
              </p>
            </div>

            <div className="border border-eva-mid-gray/30 bg-eva-black/80 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-eva-cyan">
                REQUIREMENTS
              </div>
              <div className="mt-3 space-y-2 font-mono text-xs text-eva-white/70">
                <div className="flex items-center justify-between border-b border-eva-mid-gray/20 pb-2">
                  <span>TERMINAL STATE</span>
                  <span className="text-eva-green">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between border-b border-eva-mid-gray/20 pb-2">
                  <span>AUTH CHANNEL</span>
                  <span className="text-eva-cyan">MAGI LINK</span>
                </div>
                <div className="flex items-center justify-between border-b border-eva-mid-gray/20 pb-2">
                  <span>CLASSIFICATION</span>
                  <span className="text-eva-orange">LEVEL 02</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>FAIL MODE</span>
                  <span className="text-eva-red">LOCKDOWN</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-eva-orange/30 bg-eva-black/80">
            {authenticated ? (
              <div className="space-y-6 px-6 py-6 sm:px-8">
                <div className="relative h-28 overflow-hidden border border-eva-green/25 bg-eva-black/80">
                  <StatusStamp
                    text="ACCESS GRANTED"
                    color="green"
                    bordered
                    rotation={-6}
                    subtitle="CLEARANCE VERIFIED"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "OPERATOR", value: operatorId || "UNKNOWN", color: "text-eva-green" },
                    { label: "SESSION", value: "INITIALIZED", color: "text-eva-cyan" },
                    { label: "MAGI", value: "CONFIRMED", color: "text-eva-orange" },
                  ].map((item) => (
                    <div key={item.label} className="border border-eva-mid-gray/20 bg-eva-dark-gray/60 px-3 py-3">
                      <div className="text-[9px] uppercase tracking-[0.2em] text-eva-white/35">
                        {item.label}
                      </div>
                      <div className={`mt-2 font-mono text-sm ${item.color}`}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setAuthenticated(false);
                    setOperatorId("");
                    setAccessCode("");
                    setRemember(false);
                  }}
                >
                  DISCONNECT
                </Button>
              </div>
            ) : (
              <>
                <div className="border-b border-eva-orange/30 px-6 py-5 sm:px-8">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-eva-white/35">
                    NERV HEADQUARTERS / GEOFRONT LEVEL 02
                  </div>
                  <h2
                    className="mt-2 text-4xl font-black uppercase tracking-[0.24em] text-eva-orange"
                    style={{ fontFamily: "var(--font-eva-display)" }}
                  >
                    AUTH TERMINAL
                  </h2>
                </div>

                <div className="space-y-5 px-6 py-6 sm:px-8">
                  <Divider label="AUTHENTICATION REQUIRED" color="orange" />

                  <InputField
                    label="OPERATOR ID"
                    placeholder="Enter operator ID..."
                    color="orange"
                    value={operatorId}
                    onChange={(e) => setOperatorId(e.target.value)}
                  />

                  <InputField
                    label="ACCESS CODE"
                    placeholder="Enter access code..."
                    color="orange"
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                  />

                  <Checkbox
                    label="PERSIST THIS TERMINAL"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    color="orange"
                  />

                  <Button
                    variant="primary"
                    onClick={handleLogin}
                    loading={loading}
                    className="w-full"
                  >
                    AUTHENTICATE
                  </Button>

                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.16em] text-eva-white/40">
                    <button type="button" className="hover:text-eva-orange transition-colors">
                      Reset access code
                    </button>
                    <span className="text-eva-white/20">/</span>
                    <button type="button" className="hover:text-eva-orange transition-colors">
                      Request clearance
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-6 text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-eva-mid-gray/50">
          NERV HEADQUARTERS — GEOFRONT LEVEL 02
        </p>
      </div>
    </div>
  );
}
