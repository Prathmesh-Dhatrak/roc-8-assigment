import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/app/app";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import { AccessibilityProvider } from "@/components/organisms/AccessibilityProvider";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <ErrorBoundary>
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
