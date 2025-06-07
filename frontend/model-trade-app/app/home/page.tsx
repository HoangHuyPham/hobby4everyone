import React from "react";
import Footer from "../components/layout/navigation/Footer";
import HomeSideLeft from "../components/layout/navigation/HomeSideLeft";
import Home from "../components/home/Home";
import HomeSideRight from "../components/layout/navigation/HomeSideRight";
import ClientWrapper from "../components/layout/navigation/ClientWrapper";

const page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ClientWrapper>
        <div className="flex w-full h-fit ">
          <HomeSideLeft />
          <Home />
          <HomeSideRight />
        </div>
      </ClientWrapper>

      <Footer />
    </div>
  );
};

export default page;
