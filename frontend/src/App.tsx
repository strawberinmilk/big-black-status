import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./router/router";
import { SnackGComponent } from "./common/SnackComponent";
import { SideBarOrganism } from "./organisms/navigate/SideBarOrganism";
import style from "./style/app.module.scss";

export default function App() {
  return (
    <div className={style.root}>
      <SnackGComponent>
        <BrowserRouter>
          <SideBarOrganism />
          <div className={style.contents}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  Component={route.Component}
                />
              ))}
            </Routes>
          </div>
        </BrowserRouter>
      </SnackGComponent>
    </div>
  );
}
