import { range } from "../math"
import { Renderer } from "./renderer"

export class ActionLine {
  renderer: Renderer
  x = 15
  y = 10
  width = 70
  tickLength = 2
  fontSize = 0.3

  constructor(renderer: Renderer) {
    this.renderer = renderer
  }

  draw(): void {
    this.drawLine()
    this.drawTicks()
    this.drawLabel()
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

  drawTicks(): void {
    const context = this.renderer.context
    const unitMax = this.renderer.summary.unitMax
    const depreciation = this.renderer.summary.depreciation
    const purchaseMax = unitMax * depreciation
    context.lineWidth = 0.5
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    context.beginPath()
    const tickCount = 5
    range(0, tickCount).forEach(i => {
      const x = this.x + i / tickCount * this.width
      const y0 = this.y
      const y1 = this.y - this.tickLength
      context.moveTo(x, y0)
      context.lineTo(x, y1)
    })
    context.stroke()
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = `${this.fontSize}vmin Arial`
    range(0, tickCount).forEach(i => {
      const x = this.x + i / tickCount * this.width
      const y = this.y - this.tickLength - 7 * this.fontSize
      const purchaseRate = i / tickCount * purchaseMax
      context.save()
      context.translate(x, y)
      context.scale(1, -1)
      context.fillText(`${purchaseRate.toFixed(1)}`, 0, 0)
      context.restore()
    })
  }

  drawLabel(): void {
    const context = this.renderer.context
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    const x = this.x + 0.5 * this.width
    const y = this.y - this.tickLength - 20 * this.fontSize
    context.save()
    context.translate(x, y)
    context.scale(1, -1)
    context.fillText(`Your Purchase Rate`, 0, 0)
    context.restore()
  }

  drawAction(): void {
    const context = this.renderer.context
    const action = this.renderer.getAction()
    const x0 = this.x + this.width * action
    const y0 = this.y
    context.fillStyle = 'hsl(215, 100%, 50%)'
    const size = 3
    const x1 = x0 - 0.5 * size
    const x2 = x0 + 0.5 * size
    const y1 = y0 + size
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y1)
    context.lineTo(x0, y0)
    context.fill()
  }


}