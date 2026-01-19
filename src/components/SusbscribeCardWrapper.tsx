import { Suspense } from "react";
import SubscribeCard from "./SubscribeCard";

export default function SubscribeWrapper() {
  return (
    <Suspense fallback={<div>Loading subscribe form...</div>}>
      <SubscribeCard />
    </Suspense>
  );
}
