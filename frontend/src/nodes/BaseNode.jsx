import { Handle } from "@xyflow/react";

const BaseNode = ({ id, title, inputs = [], outputs = [], children }) => {
  return (
    <div
      id={`node-${id}`}
      style={{ width: 200, height: 80, border: "1px solid black" }}
    >
      <div>
        <strong>{title}</strong>
      </div>

      <div>{children}</div>

      {/* Target Handlers  */}
      {inputs.map(({ id, position, style }) => (
        <Handle
          key={id}
          type="target"
          position={position}
          id={id}
          style={style}
        />
      ))}

      {/* Source Handlers  */}
      {outputs.map(({ id, position, style }) => (
        <Handle
          key={id}
          type="source"
          position={position}
          id={id}
          style={style}
        />
      ))}
    </div>
  );
};

export default BaseNode;
