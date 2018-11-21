import React from "react"
import { DropTarget } from "react-dnd"

const Area = ({ connectDropTarget, item, x, y }) =>
  item
    ? connectDropTarget(
        <rect
          x={x}
          y={y}
          width="80"
          height="20"
          fill="transparent"
          strokeDasharray="2 1"
          stroke="black"
          strokeWidth="1"
        />
      )
    : null

const itemTarget = {
  drop(props, monitor) {
    const { x, y } = props
    const item = monitor.getItem()
    props.addItem({
      text: item.text,
      position: { x, y },
      junction: { x: x + 40, y },
      parent: "roots"
    })
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
})

export default DropTarget("ITEM", itemTarget, collect)(Area)
