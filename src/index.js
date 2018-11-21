import ReactDOM from "react-dom"
import React from "react"
import Canvas from "./Canvas"
import "./styles.css"
import Item from "./Item"
import { DragDropContextProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

class App extends React.Component {
  state = {
    items: {
      roots: []
    }
  }
  addItem = item => {
    const { items } = this.state
    const { [item.parent]: node } = items
    node.push(item)
    this.setState({
      items: {
        ...items,
        [item.parent]: node
      }
    })
  }
  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <Item text="hello" />
          <Item text="world" />
        </div>
        <Canvas addItem={this.addItem} items={this.state.items} />
      </div>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(
  <DragDropContextProvider backend={HTML5Backend}>
    <App />
  </DragDropContextProvider>,
  rootElement
)
