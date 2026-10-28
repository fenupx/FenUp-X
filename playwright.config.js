import { defineConfig, devices } from '@playwright/test';

/**
 * FenUp X Çoklu Cihaz ve Tarayıcı Test Yapılandırması
 * Kural 7 (Pardus ETAP), Mobil (iOS WebKit & Android Chromium) ve Masaüstü Matrisi
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  projects: [
    // 1. MOBİL PROFİLLER (iOS WebKit & Android Chromium)
    {
      name: 'mobile-safari-iphone-390',
      use: {
        ...devices['iPhone 14'],
        browserName: 'webkit',
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'mobile-safari-iphone-375',
      use: {
        ...devices['iPhone SE'],
        browserName: 'webkit',
        viewport: { width: 375, height: 667 },
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'mobile-safari-iphone-430',
      use: {
        ...devices['iPhone 14 Pro Max'],
        browserName: 'webkit',
        viewport: { width: 430, height: 932 },
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'mobile-chrome-android',
      use: {
        ...devices['Pixel 7'],
        browserName: 'chromium',
        viewport: { width: 412, height: 915 },
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'mobile-compact-320',
      use: {
        browserName: 'chromium',
        viewport: { width: 320, height: 650 },
        hasTouch: true,
        isMobile: true,
        userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      },
    },

    // 2. TABLET PROFİLİ
    {
      name: 'tablet-ipad',
      use: {
        ...devices['iPad Mini'],
        browserName: 'webkit',
        hasTouch: true,
      },
    },

    // 3. MASAÜSTÜ PROFİLLERİ
    {
      name: 'desktop-1366',
      use: {
        browserName: 'chromium',
        viewport: { width: 1366, height: 768 },
        hasTouch: false,
      },
    },
    {
      name: 'desktop-1440',
      use: {
        browserName: 'chromium',
        viewport: { width: 1440, height: 900 },
        hasTouch: false,
      },
    },

    // 4. AKILLI TAHTA (PARDUS ETAP BENZETİMİ - CHROMIUM + DOKUNMATİK)
    {
      name: 'etap-board-1920',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
        hasTouch: true,
        isMobile: false,
      },
    },
    {
      name: 'etap-board-1366',
      use: {
        browserName: 'chromium',
        viewport: { width: 1366, height: 768 },
        hasTouch: true,
        isMobile: false,
      },
    },

    // 5. FIREFOX MOTORU (İSTEĞE BAĞLI / GENEL UYUMLULUK)
    {
      name: 'desktop-firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1366, height: 768 },
      },
    },
  ],

  /* Yerel web sunucusu (otomatik başlatıp kapatır) */
  webServer: {
    command: 'python3 -m http.server 4173',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
