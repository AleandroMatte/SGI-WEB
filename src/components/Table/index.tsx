import { AgGridReact } from "ag-grid-react";
import { themeBalham } from "ag-grid-community";

interface AgTableProps {
  rowData: object[];
  columnDefinition: object[];
}
/**
 * AUTHOR - ALEANDRO MATTEONI
 * A tipagem deste componente é complicada, leia a documentação
 * @url https://www.ag-grid.com/react-data-grid/react-hooks/
 */
export default function AgTable({ rowData, columnDefinition }: AgTableProps) {
  return (
    // Data Grid will fill the size of the parent container
    <div style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefinition}
        theme={themeBalham}
      />
    </div>
  );
}
