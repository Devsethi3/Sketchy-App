"use client"

import { useEffect, useState } from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import { motion } from 'framer-motion';
import { BiSolidDashboard } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Team {
    id: string;
    name: string;
    userEmail: string;
    userImage: string;
    userName: string;
}

const OrgSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    const { data: session } = useSession()

    const handleTeamSelect = (team: Team) => {
        if (selectedTeam?.id === team.id) {
            setIsOpen(!isOpen); // Toggle the dropdown menu if the same team is selected again
        } else {
            setSelectedTeam(team);
            setIsOpen(false); // Close the dropdown after selecting a team
        }
    };


    useEffect(() => {
        const fetchTeams = async () => {
            if (!session) return; // If no user is authenticated, do nothing

            const querySnapshot = await getDocs(
                query(collection(db, "teams"), where("userEmail", "==", session?.user?.email))
            );

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
    }, [session]);

    return (
        <div className="hidden min-h-screen lg:flex flex-col space-y-6 min-w-[230px] pl-5 pt-2">
            <div className="flex items-center gap-4 p-3 rounded-md">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/images/logo.svg" width={40} height={40} alt="logo" />
                    <p className="font-bold text-xl pt-[.4rem]">SKETCHY</p>
                </Link>
            </div>
            <div className="flex relative items-center flex-col">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center gap-4 bg-slate-50 p-2.5 rounded-md ${isOpen ? "bg-blue-500" : ""}`}
                >
                    <div className="w-6 h-6 grid place-items-center text-white font-semibold pt-0.5 rounded-md bg-teal-700">
                        {selectedTeam ? selectedTeam.name.charAt(0) : "S"}
                    </div>
                    <p className="pt-[.3rem] whitespace-nowrap font-medium">{selectedTeam ? selectedTeam.name : "Select Team"}</p>
                    <LuChevronsUpDown className="text-xl text-gray-600" />
                </button>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute flex top-14 z-10 flex-col shadow-lg gap-3 p-3 bg-blue-100 rounded-md left-10"
                    >
                        {teams.map((team) => (
                            <button
                                key={team.id}
                                onClick={() => handleTeamSelect(team)}
                                className={`relative flex items-center gap-4 bg-slate-50 p-2.5 rounded-md cursor-pointer ${selectedTeam?.id === team.id ? "bg-blue-500" : ""
                                    }`}
                            >
                                <div className="w-6 h-6 grid place-items-center text-white font-semibold pt-0.5 rounded-md bg-teal-700">
                                    {team.name.charAt(0)}
                                </div>
                                <p className="pt-[.3rem] whitespace-nowrap font-medium">{team.name}</p>
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>
            <div className="flex relative gap-5 items-start mx-2 flex-col">
                <button className="flex items-center gap-4 w-full bg-slate-50 p-2.5 rounded-md">
                    <BiSolidDashboard />
                    <span className="pt-[.2rem] font-medium">Team Boards</span>
                </button>
                <button className="flex items-center gap-4 w-full bg-slate-50 p-2.5 rounded-md">
                    <FaStar />
                    <span className="pt-[.2rem] font-medium">Favourite Boards</span>
                </button>
            </div>
        </div>
    );
};

export default OrgSideBar;
