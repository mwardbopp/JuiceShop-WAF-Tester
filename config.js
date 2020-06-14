// usage: protractor config.js --params.specs="*" --params.browser=ie --params.threads=1
//        protractor config.js --params.specs="dir1|dir2"
//        protractor config.js --params.specs="dir1|dir2/spec1.js|dir2/spec2.js"

// process command line arguments and initialize run configuration file
var init = function(config) {
    const path = require('path');
    var specs;
    for (var i = 3; i < process.argv.length; i++) {
      var match = process.argv[i].match(/^--params\.([^=]+)=(.*)$/);
      if (match)
        switch (match[1]) {
          case 'specs':
            specs = match[2];
            break;
          case 'browser':
            config.capabilities.browserName = match[2];
            if (match[2].toLowerCase() === 'ie') {
              config.capabilities.browserName = 'chrome';
              config.capabilities.platform = 'ANY';
              config.capabilities.version = '11';
              config.seleniumArgs = ['-Dwebdriver.ie.driver=' + path.join('node_modules', 'protractor' ,'selenium' ,'IEDriverServer.exe')];
            }
            if (match[2] !== 'chrome' && match[2] !== 'firefox')
              config.directConnect = false;
            break;
          case 'timeout':
            config.jasmineNodeOpts.defaultTimeoutInterval = parseInt(match[2]);
            break;
          case 'threads':
            config.capabilities.maxInstances = parseInt(match[2]);
            config.capabilities.shardTestFiles = config.capabilities.maxInstances > 1;
            break;
        }
    }
  
    // generate specs array
    specs.split(/\|/g).forEach(function(dir) {
      if (dir.endsWith('.js'))
        config.specs.push(dir);
      else
        config.specs.push(path.join(dir, '*.js'));
    });
  
    return config;
  };
  
  exports.config = (function() {
    return init({
      specs: [],
      framework: 'jasmine',
      jasmineNodeOpts: {
        defaultTimeoutInterval: 300000 // 5 min
      },
      capabilities: {
        browserName: 'chrome',
        shardTestFiles: false,
        maxInstances: 1
      },
      directConnect: true
    });
  })();