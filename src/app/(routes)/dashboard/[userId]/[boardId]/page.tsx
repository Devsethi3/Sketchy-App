"use client"
import { useState, useEffect } from 'react';
import { db } from '@/config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import BoardSkeleton from '@/app/components/skeletonLoading/BoardSkeleton';

const TeamBoard = () => {
  const [teamBoards, setTeamBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamBoards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'boards'));
        const boardsData = querySnapshot.docs.map(doc => doc.data());
        setTeamBoards(boardsData);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching team boards:', error);
      }
    };

    fetchTeamBoards();
  }, []);


  return (
    <>
      {isLoading ? (
        <BoardSkeleton />
      ) : (
        <div className="container mx-auto my-5 px-4">
          <h2 className="text-2xl lg:text-3xl ml-4 lg:text-start text-center font-bold my-5">Team Boards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamBoards.map((board, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-all duration-300 ease-in-out">
                <p className="text-lg font-semibold mb-2">Board Name: {board.boardName}</p>
                {board.teamName && (
                  <p className="text-gray-500 mb-4">Team: {board.teamName.name}</p>
                )}
                <div className="flex flex-col space-y-4">
                  {board.teamName && (
                    <div className="w-full h-40 relative rounded overflow-hidden">
                      <Image src={board.imageUrl} alt="Board Image" fill objectFit='cover' />
                    </div>
                  )}
                  <div className='flex items-center gap-3'>
                    <Image src={board.teamName.userImage} alt="user Image" width={38} height={38} className='rounded-full' objectFit='cover' />
                    <div className='flex flex-col'>
                      <p className="text-sm text-gray-500">User: {board.teamName?.userName}</p>
                      <p className="text-xs text-gray-500">Email: {board.teamName?.userEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TeamBoard;
