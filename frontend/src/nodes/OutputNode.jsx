import { useState } from "react";
import { Position } from "@xyflow/react";
import BaseNode from "./BaseNode";
import { IoChevronDown } from "react-icons/io5";

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
      <div className="relative w-full border border-black">
        <select
          className="w-full py-3 px-3 appearance-none pr-10"
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500">
          <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl pointer-events-none text-gray-500" />
        </div>
      </div>
    </BaseNode>
  );
};

export default OutputNode;
