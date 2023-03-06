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

interface Document {
  node_uuid?: string;
  name: string;
}

interface Word {
  node_uuid?: string;
  name: string;
}
