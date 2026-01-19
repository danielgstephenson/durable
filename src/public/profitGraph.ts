import { range } from "../math"
import { Renderer } from "./renderer"

export class ProfitGraph {
  renderer: Renderer
  x = 15
  y = 28
  width = 70
  height = 70
  tickLength = 2
  fontSize = 0.3
  profitMin = 0
  profitMax = 1
  profitRange = 1
  padding = 1

  constructor(renderer: Renderer) {
    this.renderer = renderer
  }

  draw(): void {
    const subjects = [...this.renderer.subjects.values()]
    const profits = subjects.map(s => s.profit)
    this.profitMin = Math.min(-5, ...profits) - this.padding
    this.profitMax = Math.max(5, ...profits) + this.padding
    this.profitRange = this.profitMax - this.profitMin
    this.renderer.resetContext()
    const context = this.renderer.context
    context.lineWidth = 0.5
    context.strokeStyle = 'black'
    context.strokeRect(this.x, this.y, this.width, this.height)
    this.drawTicksX()
    this.drawLabelX()
    this.drawTicksY()
    this.drawLabelY()
    this.drawSubjects()
  }

  drawTicksX(): void {
    const context = this.renderer.context
    const unitMax = this.renderer.summary.unitMax
    context.lineWidth = 0.5
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    context.beginPath()
    range(0, unitMax).forEach(i => {
      const x = this.x + i / unitMax * this.width
      const y0 = this.y
      const y1 = this.y - this.tickLength
      context.moveTo(x, y0)
      context.lineTo(x, y1)
    })
    context.stroke()
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = `${this.fontSize}vmin Arial`
    range(0, unitMax).forEach(i => {
      const x = this.x + i / unitMax * this.width
      const y = this.y - this.tickLength - 7 * this.fontSize
      context.save()
      context.translate(x, y)
      context.scale(1, -1)
      context.fillText(`${i}`, 0, 0)
      context.restore()
    })
  }

  drawLabelX(): void {
    const context = this.renderer.context
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    const x = this.x + 0.5 * this.width
    const y = this.y - this.tickLength - 20 * this.fontSize
    context.save()
    context.translate(x, y)
    context.scale(1, -1)
    context.fillText(`Units`, 0, 0)
    context.restore()
  }

  drawTicksY(): void {
    let step = 0.01
    for (const _ of range(100)) {
      if (this.profitRange > 20 * step) step *= 5
      else break
      if (this.profitRange > 20 * step) step *= 2
      else break
    }
    const context = this.renderer.context
    context.lineWidth = 0.5
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    context.beginPath()
    const levels = []
    let level = Math.ceil(this.profitMin / step) * step
    for (const _ of range(20)) {
      const scale = (level - this.profitMin) / this.profitRange
      const y = this.y + scale * this.height
      const x0 = this.x
      const x1 = this.x - this.tickLength
      context.moveTo(x0, y)
      context.lineTo(x1, y)
      levels.push(level)
      level += step
      if (level > this.profitMax) break
    }
    context.stroke()
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = `${this.fontSize}vmin Arial`
    levels.forEach(level => {
      const scale = (level - this.profitMin) / this.profitRange
      const x = this.x - this.tickLength - 12 * this.fontSize
      const y = this.y + scale * this.height
      context.save()
      context.translate(x, y)
      context.scale(1, -1)
      context.fillText(`${level.toFixed(2)}`, 0, 0)
      context.restore()
    })
  }

  drawLabelY(): void {
    const context = this.renderer.context
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    const x = this.x - 38 * this.fontSize
    const y = this.y + 0.5 * this.width
    context.save()
    context.translate(x, y)
    context.rotate(0.5 * Math.PI)
    context.scale(1, -1)
    context.fillText(`Cash Flow`, 0, 0)
    context.restore()
  }

  drawSubjects(): void {
    const context = this.renderer.context
    const unitMax = this.renderer.summary.unitMax
    context.lineWidth = 0.7
    context.strokeStyle = 'hsl(215, 100%, 50%)'
    context.fillStyle = 'hsl(215, 100%, 50%)'
    const subject = this.renderer.subjects.get(this.renderer.id)
    if (subject != null) {
      const x = this.x + subject.units / unitMax * this.width
      const profitScale = (subject.profit - this.profitMin) / this.profitRange
      const y = this.y + profitScale * this.height
      context.beginPath()
      context.arc(x, y, 1.2, 0, 2 * Math.PI)
      context.fill()
      context.stroke()
    }
    context.strokeStyle = 'hsl(120, 100%, 30%)'
    this.renderer.subjects.forEach(subject => {
      if (subject.id === this.renderer.id) return
      const x = this.x + subject.units / unitMax * this.width
      const profitScale = (subject.profit - this.profitMin) / this.profitRange
      const y = this.y + profitScale * this.height
      context.beginPath()
      context.arc(x, y, 1, 0, 2 * Math.PI)
      context.stroke()
    })
  }
}