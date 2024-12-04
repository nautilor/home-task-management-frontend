import UserInfo from "../../UserInfo/UserInfo";
import Header from "../../Header/Header";
import { useCallback, useEffect, useState } from "react";
import { Api, Reward, User } from "../../Api.ts";
import "./RewardPage.scss";
import { useNavigate } from "react-router-dom";
import RewardContainer from "@/components/RewardContainer/RewardContainer.tsx";

const RewardPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);

  const loadData = useCallback(async () => {
    const users = await Api.getUsers();
    const rewards = await Api.getRewards();
    setUsers(users);
    setRewards(rewards);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onReload = async () => {
    await loadData();
  };

  const goHome = () => navigate("/");

  const renderUsers = () =>
    users.map((user) => <UserInfo key={user.id} user={user} />);

  return (
    <div>
      <Header hideAddButton={true} goBack={goHome} />
      <div className={"user-info-container"}>{renderUsers()}</div>
      <RewardContainer users={users} onReload={onReload} rewards={rewards} />
    </div>
  );
};

export default RewardPage;
