import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
console.log(import.meta.env.VITE_GOOGLE_ANALYTICS_ID)
createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>
);
