import "./fonts.css";
import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import reportWebVitals from "./report-web-vitals";
import GlobalLayout from "./GlobalLayout";
import Home from "./content/Home";

ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
        <GlobalLayout>
            <Home />
        </GlobalLayout>
    </React.StrictMode>
);

reportWebVitals(console.log);
