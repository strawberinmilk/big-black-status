import { RegisterOptions, UseFormReturn } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";

import style from "../../../style/molecules/form/textField.module.scss";

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
        <TextField
          className={style.textField}
          label={label}
          {...form.register(name, validate)}
        />
      </FormControl>
      <br />
      {typeof errorMessage === "string" && (
        <span style={{ color: "red" }}>{errorMessage}</span>
      )}
    </div>
  );
};
