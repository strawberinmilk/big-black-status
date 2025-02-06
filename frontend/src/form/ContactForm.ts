import { useForm } from "react-hook-form";
import { Api } from "../api/api";
import { useContext } from "react";
import { SnackContext } from "../common/SnackComponent";

type ContactFormValue = {
  userId: number | undefined;
  message: string;
}


export default() => {
  const contactApi = Api().contactApi;

  const form = useForm<ContactFormValue>()
  const { setSnack } = useContext(SnackContext);

  const submit = async () => {
    form.handleSubmit(async () => {
      try {
        await contactApi.create(form.getValues())
        setSnack({
          isOpen: true,
          type: "success",
          message: "お問い合わせを受け付けました",
        });
      } catch {
        setSnack({
          isOpen: true,
          type: "error",
          message: "送信に失敗しました",
        });
      }
    })()
  }

  return {
    form,
    method: {
      submit
    },
  }
}