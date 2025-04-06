'use client'; // Add this line to mark the component as a client component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";

type Plan = {
  planID: number;
  planName: string;
  planDescription: string;
  image: string;
};

export default function PlansPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(""); // for search functionality
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null); // for highlighting selected plan
  const [removeMode, setRemoveMode] = useState(false); // ability to remove plan
  const [showConfirmation, setShowConfirmation] = useState(false); // control the confirmation modal
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const plansPerPage = 8; // Number of plans to display per page

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session?.user) {
      setError("You must be logged in to view plans.");
      setLoading(false);
      return;
    }

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

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery); // Update the query state

    if (!searchQuery) {
      // If the search query is empty, fetch all plans again
      const response = await fetch(`/api/Plan?userID=${session?.user?.id}`);
      const data = await response.json();
      setPlans(data);
      return;
    }

    try {
      // Fetch plans matching the search query
      const response = await fetch(`/api/Plan?userID=${session?.user?.id}&title=${searchQuery}`);
      if (!response.ok) {
        throw new Error("Failed to fetch plans.");
      }
      const data = await response.json();
      setPlans(data); // Update the plans state with the filtered results
    } catch (error) {
      console.error("Error searching for plans:", error);
      setError("Failed to search for plans.");
    }
  };

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
      // Send the DELETE request with the planID as a query parameter
      const response = await fetch(`/api/Plan?planID=${selectedPlan.planID}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to remove plan!`);
      }

      // If the plan was deleted successfully, update the state
      setPlans(plans.filter(plan => plan.planID !== selectedPlan.planID));
      setSelectedPlan(null);
      setRemoveMode(false);
      setShowConfirmation(false); // Close confirmation dialog after deletion
    } catch (error) {
      console.error('Error removing plan:', error);
      setError('Failed to remove plan.');
    }
  };

  const toggleRemoveMode = () => {
    setRemoveMode(!removeMode);
    setSelectedPlan(null); // Deselect any selected plan
  };

  const openConfirmationPopup = () => {
    setShowConfirmation(true); // Show the confirmation popup
  };

  const closeConfirmationPopup = () => {
    setShowConfirmation(false); // Close the confirmation popup without deleting
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * plansPerPage < plans.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading plans...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  const displayedPlans = plans.slice(
    currentPage * plansPerPage,
    (currentPage + 1) * plansPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <button
            className="flex-1 ml-5 mr-15 bg-[#7874ac] text-white py-2 px-4 rounded"
        >
          Your Plans
        </button>
        <div className="flex items-center p-4 w-full max-w-md ml-auto">
          <button
            onClick={removeMode ? toggleRemoveMode : handleCreatePlan}
            className="flex-1 ml-5 bg-[#74ac85] text-white py-2 px-4 rounded"
          >
            {removeMode ? 'Cancel Remove' : 'Create a New Plan'}
          </button>

          {removeMode && selectedPlan && (
            <button
              onClick={openConfirmationPopup} // Open the confirmation popup
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
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Are you sure you want to delete this plan?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleRemovePlan}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeConfirmationPopup}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="relative flex flex-wrap justify-between gap-4">
          {/* Display Plans */}
          {displayedPlans.map((plan) => (
            <div
              key={plan.planID}
              className="flex-1 min-w-[20%] max-w-[30%] h-[20vh] border p-4 rounded-xl shadow cursor-pointer hover:bg-[#b8d1c0] transition"
              onClick={() => handlePlanClick(plan)}
              onDoubleClick={() => plan && router.push(`/plans/${plan.planID}`)}
            >
              <h2 className="text-xl font-semibold mt-2">{plan.planName}</h2>
              <p className="text-gray-600">{plan.planDescription}</p>
            </div>
          ))}

          {/* Add Empty Placeholders */}
          {Array.from({ length: plansPerPage - displayedPlans.length }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="flex-1 min-w-[20%] max-w-[30%] h-[20vh] border p-4 rounded-xl shadow bg-gray-100"
            >
              <div className="flex items-center justify-center h-full text-gray-400">
                Empty Slot
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center mt-4 space-x-2">
          {[0, 1, 2].map((index) => (
            <button
              key={`dot-${index}`}
              onClick={() => setCurrentPage(index)} // Navigate to the corresponding page
              className={`w-4 h-4 rounded-full ${
                currentPage === index ? "bg-[#00768c]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
