import { FiPlus } from "react-icons/fi"
import { GoPlus } from "react-icons/go"

const SideBar = () => {
  return (
    <div className="h-full fixed z-10 flex flex-col gap-y-6 left-0 bg-blue-950 text-white w-[70px] p-4">
      <FiPlus className="p-2 text-4xl rounded-md bg-[#ffffff1d] cursor-pointer" />
    </div>
  )
}

export default SideBar