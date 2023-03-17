import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Spinner,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Wrap,
  flexbox,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
// import { BooksState, booksSelector } from "../redux/slices/books";
import { useSelector } from "react-redux";
import BasketItem from "../components/BasketItem";
import { Book } from "../../../types";
import BasketOrderSummary from "../components/BasketOrderSummary";

const BasketScreen = () => {
  // const bookList: BooksState = useSelector(booksSelector);
  // const { loading, error, books } = bookList;
  const basketInfo = useSelector((state: any) => state.basket);
  const { loading, error, basket } = basketInfo;

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
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex" }}
            spacing={{ base: "8", md: "16" }}
          >
            <Stack spacing={{ base: "8", md: "10" }} flex="2">
              <Heading fontSize="2xl" fontWeight="extrabold">
                Basket
              </Heading>

              <Stack spacing="6">
                {basket.map((basketItem: Book) => (
                  <BasketItem key={basketItem._id} basketItem={basketItem} />
                ))}
              </Stack>
            </Stack>
            <Flex direction="column" align="center" flex="1">
              <BasketOrderSummary />

              <HStack mt="6" fontWeight="semibold">
                <p>or</p>
                <Link
                  as={ReactLink}
                  to="/books"
                  color={mode("blue.500", "blue.200")}
                >
                  Continue Browsing
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default BasketScreen;
