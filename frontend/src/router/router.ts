import { HomePage } from "../view/pages/HomePage";
import { ClosePage } from "../view/pages/ClosePage";
import { TimelinePage } from "../view/pages/TimelinePage";
import { CheckInPage } from "../view/pages/CheckinPage";
import { WelcomePage } from "../view/pages/other/WelcomePage";
import { OperatorInfoPage } from "../view/pages/other/OperatorInfomationPage";
import { PrivacyPolicyPage } from "../view/pages/other/PrivacyPolicyPage";
import { ContactPage } from "../view/pages/other/ContactPage";
import { notFoundPage } from "../view/pages/other/NotFoundPage";
import { AuthActivePage } from "../view/pages/auth/AuthActivePage";
import { AuthLoginPage } from "../view/pages/auth/AuthLoginPage";
import { AuthSignUpPage } from "../view/pages/auth/AuthSignUpPage";

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
  { path: "/auth/login", Component: AuthLoginPage },
  { path: "/auth/signup", Component: AuthSignUpPage },
  { path: "/auth/active", Component: AuthActivePage },
  {
    path: "*",
    Component: notFoundPage,
  },
];
