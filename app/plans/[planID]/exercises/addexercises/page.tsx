'use client'

import { useState } from 'react'

export default function AddExercisePage() {
  const [exercise, setExercise] = useState({
    exerciseName: '',
    exerciseDescription: '',
    image: '',
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const response = await fetch('/api/exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
      });

      if (response.ok) {
        setStatus('Exercise added!');
        setExercise({ exerciseName: '', exerciseDescription: '', image: '' });
      } else {
        setStatus('Failed to add exercise.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error occurred.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Exercise</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          name="exerciseName"
          type="text"
          placeholder="Exercise Name"
          value={exercise.exerciseName}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <textarea
          name="exerciseDescription"
          placeholder="Description"
          value={exercise.exerciseDescription}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          name="image"
          type="text"
          placeholder="Image path (e.g. pullup.jpg)"
          value={exercise.image}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          Add Exercise
        </button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </form>
    </div>
  );
}
