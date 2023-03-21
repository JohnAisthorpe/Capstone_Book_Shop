import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  Center,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import { Link as ReactLink, useNavigate } from "react-router-dom";

import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { MdLocalShipping, MdLogout } from "react-icons/md";
import { GiBookCover } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import { userSelector } from "../redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

const ShoppingBasketIcon = () => {
  const basketInfo = useSelector((state: any) => state.basket);
  const { basket } = basketInfo;
  return (
    <Flex>
      <Text as="sub" fontSize="xs">
        {basket.length}
      </Text>
      <Icon as={FiShoppingCart} h="4" w="7" alignSelf="center" />
      Basket
    </Flex>
  );
};

const links = [
  { linkName: "Books", path: "/books" },
  { linkName: <ShoppingBasketIcon />, path: "/basket" },
];
const NavLink: React.FC<{
  path: string;
  children?: React.ReactNode;
}> = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    rounded="md"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.600"),
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector(userSelector);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout() as any);
    toast({
      description: "You've been logged out.",
      status: "success",
      isClosable: true,
    });
    navigate("/books");
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          aria-label="menuOpen-Close"
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack>
          <Link as={ReactLink} to="/">
            <Flex alignItems="center" gap="10px">
              <Icon as={GiBookCover} h={6} w={6} color="blue.500" />
              <Text fontWeight="bold">Capstone Books</Text>
            </Flex>
          </Link>

          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((link) => (
              <NavLink key={link.path} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Icon
            cursor="pointer"
            mr="3"
            as={colorMode === "light" ? MoonIcon : SunIcon}
            alignSelf="center"
            onClick={() => toggleColorMode()}
          />
          {userInfo ? (
            <>
              <Menu>
                <MenuButton px="4" py="2" transition="all 0.3s" as={Button}>
                  {userInfo.name} <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={ReactLink} to="/profile">
                    <CgProfile />
                    <Text ml="2">Profile</Text>
                  </MenuItem>
                  <MenuItem as={ReactLink} to="/your-orders">
                    <MdLocalShipping />
                    <Text ml="2">Your orders</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>
                    <MdLogout />
                    <Text ml="2">Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                as={ReactLink}
                to="/login"
                p={2}
                fontSize="sm"
                fontWeight={300}
              >
                Sign In
              </Button>
              <Button
                as={ReactLink}
                to="/registration"
                m={2}
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={550}
                _hover={{ bg: "blue.300" }}
                bg="blue.400"
                color="white"
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {links.map((link) => (
              <NavLink key={link.path} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key="sign up" path="/registration">
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
