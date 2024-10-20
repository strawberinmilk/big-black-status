import { HomePage } from "../pages/home.page";
import { TimelinePage } from "../pages/timeline.page";

export const routes = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/timeline",
    Component: TimelinePage,
  },
];
