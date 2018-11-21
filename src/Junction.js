import React from "react"

const Junction = ({ from, to }) => (
  <line
    x1={from.x}
    y1={from.y}
    x2={to.x}
    y2={to.y}
    stroke="black"
    strokeWidth="1"
  />
)

export default Junction
