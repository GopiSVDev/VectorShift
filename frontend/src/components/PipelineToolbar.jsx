import DraggableNode from "./DraggableNode";
import { MdInput, MdOutlineOutput } from "react-icons/md";
import { BsChatRightText, BsTranslate } from "react-icons/bs";
import { SiOpenai } from "react-icons/si";

const PipelineToolbar = () => {
  const nodes = [
    {
      type: "Input",
      label: "Input",
      icon: <MdInput />,
    },
    { type: "llm", label: "LLM", desc: "", icon: <SiOpenai /> },
    {
      type: "Output",
      label: "Output",
      icon: <MdOutlineOutput />,
    },
    {
      type: "text",
      label: "Text",
      icon: <BsChatRightText />,
    },
    {
      type: "translate",
      label: "Translate",
      icon: <BsTranslate />,
    },
  ];

  return (
    <div className="px-5 py-2 border-b border-gray-400">
      <div className="flex flex-wrap gap-2.5">
        {nodes.map(({ type, label, icon }) => (
          <DraggableNode
            key={`${type}-${label}`}
            type={type}
            label={label}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
};

export default PipelineToolbar;
