export async function GET() {
  // This is the controller
  console.log('main controller route');
  return Response.json({ hi: "abc" });
}
