import { useAutoComplete } from "../utils/useAutoComplete";
import { DropdownMenu } from "./DropdownMenu";
import TextareaAutosize from "react-textarea-autosize";

export default function AutoGrowingTextarea({
  currentNodeId,
  value,
  onChange,
  outputNodeTypes = ["Input", "llm", "translate", "text"],
  onSelectNode,
  minRows = 1,
  maxRows = 6,
}) {
  const {
    textareaRef,
    showMenu,
    filteredNodes,
    menuPos,
    handleKeyDown,
    insertAtCaret,
    selectedIndex,
  } = useAutoComplete({
    currentNodeId,
    value,
    outputNodeTypes,
    onSelect: (newVal) => onChange({ target: { value: newVal } }),
  });

  return (
    <div className="relative w-full">
      <TextareaAutosize
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        minRows={minRows}
        maxRows={maxRows}
        onWheelCapture={(e) => {
          const target = e.currentTarget;
          const delta = e.deltaY;

          const isScrollingUp = delta < 0;
          const isScrollingDown = delta > 0;

          const atTop = target.scrollTop === 0;
          const atBottom =
            target.scrollTop + target.clientHeight >= target.scrollHeight;

          const canScrollUp = !atTop;
          const canScrollDown = !atBottom;

          if (
            (isScrollingUp && canScrollUp) ||
            (isScrollingDown && canScrollDown)
          ) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        style={{
          resize: "none",
          overflowY: "auto",
          fontSize: "1rem",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      />
      {showMenu && (
        <DropdownMenu
          items={filteredNodes}
          position={menuPos}
          onSelect={(node) => {
            insertAtCaret(`{{${node.id}}}`, node.id);
            onSelectNode?.(currentNodeId, node);
          }}
          selectedIndex={selectedIndex}
        />
      )}
    </div>
  );
}
