
import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from 'mikro-orm.config';
import { Plan } from '@entities/Plan.entity';
import { getUserById } from '@api/User/User.service';

export interface IUser {
  id: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;

}

function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

export async function GET(request: NextRequest) {
  const em = (await getOrm()).em.fork();
  
  const planID = getQueryParam(request, 'planID');
  const userID = getQueryParam(request, 'userID');

  if (!planID || !userID) {
    return NextResponse.json(
      { message: 'planID and userID are required' },
      { status: 400 }
    );
  }

  try {
 
    const plan = await em.findOne(Plan, { planID: Number(planID) }, { populate: ['user'] });
    if (!plan) {
      return NextResponse.json({ message: 'Plan not found' }, { status: 404 });
    }
    
    const user = await getUserById(em, String(userID));
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (!plan.user || plan.user.userID !== user.userID) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    return NextResponse.json({ exists: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error verifying plan association:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
