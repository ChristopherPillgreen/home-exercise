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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
          } text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300`}
        >
          {notification}
        </div>
      )}
      {notificationfalse && (
        <div
          className="fixed top-5 right-5 z-50 bg-[#3D0814] text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300"
        >
          {notificationfalse}
        </div>
      )}
      <div className="container h-fit w-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="flex font-bold text-[#7874AC] text-3xl">Exercises</h1>
          <div className="flex p-4 w-fit max-w-lg space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={handleBackNavigation}
                className="h-full w-fit px-4 bg-[#7D1616] text-white rounded-xl shadow-md hover:shadow-lg flex items-center justify-center"
              >
                Back to Plan
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search..."
                className="h-full w-full px-4 rounded-xl shadow-md hover:shadow-lg border border-[#58A870] focus:outline-none focus:ring-2 focus:ring-[#004F2D] text-sm"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </motion.div>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/5 h-auto pr-4">
            <ul className="h-[62vh] bg-gray-100 border border-gray-300 rounded-xl shadow">
              <li
                className="px-4 py-4 hover:bg-[#58A870] hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(1)}
              >
                Cervical
              </li>
              <li
                className="px-4 py-3 hover:bg-[#58A870] hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(2)}
              >
                Oral Motor
              </li>
              <li
                className="px-4 py-4 hover:bg-[#58A870] hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(3)}
              >
                Shoulder
              </li>
              <li
                className="px-4 py-4 hover:bg-[#58A870] hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(4)}
              >
                Elbow & Hand
              </li>
              <li
                className="px-4 py-4 hover:bg-[#58A870]  hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(5)}
              >
                Back
              </li>
              <li
                className="px-4 py-5 hover:bg-[#58A870]  hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(6)}
              >
                Hip & Knee
              </li>
              <li
                className="px-4 py-4 hover:bg-[#58A870]  hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(7)}
              >
                Lower Body Strength
              </li>
              <li
                className="px-4 py-4 hover:bg-[#58A870]  hover:shadow-lg hover:rounded-xl hover:text-white cursor-pointer"
                onClick={() => handleClick(8)}
              >
                Upper Body Strength
              </li>
            </ul>
          </div>

          <div className="w-4/5 grid grid-cols-3 gap-4">
            {displayedExercises.map((exercise) => (
              <div
                key={exercise.exerciseID}
                className="relative w-full border rounded-xl shadow-md hover:shadow:lg hover:border-[#7874AC] transition cursor-pointer"
              >
                <div className="bg-white p-2 rounded-t-xl h-[20%] flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {exercise.exerciseName.length > 26
                      ? `${exercise.exerciseName.slice(0, 24)}...`
                      : exercise.exerciseName}
                  </h2>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-2 right-10"
                  >
                    <IoInformationCircle
                      onClick={() => handleOpenInfoModal(exercise)}
                      color="#004F2D"
                      size={30}
                    />
                  </motion.div>
                  {showInfoModal && selectedExercise && (
                    <div className="fixed inset-0 bg-[#7874ac] bg-opacity-25 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex flex-row justify-between">
                          <h3 className="text-xl text-[#7874ac] font-semibold mb-4">
                            {selectedExercise.exerciseName}
                          </h3>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            className="top-2 right-2"
                          >
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
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-2 right-2"
                  >
                    <IoAddCircle
                      onClick={() => handleAddExercise(exercise.exerciseID)}
                      color="#58A870"
                      size={30}
                    />
                  </motion.div>
                </div>
                <div className="h-[80%] flex justify-center items-center rounded-b-xl bg-gray-200">
                  <CldImage
                    width="250"
                    height="250"
                    src={exercise.image}
                    sizes="50vw"
                    alt={exercise.exerciseName}
                    className="items-center w-auto h-full max-w-full max-h-full object-contain p-5"
                  />
                </div>
              </div>
            ))}

            {Array.from({
              length: exercisesPerPage - displayedExercises.length,
            }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="relative w-full h-[30vh] border rounded-xl shadow-md hover:border-[#7874AC] transition cursor-pointer flex flex-col"
              ></div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mt-1 space-x-2">
          {[
            ...Array(Math.ceil(filteredExercises.length / exercisesPerPage)),
          ].map((_, index) => (
            <motion.div
              key={`dot-${index}`}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setCurrentPage(index)}
                title={`Go to page ${index + 1}`}
                className={`w-3 h-3 rounded-full shadow-md hover:shadow-lg ${
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
