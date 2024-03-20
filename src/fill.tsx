import "?/fonts.css";
import "?/index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import reportWebVitals from "?/report-web-vitals";
import GlobalLayout from "?/GlobalLayout";
import FillFrac from "@/FillFrac";

ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
        <GlobalLayout>
            <FillFrac />
        </GlobalLayout>
    </React.StrictMode>
);

reportWebVitals(console.log);
