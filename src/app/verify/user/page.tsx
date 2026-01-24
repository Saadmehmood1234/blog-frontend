"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import toast from "react-hot-toast";

const VerifyContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification link.");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify?token=${token}`, {
          method: "GET",
        });

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          toast.error("Invalid response from server.");
          setVerified(false);
          setLoading(false);
          return;
        }

        if (!data.success) {
          toast.error(data.message || "Verification failed.");
          setVerified(false);
        } else {
          toast.success(data.message || "Email verified successfully!");
          setVerified(true);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        {loading ? (
          <p className="text-gray-500">Verifying your email...</p>
        ) : verified ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Email Verified!
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for subscribing. You will now receive our latest
              updates.
            </p>
            <button
              onClick={() => router.push("/admin/analytics")}
              className="px-4 py-2 cursor-pointer bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Go to Sign In 
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-4">
              The link is invalid or has expired. Please try subscribing again.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 cursor-pointer bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Go to Signin
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const VerifyPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
};

export default VerifyPage;
