import React from "react"
import DropArea from "./DropArea"
const Rect = ({ x, y, children, addItem }) => (
  <g>
    <rect x={x} y={y} width="80" height="20" />
    <text
      x={x + 40}
      y={y + 10}
      textAnchor="middle"
      stroke="white"
      dominantBaseline="middle"
    >
      {children}
    </text>
    <DropArea x={x} y={y + 40} addItem={addItem} />
  </g>
)

export default Rect
