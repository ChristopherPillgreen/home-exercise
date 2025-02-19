"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Plan = {
  planID: number;
  planName: string;
  planDescription: string;
  image: string;
};

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/Plan");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPlans(data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to fetch plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleCreatePlan = async () => {
    const planName = prompt("Enter a name for your new plan:");

    if (!planName) {
      alert("Plan name is required!");
      return;
    }

    try {
      const response = await fetch("/api/Plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      router.push(`/plans/edit/${data.planID}`);
    } catch (error) {
      console.error("Error creating plan:", error);
      setError("Failed to create plan.");
    }
  };

  if (loading) return <div className="text-center mt-4">Loading plans...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Plans</h1>

      <button
        onClick={handleCreatePlan}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Create a New Plan
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.planID}
            className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100 transition"
            onClick={() => router.push(`/plans/edit/${plan.planID}`)}
          >
            <h2 className="text-xl font-semibold mt-2">{plan.planName}</h2>
            <p className="text-gray-600">{plan.planDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
