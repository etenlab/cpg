import { useEffect, useState } from "react";
import { UserRepository } from "../services/db.service";
import useDbService from "./useDbService";
import {DiscussionRepository} from "../repositories/discussion/DiscussionRepository";

export default function useRepositories() {
  const { service } = useDbService();
  const [userRepository, setUserRepository] = useState<UserRepository>();
  const [discussionRepository, setDiscussionRepository] = useState<DiscussionRepository>();

  useEffect(() => {
    if (service?.dataSource) {
      setUserRepository(new UserRepository(service));
      setDiscussionRepository(new DiscussionRepository(service));
    }
  }, [service]);

  return { userRepository, discussionRepository };
}
