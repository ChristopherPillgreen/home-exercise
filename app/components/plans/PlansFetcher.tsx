"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Plan } from "app/components/types";

type PlanFetcherProps = {
  onPlansFetched: (plans: Plan[]) => void;
  onLoadingChange: (loading: boolean) => void;
  onError: (error: string | null) => void;
};

export default function PlanFetcher({
  onPlansFetched,
  onLoadingChange,
  onError,
}: PlanFetcherProps) {
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) {
      onError("You must be logged in to view plans.");
      onLoadingChange(false);
      return;
    }

    const fetchPlans = async () => {
      try {
        const response = await fetch(`/api/Plan?userID=${session.user.id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        onPlansFetched(data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        onError("Failed to fetch plans.");
      } finally {
        onLoadingChange(false);
      }
    };

    fetchPlans();
  }, [session, status, onPlansFetched, onError, onLoadingChange]);

  return null;
}