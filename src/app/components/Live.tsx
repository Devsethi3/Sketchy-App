"use client"
import React, { useCallback } from 'react'
import LiveCursors from './cursor/LiveCursors'
import { useMyPresence, useOthers } from '../../../liveblocks.config'
import Canvas from '../whiteboard/_components/Canvas'

const Live = () => {

    const others = useOthers()
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault()

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y

        updateMyPresence({ cursor: { x, y } })
    }, [])

    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
        event.preventDefault()

        updateMyPresence({ cursor: null, message: null })
    }, [])


    const handlePointerDown = useCallback((event: React.PointerEvent) => {
        event.preventDefault()

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y

        updateMyPresence({ cursor: { x, y } })
    }, [])


    return (
        <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} onPointerDown={handlePointerDown} className='h-screen w-full '>
            <Canvas />
            <LiveCursors others={others} />
        </div>
    )
}

export default Live