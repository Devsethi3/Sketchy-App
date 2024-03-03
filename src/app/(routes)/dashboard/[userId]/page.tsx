"use client"

import Image from "next/image"
import Modal from "@/app/components/modal/Modal"
import { useState } from "react"

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='w-full pl-5'>
        <div className="flex flex-col gap-5 items-center mt-12 mr-16 justify-center">
          <Image loading="lazy" src="/images/forest.svg" width={600} height={600} alt="forest" />
          <p>You haven't created your team</p>
          <button className="py-2.5 pt-[.8rem] rounded-md px-8 text-white bg-[#4F46E5]" onClick={() => setIsOpen(!isOpen)}>Create Your Team</button> {/* Toggle isOpen when the button is clicked */}
          {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />} {/* Render the modal if isOpen is true */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


{/* <h2 className="text-3xl font-bold my-5">Team Boards</h2>
<div className="grid grid-cols-4 gap-5 mr-10">
          <div className="bg-[#4F46E5]  rounded-md flex-col flex items-center justify-center h-[300px] text-white">
            <GoPlusCircle className="text-4xl" />
            <p className="mt-5 text-xl font-semibold">Create Board</p>
          </div>
        </div> */}