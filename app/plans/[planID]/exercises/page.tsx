"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { motion } from "motion/react";
import {
  IoAddCircle,
  IoCloseCircle,
  IoInformationCircle,
} from "react-icons/io5";
import { decodePlanId } from "./../../../api/urlsqids";
import { PageLink, AnimatedInput } from "app/components";

type Exercise = {
  exerciseID: number;
  exerciseName: string;
  exerciseDescription: string;
  image: string;
};

type PlanExercise = {
  exerciseID: number;
};

export default function Planner() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const exercisesPerPage = 6;
  const { planID } = useParams();
  const [notification, setNotification] = useState("");
  const [notificationfalse, setNotificationfalse] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const router = useRouter();
  const [planExerciseCount, setPlanExerciseCount] = useState(0);
  const [selectedCategoryID, setSelectedCategoryID] = useState<number | null>(
    null
  );
  const [currentPlanExercises, setCurrentPlanExercises] = useState<
    PlanExercise[]
  >([]);

  const handleOpenInfoModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setSelectedExercise(null);
    setShowInfoModal(false);
  };

  const fetchPlanExercises = async () => {
    try {
      const planIDNumber = Number(planID);
      if (isNaN(planIDNumber)) return;

      const response = await fetch(`/api/planexercise?planID=${planIDNumber}`);
      if (!response.ok) throw new Error("Failed to fetch plan exercises.");

      const data = await response.json();
      setPlanExerciseCount(data.length);
      setCurrentPlanExercises(data);
    } catch (err) {
      console.error("Error fetching plan exercises:", err);
    }
  };

  useEffect(() => {
    fetchPlanExercises();
  }, [planID]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("/api/exercise");
        if (!response.ok) throw new Error("Failed to fetch exercises.");
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError("Failed to fetch exercises.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategoryID === null) {
      fetchExercises();
    }
  }, [selectedCategoryID]);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery) {
      try {
        const response = await fetch("/api/exercise");
        if (!response.ok) throw new Error("Failed to fetch exercises.");
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setError("Failed to fetch exercises.");
      }
      return;
    }

    try {
      const response = await fetch(`/api/exercise?title=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch exercises.");
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Error searching for exercises:", error);
      setError("Failed to search for exercises.");
    }
  };

  const handleAddExercise = async (exerciseID: number) => {
    try {
      if (planExerciseCount >= 10) {
        setNotificationfalse("You cannot exceed 10 exercises");
        setTimeout(() => setNotificationfalse(""), 3000);
        return;
      }

      const isDuplicate = currentPlanExercises.some(
        (exercise) => exercise.exerciseID === exerciseID
      );
      if (isDuplicate) {
        setNotification("Cannot have duplicate exercises.");
        setTimeout(() => setNotification(""), 3000);
        return;
      }

      // Use decodePlanId to decode the planID from the SQID format
      const decodedPlanID = decodePlanId(planID as string);
      if (decodedPlanID === null || isNaN(decodedPlanID)) {
        alert("Invalid Plan ID.");
        return;
      }

      const response = await fetch(`/api/planexercise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planID: decodedPlanID, exerciseID }),
      });

      if (!response.ok) {
        throw new Error("Failed to add exercise to plan.");
      }

      setPlanExerciseCount((prevCount) => prevCount + 1);
      setCurrentPlanExercises((prev) => [...prev, { exerciseID }]);
      setNotification("Exercise added successfully!");
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      console.error("Error adding exercise:", err);
      setNotification("Cannot add duplicate exercises.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.exerciseName &&
      exercise.exerciseName.toLowerCase().includes(query.toLowerCase())
  );

  const displayedExercises = filteredExercises.slice(
    currentPage * exercisesPerPage,
    (currentPage + 1) * exercisesPerPage
  );

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/plans");
    }
  };

  if (loading) return <div>Loading exercises...</div>;
  if (error) return <div>{error}</div>;

  const handleClick = async (tagID: number) => {
    console.log("Clicked category with tagID:", tagID);
    setSelectedCategoryID(tagID);

    try {
      const response = await fetch(`/api/TagExercises?tagID=${tagID}`);
      if (!response.ok) throw new Error("Failed to fetch exercises for tag.");
      const data = await response.json();

      const extractedExercises = data.map((item: any) => item.exercise);
      console.log("Extracted exercises:", extractedExercises);

      setExercises(extractedExercises);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error fetching exercises by tag:", error);
      setError("Failed to fetch exercises by tag.");
    }
  };

  return (
    <>
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 ${
            notification.includes("Cannot") ? "bg-[#3D0814]" : "bg-[#004F2D]"
          } text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300`}>
          {notification}
        </div>
      )}
      {notificationfalse && (
        <div className="fixed top-5 right-5 z-50 bg-[#3D0814] text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
          {notificationfalse}
        </div>
      )}
    <div className="container h-full w-full">
    <div className="flex items-center justify-between w-full">
      <h1 className="flex font-bold text-deluge ml-1 sm:ml-0 text-xl sm:text-3xl">
        Exercises
          </h1>
          <div className="flex p-4 w-fit max-w-lg space-x-4">
            <PageLink
              onClick={handleBackNavigation}
              color="bg-falu-red"
              name="Back to Plan"
              title="Back to plan page"
            />
            <AnimatedInput
              voidChange={handleSearch}
              value={query}
              additionalStyling="w-[15vh] sm:w-fit bg-white text-black border border-ocean-green focus:ring focus:ring-ocean-green"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex h-[65vh] px-4 ">
          <div className="w-1/5 h-full pr-4">
            <ul className="h-full bg-gray-100 border border-gray-300 rounded-xl shadow-md">
              <li
                className="px-4 py-4 hover:bg-[#58A870] hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(1)}>
                Cervical
              </li>
              <li
                className="px-4 py-3 hover:bg-[#58A870] hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(2)}>
                Oral Motor
              </li>
              <li
                className="px-4 py-4 hover:bg-[#58A870] hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(3)}>
                Shoulder
              </li>
              <li
                className="px-4 py-4 hover:bg-[#58A870] hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(4)}>
                Elbow & Hand
              </li>
              <li
                className="px-4 py-4 hover:bg-[#58A870]  hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(5)}>
                Back
              </li>
              <li
                className="px-4 py-5 hover:bg-[#58A870]  hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(6)}>
                Hip & Knee
              </li>
              <li
                className="px-4 py-4 hover:bg-[#58A870]  hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(7)}>
                Lower Body Strength
              </li>
              <li
                className="px-4 py-4 hover:bg-[#58A870]  hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(8)}>
                Upper Body Strength
              </li>
            </ul>
          </div>

          <div className="w-4/5 relative grid grid-cols-3 gap-4">
            {displayedExercises.map((exercise) => (
              <div
                key={exercise.exerciseID}
                className="aspect-[3/2] h-full w-full relative rounded-xl overflow-hidden border shadow-md hover:shadow-lg hover:border-deluge hover:box-border hover:border transition cursor-pointer">
                <div className="absolute inset-0 flex flex-col">
                  {/* Top 1/5 Bar */}
                  <div className="flex items-center justify-between p-2 bg-white h-1/5 rounded-t-xl z-10">
                    <h2 className="text-[#7874AC] text-xl font-semibold">
                      {exercise.exerciseName.length > 26
                        ? `${exercise.exerciseName.slice(0, 24)}...`
                        : exercise.exerciseName}
                    </h2>
                    <div className="flex flex-end flex-row">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        className="relative">
                        <IoInformationCircle
                          onClick={() => handleOpenInfoModal(exercise)}
                          color="#004F2D"
                          size={30}
                        />
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        className="relative">
                        <IoAddCircle
                          onClick={() => handleAddExercise(exercise.exerciseID)}
                          color="#58A870"
                          size={30}
                        />
                      </motion.div>
                      {showInfoModal && selectedExercise && (
                        <div className="fixed inset-0 bg-[#7874ac]/10 flex items-center justify-center z-50">
                          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <div className="flex flex-row justify-between">
                              <h3 className="text-xl text-[#7874ac] font-semibold mb-4">
                                {selectedExercise.exerciseName}
                              </h3>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                                className="top-2 right-2">
                                <IoCloseCircle
                                  onClick={() => handleCloseInfoModal()}
                                  color="#3D0814"
                                  size={30}
                                />
                              </motion.div>
                            </div>
                            <div className="flex justify-center mb-4">
                              <CldImage
                                width="250"
                                height="250"
                                src={selectedExercise.image}
                                sizes="50vw"
                                alt={selectedExercise.exerciseName}
                                className="w-full h-auto object-contain mb-4 p-3"
                              />
                            </div>
                            <p className="text-gray-600 mb-4">
                              {selectedExercise.exerciseDescription}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom 4/5 Image Area */}
                  <div className="relative h-4/5 bg-gray-200 flex items-end justify-center rounded-b-xl">
                    <CldImage
                      src={exercise.image}
                      alt={exercise.exerciseName}
                      fill
                      className="mt-5 object-contain p-5"
                    />
                  </div>
                </div>
              </div>
            ))}

            {Array.from({
              length: exercisesPerPage - displayedExercises.length,
            }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="aspect-[3/2] h-full w-full relative border rounded-xl shadow-md hover:border-[#7874AC] transition cursor-pointer flex flex-col"></div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          {[
            ...Array(Math.ceil(filteredExercises.length / exercisesPerPage)),
          ].map((_, index) => (
            <motion.div
              key={`dot-${index}`}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}>
              <button
                onClick={() => setCurrentPage(index)}
                title={`Go to page ${index + 1}`}
                className={`w-2 h-2 rounded-full shadow-md hover:shadow-lg ${
                  currentPage === index ? "bg-[#7874AC]" : "bg-gray-300"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
