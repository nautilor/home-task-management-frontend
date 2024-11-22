import { Button, Text } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import "./Header.scss";

interface HeaderProps {
  onAddClick?: () => void;
  hideAddButton?: boolean;
}

const Header = (props: HeaderProps) => {
  const hideAddButton = props.hideAddButton ?? false;
  return (
    <div className={"header-container"}>
      <Text fontSize="2xl" fontWeight={"bold"}>
        Gestione Faccende Domestiche
      </Text>
      {!hideAddButton && (
        <Button
          colorPalette={"blue"}
          variant={"solid"}
          onClick={props.onAddClick}
        >
          <LuPlus />{" "}
          <Text fontWeight={"medium"} textStyle={"md"}>
            Aggiungi
          </Text>
        </Button>
      )}
    </div>
  );
};

export default Header;
