import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import TableAddForm from "../../components/TableAddForm";
import TableList from "../../components/TableList";
import useNodeServices from "../../hooks/useNodeServices";
import { Node } from "../../models/node/node.entity";
import { tableNodeToTable } from "../../utils/table";
import "./Table.css";

const Table: React.FC = () => {
  const { nodeService } = useNodeServices();
  const [tables, setTables] = useState<Node[]>([]);
  const [currentTable, setCurrentTable] = useState<Table>();
  const [currentTableName, setCurrentTableName] = useState("");

  const getTables = () => {
    nodeService?.nodeRepo.listAllNodesByType("table").then((data) => {
      if (data) {
        setTables(data);
        if (!currentTable) {
          const table = tableNodeToTable(data[0]);
          setCurrentTable(table);
          setCurrentTableName(table.name);
        }
      }
    });
  };

  const handleTableChange = (tableName: string) => {
    setCurrentTableName(tableName);
    getCurrentTable(tableName);
  };

  const addTableHandler = (table_name: string) => {
    nodeService?.createTable(table_name).then((table) => {
      setTimeout(() => {
        getTables();
      }, 1000);
    });
  };

  const addTableDataHandler = async (table_cell: TableCell) => {
    try {
      if (!table_cell.column || !table_cell.row || !table_cell.data) {
        return;
      }

      const tableCell = await nodeService?.addTableData(
        currentTableName,
        table_cell.column,
        table_cell.row,
        table_cell.data
      );

      getCurrentTable(currentTableName);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentTable = (currentTableName: string) => {
    nodeService?.getTable(currentTableName).then((table) => {
      if (!table) {
        throw new Error(`Couldn't find the table '${currentTableName}'`);
      }
      setCurrentTable(table);
    });
  };

  useEffect(() => {
    getTables();
  }, [nodeService]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Crowd Peer Graph</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TableList currentTable={currentTable} />
        <TableAddForm
          tables={tables}
          addTableHandler={addTableHandler}
          addTableDataHandler={addTableDataHandler}
          handleTableChange={handleTableChange}
        />
      </IonContent>
    </IonPage>
  );
};

export default Table;
