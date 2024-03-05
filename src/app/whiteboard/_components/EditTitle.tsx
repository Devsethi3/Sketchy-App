import { CgSearch } from "react-icons/cg"

const EditTitle = () => {
    return (
        <div>
            <div className="flex items-center focus-within:ring-2 focus-within:ring-[#4F46E5] border-2 bg-[#fafafa] py-2.5 px-5 w-full rounded-md gap-3">
                <CgSearch className="text-xl text-gray-500 mr-3" />
                <input type="search" placeholder="Search Boards" className="bg-transparent pt-[.2rem] w-full outline-none" />
            </div>
        </div>
    )
}

export default EditTitle