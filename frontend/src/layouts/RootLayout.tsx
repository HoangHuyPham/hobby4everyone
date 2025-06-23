// App.tsx (React)
import "@/styles/globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import React from "react";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="mdl-js font-inter">
        <Outlet />
      </div>
    </>
  );
}

export default App;
