'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const [query, setQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPlanID, setSelectedPlanID] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const plansPerPage = 8;

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) {
      setError("You must be logged in to view plans.");
      setLoading(false);
      return;
    }

    const fetchPlans = async () => {
      try {
        const response = await fetch(`/api/Plan?userID=${session.user.id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
  }, [session, status]);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery) {
      const response = await fetch(`/api/Plan?userID=${session?.user?.id}`);
      const data = await response.json();
      setPlans(data);
      return;
    }

    try {
      const response = await fetch(`/api/Plan?userID=${session?.user?.id}&title=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch plans.");
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Error searching for plans:", error);
      setError("Failed to search for plans.");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName, userID: session.user.id }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      router.push(`/plans/${data.planID}`);
    } catch (error) {
      console.error("Error creating plan:", error);
      setError("Failed to create plan.");
    }
  };

  const openConfirmationPopup = (planID: number) => {
    setSelectedPlanID(planID);
    setShowConfirmation(true);
  };

  const closeConfirmationPopup = () => {
    setSelectedPlanID(null);
    setShowConfirmation(false);
  };

  const handleRemovePlan = async () => {
    if (!selectedPlanID) return;

    try {
      const response = await fetch(`/api/Plan?planID=${selectedPlanID}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Failed to remove plan!");
      setPlans(plans.filter(plan => plan.planID !== selectedPlanID));
      setSelectedPlanID(null);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error removing plan:", error);
      setError("Failed to remove plan.");
    }
  };

  const filteredPlans = plans.filter(plan =>
    plan.planName.toLowerCase().includes(query.toLowerCase())
  );

  const displayedPlans = filteredPlans.slice(
    currentPage * plansPerPage,
    (currentPage + 1) * plansPerPage
  );

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="flex-1 ml-5 mr-15 font-bold text-[#7874AC] text-3xl py-2 px-4 rounded">
          Your Plans
        </h1>
        <div className="flex items-center p-4 w-full max-w-md ml-auto">
          <button
            onClick={handleCreatePlan}
            className="flex-1 ml-5 bg-[#74ac85] text-white py-2 px-4 rounded"
          >
            Create a New Plan
          </button>
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

      <div className="relative flex flex-wrap justify-between gap-4">
        {displayedPlans.map((plan) => (
          <div
            key={plan.planID}
            className="relative flex-1 min-w-[20%] max-w-[30%] h-[20vh] border rounded-xl shadow hover:box-border hover:border-[#7874AC] transition cursor-pointer"
            onClick={() => router.push(`/plans/${plan.planID}`)}
          >
            {/* Top half with white background */}
            <div className="bg-white p-2 rounded-t-xl h-[30%] flex items-center">
              <h2 className="text-xl font-semibold">{plan.planName.length > 26 ? `${plan.planName.slice(0, 24)}...` : plan.planName}
              </h2>
            </div>

            {/* Bottom half with description */}
            <div className="bg-gray-100 p-2 rounded-b-xl h-[70%] flex items-center">
              <p className="text-gray-600">{plan.planDescription}</p>
            </div>

            {/* Delete button inside the card */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                openConfirmationPopup(plan.planID);
              }}
              className="absolute top-2 right-2 font-extrabold text-black px-2 py-1 text-sm rounded hover:bg-gray-500 hover:text-white transition duration-200"
            >
              X
            </button>
          </div>
        ))}

        {/* Placeholder cards to fill layout */}
        {Array.from({ length: plansPerPage - displayedPlans.length }).map((_, i) => (
          <div
            key={`placeholder-${i}`}
            className="flex-1 min-w-[20%] max-w-[30%] h-[20vh] border rounded-xl shadow bg-gray-100"
          >
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        {[...Array(Math.ceil(filteredPlans.length / plansPerPage))].map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentPage(index)}
            className={`w-4 h-4 rounded-full ${
              currentPage === index ? "bg-[#7874AC]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
