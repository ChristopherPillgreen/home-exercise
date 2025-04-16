import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from 'mikro-orm.config';
import { 
  getFavoritesByUser, 
  addFavoriteExercise, 
  removeFavoriteExercise } from './favoriteexercises.service';


function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

export async function GET(request: NextRequest) {
  const userID = getQueryParam(request, 'userID');
  if (!userID) {
    return NextResponse.json({ message: 'userID is required' }, { status: 400 });
  }

  try {

    const em = (await getOrm()).em.fork();

    const favorites = await getFavoritesByUser(em, String(userID));
    return NextResponse.json(favorites, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userID, exerciseID } = body;

    if (!userID || !exerciseID) {
      return NextResponse.json({ message: 'userID and exerciseID are required' }, { status: 400 });
    }

    const em = (await getOrm()).em.fork()

    const favorite = await addFavoriteExercise(em, String(userID), Number(exerciseID));
    return NextResponse.json(favorite, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const userID = getQueryParam(request, 'userID');
  const exerciseID = getQueryParam(request, 'exerciseID');

  if (!userID || !exerciseID) {
    return NextResponse.json({ message: 'userID and exerciseID are required' }, { status: 400 });
  }

  try {
    const em = (await getOrm()).em.fork()

    const success = await removeFavoriteExercise(em, String(userID), Number(exerciseID));
    if (!success) {
      return NextResponse.json({ message: 'Favorite not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Favorite removed successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
