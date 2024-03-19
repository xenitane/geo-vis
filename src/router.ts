import { createBrowserRouter } from "react-router-dom";
import App from "!/App";
import { lazy } from "react";

export default createBrowserRouter([
    {
        path: "/geo-vis/",
        Component: App,
        children: [
            {
                index: true,
                Component: lazy(() => import("&/Home")),
            },
            {
                path: "Linear/:fracID",
                Component: lazy(() => import("&/LinearFrac")),
            },
            {
                path: "Fill/:fracID",
                Component: lazy(() => import("&/FillFrac")),
            },
            {
                path: "Branching/:fracID",
                Component: lazy(() => import("&/BranchingFrac")),
            },
            {
                path: "Attractor/:attrID",
                Component: lazy(() => import("&/Attractor")),
            },
            {
                path: "*",
                Component: lazy(() => import("&/Error")),
            },
        ],
    },
    {
        path: "*",
        Component: lazy(() => import("&/LinearFrac")),
    },
]);
