import UserInfo from "../../UserInfo/UserInfo";
import Header from "../../Header/Header";
import { useCallback, useEffect, useState } from "react";
import { Api, Task, User } from "../../Api.ts";
import TaskContainer from "../../TaskContainer/TaskContainer.tsx";
import "./TaskPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { householdPaths } from "@/components/Router.ts";

const TaskPage = () => {
  const navigate = useNavigate();
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

  const goHome = () => navigate(householdPaths.home);

  const renderUsers = () =>
    users.map((user) => <UserInfo key={user.id} user={user} />);

  return (
    <div>
      <Header hideAddButton={true} goBack={goHome}>
        <div className={"user-info-container"}>{renderUsers()}</div>
      </Header>
      <TaskContainer users={users} onReload={onReload} tasks={tasks} />
    </div>
  );
};

export default TaskPage;
