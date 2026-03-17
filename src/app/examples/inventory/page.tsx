"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DataGrid } from "@/components/DataGrid";
import { Drawer } from "@/components/Drawer";
import { GradientStatusBar } from "@/components/GradientStatusBar";
import { InputField } from "@/components/InputField";
import { SelectMenu } from "@/components/SelectMenu";
import { SyncProgressBar } from "@/components/SyncProgressBar";
import { SystemDialog } from "@/components/SystemDialog";

// ─── Types ───

interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  status: "OPERATIONAL" | "MAINTENANCE" | "CRITICAL" | "RESERVED" | "DEPLETED";
  stockLevel: number;
  priority: "S" | "A" | "B" | "C";
  condition: number;
  specs: string;
  location: string;
  lastInspection: string;
}

// ─── Mock data ───

const equipmentData: EquipmentItem[] = [
  { id: "EQ-0001", name: "Progressive Knife Type-A", category: "WEAPONS", status: "OPERATIONAL", stockLevel: 84, priority: "A", condition: 92, specs: "Vibration freq: 2.4 GHz | Blade length: 1.8m | Material: Titanium-carbide composite", location: "ARMORY A-7", lastInspection: "2015-08-12" },
  { id: "EQ-0002", name: "Positron Rifle Mk.II", category: "WEAPONS", status: "MAINTENANCE", stockLevel: 32, priority: "S", condition: 58, specs: "Output: 180 GW | Charge time: 12s | Requires external power grid connection", location: "ARMORY B-3", lastInspection: "2015-08-10" },
  { id: "EQ-0003", name: "A.T. Field Generator", category: "SYSTEMS", status: "OPERATIONAL", stockLevel: 96, priority: "S", condition: 97, specs: "Phase space density: 4.2x10^8 | Barrier strength: Class-S | Auto-calibrating", location: "CAGE SYSTEMS", lastInspection: "2015-08-14" },
  { id: "EQ-0004", name: "LCL Supply Tank", category: "MEDICAL", status: "OPERATIONAL", stockLevel: 72, priority: "A", condition: 85, specs: "Capacity: 2400L | Purity: 99.97% | Temperature: 36.5C +/- 0.2C", location: "LCL PLANT-02", lastInspection: "2015-08-13" },
  { id: "EQ-0005", name: "Neural Interface Plug", category: "SYSTEMS", status: "OPERATIONAL", stockLevel: 88, priority: "S", condition: 94, specs: "Sync bandwidth: 12.8 Tbps | Latency: <0.3ms | Bio-feedback enabled", location: "CAGE-01", lastInspection: "2015-08-14" },
  { id: "EQ-0006", name: "Umbilical Cable 200m", category: "SUPPORT", status: "RESERVED", stockLevel: 45, priority: "B", condition: 76, specs: "Length: 200m | Power capacity: 450 MW | Quick-release connectors", location: "DEPLOY STATION C", lastInspection: "2015-08-11" },
  { id: "EQ-0007", name: "Pallet Rifle Type-20", category: "WEAPONS", status: "OPERATIONAL", stockLevel: 67, priority: "A", condition: 81, specs: "Caliber: 120mm | ROF: 600 rpm | Magazine: 480 rounds", location: "ARMORY A-3", lastInspection: "2015-08-12" },
  { id: "EQ-0008", name: "D-Type Equipment Set", category: "ARMOR", status: "CRITICAL", stockLevel: 12, priority: "S", condition: 34, specs: "Heat resistance: 3000C | Pressure rating: 8000 atm | Cooling system integrated", location: "SPECIAL STORAGE", lastInspection: "2015-08-09" },
  { id: "EQ-0009", name: "Restraint Armor Plate", category: "ARMOR", status: "OPERATIONAL", stockLevel: 78, priority: "A", condition: 88, specs: "Material: Layered composite | Coverage: Shoulder/chest | Weight: 1.2 tonnes", location: "CAGE ASSEMBLY", lastInspection: "2015-08-13" },
  { id: "EQ-0010", name: "Nerve Clip Sensor Array", category: "MEDICAL", status: "OPERATIONAL", stockLevel: 91, priority: "B", condition: 95, specs: "Channels: 256 | Resolution: 0.01mV | Wireless telemetry", location: "MEDICAL BAY-01", lastInspection: "2015-08-14" },
  { id: "EQ-0011", name: "S2 Engine Containment", category: "SYSTEMS", status: "RESERVED", stockLevel: 100, priority: "S", condition: 99, specs: "Containment field: 9.8x10^12 Pa | Backup power: 72hr | Triple-redundant seals", location: "TERMINAL DOGMA", lastInspection: "2015-08-14" },
  { id: "EQ-0012", name: "Emergency Battery Pack", category: "SUPPORT", status: "DEPLETED", stockLevel: 8, priority: "A", condition: 22, specs: "Capacity: 5 min operation | Output: 320 MW | Quick-swap compatible", location: "DEPLOY STATION A", lastInspection: "2015-08-08" },
];

