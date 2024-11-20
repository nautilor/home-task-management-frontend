import "./App.css";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <div className="App">
        <p>Vite + React + Chakra UI</p>
      </div>
    </ChakraProvider>
  );
}

export default App;
