import React from "react"

const Circle = ({ x, y }) => (
  <g>
    <circle cx={x} cy={y} r="25" />
    <text x={x} y={y} textAnchor="middle" stroke="white">
      Start
    </text>
  </g>
)

export default Circle
