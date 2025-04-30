"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { encodePlanId } from "./../api/urlsqids";
import type { Plan } from "app/components/types";
import {
  CreatePlan,
  DeletePlan,
  Loading,
  EditPlan,
  PageLink,
  AnimatedInput,
  PlanCard,
  PaginationDots,
  PlansFetcher
} from "app/components";

export default function PlansPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedPlanID, setSelectedPlanID] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const plansPerPage = 8;
  const [editPlanName, setEditPlanName] = useState("");
  const [editPlanDescription, setEditPlanDescription] = useState("");

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery) {
      const response = await fetch(`/api/Plan?userID=${session?.user?.id}`);
      const data = await response.json();
      setPlans(data);
      return;
    }

    try {
      const response = await fetch(
        `/api/Plan?userID=${session?.user?.id}&title=${searchQuery}`
      );
      if (!response.ok) throw new Error("Failed to fetch plans.");
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Error searching for plans:", error);
      setError("Failed to search for plans.");
    }
  };

  const handleCreatePlan = async () => {
    if (!session?.user || !newPlanName.trim()) return;
  
    try {
      const response = await fetch("/api/Plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: newPlanName,
          userID: session.user.id,
        }),
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      setShowCreateModal(false);
      setNewPlanName("");
      const encoded = encodePlanId(data.planID);
      router.push(`/plans/${encoded}`);
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

  const openSettingsPopup = (planID: number) => {
    const plan = plans.find((p) => p.planID === planID);
    if (plan) {
      setEditPlanName(plan.planName);
      setEditPlanDescription(plan.planDescription);
    }
    setSelectedPlanID(planID);
    setShowSettings(true);
  };

  const closeSettingsPopup = () => {
    setSelectedPlanID(null);
    setShowSettings(false);
  };

  const handleSaveChanges = async () => {
    if (!selectedPlanID || !session?.user) return;

    try {
      const response = await fetch(`/api/Plan`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planID: selectedPlanID,
          planName: editPlanName,
          planDescription: editPlanDescription,
        }),
      });

      if (!response.ok) throw new Error("Failed to update plan!");

      const updatedPlan = await response.json();

      setPlans((prev) =>
        prev.map((plan) =>
          plan.planID === selectedPlanID ? updatedPlan : plan
        )
      );

      setShowSettings(false);
      setSelectedPlanID(null);
    } catch (error) {
      console.error("Error updating plan:", error);
      setError("Failed to update plan.");
    }
  };

  const handleRemovePlan = async () => {
    if (!selectedPlanID) return;

    try {
      const response = await fetch(`/api/Plan?planID=${selectedPlanID}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove plan!");
      setPlans(plans.filter((plan) => plan.planID !== selectedPlanID));
      setSelectedPlanID(null);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error removing plan:", error);
      setError("Failed to remove plan.");
    }
  };

  const filteredPlans = plans.filter((plan) =>
    plan.planName.toLowerCase().includes(query.toLowerCase())
  );

  const displayedPlans = filteredPlans.slice(
    currentPage * plansPerPage,
    (currentPage + 1) * plansPerPage
  );

  return (
    <div className="container h-full w-full">
      <Loading loading={loading} what="plans" error={error}>
        <div className="flex items-center justify-between w-full">
          <h1 className="flex font-bold text-deluge ml-1 sm:ml-0 text-xl sm:text-3xl">
            Your Plans
          </h1>
          <div className="flex flex-row p-2 space-x-4">
            <PageLink
              onClick={() => setShowCreateModal(true)}
              color="bg-ocean-green"
              name="Create Plan"
              title="Create a new plan"
            />
            <AnimatedInput
              voidChange={handleSearch}
              value={query}
              additionalStyling="w-[15vh] sm:w-fit bg-white text-black border border-ocean-green focus:ring focus:ring-ocean-green"
              placeholder="Search..."
            />
          </div>
        </div>

        <CreatePlan
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setNewPlanName("");
          }}
          onSubmit={handleCreatePlan}
          planName={newPlanName}
          setPlanName={setNewPlanName}
        />

        <DeletePlan
          isOpen={showConfirmation}
          onConfirm={handleRemovePlan}
          onClose={closeConfirmationPopup}
        />

        <EditPlan
          isOpen={showSettings}
          onClose={closeSettingsPopup}
          onSave={handleSaveChanges}
          planName={editPlanName}
          setPlanName={setEditPlanName}
          planDescription={editPlanDescription}
          setPlanDescription={setEditPlanDescription}
        />

        <div className="relative flex flex-wrap justify-between gap-4">
          {displayedPlans.map((plan) => (
            <PlanCard
              key={plan.planID}
              planID={plan.planID}
              planName={plan.planName}
              planDescription={plan.planDescription}
              onEdit={openSettingsPopup}
              onDelete={openConfirmationPopup}
            />
          ))}

          {Array.from({ length: plansPerPage - displayedPlans.length }).map(
            (_, i) => (
              <div
                key={`placeholder-${i}`}
                className="flex-1  mt-2 sm:mt-0 min-w-[50%] sm:min-w-[20%] sm:max-w-[30%] h-[30vh] border rounded-xl shadow-md bg-gray-100"></div>
            )
          )}
        </div>

        <PaginationDots
          totalPages={Math.ceil(filteredPlans.length / plansPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Loading>

      <PlansFetcher
        onPlansFetched={setPlans}
        onLoadingChange={setLoading}
        onError={setError}
      />
    </div>
  );
}