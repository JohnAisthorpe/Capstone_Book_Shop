import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  resetUpdateSuccess,
} from "../redux/actions/userActions";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { userSelector } from "../redux/slices/user";
import { useEffect } from "react";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: "Profile saved.",
        status: "success",
        isClosable: true,
      });
      dispatch(resetUpdateSuccess() as any);
    }
  }, [updateSuccess, toast, dispatch]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Hello");
  };
  // if the user is authenticated
  return userInfo ? (
    <Formik
      initialValues={{
        email: userInfo.email,
        password: "",
        name: userInfo.name,
        confirmPassword: "",
      }}
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
          .nullable()
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      })}
      onSubmit={(values) => {
        dispatch(resetUpdateSuccess() as any);
        dispatch(
          updateProfile(
            userInfo._id!,
            values.name,
            values.email,
            values.password
          ) as any
        );
      }}
    >
      {(formik) => (
        <Box
          minH="100vh"
          maxW={{ base: "3xl", md: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing="10"
          >
            <Stack flex="1.5" mb={{ base: "2xl", md: "none" }}>
              <Heading fontSize="2xl" fontWeight="extrabold">
                Profile
              </Heading>
              <Stack spacing="6">
                <Stack spacing="6">
                  {/* {// might need to change the order of Stack and form*/}
                  <form onSubmit={formik.handleSubmit}>
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
                    <Stack spacing="5" />
                    <FormControl>
                      <TextField
                        type="text"
                        name="name"
                        label="Full name"
                        placeholder="Your first and last name"
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
                    </FormControl>

                    <Stack spacing="6">
                      <Button
                        colorScheme="blue"
                        size="lg"
                        isLoading={loading}
                        type="submit"
                        // width="25%"
                        alignSelf="center"
                        onClick={handleClick}
                      >
                        Save
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              </Stack>
            </Stack>
            <Flex
              direction="column"
              align="center"
              flex="1"
              _dark={{ bg: "gray.900" }}
            >
              <Card>
                <CardHeader>
                  <Heading size="md">User report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box pt="2" fontSize="sm">
                      Registered on
                      {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
    // The replace prop replaces the current route in the history stack with the new route, while the state prop passes the current location to the login screen so that it can redirect the user back to this location after successful login.
  );
};

export default ProfileScreen;
