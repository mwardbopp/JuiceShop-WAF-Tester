# JuiceShop-WAF-Tester
Modified E2E Protractor tests from (https://github.com/bkimminich/juice-shop) that focus on vulnerabilities that a WAF should be able to block

If running locally ensure NPM v14 and protractor are installed. Then run:
protractor --baseUrl='http://websiteURL' protractor.conf.js

If running via Jenkins:

npm install & npm install -g protractor & protractor --baseUrl='http://websiteURL' protractor.conf.js
