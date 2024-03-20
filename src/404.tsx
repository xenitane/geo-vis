import "?/fonts.css";
import "?/index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import reportWebVitals from "?/report-web-vitals";
import GlobalLayout from "?/GlobalLayout";
import Error from "@/Error";

ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
        <GlobalLayout>
            <Error />
        </GlobalLayout>
    </React.StrictMode>
);

reportWebVitals(console.log);
