'use strict'

class App
{
/* ------------------------------------------------------------------------------------ *\
   Public API
\* ------------------------------------------------------------------------------------ */

  static get canvas()  { return this.canvas_  }
  static get context() { return this.context_ }

  static start(...{ config = { /* canvasId:"c", contextType:"2d" */ }})
  {
    let state = this.__init__({ config })
    this.frameId_ = window.requestAnimationFrame(_ => this.__loop__({ appState: state }))
  }

  static stop()
  {
    window.cancelAnimationFrame(this.frameId_)
    this.frameId_ = null
  }

/* ------------------------------------------------------------------------------------ *\
   Client Supplied Methods
\* ------------------------------------------------------------------------------------ */

  /* Optional */
  static init ({ appState: state }) { return state }

  /* Required */
  static update({ deltaTime: dt, appState: state })
  {
    const sig = 'static update({ deltaTime:dt, appState:state }): state'
    throw new Error(`\n\tmissing required method: "${sig}"`)
  }

  /* Required */
  static draw({ appState: state })
  {
    const sig = 'static draw({ appState:state }): void'
    throw new Error(`\n\tmissing required method: "${sig}"`)
  }

/* ------------------------------------------------------------------------------------ *\
   Private API
\* ------------------------------------------------------------------------------------ */

  static frameId_ = null
  static canvas_  = null
  static context_ = null

  static __init__({ config })
  {
    const id = config.canvasId    || "c"
    const ty = config.contextType || "2d"

    this.canvas_  = document.getElementById(id)
    this.context_ = this.canvas_.getContext(ty)

    return this.init({ appState: {} })
  }

  static __loop__({ currentTime: t1 = 0, previousTime: t0 = 0, appState: s0 })
  {
    let s1 = this.update({ deltaTime: t1-t0, appState: s0 })

    this.draw({ appState: s1 })

    if (this.frameId_ == null) return

    this.frameId_ = requestAnimationFrame(time =>
      this.__loop__({ currentTime: time, previousTime: t1, appState: s1 }))
  }
}

export function MakeApp(Cls)
{
  let Wrapped = {}
  Object.defineProperties(Wrapped, Object.getOwnPropertyDescriptors(App))
  Object.defineProperties(Wrapped, Object.getOwnPropertyDescriptors(Cls))
  return Wrapped
}

