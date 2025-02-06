import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../api/api";
import { SnackContext } from "../common/SnackComponent";
import { useCookies } from "react-cookie";

type LoginFormValue = {
  email: string;
  password: string;
};

export default () => {
  const authApi = Api().authApi;
  const [, setCookie] = useCookies(["jwt-token"]);

  const form = useForm<LoginFormValue>();
  const { setSnack } = useContext(SnackContext);

  const submit = async () => {
    form.handleSubmit(async () => {
      try {
        const res = await authApi.login(form.getValues());
        setCookie("jwt-token", res.data.access_token);
        setSnack({
          isOpen: true,
          type: "success",
          message: "ログインしました",
        });
      } catch {
        setSnack({
          isOpen: true,
          type: "error",
          message: "ログインに失敗しました",
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
