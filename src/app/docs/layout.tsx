import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-eva-black">
      <DocsSidebar />
      <main className="lg:pl-64 pt-12 lg:pt-0">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
