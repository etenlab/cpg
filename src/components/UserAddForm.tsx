import { dbService } from '..';
import './UserAddForm.css';

interface ContainerProps { }

const UserAddForm: React.FC<ContainerProps> = () => {

  dbService.status() // call this function just to show this singleton being imported

  return (
    <div className="container">
      User Add Form
    </div>
  );
};

export default UserAddForm;
