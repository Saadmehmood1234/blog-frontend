"use client";
import { createSubscriber } from "@/lib/api";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

type SubscribePropType = {
  isModal: boolean;
  setIsModal?: Dispatch<SetStateAction<boolean>>;
};
const Subscribe = ({ isModal, setIsModal }: SubscribePropType) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const handleSubscribe = async (email: string) => {
    try {
      setLoading(true);
      const data = await createSubscriber(email);
      if (data.success) {
        toast.success(data.message);
        setEmail("");
        if (setIsModal) {
          setIsModal(false);
        }
        setLoading(false);
      } else {
        toast.error(data.message || "Subscription failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Subscribe error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };
  if (isModal && setIsModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button
            onClick={() => setIsModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          <h4 className="font-bold mb-4 text-lg">Subscribe</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest posts delivered right to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={() => handleSubscribe(email)}
              className="px-4 py-2 cursor-pointer text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {
                loading?"sending..":"Join"
              }
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div id="subscribe">
      <h4 className="font-bold mb-4">Subscribe</h4>
      <p className="text-sm text-muted-foreground mb-4">
        Get the latest posts delivered right to your inbox.
      </p>
      <div className="flex gap-2">
        <input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={() => handleSubscribe(email)}
          className="px-4 py-2 cursor-pointer text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
