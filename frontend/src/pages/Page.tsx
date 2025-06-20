// import React from "react";
// import Footer from "../components/layout/navigation/Footer";
// import HomeSideLeft from "../components/layout/navigation/HomeSideLeft";
// import Home from "../components/home/Home";
// import HomeSideRight from "../components/layout/navigation/HomeSideRight";
// import ClientWrapper from "../components/layout/navigation/ClientWrapper";

// const Page: React.FC = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <ClientWrapper>
//         <div className="flex w-full h-fit ">
//           <HomeSideLeft />
//           <div className="w-full relative">
//             <Home />
//           </div>
//           <HomeSideRight />
//         </div>
//       </ClientWrapper>
//       <Footer />
//     </div>
//   );
// };

// export default Page;
import React, { createContext } from "react";
import Footer from "@/layouts/navigation/Footer";
import HomeSideLeft from "@/layouts/navigation/HomeSideLeft";
import Home from "@/components/home/Home";
import HomeSideRight from "@/layouts/navigation/HomeSideRight";
import ClientWrapperHeader from "@/layouts/navigation/ClientWrapperHeader";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ClientWrapperHeader>
        <div className="flex w-full h-fit">
          <HomeSideLeft />
          <div className="w-full relative">
            <Home />
          </div>
          <HomeSideRight />
        </div>
      </ClientWrapperHeader>
      <Footer />
    </div>
  );
};

export default Page;
