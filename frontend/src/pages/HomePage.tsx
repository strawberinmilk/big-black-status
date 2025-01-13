import { Helmet } from "react-helmet-async";
import { HomeTemplate } from "../templates/HomeTemplate";

export const HomePage = () => {
  return (
    <>
    <Helmet>
      <title>Big Black Status</title>
    </Helmet>
      <HomeTemplate />
    </>
  );
};
