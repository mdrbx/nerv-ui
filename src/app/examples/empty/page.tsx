"use client";

import Link from "next/link";
import { MonitorOverlay } from "@/components/MonitorOverlay";
import { WireframeLoader } from "@/components/WireframeLoader";
import { TargetingContainer } from "@/components/TargetingContainer";
import { Divider } from "@/components/Divider";
import { Button } from "@/components/Button";

export default function EmptyStatePage() {
  return (
    <div className="relative min-h-screen bg-nerv-black flex items-center justify-center overflow-hidden">
      <MonitorOverlay
        color="orange"
        opacity={0.2}
        density="sparse"
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <TargetingContainer label="EMPTY STATE" color="orange">
          <div className="flex flex-col items-center gap-6 py-8">
            {/* Spinning loader */}
            <WireframeLoader size={120} color="orange" label="" speed={3} />

            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl font-black uppercase tracking-[0.2em] text-nerv-mid-gray text-center"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              NO DATA AVAILABLE
            </h1>

            {/* Subtitle */}
            <p className="text-nerv-mid-gray/60 text-xs font-mono text-center uppercase tracking-wider">
              The requested dataset contains no entries
            </p>

            <Divider color="orange" variant="dashed" className="w-full" />

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button variant="primary" size="md">
                REFRESH DATA
              </Button>
              <Link href="/examples">
                <Button variant="ghost" size="md">
                  GO BACK
                </Button>
              </Link>
            </div>
          </div>
        </TargetingContainer>
      </div>
    </div>
  );
}
