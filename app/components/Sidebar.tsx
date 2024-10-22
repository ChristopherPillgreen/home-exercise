"use client";

import { Sidebar } from "flowbite-react";
import { HiViewBoards } from "react-icons/hi";
import SearchForm from "./Searchbar";

export default function Nav() {
  return (
    <div>
      <SearchForm />
      <Sidebar className="h-lvh" aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse
              href="/exercises"
              icon={HiViewBoards}
              label="Exercises"
            >
              <Sidebar.Item>Cervical</Sidebar.Item>
              <Sidebar.Item>Oral Motor</Sidebar.Item>
              <Sidebar.Item>Shoulder</Sidebar.Item>
              <Sidebar.Item>Elbow & Hand</Sidebar.Item>
              <Sidebar.Item>Thoracic Lumbar</Sidebar.Item>
              <Sidebar.Item>Ankle & Foot</Sidebar.Item>
              <Sidebar.Item>Education</Sidebar.Item>
              <Sidebar.Item>Special</Sidebar.Item>

              <Sidebar.Item></Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
