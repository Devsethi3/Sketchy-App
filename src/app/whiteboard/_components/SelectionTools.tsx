"use client"

import { Camera, Color } from "@/types/canvas"
import { memo } from "react"
import { useMutation, useSelf } from "../../../../liveblocks.config"
import { useSelectionBounds } from "@/hooks/useSelectionBound"
import ColorPicker from "./ColorPicker"
import { useDeleteLayers } from "@/hooks/useDeleteLayers"
import { RiDeleteBinLine } from "react-icons/ri"
import { LuBringToFront, LuSendToBack } from "react-icons/lu"

interface SelectionToolsProps {
    camera: Camera
    setLastUsedColor: (color: Color) => void
}

export const SelectionTools = memo(function SelectionTools({ camera, setLastUsedColor }: SelectionToolsProps) {

    const selection = useSelf((me) => me.presence.selection)

    const selectionBounds = useSelectionBounds();

    const moveToFront = useMutation((
        { storage }
    ) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
            if (selection.includes(arr[i])) {
                indices.push(i);
            }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
            liveLayerIds.move(
                indices[i],
                arr.length - 1 - (indices.length - 1 - i)
            );
        }
    }, [selection]);

    const moveToBack = useMutation((
        { storage }
    ) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
            if (selection.includes(arr[i])) {
                indices.push(i);
            }
        }

        for (let i = 0; i < indices.length; i++) {
            liveLayerIds.move(indices[i], i);
        }
    }, [selection]);

    const setFill = useMutation((
        { storage },
        fill: Color,
    ) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill);
        })
    }, [selection, setLastUsedColor]);

    const deleteLayers = useDeleteLayers();

    if (!selectionBounds) {
        return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
        <>
            <div className="absolute py-2 px-5 pt-[.8rem] rounded-md bg-white shadow-md flex select-none" style={{
                transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`
            }}>
                <ColorPicker onChange={setFill} />
                <div className="flex flex-col gap-y-1">
                    <button onClick={moveToFront} className={`relative hover:bg-blue-100 flex flex-col items-center p-2.5 rounded-xl cursor-pointer`}>
                        <LuBringToFront className="cursor-pointer text-[1.1rem]" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded-md text-xs font-medium opacity-0 transition-opacity duration-150 ease-in-out pointer-events-none whitespace-nowrap">
                            Bring To Front
                        </span>
                    </button>
                    <button onClick={moveToBack} className={`relative hover:bg-blue-100 flex flex-col items-center p-2.5 rounded-xl cursor-pointer`}>
                        <LuSendToBack className="cursor-pointer text-[1.1rem]" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded-md text-xs font-medium opacity-0 transition-opacity duration-150 ease-in-out pointer-events-none whitespace-nowrap">
                            Send To Back
                        </span>
                    </button>
                </div>
                <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
                    <button onClick={deleteLayers}>
                        <RiDeleteBinLine className="text-[2.2rem] text-red-400 p-2 rounded-md bg-red-50 hover:bg-red-200 transition-all" />
                    </button>
                </div>
            </div>
        </>
    )
})
