import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../api/api";
import { SnackContext } from "../common/SnackComponent";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

type PasswordResetFormValue = {
  password: string;
  token: string;
};

export default () => {
  const navigate = useNavigate();
  const authApi = Api().authApi;
  const [, setCookie] = useCookies(["jwt-token"]);
  const form = useForm<PasswordResetFormValue>();
  const { setSnack } = useContext(SnackContext);

  const submit = async () => {
    form.handleSubmit(async () => {
      try {
        const res = await authApi.passwordResetSet(form.getValues());
        setCookie("jwt-token", res.data.access_token);
        setSnack({
          isOpen: true,
          type: "success",
          message: "パスワードをリセットしました",
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
