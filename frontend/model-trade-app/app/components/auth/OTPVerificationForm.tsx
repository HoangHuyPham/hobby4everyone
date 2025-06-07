"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OTPVerificationForm() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  // const [userId, setUserId] = useState<string | null>(null);

  // Lấy userId từ localStorage khi component mount ở client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserEmail = localStorage.getItem("email");
      console.log("userId from localStorage:", storedUserEmail); // Debug userId
      setUserEmail(storedUserEmail);
      if (!storedUserEmail) {
        setError("No user Email found. Please register again.");
        setTimeout(() => router.push("/register"), 3000);
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate input
    if (!otp.trim() || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }
    if (!userEmail) {
      setError("No user email found. Please register again.");
      setLoading(false);
      return;
    }

    // Prepare data
    const verificationData = {
      email: userEmail,
      otp,
    };
    console.log("Verification data:", verificationData); // Debug payload

    try {
      const response = await fetch(
        "http://localhost:8080/model_trade/user/verifyOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(verificationData),
        }
      );

      const data = await response.json();
      console.log("Verify OTP response:", data); // Debug response

      if (response.ok) {
        setSuccess(
          data.message ||
            "OTP verified successfully! Your account is now active."
        );
        setOtp("");
        localStorage.removeItem("email"); // Xóa userId sau khi xác nhận
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "OTP verification failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-gray-700 text-2xl font-bold mb-6 text-center">
        VERIFY YOUR OTP
      </h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-gray-700 text-xl font-medium border-b-4 border-gray-400 pb-2 mb-6">
          OTP VERIFICATION
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-600 bg-red-100 p-3 rounded">{error}</div>
          )}
          {success && (
            <div className="text-green-600 bg-green-100 p-3 rounded">
              {success}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-blue-700 px-3 py-2 text-sm rounded focus:outline-none focus:border-blue-700"
              maxLength={6}
              required
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
          <div className="text-sm text-gray-600 mt-4 text-center">
            Back to{" "}
            <Link href="/register" className="text-blue-700 underline">
              Register
            </Link>
            .
          </div>
        </form>
      </div>
    </div>
  );
}
