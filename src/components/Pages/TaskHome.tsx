import UserInfo from "../UserInfo/UserInfo";
const TaskHome = () => {
  return (
    <div>
      <UserInfo user={{ name: "John Doe", points: 100, id: "userId" }} />
    </div>
  );
};

export default TaskHome;
