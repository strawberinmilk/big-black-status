import { Form } from "react-router-dom";
import { TextFieldMolecule } from "../../molecules/form/TextFieldMolecule";
import { TitleMolecule } from "../../molecules/TitleMolecule";
import PasswordResetRequestForm from "../../../form/PasswordResetRequestForm";
import { validateConfig } from "../../../common/validates";
import { Button } from "@mui/material";

export const AuthPasswordResetRequestTemplate = () => {
  const { form, method } = PasswordResetRequestForm();
  return (
    <>
      <TitleMolecule title="パスワードのリセット" />
      <Form onSubmit={method.submit}>
        <p>メールアドレスを入力してください</p>
        <TextFieldMolecule
          label="メールアドレス"
          form={form}
          name="email"
          validate={{
            ...validateConfig.required,
          }}
        />
        <Button type="submit">送信</Button>
      </Form>
    </>
  );
};
