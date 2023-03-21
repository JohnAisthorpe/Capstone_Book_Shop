import { FlatTree } from "framer-motion";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

import { searchBooks, resetSearch } from "../redux/slices/books";
import { useDispatch } from "react-redux";

type searchInputProps = {};

const SearchBar: React.FC<searchInputProps> = ({}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(searchValue);
    dispatch(searchBooks(searchValue));
  };

  const resetHandler = () => {
    dispatch(resetSearch());
  };

  return (
    <Flex flexGrow={1} mr={2} justifyContent="center">
      <Stack pt="20px">
        <form onSubmit={submitHandler}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              fontSize="10pt"
              _placeholder={{ color: "gray.500" }}
              _hover={{
                bg: "blue.700",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              _focus={{
                outline: "none",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              placeholder="Search for Title or Author"
              width="400px"
              height="34px"
              // bg="gray.50"
            />
            <Button mx="10px" width="90px" height="34px" onClick={resetHandler}>
              Show All
            </Button>
          </InputGroup>
        </form>
      </Stack>
    </Flex>
  );
};

export default SearchBar;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
