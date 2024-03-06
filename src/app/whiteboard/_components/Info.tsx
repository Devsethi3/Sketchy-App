"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { GrMenu } from "react-icons/gr"
import { FiLink } from "react-icons/fi"
import { LuPencil } from "react-icons/lu"
import { IoClose } from "react-icons/io5"
import { MdOutlineContentCopy } from "react-icons/md"
import { RiCheckLine } from "react-icons/ri"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Info = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardLink, setBoardLink] = useState("");
  const [showCheck, setShowCheck] = useState(false);
  const router = useRouter();


  const { data: session } = useSession()

  const openModal = () => {
    setIsModalOpen(true);
    setBoardLink(window.location.href);
    setIsOpen(!isOpen)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(boardLink);
      setShowCheck(true);
      setTimeout(() => {
        setShowCheck(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="absolute top-2 left-2 bg-white flex items-center rounded-md shadow-md">
      <div className="flex items-center gap-4 p-3 rounded-md">
        <Link href={`/dashboard/${session?.user?.email}`} className="flex items-center gap-2" onClick={(e) => {
          e.preventDefault();
          router.push(`/dashboard/${session?.user?.email}`);
        }}>
          <Image src="/images/logo.svg" width={40} height={40} alt="logo" />
          <p className="font-bold text-xl pt-[.4rem]">SKETCHY</p>
        </Link>
        {/* <p className="font-medium pl-4 border-l-2 border-gray-300">
          Title
        </p> */}
        <div className="pl-2 relative border-l-2 border-gray-300">
          <button onClick={() => setIsOpen(!isOpen)}>
            <div className="relative pt-2 pl-2 flex flex-col items-center">
              <GrMenu className="hover:text-[#4F46E5] text-xl cursor-pointer" />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded-md text-xs font-medium opacity-0 transition-opacity duration-150 ease-in-out pointer-events-none">
                Menu
              </span>
            </div>
          </button>
          <div className={`absolute flex flex-col gap-1 transition-all duration-200 ease-in-out rounded-md ${isOpen ? "top-14 opacity-1 pointer-events-auto" : "top-24 opacity-0 pointer-events-none"} bg-white shadow-md p-3 w-[200px]`}>
            <button className="flex hover:bg-slate-100 hover:text-[#4F46E5] rounded-md p-2 items-center gap-3" onClick={openModal}>
              <FiLink className="hover:text-[#4F46E5]" />
              <p className="text-sm font-medium">Copy Board Link</p>
            </button>
            {/* <button className="flex hover:bg-slate-100 hover:text-[#4F46E5] rounded-md p-2 items-center gap-3">
              <LuPencil className="hover:text-[#4F46E5]" />
              <p className="text-sm font-medium">Rename</p>
            </button> */}
            <button onClick={() => setIsOpen(!isOpen)} className="flex bg-red-50 hover:bg-red-100 transition-all rounded-md p-2 items-center gap-3">
              <IoClose className="text-red-300 text-xl" />
              <p className="text-sm font-medium">Cancel</p>
            </button>
          </div>
          {isModalOpen && (
            <div className="fixed top-0 pointer-events-auto left-0 z-30 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white w-[450px] p-8 rounded-md shadow-md">
                <h2 className="text-xl font-bold mb-4">Copy Board Link</h2>
                <p className="text-gray-700 mb-4">Here is the board link:</p>
                <div className="py-2 px-5 bg-slate-50 rounded-md mb-8 flex items-center gap-4">
                  <input type="text" value={boardLink} className="bg-transparent w-full" readOnly />
                  {showCheck ? <RiCheckLine className="text-xl mr-3 font-bold text-green-500" /> : <MdOutlineContentCopy className="text-xl font-bold mr-3 text-gray-700 cursor-pointer" onClick={copyToClipboard} />}
                </div>
                <button className="bg-[#4F46E5] text-white px-6 py-2 text-sm pt-[.7rem] rounded-md hover:bg-[#3f39b5]" onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
