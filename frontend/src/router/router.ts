import { HomePage } from "../pages/HomePage";
import { ClosePage } from "../pages/ClosePage";
import { TimelinePage } from "../pages/TimelinePage";
import { CheckInPage } from "../pages/CheckinPage";
import { WelcomePage } from "../pages/other/WelcomePage";
import { OperatorInfoPage } from "../pages/other/OperatorInfomationPage";
import { PrivacyPolicyPage } from "../pages/other/PrivacyPolicyPage";
import { ContactPage } from "../pages/other/ContactPage";

export const routes = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/checkin",
    Component: CheckInPage,
  },
  {
    path: "/close",
    Component: ClosePage,
  },
  {
    path: "/timeline",
    Component: TimelinePage,
  },

  {
    path: "/welcome",
    Component: WelcomePage,
  },
  {
    path: "/operator-info",
    Component: OperatorInfoPage,
  },
  {
    path: "/privacy-policy",
    Component: PrivacyPolicyPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
];
