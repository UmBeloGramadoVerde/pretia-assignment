import { EurRates, Transaction } from "@/types/transactions";
import { useMemo, useState } from "react";

export function useSummary(transactions: Transaction[], eurRates: EurRates) {
  const [summaryArray, setSummaryArray] = useState<any[]>([]);
  const [summaryCurrency, setSummaryCurrency] = useState<any>({});

  // We use put this calculation inside a use memo since we have to reduce through
  // the whole transactions array and it is very expensive to do so, so momoizing
  // the calculation based on the transactions and eurRates variable is ideal
  useMemo(() => {
    const summary = transactions.reduce((acc, transaction) => {
      const { currency, amount, status, type } = transaction;
      const euroEquivalent = eurRates[currency];

      const completedWithdrawals = acc[currency]?.completedWithdrawals || 0;
      const completedDeposits = acc[currency]?.completedDeposits || 0;
      const pendingWithdrawals = acc[currency]?.pendingWithdrawals || 0;
      const pendingDeposits = acc[currency]?.pendingDeposits || 0;
      const totalBalance = acc[currency]?.totalBalance || 0;
      const balanceEurEquiv = acc[currency]?.balanceEurEquiv || null;

      if (status === "completed") {
        if (type === "withdrawal") {
          acc[currency] = {
            completedWithdrawals: completedWithdrawals + 1,
            completedDeposits,
            pendingWithdrawals,
            pendingDeposits,
            totalBalance,
            balanceEurEquiv,
          };
        } else if (type === "deposit") {
          acc[currency] = {
            completedWithdrawals,
            completedDeposits: completedDeposits + 1,
            pendingWithdrawals,
            pendingDeposits,
            totalBalance,
            balanceEurEquiv,
          };
        }

        const balanceUpdated =
          type === "withdrawal" ? totalBalance - amount : totalBalance + amount;

        acc[currency].totalBalance = balanceUpdated;
        if (euroEquivalent !== null && euroEquivalent !== undefined) {
          acc[currency].balanceEurEquiv = balanceUpdated * euroEquivalent;
        }
      } else if (status === "pending") {
        if (type === "withdrawal") {
          acc[currency] = {
            completedWithdrawals,
            completedDeposits,
            pendingWithdrawals: pendingWithdrawals + 1,
            pendingDeposits,
            totalBalance,
            balanceEurEquiv,
          };
        } else if (type === "deposit") {
          acc[currency] = {
            completedWithdrawals,
            completedDeposits,
            pendingWithdrawals,
            pendingDeposits: pendingDeposits + 1,
            totalBalance,
            balanceEurEquiv,
          };
        }
      }

      return acc;
    }, {} as { [currency: string]: any });
    setSummaryArray(
      Object.keys(summary).map((key) => ({ currency: key, ...summary[key] }))
    );
    setSummaryCurrency(summary)
  }, [transactions, eurRates]);

  return { summaryArray, summaryCurrency };
}
