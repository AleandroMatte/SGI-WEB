import { AgGridReact } from "ag-grid-react";
import {
  themeBalham,
  type GetRowIdFunc,
  type RowClickedEvent,
  type ThemeDefaultParams,
} from "ag-grid-community";

interface AgTableProps {
  rowData: object[];
  columnDefinition: object[];
  ref?: React.Ref<AgGridReact<object>>;
  getRowIdFunction?: GetRowIdFunc<any, any> | undefined;
  onRowClicked?: (event: RowClickedEvent<any, any>) => void;
  themeConfig?: Partial<ThemeDefaultParams>;
}
/**
 * AUTHOR - ALEANDRO MATTEONI
 * A tipagem deste componente é complicada, leia a documentação
 * @url https://www.ag-grid.com/react-data-grid/react-hooks/
 */
export default function AgTable({
  rowData,
  columnDefinition,
  ref,
  getRowIdFunction,
  onRowClicked,
  themeConfig,
}: AgTableProps) {
  const configuredTheme = themeConfig
    ? themeBalham.withParams(themeConfig)
    : themeBalham;
  return (
    // Data Grid will fill the size of the parent container
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefinition}
      theme={configuredTheme}
      ref={ref}
      gridOptions={{
        getRowId: getRowIdFunction,
        onRowClicked: onRowClicked,
        rowSelection: {
          mode: "singleRow",
          checkboxes: false,
          enableClickSelection: true,
        },
        autoSizeStrategy: {
          type: "fitCellContents",
        },
      }}
    />
  );
}
