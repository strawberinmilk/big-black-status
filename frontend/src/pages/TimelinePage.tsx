import { Helmet } from "react-helmet-async";
import { TimeLineTemplate } from "../templates/TimeLineTemplate";

export const TimelinePage = () => {
  return (
    <>
      <Helmet>
        <title>タイムライン</title>
      </Helmet>
      <TimeLineTemplate />
    </>
  );
};
