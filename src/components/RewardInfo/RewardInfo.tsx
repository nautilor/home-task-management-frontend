import { Badge, Button, Text } from "@chakra-ui/react";
import { Reward, User } from "../Api";
import "./RewardInfo.scss";
import { LuUndo } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";

interface RewardInfoProps {
  task: Reward;
  users: User[];
  onRewardRedeemed: (reward: Reward, user: User) => void;
  onRewardDelete: (reward: Reward) => void;
  onRewardEdit: (reward: Reward) => void;
  onRewardUndo: (reward: Reward, user: User) => void;
}

const RewardInfo = (props: RewardInfoProps) => {
  const { task: reward, users } = props;

  const renderUserActions = (user: User) => {
    const userHasRewards = reward.rewarded!.find(
      (reward) => reward.user.id === user.id,
    );
    const numberOfRewards = reward.rewarded!.filter(
      (reward) => reward.user.id === user.id,
    ).length;
    return (
      <div className="taskusersection">
        <Button
          className="taskcompletebutton"
          colorScheme="green"
          onClick={() => props.onRewardRedeemed(reward, user)}
          colorPalette={"green"}
          variant={"subtle"}
        >
          <FiCheckCircle />
          {user.name}
        </Button>
        {userHasRewards && (
          <Button
            className="taskundobutton"
            onClick={() => props.onRewardUndo(reward, user)}
            colorScheme="red"
            colorPalette={"red"}
            variant={"subtle"}
          >
            <LuUndo />
            {numberOfRewards}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div
      className="task-container"
      style={{
        borderLeft: `1em solid ${reward.color}`,
      }}
    >
      <div className="taskinfo">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          {reward.name}
        </Text>
        <Badge
          style={{
            marginTop: "0.2em",
            backgroundColor: `${reward.color}55`,
            color: reward.color,
          }}
        >
          Ricompensa
        </Badge>
        <Text
          fontSize={"md"}
          fontWeight={"medium"}
          className="taskpoints"
          color={"red.500"}
        >
          {reward.points} punti
        </Text>
        <div className="taskusersections">
          {users.map((user) => (
            <div key={user.id} className="taskuser">
              {renderUserActions(user)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardInfo;
