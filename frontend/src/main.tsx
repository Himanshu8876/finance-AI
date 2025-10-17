import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { persistor } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log("🔧 Google Client ID:", GOOGLE_CLIENT_ID);

if (!GOOGLE_CLIENT_ID) {
  console.error(
    "❌ VITE_GOOGLE_CLIENT_ID is not set. Add it to your .env file. Google sign-in will not work without it."
  );
} else {
  console.log("✅ Google Client ID loaded successfully");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <NuqsAdapter>
            <App />
          </NuqsAdapter>
          <Toaster
            position="top-center"
            expand={true}
            duration={5000}
            richColors
            closeButton
          />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);