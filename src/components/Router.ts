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
import InsertCustomElement from "./Pages/InsertCustomElement/InsertCustomElement";
import VegetablePage from "./Pages/VegetablePage/VegetablePage";
import RecipePage from "./Pages/RecipePage/RecipePage";

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

export const elementPaths = {
  insert: "/element/insert",
  edit: "/element/edit/:elementId?",
};

export const vegetablePaths = {
  home: "/vegetable",
  insert: "/vegetable/insert",
  edit: "/vegetable/edit/:vegetableId?",
};

export const recipePaths = {
  home: "/recipe",
  view: "/recipe/view/:recipeId?",
  insert: "/recipe/insert",
  edit: "/recipe/edit/:recipeId?",
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
  {
    path: elementPaths.insert,
    Component: InsertCustomElement,
  },
  {
    path: vegetablePaths.home,
    Component: VegetablePage,
  },
  {
    path: recipePaths.view,
    Component: RecipePage,
  },
]);
