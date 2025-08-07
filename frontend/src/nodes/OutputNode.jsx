import { useState } from "react";
import { Position } from "@xyflow/react";
import BaseNode from "./BaseNode";

const OutputNode = ({ id, data }) => {
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const inputs = [{ position: Position.Left, id: `${id}-value` }];

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={inputs}
      data={data}
      desc={"Output data of different types from your workflow."}
    >
      {/* Children */}
      <div>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};

export default OutputNode;
