"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage } from "../../../../liveblocks.config"
import { CursorPresence } from "./CursorPresence"
import { connectionIdToColor, pointerEventToCanvasPoint } from "@/libs/utils"
import { LiveObject } from "@liveblocks/client"
import { nanoid } from "nanoid"
import { LayerPreview } from "./LayerPreview"

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


    const selections = useOthersMapped((other) => other.presence.selection);

    const onLayerPointerDown = useMutation((
        { self, setMyPresence },
        e: React.PointerEvent,
        layerId: string,
    ) => {
        if (
            canvasState.mode === CanvasMode.Pencil ||
            canvasState.mode === CanvasMode.Inserting
        ) {
            return;
        }

        history.pause();
        e.stopPropagation();

        const point = pointerEventToCanvasPoint(e, camera);

        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection: [layerId] }, { addToHistory: true });
        }
        setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
        [
            setCanvasState,
            camera,
            history,
            canvasState.mode,
        ]);

    const layerIdsToColorSelection = useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {};

        for (const user of selections) {
            const [connectionId, selection] = user;

            for (const layerId of selection) {
                layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
            }
        }

        return layerIdsToColorSelection;
    }, [selections]);

    // const deleteLayers = useDeleteLayers();

    // useEffect(() => {
    //     function onKeyDown(e: KeyboardEvent) {
    //         switch (e.key) {
    //             // case "Backspace":
    //             //   deleteLayers();
    //             //   break;
    //             case "z": {
    //                 if (e.ctrlKey || e.metaKey) {
    //                     if (e.shiftKey) {
    //                         history.redo();
    //                     } else {
    //                         history.undo();
    //                     }
    //                     break;
    //                 }
    //             }
    //         }
    //     }

    //     document.addEventListener("keydown", onKeyDown);

    //     return () => {
    //         document.removeEventListener("keydown", onKeyDown)
    //     }
    // }, [deleteLayers, history]);

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
                            <LayerPreview key={layerId} id={layerId} onLayerPointerDown={() => { }} selectionColor={layerIdsToColorSelection[layerId]} />
                        ))}
                        <CursorPresence />
                    </g>

                </svg>
            </div>
        </>
    )
}

export default Canvas
