const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:12915/', // Change to your local Angular app URL
  },
});
