'use strict'

/* ------------------------------------------------------------------------------------ *\
   standalone functions
\* ------------------------------------------------------------------------------------ */
function prn(i) {
  return Math.floor(0.5 * (i-1))
}

function lft(i) {
  return 2*i + 1
}

function rgt(i) {
  return 2*i + 2
}

function swap(heap, a, b) {
  [heap[b], heap[a]] = [heap[a], heap[b]]
  return heap
}

function heapup(heap, cmp, i)
{
  if (i <= 0) return heap

  const j = prn(i)
  if (cmp(heap[i], heap[j]))
  {
    return heapup(swap(heap, i, j), cmp, j)
  }

  return heap
}

function heapdn(heap, cmp, i)
{
  let n = heap.length - 1

  if (lft(i) > n) return heap

  if (lft(i) == n)
  {
    var j = lft(i)
  }
  else /* (lft(i) < n) */
  {
    let l = lft(i),
        r = rgt(i)
    var j = cmp(heap[l], heap[r]) ? l : r
  }

  if (cmp(heap[j], heap[i]))
  {
    return heapdn(swap(heap, i, j), cmp, j)
  }

  return heap
}

function validate(heap, cmp)
{
  const h = heap,
        c = cmp

  if (h.length == 0) return true

  return h.map((elem, i) => {
             let l = h[lft(i)] || true,
                 r = h[rgt(i)] || true
             return ((l === true || c(elem, l)) && (r === true || c(elem, r)))
           })
          .reduce((sum, elem) => sum && (elem === true))
 }

/* ------------------------------------------------------------------------------------ *\
   class PriorityQueue
\* ------------------------------------------------------------------------------------ */
export class PriorityQueue
{
  #cmp
  #heap = []

  get size()  { return this.#heap.length               }
  get heap()  { return Array.from(this.#heap)          }
  get valid() { return validate(this.#heap, this.#cmp) }

  constructor(comparator)
  {
    this.#cmp = comparator
  }

  push(elem)
  {
    this.#heap.push(elem)
    this.#heap = heapup(this.#heap, this.#cmp, this.#heap.length - 1)
  }

  pop()
  {
    let top = this.#heap[0]
    swap(this.#heap, 0, this.#heap.length - 1)
    this.#heap.pop()
    heapdn(this.#heap, this.#cmp, 0)
    return top
  }
}
