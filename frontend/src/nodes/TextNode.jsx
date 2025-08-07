import { useState } from "react";
import { Position } from "@xyflow/react";
import BaseNode from "./BaseNode";

const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const outputs = [{ position: Position.Right, id: `${id}-output` }];

  return (
    <BaseNode id={id} title="Text" outputs={outputs}>
      {/* Children */}
      <div>
        <label>
          Text:
          <input type="text" value={currText} onChange={handleTextChange} />
        </label>
      </div>
    </BaseNode>
  );
};

export default TextNode;
