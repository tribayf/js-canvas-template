import { PriorityQueue } from '../src/scripts/examples/util/queue'

describe('PriorityQueue', function() {

  const cmp   = (a, b) => a<=b
  const given = [4,7,21,10,16,7,11,15,17,20,17,15,8,16]

  it('can push elements to the queue', function() {
    const queue = new PriorityQueue(cmp)
    given.map(elem => queue.push(elem))

    expect(queue.size).not.toBeGreaterThan(given.length)
    expect(queue.size).toEqual(given.length)
    expect(queue.size).not.toBeLessThan(given.length)
  })

  it('can pop elements from the queue', function() {
    const queue = new PriorityQueue(cmp)
    given.map(elem => queue.push(elem)).map(elem => queue.pop(elem))

    expect(queue.size).not.toBeGreaterThan(0)
    expect(queue.size).toEqual(0)
    expect(queue.size).not.toBeLessThan(0)
  })

  it('maintains a valid heap (0)', function() {
    const queue = new PriorityQueue(cmp)

    expect(queue.heap).toEqual([])
    expect(queue.valid).toBe(true)
  })

  it('maintains a valid heap (1)', function() {
    const expected = [4,7,7,10,16,8,11,15,17,20,17,21,15,16]
    const queue    = new PriorityQueue(cmp)
    given.map(elem => queue.push(elem))

    expect(queue.heap).toEqual(expected)
    expect(queue.valid).toBe(true)
  })

})