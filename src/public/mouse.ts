import { Renderer } from "./renderer"

export class Mouse {
  renderer: Renderer
  x = 0
  y = 0
  unmoved = true

  constructor(renderer: Renderer) {
    this.renderer = renderer
    window.addEventListener('mousemove', (event: MouseEvent) => this.onmousemove(event))
  }

  onmousemove(event: MouseEvent) {
    this.unmoved = false
    const vmin = Math.min(window.innerWidth, window.innerHeight)
    this.x = 100 * (event.clientX - 0.5 * window.innerWidth) / vmin + 50
    this.y = 100 * (0.5 * window.innerHeight - event.clientY) / vmin + 50
    console.log('mouse', this.x.toFixed(2), this.y.toFixed(2))
  }

  draw(): void {
    if (this.unmoved) return
    this.renderer.resetContext()
    const context = this.renderer.context
    context.fillStyle = 'hsl(215, 100%, 50%)'
    context.beginPath()
    context.arc(this.x, this.y, 5, 0, 2 * Math.PI)
    context.fill()
  }

}