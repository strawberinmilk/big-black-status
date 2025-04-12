import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../api/api";
import { SnackContext } from "../common/SnackComponent";
import { useNavigate } from "react-router-dom";

type PasswordResetFormValue = {
  email: string;
};

export default () => {
  const navigate = useNavigate();
  const authApi = Api().authApi;

  const form = useForm<PasswordResetFormValue>();
  const { setSnack } = useContext(SnackContext);

  const submit = async () => {
    form.handleSubmit(async () => {
      try {
        await authApi.passwordResetRequest(form.getValues());
        setSnack({
          isOpen: true,
          type: "success",
          message:
            "メールを送信しました。メール内のリンクをクリックしてパスワードをリセットしてください",
        });
        navigate("/");
      } catch {
        setSnack({
          isOpen: true,
          type: "error",
          message: "メールの送信に失敗しました",
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
