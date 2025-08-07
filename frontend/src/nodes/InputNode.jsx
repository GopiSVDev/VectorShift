import { useState } from "react";
import { Position } from "@xyflow/react";
import BaseNode from "./BaseNode";

const InputNode = ({ id, data }) => {
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const outputs = [{ position: Position.Right, id: `${id}-value` }];

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={outputs}
      data={data}
      desc={"Pass data of different types into your workflow"}
    >
      {/* Children */}

      <label>
        Type:
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};

export default InputNode;
