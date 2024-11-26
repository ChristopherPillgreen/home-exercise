import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from '../../../mikro-orm.config';
import { 
  getFavoritesByUser, 
  addFavoriteExercise, 
  removeFavoriteExercise } from './favoriteexercises.service';

// Helper: Parse query parameters
function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

// GET: Retrieve all favorite exercises for a user
export async function GET(request: NextRequest) {
  const userID = getQueryParam(request, 'userID');
  if (!userID) {
    return NextResponse.json({ message: 'userID is required' }, { status: 400 });
  }

  try {
    const orm = await getOrm();
    const em = orm.em;

    const favorites = await getFavoritesByUser(em, Number(userID));
    return NextResponse.json(favorites, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Add a new favorite exercise
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userID, exerciseID } = body;

    if (!userID || !exerciseID) {
      return NextResponse.json({ message: 'userID and exerciseID are required' }, { status: 400 });
    }

    const orm = await getOrm();
    const em = orm.em;

    const favorite = await addFavoriteExercise(em, Number(userID), Number(exerciseID));
    return NextResponse.json(favorite, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a favorite exercise
export async function DELETE(request: NextRequest) {
  const userID = getQueryParam(request, 'userID');
  const exerciseID = getQueryParam(request, 'exerciseID');

  if (!userID || !exerciseID) {
    return NextResponse.json({ message: 'userID and exerciseID are required' }, { status: 400 });
  }

  try {
    const orm = await getOrm();
    const em = orm.em;

    const success = await removeFavoriteExercise(em, Number(userID), Number(exerciseID));
    if (!success) {
      return NextResponse.json({ message: 'Favorite not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Favorite removed successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
