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
import React from "react";
import OTPVerificationForm from "@/components/auth/OTPVerificationForm";

export default function VerifyOtp() {
  return (
    <div>
      <OTPVerificationForm />
    </div>
  );
}
