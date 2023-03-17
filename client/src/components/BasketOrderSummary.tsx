import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";

const BasketOrderSummary = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const standardShipping = Number(2.99).toFixed(2);
  const basketItems = useSelector((state: any) => state.basket);
  const { subtotal } = basketItems;
  const navigate = useNavigate();

  const checkoutHandler = () => {
    setButtonLoading(true);
    navigate("/checkout");
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="large" p="8" w="full">
      <Heading size="md">Order Summary</Heading>
      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontWeight="medium" color={mode("blue.600", "blue.400")}>
            Subtotal
          </Text>
          <Text fontWeight="medium">{subtotal}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={mode("blue.600", "blue.400")}>
            Shipping
          </Text>
          <Text fontWeight="medium">
            {subtotal <= 50 ? (
              standardShipping
            ) : (
              <Badge px="2" fontSize="0.8em" colorScheme="orange">
                Free
              </Badge>
            )}
          </Text>
        </Flex>
        <Flex fontSize="large" fontWeight="semibold">
          {subtotal <= 50
            ? Number(subtotal) + Number(standardShipping)
            : subtotal}
        </Flex>
      </Stack>
      <Button
        as={ReactLink}
        to="/checkout"
        colorScheme="orange"
        size="lg"
        fontSize="medium"
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default BasketOrderSummary;
