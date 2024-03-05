"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Modal from "@/app/components/modal/Modal";
import { useSelectedTeam } from "@/context/SelectedTeamContext";
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useSession } from 'next-auth/react';

const DashboardTeam = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedTeam } = useSelectedTeam();
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { data: session } = useSession();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                // Query teams based on user's email
                const q = query(collection(db, 'teams'), where('userEmail', '==', session?.user?.email));
                const querySnapshot = await getDocs(q);
                const teamsData = querySnapshot.docs.map(doc => doc.data());
                setTeams(teamsData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        if (session?.user?.email) {
            fetchTeams();
        }
    }, [session]); // Fetch teams whenever the session changes

    return (
        <div className="flex flex-col gap-5 items-center mt-12 mr-16 justify-center">
            {isLoading ? (
                <div className="w-10 mt-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            ) : (
                <>
                    {teams.length > 0 ? (
                        <>
                            <Image loading="lazy" src="/images/data-team.svg" width={600} height={600} alt="data team" />
                            <p>Your team is created!</p>
                            <p>Now you can collaborate and start working together.</p>
                        </>
                    ) : (
                        <>
                            <Image loading="lazy" src="/images/forest.svg" width={600} height={600} alt="forest" />
                            <p>You haven't created your team yet.</p>
                            <button className="py-2.5 pt-[.8rem] rounded-md px-8 text-white bg-[#4F46E5]" onClick={() => setIsOpen(!isOpen)}>Create Your Team</button>
                            {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default DashboardTeam;
