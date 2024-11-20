import UserInfo from "../UserInfo/UserInfo";
import Header from "../Header/Header";
const TaskHome = () => {
  return (
    <div>
      <Header />
      <UserInfo user={{ name: "John Doe", points: 100, id: "userId" }} />
    </div>
  );
};

export default TaskHome;
