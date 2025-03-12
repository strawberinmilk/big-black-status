import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { RegisterOptions } from "react-hook-form";

import style from "../../../style/molecules/form/passwordField.module.scss";

type Props = {
  label: string;
  form: UseFormReturn<any>;
  name: string;
  validate?: RegisterOptions;
};

export const PasswordFieldMolecule = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const errorMessage = props.form.formState.errors[props.name]?.message;

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-password">
          {props.label}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={style.passwordField}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={props.label}
          {...props.form.register(props.name, props.validate)}
        />
        {typeof errorMessage === "string" && (
          <span style={{ color: "red" }}>{errorMessage}</span>
        )}
      </FormControl>
    </>
  );
};
