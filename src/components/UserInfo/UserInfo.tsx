import { Icon } from "@chakra-ui/react";
import { User } from "../Api";
import "./UserInfo.scss";
import { LuTrophy } from "react-icons/lu";

interface UserInfoProps {
  user: User;
}

const UserInfo = (props: UserInfoProps) => {
  const user: User = props.user;

  return (
    <div className={"container"}>
      <Icon fontSize={"4xl"} color="yellow.400">
        <LuTrophy />
      </Icon>
      <div className="userinfo">
        <p className="username">{user.name}</p>
        <p className="userpoints">{user.points} Punti totali</p>
      </div>
    </div>
  );
};

export default UserInfo;
