import React from "react";
import Header from "@/layouts/navigation/Header";
import Footer from "@/layouts/navigation/Footer";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default Register;
