import { Helmet } from "react-helmet-async";
import { AuthActiveTemplate } from "../../templates/auth/AuthActiveTemplate";

export const AuthActivePage = () => {
  return (
    <>
      <Helmet>
        <title>アカウント有効化</title>
      </Helmet>
      <AuthActiveTemplate />
    </>
  );
};
