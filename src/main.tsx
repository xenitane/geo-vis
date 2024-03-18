import "@/index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import reportWebVitals from "@/report-web-vitals";

ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals(console.log);
