const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="rounded-lg border bg-white text-black shadow my-2 w-[81px] h-[81px] transition-all duration-200 cursor-grab hover:shadow-md hover:-translate-y-0.5 hover:border hover:border-indigo-500 hover:bg-indigo-50/50 active:cursor-grabbing active:shadow-sm active:translate-y-0 active:bg-indigo-100/50 flex-row group"
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
    >
      <div className="p-5 flex flex-col items-center justify-center h-full py-3 px-1 gap-3 text-black-1 group-hover:text-indigo-700">
        <div className="flex items-center justify-center">{icon}</div>
        <div className="text-xs text-center font-medium min-w-[60px] max-w-full px-1">
          {label}
        </div>
      </div>
    </div>
  );
};

export default DraggableNode;
