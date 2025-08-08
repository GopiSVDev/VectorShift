import { createWithEqualityFn } from "zustand/traditional";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

export const useStore = createWithEqualityFn((set, get) => ({
  nodes: [],
  edges: [],

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  deleteNode: (nodeId) => {
    const { nodes, edges } = get();

    const updatedNodes = nodes.filter((node) => node.id !== nodeId);

    const updatedEdges = edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );

    set({
      nodes: updatedNodes,
      edges: updatedEdges,
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
        },
        get().edges
      ),
    });
  },

  updateNodeData: (nodeId, newData) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            }
          : node
      ),
    });
  },

  getInitNodeData: (nodeID, type) => {
    const nodes = get().nodes;

    const prefix = type.toLowerCase(); // e.g., "input"
    const usedNumbers = new Set();

    for (const node of nodes) {
      const name = node?.data?.name?.toLowerCase?.();
      const match = name?.match(new RegExp(`^${prefix}_(\\d+)$`));
      if (match) {
        usedNumbers.add(parseInt(match[1], 10));
      }
    }

    let nextNumber = 1;
    while (usedNumbers.has(nextNumber)) {
      nextNumber++;
    }

    const name = `${prefix}_${nextNumber}`;

    return {
      id: nodeID,
      nodeType: type,
      name,
    };
  },
}));
