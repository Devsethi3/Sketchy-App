import React from 'react';
import { BsCursor } from "react-icons/bs";
import { PiTextT } from "react-icons/pi";
import { LuPencil, LuRedo2, LuStickyNote, LuUndo2 } from "react-icons/lu";
import { IoSquareOutline } from "react-icons/io5";
import { VscCircleLarge } from "react-icons/vsc";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import ToolButton from "./ToolButton";
import { SlCursor } from 'react-icons/sl';

interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

const Toolbar = ({ canvasState, setCanvasState, undo, redo, canUndo, canRedo }: ToolbarProps) => {
    return (
        <div className="fixed top-1/2 transform -translate-y-1/2 rounded-md left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-2 flex gap-y-1 flex-col font-bold items-center shadow-md">

                <ToolButton
                    label="Select"
                    icon={SlCursor}
                    onClick={() => setCanvasState({ mode: CanvasMode.None })}
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing
                    }
                />

                <ToolButton
                    label="Text"
                    icon={PiTextT}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Text,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Text
                    }
                />

                <ToolButton
                    label="Notes"
                    icon={LuStickyNote}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Note,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                />

                <ToolButton
                    label="Rectangle"
                    icon={IoSquareOutline}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Rectangle,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                />

                <ToolButton
                    label="Ellipse"
                    icon={VscCircleLarge}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Ellipse,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Ellipse
                    }
                />

                <ToolButton
                    label="Pen"
                    icon={LuPencil}
                    onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
                    isActive={canvasState.mode === CanvasMode.Pencil}
                />


            </div>
            <div className="bg-white gap-y-2 rounded-md p-2 shadow-md flex flex-col items-center">
                <ToolButton onClick={undo} isActive={false} isDisabled={!canUndo} icon={LuUndo2} label="Undo" />
                <ToolButton onClick={redo} isActive={false} isDisabled={!canRedo} icon={LuRedo2} label="Redo" />
            </div>
        </div>
    )
}

export default Toolbar;