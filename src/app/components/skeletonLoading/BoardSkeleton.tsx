const BoardSkeleton = () => {
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold my-5">Team Boards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-4 animate-pulse">
                            <div className="h-56 bg-gray-200 rounded-md mb-4"></div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                                <div className="flex flex-col">
                                    <div className="h-4 w-20 bg-gray-200 mb-1"></div>
                                    <div className="h-3 w-24 bg-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BoardSkeleton