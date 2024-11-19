import { NextRequest, NextResponse } from 'next/server';
import {
  getUserFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
} from './favoriteexercises.service';

// Main handler for Favorite Exercises API
export async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const exerciseId = searchParams.get('exerciseId');

  try {
    switch (request.method) {
      case 'GET':
        return await handleGet(userId);
      case 'POST':
        return await handlePost(request);
      case 'DELETE':
        return await handleDelete(userId, exerciseId);
      default:
        return NextResponse.json(
          { message: `Method ${request.method} Not Allowed` },
          { status: 405 }
        );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle GET requests
async function handleGet(userId: string | null) {
  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  const favorites = await getUserFavorites(Number(userId));
  return NextResponse.json(favorites, { status: 200 });
}

// Handle POST requests
async function handlePost(request: NextRequest) {
  const data = await request.json();
  const { userId, exerciseId } = data;

  if (!userId || !exerciseId) {
    return NextResponse.json(
      { message: 'User ID and Exercise ID are required' },
      { status: 400 }
    );
  }

  const isAlreadyFavorite = await isFavorite(Number(userId), Number(exerciseId));

  if (isAlreadyFavorite) {
    return NextResponse.json(
      { message: 'Exercise is already a favorite' },
      { status: 400 }
    );
  }

  const favorite = await addFavorite(Number(userId), Number(exerciseId));
  return NextResponse.json(favorite, { status: 201 });
}

// Handle DELETE requests
async function handleDelete(userId: string | null, exerciseId: string | null) {
  if (!userId || !exerciseId) {
    return NextResponse.json(
      { message: 'User ID and Exercise ID are required for deletion' },
      { status: 400 }
    );
  }

  await removeFavorite(Number(userId), Number(exerciseId));
  return NextResponse.json({ message: 'Favorite exercise removed' }, { status: 200 });
}
