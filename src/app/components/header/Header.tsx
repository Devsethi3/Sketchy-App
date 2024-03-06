"use client"
import Link from "next/link"
import Buttons from "../button/Buttons"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { LuPencil } from "react-icons/lu"
import { BiSolidDashboard } from "react-icons/bi"
import { TbLogout } from "react-icons/tb"
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation"
import { MdOutlineClose } from "react-icons/md"
import { HiMenu } from 'react-icons/hi'

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const { data: session } = useSession();

    const router = useRouter();
    const handleDashboard = () => {
        router.push(`/dashboard/${session?.user?.email}`)
    }

    return (
        <div className="border-b-2 shadow-lg">
            <header className="container">
                <div className="backdrop-blur-sm">
                    <div className="flex h-[4.5rem] items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
                            <p className="text-2xl md:text-3xl lg:text-3xl font-extrabold pl-4 border-l-2 pt-[.4rem] border-gray-500   logo-text">SKETCHY</p>
                        </Link>
                        <div className={`nav-menu ${isMenu ? "show-menu" : "nav-menu"}`}>
                            <nav aria-label="Global" className="">
                                <ul className="flex items-center gap-10">
                                    <button onClick={() => setIsMenu(!isMenu)} className="block md:hidden">
                                        <MdOutlineClose className="nav-close" />
                                    </button>
                                    <li>
                                        <Link href="/" className="text-gray-700 transition nav-link hover:text-gray-700/75"> Home </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="text-gray-700 transition nav-link hover:text-gray-700/75"> About </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="text-gray-700 transition nav-link hover:text-gray-700/75"> Pricing </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="text-gray-700 transition nav-link hover:text-gray-700/75"> Dashboard </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="text-gray-700 transition nav-link hover:text-gray-700/75"> Team </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            {!session ? <div className="sm:flex sm:gap-4">
                                <Link href="/login">
                                    <Buttons content="Login" type="primary" />
                                </Link>
                            </div> :
                                <div className="relative">
                                    <div>
                                        <Image onClick={() => setIsOpen(!isOpen)} src={session?.user?.image || "/default-image.jpg"} width={65} height={65} alt="user" className="rounded-full nav-user p-3 hover:bg-slate-100 cursor-pointer transition-all" />
                                    </div>
                                    {isOpen && <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 50 }}
                                        className="absolute flex flex-col shadow-lg gap-1 p-3 bg-slate-50 w-[200px] right-0">
                                        <button onClick={handleDashboard} className="flex hover:bg-indigo-100 w-full hover:text-[#4F46E5] rounded-md p-2 items-center gap-3">
                                            <BiSolidDashboard className="hover:text-[#4F46E5]" />
                                            <p className="font-medium">Dashboard</p>
                                        </button>
                                        <button className="flex hover:bg-indigo-100 w-full hover:text-[#4F46E5] rounded-md p-2 items-center gap-3">
                                            <LuPencil className="hover:text-[#4F46E5]" />
                                            <p className="font-medium">Rename</p>
                                        </button>
                                        <button onClick={() => signOut()} className="flex hover:bg-red-100 hover:text-red-400 w-full transition-all rounded-md p-2 items-center gap-3">
                                            <TbLogout className=" text-xl" />
                                            <p className="font-medium">Logout</p>
                                        </button>
                                    </motion.div>}
                                </div>
                            }

                            <div className="block md:hidden">
                                <button onClick={() => setIsMenu(!isMenu)} className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <HiMenu className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header