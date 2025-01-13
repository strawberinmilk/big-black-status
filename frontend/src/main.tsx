import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Helmet } from "react-helmet";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Helmet>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${
          import.meta.env.VITE_GOOGLE_ANALYTICS_ID
        }`}
      ></script>
      <script>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${
                import.meta.env.VITE_GOOGLE_ANALYTICS_ID
              }', { send_page_view: false });
            `}
      </script>
    </Helmet>
    <App />
  </StrictMode>
);
