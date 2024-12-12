//import { getOrm } from '../../../mikro-orm.config';
import { orm } from 'mikro-orm.config';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from './User.service';

interface UserData {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
}

// Helper: Parse query parameters
function getQueryParam(request: NextRequest, param: string): string | null {
  console.log('getQueryParam funct');
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

// Helper: Handle errors
function handleErrorResponse(error: any) {
  console.log('in route in handleErrorResponse');
  return NextResponse.json({ error: error.message }, { status: 500 });
}

// GET: Retrieve a user by ID or all users.
export async function GET(request: NextRequest) {
  console.log('get function');
  const id = getQueryParam(request, 'id');

  try {
    //const orm = await getOrm(); // Retrieve the MikroORM instance
    const em = (await orm).em.fork();

    console.log('EntityManager:', em);
    console.log('Fetching users with id:', id);

    if (id) {
      const user = await getUserById(em, Number(id));
      if (!user) {
        console.log('User not found for id:', id);
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(user, { status: 200 });
    } else {
      console.log('fetching all users...');
      const users = await getAllUsers(em);
      console.log('fetched users:', users);
      return NextResponse.json(users, { status: 200 });
    }
  } catch (error: any) {
    console.error('error in get route:', error.message);
    return handleErrorResponse(error);
  }
}

// POST: Create a new user.
export async function POST(request: NextRequest) {
  console.log('post');
  try {
    const em = (await orm).em.fork();

    const body: UserData = await request.json();
    const newUser = await createUser(em, {
      userFirstName: body.userFirstName,
      userLastName: body.userLastName,
      userEmail: body.userEmail,
      userPassword: body.userPassword,
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

// PUT: Update an existing user by ID.
export async function PUT(request: NextRequest) {
  console.log('put');
  const id = getQueryParam(request, 'id');

  if (!id) {
    return NextResponse.json(
      { message: 'ID is required for update' },
      { status: 400 }
    );
  }

  try {
    const em = (await orm).em.fork();

    const body: Partial<UserData> = await request.json();
    const updatedUser = await updateUser(em, Number(id), body);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

// DELETE: Delete a user by ID.
export async function DELETE(request: NextRequest) {
  console.log('delete');
  const id = getQueryParam(request, 'id');

  if (!id) {
    return NextResponse.json(
      { message: 'ID is required for deletion' },
      { status: 400 }
    );
  }

  try {
    const em = (await orm).em.fork();

    const deleteMessage = await deleteUser(em, Number(id));
    return NextResponse.json(deleteMessage, { status: 200 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}
