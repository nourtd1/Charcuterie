"use client";

import Link from "next/link";

export default function TopBar() {
  return (
    <div className="w-full bg-background/80 backdrop-blur border-b border-border/40">
      <div className="container mx-auto h-9 flex items-center justify-center text-xs text-muted-foreground">
        <span>charcuterie & alimentation certains</span>
      </div>
    </div>
  );
}


