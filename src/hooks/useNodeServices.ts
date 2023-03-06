import { useEffect, useState } from "react";
import { NodeService } from "../services/node.service";
import useDbService from "./useDbService";

export default function useNodeServices() {
  const { service } = useDbService();
  const [nodeService, setNodeService] = useState<NodeService>();

  useEffect(() => {
    if (service?.dataSource) {
      setNodeService(new NodeService(service));
    }
  }, [service]);

  return { nodeService };
}
