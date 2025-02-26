import { Api } from "../api/api";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { SnackContext } from "../common/SnackComponent";
import { useNavigate } from "react-router-dom";

type SignUpFormValue = {
  email: string;
  password: string;
  screenName: string;
  name: string;
};

export default () => {
  const authApi = Api().authApi;
  const form = useForm<SignUpFormValue>();
  const { setSnack } = useContext(SnackContext);
  const navigate = useNavigate();

  const submit = async () => {
    form.handleSubmit(async () => {
      try {
        await authApi.signup(form.getValues());
        setSnack({
          isOpen: true,
          type: "success",
          message:
            "メールを送信しました。リンクをクリックし認証を完了してください。",
        });
        navigate("/");
      } catch (e: any) {
        setSnack({
          isOpen: true,
          type: "error",
          message: e.response.data.message,
        });
      }
    })();
  };

  return {
    form,
    method: {
      submit,
    },
  };
};
