import React from 'react';

interface ToolButtonProps {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
}

const ToolButton = ({ icon: Icon, label, onClick, isActive, isDisabled }: ToolButtonProps) => {
    return (
        <button className={`relative hover:bg-blue-100 text-[#4F46E5] flex flex-col items-center ${isActive ? 'bg-blue-100 text-[#4F46E5] hover:bg-blue-100' : 'bg-slate-50 text-black bg-none'} p-2.5 rounded-xl cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={onClick} disabled={isDisabled}>
            <Icon className="cursor-pointer text-[1.1rem]" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded-md text-xs font-medium opacity-0 transition-opacity duration-150 ease-in-out pointer-events-none">
                {label}
            </span>
        </button>
    );
}

export default ToolButton;
