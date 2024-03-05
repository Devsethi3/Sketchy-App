import React from 'react';

const Avatar = ({ name }: { name: string }) => {
    const gradientColors = [
        "from-blue-400 to-blue-600",
        "from-green-400 to-green-600",
        "from-yellow-400 to-yellow-600",
        "from-red-400 to-red-600",
        "from-pink-400 to-pink-600",
        "from-purple-400 to-purple-600",
        "from-indigo-400 to-indigo-600",
    ];

    const randomIndex = Math.floor(Math.random() * gradientColors.length);
    const randomGradient = gradientColors[randomIndex];

    return (
        <div className="relative group">
            <div
                className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br ${randomGradient}`}
            >
                <span className="text-white font-semibold text-lg uppercase pt-[.3rem]"></span>
            </div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black font-medium pt-[.5rem] text-white text-sm text-center py-1.5 px-3 whitespace-nowrap rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {name}
            </div>
        </div>
    );
}

export default Avatar;
