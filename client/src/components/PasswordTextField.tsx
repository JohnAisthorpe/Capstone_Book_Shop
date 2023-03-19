import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Field, useField } from "formik";
import { useState } from "react";

type TextFieldProps = {
  label: string;
  type: any;
  name: string;
  placeholder: string;
};

const PasswordTextField = ({
  label,
  type,
  name,
  placeholder,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({ type, name, placeholder });
  return (
    <FormControl isInvalid={!!meta.error && meta.touched} mb="6">
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <InputGroup>
        <Field
          as={Input}
          {...field}
          type={type}
          name={name}
          palceholder={placeholder}
        />
        <InputRightElement h="full">
          <Button
            variant="ghost"
            onClick={() => setShowPassword((showPassword) => !showPassword)} //toggle
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordTextField;
