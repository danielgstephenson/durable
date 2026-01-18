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
    this.drawSubjects()
  }

  drawSubjects(): void {
    const context = this.renderer.context
    const unitMax = this.renderer.summary.unitMax
    context.lineWidth = 1
    context.strokeStyle = 'hsl(120, 100%, 25%)'
    this.renderer.subjects.forEach(subject => {
      const x = this.x + subject.units / unitMax * this.width
      const y = this.y + 0.5 * this.height
      context.beginPath()
      context.arc(x, y, 2, 0, 2 * Math.PI)
      context.stroke()
    })
  }
}