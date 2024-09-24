"use client";

import HeartIcon from "./HeartIcon";
import { Sidebar, SidebarCollapse, SidebarLogo } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiTable,
  HiUser,
  HiViewBoards,
  HiHeart,
  HiOutlineCog,
  HiArrowSmLeft,
} from "react-icons/hi";

export default function Nav() {
  return (
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
  );
}
