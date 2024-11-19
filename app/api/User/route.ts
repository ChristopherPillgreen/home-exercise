import { NextRequest, NextResponse } from 'next/server';
import User from '../../../models/User';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './User.service';


// Main route handler for User API.

export async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    switch (request.method) {
      case 'GET':
        return await handleGet(id);
      case 'POST':
        return await handlePost(request);
      case 'PUT':
        return await handlePut(id, request);
      case 'DELETE':
        return await handleDelete(id);
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


// Handle GET requests.

async function handleGet(id: string | null) {
  if (id) {
    const user = await getUserById(Number(id));
    return NextResponse.json(user, { status: 200 });
  } else {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  }
}


// Handle POST requests.

async function handlePost(request: NextRequest) {
  const data = await request.json();
  const newUser = await createUser(data);
  return NextResponse.json(newUser, { status: 201 });
}


// Handle PUT requests.

async function handlePut(id: string | null, request: NextRequest) {
  if (!id) {
    return NextResponse.json({ message: 'ID is required for update' }, { status: 400 });
  }

  const data = await request.json();
  const updatedUser = await updateUser(Number(id), data);
  return NextResponse.json(updatedUser, { status: 200 });
}


// Handle DELETE requests.

async function handleDelete(id: string | null) {
  if (!id) {
    return NextResponse.json({ message: 'ID is required for deletion' }, { status: 400 });
  }

  const message = await deleteUser(Number(id));
  return NextResponse.json(message, { status: 200 });
}
