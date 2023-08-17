"use client";

const TransactionSummaryTable = React.lazy(
  () => import("@/components/TransactionSummaryTable/TransactionSummaryTable")
);
import { useTransactions } from "@/hooks/useTransactions";
import { useEurRates } from "@/hooks/useEurRates";
import React, { Suspense } from "react";
import { useMe } from "@/hooks/useMe";

export default function WritePostPage() {
  const data = useMe();
  console.debug("data", data);
  return <div className="flex justify-center"></div>;
}
