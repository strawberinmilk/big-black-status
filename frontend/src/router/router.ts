import { HomePage } from "../pages/home.page";
import { ClosePage } from "../pages/close.page";
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
  {
    path: "/close",
    Component: ClosePage,
  },
];
