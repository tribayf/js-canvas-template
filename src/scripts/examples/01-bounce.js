'use strict'

/** Example Class
 *
 *  Every class supplied to MakeApp must provide two methods, namely `update` and `draw.
 *  Optionally you may supply an `init` method which will be called for you automatically
 *  prior to starting the main loop.
 *
 *  Usage:
 *  - Pass your class as the argument to `MakeApp`. The return value is the object that
 *    uses the `update`, `draw`, and (optionally) `init` methods the you provide.
 *  - Call `start()` on this object to start the main loop.
 *
 *  Notes:
 *  - The properties `canvas` and `context` are made available to this class for drawing.
 *    They may be accessed through `this` (i.e. `this.canvas` or `this.context`).
 *  - Draw using the normal API calls for the 2D context. See:
 *    https://developer.mozilla.org/en-US/docs/Glossary/Canvas
 *
 */
export default class Bounce
{
  /** init [Optional]
   *
   *  Signature: init({ appState }): appState
   *
   *  This method is called once prior starting the main loop, and is for doing any
   *  initial setup that you require for your implementation. You must return `state` at
   *  the end so that it may subsequently be passed your `update` and `draw` methods.
   *
   *  You may define any app-specific state data that you require here. It is also a good
   *  place to set the desired size for your canvas.
   */
  static init(config)
  {
    this.canvas.width  = 640
    this.canvas.height = 480

    let state = {}
    state.dims = {
      w: this.canvas.width,
      h: this.canvas.height,
      aspect: this.canvas.width / this.canvas.height,
    }
    state.ball = {
      x: state.dims.w/2,
      y: state.dims.h/2,
      r: 10,
      vx: Math.random()*5 - 2.5,
      vy: Math.random()*5 - 2.5,
      colour: 'white'
    }
    state.clearColor = 'black'

    return state
  }

  /** update [Required]
   *
   *  Signature: update({ deltaTime, appState }): appState
   *
   *  This method is the place to update your app's state. You must make sure to return
   *  the updated state in order to have it passed to the draw method.
   */
  static update({ deltaTime: dt, appState: state })
  {
    const { ball:b, dims:d } = state

    if ((b.x - b.r) <= 0 || (b.x + b.r) >= d.w) b.vx *= -1
    if ((b.y - b.r) <= 0 || (b.y + b.r) >= d.h) b.vy *= -1

    b.x += b.vx
    b.y += b.vy

    return state
  }

  /** draw [Required]
   *
   *  Signature: draw({ appState }): void
   *
   *  This method is the place to include your drawing commands. Currently only the 2D
   *  context is supported, but you may select which context is used by by editing
   *  `app.js`.
   */
  static draw({ appState: state })
  {
    const c = this.context

    c.fillStyle = state.clearColor
    c.fillRect(0, 0, state.dims.w, state.dims.h)

    const b = state.ball
    c.fillStyle = b.colour
    c.beginPath()
    c.arc(b.x, b.y, b.r, 0, Math.PI*2, 0);
    c.fill();
  }
}
