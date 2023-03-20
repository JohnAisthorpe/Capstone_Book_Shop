import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { UserState, userSelector } from "../redux/slices/user";
import { register } from "../redux/actions/userActions";
// import { register } from "../redux/actions/userActions";

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: UserState = useSelector(userSelector);
  const { loading, error, userInfo } = user;
  const redirect = "/books";
  const toast = useToast();
  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparesnt", md: "bg-surface" });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({
        description: "Account created",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo]);
  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required."),
        email: Yup.string()
          .email("Invalid email.")
          .required("Email address is required."),
        password: Yup.string()
          .min(2, "Password is too short - must contain at least 2 characters.")
          .required("Password is required."),
        confirmPassword: Yup.string()
          .min(2, "Password is too short - must contain at least 2 characters.")
          .required("Password is required.")
          .oneOf([Yup.ref("password"), ""], "Passwords must match"),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password) as any);
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
                <Heading size={headingBR}>Create an account.</Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Already a user?</Text>
                  <Button
                    as={ReactLink}
                    to="/registration"
                    variant="link"
                    colorScheme="blue"
                  >
                    Sign in
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
                        name="name"
                        placeholder="Your first and last name"
                        label="Full name"
                      />
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
                      <PasswordTextField
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        label="Confirm your password"
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
                    Sign up
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

export default RegistrationScreen;
