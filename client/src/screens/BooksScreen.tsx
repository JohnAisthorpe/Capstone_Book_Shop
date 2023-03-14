import { Center, Wrap, WrapItem, Image } from "@chakra-ui/react";

import { books } from "../books";

function BooksScreen() {
  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {books.map((book) => (
        <WrapItem key={book._id}>
          <Center w="250px" h="550">
            {book.title}
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default BooksScreen;
