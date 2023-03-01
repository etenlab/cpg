import './User.css';
import { User as UserModel } from '../models/User';

interface ContainerProps {
  user: UserModel
}

const User: React.FC<ContainerProps> = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
    </tr>
  );
};

export default User;
