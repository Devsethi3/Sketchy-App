"use client"
import Room from "@/app/components/Room"
import Canvas from "../_components/Canvas"
import Live from "@/app/components/Live"

const WhiteBoard = () => {
  return (
    <div>
      <Room roomId={"hfuahu2y7qyhvau"} fallback={<div>Loading...</div>}>
        <Live />
      </Room>
    </div>
  )
}

export default WhiteBoard