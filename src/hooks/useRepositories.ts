import { useEffect, useState } from "react";
import { UserRepository } from "../services/db.service";
import useDbService from "./useDbService";

export default function useRepositories() {
  const { service } = useDbService();
  const [userRepository, setUserRepository] = useState<UserRepository>();

  useEffect(() => {
    if (service?.dataSource) {
      setUserRepository(new UserRepository(service));
    }
  }, [service]);

  return { userRepository };
}
