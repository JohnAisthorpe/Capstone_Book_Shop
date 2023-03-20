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

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();
  return userInfo ? (
    <p>profile screen</p>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
    // The replace prop replaces the current route in the history stack with the new route, while the state prop passes the current location to the login screen so that it can redirect the user back to this location after successful login.
  );
};

export default ProfileScreen;
