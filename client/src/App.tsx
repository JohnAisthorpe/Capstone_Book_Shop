import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksScreen from "./screens/BooksScreen";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/books" element={<BooksScreen />} />
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
