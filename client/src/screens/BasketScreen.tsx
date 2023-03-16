import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue,
  Spinner,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Wrap,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { BooksState, booksSelector } from "../redux/slices/books";
import { useSelector } from "react-redux";

// const bookList: BooksState = useSelector(booksSelector);
// const { loading, error, books } = bookList;
const basketInfo = useSelector((state: any) => state.basket);
const { loading, error, basket } = basketInfo;

const BasketScreen = () => {
  return (
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
      ) : basket.length <= 0 ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Get something in your basket!</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to="/books">
              Click here to get some books!
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <p>display</p>
      )}
    </Wrap>
  );
};

export default BasketScreen;
