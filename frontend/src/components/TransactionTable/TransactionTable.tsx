import { EurRates, Transaction } from "@/types/transactions";
import { applyPrecision, formatDate } from "@/utils";
import { DynamicTable, DynamicTableCol } from "@/components/DynamicTable/DynamicTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip"

interface TransactionTableProps {
  transactions: Transaction[];
  eurRates: EurRates;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  eurRates,
}) => {
  const calculateEuroEquivalent = (
    currency: string,
    amount: number
  ): string | number | null => {
    const euroRate = eurRates[currency];
    return euroRate !== null && euroRate !== undefined
      ? applyPrecision(amount * euroRate)
      : null;
  };

  const cols: DynamicTableCol[] = [
    {
      header: "Timestamp",
      dataKey: "",
      render: (transaction: Transaction) => formatDate(transaction.timestamp),
    },
    {
      header: "Currency",
      dataKey: "currency",
    },
    {
      header: "Amount",
      dataKey: "",
      showOnMobile: true,
      render: (transaction: Transaction) =>
        `${transaction.amount} ${transaction.currency}`,
    },
    {
      header: "EUR Equivalent",
      dataKey: "",
      render: (transaction: Transaction) => {
        const eurEquiv = calculateEuroEquivalent(
          transaction.currency,
          transaction.amount
        );
        return eurEquiv ? (
          `${calculateEuroEquivalent(
            transaction.currency,
            transaction.amount
          )} €`
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
    {
      header: "Type",
      dataKey: "type",
      showOnMobile: true,
    },
    {
      header: "Status",
      dataKey: "status",
      showOnMobile: true,
    },
  ];

  return (
    <div>
      <DynamicTable data={transactions} cols={cols} />
    </div>
  );
};

export default TransactionTable;
