import { Button, Text } from "@chakra-ui/react";
import {
  LuArrowLeft,
  LuFullscreen,
  LuPencil,
  LuPlus,
  LuTrophy,
} from "react-icons/lu";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import React from "react";
import { householdPaths } from "../Router";

interface HeaderProps {
  onAddClick?: () => void;
  hideAddButton?: boolean;
  onEditClick?: () => void;
  goBack?: () => void;
  hideRewards?: boolean;
  children?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const hideAddButton = props.hideAddButton ?? true;
  const hideRewards = props.hideRewards ?? true;
  const children = props.children;

  const toggleFullSceen = (): void => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="header-sticky">
      <div className={"header-container"}>
        <div className="header-left-controls">
          {props.goBack ? (
            <div className="header-back-button" onClick={props.goBack}>
              <LuArrowLeft size={25} />
            </div>
          ) : (
            <div
              className="header-back-button"
              style={{ color: "transparent" }}
              onClick={props.goBack}
            >
              <LuArrowLeft size={25} />
            </div>
          )}
          <Text fontSize="xl" fontWeight={"bold"}>
            Faccende Domestiche
          </Text>
        </div>
        <div className="header-left-controls">
          {!hideRewards && (
            <div
              className="header-rewards-button"
              onClick={() => navigate(householdPaths.rewards)}
            >
              <LuTrophy size={25} />
            </div>
          )}
          <div className="header-edit-button" onClick={props.onEditClick}>
            <LuPencil size={25} />
          </div>
          <div
            className="header-fullscreen-button"
            onClick={() => toggleFullSceen()}
          >
            <LuFullscreen size={25} />
          </div>
        </div>
        {!hideAddButton && (
          <Button
            colorPalette={"blue"}
            variant={"solid"}
            onClick={props.onAddClick}
          >
            <LuPlus />
            <Text fontWeight={"medium"} textStyle={"md"}>
              Aggiungi
            </Text>
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Header;
