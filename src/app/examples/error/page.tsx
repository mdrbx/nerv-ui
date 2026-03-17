"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MonitorOverlay } from "@/components/MonitorOverlay";
import { SegmentDisplay } from "@/components/SegmentDisplay";
import { StatusStamp } from "@/components/StatusStamp";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";

export default function Error404Page() {
  return (
    <div className="relative min-h-screen flex flex-col bg-nerv-black overflow-hidden">
      <MonitorOverlay
        color="red"
        opacity={0.22}
        density="normal"
        variant="alert"
        className="absolute inset-0 z-0"
      />

      {/* Main centered content */}
      <div className="flex-1 flex items-center justify-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-8 max-w-lg w-full"
        >
          {/* Status stamp */}
          <StatusStamp
            text="SIGNAL LOST"
            color="red"
            bordered
            rotation={-8}
            visible
          />

          {/* 404 segment display */}
          <SegmentDisplay
            value={404}
            format="raw"
            digits={3}
            color="red"
            size="xl"
            label="ERROR CODE"
          />

          {/* Description text */}
          <div className="flex flex-col items-center gap-3 text-center">
            <p
              className="text-nerv-orange text-sm uppercase tracking-wider font-bold"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              DESIGNATED ROUTE NOT FOUND
            </p>
            <p className="text-nerv-mid-gray text-xs leading-relaxed max-w-sm">
              The requested resource could not be located within NERV systems.
            </p>
          </div>

          {/* Divider */}
          <Divider color="orange" variant="dashed" className="w-full" />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link href="/examples">
              <Button variant="primary" size="md">
                RETURN TO BASE
              </Button>
            </Link>
            <Button variant="ghost" size="md">
              REPORT ANOMALY
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
