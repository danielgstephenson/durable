import { clamp } from "../math"
import { Subject } from "../subject"
import { Graph } from "./graph"
import { Mouse } from "./mouse"
import { ActionLine } from "./actionLine"

export class Renderer {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  graph = new Graph(this)
  actionLine = new ActionLine(this)
  mouse = new Mouse(this)
  subjects = new Map<string, Subject>()
  renderScale = 1
  id = ''

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.draw()
  }

  draw(): void {
    window.requestAnimationFrame(() => this.draw())
    this.setupCanvas()
    this.graph.draw()
    this.actionLine.draw()
  }

  setupCanvas(): void {
    this.canvas.width = window.innerWidth * this.renderScale
    this.canvas.height = window.innerHeight * this.renderScale
    // this.context.imageSmoothingEnabled = false
  }

  getAction(): number {
    return clamp(0, 1, (this.mouse.x - this.graph.x) / this.graph.width)
  }

  resetContext(): void {
    this.context.resetTransform()
    this.context.translate(0.5 * this.canvas.width, 0.5 * this.canvas.height)
    const vmin = Math.min(this.canvas.width, this.canvas.height)
    this.context.scale(0.01 * vmin, -0.01 * vmin)
    this.context.translate(-50, -50)
    this.context.globalAlpha = 1
  }
}