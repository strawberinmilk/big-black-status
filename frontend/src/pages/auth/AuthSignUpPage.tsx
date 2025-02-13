import { Helmet } from "react-helmet-async";
import { AuthSignUpTemplate } from "../../templates/auth/AuthSignUpTemplate";

export const AuthSignUpPage = () => {
  return (
    <>
      <Helmet>
        <title>サインアップ</title>
      </Helmet>
      <AuthSignUpTemplate />
    </>
  );
};
