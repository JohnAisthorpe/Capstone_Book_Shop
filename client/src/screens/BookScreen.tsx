import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { BiPackage, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addBasketItem } from "../redux/actions/basketActions";
import { getBook } from "../redux/actions/bookActions";

const BookScreen = () => {
  const [amount, setAmount] = useState(1);
  const [readMore, setReadMore] = useState(false);
  let { id } = useParams();
  const toast = useToast();

  const dispatch = useDispatch();
  const books = useSelector((state: any) => state.books);
  const { loading, error, book } = books;

  const basketContent = useSelector((state: any) => state.basket);
  const { basket } = basketContent;

  useEffect(() => {
    dispatch(getBook(id) as any);
  }, [dispatch, id, basket]);
  const changeAmount = (input: any) => {
    if (input === "plus") {
      setAmount(amount + 1);
    }
    if (input === "minus") {
      setAmount(amount - 1);
    }
  };

  const addItem = () => {
    dispatch(addBasketItem(book._id, amount) as any);
    toast({
      description: `Item has been added`,
      status: `success`,
      isClosable: true,
    });
  };
  return (
    <>
      <Wrap spacing="30px" justify="center" minH="100vh">
        {loading ? (
          <Stack direction="row" spacing="4">
            <Spinner
              mt="20"
              thickness="10px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Stack>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          book && (
            <Box
              maxW={{ base: "3xl", lg: "5xl" }}
              mx="auto"
              px={{ base: "4", md: "8", lg: "12" }}
              py={{ base: "6", md: "8", lg: "12" }}
            >
              <Stack
                direction={{ base: "column", lg: "row" }}
                align={{ lg: "flex-start" }}
              >
                <Stack
                  pr={{ base: "0", md: "12" }}
                  spacing={{ base: "8", md: "4" }}
                  flex="1.5"
                  mb={{ base: "12", md: "none" }}
                >
                  {book.stock === 0 && (
                    <Badge
                      rounded="full"
                      w="70px"
                      fontSize="0.8em"
                      colorScheme="green"
                    >
                      Sold out
                    </Badge>
                  )}
                  <Heading fontSize="2xl" fontFamily="extrabold">
                    {book.name}
                  </Heading>
                  <Stack spacing="5">
                    <Box>
                      <Text fontSize="xl">£{book.price}</Text>
                    </Box>
                    <Text>
                      {readMore
                        ? book.description
                        : `${book.description.substring(0, 250)}...`}
                      <Text
                        color="blue.500"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                          setReadMore(!readMore);
                        }}
                      >
                        {readMore ? `show less` : `read more`}
                      </Text>
                    </Text>
                    <Text fontWeight="bold">Quantity</Text>
                    <Flex
                      w="170px"
                      p="5px"
                      borderColor="gray.200"
                      alignItems="center"
                    >
                      <Button
                        isDisabled={amount <= 1}
                        onClick={() => {
                          changeAmount("minus");
                        }}
                      >
                        <MinusIcon />
                      </Button>
                      <Text mx="10px">{amount}</Text>
                      <Button
                        isDisabled={amount >= book.stock}
                        onClick={() => {
                          changeAmount("plus");
                        }}
                      >
                        <SmallAddIcon w="20px" h="25px" />
                      </Button>
                    </Flex>
                    <Button
                      isDisabled={book.stock === 0}
                      colorScheme="blue"
                      onClick={() => addItem()}
                    >
                      Add to cart
                    </Button>
                    <Stack width="270px">
                      <Flex alignItems="center">
                        <BiPackage size="20px" />
                        <Text fontSize="sm" ml="2">
                          Free shipping if order is above £50
                        </Text>
                      </Flex>
                      <Flex alignItems="center">
                        <BiSupport size="20px" />
                        <Text fontSize="sm" ml="2">
                          We're here for you
                        </Text>
                      </Flex>
                    </Stack>
                  </Stack>
                </Stack>
                <Flex
                  direction="column"
                  align="center"
                  flex="1"
                  _dark={{ bg: "gray.900" }}
                >
                  <Image mb="30px" src={book.image} alt={book.name} />
                </Flex>
              </Stack>
            </Box>
          )
        )}
      </Wrap>
    </>
  );
};

export default BookScreen;
