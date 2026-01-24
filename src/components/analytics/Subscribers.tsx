"use client";

import React, { useEffect, useState } from "react";
import NoBlogs from "../NoBlogs";
import Loading from "@/app/admin/loading";
import toast from "react-hot-toast";
import { fetchSubscriber } from "@/lib/api";
import { Subscriber } from "@/types/Types";
import { SubscriberDataTable } from "./SubscriberDataTable";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await fetchSubscriber();
        if (data?.success) {
          setSubscribers(data.data);
        } else {
          toast.error(data?.message || "Failed to fetch subscribers");
        }
      } catch {
        toast.error("Error in fetching the data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Loading />;

  if (!subscribers || subscribers.length === 0) {
    return (
      <NoBlogs
        title="No Subscribers"
        description="There are no subscribers right now"
      />
    );
  }

  return (
    <div className="space-y-4">
    <SubscriberDataTable data={subscribers}/>
    </div>
  );
};

export default Subscribers;
