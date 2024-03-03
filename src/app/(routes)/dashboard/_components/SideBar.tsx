"use client"
import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "@/app/components/modal/Modal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

interface Team {
  id: string;
  name: string;
  userEmail: string;
  userImage: string;
  userName: string;
}

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(collection(db, "teams"));
      const teamsData: Team[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const team: Team = {
          id: doc.id,
          name: data.teamName,
          userEmail: data.userEmail,
          userImage: data.userImage,
          userName: data.userName,
        };
        teamsData.push(team);
      });
      setTeams(teamsData);
    };
    fetchTeams();
  }, []);

  return (
    <div className="h-full fixed z-10 flex flex-col gap-y-6 left-0 bg-blue-950 text-white w-[70px] p-4">
      <FiPlus onClick={() => setIsOpen(!isOpen)} className="p-2 text-4xl rounded-md bg-[#ffffff1d] cursor-pointer" />
      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
      {teams.map((team) => (
        <div key={team.id} className="text-xl pt-1 w-[2.2rem] h-[2.2rem] font-semibold grid place-items-center rounded-md bg-gradient-to-br from-[#4F46E5] via-purple-600 to-violet-700">
          {team.name.charAt(0)}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
