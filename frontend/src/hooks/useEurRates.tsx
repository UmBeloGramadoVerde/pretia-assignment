import { EurRates } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

export function useEurRates() {
  const fetchEurRates = (): Promise<EurRates> => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/eur-rates`)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching euro rates:", error);
      });
  }

  return useQuery({
    queryKey: ['eurRates'],
    queryFn: () => fetchEurRates(),
  })
}
