"use client";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
    const { data: session } = useSession();
    const [teamName, setTeamName] = useState("");
    const userId = Date.now()

    const handleCreateTeam = async () => {
        // Check if the user is authenticated
        if (!session) {
            console.error("User not authenticated.");
            return;
        }

        // Check if the team name is provided
        if (!teamName) {
            console.error("Team name is required.");
            return;
        }

        try {
            // Add a new document to the 'teams' collection with the team name and user details
            await addDoc(collection(db, "teams"), {
                teamName,
                id: userId,
                userEmail: session.user?.email,
                userImage: session.user?.image,
                userName: session.user?.name,
            });

            console.log("Team created successfully!");
        } catch (error) {
            console.error("Error creating team:", error);
        }

        // Close the modal after creating the team
        setIsOpen(false);
    };

    useEffect(() => {
        const handleCloseModal = (event: MouseEvent) => {
            if (isOpen && event.target instanceof HTMLElement && !event.target.closest(".modal-content")) {
                setIsOpen(false);
            }
        };

        document.body.addEventListener("click", handleCloseModal);

        return () => {
            document.body.removeEventListener("click", handleCloseModal);
        };
    }, [isOpen, setIsOpen]);

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 pointer-events-auto left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="modal-content bg-white text-black lg:w-[450px] w-full mx-3 p-8 rounded-md shadow-md">
                        <div className="flex items-center mb-4 justify-between">
                            <h2 className="text-2xl font-bold">Create Team</h2>
                            <MdClose onClick={() => setIsOpen(false)} className="text-4xl p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 cursor-pointer" />
                        </div>
                        <p className="text-gray-700 mb-4">Give a Name to your Team:</p>
                        <input
                            placeholder="Team Name"
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="bg-slate-100 mb-5 py-2.5 px-5 outline-none rounded-md focus-visible:ring-2 focus-visible:ring-[#4F46E5] w-full"
                        />
                        <button
                            className="bg-[#4F46E5] mt-4 text-white px-6 py-2 pt-[.7rem] rounded-md hover:bg-[#3f39b5]"
                            onClick={handleCreateTeam}
                        >
                            Create Team
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
