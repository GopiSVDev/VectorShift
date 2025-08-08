import { useState } from "react";
import { Position } from "@xyflow/react";
import BaseNode from "./BaseNode";
import { IoChevronDown } from "react-icons/io5";

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

      <div className="relative w-full border border-black">
        <select
          className="w-full py-3 px-3 appearance-none pr-10"
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500">
          <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl pointer-events-none text-gray-500" />
        </div>
      </div>
    </BaseNode>
  );
};

export default InputNode;
