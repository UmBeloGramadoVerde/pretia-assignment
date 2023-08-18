"use client";

import Loader from "@/components/Loader/Loader";
import React, { Suspense } from "react";

export default function HomePage() {
  const transactions: any[] = [];
  const eurRates = {};
  const centeredLoaderElement = (
    <div className="flex justify-center">
      <Loader />
    </div>
  );
  return (
    <div className="gap-5 flex flex-col">
    </div>
  );
}
