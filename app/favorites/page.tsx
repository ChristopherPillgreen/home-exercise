import { Card } from "flowbite-react";

export default function Favorites() {
  return (
    <div className="flex justify-center h-lvh p-24 gap-x-6">
      <Card
        className="w-screen hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        imgSrc="/exercisebackground.jpg"
      >
        <div className="justify-center flex text-2xl font-bold">Exercises</div>{" "}
      </Card>
      <Card className="w-screen hover:shadow-2xl hover:scale-105 transition-transform duration-300">
        <div className="justify-center flex text-2xl font-bold">Plans</div>{" "}
      </Card>
    </div>
  );
}
