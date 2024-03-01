"use client"

import { memo } from "react"
import { useStorage } from "../../../../liveblocks.config"
import { LayerType } from "@/types/canvas"

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
                <div>Rectangle</div>
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
