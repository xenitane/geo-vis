import "?/fonts.css";
import "?/index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import reportWebVitals from "?/report-web-vitals";
import GlobalLayout from "?/GlobalLayout";
import LinearFrac from "&/LinearFrac";

ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
        <GlobalLayout>
            <LinearFrac />
        </GlobalLayout>
    </React.StrictMode>
);

reportWebVitals(console.log);
