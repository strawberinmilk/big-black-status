import { RegisterOptions, UseFormReturn } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";

type Props = {
  label: string;
  form: UseFormReturn<any>;
  name: string;
  validate?: RegisterOptions;
};

export const TextFieldMolecule = ({ label, form, name, validate }: Props) => {
  const errorMessage = form.formState.errors[name]?.message;
  return (
    <div>
      <FormControl>
        <TextField label={label} {...form.register(name, validate)} />
      </FormControl>
      <br />
      {typeof errorMessage === "string" && (
        <span style={{ color: "red" }}>{errorMessage}</span>
      )}
    </div>
  );
};
