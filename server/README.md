# FenUp X güvenli ve ücretsiz puan kaydı

Etkin mimari: GitHub Pages + mevcut Firebase Auth/Firestore Spark + Cloudflare Workers **Free**. Firebase Blaze reddedildi; yeni billing hesabı veya ücretli servis açılmaz. Otomatik yıllık yükseltme kapalıdır. `functions/index.mjs` ve Functions emulator yapılandırması kullanılmayan alternatif sarmalayıcılardır; kök `firebase.json` yalnız Firestore kuralları dağıtır. Functions/Scheduler deploy etmeyin.

## Güvenilir kayıt

Worker Firebase RS256 imzasını, proje/UID/zamanları ve e-posta doğrulamasını kontrol eder. Saklı öğrenci rolü/sınıfı ve sunucunun İstanbul eğitim yılı esas alınır. Sayısal puan istemciden kabul edilmez. Soru, şık kimlikleri, süre ve cevap değerlendirmesi sunucudadır. Öğrenci rol/sınıf/puan/receipt/attempt yazamaz. Soru anahtarı değerlendirmeden önce yanıta konmaz. Eski herkese açık soru JSON'larında cevaplar bulunduğu için otomatik cevap aramasını önleyen tam bir anti-cheat sistemi iddia edilmez.

`worker/client-store.mjs` resmi Firebase Lite optimistic transaction kullanır. Üretimde Firebase ID token ile sunucu `beginTransaction` reddedildiğinden, bunun yerine resmi istemci transaction yöntemi seçilmiştir. İşlemler yine Firestore Rules denetimindedir. Proje sahibi IAM anahtarı Worker'a verilmez. Özel `internalServiceIdentities` kaydına bağlı Firebase teknik kimliği yalnız puan yollarına ve dar öğrenci toplam alanlarına erişebilir; kimlik parolası Cloudflare Secret'tadır. Kaydı `enabled:false` yapmak erişimi keser. Öğrenci bu özel kaydı oluşturamaz/okuyamaz/değiştiremez.

Tamamlanan deneme, receipt, doğru sınıf/yıl leaderboard ve mevcut toplamın artışı tek transaction'dır. Ünite başına günlük en iyi üç sonuç sayılır. Bir hesap günde en fazla60 oyun başlatır. Tekrarlanan sonuç0delta döndürür. Kayıp yanıtlar aynı deneme/eylem kimliğiyle yeniden gönderilir. Tarayıcı yalnız kimlik/eylem/tercih kuyruğu tutar; güvenilir sayısal puan tutmaz. Bitmiş denemeler kompakt kanıt olarak kalır.

Eski toplam/sezon puanları taşınmaz, sıfırlanmaz veya yeniden hesaplanmaz. Yeni doğrulanmış delta toplam alana eklenir; eski sezon alanları ayrı geçmiş görünümünde kalır. V8.9.4'ün kaydetmediği sonuçlar için doğrulanabilir sunucu kaydı yoktur; kayıp puan üretilmez. Sınıf düzeltmesi yalnız kayıtlı yönetici tarafından yapılır, eski sınıf puanları taşınmaz. Yıllık yükseltme beklemededir; sonraki eğitim yılı geldiğinde mevcut kohort otomatik değiştirilmez.

Özel kullanıcı belgeleri yalnız sahibi/yönetici/servis tarafından okunur. Geçmiş leaderboard Worker'da yalnız takma ad/avatar/puan olarak projekte edilir. Yeni leaderboard da kişisel e-posta/ad/soyad içermez. Hesap silme son giriş doğrulamasından sonra kendi yarışma kayıtlarını sayfalar halinde temizler; özel siliniyor işareti eşzamanlı yeni oyunu durdurur. İstemci sonra atomik profil silme işaretçisi/profil silme ve Firebase Auth silme yapar.

## Ücretsiz sınırlar ve izleme

