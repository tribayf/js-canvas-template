import MakeApp from '../src/scripts/app'

import UserApp from './mock/user-app.mock'
import canvas  from './mock/canvas.mock'

describe('MakeApp', function () {

  const config = { canvas: canvas }

  it('accepts configuration options', function () {
    expect(MakeApp(UserApp, config).config).toBe(config)
  })

  it('wraps a user defined class', function () {
    const App = MakeApp(UserApp, config)
    expect(App).toBeDefined()
  })

  it('throws if UserApp does not provide update method', function() {
    const App = MakeApp(UserApp, config)
    expect(() => App.update({ deltaTime: 0, appState: {} })).toThrow()
  })

  it('throws if UserApp does not provide draw method', function() {
    const App = MakeApp(UserApp, config)
    expect(() => App.draw({ appState: {} })).toThrow()
  })

  it('does not throw if does not proved init method', function() {
    const App = MakeApp(UserApp, config)
    expect(() => App.init()).not.toThrow()
  })

})
