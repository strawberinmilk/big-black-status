import { useSearchParams, useNavigate } from "react-router-dom";
import { TitleMolecule } from "../../molecules/TitleMolecule";
import { useContext, useEffect, useState } from "react";
import { Api } from "../../api/api";
import { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { SnackContext } from "../../common/SnackComponent";

export const AuthActiveTemplate = () => {
  const authApi = Api().authApi;
  const [, setCookie] = useCookies(["jwt-token"]);
  const navigate = useNavigate();
  const { setSnack } = useContext(SnackContext);

  const [searchParams] = useSearchParams();
  const [display, setDisplay] = useState("アカウントの有効化");

  useEffect(() => {
    (async () => {
      setDisplay("アカウントを有効化しています...");
      const token = searchParams.get("token");
      if (token) {
        try {
          const res = await authApi.active({ token: token });
          setCookie("jwt-token", res.data.access_token);
          setSnack({
            isOpen: true,
            type: "success",
            message: "アカウントが作成されました。",
          });
          navigate("/");
        } catch (e) {
          if (e instanceof AxiosError) {
            setDisplay(
              e.response?.data?.message || "アカウントの有効化に失敗しました"
            );
          } else {
            setDisplay("アカウントの有効化に失敗しました");
          }
        }
      } else {
        setDisplay("アカウントの有効化に失敗しました");
      }
    })();
  }, []);

  return (
    <>
      <TitleMolecule title="アカウント有効化" />
      <p>{display}</p>
    </>
  );
};
