import { Center, Wrap, WrapItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/BookCard";
import { getBooks } from "../redux/actions/bookActions";
import { BooksState, booksSelector } from "../redux/slices/books";

const BooksScreen = () => {
  const dispatch = useDispatch();

  const bookList: BooksState = useSelector(booksSelector);

  const { loading, error, books } = bookList;

  useEffect(() => {
    dispatch(getBooks() as any);
  }, [dispatch]);

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {books.map((book) => (
        <WrapItem key={book._id}>
          <Center w="250px" h="550">
            <BookCard book={book} />
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default BooksScreen;
