import React from "react"
import { DragSource } from "react-dnd"

const Item = ({ isDragging, connectDragSource, text }) =>
  connectDragSource(
    <div className="item" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {text}
    </div>
  )

const cardSource = {
  beginDrag(props) {
    return {
      text: props.text
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default DragSource("ITEM", cardSource, collect)(Item)
// export default Item
