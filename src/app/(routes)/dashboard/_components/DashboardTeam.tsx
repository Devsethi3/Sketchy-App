"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Modal from "@/app/components/modal/Modal"


const DashboardTeam = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-5 items-center mt-12 mr-16 justify-center">
                <Image loading="lazy" src="/images/forest.svg" width={600} height={600} alt="forest" />
                <p>You haven't created your team</p>
                <button className="py-2.5 pt-[.8rem] rounded-md px-8 text-white bg-[#4F46E5]" onClick={() => setIsOpen(!isOpen)}>Create Your Team</button> {/* Toggle isOpen when the button is clicked */}
                {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
            </div>
        </>
    )
}

export default DashboardTeam