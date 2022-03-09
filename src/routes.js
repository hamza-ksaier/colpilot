import { Suspense, Fragment, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import LoadingScreen from "./components/LoadingScreen";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Routes>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Layout>
                <Component />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    path: "/",
    layout: MainLayout,
    component: lazy(() => import("./views/Home")),
  },
  {
    path: "/all-files",
    layout: MainLayout,
    component: lazy(() => import("./views/AllFiles")),
  },
  {
    path: "/starred",
    layout: MainLayout,
    component: lazy(() => import("./views/Starred")),
  },
  {
    path: "/archived",
    layout: MainLayout,
    component: lazy(() => import("./views/Archived")),
  },
  {
    path: "*",
    layout: MainLayout,
    component: lazy(() => import("./views/NotFound")),
  },
];

export default routes;
