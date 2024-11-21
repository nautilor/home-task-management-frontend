import UserInfo from "../UserInfo/UserInfo";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { Api, Task, User } from "../Api.ts";
import "./TaskHome.scss";
import TaskInfo from "../TaskInfo/TaskInfo.tsx";

const TaskHome = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const users = await Api.getUsers();
      const tasks = await Api.getTasks();
      setUsers(users);
      setTasks(tasks);
    };
    loadData();
  }, []);

  const renderUsers = () =>
    users.map((user) => <UserInfo key={user.id} user={user} />);

  const renderTasks = () =>
    tasks.map((task) => <TaskInfo key={task.id} task={task} users={users} />);

  return (
    <div>
      <Header />
      <div className={"user-info-container"}>{renderUsers()}</div>
      <div className={"task-info-container"}>{renderTasks()}</div>
    </div>
  );
};

export default TaskHome;
