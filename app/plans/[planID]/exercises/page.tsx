"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PlusIcon from "../../../components/PlusIcon";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";


type Exercise = {
  exerciseID: number;
  exerciseName: string;
  exerciseDescription: string;
  image: string;
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
  const router = useRouter();

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

    fetchExercises();
  }, []);

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

      setNotification("Exercise added successfully!");
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
      // alert("Exercise added successfully!");
    } catch (err) {
      console.error("Error adding exercise:", err);
      alert("Failed to add exercise.");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Filter exercises based on query
  const filteredExercises = exercises.filter((exercise) =>
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

  return (
    <>
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
          {notification}
        </div>
      )}
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="flex-1 ml-5 mr-15 font-bold text-[#7874AC] text-3xl py-2 px-4 rounded">
          Exercises
        </h1>
        <div className="relative">
          {/* Back Button */}
          <button
            onClick={handleBackNavigation}
            className="py-2 px-4 bg-[#793339] text-white rounded-md focus:outline-none"
          >
            Back to Plan
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

      <div className="flex">
      {/* Left Menu (1/5th of the screen) */}
      <div className="w-1/5 h-auto pr-4">
      <ul className="h-[62vh] bg-gray-100 border border-gray-300 rounded-xl shadow">
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer">Cervical</li>
            <li className="px-4 py-3 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer">Oral Motor</li>
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer">Shoulder</li>
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer">Elbow & Hand</li>
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer">Back</li>
            <li className="px-4 py-5 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer">Hip & Knee</li>
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer">Ankle & Foot</li>
            <li className="px-4 py-4 hover:bg-[#74ac85] hover:rounded-xl hover:text-white cursor-pointer">Education</li>
          </ul>
        </div>

        <div className="w-4/5 grid grid-cols-3 gap-4">
        {displayedExercises.map((exercise) => (
            <div
              key={exercise.exerciseID}
              className="relative flex-1 min-w-[100%] max-w-[30%] h-[30vh] border rounded-xl shadow hover:box-border hover:border-[#7874AC] transition cursor-pointer"
            >
              {/* Top half with white background */}
              <div className="bg-white p-2 rounded-t-xl h-[20%] flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {exercise.exerciseName.length > 26
                    ? `${exercise.exerciseName.slice(0, 24)}...`
                    : exercise.exerciseName}
                </h2>
                <button
                  className="absolute top-2 right-2 font-extrabold text-black px-2 py-1 text-sm rounded hover:bg-gray-500 hover:text-white transition duration-200"
                  onClick={() => handleAddExercise(exercise.exerciseID)} // Pass exerciseID to onAdd
                >
                  <PlusIcon/>
                </button>
              </div>
              {/* Middle half with image */}
              <div className="h-[50%] flex justify-center items-center bg-gray-200">
                <CldImage
                  width="250"
                  height="250"
                  src={exercise.image}
                  sizes="50vw"
                  alt={exercise.exerciseName}
                  className="items-center w-auto h-full max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Bottom half with description */}
              <div className="bg-gray-100 p-2 rounded-b-xl h-[30%] flex">
                <p className="text-gray-600">{exercise.exerciseDescription}</p>
              </div>
            </div>
          ))}

          {/* Placeholder cards to fill layout */}
          {Array.from({ length: exercisesPerPage - displayedExercises.length }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="relative flex-1 min-w-[100%] max-w-[30%] h-[30vh] border rounded-xl shadow bg-gray-100"
            >
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="w-4/5 relative flex items-center justify-center mt-4 space-x-2 ml-auto">
        {[...Array(5)].map((_, index) => {
          const pageIndex = currentInterval * 4 + index; // Calculate the page index for each dot
          const isSelected = currentPage === pageIndex;

          return (
            <button
              key={`dot-${index}`}
              onClick={() => {
                if (index === 0 && currentInterval > 0) {
                  // Shift interval backward when clicking the 1st dot
                  setCurrentInterval((prev) => prev - 1);
                } else if (index === 4 && pageIndex < totalPages - 1) {
                  // Shift interval forward when clicking the 5th dot
                  setCurrentInterval((prev) => prev + 1);
                } else {
                  // Set the current page for other dots
                  setCurrentPage(pageIndex);
                }
              }}
              className={`w-4 h-4 rounded-full ${
                isSelected ? "bg-[#7874AC]" : "bg-gray-300"
              } hover:bg-[#7874AC]`}
            >
            </button>
          );
        })}
      </div>
    </div>
    </>
  );
}