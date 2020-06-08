'use strict'

class App
{
  static frameId_ = null
  static canvas_  = document.getElementById("c")
  static context_ = document.getElementById("c").getContext("2d")

  static get canvas() { return this.canvas_ }
  static get context() { return this.context_ }

  static start()
  {
    let state = this.init({ appState: {} })
    this.frameId_ = window.requestAnimationFrame(time => this.loop({ appState: state }))
  }

  static init ({ appState: state }) { return state }

  static update({ deltaTime: dt, appState: state })
  {
    const sig = 'static update({ deltaTime:dt, appState:state }): state'
    throw new Error(`\n\tmissing required method: "${sig}"`)
  }

  static draw({ appState: state })
  {
    const sig = 'static draw({ appState:state }): void'
    throw new Error(`\n\tmissing required method: "${sig}"`)
  }

  static stop()
  {
    window.cancelAnimationFrame(this.frameId_)
  }

  static loop({ currentTime: t1 = 0, previousTime: t0 = 0, appState: s0 })
  {
    let s1 = this.update({ deltaTime: t1-t0, appState: s0 })

    this.draw({ appState: s1 })

    requestAnimationFrame(time =>
      this.loop({ currentTime: time, previousTime: t1, appState: s1 }))
  }
}

export function MakeApp(cls)
{
  function decorate(cls, prop)
  {
    if (cls.hasOwnProperty(prop))
      Object.defineProperty(App, prop, Object.getOwnPropertyDescriptor(cls, prop))
  }

  ['draw', 'update', 'init'].map((prop) => decorate(cls, prop))

  return App
}

