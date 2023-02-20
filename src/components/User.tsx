import './User.css';
import { User as UserModel } from '../models/User';

interface ContainerProps {
  user: UserModel
}

const User: React.FC<ContainerProps> = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.age}</td>
    </tr>
  );
};

export default User;
