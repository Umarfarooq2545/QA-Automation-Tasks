const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // chromeWebSecurity: false,
  
      // chromeArgs = [
      //   '--disable-web-security',
      //   '--disable-site-isolation-trials'
      // ]

      
        chromeWebSecurity: false,
        chromeArgs = ["--ignore-certificate-errors"]
      
      
      
    },
    
  },
});

