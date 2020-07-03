'use strict'

export class Automaton
{
  static init(config)
  {
    const [ w, h, s ] = [640, 480, 2]

    const state = {}
    state.rule = 30
    state.cols = w/s
    state.cellsize = s

    state.buffer = {
      canvas:  this.canvas,
      context: this.context,
      clear:  () => {
        const { width:w, height:h } = state.buffer.canvas
        state.buffer.context.fillStyle = 'black'
        state.buffer.context.fillRect(0, 0, w, h)
      }
    }
    state.buffer.canvas.width  = w
    state.buffer.canvas.height = h
    state.buffer.clear()

    state.lattice = {
      curr: new Array(w/s).fill(0),
      next: new Array(w/s).fill(0),
      swap: () => {
        let  temp = state.lattice.curr
        state.lattice.curr = state.lattice.next
        state.lattice.next = temp
      }
    }
    state.lattice.next[Math.floor(state.cols / 2)] = 1

    return state
  }

  static update({ appState: state })
  {
    state.lattice.swap()

    let cols = state.lattice.curr.length
    let curr = state.lattice.curr

    let next = curr.map((_, col, fst=0, lst=cols-1) => {
      const a = curr[col-1] === undefined ? curr[lst] : curr[col-1],
            c = curr[col+1] === undefined ? curr[fst] : curr[col+1],
            b = curr[col+0]

      const shiftBy = (a << 2) + (b << 1) + (c << 0)
      const cellval = (state.rule >> shiftBy) & 1

      return cellval
    })
    state.lattice.next = next

    return state
  }

  static draw({ appState: state })
  {
    const l = state.lattice.curr
    const s = state.cellsize
    const { canvas, context } = state.buffer

    context.drawImage(canvas, 0, -s)

    const y = canvas.height-s
    l.map((cell, col)=> {
      context.fillStyle = cell ? 'white' : 'black'
      context.fillRect(s*col, y, s, s)
    })
  }
}
