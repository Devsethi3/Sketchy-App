"use client"
import { useState, useEffect } from 'react';
import { db } from '@/config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import BoardSkeleton from '@/app/components/skeletonLoading/BoardSkeleton';

interface Board {
    boardName: string;
    teamName?: {
        name: string;
        userImage: string;
        userName: string;
        userEmail: string;
    };
    imageUrl: string;
    favorites: string[];
}

const FavouritesPage = () => {
    const [favoriteBoards, setFavoriteBoards] = useState<Board[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchFavoriteBoards = async () => {
            try {
                if (!session || !session.user || !session.user.email) return;

                const querySnapshot = await getDocs(collection(db, 'boards'));
                const boardsData = querySnapshot.docs.map(doc => doc.data() as Board);

                const filteredBoards = boardsData.filter(board => {
                    if (!board.favorites || !Array.isArray(board.favorites)) return false;
                    return board.favorites.includes(session?.user?.email ?? ""); // Provide default value if email is null or undefined
                });

                setFavoriteBoards(filteredBoards);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching favorite boards:', error);
            }
        };

        fetchFavoriteBoards();
    }, [session]);

    return (
        <>
            {isLoading ? <BoardSkeleton /> : <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl lg:text-3xl ml-4 lg:text-start text-center font-bold my-5">Favourite Boards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteBoards.map((board, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-all duration-300 ease-in-out">
                            <p className="lg:text-lg text-normal font-semibold mb-2">Board Name: {board.boardName}</p>
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
                                    <Image src={board?.teamName?.userImage || "/default-image.jpg"} alt="user Image" width={38} height={38} className='rounded-full' objectFit='cover' />
                                    <div className='flex flex-col'>
                                        <p className="text-sm text-gray-500">User: {board.teamName?.userName}</p>
                                        <p className="text-xs text-gray-500">Email: {board.teamName?.userEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    );
}

export default FavouritesPage;
