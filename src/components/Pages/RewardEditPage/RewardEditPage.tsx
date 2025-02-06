import Header from "@/components/Header/Header";
import "./RewardEditPage.scss";
import InsertReward from "../InsertElement/InsertReward";
import { useParams } from "react-router-dom";
import { Api, Reward } from "@/components/Api";
import { useCallback, useEffect, useState } from "react";

const RewardEditPage = () => {
  const { rewardId } = useParams();
  const [reward, setReward] = useState<Reward | undefined>(undefined);

  const loadData = useCallback(async () => {
    const reward = await Api.getReward(rewardId!);
    setReward(reward);
  }, [rewardId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      <Header goBack />
      {reward && <InsertReward reward={reward} />}
    </div>
  );
};

export default RewardEditPage;
