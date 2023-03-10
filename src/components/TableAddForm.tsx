import React, { useState } from "react";
import "./TableAddForm.css";
import { Node } from "../models/node/node.entity";

interface ContainerProps {
  tables: Node[];
  addTableHandler: (tableName: string) => void;
  addTableDataHandler: (table_cell: TableCell) => void;
  handleTableChange: (value: string) => void;
}

const TableAddForm: React.FC<ContainerProps> = ({
  tables,
  addTableHandler,
  addTableDataHandler,
  handleTableChange,
}) => {
  const [tableName, setTableName] = useState("");
  const [tableCell, setTableCell] = useState({
    column: "",
    row: "",
    data: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableCell({
      ...tableCell,
      [e.target.name]: e.target.value,
    });
  };

  const tableNames = () => {
    return tables.map(
      (table) =>
        table.propertyKeys.find((key) => key.property_key === "name")
          ?.propertyValue?.property_value || ""
    );
  };

  return (
    <div className="container">
      Table Add Form
      <div className="table-add-form">
        <select onChange={(e) => handleTableChange(e.target.value)}>
          {tableNames().map((tableName) => (
            <option key={`table-${tableName}`}>{tableName}</option>
          ))}
        </select>
        <input
          type={"text"}
          placeholder="Table Name"
          name="table_name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <button onClick={() => addTableHandler(tableName)}>Add</button>
        <input
          type={"text"}
          placeholder="Column Name"
          name="column"
          value={tableCell.column}
          onChange={handleInputChange}
        />
        <input
          type={"text"}
          placeholder="Row ID"
          name="row"
          value={tableCell.row}
          onChange={handleInputChange}
        />
        <input
          type={"text"}
          min={0}
          placeholder="Data"
          name="data"
          value={tableCell.data}
          onChange={handleInputChange}
        />
        <button onClick={() => addTableDataHandler(tableCell)}>Add</button>
      </div>
    </div>
  );
};

export default TableAddForm;
