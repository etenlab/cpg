import { dbService } from '..';
import './UserList.css';

interface ContainerProps { }

const UserList: React.FC<ContainerProps> = () => {

  dbService.status() // calling this function just to show this singleton being imported

  return (
    <div className="container">
      User List
    </div>
  );
};

export default UserList;
