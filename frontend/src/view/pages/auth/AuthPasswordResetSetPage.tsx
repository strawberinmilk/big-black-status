import { Helmet } from "react-helmet-async";
import { AuthPasswordResetSetTemplate } from "../../templates/auth/AuthPasswordResetSetTemplate";

export const AuthPasswordResetSetPage = () => {
  return (
    <>
      <Helmet>
        <title>パスワードを設定</title>
      </Helmet>
      <AuthPasswordResetSetTemplate />
    </>
  );
};
