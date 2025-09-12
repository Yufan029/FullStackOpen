const { describe, test, beforeEach, before, after } = require('node:test')
const { log } = require('node:console')

before(() => {
  log('before everything')
})

describe('all scope describe', () => {
  before(() => {
    log('before - all scope')
  })

  beforeEach(() => {
    log('beforeEach - all scope')
  })

  test('test 1 in the all scope', () => {
    log('test 1 - all scope')
  })

  test('test 2 in the all scope', () => {
    log('test 2 - all scope')
  })

  after(() => {
    log('after 1 - all scope')
  })

  describe('describe - nested', () => {
    before(() => {
      log('before - nested')
    })

    beforeEach(() => {
      log('beforeEach - nested')
    })

    test('test 1 nested', () => {
      log('test 1 - nested')
    })

    test('test 2 nested', () => {
      log('test 2 - nested')
    })

    after(() => {
      log('after - nested')
    })
  })

  after(() => {
    log('after 2 - all scope')
  })
})

after(() => {
  log('after everything')
})