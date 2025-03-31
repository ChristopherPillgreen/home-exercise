
// import { NextResponse } from 'next/server';
// import { getOrm } from '../../../mikro-orm.config'; 
// // Import your entities
// import { Plan } from '@entities/Plan.entity';
// import { PlanExercise } from '@entities/PlanExercise.entity';

// export async function GET() {
//   try {
//     // Initialize MikroORM and fork a new EntityManager
//     const orm = await getOrm();
//     const em = orm.em.fork();

//     // Fetch all records from the "Plan" and "PlanExercise" tables
//     const plans = await em.find(Plan, {});
//     const planExercises = await em.find(PlanExercise, {});

//     // Return the combined JSON response
//     return NextResponse.json({ plans, planExercises });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
//   }
// }

// seniorproject/app/api/export/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  console.log("GET /api/export endpoint was called");
  return NextResponse.json({ message: "Hello from export API" });
}

