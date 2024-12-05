import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./components/Router";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
