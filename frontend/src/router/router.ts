import { HomePage } from "../pages/HomePage";
import { ClosePage } from "../pages/ClosePage";
import { TimelinePage } from "../pages/TimelinePage";
import { CheckInPage } from "../pages/CheckinPage";
import { WelcomePage } from "../pages/WelcomePage";

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
];
