interface ButtonsProps {
    content: string;
    type: "primary" | "secondary";
}

const Buttons: React.FC<ButtonsProps> = ({ content, type }) => {
    return (
        <>
            <button className={`py-2 lg:py-2.5 pt-[.7rem] lg:pt-[.8rem] rounded-full px-5 lg:px-8 text-white ${type === "primary" ? "bg-[#4F46E5]" : "bg-black"}`}>{content}</button>
        </>
    );
};

export default Buttons;
