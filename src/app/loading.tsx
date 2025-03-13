"use client";

import Spinner from "@/components/shared/Spinner";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center absolute inset-0 top-0 left-0">
      <div className="flex gap-4">
        <Spinner size="lg" />
        <Spinner size="lg" />
        <Spinner size="lg" />
        <Spinner size="lg" />
      </div>
    </div>
  );
}
