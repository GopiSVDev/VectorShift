import { useRef, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useReactFlow,
} from "@xyflow/react";

import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";

import LLMNode from "../nodes/LLMNode";
import OutputNode from "../nodes/OutputNode";
import InputNode from "../nodes/InputNode";
import TextNode from "../nodes/TextNode";
import TranslateNode from "../nodes/TranslateNode";
import ConnectionLine from "./ui/ConnectionLine";

import "@xyflow/react/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  Input: InputNode,
  llm: LLMNode,
  Output: OutputNode,
  text: TextNode,
  translate: TranslateNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  getInitNodeData: state.getInitNodeData,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);

  const { screenToFlowPosition } = useReactFlow();

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    getInitNodeData,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const nodeID = getNodeID(type);
        const data = getInitNodeData(nodeID, type);

        const newNode = {
          id: nodeID,
          type,
          position,
          data: data,
        };

        addNode(newNode);
      }
    },
    [addNode, getInitNodeData, getNodeID, screenToFlowPosition]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        panOnScroll={true}
        selectionOnDrag={true}
        connectionLineType="smoothstep"
        defaultEdgeOptions={{
          style: {
            stroke: "#4f46e5",
            strokeWidth: 2.5,
            strokeDasharray: "10,6",
          },
          className: "custom-animated-edge",
        }}
        connectionLineComponent={ConnectionLine}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
