import { Helmet } from "react-helmet-async";
import { AuthLoginTemplate } from "../../templates/auth/AuthLoginTemplate";

export const AuthLoginPage = () => {
  return (
    <>
      <Helmet>
        <title>ログイン</title>
      </Helmet>
      <AuthLoginTemplate />
    </>
  );
};
