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
  const [currentPage, setCurrentPage] = useState(0); // Current page index
  const [currentInterval, setCurrentInterval] = useState(0); // Current interval index
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const exercisesPerPage = 6; // Number of exercises per page
  const { planID } = useParams(); // Get plan ID from URL
  const totalPages = Math.ceil(exercises.length / exercisesPerPage); // Total number of pages
  const [notification, setNotification] = useState("");
  const [notificationfalse, setNotificationfalse] = useState(""); // New state for limit notification
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const router = useRouter();
  const [planExerciseCount, setPlanExerciseCount] = useState(0); // Track number of exercises in plan
  const [selectedCategoryID, setSelectedCategoryID] = useState<number | null>(null); // State to store selected category ID
  const [currentPlanExercises, setCurrentPlanExercises] = useState<PlanExercise[]>([]); // Track current exercises in plan

  const handleOpenInfoModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowInfoModal(true);
  };

  // Function to close the modal
  const handleCloseInfoModal = () => {
    setSelectedExercise(null);
    setShowInfoModal(false);
  };

  // Fetch existing exercises in the plan
  const fetchPlanExercises = async () => {
    try {
      const planIDNumber = Number(planID);
      if (isNaN(planIDNumber)) return;
      
      const response = await fetch(`/api/planexercise?planID=${planIDNumber}`);
      if (!response.ok) throw new Error("Failed to fetch plan exercises.");
      
      const data = await response.json();
      setPlanExerciseCount(data.length);
      setCurrentPlanExercises(data); // Store the current exercises in the plan
    } catch (err) {
      console.error("Error fetching plan exercises:", err);
    }
  };

  useEffect(() => {
    // Fetch exercises in the plan when component mounts
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

    // Only fetch all exercises if no category/tag is selected
    if (selectedCategoryID === null) {
      fetchExercises();
    }
  }, [selectedCategoryID]); // Add selectedCategoryID to dependency array

  // Handles search functionality
  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery) {
      // If search query is empty, fetch all exercises again
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
      // Fetch exercises matching the search query
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
      // Check if we've reached the limit
      if (planExerciseCount >= 10) {
        setNotificationfalse("You cannot exceed 10 exercises");
        setTimeout(() => setNotificationfalse(""), 3000);
        return;
      }
      
      // Fixed duplicate check - compare with existing exercises in the plan
      const isDuplicate = currentPlanExercises.some(exercise => exercise.exerciseID === exerciseID);
      if (isDuplicate) {
        setNotification("Cannot have duplicate exercises.");
        setTimeout(() => setNotification(""), 3000);
        return;
      }

      const planIDNumber = Number(planID);
      if (isNaN(planIDNumber)) {
        alert("Invalid Plan ID.");
        return;
      }

      const response = await fetch(`/api/planexercise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planID: planIDNumber, exerciseID }),
      });

      if (!response.ok) {
        throw new Error("Failed to add exercise to plan.");
      }
      
      // Update local state to reflect the new exercise
      setPlanExerciseCount(prevCount => prevCount + 1);
      setCurrentPlanExercises(prev => [...prev, { exerciseID }]);
      setNotification("Exercise added successfully!");
      setTimeout(() => setNotification(""), 3000); 
    } catch (err) {
      console.error("Error adding exercise:", err);
      setNotification("Cannot add duplicate exercises.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Filter exercises based on query
  const filteredExercises = exercises.filter((exercise) =>
    exercise.exerciseName && exercise.exerciseName.toLowerCase().includes(query.toLowerCase())
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

      // If data is like [{ exercise: {...} }], extract the inner exercise
      const extractedExercises = data.map((item: any) => item.exercise); 
      console.log("Extracted exercises:", extractedExercises);

      setExercises(extractedExercises); // Set state with clean exercise objects
      setCurrentPage(0);
    } catch (error) {
      console.error("Error fetching exercises by tag:", error);
      setError("Failed to fetch exercises by tag.");
    }
  };

  return (
  <>
    {notification && (
      <div className={`fixed top-5 right-5 z-50 ${notification.includes("Cannot") ? "bg-[#793339]" : "bg-green-500"} text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300`}>
        {notification}
      </div>
    )}
    {notificationfalse && (
      <div
        className="fixed top-5 right-5 z-50 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300"
        style={{ backgroundColor: '#793339' }}
      >
        {notificationfalse}
      </div>
    )}
    <div className="container h-fit w-full overflow-hidden">
      <div className="flex items-center justify-between w-full">
          <h1 className="flex font-bold text-[#7874AC] text-3xl">
            Exercises
          </h1>
        <div className="flex p-4 w-fit max-w-lg space-x-4">
          {/* Back Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleBackNavigation}
              className="h-full w-fit px-4 bg-[#793339] text-white rounded-xl flex items-center justify-center overflow-hidden"
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
              className="h-full w-full px-4 rounded-xl border border-[#74ac85] focus:outline-none focus:ring-2 focus:ring-[#7874ac] text-sm"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </motion.div>
        </div>
      </div>

      <div className="flex">
        {/* Left Menu (1/5th of the screen) */}
        <div className="w-1/5 h-auto pr-4">
          <ul className="h-[62vh] bg-gray-100 border border-gray-300 rounded-xl shadow">
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer"
              onClick={() => handleClick(1)}>
              Cervical
            </li>
            <li className="px-4 py-3 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer"
              onClick={() => handleClick(2)}>
              Oral Motor
            </li>
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer"
              onClick={() => handleClick(3)}>
              Shoulder
            </li>
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer"
              onClick={() => handleClick(4)}>
              Elbow & Hand
            </li>
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer"
              onClick={() => handleClick(5)}>
              Back
            </li>
            <li className="px-4 py-5 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer"
              onClick={() => handleClick(6)}>
              Hip & Knee
            </li>
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer"
              onClick={() => handleClick(7)}>
              Lower Body Strength
            </li>
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer"
              onClick={() => handleClick(8)}>
              Upper Body Strength
            </li>
          </ul>
        </div>

        {/* Right Section (Exercise Cards) */}
        <div className="w-4/5 grid grid-cols-3 gap-4">
          {displayedExercises.map((exercise) => (
            <div
              key={exercise.exerciseID}
              className="relative w-full border rounded-xl shadow hover:border-[#7874AC] transition cursor-pointer"
            >
              {/* Top half with white background */}
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
                    color="#b9633a"
                    size={30}
                  />
                </motion.div>
                {showInfoModal && selectedExercise && (
                  <div className="fixed inset-0 bg-purple-100 bg-opacity-50 flex items-center justify-center z-50">
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
                            color="#793339"
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
                    color="#74ac85"
                    size={30}
                  />
                </motion.div>
              </div>
              {/* Middle half with image */}
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

          {/* Placeholder cards to fill layout */}
          {Array.from({
            length: exercisesPerPage - displayedExercises.length,
          }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="relative w-full h-[30vh] border rounded-xl shadow hover:border-[#7874AC] transition cursor-pointer flex flex-col"
            ></div>
          ))}
        </div>
      </div>

      {/* Pagination Dots for Exercises (alternative pagination) */}
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
              className={`w-3 h-3 rounded-full ${
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