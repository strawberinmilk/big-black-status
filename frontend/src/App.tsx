import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./router/router";
import { SnackGComponent } from "./common/snack.gcomponent";
import { SideBarComponent } from "./components/navigate/sidebar.component";
import style from "./style/navigate/app.module.scss";

export default function App() {
  return (
    <div className={style.root}>
      <SnackGComponent>
        <BrowserRouter>
          <SideBarComponent/>
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
