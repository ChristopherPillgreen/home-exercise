// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from '../../../mikro-orm.config';
import {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from './User.service';

interface UserData {
  username: string;
  email: string;
  password: string;
}

// Helper: Parse query parameters
function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

// Helper: Handle errors
function handleErrorResponse(error: any) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}

// GET: Retrieve a user by ID or all users.
export async function GET(request: NextRequest) {
  const id = getQueryParam(request, 'id');

  try {
    const orm = await getOrm();
    const em = orm.em;

    if (id) {
      const user = await getUserById( Number(id));
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user, { status: 200 });
    } else {
      const users = await getAllUsers();
      return NextResponse.json(users, { status: 200 });
    }
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

// POST: Create a new user.
export async function POST(request: NextRequest) {
  try {
    const orm = await getOrm();
    const em = orm.em;

    const body: UserData = await request.json();
    const newUser = await createUser(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

// PUT: Update an existing user by ID.
export async function PUT(request: NextRequest) {
  const id = getQueryParam(request, 'id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required for update' }, { status: 400 });
  }

  try {
    const orm = await getOrm();
    const em = orm.em;

    const body: Partial<UserData> = await request.json();
    const updatedUser = await updateUser(Number(id), body);
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

// DELETE: Delete a user by ID.
export async function DELETE(request: NextRequest) {
  const id = getQueryParam(request, 'id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required for deletion' }, { status: 400 });
  }

  try {
    const orm = await getOrm();
    const em = orm.em;

    const success = await deleteUser(Number(id));
    if (!success) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}
