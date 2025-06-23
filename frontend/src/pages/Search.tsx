import React from "react";
import Footer from "@/layouts/navigation/Footer";
import HomeSideLeft from "@/layouts/navigation/HomeSideLeft";
import HomeSideRight from "@/layouts/navigation/HomeSideRight";
import SearchPost from "../components/search/SearchPost";
import Header from "@/layouts/navigation/Header";
const Search = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex w-full h-fit ">
        <HomeSideLeft />
        <div className="w-full relative">
          <SearchPost />
        </div>
        <HomeSideRight />
      </div>

      <Footer />
    </div>
  );
};

export default Search;
