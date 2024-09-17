"use client";

import HeartIcon from "./HeartIcon";
import { Sidebar, SidebarLogo } from "flowbite-react";
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
      <Sidebar.Logo href="#" img="/logo.png">
        TheraFit
      </Sidebar.Logo>{" "}
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={HiChartPie}>
            Home
          </Sidebar.Item>
          <Sidebar.Item href="/exercises" icon={HiViewBoards}>
            Exercises
          </Sidebar.Item>
          <Sidebar.Collapse href="/favorites" icon={HiHeart} label="Favorites">
            <Sidebar.Item href="#">Exercises</Sidebar.Item>
            <Sidebar.Item href="#">Plans</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="/settings" icon={HiOutlineCog}>
            Settings
          </Sidebar.Item>
          <Sidebar.Item href="/sign-in" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="/sign-up" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
          <Sidebar.Item href="/" icon={HiArrowSmLeft}>
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
