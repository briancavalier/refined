import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { and, or } from './index'

const isTrue = <A>(a: A): a is A & true => true
const isFalse = <A>(a: A): a is A & false => false

test(and.name, async t => {
  await t.test('given all refinements are true, returns true', () => {
    assert(and(isTrue, isTrue)(Math.random()))
  })

  await t.test('given not all refinements are true, returns false', () => {
    assert(!and(isTrue, isFalse)(Math.random()))
  })
})

test(or.name, async t => {
  await t.test('given some refinements are true, returns true', () => {
    assert(or(isTrue, isFalse)(Math.random()))
  })

  await t.test('given all refinements are false, returns false', () => {
    assert(!or(isFalse, isFalse)(Math.random()))
  })
})
