'use client';

import { useState, useEffect } from 'react';

export default function AddExercisePage() {
  const [exercise, setExercise] = useState({
    exerciseName: '',
    exerciseDescription: '',
    image: '',
  });
  const [status, setStatus] = useState<string | null>(null);
  const [exerciseId, setExerciseId] = useState<number | null>(null);

  const [tagName, setTagName] = useState('');
  const [tagStatus, setTagStatus] = useState<string | null>(null);
  const [tags, setTags] = useState<{ id: number; tagName: string }[]>([]);
  const [exerciseTags, setExerciseTags] = useState<{ id: number; tagName: string }[]>([]);

  // NEW STATE for manual input
  const [manualExerciseId, setManualExerciseId] = useState('');
  const [manualTagId, setManualTagId] = useState('');
  const [manualStatus, setManualStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await fetch('/api/Tags');
      const data = await res.json();
      setTags(data);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  const fetchExerciseTags = async (id: number) => {
    try {
      const res = await fetch(`/api/TagExercises?exerciseID=${id}`);
      const data = await res.json();
      setExerciseTags(data);
    } catch (err) {
      console.error('Failed to fetch exercise tags:', err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        const created = await response.json();
        setExerciseId(created.id);
        setStatus('Exercise added!');
        setExercise({ exerciseName: '', exerciseDescription: '', image: '' });
        fetchExerciseTags(created.id);
      } else {
        setStatus('Failed to add exercise.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error occurred.');
    }
  };

  const handleTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTagStatus(null);
    try {
      const response = await fetch('/api/Tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagName }),
      });

      if (response.ok) {
        setTagStatus('Tag added!');
        setTagName('');
        fetchTags();
      } else {
        setTagStatus('Failed to add tag.');
      }
    } catch (err) {
      console.error(err);
      setTagStatus('Error occurred.');
    }
  };

  const handleAddTagToExercise = async (tagId: number) => {
    if (!exerciseId) return;

    try {
      const res = await fetch('/api/TagExercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseID: exerciseId, tagID: tagId }),
      });

      if (res.ok) {
        fetchExerciseTags(exerciseId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveTagFromExercise = async (tagId: number) => {
    if (!exerciseId) return;

    try {
      await fetch(`/api/TagExercises?exerciseID=${exerciseId}&tagID=${tagId}`, {
        method: 'DELETE',
      });
      fetchExerciseTags(exerciseId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleManualTagAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualStatus(null);

    try {
      const res = await fetch('/api/TagExercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseID: Number(manualExerciseId),
          tagID: Number(manualTagId),
        }),
      });

      if (res.ok) {
        setManualStatus('Tag assigned manually!');
        setManualExerciseId('');
        setManualTagId('');
      } else {
        setManualStatus('Failed to assign tag.');
      }
    } catch (err) {
      console.error(err);
      setManualStatus('Error occurred.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Exercise</h1>

      {/* Exercise form */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-6">
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

      {/* Tag Assignment */}
      {exerciseId && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Assign Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleAddTagToExercise(tag.id)}
                className="bg-purple-500 text-white rounded px-3 py-1 hover:bg-purple-600"
              >
                Add {tag.tagName}
              </button>
            ))}
          </div>

          <h3 className="text-md mt-4 font-semibold">Tags Added:</h3>
          <ul className="list-disc list-inside">
            {exerciseTags.map((tag) => (
              <li key={tag.id} className="flex justify-between items-center">
                {tag.tagName}
                <button
                  onClick={() => handleRemoveTagFromExercise(tag.id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add New Tag */}
      <h2 className="text-xl font-semibold mb-2">Add New Tag</h2>
      <form onSubmit={handleTagSubmit} className="flex flex-col space-y-4 mb-6">
        <input
          type="text"
          placeholder="Tag Name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
        >
          Add Tag
        </button>
        {tagStatus && <p className="mt-2 text-sm">{tagStatus}</p>}
      </form>

      {/* Manual Assignment */}
      <h2 className="text-xl font-semibold mb-2">Manually Assign Tag to Exercise</h2>
      <form onSubmit={handleManualTagAssignment} className="flex flex-col space-y-4">
        <input
          type="number"
          placeholder="Exercise ID"
          value={manualExerciseId}
          onChange={(e) => setManualExerciseId(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="number"
          placeholder="Tag ID"
          value={manualTagId}
          onChange={(e) => setManualTagId(e.target.value)}
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white rounded p-2 hover:bg-indigo-600"
        >
          Assign Tag to Exercise
        </button>
        {manualStatus && <p className="mt-2 text-sm">{manualStatus}</p>}
      </form>
    </div>
  );
}