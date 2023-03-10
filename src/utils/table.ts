import { Node } from '../models';

export const tableNodeToTable = (node: Node) => {
  const cells = node.node_relationships?.map((cell) => {
    let cell_data: TableCell = {};
    cell.toNode.propertyKeys.forEach((key) => {
      (cell_data as any)[key.property_key] = key.propertyValue.property_value;
    });
    return cell_data;
  });

  let name = '';
  node.propertyKeys.forEach((key) => {
    if (key.property_key === 'name') {
      name = key.propertyValue.property_value;
    }
  });

  return {
    id: node.id,
    name: name,
    cells: cells || [],
  };
};
