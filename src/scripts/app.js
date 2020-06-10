'use strict'

class App
{
/* ------------------------------------------------------------------------------------ *\
   Public API
\* ------------------------------------------------------------------------------------ */

  static get canvas()  { return this.canvas_  }
  static get context() { return this.context_ }

  static start()
  {
    let state = this.init({ appState: {} })
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
  static canvas_  = document.getElementById("c")
  static context_ = document.getElementById("c").getContext("2d")

  static __loop__({ currentTime: t1 = 0, previousTime: t0 = 0, appState: s0 })
  {
    if (this.frameId_ == null) return

    let s1 = this.update({ deltaTime: t1-t0, appState: s0 })

    this.draw({ appState: s1 })

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

