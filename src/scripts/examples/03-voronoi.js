'use strict'

import { PriorityQueue } from "./util/queue"

export default class Voronoi
{
  static init(config)
  {
    const siteCount = config.siteCount || 10,
          xmin  = config.xmin || 0,
          xmax  = config.xmax || this.canvas.width,
          ymin  = config.ymin || 0,
          ymax  = config.ymax || this.canvas.height,
          sites = generateSites(siteCount, xmin, xmax, ymin, ymax),
          queue = new PriorityQueue(compare)

    sites.map(s => queue.push(s))

    return { queue }
  }

  static update({ deltaTime: dt, appState: state })
  {
    const s = state.queue.pop()

    if (siteEvent(s))
      state.beachline.add(s)
    else
      state.beachline.remove(s)

    return state
  }

  static draw({ appState: state })
  {

  }
}

function compare(site0, site1)
{
  const [x0, y0] = site0, [x1, y1] = site1
  if ((y0 < y1) || (y0 == y1 && x0 < x1)) return -1
  if (y0 > y1)                            return  1
  else /* site0 == site1 */               return  0
}

function randint(min, max)
{
  return Math.floor(Math.random() * (max - min) + min)
}

function generateSites(n, xmin, xmax, ymin, ymax)
{
  let sites = new Array(n).fill()
  return sites.map(_ => [ randint(xmin, xmax), randint(ymin, ymax) ])
}
