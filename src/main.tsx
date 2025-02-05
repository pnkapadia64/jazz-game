import { DemoAuthBasicUI, JazzProvider, useDemoAuth } from "jazz-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { JazzAccount } from "./schema.ts";

function JazzAndAuth({ children }: { children: React.ReactNode }) {
  const [auth, authState] = useDemoAuth();

  return (
    <>
      <JazzProvider
        auth={auth}
        peer="wss://cloud.jazz.tools/?key=pnkapadia6@gmail.com"
        AccountSchema={JazzAccount}
      >
        {children}
      </JazzProvider>

      {authState.state !== "signedIn" && (
        <DemoAuthBasicUI appName="Jazz Game" state={authState} />
      )}
    </>
  );
}

declare module "jazz-react" {
  export interface Register {
    Account: JazzAccount;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JazzAndAuth>
      <App />
    </JazzAndAuth>
  </StrictMode>
);
