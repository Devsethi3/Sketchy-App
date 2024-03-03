"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { LuChevronsUpDown } from "react-icons/lu"
import { motion } from 'framer-motion'

const OrgSideBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="hidden min-h-screen lg:flex flex-col space-y-6 w-[230px] pl-5 pt-2">
                <div className="flex items-center gap-4 p-3 rounded-md">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/images/logo.svg" width={40} height={40} alt="logo" />
                        <p className="font-bold text-xl pt-[.4rem]">SKETCHY</p>
                    </Link>
                </div>
                <div className="flex relative items-center flex-col">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-4 bg-slate-50 p-2.5 rounded-md">
                        <div className="w-6 h-6 grid place-items-center text-white font-semibold pt-0.5 rounded-md bg-teal-700">F</div>
                        <p className="pt-[.3rem] whitespace-nowrap font-medium">First Project</p>
                        <LuChevronsUpDown className="text-xl text-gray-600" />
                    </button>
                    {isOpen && <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute flex top-14 flex-col shadow-lg gap-3 p-3 bg-blue-100 rounded-md left-10">
                        <button className="flex min-w-[200px] items-center gap-4 bg-slate-50 p-2.5 rounded-md">
                            <div className="w-6 h-6 grid place-items-center text-white font-semibold pt-0.5 rounded-md bg-blue-700">S</div>
                            <p className="pt-[.3rem] whitespace-nowrap font-medium">Second Project</p>
                            <LuChevronsUpDown className="text-xl text-gray-600" />
                        </button>
                        <button className="flex min-w-[200px] items-center justify-between bg-slate-50 p-2.5 rounded-md">
                            <div className="w-6 h-6 grid place-items-center text-white font-semibold pt-0.5 rounded-md bg-orange-700">T</div>
                            <p className="pt-[.3rem] whitespace-nowrap font-medium">Third Project</p>
                            <LuChevronsUpDown className="text-xl text-gray-600" />
                        </button>
                        <button className="flex min-w-[200px] items-center gap-4 bg-slate-50 p-2.5 rounded-md">
                            <div className="w-6 h-6 grid place-items-center text-white font-semibold pt-0.5 rounded-md bg-red-700">F</div>
                            <p className="pt-[.3rem] whitespace-nowrap font-medium">Fourth Project</p>
                            <LuChevronsUpDown className="text-xl text-gray-600" />
                        </button>
                    </motion.div>}
                </div>
            </div>
        </>
    )
}

export default OrgSideBar