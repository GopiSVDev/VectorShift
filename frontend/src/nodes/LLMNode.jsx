import { Position } from "@xyflow/react";
import BaseNode from "./BaseNode";

const LLMNode = ({ id }) => {
  const inputs = [
    {
      position: Position.Left,
      id: `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
  ];

  const outputs = [{ position: Position.Right, id: `${id}-response` }];

  return (
    <BaseNode id={id} title="LLM" inputs={inputs} outputs={outputs}>
      {/* Children */}
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};

export default LLMNode;
