import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Cancel: React.FC = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState<number>(5); // Countdown timer

  useEffect(() => {
    // Set a 5-second timer to redirect to the Cart page
    const timer = setTimeout(() => {
      router.push("/cart"); // Redirect to the Cart page
    }, 5000);

    // Countdown logic
    const countdown = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    // Clear timers on component unmount
    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        className="w-10 h-10 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full mb-6"
        style={{
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <h2 className="text-3xl font-bold text-red-600">Payment Canceled</h2>
      <p className="mt-4 text-lg text-gray-700">
        You have canceled the payment. Redirecting you to the cart in {seconds} seconds...
      </p>
    </div>
  );
};

export default Cancel;
