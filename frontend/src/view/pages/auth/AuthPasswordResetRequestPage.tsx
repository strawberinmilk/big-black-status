import { Helmet } from "react-helmet-async";
import { AuthPasswordResetRequestTemplate } from "../../templates/auth/AuthPasswordResetRequestTemplate";

export const AuthPasswordResetRequestPage = () => {
  return (
    <>
      <Helmet>
        <title>パスワードリセット</title>
      </Helmet>
      <AuthPasswordResetRequestTemplate />
    </>
  );
};
