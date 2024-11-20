import { Button, Text } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import "./Header.scss";

interface HeaderProps {
  onClick?: () => void;
}

const Header = (props: HeaderProps) => {
  return (
    <div className={"header-container"}>
      <Text fontSize="2xl" fontWeight={"bold"}>
        Gestione Faccende Domestiche
      </Text>
      <Button colorPalette={"blue"} variant={"solid"} onClick={props.onClick}>
        <LuPlus />{" "}
        <Text fontWeight={"medium"} textStyle={"md"}>
          Aggiungi
        </Text>
      </Button>
    </div>
  );
};

export default Header;
