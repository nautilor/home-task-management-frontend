import UserInfo from "../UserInfo/UserInfo";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { Api, User } from "../Api.ts";
import "./TaskHome.scss";

const TaskHome = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await Api.getUsers();
      setUsers(users);
    };
    loadUsers();
  }, []);

  return (
    <div>
      <Header />
      <div className={"user-info-container"}>
        {users.map((user) => (
          <UserInfo key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default TaskHome;
