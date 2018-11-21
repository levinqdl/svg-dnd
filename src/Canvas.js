import React from "react"
import Circle from "./Circle"
import DropArea from "./DropArea"
import Rect from "./Rect"
import Junction from "./Junction"

class Canvas extends React.Component {
  svg = React.createRef()
  selected = null
  getMousePosition = ({ clientX, clientY }) => {
    const CTM = this.svg.current.getScreenCTM()
    return {
      x: (clientX - CTM.e) / CTM.a,
      y: (clientY - CTM.f) / CTM.d
    }
  }
  drag = ({ target, clientX, clientY }) => {
    if (this.selected) {
      const { x, y } = this.getMousePosition({ clientX, clientY })
      this.selected.setAttributeNS(null, "x", x - this.offset.x)
      this.selected.setAttributeNS(null, "y", y - this.offset.y)
    }
  }
  startDrag = event => {
    const { target } = event
    if (target.classList.contains("draggable")) {
      event.preventDefault()
      this.selected = target
      const offset = this.getMousePosition(event)
      offset.x -= parseFloat(this.selected.getAttributeNS(null, "x"))
      offset.y -= parseFloat(this.selected.getAttributeNS(null, "y"))
      this.offset = offset
    }
  }
  endDrag = e => {
    if (this.selected) {
      e.preventDefault()
      this.selected = null
    }
  }
  genDAG = function*() {
    const { items, addItem } = this.props
    yield (
      <>
        <Circle x={200} y={60} />
        <DropArea addItem={this.props.addItem} x={160} y={120} />
      </>
    )
    let nodeKey = "roots"
    let nodes = items[nodeKey]
    let parent = { x: 200, y: 60 }

    for (const { junction, text, position } of nodes) {
      yield (
        <>
          <Junction from={parent} to={junction} />
          <Rect x={position.x} y={position.y} addItem={addItem}>
            {text}
          </Rect>
        </>
      )
      parent = {
        x: position.x + 40,
        y: position.y + 20
      }
    }
  }
  render() {
    const graph = this.genDAG()
    const graphArr = []
    for (const node of graph) {
      graphArr.push(node)
    }
    console.log(graphArr)
    return (
      <div>
        <svg
          ref={this.svg}
          width="400"
          height="400"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          onMouseDown={this.startDrag}
          onMouseMove={this.drag}
          onMouseUp={this.endDrag}
        >
          <rect
            x="0"
            y="0"
            width="400"
            height="400"
            stroke="black"
            fill="transparent"
            strokeWidth="5"
          />
          {graphArr}
        </svg>
      </div>
    )
  }
}

export default Canvas
