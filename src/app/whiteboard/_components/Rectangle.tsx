import { RectangleLayer } from '@/types/canvas'
import React from 'react'

interface RectangleProps {
    id: string
    layer: RectangleLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

const Rectangle = ({ id, layer, onPointerDown, selectionColor }: RectangleProps) => {
    return (
        <div>Rectangle</div>
    )
}

export default Rectangle