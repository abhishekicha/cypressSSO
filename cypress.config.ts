import { defineConfig } from 'cypress'

export default defineConfig({
  hosts: {
    'auth.corp.com': '127.0.0.1',
  },
  fixturesFolder: false,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:7074',
  },
})
