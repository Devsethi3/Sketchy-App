"use client"
import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "@/app/components/modal/Modal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTeams = async () => {
      if (!session) return; // Return if user is not logged in

      const q = query(
        collection(db, "teams"),
        where("userEmail", "==", session?.user?.email)
      );
      const querySnapshot = await getDocs(q);

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
  }, [session]); // Fetch teams whenever the session changes

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
