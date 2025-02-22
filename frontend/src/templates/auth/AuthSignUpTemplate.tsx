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
import { PasswordFieldMolecule } from "../../molecules/form/PasswordFieldMolecule";
import { TextFieldMolecule } from "../../molecules/form/TextFieldMolecule";
import { validateConfig } from "../../common/validates";

export const AuthSignUpTemplate = () => {
  const { form, method } = SignUpForm();

  return (
    <>
      <TitleMolecule title="サインアップ" />
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


        <TextFieldMolecule
          label="ID"
          form={form}
          name="screenName"
          validate={{
            ...validateConfig.required,
          }}
        />
        
        <TextFieldMolecule
          label="名前"
          form={form}
          name="name"
          validate={{
            ...validateConfig.required,
          }}
        />

        <br />
        <Button type="submit">アカウントを作成</Button>
      </Form>
    </>
  );
};
