// import { Verify } from "crypto";
// import React from "react";
// import OTPVerificationForm from "../components/auth/OTPVerificationForm";

// const page = () => {
//   return (
//     <div>
//       <OTPVerificationForm />
//     </div>
//   );
// };

// export default page;
"use client";
import React from "react";
import OTPVerificationForm from "../components/auth/OTPVerificationForm";

export default function VerifyOTPPage() {
  return (
    <div>
      <OTPVerificationForm />
    </div>
  );
}
