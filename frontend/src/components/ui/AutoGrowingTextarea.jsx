import { useEffect } from "react";
import { useAutoComplete } from "../utils/useAutoComplete";
import { DropdownMenu } from "./DropdownMenu";

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
    mirrorRef,
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

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.rows = minRows;
    const lineHeight = parseInt(
      getComputedStyle(textarea).lineHeight || "24",
      10
    );

    const currentRows = Math.floor(textarea.scrollHeight / lineHeight);

    if (currentRows >= maxRows) {
      textarea.rows = maxRows;
      textarea.style.overflowY = "auto";
    } else {
      textarea.rows = currentRows;
      textarea.style.overflowY = "hidden";
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <div className="relative w-full">
      <div
        ref={mirrorRef}
        className="invisible absolute top-0 left-0 w-full p-2 pointer-events-none"
        style={{
          fontSize: "1rem",
          lineHeight: "1.5",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          onChange(e);
          resizeTextarea();
        }}
        onKeyDown={handleKeyDown}
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
          lineHeight: "1.5",
          fontSize: "1rem",
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
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
