import { Card } from "flowbite-react";

export default function Favorites() {
  return (
    <div className="flex justify-center h-lvh p-24 gap-x-6">
      <Card className="relative w-screen hover:shadow-2xl hover:scale-105 transition-transform duration-300">
        <div className="absolute inset-0 bg-[url('/exercisebackground.jpg')] bg-cover bg-center"></div>
        <div className="relative flex justify-center items-center h-full">
          <span className="text-2xl font-bold text-white">Exercises</span>
        </div>
      </Card>
      <Card className="w-screen hover:shadow-2xl hover:scale-105 transition-transform duration-300">
        <div className="justify-center flex text-2xl font-bold">Plans</div>{" "}
      </Card>
    </div>
  );
}
