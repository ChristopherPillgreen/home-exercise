export async function GET() {
  console.log('main controller route');
  return Response.json({ hi: "abc" });
}
