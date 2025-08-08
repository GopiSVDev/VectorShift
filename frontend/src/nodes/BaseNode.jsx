import { Handle } from "@xyflow/react";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useStore } from "../store/store";
import DeleteNodeButton from "../components/ui/DeleteNodeButton";

const BaseNode = ({
  id,
  title,
  desc,
  inputs = [],
  outputs = [],
  children,
  data,
}) => {
  const { nodes, updateNodeData, deleteNode } = useStore((state) => state);
  const [currName, setCurrName] = useState(data?.name);

  const handleNameChange = (e) => {
    const newName = e.target.value.trim();

    const isDuplicate = nodes.some(
      (n) =>
        n.id !== id && n.data?.name?.toLowerCase() === newName.toLowerCase()
    );

    if (isDuplicate) {
      return;
    }

    setCurrName(newName);
    updateNodeData(id, { ...data, name: newName });
  };

  return (
    <div
      id={`node-${id}`}
      className="transition-colors transition-border duration-200 p-0 m-0 rounded-[6px] relative border-box border-[1px] text-slate-700 shadow-[0px_0px_0px_2px_#cecffc] bg-[#ffffff] hover:border-[#A9ABF7] hover:shadow-[0px_0px_0px_4px_#cecffc] 
      w-[400px]"
    >
      {/* node info */}
      <div className="flex flex-col gap-3 px-4 py-3 m-3 bg-indigo-1 rounded-md border border-indigo-6 bg-[rgb(238,242,255)]">
        {/* node title */}
        <div className="flex items-center gap-4 justify-between relative">
          <div className="font-medium text-2xl">{title}</div>

          <DeleteNodeButton id={id} deleteNode={deleteNode} />
        </div>
        {/* node desc */}
        <div className="text-black break-words whitespace-normal">{desc}</div>
      </div>

      {/* name */}
      <div className="flex flex-col flex-1 gap-3 relative px-[18px] py-3 w-full">
        <div className="inline-block">
          <input
            className="inline-block px-3 py-2 bg-[#DEDFF5] min-w-[40px] text-center text-xl cursor-pointer w-full rounded-md overflow-hidden text-ellipsis"
            type="text"
            value={currName}
            onChange={handleNameChange}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>

      {/* <div className="flex flex-col flex-1 gap-3 relative px-[18px] pt-2 pb-4 w-full">
        
      </div> */}

      {/* Target Handlers  */}
      {inputs.map(({ id, position, style }) => (
        <Handle
          key={id}
          type="target"
          position={position}
          id={id}
          style={{
            backgroundColor: "white",
            border: "2px solid #4f46e5",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            padding: "8px",
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            left: "-10px",
            transform: "translateY(-50%)",
            right: 0,
            transition: "all 300ms ease-in-out",
            zIndex: 10,
            ...style,
          }}
        />
      ))}

      {/* Source Handlers  */}
      {outputs.map(({ id, position, style }) => (
        <Handle
          key={id}
          type="source"
          position={position}
          id={id}
          style={{
            backgroundColor: "white",
            border: "2px solid #4f46e5",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            padding: "8px",
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "-10px",
            transition: "all 300ms ease-in-out",
            zIndex: 10,
            ...style,
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
