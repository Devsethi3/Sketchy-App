"use client"
import React, { useCallback, useState } from "react"
import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "../../../../liveblocks.config"
import { CursorPresence } from "./CursorPresence"
import { pointerEventToCanvasPoint } from "@/libs/utils"
import { LiveObject } from "@liveblocks/client"
import { nanoid } from "nanoid"
import LayerPreview from "./LayerPreview"

const MAX_LAYERS = 100;

const Canvas = () => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })

    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });

    const layerIds = useStorage((root) => root.layerIds)
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    const onPointerMove = useMutation((
        { setMyPresence },
        e: React.PointerEvent
    ) => {
        e.preventDefault()
        const current = pointerEventToCanvasPoint(e, camera)

        setMyPresence({ cursor: current });
    }, []);

    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
        position: Point,
    ) => {
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LAYERS) {
            return;
        }

        const liveLayerIds = storage.get("layerIds");
        const layerId = nanoid();
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor,
        });

        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({ mode: CanvasMode.None });
    }, [lastUsedColor]);

    const onWheel = useCallback((e: React.WheelEvent) => {

        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }));
    }, []);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    const onPointerUp = useMutation((
        { },
        e
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode == CanvasMode.Inserting) {
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({
                mode: CanvasMode.None
            })
        }

        history.resume()
    }, [camera, canvasState, history, insertLayer])

    return (
        <>
            <div className="h-screen w-screen relative bg-[#fffcef]">
                <Info />
                <Participants />
                <Toolbar
                    canvasState={canvasState}
                    setCanvasState={setCanvasState}
                    canRedo={canRedo}
                    canUndo={canUndo}
                    undo={history.undo}
                    redo={history.redo}
                />
                <svg className="h-[100vh] w-[100vw]" onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerLeave} onWheel={onWheel}>
                    <g style={{ transform: `translate(${camera.x}px,${camera.y}px)` }}>
                        {layerIds.map((layerId) => (
                            <LayerPreview key={layerId} id={layerId} onLayerPointerDown={() => { }} selectionColor="#000" />
                        ))}
                        <CursorPresence />
                    </g>

                </svg>
            </div>
        </>
    )
}

export default Canvas
