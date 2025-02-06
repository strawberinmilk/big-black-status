import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <HelmetProvider>
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
      </HelmetProvider>
    </CookiesProvider>
  </StrictMode>
);
