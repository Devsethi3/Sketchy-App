import React from 'react';
import SideBar from "../_components/SideBar";
import OrgSideBar from "../_components/OrgSideBar";
import Navbar from "../_components/Navbar";
import { SelectedTeamProvider, useSelectedTeam } from '@/context/SelectedTeamContext';

interface LayoutProps {
  children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {

  return (
    <SelectedTeamProvider>
      <LayoutContent>{children}</LayoutContent>
    </SelectedTeamProvider>
  );
};

const LayoutContent = ({ children }: LayoutProps) => {


  return (
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
  );
};

export default Layout;
