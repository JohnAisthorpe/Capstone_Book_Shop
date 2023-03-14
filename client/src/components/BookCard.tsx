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

interface Book {
  _id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  category: string;
  price: number;
  stock: number;
}
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
      <Box></Box>
    </Stack>
  );
};

export default BookCard;
