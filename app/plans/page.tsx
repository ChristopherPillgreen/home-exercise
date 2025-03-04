'use client'; // Add this line to mark the component as a client component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { isNamedExports } from "typescript";

type Plan = {
  planID: number;
  planName: string;
  planDescription: string;
  image: string;
};

export default function PlansPage() {
  const { data: session, status } = useSession();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [query, setQuery] = useState(""); // for search functionality
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null); // for highlighting selected plan
  const [removeMode, setRemoveMode] = useState(false); // ability to remove plan


  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session?.user) {
      setError("You must be logged in to view plans.");
      setLoading(false);
      return;
    }

    console.log("Session User ID:", session.user.id); // Log the user ID from session

    const fetchPlans = async () => {
      try {
        // Construct the API URL with the correct userID from session
        const response = await fetch(`/api/Plan?userID=${session.user.id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPlans(data); // Set the fetched plans
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to fetch plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [session, status]);

  const handlePlanClick = (plan: Plan) => {
    if (removeMode) {
      setRemoveMode(false);
      setSelectedPlan(plan);
    } else {
      setRemoveMode(true);
      setSelectedPlan(plan);
    }
  };

  const handleCreatePlan = async () => {
  if (!session?.user) {
    alert("You must be logged in to create a plan.");
    return;
  }

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
      body: JSON.stringify({ planName, userID: session.user.id }), // Attach planName and userID
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    router.push(`/plans/${data.planID}`); // Navigate to the new plan's page
  } catch (error) {
    console.error("Error creating plan:", error);
    setError("Failed to create plan.");
  }
};

const handleRemovePlan = async () => {
  if (!selectedPlan) return;

  try {
    const response = await fetch(`/api/Plan/${selectedPlan.planID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to remove plan!`);
    }

    setPlans(plans.filter(plan => plan.planID !== selectedPlan.planID));
    setSelectedPlan(null);
    setRemoveMode(false);
  } catch (error) {
    console.error('Error removing plan:', error);
    setError('Failed to remove plan.');
  }
};

const toggleRemoveMode = () => {
  setRemoveMode(!removeMode);
  setSelectedPlan(null); // Deselect any selected plan
};

if (loading) return <div className="text-center mt-4">Loading plans...</div>;
if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[#7874ac] text-3xl py-2 px-4 font-bold">
          Your Plans
        </h1>
        <div className="flex items-center p-4 w-full max-w-md ml-auto">
          <button
            onClick={removeMode ? toggleRemoveMode : handleCreatePlan}
            className="flex-1 ml-5 bg-[#74ac85] text-white py-2 px-4 rounded"
          >
            {removeMode ? 'Cancel Remove' : 'Create a New Plan'}
          </button>

          {removeMode && selectedPlan && (
            <button
              onClick={handleRemovePlan}
              className="flex-1 ml-5 bg-red-500 text-white py-2 px-4 rounded"
            >
              Remove Plan
            </button>
          )}
          <input
            type="text"
            placeholder="Search..."
            className="ml-5 py-2 px-4 rounded border border-[#74ac85] focus:outline-none focus:ring-2 focus:ring-[#7874ac]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div>
          <div className="flex flex-wrap justify-between gap-4">
            <button
              className="absolute left-6 top-1/2 p-3 bg-[#74ac85] text-white rounded-full"
            >
                  ←
            </button>
            {Array.from({ length: 8 }, (_, index) => {
              const plan = plans[index];
              return (
                <div
                  key={plan ? plan.planID : `dummy-${index}`}
                  className="flex-1 min-w-[20%] max-w-[30%] h-[20vh] border p-4 rounded-xl shadow cursor-pointer hover:bg-[#b8d1c0] transition"
                  onClick={() => handlePlanClick(plan)}
                  onDoubleClick={() => plan && router.push(`/plans/${plan.planID}`)} 
                >
                {plan ? (
                    <>
                      <h2 className="text-xl font-semibold mt-2">{plan.planName}</h2>
                      <p className="text-gray-600">{plan.planDescription}</p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold mt-2"></h2>
                      <p className="text-gray-600"></p>
                    </>
                )}
              </div>
              );
            })}
            <button
            className="absolute right-6 top-1/2 p-3 bg-[#74ac85] text-white rounded-full"
            >
            →
            </button>
          </div>
      </div>
    </div>
  );
}

