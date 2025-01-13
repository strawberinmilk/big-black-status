import { Helmet } from "react-helmet-async";
import { CloseListTemplate } from "../templates/CloseListTemplate";

export const ClosePage = () => {
  return (
    <>
      <Helmet>
        <title>閉鎖状況</title>
      </Helmet>
      <CloseListTemplate />
    </>
  );
};
