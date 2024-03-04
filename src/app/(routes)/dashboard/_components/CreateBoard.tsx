"use client";
import { useState, useEffect } from "react";
import CreateBoardModal from "@/app/whiteboard/_components/CreateBoardModal";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import Link from "next/link";
import { useSelectedTeam } from "@/context/SelectedTeamContext";

const CreateBoard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [boards, setBoards] = useState([]);
    const { selectedTeam } = useSelectedTeam();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                // Create a query to filter boards by teamName
                const q = query(collection(db, "boards"), where("teamName.name", "==", selectedTeam.name));
                const querySnapshot = await getDocs(q);
                const boardsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log(boardsData);

                setBoards(boardsData);
            } catch (error) {
                console.error("Error fetching boards:", error);
            }
        };

        fetchBoards();
    }, [selectedTeam]);

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
                                <Image src="/images/cat.svg" fill objectFit="cover" alt={board.boardName} />
                            </div>
                        </Link>
                        <div className="flex border-t-2 pt-2 px-4 items-center justify-between">
                            <h2 className="font-medium text-[1.1rem]">{board.boardName}</h2>
                            <FaRegStar className="text-xl cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
            <CreateBoardModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>
    );
};

export default CreateBoard;
