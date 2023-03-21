import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

type TextFieldProps = {
  label: string;
  type: any;
  name: string;
  placeholder: string;
};

const TextField = ({ label, type, name, placeholder }: TextFieldProps) => {
  const [field, meta] = useField({ type, name, placeholder });
  return (
    <FormControl isInvalid={!!meta.error && meta.touched} mb="6">
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <Field
        as={Input}
        {...field}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