const categoryOptions = [
  { value: "ALL", label: "ALL CATEGORIES" },
  { value: "WEAPONS", label: "WEAPONS" },
  { value: "ARMOR", label: "ARMOR" },
  { value: "SYSTEMS", label: "SYSTEMS" },
  { value: "MEDICAL", label: "MEDICAL" },
  { value: "SUPPORT", label: "SUPPORT" },
];

const priorityOptions = [
  { value: "S", label: "S - CRITICAL" },
  { value: "A", label: "A - HIGH" },
  { value: "B", label: "B - STANDARD" },
  { value: "C", label: "C - LOW" },
];

const statusVariantMap: Record<EquipmentItem["status"], "success" | "warning" | "danger" | "info" | "default"> = {
  OPERATIONAL: "success",
  MAINTENANCE: "warning",
  CRITICAL: "danger",
  RESERVED: "info",
  DEPLETED: "danger",
};

const conditionZones = [
  { start: 0, end: 25, color: "#FF0000", label: "CRITICAL" },
  { start: 25, end: 50, color: "#FF4400", label: "POOR" },
  { start: 50, end: 75, color: "#FF9900", label: "FAIR" },
  { start: 75, end: 100, color: "#00FF00", label: "GOOD" },
];

// ─── Component ───

export default function EquipmentRequisition() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);

  // New requisition form state
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPriority, setNewPriority] = useState("");

  const filteredData = useMemo(() => {
    return equipmentData.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "ALL" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  // Transform data for DataGrid (it expects Record<string, string | number>[])
  const gridData = filteredData.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    status: item.status,
    stockLevel: item.stockLevel,
    priority: item.priority,
  }));

  const handleRowAction = (index: number) => {
    const item = filteredData[index];
    if (item) {
      setSelectedItem(item);
      setDrawerOpen(true);
    }
  };

  const handleNewRequisition = () => {
    setNewName("");
    setNewCategory("");
    setNewPriority("");
    setDialogOpen(true);
  };

  const priorityColor = (p: string) => {
    switch (p) {
      case "S": return "text-nerv-red";
      case "A": return "text-nerv-orange";
      case "B": return "text-nerv-cyan";
      default: return "text-nerv-green";
    }
  };

  return (
    <div className="min-h-screen bg-nerv-black">
      {/* ═══════ HEADER ═══════ */}
      <div className="border-b border-nerv-orange px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-3">
          <h1
            className="text-xl sm:text-2xl uppercase tracking-[0.2em] text-nerv-orange font-bold"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            EQUIPMENT REQUISITION SYSTEM
          </h1>
          <Badge label="LEVEL 3 CLEARANCE" variant="warning" size="sm" />
        </div>
        <p className="text-[10px] font-mono text-nerv-white/50">
          NERV LOGISTICS — ARMORY & SUPPLY MANAGEMENT — AUTHORIZED PERSONNEL ONLY
        </p>
      </div>

      {/* ═══════ SEARCH / FILTER BAR ═══════ */}
      <div className="border-b border-nerv-orange/30 px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5">
            <InputField
              label="SEARCH EQUIPMENT"
              placeholder="ENTER DESIGNATION OR ID..."
              color="cyan"
              size="sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="sm:col-span-4">
            <SelectMenu
              label="CATEGORY FILTER"
              options={categoryOptions}
              color="cyan"
              size="sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
          </div>
          <div className="sm:col-span-3 flex items-end">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={handleNewRequisition}
            >
              + NEW REQUISITION
            </Button>
          </div>
        </div>
      </div>

      {/* ═══════ STATS ROW ═══════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-b border-nerv-orange/30">
        {[
          { label: "TOTAL ITEMS", value: String(equipmentData.length), color: "text-nerv-cyan", sub: "REGISTERED EQUIPMENT" },
          { label: "OPERATIONAL", value: String(equipmentData.filter((e) => e.status === "OPERATIONAL").length), color: "text-nerv-green", sub: "READY FOR DEPLOYMENT" },
          { label: "MAINTENANCE", value: String(equipmentData.filter((e) => e.status === "MAINTENANCE" || e.status === "CRITICAL").length), color: "text-nerv-orange", sub: "REQUIRES ATTENTION" },
          { label: "CRITICAL STOCK", value: String(equipmentData.filter((e) => e.stockLevel < 20).length), color: "text-nerv-red", sub: "BELOW THRESHOLD" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="px-4 sm:px-6 py-4 border-r border-nerv-orange/10 last:border-r-0"
          >
            <div
              className="text-[10px] uppercase tracking-[0.15em] text-nerv-white/40 font-bold mb-1"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              {kpi.label}
            </div>
            <div
              className={`text-2xl sm:text-3xl font-bold tabular-nums ${kpi.color}`}
              style={{ fontFamily: "var(--font-nerv-mono)" }}
            >
              {kpi.value}
            </div>
            <div className="text-[9px] font-mono text-nerv-white/30 mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* ═══════ MAIN DATA GRID ═══════ */}
      <div className="p-4 sm:p-6">
        <div className="bg-nerv-black border border-nerv-mid-gray">
          {/* Custom title bar */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-nerv-mid-gray bg-nerv-dark-gray">
            <span
              className="text-xs uppercase tracking-[0.2em] font-bold text-nerv-orange"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              EQUIPMENT INVENTORY
            </span>
            <span className="text-[10px] font-mono text-nerv-mid-gray">
              {filteredData.length} / {equipmentData.length} ENTRIES
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse"
              style={{ fontFamily: "var(--font-nerv-mono)" }}
            >
              <thead className="sticky top-0 z-10">
                <tr className="bg-nerv-orange text-nerv-black">
                  <th className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-left border-r border-black/20 w-12" style={{ fontFamily: "var(--font-nerv-display)" }}>#</th>
                  <th className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-left border-r border-black/20" style={{ fontFamily: "var(--font-nerv-display)", width: "90px" }}>ID</th>
                  <th className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-left border-r border-black/20" style={{ fontFamily: "var(--font-nerv-display)" }}>NAME</th>
                  <th className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-left border-r border-black/20" style={{ fontFamily: "var(--font-nerv-display)", width: "100px" }}>CATEGORY</th>
                  <th className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-center border-r border-black/20" style={{ fontFamily: "var(--font-nerv-display)", width: "110px" }}>STATUS</th>
                  <th className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-left border-r border-black/20" style={{ fontFamily: "var(--font-nerv-display)", width: "200px" }}>STOCK LEVEL</th>
                  <th className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-center border-r border-black/20" style={{ fontFamily: "var(--font-nerv-display)", width: "70px" }}>PRIORITY</th>
                  <th className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-center" style={{ fontFamily: "var(--font-nerv-display)", width: "90px" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, i) => (
                  <tr
                    key={item.id}
                    className="group text-nerv-orange hover:bg-nerv-orange hover:text-nerv-black border-b border-nerv-mid-gray/30 transition-colors duration-75 cursor-default text-xs"
                  >
                    <td className="px-3 py-1.5 text-nerv-mid-gray border-r border-nerv-mid-gray/20">
                      {String(i + 1).padStart(3, "0")}
                    </td>
                    <td className="px-3 py-1.5 border-r border-nerv-mid-gray/20 whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-3 py-1.5 border-r border-nerv-mid-gray/20 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-3 py-1.5 border-r border-nerv-mid-gray/20 whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-3 py-2 border-r border-nerv-mid-gray/20 text-center">
                      <Badge
                        label={item.status}
                        variant={statusVariantMap[item.status]}
                        size="sm"
                      />
                    </td>
                    <td className="px-3 py-1.5 border-r border-nerv-mid-gray/20">
                      <SyncProgressBar
                        value={item.stockLevel}
                        showPercentage
                        blocks={10}
                        blockHeight={8}
                      />
                    </td>
                    <td className={`px-3 py-1.5 border-r border-nerv-mid-gray/20 text-center font-bold ${priorityColor(item.priority)}`}>
                      {item.priority}
                    </td>
                    <td className="px-3 py-1.5 text-center">
                      <button
                        type="button"
                        onClick={() => handleRowAction(i)}
                        className="text-nerv-cyan transition-colors text-[10px] uppercase tracking-wider font-bold cursor-pointer group-hover:text-nerv-black hover:text-nerv-black"
                        style={{ fontFamily: "var(--font-nerv-display)" }}
                      >
                        [INSPECT]
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-3 py-1 border-t border-nerv-mid-gray bg-nerv-dark-gray text-[10px] font-mono text-nerv-mid-gray">
            <span>ROWS: {filteredData.length}</span>
            <span>LAST SYNC: {new Date().toISOString().split("T")[0]}</span>
          </div>
        </div>
      </div>

      {/* ═══════ FOOTER ═══════ */}
      <div className="border-t border-nerv-white/10 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
        <span className="text-[9px] font-mono text-nerv-white/30">
          NERV LOGISTICS DIVISION — EQUIPMENT REQUISITION SYSTEM v2.4.1
        </span>
        <span className="text-[9px] font-mono text-nerv-white/30">
          MAGI AUTHORIZATION: VALIDATED — CLEARANCE LEVEL: 3
        </span>
      </div>

      {/* ═══════ NEW REQUISITION DIALOG ═══════ */}
      <SystemDialog
        open={dialogOpen}
        title="NEW EQUIPMENT REQUISITION"
        severity="warning"
        acceptText="SUBMIT REQUISITION"
        declineText="CANCEL"
        onAccept={() => setDialogOpen(false)}
        onDecline={() => setDialogOpen(false)}
        onClose={() => setDialogOpen(false)}
      >
        <div className="flex flex-col gap-5">
          <p className="text-[10px] text-nerv-white/50 uppercase tracking-wider" style={{ fontFamily: "var(--font-nerv-display)" }}>
            FILL ALL FIELDS TO SUBMIT A NEW EQUIPMENT REQUISITION ORDER. ALL REQUESTS REQUIRE MAGI AUTHORIZATION.
          </p>
          <InputField
            label="EQUIPMENT DESIGNATION"
            placeholder="ENTER EQUIPMENT NAME..."
            color="orange"
            size="sm"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <SelectMenu
            label="CATEGORY"
            options={categoryOptions.filter((o) => o.value !== "ALL")}
            color="orange"
            size="sm"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <SelectMenu
            label="PRIORITY LEVEL"
            options={priorityOptions}
            color="orange"
            size="sm"
            placeholder="SELECT PRIORITY..."
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
          />
        </div>
      </SystemDialog>

      {/* ═══════ EQUIPMENT DETAIL DRAWER ═══════ */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        side="right"
        width="480px"
        title="EQUIPMENT INSPECTION"
        color="cyan"
      >
        {selectedItem && (
          <div className="flex flex-col gap-5">
            {/* Item header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <div
                  className="text-lg font-bold text-nerv-cyan uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-nerv-display)" }}
                >
                  {selectedItem.name}
                </div>
                <div className="text-[10px] font-mono text-nerv-mid-gray mt-1">
                  {selectedItem.id} — {selectedItem.category}
                </div>
              </div>
              <Badge
                label={selectedItem.status}
                variant={statusVariantMap[selectedItem.status]}
                size="md"
              />
            </div>

            {/* Specs card */}
            <Card title="TECHNICAL SPECIFICATIONS">
              <div className="flex flex-col gap-3">
                {selectedItem.specs.split(" | ").map((spec) => (
                  <div key={spec} className="flex items-start gap-2">
                    <span className="text-nerv-cyan text-[10px] mt-0.5" style={{ fontFamily: "var(--font-nerv-mono)" }}>&#9654;</span>
                    <span className="text-xs font-mono text-nerv-white/80">{spec}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Condition level */}
            <div className="border border-nerv-mid-gray p-4 bg-nerv-dark-gray">
              <GradientStatusBar
                label="EQUIPMENT CONDITION"
                sublabel={`LAST INSPECTION: ${selectedItem.lastInspection}`}
                value={selectedItem.condition}
                min={0}
                max={100}
                zones={conditionZones}
                color={selectedItem.condition >= 75 ? "green" : selectedItem.condition >= 50 ? "orange" : "red"}
              />
            </div>

            {/* Stock level */}
            <div className="border border-nerv-mid-gray p-4 bg-nerv-dark-gray">
              <SyncProgressBar
                label="CURRENT STOCK LEVEL"
                value={selectedItem.stockLevel}
                showPercentage
                blocks={20}
                blockHeight={12}
              />
            </div>

            {/* Detail fields */}
            <Card title="LOGISTICS DATA">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "LOCATION", value: selectedItem.location },
                  { label: "PRIORITY", value: `CLASS ${selectedItem.priority}` },
                  { label: "LAST INSPECTION", value: selectedItem.lastInspection },
                  { label: "CATEGORY", value: selectedItem.category },
                ].map((field) => (
                  <div key={field.label} className="flex flex-col gap-1">
                    <span
                      className="text-[9px] uppercase tracking-[0.15em] text-nerv-white/40 font-bold"
                      style={{ fontFamily: "var(--font-nerv-display)" }}
                    >
                      {field.label}
                    </span>
                    <span
                      className="text-xs font-mono text-nerv-cyan"
                      style={{ fontFamily: "var(--font-nerv-mono)" }}
                    >
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action buttons */}
            <div className="flex gap-3 mt-2">
              <Button variant="primary" size="sm" fullWidth>
                REQUEST RESUPPLY
              </Button>
              <Button variant="danger" size="sm" fullWidth>
                FLAG FOR REVIEW
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