[Cloudflare resmi limitleri](https://developers.cloudflare.com/workers/platform/limits/): hesap genelinde100000 istek/gün, 00:00UTC sıfırlanır (Türkiye03:00);10ms CPU/istek. Ağ bekleme süresi CPU süresi değildir. Günlük limit aşımında1027, CPU aşımında1102 hatası olabilir; Free plan otomatik Paid'e yükselmez. Ücretli binding, KV/R2/D1/DurableObject/cron oluşturulmadı. Cloudflare Workers & Pages panelinden günlük istek, hata ve CPU kullanımını izleyin. `worker/tail-safe.mjs` yalnız hata alanlarını yazar; istek başlıklarını ve bearer tokenları kaydetmez.

[Firestore resmi ücretsiz kota](https://firebase.google.com/docs/firestore/quotas): günlük50000 okuma/20000 yazma/20000 silme;1GiB depolama ve aylık10GiB dışa veri. Günlük Firestore kotası Pasifik saatiyle yenilenir. Teknik kimliğin Rules kontrol okumaları da kotayı tüketebilir. Firebase Usage panelinde okuma/yazma/depolamayı izleyin.47 öğrencinin günde3 oyun oynadığı varsayımı ayda4230 oyun eder; yaklaşık30 Worker çağrısı/oyun için günlük4230 çağrı beklenir, gerçek kullanım/yeniden denemeler ve diğer trafik eklenir. Firestore okuma sınırı önce dolabilir; ücretsiz kullanım kesintisiz hizmet garantisi değildir.

Beklenen altyapı faturası bu **Free + Spark** planları korunduğu sürece0'dır; limite gelince işlem reddedilir. Güvenli olmayan doğrudan puan yazımı açılmaz. Önceden sunucuda doğrulanmış kayıtlar korunur; kota yenilenince yeniden denenebilir. Sunucunun hiç almadığı bir cevabın puanını kurtarma garantisi verilmez. Bütçe uyarısı harcamayı otomatik durdurmaz; burada maliyet koruması ücretli plan açmamak ve ücretsiz kota reddidir.

## Kurulum, doğrulama ve dağıtım

1. `npm ci --prefix server` ve `npm ci --prefix server/worker`; Java21+ kurulu olmalı. `node server/prepare-question-banks.mjs` özgün soru JSON'larını paketler; üretilmiş cevap bankası Git'e alınmaz.
2. `npm test --prefix server` gerçek Firestore emülatöründe güvenlik/motor testlerini çalıştırır. `firebase emulators:exec --config server/firebase.full-emulator.json --project demo-fenupx --only auth,firestore 'node server/test/worker-e2e.mjs'` gerçek workerd + Auth/Firestore emülatörleri + Chromium arayüzünü sınar. Telefon için `SCORE_E2E_BROWSER=webkit` kullanın.
3. Resmi Cloudflare panelinde Current plan:Free doğrulayın. `server/worker` içinde `npx wrangler deploy --env ''`. Bu komut plan değiştirmez. Varsayılan ad fenupx-score; mevcut URL https://fenupx-score.mistralx-rk.workers.dev .
4. Bir defaya mahsus `node server/provision-worker.mjs --confirmed-free-plan`: mevcut Firebase CLI sahibi oturumuyla yalnız teknik kimlik/özel kayıt oluşturur, rastgele parolayı bellekte üretip doğrudan Wrangler Secret'a yollar. Çıktıya/dosyaya parola yazılmaz. Var olan kimliği sessizce döndürmez. Yeniden kurulumda körlemesine çalıştırmayın.
5. Testlerden sonra `firebase deploy --only firestore:rules --project fenup-x`; veri migrasyonu yoktur. `node server/test/worker-live.mjs` açıkça isimli geçici üretim test hesabıyla mevcut120puanı koruyup güvenli kayıt/doğru sınıf-yıl/tekrar0delta/sahtepuanret/leaderboard görünümünü doğrular; yalnız kendi test verisini temizler.
6. `competition-config.js` API URL + hazır bayrağını yalnız bu test geçince açın; normal commit/push ile Pages'i yayımlayın. Canlı asset sürümü ve arayüz akışını ayrıca doğrulayın. Gizli değişkenler/özel notlar/test logları commit edilmez.

Geri dönüşte puan bayrağını kapatın; mevcut verileri silmeyin ve eski serbest puan kurallarını geri getirmeyin. Worker/Firestore Rules/Pages ayrı dağıtımlardır. Orijinal öğrenci avatar kimlikleri korunur; yeni avatar üretimi ve otomatik sınıf yükseltme bu puan yayınının dışındadır.
