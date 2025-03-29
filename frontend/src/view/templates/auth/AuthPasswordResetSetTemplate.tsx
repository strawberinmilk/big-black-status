import { Form, useSearchParams } from "react-router-dom";
import { TitleMolecule } from "../../molecules/TitleMolecule";
import PasswordResetSetForm from "../../../form/PasswordResetSetForm";
import { validateConfig } from "../../../common/validates";
import { Button } from "@mui/material";
import { PasswordFieldMolecule } from "../../molecules/form/PasswordFieldMolecule";
import { useEffect } from "react";

export const AuthPasswordResetSetTemplate = () => {
  const { form, method } = PasswordResetSetForm();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      form.setValue("token", token);
    }
  }, []);

  return (
    <>
      <TitleMolecule title="パスワードの再設定" />
      <Form onSubmit={method.submit}>
        <p>パスワードを入力してください</p>
        <PasswordFieldMolecule
          label="パスワード"
          form={form}
          name="password"
          validate={{
            ...validateConfig.required,
          }}
        />
        <Button type="submit">送信</Button>
      </Form>
    </>
  );
};
