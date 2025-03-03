import { Helmet } from "react-helmet-async";
import { CheckInTemplate } from "../templates/CheckInTemplate";

export const CheckInPage = () => {
  return (
    <>
      <Helmet>
        <title>チェックイン</title>
      </Helmet>
      <CheckInTemplate />
    </>
  );
};
