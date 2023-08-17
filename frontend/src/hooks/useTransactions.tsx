import { Transaction } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

export function useTransactions() {
  const fetchTransactions = (): Promise<Transaction[]> => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transactions`)
      .then((response) => response.json())
      .then((data) => data.transactions)
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(),
  });
}
