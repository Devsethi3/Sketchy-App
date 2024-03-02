"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage } from "../../../../liveblocks.config"
import { CursorPresence } from "./CursorPresence"
import { connectionIdToColor, pointerEventToCanvasPoint, resizeBounds } from "@/libs/utils"
import { LiveObject } from "@liveblocks/client"
import { nanoid } from "nanoid"
import { LayerPreview } from "./LayerPreview"
import { SelectionBox } from "./SelectionBox"
import { SelectionTools } from "./SelectionTools"

const MAX_LAYERS = 100;

const Canvas = () => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })

    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 137,
        g: 234,
        b: 138,
    });

    const layerIds = useStorage((root) => root.layerIds)
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()



    const resizeSelectedLayer = useMutation((
        { storage, self },
        point: Point,
    ) => {
        if (canvasState.mode !== CanvasMode.Resizing) {
            return;
        }

        const bounds = resizeBounds(
            canvasState.initialBounds,
            canvasState.corner,
            point,
        );

        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(self.presence.selection[0]);

        if (layer) {
            layer.update(bounds);
        };
    }, [canvasState]);




    const translateSelectedLayers = useMutation((
        { storage, self },
        point: Point,
    ) => {
        if (canvasState.mode !== CanvasMode.Translating) {
            return;
        }

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y,
        };

        const liveLayers = storage.get("layers");

        for (const id of self.presence.selection) {
            const layer = liveLayers.get(id);

            if (layer) {
                layer.update({
                    x: layer.get("x") + offset.x,
                    y: layer.get("y") + offset.y,
                });
            }
        }

        setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
        [
            canvasState,
        ]);

    const unselectLayers = useMutation((
        { self, setMyPresence }
    ) => {
        if (self.presence.selection.length > 0) {
            setMyPresence({ selection: [] }, { addToHistory: true });
        }
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

    const onPointerDown = useCallback((
        e: React.PointerEvent,
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.Inserting) {
            return;
        }

        if (canvasState.mode === CanvasMode.Pencil) {
            // startDrawing(point, e.pressure);
            return;
        }

        setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    }, [camera, canvasState.mode, setCanvasState]);


    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYWH,
    ) => {

        history.pause();
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner,
        });
    }, [history]);

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

        if (
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Pressing
        ) {
            unselectLayers();
            setCanvasState({
                mode: CanvasMode.None,
            });
        } else if (canvasState.mode === CanvasMode.Inserting) {
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({
                mode: CanvasMode.None,
            });
        }

        history.resume();
    },
        [
            setCanvasState,
            camera,
            canvasState,
            history,
            insertLayer,
            unselectLayers,
        ]);


    const selections = useOthersMapped((other) => other.presence.selection);

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


    const onPointerMove = useMutation((
        { setMyPresence },
        e: React.PointerEvent
    ) => {
        e.preventDefault()
        const current = pointerEventToCanvasPoint(e, camera)

        if (canvasState.mode === CanvasMode.Translating) {
            translateSelectedLayers(current)

        } else if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current)
        }

        setMyPresence({ cursor: current });
    }, [camera, canvasState, resizeSelectedLayer, translateSelectedLayers]);

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
                <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
                <svg className="h-[100vh] w-[100vw]" onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerDown={onPointerDown} onPointerLeave={onPointerLeave} onWheel={onWheel}>
                    <g style={{ transform: `translate(${camera.x}px,${camera.y}px)` }}>
                        {layerIds.map((layerId) => (
                            <LayerPreview key={layerId} id={layerId} onLayerPointerDown={onLayerPointerDown} selectionColor={layerIdsToColorSelection[layerId]} />
                        ))}
                        <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
                        <CursorPresence />
                    </g>

                </svg>
            </div>
        </>
    )
}

export default Canvas
