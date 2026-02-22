import React from "react";
import "./globals.css";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import Alfred from "./alfred.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Alfred />
    <Analytics />
  </React.StrictMode>
);
