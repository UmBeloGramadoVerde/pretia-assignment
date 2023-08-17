import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { ReactNode } from "react";
import { useWindowWidth } from "@react-hook/window-size";

export interface DynamicTableCol {
  header: string;
  dataKey: string;
  showOnMobile?: boolean;
  render?: (data: any) => ReactNode;
}
interface DynamicTableProps {
  data: any[];
  cols: DynamicTableCol[];
}

export const DynamicTable: React.FC<DynamicTableProps> = ({ data, cols }) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 768;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {cols.map((col, index) =>
            !isMobile || col.showOnMobile ? (
              <TableHead key={index}>{col.header}</TableHead>
            ) : null
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={i}>
            {cols.map((col, index) =>
              !isMobile || col.showOnMobile ? (
                <TableCell key={index}>
                  {col.render ? col.render(item) : item[col.dataKey]}
                </TableCell>
              ) : null
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
