import * as React from "react";
import Header from "../components/layout/navigation/Header";
import Footer from "../components/layout/navigation/Footer";
import RegisterForm from "../components/auth/RegisterForm";

const page = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default page;
