"use client"
import Room from "@/app/components/Room";
import Live from "@/app/components/Live";
import Loading from "@/app/loading";

const WhiteBoard = () => {

  return (
    <div>
      <Room roomId={"hfuahu2y7qyhvau"} fallback={<Loading />}>
        <Live />
      </Room>
    </div>
  )
}

export default WhiteBoard;
