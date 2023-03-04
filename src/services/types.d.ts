interface Table {
  node_uuid?: string;
  name: string;
  cells?: TableCell[];
}

interface TableCell {
  column?: string;
  row?: string;
  data?: any;
}
