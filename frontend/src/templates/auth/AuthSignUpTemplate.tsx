import { Form } from "react-router-dom";
import { TitleMolecule } from "../../molecules/TitleMolecule";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { useState } from "react";
import SignUpForm from "../../form/SignUpForm";

export const AuthSignUpTemplate = () => {
  const { form, method } = SignUpForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <TitleMolecule title="サインアップ" />
      <Form onSubmit={method.submit}>
        <TextField
          label="メールアドレス"
          {...form.register("email", { required: true })}
        />
        <br />

        <FormControl>
          <InputLabel htmlFor="outlined-adornment-password">
            パスワード
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
            label="Password"
            {...form.register("password", { required: true })}
          />
          <br />

          <TextField
            label="ID"
            {...form.register("screenName", { required: true })}
          />
          <br />

          <TextField
            label="名前"
            {...form.register("name", { required: true })}
          />
          <br />
          <Button type="submit">アカウントを作成</Button>
        </FormControl>
      </Form>
    </>
  );
};
