import UserInfo from "../../UserInfo/UserInfo";
import Header from "../../Header/Header";
import { useCallback, useEffect, useState } from "react";
import { Api, Task, User } from "../../Api.ts";
import TaskContainer from "../../TaskContainer/TaskContainer.tsx";
import "./TaskPage.scss";
import { useParams } from "react-router-dom";

const TaskPage = () => {
  const { categoryId } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadData = useCallback(async () => {
    const users = await Api.getUsers();
    const tasks = await Api.getTasks(categoryId);
    setUsers(users);
    setTasks(tasks);
  }, [categoryId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onReload = async () => {
    await loadData();
  };

  const renderUsers = () =>
    users.map((user) => <UserInfo key={user.id} user={user} />);

  return (
    <div>
      <Header hideAddButton={true} />
      <div className={"user-info-container"}>{renderUsers()}</div>
      <TaskContainer users={users} onReload={onReload} tasks={tasks} />
    </div>
  );
};

export default TaskPage;
