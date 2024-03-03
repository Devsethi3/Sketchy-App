import { GoPlusCircle } from "react-icons/go"

const Dashboard = () => {
  return (
    <div>
      <div className='w-full pl-5'>
        <h2 className="text-3xl font-bold my-5">Team Boards</h2>
        <div className="grid grid-cols-4">
          <div className="bg-[#4F46E5] rounded-md flex-col flex items-center justify-center h-[300px] text-white">
            <GoPlusCircle className="text-6xl" />
            <p className="mt-5 text-xl font-semibold">Create Board</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard