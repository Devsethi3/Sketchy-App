"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import { GoPlus } from "react-icons/go";
import { LuPencil } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <>
            <div className='flex items-center gap-x-6 p-5'>
                <div className="flex items-center focus-within:ring-2 focus-within:ring-[#4F46E5] border-2 bg-[#fafafa] py-2.5 px-5 w-full rounded-md gap-3">
                    <CgSearch className="text-xl text-gray-500 mr-3" />
                    <input type="search" placeholder="Search Boards" className="bg-transparent pt-[.2rem] w-full outline-none" />
                </div>
                <button className="flex items-center gap-3 bg-slate-50 border py-2 px-5 rounded-md">
                    <GoPlus />
                    <span className="whitespace-nowrap pt-[.2rem] font-medium text-sm">Invite Members</span>
                </button>
                <div className="relative">
                    <div>
                        <Image onClick={() => setIsOpen(!isOpen)} src={session?.user?.image || "/default-image.jpg"} width={70} height={70} alt="user" className="rounded-full p-2 hover:bg-slate-100 cursor-pointer transition-all" />
                    </div>
                    {isOpen && <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute flex flex-col shadow-lg gap-1 p-3 bg-slate-50 w-[200px] right-0">
                        <button className="flex hover:bg-indigo-100 w-full hover:text-[#4F46E5] rounded-md p-2 items-center gap-3">
                            <LuPencil className="hover:text-[#4F46E5]" />
                            <p className="font-medium">Rename</p>
                        </button>
                        <button onClick={handleLogout} className="flex hover:bg-red-100 hover:text-red-400 w-full transition-all rounded-md p-2 items-center gap-3">
                            <TbLogout className=" text-xl" />
                            <p className="font-medium">Logout</p>
                        </button>
                    </motion.div>}
                </div>
            </div>
        </>
    )
}

export default Navbar