"use client"
import { useState, useEffect } from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import { motion } from 'framer-motion';
import { BiSolidDashboard } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Modal from "@/app/components/modal/Modal";
import { useSelectedTeam } from "@/context/SelectedTeamContext";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface Team {
    id: string;
    name: string;
    userEmail: string;
    userImage: string;
    userName: string;
}

const OrgSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);
    const { selectedTeam, setSelectedTeam } = useSelectedTeam();

    const [isBoardActive, setIsBoardActive] = useState(false);
    const [isFavActive, setIsFavActive] = useState(false);
    const [isToggle, setIsToggle] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();

    const pathName = usePathname();


    useEffect(() => {
        if (pathName === `/dashboard/${session?.user?.email}/team-boards/favourites`) {
            setIsFavActive(true)
            setIsBoardActive(false);
        }
        else if (pathName === `/dashboard/${session?.user?.email}/team-boards`) {
            setIsBoardActive(true);
            setIsFavActive(false)
        }
    }, [pathName]);

    const handleTeamSelect = (team: Team) => {
        setIsBoardActive(false);
        setIsFavActive(false)
        if (selectedTeam?.id === team.id) {
            setIsOpen(!isOpen);
        } else {
            setSelectedTeam(team);
            setIsOpen(false);
        }
    };


    const handleTeamBoardsClick = () => {
        router.push(`/dashboard/${session?.user?.email}/team-boards`);
    };

    const handleFavouritesClick = () => {
        router.push(`/dashboard/${session?.user?.email}/team-boards/favourites`);
    };

    useEffect(() => {
        const fetchTeams = async () => {
            if (!session) return;

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

    const handleSelectTeam = () => {
        router.push(`/dashboard/${session?.user?.email}`);
        setIsOpen(!isOpen)
    };
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className={`lg:flex relative h-screen org-sidebar bg-[#ffffff] transition-width duration-200 ease-in-out lg:flex-col lg:space-y-6 ${isToggle ? "lg:min-w-[250px] w-[250px]" : "w-[10px]"} lg:pl-5 lg:pt-2`}
            >
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="sidebar-toggle"
                >
                    {isToggle ? (
                        <MdKeyboardDoubleArrowRight
                            onClick={() => setIsToggle(!isToggle)}
                            className="absolute -right-8 cursor-pointer rounded-md top-6 text-4xl p-2 text-white bg-[#4F46E5]"
                        />
                    ) : (
                        <MdKeyboardDoubleArrowLeft
                            onClick={() => setIsToggle(!isToggle)}
                            className="absolute -right-8 cursor-pointer rounded-md top-6 text-4xl p-2 text-white bg-[#4F46E5]"
                        />
                    )}
                </motion.div>
                <div className={`${isToggle ? "block" : "hidden"} flex overflow-hidden justify-center items-center gap-4 p-1 sidebar-logo rounded-md`}>
                    <Link href={`/dashboard/${session?.user?.email}`} className="flex items-center gap-2">
                        <Image src="/images/logo.svg" width={40} height={40} alt="logo" />
                        <p className="font-bold text-xl pt-[.4rem]">SKETCHY</p>
                    </Link>
                </div>
                <div className={`flex relative mx-2 ${isToggle ? null : "overflow-hidden"} sidebar-select items-center flex-col`}>
                    <button
                        onClick={handleSelectTeam}
                        className={`flex items-center w-full gap-4 justify-center bg-slate-50 hover:bg-blue-100 p-2.5 rounded-md ${isOpen ? "bg-blue-500" : ""}`}
                    >
                        <div className="w-6 h-6 grid place-items-center lg:text-base text-sm text-white font-semibold pt-0.5 rounded-md bg-teal-700">
                            {selectedTeam?.name ? selectedTeam.name.charAt(0) : "S"}
                        </div>
                        <p className="pt-[.3rem] whitespace-nowrap lg:text-base text-sm font-medium">
                            {selectedTeam?.name ? selectedTeam.name : "Select Team"}
                        </p>
                        <LuChevronsUpDown className="text-xl text-gray-600" />
                    </button>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute flex top-14 min-w-[200px] lg:w-[300px] z-10 flex-col shadow-lg gap-3 p-3 bg-blue-100 rounded-md left-10"
                        >
                            {teams.length === 0 ? (
                                <>
                                    <div className="text-gray-600">No teams available. Create a team to get started.</div>
                                    <button className="py-2.5 pt-[.8rem] rounded-md px-8 text-white bg-[#4F46E5]" onClick={() => setIsModalOpen(!isModalOpen)}>Create Your Team</button>
                                </>
                            ) : (
                                teams.map((team) => (
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
                                ))
                            )}
                        </motion.div>
                    )}
                </div>
                <div className="flex relative sidebar-btn overflow-hidden gap-5 items-start mx-2 flex-col">
                    <button
                        onClick={handleTeamBoardsClick}
                        className={`flex items-center gap-4 w-full lg:text-base text-sm border hover:bg-[#4F46E5] transition-all hover:text-white p-2.5 rounded-md ${isBoardActive ? 'bg-[#4F46E5] text-white' : ''}`}
                    >
                        <BiSolidDashboard />
                        <span className="pt-[.2rem] font-medium">Team Boards</span>
                    </button>

                    <button onClick={handleFavouritesClick} className={`flex lg:text-base text-sm items-center gap-4 w-full border hover:bg-[#4F46E5] transition-all hover:text-white p-2.5 rounded-md ${isFavActive ? 'bg-[#4F46E5] text-white' : ''}`}>
                        <FaStar />
                        <span className="pt-[.2rem] font-medium">Favourite Boards</span>
                    </button>
                    {isModalOpen && <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
                </div>
            </motion.div>
        </>
    );
};

export default OrgSideBar;