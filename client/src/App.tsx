import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksScreen from "./screens/BooksScreen";
import BasketScreen from "./screens/BasketScreen";
import BookScreen from "./screens/BookScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

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
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/registration" element={<RegistrationScreen />} />
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
