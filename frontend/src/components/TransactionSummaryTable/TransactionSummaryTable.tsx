import { EurRates, Transaction } from "@/types/transactions";
import { useEffect } from "react";
import { applyPrecision } from "@/utils";
import { DynamicTable, DynamicTableCol } from "@/components/DynamicTable/DynamicTable";
import { useSummary } from "@/hooks/useSummary";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip"

interface TransactionSummaryTableProps {
  transactions: Transaction[];
  eurRates: EurRates;
}

const TransactionSummaryTable: React.FC<TransactionSummaryTableProps> = ({
  transactions,
  eurRates,
}) => {
  const { summaryArray } = useSummary(transactions, eurRates);

  const cols: DynamicTableCol[] = [
    {
      header: "Currency",
      dataKey: "currency",
      showOnMobile: true,
    },
    {
      header: "Completed Withdrawals",
      dataKey: "completedWithdrawals",
    },
    {
      header: "Completed Deposits",
      dataKey: "completedDeposits",
    },
    {
      header: "Pending Withdrawals",
      dataKey: "pendingWithdrawals",
    },
    {
      header: "Pending Deposits",
      dataKey: "pendingDeposits",
    },
    {
      header: "Balance",
      dataKey: "",
      showOnMobile: true,
      render: (summary: any) =>
        `${applyPrecision(summary.totalBalance)} ${summary.currency}`,
    },
    {
      header: "Balance EUR Equiv",
      dataKey: "",
      showOnMobile: true,
      render: (summary: any) => {
        return summary.balanceEurEquiv ? (
          `${applyPrecision(summary.balanceEurEquiv)} €`
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="pr-5">-</TooltipTrigger>
              <TooltipContent>
                <p>Conversion not available</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];

  return (
    <div>
      <DynamicTable data={summaryArray} cols={cols} />
    </div>
  );
};

export default TransactionSummaryTable;
