import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";

import { MinusIcon, StarIcon, SmallAddIcon } from "@chakra-ui/icons";
import { BiPackage, BiCheckShield, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../redux/actions/bookActions";
import { addBasketItem } from "../redux/actions/basketActions";
import { useEffect, useState } from "react";

const BookScreen = () => {
  const [amount, setAmount] = useState(1);
  let { id } = useParams();
  const toast = useToast();

  const dispatch = useDispatch();
  const books = useSelector((state: any) => state.books);
  const { loading, error, book } = books;

  const basketContent = useSelector((state: any) => state.basket);
  const { basket } = basketContent;

  useEffect(() => {
    dispatch(getBook(id) as any);
    console.log(id);
  }, [dispatch, id, basket]);
  return (
    <Wrap spacing="30px" justify="center" minH="100vh">
      {loading ? <p>Loading</p> : error ? <p>error</p> : book && <p>book</p>}
    </Wrap>
  );
};

export default BookScreen;
