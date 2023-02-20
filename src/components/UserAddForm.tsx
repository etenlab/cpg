import { useState } from "react";
import "./UserAddForm.css";

interface ContainerProps {
  addUserHandler: (user: any) => void;
}

const UserAddForm: React.FC<ContainerProps> = ({ addUserHandler }) => {
  const [user, setUser] = useState({
    id: undefined,
    firstName: "",
    lastName: "",
    age: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      User Add Form
      <div className="user-add-form">
        <input
          type={"text"}
          placeholder="First Name"
          name="firstName"
          onChange={handleInputChange}
        />
        <input
          type={"text"}
          placeholder="Last Name"
          name="lastName"
          onChange={handleInputChange}
        />
        <input
          type={"number"}
          min={0}
          placeholder="Age"
          name="age"
          onChange={handleInputChange}
        />
        <button onClick={() => addUserHandler(user)}>Add</button>
      </div>
    </div>
  );
};

export default UserAddForm;
