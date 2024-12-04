import { Api, Reward, User } from "../Api";
import RewardInfo from "../RewardInfo/RewardInfo";

interface RewardContainerProps {
  users: User[];
  rewards: Reward[];
  onReload: () => void;
}

const RewardContainer = (props: RewardContainerProps) => {
  const { rewards, users, onReload } = props;

  const onRewardRedeemed = async (reward: Reward, user: User) => {
    console.log("Reward redeemed", reward, user);
    await Api.addRewardedPoints(reward, user);
    onReload();
  };

  const onRewardUndo = async (reward: Reward, user: User) => {
    const rewardPoints = reward.rewarded!.find((r) => r.user.id === user.id);
    if (!rewardPoints) {
      return;
      // TODO: Add error handling
    }
    await Api.deleteRewardedPoints(rewardPoints.id);
    onReload();
  };

  const onRewardDelete = async (reward: Reward) => {
    console.log("Reward deleted", reward);
  };

  const onRewardEdit = async (reward: Reward) => {
    console.log("Reward edited", reward);
  };

  return (
    <div>
      {rewards.map((reward) => (
        <RewardInfo
          key={reward.id}
          task={reward}
          users={users}
          onRewardRedeemed={onRewardRedeemed}
          onRewardDelete={onRewardDelete}
          onRewardEdit={onRewardEdit}
          onRewardUndo={onRewardUndo}
        />
      ))}
    </div>
  );
};

export default RewardContainer;
