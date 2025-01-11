import { HomePage } from "../pages/HomePage";
import { ClosePage } from "../pages/ClosePage";
import { TimelinePage } from "../pages/TimelinePage";

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
