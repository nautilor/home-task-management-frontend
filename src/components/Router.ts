import { createBrowserRouter } from "react-router-dom";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import TaskPage from "./Pages/TaskPage/TaskPage";
import InsertElement from "./Pages/InsertElement/InsertElement";
import RewardPage from "./Pages/RewardPage/RewardPage";

export const householdPaths = {
  home: "/household",
  category: "/household/category/:categoryId?",
  insert: "/household/insert",
  rewards: "/household/rewards",
};

export const router = createBrowserRouter([
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
]);
