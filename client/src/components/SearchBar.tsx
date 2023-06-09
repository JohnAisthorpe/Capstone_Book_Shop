import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { searchBooks } from "../redux/slices/books";

type searchInputProps = {};

const SearchBar: React.FC<searchInputProps> = ({}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setSearchValue(e.target.value);
    dispatch(searchBooks(e.target.value));
  };

  return (
    <Flex flexGrow={1} mr={2} justifyContent="center">
      <Stack pt="20px">
        <Stack as="form" onSubmit={(e) => e.preventDefault()}>
          <InputGroup alignItems="center">
            <InputLeftElement
              paddingLeft={{ base: "10px", md: "30px" }}
              marginTop={{ base: "-3px", md: "-2px" }}
              marginBottom="auto"
              pointerEvents="none"
              children={
                <SearchIcon
                  color="gray.300"
                  width={{ base: 4, md: 5 }}
                  height={{ base: 4, md: 5 }}
                />
              }
            />
            <Input
              value={searchValue}
              borderRadius="50px"
              onChange={changeHandler}
              fontSize={{ base: "12pt", md: "14pt" }}
              paddingLeft={{ base: "40px", md: "125px" }}
              _placeholder={{ color: "gray.500" }}
              _hover={{
                border: "1px solid",
                borderColor: "blue.500",
              }}
              _focus={{
                outline: "none",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              placeholder="Search for Title or Author"
              width={{ base: "300px", md: "520px" }}
              height={{ base: "30px", md: "35px" }}
              // bg="gray.50"
            />
          </InputGroup>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default SearchBar;
