"use client"
import { useState, useEffect } from "react";
import CreateBoardModal from "@/app/whiteboard/_components/CreateBoardModal";
import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import Link from "next/link";
import { useSelectedTeam } from "@/context/SelectedTeamContext";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const CreateBoard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [boards, setBoards] = useState([]);
    const { selectedTeam } = useSelectedTeam();
    const { data: session } = useSession();
    const [likedBoards, setLikedBoards] = useState({});
    const [loadingBoards, setLoadingBoards] = useState({});

    const toggleFavorite = async (boardId) => {
        setLoadingBoards(prevLoadingBoards => ({ ...prevLoadingBoards, [boardId]: true }));
        try {
            const boardRef = doc(db, "boards", boardId);
            const boardSnapshot = await getDoc(boardRef);
            const favorites = boardSnapshot.data().favorites || [];
            const isFavorite = favorites.includes(session?.user?.email);

            if (isFavorite) {
                await updateDoc(boardRef, { favorites: arrayRemove(session?.user?.email) });
            } else {
                await updateDoc(boardRef, { favorites: arrayUnion(session?.user?.email) });
            }

            setLikedBoards(prevLikedBoards => ({
                ...prevLikedBoards,
                [boardId]: !prevLikedBoards[boardId]
            }));
        } catch (error) {
            console.error("Error toggling favorite:", error);
        } finally {
            setLoadingBoards(prevLoadingBoards => ({ ...prevLoadingBoards, [boardId]: false }));
        }
    };

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const q = query(collection(db, "boards"), where("teamName.name", "==", selectedTeam.name));
                const querySnapshot = await getDocs(q);
                const boardsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setBoards(boardsData);

                const initialLikedStatus = {};
                const initialLoadingStatus = {};
                boardsData.forEach(board => {
                    initialLikedStatus[board.id] = board.favorites?.includes(session?.user?.email) || false;
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
        <div>
            <h2 className="text-3xl font-bold my-5">Team Boards</h2>
            <div className="grid grid-cols-4 gap-5 mr-10">
                <div onClick={() => setIsModalOpen(true)} className="bg-[#4F46E5] cursor-pointer rounded-md flex-col flex items-center justify-center h-[300px] text-white">
                    <button className="text-4xl">
                        <GoPlusCircle />
                    </button>
                    <p className="mt-5 text-xl font-semibold">Create Board</p>
                </div>
                {boards.map(board => (
                    <div key={board.id} className="h-[300px] border rounded-md">
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
