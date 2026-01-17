import { Renderer } from "./renderer"

export class Graph {
  renderer: Renderer
  x = 12.5
  y = 23
  width = 75
  height = 75

  constructor(renderer: Renderer) {
    this.renderer = renderer
  }

  draw(): void {
    this.renderer.resetContext()
    const context = this.renderer.context
    context.lineWidth = 0.5
    context.strokeStyle = 'black'
    context.strokeRect(this.x, this.y, this.width, this.height)
  }
}