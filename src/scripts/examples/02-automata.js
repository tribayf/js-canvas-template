'use strict'

export class Automaton
{
  static init({ appState: state })
  {
    const [ w, h, s ] = [640, 480, 2]

    this.canvas.width  = w
    this.canvas.height = h
    const cols = Math.floor(w/s)
    const rows = Math.floor(h/s)

    state.canvas  = this.canvas
    state.context = this.context

    state.rule = 30

    state.dimensions = {
      cols: cols,
      rows: rows,
      size: s,
    }

    state.generation = {
      curr:  new Array(cols).fill(0),
      grid:  new Array(rows).fill(new Array(cols).fill(0)),
      count: 0
    }

    state.generation.curr[
      Math.floor(state.generation.curr.length / 2)
    ] = 1

    return state
  }

  static update({ appState: state })
  {
    const { rows, cols } = state.dimensions
    let   { curr, grid } = state.generation

    // rotate the grid up one level
    state.generation.grid = grid.slice(1)
    state.generation.grid[rows-1] = curr

    let next = curr.map((_, col, fst=0, lst=cols-1) => {
      const a = curr[col-1] === undefined ? curr[lst] : curr[col-1],
            c = curr[col+1] === undefined ? curr[fst] : curr[col+1],
            b = curr[col+0]

      const shiftBy = (a << 2) + (b << 1) + (c << 0)
      const cellval = (state.rule >> shiftBy) & 1

      return cellval
    })
    state.generation.curr = next
    state.generation.count += 1

    return state
  }

  static draw({ appState: state })
  {
    this.clearCanvas()

    const s = state.dimensions.size
    const { grid } = state.generation

    state.context.fillStyle = 'white'

    grid.map((curr, row) => {
      curr.map((cell, col) => {
        if (cell) state.context.fillRect(s*col, s*row, s,s)
      })
    })
  }

  static clearCanvas()
  {
    const { width:w, height:h } = this.canvas
    this.context.fillStyle = 'black'
    this.context.fillRect(0, 0, w, h)
  }
}
