export interface EurRates {
  [currency: string]: number | null;
}
export interface Transaction {
  id: string;
  timestamp: string;
  type: string;
  status: string;
  currency: string;
  amount: number;
}
