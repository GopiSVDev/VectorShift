import { useState } from "react";
import { Position } from "@xyflow/react";
import BaseNode from "./BaseNode";
import AutoGrowingTextarea from "../components/ui/AutoGrowingTextarea";

const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState();

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const outputs = [{ position: Position.Right, id: `${id}-value` }];
  const inputs = [{ position: Position.Left, id: `${id}-value` }];

  return (
    <BaseNode
      id={id}
      title="Text"
      outputs={outputs}
      inputs={inputs}
      data={data || "{{input}}"}
      desc={
        "Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes."
      }
    >
      {/* Children */}
      <div className="flex flex-row w-full items-center h-full relative cursor-text">
        {/* <textarea
          className="w-full border-2 text-xl cursor-text rounded-[4px] py-2 px-2 resize-none max-h-[180px] text-black field-sizing-content"
          rows={1}
          value={currText}
          onChange={handleTextChange}
        /> */}
        <AutoGrowingTextarea
          currentNodeId={id}
          value={currText}
          onChange={handleTextChange}
          placeholder="Type '{{' to utilize variables"
          minRows={1}
          maxRows={6}
        />
      </div>
    </BaseNode>
  );
};

export default TextNode;
