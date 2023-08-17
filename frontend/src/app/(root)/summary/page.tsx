"use client";

const TransactionSummaryTable = React.lazy(
  () => import("@/components/TransactionSummaryTable/TransactionSummaryTable")
);
import { useTransactions } from "@/hooks/useTransactions";
import { useEurRates } from "@/hooks/useEurRates";
import Loader from "@/components/Loader/Loader";
import React, { Suspense } from "react";

export default function SummaryPage() {
  const { data: transactionsData, isLoading: loadingTransactions } =
    useTransactions();
  const transactions = transactionsData ?? [];
  const { data: eurRatesData, isLoading: loadingEurRates } = useEurRates();
  const eurRates = eurRatesData ?? {};
  const centeredLoaderElement = (
    <div className="flex justify-center">
      <Loader />
    </div>
  );
  return (
    <section className="gap-3 flex flex-col">
      <h2 className="text-xl">Transactions Summary Table</h2>
      <div className="px-5 py-3 border border-border rounded-md">
        {loadingTransactions || loadingEurRates ? (
          centeredLoaderElement
        ) : (
          <Suspense fallback={centeredLoaderElement}>
            <TransactionSummaryTable
              transactions={transactions}
              eurRates={eurRates}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
}
