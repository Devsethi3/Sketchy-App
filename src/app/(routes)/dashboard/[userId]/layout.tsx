"use client"
import React from 'react';
import SideBar from "../_components/SideBar";
import Navbar from "../_components/Navbar";
import { SelectedTeamContextProvider, useSelectedTeam } from '@/context/SelectedTeamContext';
import OrgSideBar from '../_components/OrgSideBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SelectedTeamContextProvider>
      <main className="h-full">
        <SideBar />
        <div className="pl-[60px] h-full">
          <div className="flex gap-x-3 h-full">
            <OrgSideBar />
            <div className="h-full flex-1">
              <Navbar />
              {children}
            </div>
          </div>
        </div>
      </main>
    </SelectedTeamContextProvider>
  )
}

const ChildComponentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedTeam } = useSelectedTeam();

  return <>{children}</>;
}

export default Layout;
