import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store/store";
import getCaretCoordinates from "textarea-caret";

export function useAutoComplete({
  currentNodeId,
  value,
  outputNodeTypes,
  onSelect,
}) {
  const textareaRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [filteredNodes, setFilteredNodes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [triggerIndex, setTriggerIndex] = useState(null);

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onConnect = useStore((state) => state.onConnect);
  const setEdges = useStore((state) => state.setEdges);

  const updateMenuPosition = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const caretPos = getCaretCoordinates(textarea, textarea.selectionStart);

    setMenuPos({
      top: caretPos.top + caretPos.height + 4,
      left: caretPos.left,
    });
  };

  const insertAtCaret = (insertText, targetNodeId) => {
    const textarea = textareaRef.current;
    const start = triggerIndex ?? textarea.selectionStart;
    const end = textarea.selectionStart;

    const newValue =
      value.substring(0, start) + insertText + value.substring(end);

    onSelect(newValue);
    setShowMenu(false);
    setTriggerIndex(null);

    onConnect({
      source: targetNodeId,
      sourceHandle: `${targetNodeId}-value`,
      target: currentNodeId,
      targetHandle: `${currentNodeId}-value`,
    });

    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + insertText.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (showMenu) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev + 1 < filteredNodes.length ? prev + 1 : prev
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        const selectedNode = filteredNodes[selectedIndex];
        if (selectedNode) {
          insertAtCaret(`{{${selectedNode.id}}}`, selectedNode.id);
        }
      }
    }

    const textarea = textareaRef.current;

    if (
      e.key === "{" &&
      value &&
      textarea.selectionStart >= 1 &&
      value[textarea.selectionStart - 1] === "{"
    ) {
      const start = textarea.selectionStart - 2;

      const connectedNodeIds = edges.flatMap((edge) =>
        edge.source === currentNodeId
          ? [edge.target]
          : edge.target === currentNodeId
          ? [edge.source]
          : []
      );

      const outputNodes = nodes.filter(
        (n) =>
          outputNodeTypes.includes(n.type) &&
          !connectedNodeIds.includes(n.id) &&
          n.id !== currentNodeId
      );

      setFilteredNodes(outputNodes);
      setSelectedIndex(0);
      setTriggerIndex(start);
      setShowMenu(true);

      setTimeout(updateMenuPosition, 0);
    }

    if (e.key === "Escape") {
      setShowMenu(false);
      setTriggerIndex(null);
    }

    if (e.key === "Backspace") {
      const pos = textarea.selectionStart;

      const tokenRegex = /\{\{([^}]+)\}\}/g;
      let match;
      while ((match = tokenRegex.exec(value)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        if (pos > start && pos <= end) {
          const nodeId = match[1];
          setEdges((edges) =>
            edges.filter(
              (edge) =>
                edge.targetHandle !== `${nodeId}-value` &&
                edge.sourceHandle !== `${nodeId}-value`
            )
          );
          break;
        }
      }

      if (
        triggerIndex !== null &&
        (pos <= triggerIndex || value[triggerIndex] !== "{")
      ) {
        setShowMenu(false);
        setTriggerIndex(null);
      }
    }
  };

  useEffect(() => {
    if (showMenu) updateMenuPosition();
  }, [value, showMenu]);

  return {
    textareaRef,
    showMenu,
    filteredNodes,
    selectedIndex,
    menuPos,
    handleKeyDown,
    insertAtCaret,
  };
}
