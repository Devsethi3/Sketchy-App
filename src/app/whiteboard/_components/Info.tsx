"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { GrMenu } from "react-icons/gr"
import { FiLink } from "react-icons/fi"
import { LuPencil } from "react-icons/lu"
import { IoClose } from "react-icons/io5"

const Info = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Project Title");
  return (
    <div className="absolute top-2 left-2 bg-white flex items-center rounded-md shadow-md">
      <div className="flex items-center gap-4 p-3 rounded-md">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/images/logo.svg" width={40} height={40} alt="logo" />
          <p className="font-bold text-xl pt-[.4rem]">SKETCHY</p>
        </Link>
        <p className="font-medium pl-4 border-l-2 border-gray-300">{title}</p>
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
            <button className="flex hover:bg-slate-100 hover:text-[#4F46E5] rounded-md p-2 items-center gap-3">
              <FiLink className="hover:text-[#4F46E5]" />
              <p className="text-sm font-medium">Copy Board Link</p>
            </button>
            <button className="flex hover:bg-slate-100 hover:text-[#4F46E5] rounded-md p-2 items-center gap-3">
              <LuPencil className="hover:text-[#4F46E5]" />
              <p className="text-sm font-medium">Rename</p>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="flex bg-red-50 rounded-md p-2 items-center gap-3">
              <IoClose className="text-red-300 text-xl" />
              <p className="text-sm font-medium">Cancel</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info