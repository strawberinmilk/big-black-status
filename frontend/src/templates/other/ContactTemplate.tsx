import { Button, TextareaAutosize } from "@mui/material";
import { TitleMolecule } from "../../molecules/TitleMolecule";
import style from "../../style/templates/other/contact.module.scss";
import { Form } from "react-router-dom";

import ContractForm  from "../../form/ContactForm";

export const ContactTemplate = () => {
  const {form, method} = ContractForm()
  
  return (
    <>
      <Form onSubmit={method.submit}>
        <TitleMolecule title="お問い合わせ" />
        <p>問い合わせ内容</p>
        <TextareaAutosize
          className={style.messageInput}
          placeholder="問い合わせ内容を入力して下さい"
          minRows={10}
          {...form.register("message", { required: true })}
        />
        <Button type="submit">送信</Button>
      </Form>
    </>
  );
};
