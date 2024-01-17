import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { lazy } from "react";

export default createBrowserRouter([
	{
		path: "/geo-vis/",
		Component: App,
		children: [
			{
				index: true,
				Component: lazy(() => import("@/pages/Home")),
			},
			{
				path: "Linear/:fracID",
				Component: lazy(() => import("@/pages/LinearFrac")),
			},
			{
				path: "Fill/:fracID",
				Component: lazy(() => import("@/pages/FillFrac")),
			},
			{
				path: "*",
				Component: lazy(() => import("@/pages/Error")),
			},
		],
	},
	{
		path: "*",
		Component: lazy(() => import("@/pages/LinearFrac")),
	},
]);
