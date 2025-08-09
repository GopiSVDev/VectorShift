export function DropdownMenu({ items, onSelect, position, selectedIndex }) {
  if (!items.length) return null;
  return (
    <ul
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000,
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "4px",
        listStyle: "none",
        maxHeight: "200px",
        overflowY: "auto",
        minWidth: "120px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {items.map((node, i) => (
        <li
          key={node.id}
          onClick={() => onSelect(node)}
          style={{
            padding: "6px 8px",
            cursor: "pointer",
            borderRadius: "4px",
            background: i === selectedIndex ? "#e5e7eb" : "transparent",
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          {node.data.name || node.id}
        </li>
      ))}
    </ul>
  );
}
