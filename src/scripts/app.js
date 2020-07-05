'use strict'

class App
{
/* ------------------------------------------------------------------------------------ *\
   Public API
\* ------------------------------------------------------------------------------------ */

  static get canvas()  { return this.canvas_  }
  static get context() { return this.context_ }
  static get config()  { return this.config_  }

  static start(appState)
  {
    let config = this.init(this.config_)
    let state = { ...config, ...appState }
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
  static init (config) { /* user supplied method */ }

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
  static config_  = null

  static __init__(config)
  {
    const cf = config         || {}
    const id = cf.canvasId    || "c"
    const ty = cf.contextType || "2d"

    this.canvas_  = cf.canvas || document.getElementById(id)
    this.context_ = this.canvas_.getContext(ty)
    this.config_ = cf
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

export default function MakeApp(Cls, config)
{
  function Merge(target, source)
  {
    const props = Object.getOwnPropertyDescriptors(source)
    delete props.prototype
    Object.defineProperties(target, props)

    const symbs = Object.getOwnPropertySymbols(source)
    Object.defineProperties(target, symbs)
  }

  let Merged = {}
  Merge(Merged, App)
  Merge(Merged, Cls)

  Merged.__init__(config)

  return Merged
}
