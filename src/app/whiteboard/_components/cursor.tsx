"use client";

import { memo } from "react";
import { GiArrowCursor } from "react-icons/gi";

import { connectionIdToColor } from "../../../libs/utils";
import { useOther } from "../../../../liveblocks.config";

interface CursorProps {
    connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
    const info = useOther(connectionId, (user) => user?.info || {}) as { name?: string };
    const cursor = useOther(connectionId, (user) => user.presence.cursor);

    const name = info.name || "Teammate";

    if (!cursor) {
        return null;
    }

    const { x, y } = cursor;

    return (
        <foreignObject
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`
            }}
            height={50}
            width={name.length * 10 + 24}
            className="relative drop-shadow-md"
        >
            <GiArrowCursor
                className="h-5 w-5"
                style={{
                    fill: connectionIdToColor(connectionId),
                    color: connectionIdToColor(connectionId),
                }}
            />
            <div
                className="absolute left-4 top-6 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
                style={{ backgroundColor: connectionIdToColor(connectionId) }}
            >
                {name}
            </div>
        </foreignObject>
    );
});

Cursor.displayName = "Cursor";
