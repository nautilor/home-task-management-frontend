import { Api, Reward, User } from "../Api";
import RewardInfo from "../RewardInfo/RewardInfo";
import { toaster } from "../ui/toaster";

interface RewardContainerProps {
  users: User[];
  rewards: Reward[];
  onReload: () => void;
}

const RewardContainer = (props: RewardContainerProps) => {
  const { rewards, users, onReload } = props;

  const onRewardRedeemed = async (reward: Reward, user: User) => {
    try {
      await Api.addRewardedPoints(reward, user);
      onReload();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Errore durante la richiesta";
      console.error(message);
      toaster.create({
        title: message,
        type: "error",
        duration: 1500,
      });
    }
  };

  const onRewardUndo = async (reward: Reward, user: User) => {
    const rewardPoints = reward.rewarded!.find((r) => r.user.id === user.id);
    if (!rewardPoints) {
      toaster.create({
        title: "Impossibile annullare il premio",
        type: "error",
        duration: 1500,
      });
      return;
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
