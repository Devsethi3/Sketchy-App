"use client"
import { useSelectedTeam } from "@/context/SelectedTeamContext";
import CreateBoard from "../_components/CreateBoard";
import DashboardTeam from "../_components/DashboardTeam"

const Dashboard = () => {
  const { selectedTeam } = useSelectedTeam();

  return (
    <>
      <div className='w-full pl-5'>
        {selectedTeam ? <CreateBoard /> : <DashboardTeam />}
      </div>
    </>
  );
}

export default Dashboard;
