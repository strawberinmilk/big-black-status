import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { routes } from "./router/router";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/timeline">TimeLine</Link>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              Component={route.Component}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}
