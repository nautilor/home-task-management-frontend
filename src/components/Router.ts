import { createBrowserRouter } from "react-router-dom";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import TaskPage from "./Pages/TaskPage/TaskPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CategoryPage,
  },
  {
    path: "/category/:categoryId?",
    Component: TaskPage,
  },
]);
