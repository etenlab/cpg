import "./TableList.css";
import { useEffect } from "react";

interface ContainerProps {
  currentTable?: Table;
}

const TableList: React.FC<ContainerProps> = ({ currentTable }) => {
  let table: any = [];
  let rows = new Set<string>();
  let cols = new Set<string>();
  currentTable?.cells?.forEach((cell) => {
    rows.add(cell.row ?? "");
    cols.add(cell.column ?? "");
  });
  for (let row of rows) {
      table[row] = [];
      for (let col of cols) table[row][col] = "";
  }
  currentTable?.cells?.forEach((cell) => {
    console.log(cell)
    table[cell.row ?? ""][cell.column ?? ""] = cell.data;
  });

  return (
    <div className="container">
      Table List
      <table className="table">
        <thead>
          <tr>
            {Array.from(cols).map((col, index) => <th key={`table-${currentTable?.id}-col${index}`}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {Object.values(table).map((row, index) => <tr key={`table-${currentTable?.id}-row${index}`}>
            {Object.values(row as Array<string>).map((data, tdId) => <td key={`table-${currentTable?.id}-row${index}-col${tdId}`}>{data}</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
