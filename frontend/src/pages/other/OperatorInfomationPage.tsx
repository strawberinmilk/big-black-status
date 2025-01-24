import { Helmet } from "react-helmet-async";
import { OperatorInfoTemplate } from "../../templates/other/OperatorInfoTemplate";

export const OperatorInfoPage = () => {
  return (
    <>
      <Helmet>
        <title>運営者プロフィール</title>
      </Helmet>
      <OperatorInfoTemplate />
    </>
  );
};
