import User from "./User";
import { User as UserModel } from "../models/User";
import "./UserList.css";

interface ContainerProps {
  users: UserModel[];
}

const UserList: React.FC<ContainerProps> = ({ users }) => {
  return (
    <div className="container">
      User List
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {!!users &&
            users.map((user) => (
              <User user={user} key={`user-${user["id"]}`} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
