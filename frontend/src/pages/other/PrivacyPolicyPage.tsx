import { Helmet } from "react-helmet-async";
import { PrivacyPolicyTemplate } from "../../templates/other/PrivacyPolicyTemplate";

export const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>プライバシーポリシー</title>
      </Helmet>
      <PrivacyPolicyTemplate />
    </>
  );
};
