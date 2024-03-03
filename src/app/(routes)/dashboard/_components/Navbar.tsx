"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { CgSearch } from "react-icons/cg";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <>
            <div className='flex items-center gap-x-6 p-5'>
                <div className="flex items-center focus-within:ring-2 focus-within:ring-[#4F46E5] border-2 bg-[#fafafa] py-2.5 px-5 w-full rounded-md gap-3">
                    <CgSearch className="text-xl text-gray-500 mr-3" />
                    <input type="search" placeholder="Search Boards" className="bg-transparent pt-[.2rem] w-full outline-none" />
                </div>
                <div>
                    <Image src={session?.user?.image || "/default-image.jpg"}
                        width={50} height={50}
                        alt={session?.user?.name || "User"} className="rounded-full" />
                </div>
            </div>
        </>
    )
}

export default Navbar