import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import App from "@/App.tsx";
import "@/index.css";
import { Toaster } from "@/components/ui/sonner.tsx";
import CardContextProvider from "@/context/cards-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <CardContextProvider>
        <Toaster richColors />
        <App />
      </CardContextProvider>
    </ThemeProvider>
  </StrictMode>
);
