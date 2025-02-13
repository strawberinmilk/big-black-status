import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { TitleMolecule } from "../../molecules/TitleMolecule";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Form, Link } from "react-router-dom";
import LoginForm from "../../form/LoginForm";
import { useCookies } from "react-cookie";

export const AuthLoginTemplate = () => {
  const [cookie, , removeCookie] = useCookies(["jwt-token"]);

  const { form, method } = LoginForm();

  const [showPassword, setShowPassword] = useState(false);

  const logout = () => {
    removeCookie("jwt-token");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {cookie["jwt-token"] ? (
        <>
          <TitleMolecule title="ログアウト" />
          <Button onClick={logout}>ログアウト</Button>
        </>
      ) : (
        <>
          <TitleMolecule title="ログイン" />
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
                        showPassword
                          ? "hide the password"
                          : "display the password"
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
            </FormControl>
            <br />
            <Button type="submit">ログイン</Button>
          </Form>
          <Link to="/auth/signup">アカウントを新規作成</Link>
        </>
      )}
    </>
  );
};
