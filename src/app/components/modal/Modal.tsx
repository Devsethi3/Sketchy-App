"use client";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
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
                <div className="fixed top-0 pointer-events-auto left-0 z-30 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="modal-content bg-white text-black w-[450px] p-8 rounded-md shadow-md">
                        <div className="flex items-center mb-4 justify-between">
                            <h2 className="text-2xl font-bold">Create Board</h2>
                            <MdClose onClick={() => setIsOpen(false)} className="text-4xl p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 cursor-pointer" />
                        </div>
                        <p className="text-gray-700 mb-4">Give a Name to your Board:</p>
                        <input placeholder="Board Name" type="text" className="bg-slate-100 mb-5 py-2.5 px-5 outline-none rounded-md focus-visible:ring-2 focus-visible:ring-[#4F46E5] w-full" />
                        <button className="bg-[#4F46E5] mt-4 text-white px-6 py-2 pt-[.7rem] rounded-md hover:bg-[#3f39b5]">Create</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
