import MakeApp from '../src/scripts/app'
import Voronoi from '../src/scripts/examples/03-voronoi'
import canvas  from './mock/canvas.mock'

describe('Voronoi Example', function() {

  const config = {
    canvas: canvas,
    siteCount: 10,
    xmin: 0,
    xmax: canvas.width,
    ymin: 0,
    ymax: canvas.height
  }

  it('Populates the site queue', function() {
    const { queue } = MakeApp(Voronoi, config).init(config)
    expect(queue.size).toEqual(config.siteCount)
  })

})