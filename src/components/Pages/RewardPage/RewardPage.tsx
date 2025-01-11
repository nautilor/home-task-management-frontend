import UserInfo from "../../UserInfo/UserInfo";
import Header from "../../Header/Header";
import { useCallback, useEffect, useState } from "react";
import { Api, Reward, User } from "../../Api.ts";
import "./RewardPage.scss";
import RewardContainer from "@/components/RewardContainer/RewardContainer.tsx";

const RewardPage = () => {
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

  const renderUsers = () =>
    users.map((user) => <UserInfo key={user.id} user={user} />);

  return (
    <div>
      <Header hideAddButton={true} goBack={true}>
        <div className={"user-info-container"}>{renderUsers()}</div>
      </Header>
      <RewardContainer users={users} onReload={onReload} rewards={rewards} />
    </div>
  );
};

export default RewardPage;
