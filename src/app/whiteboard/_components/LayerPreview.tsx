"use client"

import { memo } from "react"
import { useStorage } from "../../../../liveblocks.config"
import { LayerType } from "@/types/canvas"
import { Rectangle } from "./Rectangle"

interface LayerPreviewProps {
    id: string
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor: string
}

export const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))

    if (!layer) {
        return null;
    }

    switch (layer.type) {
        case LayerType.Rectangle:
            return (
                <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
            )

        default:
            console.warn("Unkown layer type")
            return null
    }

    return (
        <>
            <div></div>
        </>
    )

})

LayerPreview.displayName = "LayerPreview"
