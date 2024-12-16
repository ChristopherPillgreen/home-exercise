"use client";

import { useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiHeart, HiArrowCircleDown, HiOutlinePencil } from "react-icons/hi";

export default function PlanBar() {
  const [planName, setPlanName] = useState("Name Your Plan Here"); // Default value

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanName(event.target.value); // Update plan name as user types
  };

  return (
    <div>
      <Sidebar className="h-lvh" aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiOutlinePencil}>
              <input
                type="text"
                value={planName}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Name Your Plan Here"
              />
            </Sidebar.Item>
            <Sidebar.Item icon={HiArrowCircleDown}>
              Save and Export
            </Sidebar.Item>

            <Sidebar.Item href="favoriteplans" icon={HiHeart}>
              Favorite Plans
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
