'use strict'

import { PriorityQueue } from "./util/queue"

export default class Voronoi
{
  static init(config)
  {
    const [w, h, margin] = [640, 480, Math.floor(0.1*640)]

    this.canvas.width  = w
    this.canvas.height = h

    const siteCount = config.siteCount || 10,
          xmin  = config.xmin || margin,
          xmax  = config.xmax || w - 2*margin,
          ymin  = config.ymin || margin,
          ymax  = config.ymax || h - 2*margin,
          sites = generateSites(siteCount, xmin, xmax, ymin, ymax),
          queue = new PriorityQueue(compare)

    sites.map(s => queue.push(s))

    return { sites, queue }
  }

  static update({ deltaTime: dt, appState: state })
  {
    // const s = state.queue.pop()
    // if (siteEvent(s))
    //   state.beachline.add(s)
    // else
    //   state.beachline.remove(s)

    return state
  }

  static draw({ appState: state })
  {
    this.clear()
    this.drawSites(state.sites)
  }

  static drawSites(sites)
  {
    this.context.fillStyle = 'white'
    sites.map(([x, y]) => this.context.fillRect(x, y, 2, 2))
  }

  static clear()
  {
    this.context.fillStyle = 'black'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
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
