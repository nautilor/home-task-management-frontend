import "./App.css";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import TaskHome from "./components/Pages/TaskHome";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <div className="App">
        <TaskHome />
      </div>
    </ChakraProvider>
  );
}

export default App;
