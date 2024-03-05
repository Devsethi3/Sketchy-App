"use client"
import { useMemo } from "react";

import Avatar from "./Avatar";
import { useOthers, useSelf } from "../../../../liveblocks.config";

const ActiveUsers = () => {
    const userNames = [
        "Alice",
        "Bob",
        "Charlie",
        "David",
        "Emma",
        "Frank",
        "Grace",
    ];

    const getRandomName = () => {
        const randomIndex = Math.floor(Math.random() * userNames.length);
        return userNames[randomIndex];
    };

    const others = useOthers();
    const currentUser = useSelf();

    const memoizedUsers = useMemo(() => {
        const hasMoreUsers = others.length > 2;

        return (
            <div className="flex items-center justify-center gap-1">
                {currentUser && <Avatar name="You" />}

                {others.slice(0, 2).map(({ connectionId }) => (
                    <Avatar key={connectionId} name={getRandomName()} />
                ))}

                {hasMoreUsers && (
                    <div className="z-10 -ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-black">
                        +{others.length - 2}
                    </div>
                )}
            </div>
        );
    }, [others.length]);

    return memoizedUsers;
};

export default ActiveUsers;
