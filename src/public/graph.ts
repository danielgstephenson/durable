import { Renderer } from "./renderer"

export class Graph {
  renderer: Renderer
  x = 12.5
  y = 20
  width = 75
  height = 75

  constructor(renderer: Renderer) {
    this.renderer = renderer
  }

  draw(): void {
    this.renderer.resetContext()
    const context = this.renderer.context
    context.lineWidth = 1
    context.strokeStyle = 'black'
    context.strokeRect(12.5, 20, 75, 75)
  }

}