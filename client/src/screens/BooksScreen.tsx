import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { getBooks } from "../redux/actions/bookActions";
import {
  booksSelector,
  BooksState,
  filterBooks,
  resetSearch,
} from "../redux/slices/books";

const BooksScreen = () => {
  const dispatch = useDispatch();

  const bookList: BooksState = useSelector(booksSelector);
  const { loading, error, books, originalBooks } = bookList;

  useEffect(() => {
    dispatch(getBooks() as any);
  }, [dispatch]);

  const filterButtons = [
    { id: 1, label: "Show All", onClick: () => dispatch(resetSearch()) },
    {
      id: 2,
      label: "Fiction",
      onClick: () => dispatch(filterBooks("Fiction")),
    },

    {
      id: 3,
      label: "Non-Fiction",
      onClick: () => dispatch(filterBooks("Non-Fiction")),
    },
    {
      id: 4,
      label: "Self-Help",
      onClick: () => dispatch(filterBooks("Self-Help")),
    },
    {
      id: 5,
      label: "Psychology",
      onClick: () => dispatch(filterBooks("Psychology")),
    },
    {
      id: 6,
      label: "History",
      onClick: () => dispatch(filterBooks("History")),
    },
  ];

  return (
    <>
      <SearchBar />
      <Wrap
        spacing="1px"
        justify="center"
        py="10px"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        margin={{ base: "10px 0", md: "0 10px" }}
      >
        {filterButtons.map((button, index) => (
          <Stack key={button.id}>
            <Button
              key={index}
              my="5px"
              mx="5px"
              height="34px"
              onClick={button.onClick}
              px="10px" // Add padding on both sides of the text
            >
              {button.label}
            </Button>
          </Stack>
        ))}
      </Wrap>
      <Wrap spacing="60px" justify="center" minHeight="100vh" margin="5">
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
              <Center w="150px" h="400">
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
