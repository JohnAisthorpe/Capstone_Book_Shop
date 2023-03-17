import {
  CloseButton,
  Flex,
  Select,
  useColorModeValue as mode,
  Stack,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addBasketItem } from "../redux/actions/basketActions";
import { Book } from "../../../types";

interface BasketItemProps {
  basketItem: Book;
}

const BasketItem = ({ basketItem }: BasketItemProps) => {
  const { title, image, price, stock, _id, description, author, qty } =
    basketItem;
  const dispatch = useDispatch();

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <Stack direction="row" spacing="5" width="full">
        <Image
          w="120px"
          h="120px"
          fit="cover"
          src={image}
          alt={title}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{title}</Text>
          </Stack>
        </Box>
      </Stack>
      <Flex
        w="full"
        mt={{ base: "4", md: "0" }}
        align={{ base: "center", md: "baseline" }}
        justify="space-between"
        display="flex"
      >
        <Select
          maxW="64px"
          focusBorderColor={mode("blue.500", "blue.200")}
          value={qty}
          onChange={(e) => {
            dispatch(addBasketItem(_id, e.target.value) as any);
          }}
        >
          {[...Array(stock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </Select>
        <Text fontWeight="bold">£{price}</Text>
        <CloseButton />
      </Flex>
    </Flex>
  );
};

export default BasketItem;
