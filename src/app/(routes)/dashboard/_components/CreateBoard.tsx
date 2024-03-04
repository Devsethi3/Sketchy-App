"use client";

import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";

const CreateBoard = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold my-5">Team Boards</h2>
            <div className="grid grid-cols-4 gap-5 mr-10">
                <div className="bg-[#4F46E5]  rounded-md flex-col flex items-center justify-center h-[300px] text-white">
                    <GoPlusCircle className="text-4xl" />
                    <p className="mt-5 text-xl font-semibold">Create Board</p>
                </div>
                <div className="h-[300px] border rounded-md">
                    <div className="relative h-[250px]">
                        <Image src="/images/cat.svg" fill objectFit="cover" alt="cat" />
                    </div>
                    <div className="flex border-t-2 pt-2 px-4 items-center justify-between">
                        <h2 className="font-medium text-[1.1rem]">Layering</h2>
                        <FaRegStar className="text-xl cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBoard