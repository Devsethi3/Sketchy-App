"use client"
import { useState, useEffect } from 'react';
import { db } from '@/config/firebaseConfig';
import { collection, getDocs, where, query, deleteDoc, doc } from 'firebase/firestore';
import BoardSkeleton from '@/app/components/skeletonLoading/BoardSkeleton';
import { RiDeleteBin5Line } from 'react-icons/ri';

interface Team {
  id: string;
  teamName: string;
  userImage: string;
  userName: string;
  userEmail: string;
  boardCount: number;
}

const TeamBoard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'teams'));
        const teamsData: Team[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Team));
        const teamsWithBoardCount: Team[] = await Promise.all(teamsData.map(async (team) => {
          const boardQuerySnapshot = await getDocs(query(collection(db, 'boards'), where('teamName.name', '==', team.teamName)));
          const boardCount = boardQuerySnapshot.size;
          return { ...team, boardCount };
        }));
        setTeams(teamsWithBoardCount);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleDeleteTeam = async (teamId: string) => {
    console.log(teamId);
  };

  
  return (
    <>
      {isLoading ? (
        <BoardSkeleton />
      ) : (
        <div className="container mx-auto my-5 px-4">
          <h2 className="text-2xl lg:text-3xl ml-4 lg:text-start text-center font-bold my-5">Teams</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Team Name</th>
                <th className="py-2 px-4 text-left">User Name</th>
                <th className="py-2 px-4 text-left">Board Count</th>
                <th className="py-2 px-4 text-left">Delete Team</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{team.teamName}</td>
                  <td className="py-2 px-4">{team.userName}</td>
                  <td className="py-2 px-4">{team.boardCount}</td>
                  <td className="py-2 px-4">
                    <RiDeleteBin5Line
                      onClick={() => handleDeleteTeam(team.id)}
                      className='p-2 bg-red-100 rounded-full cursor-pointer text-red-500 text-3xl'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default TeamBoard;
