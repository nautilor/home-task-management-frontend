import { createBrowserRouter } from "react-router-dom";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import TaskPage from "./Pages/TaskPage/TaskPage";
import InsertElement from "./Pages/InsertElement/InsertElement";
import RewardPage from "./Pages/RewardPage/RewardPage";
import HomePage from "./Pages/HomePage/HomePage";
import FridgePage from "./Pages/FridgePage/FridgePage";
import InsertFridge from "./Pages/InsertFridge/InsertFridge";
import RewardEditPage from "./Pages/RewardEditPage/RewardEditPage";
import TaskEditPage from "./Pages/TaskEditPage/TaskEditPage";

export const householdPaths = {
  home: "/household",
  category: "/household/category/:categoryId?",
  insert: "/household/insert",
  rewards: "/household/rewards",
  editTask: "/household/rewards/edit/:taskId?",
  editReward: "/household/tasks/edit/:rewardId?",
};

export const fridgePaths = {
  home: "/fridge",
  insert: "/fridge/insert",
};

export const genericPaths = {
  home: "/",
};

export const router = createBrowserRouter([
  {
    path: genericPaths.home,
    Component: HomePage,
  },
  {
    path: householdPaths.home,
    Component: CategoryPage,
  },
  {
    path: householdPaths.category,
    Component: TaskPage,
  },
  {
    path: householdPaths.insert,
    Component: InsertElement,
  },
  {
    path: householdPaths.rewards,
    Component: RewardPage,
  },
  {
    path: householdPaths.editReward,
    Component: RewardEditPage,
  },
  {
    path: householdPaths.editTask,
    Component: TaskEditPage,
  },
  {
    path: fridgePaths.home,
    Component: FridgePage,
  },
  {
    path: fridgePaths.insert,
    Component: InsertFridge,
  },
]);
