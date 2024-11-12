import { Form } from "@/app/components/Form";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex">
      <div className="text-6xl flex flex-col w-fit">
        Bridging
        <div>
          <img src="/glute-bridge.jpg" alt="Glute Bridge" />
        </div>
        <div className="text-xl w-1/3">
          Lie on your back with your knees bent. Tighten the muscles in your
          stomach. Raise your hips off the floor until they line up with your
          knees and shoulders. Hold for three deep breaths.
        </div>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
}
