import { Helmet } from "react-helmet-async";
import { ContactTemplate } from "../../templates/other/ContactTemplate";

export const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>お問い合わせ</title>
      </Helmet>
      <ContactTemplate />
    </>
  );
};
