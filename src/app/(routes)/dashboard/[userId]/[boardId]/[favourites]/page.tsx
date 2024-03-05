"use client"
import { useState, useEffect } from 'react';
import { db } from '@/config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useSession } from 'next-auth/react';

const FavouritesPage = () => {
    const [favoriteBoards, setFavoriteBoards] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchFavoriteBoards = async () => {
            try {
                if (!session || !session.user || !session.user.email) return;

                const querySnapshot = await getDocs(collection(db, 'boards'));
                const boardsData = querySnapshot.docs.map(doc => doc.data());

                // Filter boards by favorite boards
                const filteredBoards = boardsData.filter(board => {
                    if (!board.favorites || !Array.isArray(board.favorites)) return false;
                    return board.favorites.includes(session?.user?.email);
                });

                setFavoriteBoards(filteredBoards);
            } catch (error) {
                console.error('Error fetching favorite boards:', error);
            }
        };

        fetchFavoriteBoards();
    }, [session]);

    return (
        <div>
            <h2 className="text-3xl font-bold my-5">Favorite Boards</h2>
            {favoriteBoards.map((board, index) => (
                <div key={index} className="border border-gray-300 p-4 my-3">
                    <p>Board Name: {board.boardName}</p>
                    {board.teamName && (
                        <>
                            <p>Team Name: {board.teamName.name}</p>
                            <p>User Name: {board.teamName.userName}</p>
                            <p>User Email: {board.teamName.userEmail}</p>
                            <img src={board.teamName.userImage} alt="User Image" width="50" height="50" />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default FavouritesPage;
