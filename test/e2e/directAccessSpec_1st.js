/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const config = require('config')
const utils = require('../../lib/utils')
let blueprint

for (const product of config.get('products')) {
  if (product.fileForRetrieveBlueprintChallenge) {
    blueprint = product.fileForRetrieveBlueprintChallenge
    break
  }
}


  describe('challenge "premiumPaywall"', () => {
    it('should be able to access "super secret" url for premium content', () => {
      browser.driver.get(browser.baseUrl + '/this/page/is/hidden/behind/an/incredibly/high/paywall/that/could/only/be/unlocked/by/sending/1btc/to/us')
    })

    protractor.expect.challengeSolved({ challenge: 'Premium Paywall' })
  })


  describe('challenge "accessLogDisclosure"', () => {
    it('should be able to access today\'s access log file', () => {
      browser.driver.get(browser.baseUrl + '/support/logs/access.log.' + utils.toISO8601(new Date()))
    })

    protractor.expect.challengeSolved({ challenge: 'Access Log' })
  })
