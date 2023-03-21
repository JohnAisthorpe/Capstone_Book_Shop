import {
  Center,
  Wrap,
  WrapItem,
  Stack,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { getBooks } from "../redux/actions/bookActions";
import { BooksState, booksSelector, filterBooks } from "../redux/slices/books";

const BooksScreen = () => {
  const dispatch = useDispatch();

  const bookList: BooksState = useSelector(booksSelector);
  const { loading, error, books, originalBooks } = bookList;

  useEffect(() => {
    dispatch(getBooks() as any);
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      <Flex py="15px" justifyContent="center">
        <Button
          mx="10px"
          width="90px"
          height="34px"
          onClick={() => dispatch(filterBooks("Fiction"))}
        >
          Fiction
        </Button>
        <Button
          mx="10px"
          width="90px"
          height="34px"
          onClick={() => dispatch(filterBooks("Non-Fiction"))}
        >
          Non-Fiction
        </Button>
        <Button
          mx="10px"
          width="90px"
          height="34px"
          onClick={() => dispatch(filterBooks("Self-Help"))}
        >
          Self-Help
        </Button>
        <Button
          mx="10px"
          width="90px"
          height="34px"
          onClick={() => dispatch(filterBooks("Psychology"))}
        >
          Psychology
        </Button>
      </Flex>
      <Wrap spacing="30px" justify="center" minHeight="100vh">
        {loading ? (
          <Stack direction="row" spacing={4}>
            <Spinner
              mt={20}
              thickness="10px"
              speed="0.65"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Stack>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>{error.toString()}</AlertDescription>
          </Alert>
        ) : (
          books.map((book) => (
            <WrapItem key={book._id}>
              <Center w="250px" h="550">
                <BookCard book={book} />
              </Center>
            </WrapItem>
          ))
        )}
      </Wrap>
    </>
  );
};

export default BooksScreen;
