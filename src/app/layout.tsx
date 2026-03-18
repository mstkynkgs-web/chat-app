import "./globals.css";
import { ReactNode } from "react";
import AppProvider from "./provider";
import Header from "@/components/layout/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {/* すべてのコンポーネントを Provider の内側に入れる */}
          <Header />
        <main
          style={{
            background: "#F1F3F7",
            width: "100%",
            minHeight: "100vh",
            overflowY: "auto",
            paddingBottom: "100px"
          }}
        >
          <AppProvider>{children} </AppProvider>
        </main>
      </body>
    </html>
  );
}