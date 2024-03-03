"use client"
import Modal from "@/app/components/modal/Modal"
import { useState } from "react"
import { FiPlus } from "react-icons/fi"

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-full fixed z-10 flex flex-col gap-y-6 left-0 bg-blue-950 text-white w-[70px] p-4">
      <FiPlus onClick={() => setIsOpen(!isOpen)} className="p-2 text-4xl rounded-md bg-[#ffffff1d] cursor-pointer" />
      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
}

export default SideBar