import BaseNode from "./BaseNode";
import { Position } from "@xyflow/react";

const TranslateNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Translate"
      inputs={[{ id: `${id}-value`, position: Position.Left }]}
      outputs={[{ id: `${id}-value`, position: Position.Right }]}
      desc={"Translate text from one language to another."}
      data={data}
    >
      <div>
        <span>This is a translate node</span>
      </div>
    </BaseNode>
  );
};

export default TranslateNode;
