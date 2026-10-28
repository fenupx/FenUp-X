# 🧪 FenUp X — Tarayıcı Test ve Doğrulama Rehberi (TEST_REHBERI.md)

Bu rehber, FenUp X platformunda **Antigravity** ve **Codex** ajanlarının ortaklaşa kullanabileceği, gerçek tarayıcı (Chromium, WebKit, Firefox) ortamında çalışan Playwright test altyapısının kurulumunu ve çalıştırma adımlarını açıklar.

---

## 1. ⚙️ Ön Koşullar ve Kurulum

Playwright test altyapısı ve tarayıcı binary'leri projeye izole olarak kurulur:

```bash
# 1. NPM paketlerini kur
npm install

# 2. Playwright tarayıcı binary'lerini (Chromium, WebKit, Firefox) indir
npx playwright install chromium webkit firefox
```

---

## 2. 🚀 Test Çalıştırma Komutları

Yerel web sunucusu (`python3 -m http.server 4173`), Playwright tarafından otomatik olarak başlatılır ve testler bittiğinde güvenle kapatılır.

### A) Bütün Testleri Çalıştır
Tüm cihaz ve tarayıcı matrisinde tüm testleri koşturur:
```bash
npx playwright test
```

### B) Yalnızca Mobil Testleri Çalıştır (iOS Safari & Android Chrome)
iPhone Safari (375px, 390px, 430px) ve Android Chromium profillerinde test eder:
```bash
npm run test:mobile
# veya:
npx playwright test --project=mobile-safari-iphone-390 --project=mobile-chrome-android
```

### C) Akıllı Tahta (Pardus ETAP) Testleri
Chromium motoru ve dokunmatik zırhıyla 1920×1080 ve 1366×768 çözünürlüklerde test eder:
```bash
npm run test:etap
# veya:
npx playwright test --project=etap-board-1920 --project=etap-board-1366
```

### D) Masaüstü Tarayıcı Testleri (1366×768 ve 1440×900)
```bash
npm run test:desktop
```

### E) Öncelikli Görünürlük ve Sızıntı Zırhı Testi
Ders ekranının provaya veya değerlendirmeye sızmadığını, OYSS barının gizlendiğini doğrular:
```bash
npm run test:visibility
# veya:
npx playwright test tests/visibility.spec.js
```

### F) Canlı Site (Production) Üzerinde Test Koşma
Yerel sunucu yerine canlı sitede (`fenupx.com`) testleri yürütmek için:
```bash
BASE_URL=https://fenupx.com npx playwright test tests/visibility.spec.js --project=mobile-safari-iphone-390
```

---

## 3. 📊 Test Raporlarını ve Kanıtları İnceleme

Test sonuçları, ekran görüntüleri ve Playwright trace kayıtları `playwright-report/` ve `test-results/` dizinlerinde saklanır:

```bash
# Etkileşimli HTML test raporunu aç
npx playwright show-report
```

---

## 4. 📱 Temsilî Cihaz Matrisi ve Sınırları

| Profil | Motor | Çözünürlük | Dokunmatik | Açıklama |
| :--- | :--- | :--- | :--- | :--- |
| `mobile-safari-iphone-390` | WebKit | 390×844 | Evet | iPhone 12/13/14 Safari benzetimi |
| `mobile-safari-iphone-375` | WebKit | 375×667 | Evet | iPhone SE / Küçük ekran |
| `mobile-safari-iphone-430` | WebKit | 430×932 | Evet | iPhone 14 Pro Max / Büyük ekran |
| `mobile-chrome-android` | Chromium | 412×915 | Evet | Google Pixel 7 Android Chrome benzetimi |
| `mobile-compact-320` | Chromium | 320×650 | Evet | Ultra kompakt ekran sınır testi |
| `tablet-ipad` | WebKit | 768×1024 | Evet | iPad dikey/yatay tablet benzetimi |
| `desktop-1366` | Chromium | 1366×768 | Hayır | Yaygın standart dizüstü ekranı |
| `desktop-1440` | Chromium | 1440×900 | Hayır | Geniş ekran masaüstü |
| `etap-board-1920` | Chromium | 1920×1080 | Evet | Pardus ETAP Akıllı Tahta (Full HD) |
| `etap-board-1366` | Chromium | 1366×768 | Evet | Pardus ETAP Akıllı Tahta (Standart) |
| `desktop-firefox` | Firefox | 1366×768 | Hayır | Gecko motoru genel uyumluluk |

> [!NOTE]
> **Gerçek Cihaz Notu:** WebKit emülasyonu masaüstünde WebKit çekirdeğini kullanır; ancak gerçek iOS Safari'nin dinamik adres çubuğu daralmaları ve çentik (Safe Area Insets) davranışları için gerçek bir iPhone üzerinde nihai fiziksel kontrol daima önerilir.
