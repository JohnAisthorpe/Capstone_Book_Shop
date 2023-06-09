import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PasswordTextField from "../components/PasswordTextField";
import TextField from "../components/TextField";
import { login } from "../redux/actions/userActions";
import { userSelector, UserState } from "../redux/slices/user";

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = "/books";
  const toast = useToast();
  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparesnt", md: "bg-surface" });

  const user: UserState = useSelector(userSelector);
  const { loading, error, userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({
        description: "Login successful",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo]);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email.")
          .required("Email address is required."),
        password: Yup.string()
          .min(2, "Password is too short - must contain at least 2 characters.")
          .required("Password is required."),
      })}
      onSubmit={(values) => {
        dispatch(login(values.email, values.password) as any);
      }}
    >
      {(formik) => (
        <Container
          maxW="lg"
          py={{ base: "12", md: "24" }}
          px={{ base: "0", md: "8" }}
          minH="4xl"
        >
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading size={headingBR}>Log in to your account</Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Don't have an account?</Text>
                  <Button
                    as={ReactLink}
                    to="/registration"
                    variant="link"
                    colorScheme="blue"
                  >
                    Sign up
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10 " }}
              bg={{ boxBR }}
              boxShadow={{ base: "none", md: "xl" }}
            >
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing="6">
                  {error && (
                    <Alert
                      status="error"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <AlertIcon />
                      <AlertTitle>Oops!</AlertTitle>
                      {/* The AlertDescription component expects a ReactNode as
                      its child, but error is of type Error, which is not
                      compatible with ReactNode.Convert the Error object to a
                      string before passing it to AlertDescription */}
                      <AlertDescription>{error.toString()}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing="5">
                    <FormControl>
                      <TextField
                        type="text"
                        name="email"
                        placeholder="john@example.com"
                        label="email"
                      />
                      <PasswordTextField
                        type="password"
                        name="password"
                        placeholder="your password"
                        label="Password"
                      />
                    </FormControl>
                  </Stack>
                </Stack>
                <Stack spacing="6">
                  <Button
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    isLoading={loading}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
