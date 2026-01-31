import { clamp } from "../math"
import { Subject } from "../subject"
import { ProfitGraph } from "./profitGraph"
import { Mouse } from "./mouse"
import { ActionLine } from "./actionLine"
import { SubjectSummary } from "../experiment"

export class Renderer {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  summary: SubjectSummary
  profitGraph = new ProfitGraph(this)
  actionLine = new ActionLine(this)
  mouse = new Mouse(this)
  subjects: Subject[] = []
  renderScale = 1
  id = ''

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.summary = {
      id: '',
      subjects: [],
      unitMax: 0,
      depreciation: 0,
      time: 0,
      price: 0,
      rent: 0,
      started: false
    }
    this.draw()
  }

  draw(): void {
    window.requestAnimationFrame(() => this.draw())
    this.setupCanvas()
    this.profitGraph.draw()
    this.actionLine.draw()
  }

  setupCanvas(): void {
    this.canvas.width = window.innerWidth * this.renderScale
    this.canvas.height = window.innerHeight * this.renderScale
    // this.context.imageSmoothingEnabled = false
  }

  getAction(): number {
    return clamp(0, 1, (this.mouse.x - this.profitGraph.x) / this.profitGraph.width)
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