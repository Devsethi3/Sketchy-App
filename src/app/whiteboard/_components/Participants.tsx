import ActiveUsers from "./ActiveUsers"

const Participants = () => {
  return (
    <div>
      <div className="absolute rounded-md min-h-12 shadow-md bg-white px-3 py-2 pt-[1rem] flex items-center right-2 top-2">
        <ActiveUsers />
      </div>
    </div>
  )
}

export default Participants