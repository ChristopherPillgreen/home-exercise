"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import { IoCloseCircle, IoCog } from "react-icons/io5";
import { encodePlanId } from "./../api/urlsqids";
import { CreatePlan, DeletePlan, Loading, EditPlan, PageLink, AnimatedInput } from "app/components";

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
  const [showSettings, setShowSettings] = useState(false);
  const [selectedPlanID, setSelectedPlanID] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const plansPerPage = 8;
  const [editPlanName, setEditPlanName] = useState("");
  const [editPlanDescription, setEditPlanDescription] = useState("");

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
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setShowCreateModal(false);
      setNewPlanName("");
      const nplanid = encodePlanId(data.planID);
      router.push(`/plans/${nplanid}`);
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
          onClose={
            () => {setShowCreateModal(false)
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
            <div
              key={plan.planID}
              className="relative flex-1 mt-2 sm:mt-0 min-w-[50%] sm:min-w-[20%] sm:max-w-[30%] h-[30vh] border rounded-xl shadow-md hover:shadow:xl hover:box-border hover:border-deluge hover:border transition cursor-pointer"
              onClick={() =>
                router.push(`/plans/${encodePlanId(plan.planID)}`)
              }>
              <div className="bg-[white] p-2 rounded-t-xl h-[30%] flex items-center">
                <h2 className="text-xl font-semibold">
                  {plan.planName.length > 26
                    ? `${plan.planName.slice(0, 24)}...`
                    : plan.planName}
                </h2>
              </div>

              <div className="bg-gray-100 p-2 rounded-b-xl h-[70%] flex">
                <p className="relative justify-start text-gray-600">
                  {plan.planDescription
                    ? plan.planDescription.length > 140
                      ? `${plan.planDescription.slice(0, 140)}...`
                      : plan.planDescription
                    : ""}
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="absolute top-2 right-10">
                <IoCog
                  onClick={(e) => {
                    e.stopPropagation();
                    openSettingsPopup(plan.planID);
                  }}
                  color="#004F2D"
                  size={30}
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="absolute top-2 right-2">
                <IoCloseCircle
                  onClick={(e) => {
                    e.stopPropagation();
                    openConfirmationPopup(plan.planID);
                  }}
                  color="#3D0814"
                  size={30}
                />
              </motion.div>
            </div>
          ))}

          {Array.from({ length: plansPerPage - displayedPlans.length }).map(
            (_, i) => (
              <div
                key={`placeholder-${i}`}
                className="flex-1  mt-2 sm:mt-0 min-w-[50%] sm:min-w-[20%] sm:max-w-[30%] h-[30vh] border rounded-xl shadow-md bg-gray-100"></div>
            )
          )}
        </div>

        <div className="flex items-center justify-center mt-1 space-x-2">
          {[...Array(Math.ceil(filteredPlans.length / plansPerPage))].map(
            (_, index) => (
              <motion.div
                key={`dot-${index}`}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}>
                <button
                  key={`dot-${index}`}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full shadow-md hover:shadow:lg ${
                    currentPage === index ? "bg-deluge" : "bg-gray-300"
                  }`}>
                  {}
                </button>
              </motion.div>
            )
          )}
        </div>
      </Loading>
    </div>
  );
}