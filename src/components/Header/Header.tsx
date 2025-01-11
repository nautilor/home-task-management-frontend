import { LuArrowLeft, LuFullscreen, LuPencil, LuTrophy } from "react-icons/lu";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import React from "react";
import { householdPaths } from "../Router";

interface HeaderProps {
  onEditClick?: () => void;
  goBack?: boolean;
  hideRewards?: boolean;
  children?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const hideRewards = props.hideRewards ?? true;
  const children = props.children;
  const hideEditButton = props.onEditClick === undefined;
  const goBack = props.goBack ?? false;

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
          {goBack ? (
            <div className="header-back-button" onClick={() => navigate(-1)}>
              <LuArrowLeft size={25} />
            </div>
          ) : (
            <div
              className="header-back-button"
              style={{ color: "transparent" }}
            >
              <LuArrowLeft size={25} />
            </div>
          )}
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
          {!hideEditButton && (
            <div className="header-edit-button" onClick={props.onEditClick}>
              <LuPencil size={25} />
            </div>
          )}
          <div
            className="header-fullscreen-button"
            onClick={() => toggleFullSceen()}
          >
            <LuFullscreen size={25} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
