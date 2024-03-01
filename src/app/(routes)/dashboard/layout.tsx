import React from "react"
import SideBar from "./_components/SideBar";
import OrgSideBar from "./_components/OrgSideBar";
import Navbar from "./_components/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
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
    </>
  )
}

export default Layout