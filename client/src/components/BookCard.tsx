import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  Button,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
} from "@chakra-ui/react";

import { Link as ReactLink } from "react-router-dom";
import { useState } from "react";
import { Book } from "../../../types";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Stack
      p="2"
      spacing="3px"
      bg={useColorModeValue("white", "gray.800")}
      minW="240px"
      h="450px"
      rounded="lg"
      position="relative"
    >
      <Image src={book.image} alt={book.title} />
      <Box flex="1" maxH="5" alignItems="baseline">
        {book.stock <= 0 && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
            Sold Out
          </Badge>
        )}
      </Box>
      <Flex mt="1" justifyContent="space-between" alignContent="center">
        <Link
          as={ReactLink}
          to={`/book/${book._id}`}
          pt="2"
          cursor="pointer"
          _hover={{
            textDecoration: "none",
            textColor: "blue.200",
          }}
        >
          <Box fontSize="2xl" fontWeight="bold" as="h4" lineHeight="tight">
            {book.title}
          </Box>
        </Link>
      </Flex>
      <Flex justify="space-between">
        <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
          <Box as="span" color={"gray.500"} fontSize="lg">
            £
          </Box>
          {book.price.toFixed(2)}
        </Box>
      </Flex>
    </Stack>
  );
};

export default BookCard;
