import {
  Button,
  Container,
  Heading,
  Box,
  Checkbox,
  FormControl,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as ReactLink, useLocation } from "react-router-dom";

const LoginScreen = () => {
  const dispatch = useDispatch();
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
        dispatch(login(values.email, values.password));
      }}
    >
      {(formik) => (
        <Container
          maxW="lg"
          py={{ base: "12", md: "24" }}
          px={{ base: "0", md: "8" }}
          minH="4xl"
        ></Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
