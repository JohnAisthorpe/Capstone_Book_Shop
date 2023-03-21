import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksScreen from "./screens/BooksScreen";
import BasketScreen from "./screens/BasketScreen";
import BookScreen from "./screens/BookScreen";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />

        <main>
          <Routes>
            <Route path="/books" element={<BooksScreen />} />
            <Route path="/book/:id" element={<BookScreen />} />
            <Route path="/basket" element={<BasketScreen />} />
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
