"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import { jsPDF } from "jspdf";
import { FaQrcode, FaCommentMedical, FaPersonRunning, FaBars, FaRegFolder, FaRegBookmark } from 'react-icons/fa6';


export default function Planner() {
    const [plantitle, setPlantitle] = useState("Click to change title");
    const [isEditing, setIsEditing] = useState(false);
  
    // Load saved plantitle from localStorage on component mount
    useEffect(() => {
      const savedPlantitle = localStorage.getItem('sidebarPlantitle');
      if (savedPlantitle) {
        setPlantitle(savedPlantitle);
      }
    }, []);
  
    // Function to handle saving the plantitle to localStorage
    const savePlantitle = () => {
      localStorage.setItem('sidebarPlantitle', plantitle);
      setIsEditing(false);
    };

    return(  
    <div className="flex h-screen">
    <Sidebar className="flex items-center">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/home">
                <img src="/logo.png" alt="Logo" style={{ width: '100px', marginRight: '10px' }} />
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={FaRegBookmark}>
                {isEditing ? (
                    <input 
                    type="text" 
                    value={plantitle} 
                    onChange={(e) => setPlantitle(e.target.value)} 
                    onBlur={savePlantitle} 
                    autoFocus 
                    />
                ) : (
                    <span onClick={() => setIsEditing(true)}>
                    {plantitle}
                    </span>
                )}
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={FaRegFolder} label="3" labelColor="dark">
                Load Plans
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={FaPersonRunning}>
                Add Exercises
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={FaCommentMedical}>
                Add Comments
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={FaBars}>
                Change Layout
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={FaQrcode}>
                Save & Export
                </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
    );
}