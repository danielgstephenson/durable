import { range } from "../../math"
import { Subject } from "../../subject"

export class Table {
  tableDiv: HTMLDivElement
  subjects: Subject[] = []

  constructor() {
    this.tableDiv = document.getElementById('tableDiv') as HTMLDivElement
    this.tableDiv.style.userSelect = 'none'
  }

  update(subjects: Subject[]): void {
    this.subjects = subjects
    const ids = [...this.subjects.keys()]
    ids.sort((a, b) => Number(a) - Number(b))
    this.tableDiv.innerHTML = ''
    const rows: HTMLDivElement[] = []
    const labels = ['', 'id', 'group']
    const widths = ['12vmin', '3vmin', '8vmin']
    const header = document.createElement('div')
    for (const i of range(labels.length)) {
      const item = document.createElement('div')
      item.style.textAlign = 'center'
      item.style.width = widths[i]
      item.innerHTML = labels[i]
      header.appendChild(item)
    }
    rows.push(header)
    subjects.forEach(subject => {
      const row = document.createElement('div')
      const values = [
        subject.connected ? 'connected' : '',
        subject.id,
        subject.group.toString()
      ]
      for (const i of range(values.length)) {
        const item = document.createElement('div')
        item.style.textAlign = 'center'
        item.style.width = widths[i]
        item.innerHTML = values[i]
        row.appendChild(item)
      }
      rows.push(row)
    })
    rows.forEach(row => {
      row.style.display = 'flex'
      row.style.flexDirection = 'row'
      row.style.alignItems = 'flex-start'
      row.style.justifyContent = 'center'
      this.tableDiv.appendChild(row)
    })
    this.tableDiv.style.userSelect = 'none'
  }
}