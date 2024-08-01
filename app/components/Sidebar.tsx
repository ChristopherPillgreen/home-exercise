"use client";

import { Sidebar, SidebarLogo } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiTable,
  HiUser,
  HiViewBoards,
  HiHeart,
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
          <Sidebar.Item href="/favorites" icon={HiHeart} label="3">
            My Favorites
          </Sidebar.Item>
          <Sidebar.Item href="profile" icon={HiUser}>
            Profile
          </Sidebar.Item>
          <Sidebar.Item href="sign-in" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
