"use client";

import { NextStudio } from "next-sanity/studio/client-component";
import config from "@/sanity.config";

export default function StudioPage() {
  return (
    <div suppressHydrationWarning>
      <NextStudio config={config} />
    </div>
  );
}
