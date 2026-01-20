"use client";
import Subscribe from "@/components/Subscribe";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SubscribeWrapper() {
  const [isModal, setIsModal] = useState(true);
  const router = useRouter();
  if (!isModal) {
    router.push("/");
  }
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <Subscribe isModal={true} setIsModal={setIsModal} />
    </div>
  );
}
