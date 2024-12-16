"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";

type Plan = {
  planID: number;
  planTitle: string;
  planDescription: string;
};

export default function Planner() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/Plan");
        if (!response.ok) {
          throw new Error(`Failed to fetch plans: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched plans data:", data);

        const transformedData = data.map((plan: any) => ({
          planID: plan.planID || plan.id,
          planTitle: plan.planTitle || plan.title,
          planDescription: plan.planDescription || plan.description,
        }));

        console.log("Transformed plans data:", transformedData);
        setPlans(transformedData);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to fetch plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return <div>Loading plans...</div>;
  if (error) return <div>{error}</div>;
  if (plans.length === 0) return <div>No plans available.</div>;

  return (
    <div className="flex h-screen">
      <Sidebar className="flex items-center">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/home">Home</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Your Plans</h1>
        <ul className="mt-4 space-y-4">
          {plans.map((plan, index) => (
            <li key={plan.planID || index} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-bold">
                {plan.planTitle || "No Title Available"}
              </h2>
              <p className="text-gray-600">
                {plan.planDescription || "No Description Available"}
              </p>
              <p className="text-sm text-gray-400">Plan ID: {plan.planID || "N/A"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
