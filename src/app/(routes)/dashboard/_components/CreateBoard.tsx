"use client"
import { useState, useEffect } from "react";
import CreateBoardModal from "@/app/whiteboard/_components/CreateBoardModal";
import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, arrayRemove, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import Link from "next/link";
import { useSelectedTeam } from "@/context/SelectedTeamContext";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Team } from "@/types/teamTypes";

interface Board {
    id: string;
    imageUrl: string;
    boardName: string;
    teamName: Team;
    favorites?: string[];
}

const CreateBoard = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [boards, setBoards] = useState<Board[]>([]);
    const { selectedTeam } = useSelectedTeam(); // Updated to useSelectedTeam without specifying type argument
    const { data: session } = useSession();
    const [likedBoards, setLikedBoards] = useState<Record<string, boolean>>({});
    const [loadingBoards, setLoadingBoards] = useState<Record<string, boolean>>({});
    const [isHovered, setIsHovered] = useState(false);

    const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

    const toggleFavorite = async (boardId: string) => {
        setLoadingBoards(prevLoadingBoards => ({ ...prevLoadingBoards, [boardId]: true }));
        try {
            const boardRef = doc(db, "boards", boardId);
            const boardSnapshot = await getDoc(boardRef);
            const boardData = boardSnapshot.data() as Board | undefined;
            const favorites = boardData ? boardData.favorites || [] : [];
            const isFavorite = favorites.includes(session?.user?.email || '');

            if (isFavorite) {
                await updateDoc(boardRef, { favorites: arrayRemove(session?.user?.email || '') });
            } else {
                await updateDoc(boardRef, { favorites: arrayUnion(session?.user?.email || '') });
            }

            setLikedBoards(prevLikedBoards => ({
                ...prevLikedBoards,
                [boardId]: !prevLikedBoards[boardId as keyof typeof prevLikedBoards]
            }));
        } catch (error) {
            console.error("Error toggling favorite:", error);
        } finally {
            setLoadingBoards(prevLoadingBoards => ({ ...prevLoadingBoards, [boardId]: false }));
        }
    };

    const handleDeleteBoard = async (boardId: string) => {
        try {
            await deleteDoc(doc(db, "boards", boardId));
            setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
        } catch (error) {
            console.error("Error deleting board:", error);
        }
    };

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const q = query(collection(db, "boards"), where("teamName.name", "==", selectedTeam?.name));
                const querySnapshot = await getDocs(q);
                const boardsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Board));

                setBoards(boardsData);

                const initialLikedStatus: Record<string, boolean> = {};
                const initialLoadingStatus: Record<string, boolean> = {};
                boardsData.forEach(board => {
                    initialLikedStatus[board.id] = board.favorites?.includes(session?.user?.email || '') || false;
                    initialLoadingStatus[board.id] = false;
                });
                setLikedBoards(initialLikedStatus);
                setLoadingBoards(initialLoadingStatus);
            } catch (error) {
                console.error("Error fetching boards:", error);
            }
        };

        fetchBoards();
    }, [selectedTeam, session]);

    return (
        <div className="my-5">
            <h2 className="text-2xl lg:text-3xl lg:text-start text-center font-bold my-5">Team Boards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mr-3 lg:mr-10">
                <div onClick={() => setIsModalOpen(true)} className="bg-[#4F46E5] cursor-pointer rounded-md flex-col flex items-center justify-center h-[230px] lg:h-[300px] text-white">
                    <button className="text-4xl">
                        <GoPlusCircle />
                    </button>
                    <p className="mt-5 text-xl font-semibold">Create Board</p>
                </div>
                {boards.map(board => (
                    <div key={board.id} className="min-h-[300px] border rounded-md" onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        {isHovered && <div className="relative">
                            <BsThreeDots onClick={() => setSelectedBoardId(selectedBoardId === board.id ? null : board.id)} className="text-4xl absolute right-2 z-[1] cursor-pointer p-2 hover:bg-slate-200 top-2 shadow-lg bg-blue-50 rounded-full" />
                            {selectedBoardId === board.id && <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: .2, ease: "easeInOut" }}
                                className="absolute top-14 rounded-md flex z-[1] flex-col shadow-lg gap-1 w-[150px] right-0">
                                <button onClick={() => handleDeleteBoard(board.id)} className="flex bg-red-100 rounded-md p-2 hover:bg-red-400 hover:text-white px-4 items-center gap-3">
                                    <RiDeleteBin5Line className="text-xl" />
                                    <p className="font-medium pt-[.3rem]">Delete</p>
                                </button>
                            </motion.div>}
                        </div>}
                        <Link href={`/whiteboard/${board.id}`}>
                            <div className="relative h-[250px]">
                                <Image src={board?.imageUrl} fill objectFit="cover" alt={board.boardName} />
                            </div>
                        </Link>
                        <div className="flex border-t-2 pt-2 px-4 items-center justify-between">
                            <h2 className="font-medium text-[1.1rem]">{board.boardName}</h2>
                            <motion.button
                                className="flex items-center gap-1"
                                onClick={() => toggleFavorite(board.id)}
                                disabled={loadingBoards[board.id]}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {loadingBoards[board.id] ? (
                                    <div className="w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                                ) : (
                                    likedBoards[board.id] ? <FaStar className="text-yellow-400 text-xl cursor-pointer" /> : <FaRegStar className="text-xl cursor-pointer" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                ))}
            </div>
            <CreateBoardModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>
    );
};

export default CreateBoard;
