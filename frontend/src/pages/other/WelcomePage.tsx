import { Helmet } from "react-helmet-async";
import { WelcomeTemplate } from "../../templates/other/WelcomeTemplate";

export const WelcomePage = () => {
  return (
    <>
      <Helmet>
        <title>初心者ガイド</title>
      </Helmet>
      <WelcomeTemplate />
    </>
  );
};
