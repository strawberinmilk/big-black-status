import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes } from "./router/router";
import { SnackGComponent } from "./common/SnackComponent";
import { SideBarOrganism } from "./organisms/navigate/SideBarOrganism";
import style from "./style/app.module.scss";

const Layout = () => {
  return (
    <div className={style.root}>
      <SnackGComponent>
        <SideBarOrganism />
        <div className={style.contents}>
          <Outlet />
        </div>
      </SnackGComponent>
    </div>
  );
};

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes.map((route) => ({
        path: route.path,
        element: <route.Component />,
      })),
    },
  ]);

  return <RouterProvider router={router} />;
}
