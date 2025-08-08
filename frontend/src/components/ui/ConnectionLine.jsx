const ConnectionLine = ({ fromX, fromY, toX, toY }) => {
  return (
    <g>
      <path
        fill="none"
        stroke="#7a7df3"
        strokeWidth={2}
        strokeDasharray="10,6"
        className="animated-dash"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke="#7a7df3"
        strokeWidth={1.5}
      />
    </g>
  );
};

export default ConnectionLine;
