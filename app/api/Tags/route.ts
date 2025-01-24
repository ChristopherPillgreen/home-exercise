import { orm } from 'mikro-orm.config';
import { NextRequest, NextResponse } from 'next/server';
import { getAllTags, getTagById, createTag, updateTag, deleteTag } from './Tag.service';

// Helper: Parse query parameters
function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

// GET: Retrieve all tags or a specific tag by ID
export async function GET(request: NextRequest) {
  const id = getQueryParam(request, 'id');
  const withExercises = getQueryParam(request, 'withExercises') === 'true';

  try {
    const em = (await orm).em.fork();

    if (id) {
      const tag = await getTagById(em, Number(id), withExercises);
      if (!tag) return NextResponse.json({ message: 'Tag not found' }, { status: 404 });
      return NextResponse.json(tag, { status: 200 });
    } else {
      const tags = await getAllTags(em, withExercises);
      return NextResponse.json(tags, { status: 200 });
    }
  } catch (error ) {
    return NextResponse.json({ error  }, { status: 500 });
  }
}

// POST: Create a new tag
export async function POST(request: NextRequest) {
  try {
    const em = (await orm).em.fork();

    const body = await request.json();
    const tag = await createTag(em, body.tagName);

    return NextResponse.json(tag, { status: 201 });
  } catch (error ) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// PUT: Update a tag
export async function PUT(request: NextRequest) {
  const id = getQueryParam(request, 'id');
  if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

  try {
    const em = (await orm).em.fork();

    const body = await request.json();
    const tag = await updateTag(em, Number(id), body.tagName);

    return NextResponse.json(tag, { status: 200 });
  } catch (error ) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// DELETE: Delete a tag
export async function DELETE(request: NextRequest) {
  const id = getQueryParam(request, 'id');
  if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

  try {
    const em = (await orm).em.fork();

    const success = await deleteTag(em, Number(id));
    if (!success) return NextResponse.json({ message: 'Tag not found' }, { status: 404 });

    return NextResponse.json({ message: 'Tag deleted successfully' }, { status: 200 });
  } catch (error ) {
    return NextResponse.json({ error  }, { status: 500 });
  }
}
