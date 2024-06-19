import "./App.css";
import Navbar from "./component/Navbar";
import Routing from "./routings/Routing";
import { Box } from "@chakra-ui/react";
function App() {
  
  return (
    <Box className="App">
      <Navbar />
      <Routing />
    </Box>
  );
}

export default App;
