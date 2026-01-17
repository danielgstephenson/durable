import { Renderer } from "./renderer"

export class ActionLine {
  renderer: Renderer
  x = 12.5
  y = 15
  width = 75

  constructor(renderer: Renderer) {
    this.renderer = renderer
  }

  draw(): void {
    this.drawLine()
    this.drawAction()
  }

  drawLine(): void {
    this.renderer.resetContext()
    const context = this.renderer.context
    context.lineWidth = 0.5
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.beginPath()
    context.moveTo(this.x, this.y)
    context.lineTo(this.x + this.width, this.y)
    context.stroke()
  }

  drawAction(): void {
    const context = this.renderer.context
    const action = this.renderer.getAction()
    const x = this.x + this.width * action
    const y = this.y
    context.fillStyle = 'hsl(215, 100%, 50%)'
    const size = 3
    const x1 = x - 0.5 * size
    const x2 = x + 0.5 * size
    const y1 = y + size
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y1)
    context.lineTo(x, y)
    // context.arc(x, y, 2, 0, 2 * Math.PI)
    context.fill()

  }


}