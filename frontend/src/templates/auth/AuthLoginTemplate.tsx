import { Button } from "@mui/material";
import { TitleMolecule } from "../../molecules/TitleMolecule";
import { Form, Link } from "react-router-dom";
import LoginForm from "../../form/LoginForm";
import { useCookies } from "react-cookie";
import { TextFieldMolecule } from "../../molecules/form/TextFieldMolecule";
import { PasswordFieldMolecule } from "../../molecules/form/PasswordFieldMolecule";
import { validateConfig } from "../../common/validates";

export const AuthLoginTemplate = () => {
  const [cookie, , removeCookie] = useCookies(["jwt-token"]);

  const { form, method } = LoginForm();

  const logout = () => {
    removeCookie("jwt-token");
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
            <TextFieldMolecule
              label="メールアドレス"
              form={form}
              name="email"
              validate={{
                ...validateConfig.required,
              }}
            />
            <br />
            <PasswordFieldMolecule
              label="パスワード"
              form={form}
              name="password"
              validate={{
                ...validateConfig.required,
              }}
            />
            <br />
            <Button type="submit">ログイン</Button>
          </Form>
          <Link to="/auth/signup">アカウントを新規作成</Link>
        </>
      )}
    </>
  );
};
