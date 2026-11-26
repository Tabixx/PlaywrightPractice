import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://automationintesting.online',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
    projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    { name: 'api', testMatch: /[\\/]api[\\/].*\.spec\.ts/, dependencies: ['setup'] },
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: /[\\/]api[\\/]/, dependencies: ['setup'] },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: /[\\/]api[\\/]/, dependencies: ['setup'] },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: /[\\/]api[\\/]/, dependencies: ['setup'] },
  ],
});